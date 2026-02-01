import { test, expect } from '@playwright/test';

/**
 * Production build tests.
 * These verify that the built dist/ output works correctly,
 * catching issues like missing component fragments, broken asset paths,
 * and bundling problems that only appear in production.
 */

test.describe('Production build: component injection', () => {
  const pages = [
    '/',
    '/en/index.html',
    '/es/index.html',
    '/beginning.html',
    '/en/beginning.html',
    '/es/beginning.html',
    '/en/legal-hub.html',
    '/es/legal-hub.html',
    '/en/tax_declaration_spain.html',
    '/es/tax_declaration_spain.html',
    '/en/search.html',
    '/es/search.html',
    '/en/technical/vscode-remote.html',
  ];

  for (const url of pages) {
    test(`navbar loads on ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForSelector('.topnav', { timeout: 5000 });
      await expect(page.locator('.topnav')).toBeVisible();
      // menu-toggle is hidden on desktop but should be in DOM
      await expect(page.locator('#menu-toggle')).toBeAttached();
    });

    test(`footer loads on ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForSelector('.site-footer', { timeout: 5000 });
      await expect(page.locator('.site-footer')).toBeVisible();
    });

    test(`CSS loads on ${url}`, async ({ page }) => {
      await page.goto(url);
      const bg = await page.locator('body').evaluate(
        (el) => getComputedStyle(el).backgroundColor
      );
      expect(bg).not.toBe('rgba(0, 0, 0, 0)');
    });

    test(`no JS errors on ${url}`, async ({ page }) => {
      const errors = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      page.on('pageerror', (err) => errors.push(err.message));
      await page.goto(url);
      await page.waitForSelector('.topnav', { timeout: 5000 }).catch(() => {});
      expect(errors).toHaveLength(0);
    });
  }
});

test.describe('Production build: language switching', () => {
  test('language switch works on root page', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.language-switch', { timeout: 5000 });
    await page.locator('.language-switch[data-lang="en"]').click();
    await expect(page.locator('h1[data-i18n="hero_title"]')).toHaveText(
      'Welcome to the Starter Pack'
    );
  });
});

test.describe('Production build: menu toggle (mobile)', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('menu toggle works on root page', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#menu-toggle', { timeout: 5000 });
    await page.locator('#menu-toggle').click();
    await expect(page.locator('#topnav-menu')).toHaveClass(/show/);
  });
});

test.describe('Production build: search', () => {
  test('search returns results', async ({ page }) => {
    await page.goto('/en/search.html?query=CERN');
    await page.waitForSelector('.search-result', { timeout: 10000 });
    const count = await page.locator('.search-result').count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Production build: asset integrity', () => {
  test('JS bundles load (no 404s)', async ({ page }) => {
    const failedRequests = [];
    page.on('response', (res) => {
      if (res.status() >= 400 && res.url().endsWith('.js')) {
        failedRequests.push(`${res.status()} ${res.url()}`);
      }
    });
    await page.goto('/');
    await page.waitForSelector('.topnav', { timeout: 5000 });
    expect(failedRequests).toHaveLength(0);
  });

  test('CSS bundles load (no 404s)', async ({ page }) => {
    const failedRequests = [];
    page.on('response', (res) => {
      if (res.status() >= 400 && res.url().endsWith('.css')) {
        failedRequests.push(`${res.status()} ${res.url()}`);
      }
    });
    await page.goto('/');
    await page.waitForSelector('.topnav', { timeout: 5000 });
    expect(failedRequests).toHaveLength(0);
  });

  test('component fragments are not full HTML pages', async ({ page }) => {
    const response = await page.request.get('/navbar.html');
    const text = await response.text();
    expect(text).not.toContain('<!DOCTYPE');
    expect(text).toContain('<nav');
  });

  test('en/navbar.html is a fragment', async ({ page }) => {
    const response = await page.request.get('/en/navbar.html');
    const text = await response.text();
    expect(text).not.toContain('<!DOCTYPE');
    expect(text).toContain('<nav');
  });

  test('es/navbar.html is a fragment', async ({ page }) => {
    const response = await page.request.get('/es/navbar.html');
    const text = await response.text();
    expect(text).not.toContain('<!DOCTYPE');
    expect(text).toContain('<nav');
  });
});
