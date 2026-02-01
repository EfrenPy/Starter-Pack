import { test, expect } from '@playwright/test';

test.describe('Navigation across pages', () => {
  test('root index → legal-hub navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.card-grid', { timeout: 5000 });
    await page.locator('.card-grid a[data-i18n-href="card_legal_href"]').click();
    await expect(page).toHaveURL(/legal-hub\.html/);
    await expect(page.locator('main#main-content')).toBeVisible();
  });

  test('en/index loads with navbar and content', async ({ page }) => {
    await page.goto('/en/index.html');
    await page.waitForSelector('.topnav', { timeout: 5000 });
    await expect(page.locator('.topnav')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.site-footer')).toBeVisible();
  });

  test('es/index loads with navbar and content', async ({ page }) => {
    await page.goto('/es/index.html');
    await page.waitForSelector('.topnav', { timeout: 5000 });
    await expect(page.locator('.topnav')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
  });

  test('en/beginning loads with content visible', async ({ page }) => {
    await page.goto('/en/beginning.html');
    await page.waitForSelector('.topnav', { timeout: 5000 });
    const content = page.locator('.container .en.active');
    await expect(content).toBeVisible();
  });

  test('es/beginning loads with content visible', async ({ page }) => {
    await page.goto('/es/beginning.html');
    await page.waitForSelector('.topnav', { timeout: 5000 });
    const content = page.locator('.container .es.active');
    await expect(content).toBeVisible();
  });

  test('en/tax_declaration_spain loads correctly', async ({ page }) => {
    await page.goto('/en/tax_declaration_spain.html');
    await page.waitForSelector('.topnav', { timeout: 5000 });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main#main-content')).toBeVisible();
  });

  test('es/tax_declaration_spain loads correctly', async ({ page }) => {
    await page.goto('/es/tax_declaration_spain.html');
    await page.waitForSelector('.topnav', { timeout: 5000 });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main#main-content')).toBeVisible();
  });

  test('en/legal-hub loads correctly', async ({ page }) => {
    await page.goto('/en/legal-hub.html');
    await page.waitForSelector('.topnav', { timeout: 5000 });
    await expect(page.locator('h1')).toBeVisible();
  });

  test('es/legal-hub loads correctly', async ({ page }) => {
    await page.goto('/es/legal-hub.html');
    await page.waitForSelector('.topnav', { timeout: 5000 });
    await expect(page.locator('h1')).toBeVisible();
  });

  test('en/search loads correctly', async ({ page }) => {
    await page.goto('/en/search.html');
    await page.waitForSelector('.topnav', { timeout: 5000 });
    await expect(page.locator('main#main-content')).toBeVisible();
  });

  test('es/search loads correctly', async ({ page }) => {
    await page.goto('/es/search.html');
    await page.waitForSelector('.topnav', { timeout: 5000 });
    await expect(page.locator('main#main-content')).toBeVisible();
  });

  test('en/complete loads correctly', async ({ page }) => {
    await page.goto('/en/complete.html');
    await page.waitForSelector('.topnav', { timeout: 5000 });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main#main-content')).toBeVisible();
  });

  test('es/complete loads correctly', async ({ page }) => {
    await page.goto('/es/complete.html');
    await page.waitForSelector('.topnav', { timeout: 5000 });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main#main-content')).toBeVisible();
  });

  test('en/technical/vscode-remote loads correctly', async ({ page }) => {
    await page.goto('/en/technical/vscode-remote.html');
    await page.waitForSelector('.topnav', { timeout: 5000 });
    await expect(page.locator('h1')).toBeVisible();
  });

  test('es/technical/vscode-remote loads correctly', async ({ page }) => {
    await page.goto('/es/technical/vscode-remote.html');
    await page.waitForSelector('.topnav', { timeout: 5000 });
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('Navigation via navbar (mobile)', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('navbar menu → Home link works', async ({ page }) => {
    await page.goto('/es/legal-hub.html');
    await page.waitForSelector('#menu-toggle', { timeout: 5000 });
    await page.locator('#menu-toggle').click();
    await page.locator('.topnav__links a').first().click();
    await expect(page).toHaveURL(/\/(es\/)?(index\.html)?$/);
  });

  test('navbar menu → Legal hub link works', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#menu-toggle', { timeout: 5000 });
    await page.locator('#menu-toggle').click();
    await page.locator('.topnav__links a[data-i18n="nav_legal"]').click();
    await expect(page).toHaveURL(/legal-hub\.html/);
  });
});
