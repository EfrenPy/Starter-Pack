import { test, expect } from '@playwright/test';

test.describe('Internationalization (i18n)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.goto('/');
    await page.waitForSelector('.language-switch', { timeout: 5000 });
  });

  test('default language is Spanish', async ({ page }) => {
    const heading = page.locator('h1[data-i18n="hero_title"]');
    await expect(heading).toContainText('Bienvenido');
  });

  test('switch to English updates all data-i18n elements', async ({ page }) => {
    await page.locator('.language-switch[data-lang="en"]').click();

    await expect(page.locator('h1[data-i18n="hero_title"]')).toHaveText(
      'Welcome to the Starter Pack'
    );
    await expect(page.locator('[data-i18n="search_button"]')).toHaveText('Search');
    await expect(page.locator('[data-i18n="card_legal_title"]')).toHaveText('Legal & Tax Help');
  });

  test('switch to Spanish updates all data-i18n elements', async ({ page }) => {
    await page.locator('.language-switch[data-lang="en"]').click();
    await page.locator('.language-switch[data-lang="es"]').click();

    await expect(page.locator('h1[data-i18n="hero_title"]')).toContainText('Bienvenido');
    await expect(page.locator('[data-i18n="search_button"]')).toHaveText('Buscar');
  });

  test('navbar translations update on language switch', async ({ page }) => {
    // On desktop, nav links are always visible (no toggle needed)
    await expect(page.locator('[data-i18n="nav_home"]')).toHaveText('Inicio');

    await page.locator('.language-switch[data-lang="en"]').click();
    await expect(page.locator('[data-i18n="nav_home"]')).toHaveText('Home');
  });

  test('footer translations update', async ({ page }) => {
    await page.waitForSelector('[data-i18n="footer_contact_text"]', { timeout: 5000 });

    await page.locator('.language-switch[data-lang="en"]').click();
    await expect(page.locator('[data-i18n="footer_contact_text"]')).toHaveText('Questions or suggestions?');

    await page.locator('.language-switch[data-lang="es"]').click();
    await expect(page.locator('[data-i18n="footer_contact_text"]')).toHaveText('Tienes dudas o sugerencias?');
  });

  test('search placeholder updates on language switch', async ({ page }) => {
    await page.locator('.language-switch[data-lang="en"]').click();
    await expect(page.locator('[data-i18n-placeholder="search_placeholder"]')).toHaveAttribute(
      'placeholder',
      'Search articles...'
    );

    await page.locator('.language-switch[data-lang="es"]').click();
    await expect(page.locator('[data-i18n-placeholder="search_placeholder"]')).toHaveAttribute(
      'placeholder',
      /Buscar/
    );
  });

  test('language persists after navigation', async ({ page }) => {
    await page.locator('.language-switch[data-lang="en"]').click();
    await page.goto('/');
    await page.waitForSelector('.language-switch', { timeout: 5000 });

    const heading = page.locator('h1[data-i18n="hero_title"]');
    await expect(heading).toHaveText('Welcome to the Starter Pack');
  });
});

test.describe('i18n link href updates', () => {
  test('legal hub link changes to /en/ when switching to English', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.language-switch', { timeout: 5000 });

    const legalLink = page.locator('[data-i18n-href="card_legal_href"]').first();
    await expect(legalLink).toHaveAttribute('href', '/es/legal-hub.html');

    await page.locator('.language-switch[data-lang="en"]').click();
    await expect(legalLink).toHaveAttribute('href', '/en/legal-hub.html');
  });

  test('legal hub link changes back to /es/ when switching to Spanish', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.language-switch', { timeout: 5000 });

    await page.locator('.language-switch[data-lang="en"]').click();
    await page.locator('.language-switch[data-lang="es"]').click();

    const legalLink = page.locator('[data-i18n-href="card_legal_href"]').first();
    await expect(legalLink).toHaveAttribute('href', '/es/legal-hub.html');
  });

  test('search form action changes with language', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.language-switch', { timeout: 5000 });

    await page.locator('.language-switch[data-lang="en"]').click();
    await expect(page.locator('[data-i18n-action="search_action"]')).toHaveAttribute(
      'action',
      '/en/search.html'
    );

    await page.locator('.language-switch[data-lang="es"]').click();
    await expect(page.locator('[data-i18n-action="search_action"]')).toHaveAttribute(
      'action',
      '/es/search.html'
    );
  });

  test('navbar legal link updates with language switch', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.language-switch', { timeout: 5000 });

    // On desktop, nav links are always visible
    const navLegal = page.locator('.topnav__links [data-i18n-href="nav_legal_href"]');
    await expect(navLegal).toHaveAttribute('href', '/es/legal-hub.html');

    await page.locator('.language-switch[data-lang="en"]').click();
    await expect(navLegal).toHaveAttribute('href', '/en/legal-hub.html');
  });
});

test.describe('i18n on beginning page (dotted keys)', () => {
  test('beginning page loads translations with dotted keys', async ({ page }) => {
    await page.goto('/beginning.html');
    await page.waitForSelector('.language-switch', { timeout: 5000 });

    const sectionTitle = page.locator('[data-i18n="beforeMove.title"]');
    await expect(sectionTitle).toBeVisible();
    await expect(sectionTitle).not.toHaveText('');

    await page.locator('.language-switch[data-lang="en"]').click();
    await expect(sectionTitle).toContainText('Before You Move');
  });

  test('beginning page bracket-notation keys work', async ({ page }) => {
    await page.goto('/beginning.html');
    await page.waitForSelector('.language-switch', { timeout: 5000 });

    await page.locator('.language-switch[data-lang="en"]').click();
    const step = page.locator('[data-i18n="beforeMove.steps[0]"]');
    await expect(step).toContainText('Register at the Spanish Consulate');
  });
});
