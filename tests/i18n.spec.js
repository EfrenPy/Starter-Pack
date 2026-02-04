import { test, expect } from '@playwright/test';

test.describe('Build-time i18n', () => {
  test('/en/ has lang="en" and English hero title', async ({ page }) => {
    await page.goto('/en/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    const hero = page.locator('h1').first();
    await expect(hero).toContainText(/welcome|starter/i);
  });

  test('/es/ has lang="es" and Spanish hero title', async ({ page }) => {
    await page.goto('/es/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    const hero = page.locator('h1').first();
    await expect(hero).toContainText(/bienvenido|starter/i);
  });

  test('/it/ has lang="it" and Italian hero title', async ({ page }) => {
    await page.goto('/it/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'it');
    const hero = page.locator('h1').first();
    await expect(hero).toContainText(/benvenuto|starter/i);
  });

  test('/en/legal-hub/ has English heading', async ({ page }) => {
    await page.goto('/en/legal-hub/');
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    // Heading should contain English text (not Spanish)
    const text = await heading.textContent();
    expect(text).toBeTruthy();
    expect(text.toLowerCase()).not.toContain('legal y fiscal');
  });

  test('/es/legal-hub/ has Spanish heading', async ({ page }) => {
    await page.goto('/es/legal-hub/');
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    const text = await heading.textContent();
    expect(text).toBeTruthy();
    // Should not contain the English version
    expect(text.toLowerCase()).not.toContain('legal & tax');
  });

  test('/it/legal-hub/ has Italian heading', async ({ page }) => {
    await page.goto('/it/legal-hub/');
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    const text = await heading.textContent();
    expect(text).toBeTruthy();
    expect(text.toLowerCase()).not.toContain('legal & tax');
    expect(text.toLowerCase()).not.toContain('legal y fiscal');
  });

  test('no data-i18n attributes remain in rendered pages', async ({ page }) => {
    await page.goto('/en/');
    const i18nElements = page.locator('[data-i18n]');
    await expect(i18nElements).toHaveCount(0);
  });
});

test.describe('Hreflang alternate links', () => {
  test('/en/ has hreflang links for all three languages', async ({ page }) => {
    await page.goto('/en/');
    const enAlternate = page.locator('link[rel="alternate"][hreflang="en"]');
    const esAlternate = page.locator('link[rel="alternate"][hreflang="es"]');
    const itAlternate = page.locator('link[rel="alternate"][hreflang="it"]');
    await expect(enAlternate).toHaveCount(1);
    await expect(esAlternate).toHaveCount(1);
    await expect(itAlternate).toHaveCount(1);
    await expect(enAlternate).toHaveAttribute('href', /\/en\//);
    await expect(esAlternate).toHaveAttribute('href', /\/es\//);
    await expect(itAlternate).toHaveAttribute('href', /\/it\//);
  });

  test('/es/ has hreflang links for all three languages', async ({ page }) => {
    await page.goto('/es/');
    const enAlternate = page.locator('link[rel="alternate"][hreflang="en"]');
    const esAlternate = page.locator('link[rel="alternate"][hreflang="es"]');
    const itAlternate = page.locator('link[rel="alternate"][hreflang="it"]');
    await expect(enAlternate).toHaveCount(1);
    await expect(esAlternate).toHaveCount(1);
    await expect(itAlternate).toHaveCount(1);
    await expect(enAlternate).toHaveAttribute('href', /\/en\//);
    await expect(esAlternate).toHaveAttribute('href', /\/es\//);
    await expect(itAlternate).toHaveAttribute('href', /\/it\//);
  });

  test('/it/ has hreflang links for all three languages', async ({ page }) => {
    await page.goto('/it/');
    const enAlternate = page.locator('link[rel="alternate"][hreflang="en"]');
    const esAlternate = page.locator('link[rel="alternate"][hreflang="es"]');
    const itAlternate = page.locator('link[rel="alternate"][hreflang="it"]');
    await expect(enAlternate).toHaveCount(1);
    await expect(esAlternate).toHaveCount(1);
    await expect(itAlternate).toHaveCount(1);
    await expect(enAlternate).toHaveAttribute('href', /\/en\//);
    await expect(esAlternate).toHaveAttribute('href', /\/es\//);
    await expect(itAlternate).toHaveAttribute('href', /\/it\//);
  });

  test('subpage /en/legal-hub/ has correct hreflang links', async ({ page }) => {
    await page.goto('/en/legal-hub/');
    const enAlternate = page.locator('link[rel="alternate"][hreflang="en"]');
    const esAlternate = page.locator('link[rel="alternate"][hreflang="es"]');
    const itAlternate = page.locator('link[rel="alternate"][hreflang="it"]');
    await expect(enAlternate).toHaveAttribute('href', /\/en\/legal-hub\//);
    await expect(esAlternate).toHaveAttribute('href', /\/es\/legal-hub\//);
    await expect(itAlternate).toHaveAttribute('href', /\/it\/legal-hub\//);
  });
});

test.describe('Language switcher links point to correct alternate URLs', () => {
  test('EN homepage switcher links to ES and IT homepages', async ({ page }) => {
    await page.goto('/en/');
    const esLink = page.locator('a.topnav__lang-option[href*="/es/"]');
    const itLink = page.locator('a.topnav__lang-option[href*="/it/"]');
    await expect(esLink).toHaveAttribute('href', /\/es\//);
    await expect(itLink).toHaveAttribute('href', /\/it\//);
  });

  test('ES homepage switcher links to EN and IT homepages', async ({ page }) => {
    await page.goto('/es/');
    const enLink = page.locator('a.topnav__lang-option[href*="/en/"]');
    const itLink = page.locator('a.topnav__lang-option[href*="/it/"]');
    await expect(enLink).toHaveAttribute('href', /\/en\//);
    await expect(itLink).toHaveAttribute('href', /\/it\//);
  });

  test('IT homepage switcher links to EN and ES homepages', async ({ page }) => {
    await page.goto('/it/');
    const enLink = page.locator('a.topnav__lang-option[href*="/en/"]');
    const esLink = page.locator('a.topnav__lang-option[href*="/es/"]');
    await expect(enLink).toHaveAttribute('href', /\/en\//);
    await expect(esLink).toHaveAttribute('href', /\/es\//);
  });

  test('EN subpage switcher links to corresponding ES and IT subpages', async ({ page }) => {
    await page.goto('/en/housing-guide/');
    const esLink = page.locator('a.topnav__lang-option[href*="/es/"]');
    const itLink = page.locator('a.topnav__lang-option[href*="/it/"]');
    await expect(esLink).toHaveAttribute('href', /\/es\/housing-guide\//);
    await expect(itLink).toHaveAttribute('href', /\/it\/housing-guide\//);
  });

  test('ES subpage switcher links to corresponding EN and IT subpages', async ({ page }) => {
    await page.goto('/es/housing-guide/');
    const enLink = page.locator('a.topnav__lang-option[href*="/en/"]');
    const itLink = page.locator('a.topnav__lang-option[href*="/it/"]');
    await expect(enLink).toHaveAttribute('href', /\/en\/housing-guide\//);
    await expect(itLink).toHaveAttribute('href', /\/it\/housing-guide\//);
  });

  test('IT subpage switcher links to corresponding EN and ES subpages', async ({ page }) => {
    await page.goto('/it/housing-guide/');
    const enLink = page.locator('a.topnav__lang-option[href*="/en/"]');
    const esLink = page.locator('a.topnav__lang-option[href*="/es/"]');
    await expect(enLink).toHaveAttribute('href', /\/en\/housing-guide\//);
    await expect(esLink).toHaveAttribute('href', /\/es\/housing-guide\//);
  });
});
