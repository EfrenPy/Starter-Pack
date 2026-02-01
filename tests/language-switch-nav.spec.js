import { test, expect } from '@playwright/test';

test.describe('Language switch navigates between /en/ and /es/ pages', () => {
  const pageVariants = [
    { en: '/en/index.html', es: '/es/index.html', name: 'index' },
    { en: '/en/beginning.html', es: '/es/beginning.html', name: 'beginning' },
    { en: '/en/legal-hub.html', es: '/es/legal-hub.html', name: 'legal-hub' },
    { en: '/en/tax_declaration_spain.html', es: '/es/tax_declaration_spain.html', name: 'tax declaration' },
    { en: '/en/search.html', es: '/es/search.html', name: 'search' },
    { en: '/en/complete.html', es: '/es/complete.html', name: 'complete' },
    { en: '/en/technical/vscode-remote.html', es: '/es/technical/vscode-remote.html', name: 'vscode-remote' },
  ];

  for (const variant of pageVariants) {
    test(`EN → ES switch on ${variant.name}`, async ({ page }) => {
      await page.goto(variant.en);
      await page.waitForSelector('.language-switch', { timeout: 5000 });
      await page.locator('.language-switch[data-lang="es"]').click();
      await page.waitForSelector('.topnav', { timeout: 5000 });
      await expect(page).toHaveURL(variant.es);
    });

    test(`ES → EN switch on ${variant.name}`, async ({ page }) => {
      await page.goto(variant.es);
      await page.waitForSelector('.language-switch', { timeout: 5000 });
      await page.locator('.language-switch[data-lang="en"]').click();
      await page.waitForSelector('.topnav', { timeout: 5000 });
      await expect(page).toHaveURL(variant.en);
    });
  }

  test('language switch on root page applies translations (no navigation)', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.language-switch', { timeout: 5000 });

    // Switch to English — should stay on root, not navigate
    await page.locator('.language-switch[data-lang="en"]').click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1[data-i18n="hero_title"]')).toHaveText(
      'Welcome to the Starter Pack'
    );
  });

  test('language switch saves preference to localStorage', async ({ page }) => {
    await page.goto('/en/index.html');
    await page.waitForSelector('.language-switch', { timeout: 5000 });
    await page.locator('.language-switch[data-lang="es"]').click();
    await page.waitForURL(/\/es\/index\.html/);

    const lang = await page.evaluate(() => localStorage.getItem('language'));
    expect(lang).toBe('es');
  });
});
