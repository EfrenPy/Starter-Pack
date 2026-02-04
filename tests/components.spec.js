import { test, expect } from '@playwright/test';

test.describe('Navbar component (desktop)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/');
  });

  test('navbar exists immediately on page load', async ({ page }) => {
    await expect(page.locator('.topnav')).toBeVisible();
  });

  test('has brand link', async ({ page }) => {
    await expect(page.locator('.topnav__brand')).toBeVisible();
  });

  test('has navigation links', async ({ page }) => {
    const menuLinks = page.locator('.topnav__links li a');
    const count = await menuLinks.count();
    expect(count).toBeGreaterThanOrEqual(2);
    await expect(menuLinks.first()).toBeVisible();
  });

  test('has theme toggle', async ({ page }) => {
    await expect(page.locator('#theme-toggle')).toBeAttached();
  });

  test('language dropdown has button and menu links', async ({ page }) => {
    const langBtn = page.locator('.topnav__lang-btn');
    await expect(langBtn).toBeVisible();
    const langLinks = page.locator('.topnav__lang-menu a');
    const count = await langLinks.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('language dropdown button shows current language', async ({ page }) => {
    const langBtn = page.locator('.topnav__lang-btn');
    await expect(langBtn).toContainText('EN');
  });
});

test.describe('Navbar component (mobile)', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/en/');
  });

  test('has menu toggle button', async ({ page }) => {
    await expect(page.locator('#menu-toggle')).toBeVisible();
  });

  test('menu toggle opens and closes dropdown', async ({ page }) => {
    const toggle = page.locator('#menu-toggle');
    const menu = page.locator('#topnav-menu');

    // Open
    await toggle.click();
    await expect(menu).toHaveClass(/show/);

    // Close
    await toggle.click();
    await expect(menu).not.toHaveClass(/show/);
  });

  test('clicking outside menu closes it', async ({ page }) => {
    await page.locator('#menu-toggle').click();
    await expect(page.locator('#topnav-menu')).toHaveClass(/show/);

    // Click on main content area
    await page.locator('main').click();
    await expect(page.locator('#topnav-menu')).not.toHaveClass(/show/);
  });
});

test.describe('Footer component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/');
  });

  test('footer exists immediately on page load', async ({ page }) => {
    await expect(page.locator('.site-footer')).toBeVisible();
  });

  test('has footer links', async ({ page }) => {
    const footerLinks = page.locator('.site-footer a');
    const count = await footerLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('has support section with Buy Me a Coffee', async ({ page }) => {
    const coffeeImg = page.locator('.site-footer__support a img');
    await expect(coffeeImg).toBeVisible();
  });

  test('has contact section', async ({ page }) => {
    await expect(page.locator('.site-footer__contact')).toBeVisible();
    await expect(page.locator('a[href*="mailto:"]')).toBeVisible();
  });

  test('has disclaimer', async ({ page }) => {
    await expect(page.locator('.site-footer__disclaimer')).toBeVisible();
  });

  test('has footer element', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible();
  });
});

test.describe('Components appear on both language pages', () => {
  for (const url of ['/en/', '/es/']) {
    test(`navbar and footer load on ${url}`, async ({ page }) => {
      await page.goto(url);
      await expect(page.locator('.topnav')).toBeVisible();
      await expect(page.locator('.topnav__brand')).toBeVisible();
      await expect(page.locator('.topnav__lang-btn').first()).toBeVisible();
      await expect(page.locator('.site-footer')).toBeVisible();
    });
  }
});

test.describe('Components appear on subpages', () => {
  test('navbar and footer load on /en/housing-guide/', async ({ page }) => {
    await page.goto('/en/housing-guide/');
    await expect(page.locator('.topnav')).toBeVisible();
    await expect(page.locator('.topnav__brand')).toBeVisible();
    await expect(page.locator('.topnav__lang-btn').first()).toBeVisible();
    await expect(page.locator('.site-footer')).toBeVisible();
  });
});

test.describe('Mobile menu toggle works on subpages', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  for (const url of ['/en/', '/es/', '/en/housing-guide/']) {
    test(`menu toggle works on ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.locator('#menu-toggle').click();
      await expect(page.locator('#topnav-menu')).toHaveClass(/show/);
    });
  }
});
