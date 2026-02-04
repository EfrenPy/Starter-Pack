import { test, expect } from '@playwright/test';

test.describe('Language switch navigates between /en/, /es/, and /it/ pages', () => {
  const pages = [
    { en: '/en/', es: '/es/', it: '/it/', name: 'homepage' },
    { en: '/en/housing-guide/', es: '/es/housing-guide/', it: '/it/housing-guide/', name: 'housing-guide (content page)' },
    { en: '/en/legal-hub/', es: '/es/legal-hub/', it: '/it/legal-hub/', name: 'legal-hub (hub page)' },
    { en: '/en/technical/vscode-remote/', es: '/es/technical/vscode-remote/', it: '/it/technical/vscode-remote/', name: 'vscode-remote (nested page)' },
  ];

  for (const pg of pages) {
    test(`EN page loads English content on ${pg.name}`, async ({ page }) => {
      await page.goto(pg.en);
      await expect(page).toHaveURL(new RegExp(pg.en));
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    });

    test(`ES page loads Spanish content on ${pg.name}`, async ({ page }) => {
      await page.goto(pg.es);
      await expect(page).toHaveURL(new RegExp(pg.es.replace(/[/]/g, '\\/')));
      await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    });

    test(`IT page loads Italian content on ${pg.name}`, async ({ page }) => {
      await page.goto(pg.it);
      await expect(page).toHaveURL(new RegExp(pg.it.replace(/[/]/g, '\\/')));
      await expect(page.locator('html')).toHaveAttribute('lang', 'it');
    });

    test(`EN → ES switch on ${pg.name}`, async ({ page }) => {
      await page.goto(pg.en);
      await page.locator('.topnav__lang-btn').click();
      const esLink = page.locator('.topnav__lang-menu a[href*="/es/"]');
      await esLink.click();
      await expect(page).toHaveURL(new RegExp(pg.es.replace(/[/]/g, '\\/')));
    });

    test(`EN → IT switch on ${pg.name}`, async ({ page }) => {
      await page.goto(pg.en);
      await page.locator('.topnav__lang-btn').click();
      const itLink = page.locator('.topnav__lang-menu a[href*="/it/"]');
      await itLink.click();
      await expect(page).toHaveURL(new RegExp(pg.it.replace(/[/]/g, '\\/')));
    });

    test(`ES → EN switch on ${pg.name}`, async ({ page }) => {
      await page.goto(pg.es);
      await page.locator('.topnav__lang-btn').click();
      const enLink = page.locator('.topnav__lang-menu a[href*="/en/"]');
      await enLink.click();
      await expect(page).toHaveURL(new RegExp(pg.en));
    });

    test(`IT → EN switch on ${pg.name}`, async ({ page }) => {
      await page.goto(pg.it);
      await page.locator('.topnav__lang-btn').click();
      const enLink = page.locator('.topnav__lang-menu a[href*="/en/"]');
      await enLink.click();
      await expect(page).toHaveURL(new RegExp(pg.en));
    });

    test(`language dropdown shows current language on ${pg.name} (EN)`, async ({ page }) => {
      await page.goto(pg.en);
      const langBtn = page.locator('.topnav__lang-btn');
      await expect(langBtn).toContainText('EN');
      // Active language should NOT appear in the dropdown menu
      const enLink = page.locator('.topnav__lang-menu a[href*="/en/"]');
      await expect(enLink).toHaveCount(0);
    });

    test(`language dropdown shows current language on ${pg.name} (ES)`, async ({ page }) => {
      await page.goto(pg.es);
      const langBtn = page.locator('.topnav__lang-btn');
      await expect(langBtn).toContainText('ES');
      const esLink = page.locator('.topnav__lang-menu a[href*="/es/"]');
      await expect(esLink).toHaveCount(0);
    });

    test(`language dropdown shows current language on ${pg.name} (IT)`, async ({ page }) => {
      await page.goto(pg.it);
      const langBtn = page.locator('.topnav__lang-btn');
      await expect(langBtn).toContainText('IT');
      const itLink = page.locator('.topnav__lang-menu a[href*="/it/"]');
      await expect(itLink).toHaveCount(0);
    });
  }

  test('language dropdown shows 3 other language options', async ({ page }) => {
    await page.goto('/en/');
    const langOptions = page.locator('.topnav__lang-menu a');
    await expect(langOptions).toHaveCount(3);
  });

  test('language switcher links point to correct alternate URL on subpage', async ({ page }) => {
    await page.goto('/en/housing-guide/');
    const esLink = page.locator('.topnav__lang-menu a[href*="/es/"]');
    await expect(esLink).toHaveAttribute('href', /\/es\/housing-guide\//);

    const itLink = page.locator('.topnav__lang-menu a[href*="/it/"]');
    await expect(itLink).toHaveAttribute('href', /\/it\/housing-guide\//);
  });

  test('navbar and footer render without XHR placeholders', async ({ page }) => {
    await page.goto('/en/');
    // Navbar should be present immediately (build-time rendered)
    await expect(page.locator('.topnav')).toBeVisible();
    // Footer should be present immediately
    await expect(page.locator('footer')).toBeVisible();
  });
});
