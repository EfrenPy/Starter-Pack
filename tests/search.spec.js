import { test, expect } from '@playwright/test';

test.describe('Search functionality', () => {
  test.describe('English search', () => {
    test('search page loads at /en/search/', async ({ page }) => {
      await page.goto('/en/search/');
      await expect(page.locator('main#main-content')).toBeVisible();
      await expect(page.locator('#search-results')).toBeEmpty();
    });

    test('search with query parameter shows results', async ({ page }) => {
      await page.goto('/en/search/?query=housing');
      await page.waitForSelector('.search-result', { timeout: 10000 });
      const results = page.locator('.search-result');
      const count = await results.count();
      expect(count).toBeGreaterThan(0);
    });

    test('search results contain links with /en/ paths', async ({ page }) => {
      await page.goto('/en/search/?query=tax');
      await page.waitForSelector('.search-result', { timeout: 10000 });
      const firstResultLink = page.locator('.search-result h3 a').first();
      await expect(firstResultLink).toBeVisible();
      const href = await firstResultLink.getAttribute('href');
      expect(href).toContain('/en/');
    });

    test('search results contain preview text', async ({ page }) => {
      await page.goto('/en/search/?query=tax');
      await page.waitForSelector('.search-result', { timeout: 10000 });
      const preview = page.locator('.search-result p').first();
      await expect(preview).toBeVisible();
      const text = await preview.textContent();
      expect(text.length).toBeGreaterThan(10);
    });

    test('no results message for gibberish query', async ({ page }) => {
      await page.goto('/en/search/?query=zzzzxxxxxnonexistent');
      await page.waitForSelector('#search-results p', { timeout: 10000 });
      await expect(page.locator('#search-results')).toContainText('No results found');
    });

    test('search form submission works', async ({ page }) => {
      await page.goto('/en/search/?query=CERN');
      await page.waitForSelector('.search-result', { timeout: 10000 });
      const results = page.locator('.search-result');
      const count = await results.count();
      expect(count).toBeGreaterThan(0);
    });

    test('re-search on results page works', async ({ page }) => {
      await page.goto('/en/search/?query=tax');
      await page.waitForSelector('.search-result', { timeout: 10000 });
      await page.locator('.search-box input[name="query"]').fill('social security');
      await page.locator('.search-box button[type="submit"]').click();
      await expect(page).toHaveURL(/query=social\+security/);
    });

    test('accent-insensitive search works', async ({ page }) => {
      await page.goto('/en/search/?query=espanol');
      await page.waitForFunction(
        () => document.querySelector('#search-results')?.children.length > 0,
        { timeout: 10000 }
      );
      const results = page.locator('#search-results').locator('.search-result, p');
      const count = await results.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Spanish search', () => {
    test('search page loads at /es/search/', async ({ page }) => {
      await page.goto('/es/search/');
      await expect(page.locator('main#main-content')).toBeVisible();
      await expect(page.locator('#search-results')).toBeEmpty();
    });

    test('search with query parameter shows results', async ({ page }) => {
      await page.goto('/es/search/?query=CERN');
      await page.waitForSelector('.search-result', { timeout: 10000 });
      const results = page.locator('.search-result');
      const count = await results.count();
      expect(count).toBeGreaterThan(0);
    });

    test('search results use /es/ paths', async ({ page }) => {
      await page.goto('/es/search/?query=fiscal');
      await page.waitForSelector('.search-result', { timeout: 10000 });
      const firstLink = page.locator('.search-result h3 a').first();
      const href = await firstLink.getAttribute('href');
      expect(href).toContain('/es/');
    });

    test('no results message is in Spanish', async ({ page }) => {
      await page.goto('/es/search/?query=zzzzxxxxxnonexistent');
      await page.waitForSelector('#search-results p', { timeout: 10000 });
      await expect(page.locator('#search-results')).toContainText('No se encontraron');
    });

    test('accent-insensitive search works in Spanish', async ({ page }) => {
      await page.goto('/es/search/?query=declaracion');
      await page.waitForFunction(
        () => document.querySelector('#search-results')?.children.length > 0,
        { timeout: 10000 }
      );
      const results = page.locator('#search-results').locator('.search-result, p');
      const count = await results.count();
      expect(count).toBeGreaterThan(0);
    });
  });
});
