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
  '/en/legal-hub/',
  '/en/technical-hub/',
  '/en/housing-guide/',
  '/en/search/',
  '/en/faq/',
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
  test('EN page has link to switch to ES', async ({ page }) => {
    await page.goto('/en/');
    const langLink = page.locator('a.topnav__lang-option:not(.active)');
    await expect(langLink).toBeVisible();
    const href = await langLink.getAttribute('href');
    expect(href).toContain('/es/');
  });

  test('clicking language switch navigates to ES version', async ({ page }) => {
    await page.goto('/en/');
    const langLink = page.locator('a.topnav__lang-option:not(.active)');
    await langLink.click();
    await page.waitForURL('**/es/**');
    expect(page.url()).toContain('/es/');
  });

  test('ES page has link to switch to EN', async ({ page }) => {
    await page.goto('/es/');
    const langLink = page.locator('a.topnav__lang-option:not(.active)');
    await expect(langLink).toBeVisible();
    const href = await langLink.getAttribute('href');
    expect(href).toContain('/en/');
  });

  test('clicking language switch navigates to EN version', async ({ page }) => {
    await page.goto('/es/');
    const langLink = page.locator('a.topnav__lang-option:not(.active)');
    await langLink.click();
    await page.waitForURL('**/en/**');
    expect(page.url()).toContain('/en/');
  });
});
