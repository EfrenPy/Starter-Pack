import { test, expect } from '@playwright/test';

test.describe('Edge cases & error handling', () => {
  test.describe('i18n edge cases', () => {
    test('missing translation key does not blank element', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('.language-switch', { timeout: 5000 });

      const heading = page.locator('h1[data-i18n="hero_title"]');
      const originalText = await heading.textContent();
      expect(originalText.length).toBeGreaterThan(0);

      await page.locator('.language-switch[data-lang="en"]').click();
      const newText = await heading.textContent();
      expect(newText.length).toBeGreaterThan(0);
    });

    test('footer translation works', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('[data-i18n="footer_coffee_text"]', { timeout: 5000 });

      await page.locator('.language-switch[data-lang="en"]').click();
      const el = page.locator('[data-i18n="footer_coffee_text"]');
      const text = await el.textContent();
      expect(text).toContain('coffee');
    });

    test('rapid language switching does not break page', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('.language-switch', { timeout: 5000 });

      for (let i = 0; i < 5; i++) {
        await page.locator('.language-switch[data-lang="en"]').click();
        await page.locator('.language-switch[data-lang="es"]').click();
      }

      const heading = page.locator('h1[data-i18n="hero_title"]');
      await expect(heading).toContainText('Bienvenido');
    });
  });

  test.describe('Component injection edge cases', () => {
    test('navbar placeholder populated with correct structure', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('.topnav', { timeout: 5000 });

      const placeholder = page.locator('#navbar-placeholder');
      await expect(placeholder.locator('.topnav')).toBeAttached();
      await expect(placeholder.locator('#menu-toggle')).toBeAttached();
    });

    test('footer placeholder populated with correct structure', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('.site-footer', { timeout: 5000 });

      const placeholder = page.locator('#footer-placeholder');
      await expect(placeholder.locator('.site-footer')).toBeAttached();
      await expect(placeholder.locator('footer')).toBeAttached();
    });
  });

  test.describe('Navbar edge cases (mobile)', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('menu starts closed after page load', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('#menu-toggle', { timeout: 5000 });
      await expect(page.locator('#menu-toggle')).toHaveAttribute('aria-expanded', 'false');
    });

    test('double-click on toggle still works', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('#menu-toggle', { timeout: 5000 });

      await page.locator('#menu-toggle').dblclick();
      const menu = page.locator('#topnav-menu');
      const hasShow = await menu.evaluate((el) => el.classList.contains('show'));
      const hasHidden = await menu.evaluate((el) => el.classList.contains('hidden'));
      expect(hasShow || hasHidden).toBeTruthy();
    });

    test('menu links have correct href attributes', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('#menu-toggle', { timeout: 5000 });
      await page.locator('#menu-toggle').click();

      const links = page.locator('.topnav__links li a');
      const count = await links.count();
      for (let i = 0; i < count; i++) {
        const href = await links.nth(i).getAttribute('href');
        expect(href).toBeTruthy();
      }
    });
  });

  test.describe('CSS and layout', () => {
    test('container has white background', async ({ page }) => {
      await page.goto('/');
      const bg = await page.locator('.container').evaluate(
        (el) => getComputedStyle(el).backgroundColor
      );
      expect(bg).toContain('255');
    });

    test('language switch buttons are styled', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('.language-switch', { timeout: 5000 });
      const cursor = await page.locator('.language-switch').first().evaluate(
        (el) => getComputedStyle(el).cursor
      );
      expect(cursor).toBe('pointer');
    });
  });

  test.describe('SEO meta tags', () => {
    test('root page has meta description', async ({ page }) => {
      await page.goto('/');
      const desc = page.locator('meta[name="description"]');
      const content = await desc.getAttribute('content');
      expect(content.length).toBeGreaterThan(10);
    });

    test('root page has Open Graph tags', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
      await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
      await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', /.+/);
    });

    test('root page has canonical and hreflang', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /.+/);
      await expect(page.locator('link[hreflang="es"]')).toHaveAttribute('href', /.+/);
      await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', /.+/);
    });

    test('en page has correct locale', async ({ page }) => {
      await page.goto('/en/index.html');
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'en_US');
    });

    test('es page has correct locale', async ({ page }) => {
      await page.goto('/es/index.html');
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'es_ES');
    });
  });
});
