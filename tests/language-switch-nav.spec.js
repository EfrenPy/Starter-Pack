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
      const esLink = page.locator('a.topnav__lang-option[href*="/es/"]');
      await expect(esLink).toBeVisible();
      await esLink.click();
      await expect(page).toHaveURL(new RegExp(pg.es.replace(/[/]/g, '\\/')));
    });

    test(`EN → IT switch on ${pg.name}`, async ({ page }) => {
      await page.goto(pg.en);
      const itLink = page.locator('a.topnav__lang-option[href*="/it/"]');
      await expect(itLink).toBeVisible();
      await itLink.click();
      await expect(page).toHaveURL(new RegExp(pg.it.replace(/[/]/g, '\\/')));
    });

    test(`ES → EN switch on ${pg.name}`, async ({ page }) => {
      await page.goto(pg.es);
      const enLink = page.locator('a.topnav__lang-option[href*="/en/"]');
      await expect(enLink).toBeVisible();
      await enLink.click();
      await expect(page).toHaveURL(new RegExp(pg.en));
    });

    test(`IT → EN switch on ${pg.name}`, async ({ page }) => {
      await page.goto(pg.it);
      const enLink = page.locator('a.topnav__lang-option[href*="/en/"]');
      await expect(enLink).toBeVisible();
      await enLink.click();
      await expect(page).toHaveURL(new RegExp(pg.en));
    });

    test(`active language has active class on ${pg.name} (EN)`, async ({ page }) => {
      await page.goto(pg.en);
      const enLink = page.locator('a.topnav__lang-option[href*="/en/"]');
      await expect(enLink).toHaveClass(/active/);
      await expect(enLink).toHaveAttribute('aria-current', 'true');

      const esLink = page.locator('a.topnav__lang-option[href*="/es/"]');
      await expect(esLink).not.toHaveClass(/active/);
    });

    test(`active language has active class on ${pg.name} (ES)`, async ({ page }) => {
      await page.goto(pg.es);
      const esLink = page.locator('a.topnav__lang-option[href*="/es/"]');
      await expect(esLink).toHaveClass(/active/);
      await expect(esLink).toHaveAttribute('aria-current', 'true');

      const enLink = page.locator('a.topnav__lang-option[href*="/en/"]');
      await expect(enLink).not.toHaveClass(/active/);
    });

    test(`active language has active class on ${pg.name} (IT)`, async ({ page }) => {
      await page.goto(pg.it);
      const itLink = page.locator('a.topnav__lang-option[href*="/it/"]');
      await expect(itLink).toHaveClass(/active/);
      await expect(itLink).toHaveAttribute('aria-current', 'true');

      const enLink = page.locator('a.topnav__lang-option[href*="/en/"]');
      await expect(enLink).not.toHaveClass(/active/);
    });
  }

  test('language switcher shows 4 language options', async ({ page }) => {
    await page.goto('/en/');
    const langOptions = page.locator('a.topnav__lang-option');
    await expect(langOptions).toHaveCount(4);
  });

  test('language switcher links point to correct alternate URL on subpage', async ({ page }) => {
    await page.goto('/en/housing-guide/');
    const esLink = page.locator('a.topnav__lang-option[href*="/es/"]');
    await expect(esLink).toHaveAttribute('href', /\/es\/housing-guide\//);

    const itLink = page.locator('a.topnav__lang-option[href*="/it/"]');
    await expect(itLink).toHaveAttribute('href', /\/it\/housing-guide\//);

    const enLink = page.locator('a.topnav__lang-option[href*="/en/"]');
    await expect(enLink).toHaveAttribute('href', /\/en\/housing-guide\//);
  });

  test('navbar and footer render without XHR placeholders', async ({ page }) => {
    await page.goto('/en/');
    // Navbar should be present immediately (build-time rendered)
    await expect(page.locator('.topnav')).toBeVisible();
    // Footer should be present immediately
    await expect(page.locator('footer')).toBeVisible();
  });
});
