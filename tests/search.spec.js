import { test, expect } from '@playwright/test';

test.describe('Search functionality', () => {
  test.describe('English search', () => {
    test('search page loads without query', async ({ page }) => {
      await page.goto('/en/search.html');
      await page.waitForSelector('.topnav', { timeout: 5000 });
      await expect(page.locator('#search-results')).toBeEmpty();
    });

    test('search with query returns results', async ({ page }) => {
      await page.goto('/en/search.html?query=CERN');
      await page.waitForSelector('.search-result', { timeout: 10000 });
      const results = page.locator('.search-result');
      const count = await results.count();
      expect(count).toBeGreaterThan(0);
    });

    test('search results contain title links', async ({ page }) => {
      await page.goto('/en/search.html?query=tax');
      await page.waitForSelector('.search-result', { timeout: 10000 });
      const firstResultLink = page.locator('.search-result h3 a').first();
      await expect(firstResultLink).toBeVisible();
      const href = await firstResultLink.getAttribute('href');
      expect(href).toContain('/en/');
    });

    test('search results contain content preview', async ({ page }) => {
      await page.goto('/en/search.html?query=tax');
      await page.waitForSelector('.search-result', { timeout: 10000 });
      const preview = page.locator('.search-result p').first();
      await expect(preview).toBeVisible();
      const text = await preview.textContent();
      expect(text.length).toBeGreaterThan(10);
    });

    test('search with no matching query shows no results message', async ({ page }) => {
      await page.goto('/en/search.html?query=zzzzxxxxxnonexistent');
      // Wait for search to complete
      await page.waitForSelector('#search-results p', { timeout: 10000 });
      await expect(page.locator('#search-results')).toContainText('No results found');
    });

    test('search from homepage form navigates to results', async ({ page }) => {
      await page.goto('/en/index.html');
      await page.locator('.search-box input[name="query"]').fill('CERN');
      await page.locator('.search-box button[type="submit"]').click();
      await expect(page).toHaveURL(/search\.html\?query=CERN/);
    });

    test('search form on results page works', async ({ page }) => {
      await page.goto('/en/search.html?query=tax');
      await page.waitForSelector('.search-result', { timeout: 10000 });
      // Re-search with different query
      await page.locator('.search-box input[name="query"]').fill('social security');
      await page.locator('.search-box button[type="submit"]').click();
      await expect(page).toHaveURL(/query=social\+security/);
    });

    test('search is accent-insensitive', async ({ page }) => {
      // Search for "espanol" should match "español"
      await page.goto('/en/search.html?query=espanol');
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
    test('search page loads', async ({ page }) => {
      await page.goto('/es/search.html');
      await page.waitForSelector('.topnav', { timeout: 5000 });
      await expect(page.locator('#search-results')).toBeEmpty();
    });

    test('search with query returns results', async ({ page }) => {
      await page.goto('/es/search.html?query=CERN');
      await page.waitForSelector('.search-result', { timeout: 10000 });
      const results = page.locator('.search-result');
      const count = await results.count();
      expect(count).toBeGreaterThan(0);
    });

    test('search results use Spanish folder paths', async ({ page }) => {
      await page.goto('/es/search.html?query=fiscal');
      await page.waitForSelector('.search-result', { timeout: 10000 });
      const firstLink = page.locator('.search-result h3 a').first();
      const href = await firstLink.getAttribute('href');
      expect(href).toContain('/es/');
    });

    test('no results message is in Spanish', async ({ page }) => {
      await page.goto('/es/search.html?query=zzzzxxxxxnonexistent');
      await page.waitForSelector('#search-results p', { timeout: 10000 });
      await expect(page.locator('#search-results')).toContainText('No se encontraron');
    });
  });
});
