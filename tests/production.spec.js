import { test, expect } from '@playwright/test';

/**
 * Production build tests for the Eleventy SSG output.
 * Verifies that pages load correctly, navbar/footer are present,
 * assets load, no console errors occur, search works, and
 * language switching navigates between /en/ and /es/.
 */

const mainPages = [
  '/en/',
  '/es/',
  '/it/',
  '/en/legal-hub/',
  '/en/technical-hub/',
  '/en/housing-guide/',
  '/en/search/',
  '/en/faq/',
  '/it/legal-hub/',
  '/it/search/',
];

test.describe('Production build: page status', () => {
  for (const url of mainPages) {
    test(`${url} returns 200`, async ({ page }) => {
      const response = await page.goto(url);
      expect(response.status()).toBe(200);
    });
  }
});

test.describe('Production build: navbar and footer', () => {
  for (const url of mainPages) {
    test(`navbar exists on ${url}`, async ({ page }) => {
      await page.goto(url);
      await expect(page.locator('.topnav')).toBeVisible();
      await expect(page.locator('#menu-toggle')).toBeAttached();
    });

    test(`footer exists on ${url}`, async ({ page }) => {
      await page.goto(url);
      await expect(page.locator('.site-footer')).toBeVisible();
    });
  }
});

test.describe('Production build: CSS loads', () => {
  for (const url of mainPages) {
    test(`stylesheet linked on ${url}`, async ({ page }) => {
      await page.goto(url);
      const link = page.locator('link[rel="stylesheet"][href="/css/styles.css"]');
      await expect(link).toBeAttached();
    });
  }
});

test.describe('Production build: JS loads', () => {
  for (const url of mainPages) {
    test(`script tag present on ${url}`, async ({ page }) => {
      await page.goto(url);
      const script = page.locator('script[type="module"][src="/scripts/common.js"]');
      await expect(script).toBeAttached();
    });
  }
});

test.describe('Production build: no critical console errors', () => {
  for (const url of mainPages) {
    test(`no JS errors on ${url}`, async ({ page }) => {
      const errors = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      page.on('pageerror', (err) => errors.push(err.message));
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      expect(errors).toHaveLength(0);
    });
  }
});

test.describe('Production build: search', () => {
  test('search returns results for a common query', async ({ page }) => {
    await page.goto('/en/search/?query=CERN');
    await page.waitForSelector('.search-result', { timeout: 10000 });
    const count = await page.locator('.search-result').count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Production build: language switching', () => {
  test('EN page has links to switch to ES, IT, and FR', async ({ page }) => {
    await page.goto('/en/');
    const langLinks = page.locator('a.topnav__lang-option:not(.active)');
    await expect(langLinks).toHaveCount(3);
  });

  test('clicking ES language switch navigates to ES version', async ({ page }) => {
    await page.goto('/en/');
    const langLink = page.locator('a.topnav__lang-option[href*="/es/"]');
    await langLink.click();
    await page.waitForURL('**/es/**');
    expect(page.url()).toContain('/es/');
  });

  test('clicking IT language switch navigates to IT version', async ({ page }) => {
    await page.goto('/en/');
    const langLink = page.locator('a.topnav__lang-option[href*="/it/"]');
    await langLink.click();
    await page.waitForURL('**/it/**');
    expect(page.url()).toContain('/it/');
  });

  test('ES page has links to switch to EN, IT, and FR', async ({ page }) => {
    await page.goto('/es/');
    const langLinks = page.locator('a.topnav__lang-option:not(.active)');
    await expect(langLinks).toHaveCount(3);
  });

  test('IT page has links to switch to EN, ES, and FR', async ({ page }) => {
    await page.goto('/it/');
    const langLinks = page.locator('a.topnav__lang-option:not(.active)');
    await expect(langLinks).toHaveCount(3);
  });
});
