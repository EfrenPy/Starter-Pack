import { test, expect } from '@playwright/test';

test.describe('VS Code Remote page (English)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/technical/vscode-remote/');
    await page.waitForSelector('.topnav', { timeout: 5000 });
  });

  test('page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/VS Code/i);
  });

  test('has navbar', async ({ page }) => {
    await expect(page.locator('.topnav')).toBeVisible();
  });

  test('has main content', async ({ page }) => {
    await expect(page.locator('main#main-content')).toBeVisible();
  });

  test('has skip link', async ({ page }) => {
    await expect(page.locator('.skip-link')).toHaveAttribute('href', '#main-content');
  });

  test('CSS loads correctly (path is ../../css/styles.css)', async ({ page }) => {
    const bg = await page.locator('body').evaluate(
      (el) => getComputedStyle(el).backgroundColor
    );
    expect(bg).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('has heading', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('VS Code');
  });

  test('lang attribute is en', async ({ page }) => {
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('en');
  });

  test('has section headings', async ({ page }) => {
    const h2s = page.locator('main h2');
    const count = await h2s.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('no console errors', async ({ page }) => {
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/en/technical/vscode-remote/');
    await page.waitForSelector('.topnav', { timeout: 5000 });
    const realErrors = errors.filter(
      (e) => !e.includes('@vite') && !e.includes('WebSocket') && !e.includes('vite')
    );
    expect(realErrors).toHaveLength(0);
  });
});

test.describe('VS Code Remote page (English) - mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('menu toggle works', async ({ page }) => {
    await page.goto('/en/technical/vscode-remote/');
    await page.waitForSelector('#menu-toggle', { timeout: 5000 });
    await page.locator('#menu-toggle').click();
    await expect(page.locator('#topnav-menu')).toHaveClass(/show/);
  });
});

test.describe('VS Code Remote page (Spanish)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/es/technical/vscode-remote/');
    await page.waitForSelector('.topnav', { timeout: 5000 });
  });

  test('page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/VS Code/i);
  });

  test('has navbar', async ({ page }) => {
    await expect(page.locator('.topnav')).toBeVisible();
  });

  test('has main content', async ({ page }) => {
    await expect(page.locator('main#main-content')).toBeVisible();
  });

  test('lang attribute is es', async ({ page }) => {
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('es');
  });

  test('has heading in Spanish', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('VS Code');
  });

  test('CSS loads correctly', async ({ page }) => {
    const bg = await page.locator('body').evaluate(
      (el) => getComputedStyle(el).backgroundColor
    );
    expect(bg).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('has section headings', async ({ page }) => {
    const h2s = page.locator('main h2');
    const count = await h2s.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('no console errors', async ({ page }) => {
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/es/technical/vscode-remote/');
    await page.waitForSelector('.topnav', { timeout: 5000 });
    const realErrors = errors.filter(
      (e) => !e.includes('@vite') && !e.includes('WebSocket') && !e.includes('vite')
    );
    expect(realErrors).toHaveLength(0);
  });
});

test.describe('VS Code Remote page (Spanish) - mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('menu toggle works', async ({ page }) => {
    await page.goto('/es/technical/vscode-remote/');
    await page.waitForSelector('#menu-toggle', { timeout: 5000 });
    await page.locator('#menu-toggle').click();
    await expect(page.locator('#topnav-menu')).toHaveClass(/show/);
  });
});
