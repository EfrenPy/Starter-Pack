import { test, expect } from '@playwright/test';

test.describe('Navbar component (desktop)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.topnav', { timeout: 5000 });
  });

  test('has brand link', async ({ page }) => {
    await expect(page.locator('.topnav__brand')).toBeVisible();
  });

  test('has language buttons', async ({ page }) => {
    await expect(page.locator('.topnav__lang .language-switch[data-lang="es"]')).toBeVisible();
    await expect(page.locator('.topnav__lang .language-switch[data-lang="en"]')).toBeVisible();
  });

  test('nav links are visible on desktop', async ({ page }) => {
    const menuLinks = page.locator('.topnav__links li a');
    const count = await menuLinks.count();
    expect(count).toBeGreaterThanOrEqual(2);
    await expect(menuLinks.first()).toBeVisible();
  });
});

test.describe('Navbar component (mobile)', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.topnav', { timeout: 5000 });
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

    // Close by clicking toggle area
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
    await page.goto('/');
    await page.waitForSelector('.site-footer', { timeout: 5000 });
  });

  test('has footer section', async ({ page }) => {
    await expect(page.locator('.site-footer')).toBeVisible();
  });

  test('has Buy Me a Coffee button/image', async ({ page }) => {
    const coffeeImg = page.locator('.site-footer__support a img');
    await expect(coffeeImg).toBeVisible();
  });

  test('has contact section', async ({ page }) => {
    await expect(page.locator('.site-footer__contact')).toBeVisible();
    await expect(page.locator('a[href*="mailto:"]')).toBeVisible();
  });

  test('has footer element', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible();
  });
});

test.describe('Navbar works in subdirectory pages', () => {
  for (const url of ['/en/index.html', '/es/index.html', '/en/legal-hub.html']) {
    test(`navbar loads on ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForSelector('.topnav', { timeout: 5000 });
      await expect(page.locator('.topnav__brand')).toBeVisible();
      await expect(page.locator('.language-switch[data-lang="en"]')).toBeVisible();
    });
  }
});

test.describe('Navbar toggle works in subdirectory pages (mobile)', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  for (const url of ['/en/index.html', '/es/index.html', '/en/legal-hub.html']) {
    test(`menu toggle works on ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForSelector('#menu-toggle', { timeout: 5000 });
      await page.locator('#menu-toggle').click();
      await expect(page.locator('#topnav-menu')).toHaveClass(/show/);
    });
  }
});
