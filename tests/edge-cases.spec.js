import { test, expect } from '@playwright/test';

/**
 * Edge-case and structural tests for the Eleventy SSG build.
 * Covers SEO meta tags, mobile navbar behaviour, theme toggle,
 * 404 handling, and clean URL support.
 */

test.describe('SEO meta tags', () => {
  test('EN page has meta description', async ({ page }) => {
    await page.goto('/en/');
    const content = await page.locator('meta[name="description"]').getAttribute('content');
    expect(content.length).toBeGreaterThan(10);
  });

  test('EN page has og:title', async ({ page }) => {
    await page.goto('/en/');
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
  });

  test('EN page has og:locale set to en', async ({ page }) => {
    await page.goto('/en/');
    const locale = await page.locator('meta[property="og:locale"]').getAttribute('content');
    expect(locale).toMatch(/en/i);
  });

  test('ES page has og:locale set to es', async ({ page }) => {
    await page.goto('/es/');
    const locale = await page.locator('meta[property="og:locale"]').getAttribute('content');
    expect(locale).toMatch(/es/i);
  });

  test('EN page has canonical link', async ({ page }) => {
    await page.goto('/en/');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /.+/);
  });

  test('EN page has hreflang alternates', async ({ page }) => {
    await page.goto('/en/');
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', /.+/);
    await expect(page.locator('link[hreflang="es"]')).toHaveAttribute('href', /.+/);
    await expect(page.locator('link[hreflang="it"]')).toHaveAttribute('href', /.+/);
  });

  test('ES page has canonical link', async ({ page }) => {
    await page.goto('/es/');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /.+/);
  });

  test('ES page has hreflang alternates', async ({ page }) => {
    await page.goto('/es/');
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', /.+/);
    await expect(page.locator('link[hreflang="es"]')).toHaveAttribute('href', /.+/);
    await expect(page.locator('link[hreflang="it"]')).toHaveAttribute('href', /.+/);
  });

  test('IT page has og:locale set to it', async ({ page }) => {
    await page.goto('/it/');
    const locale = await page.locator('meta[property="og:locale"]').getAttribute('content');
    expect(locale).toMatch(/it/i);
  });

  test('IT page has hreflang alternates', async ({ page }) => {
    await page.goto('/it/');
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', /.+/);
    await expect(page.locator('link[hreflang="es"]')).toHaveAttribute('href', /.+/);
    await expect(page.locator('link[hreflang="it"]')).toHaveAttribute('href', /.+/);
  });
});

test.describe('Mobile navbar', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('menu starts closed with aria-expanded false', async ({ page }) => {
    await page.goto('/en/');
    await expect(page.locator('#menu-toggle')).toHaveAttribute('aria-expanded', 'false');
  });

  test('clicking toggle opens menu and sets aria-expanded true', async ({ page }) => {
    await page.goto('/en/');
    await page.locator('#menu-toggle').click();
    await expect(page.locator('#menu-toggle')).toHaveAttribute('aria-expanded', 'true');
  });

  test('clicking toggle again closes menu and sets aria-expanded false', async ({ page }) => {
    await page.goto('/en/');
    await page.locator('#menu-toggle').click();
    await expect(page.locator('#menu-toggle')).toHaveAttribute('aria-expanded', 'true');
    await page.locator('#menu-toggle').click();
    await expect(page.locator('#menu-toggle')).toHaveAttribute('aria-expanded', 'false');
  });
});

test.describe('Theme toggle', () => {
  test('toggling theme changes data-theme attribute on html element', async ({ page }) => {
    await page.goto('/en/');
    const themeToggle = page.locator('#theme-toggle');

    // Get initial theme (or absence thereof)
    const initialTheme = await page.locator('html').getAttribute('data-theme');

    await themeToggle.click();
    const newTheme = await page.locator('html').getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);
  });
});

test.describe('404 page', () => {
  test('non-existent URL shows 404 page', async ({ page }) => {
    const response = await page.goto('/en/this-page-does-not-exist/');
    expect(response.status()).toBe(404);
  });
});

test.describe('Clean URLs', () => {
  test('/en/ loads without .html extension', async ({ page }) => {
    const response = await page.goto('/en/');
    expect(response.status()).toBe(200);
  });

  test('/en/legal-hub/ loads without .html extension', async ({ page }) => {
    const response = await page.goto('/en/legal-hub/');
    expect(response.status()).toBe(200);
  });

  test('/es/legal-hub/ loads without .html extension', async ({ page }) => {
    const response = await page.goto('/es/legal-hub/');
    expect(response.status()).toBe(200);
  });

  test('/en/technical-hub/ loads without .html extension', async ({ page }) => {
    const response = await page.goto('/en/technical-hub/');
    expect(response.status()).toBe(200);
  });

  test('/it/legal-hub/ loads without .html extension', async ({ page }) => {
    const response = await page.goto('/it/legal-hub/');
    expect(response.status()).toBe(200);
  });
});
