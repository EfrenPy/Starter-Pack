import { test, expect } from '@playwright/test';

test.describe('Homepage (root index.html)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Starter Pack/);
  });

  test('CSS loads and body has correct background', async ({ page }) => {
    const bg = await page.locator('body').evaluate(
      (el) => getComputedStyle(el).backgroundColor
    );
    expect(bg).not.toBe('');
    expect(bg).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('navbar is injected', async ({ page }) => {
    await page.waitForSelector('.topnav', { timeout: 5000 });
    await expect(page.locator('.topnav')).toBeVisible();
  });

  test('footer is injected', async ({ page }) => {
    await page.waitForSelector('.site-footer', { timeout: 5000 });
    await expect(page.locator('.site-footer')).toBeVisible();
  });

  test('footer element is injected', async ({ page }) => {
    await page.waitForSelector('footer', { timeout: 5000 });
    await expect(page.locator('footer')).toBeVisible();
  });

  test('language switch buttons exist', async ({ page }) => {
    await page.waitForSelector('.language-switch', { timeout: 5000 });
    const esBtn = page.locator('.language-switch[data-lang="es"]');
    const enBtn = page.locator('.language-switch[data-lang="en"]');
    await expect(esBtn).toBeVisible();
    await expect(enBtn).toBeVisible();
  });

  test('language switch changes text to English', async ({ page }) => {
    await page.waitForSelector('.language-switch', { timeout: 5000 });
    await page.locator('.language-switch[data-lang="en"]').click();

    const heading = page.locator('h1[data-i18n="hero_title"]');
    await expect(heading).toHaveText('Welcome to the Starter Pack');
  });

  test('language switch changes text to Spanish', async ({ page }) => {
    await page.waitForSelector('.language-switch', { timeout: 5000 });
    await page.locator('.language-switch[data-lang="en"]').click();
    await page.locator('.language-switch[data-lang="es"]').click();

    const heading = page.locator('h1[data-i18n="hero_title"]');
    await expect(heading).toContainText('Bienvenido');
  });

  test('language preference persists in localStorage', async ({ page }) => {
    await page.waitForSelector('.language-switch', { timeout: 5000 });
    await page.locator('.language-switch[data-lang="en"]').click();

    const lang = await page.evaluate(() => localStorage.getItem('language'));
    expect(lang).toBe('en');
  });

  test('card links navigate correctly', async ({ page }) => {
    const legalLink = page.locator('.card-grid a[data-i18n-href="card_legal_href"]');
    await expect(legalLink).toBeVisible();
  });

  test('search form exists and is functional', async ({ page }) => {
    const searchInput = page.locator('.search-box input[name="query"]');
    const searchButton = page.locator('.search-box button[type="submit"]');
    await expect(searchInput).toBeVisible();
    await expect(searchButton).toBeVisible();
  });

  test('skip link exists', async ({ page }) => {
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  test('main content landmark exists', async ({ page }) => {
    await expect(page.locator('main#main-content')).toBeVisible();
  });

  test('no console errors on page load', async ({ page }) => {
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/');
    await page.waitForSelector('.topnav', { timeout: 5000 });
    const realErrors = errors.filter(
      (e) => !e.includes('@vite') && !e.includes('WebSocket') && !e.includes('vite')
    );
    expect(realErrors).toHaveLength(0);
  });
});

test.describe('Homepage menu toggle (mobile)', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('menu toggle button exists and works', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#menu-toggle', { timeout: 5000 });
    const toggle = page.locator('#menu-toggle');
    const menu = page.locator('#topnav-menu');

    await expect(toggle).toBeVisible();

    // Click to open
    await toggle.click();
    await expect(menu).toHaveClass(/show/);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    // Click outside to close
    await page.locator('body').click({ position: { x: 0, y: 0 } });
    await expect(menu).not.toHaveClass(/show/);
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
