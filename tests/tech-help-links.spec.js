import { test, expect } from '@playwright/test';

test.describe('Tech help links point to real pages', () => {
  test('EN index main card tech help link works', async ({ page }) => {
    await page.goto('/en/index.html');
    await page.waitForSelector('.card-grid', { timeout: 5000 });
    const techLink = page.locator('.card-grid a[data-i18n-href="card_tech_href"]');
    const href = await techLink.getAttribute('href');
    expect(href).toBeTruthy();

    await techLink.click();
    await page.waitForSelector('h1', { timeout: 5000 });
    await expect(page).toHaveURL(/technical-hub\.html/);
  });

  test('ES index main card tech help link works', async ({ page }) => {
    await page.goto('/es/index.html');
    await page.waitForSelector('.card-grid', { timeout: 5000 });
    const techLink = page.locator('.card-grid a[data-i18n-href="card_tech_href"]');
    const href = await techLink.getAttribute('href');
    expect(href).toBeTruthy();

    await techLink.click();
    await page.waitForSelector('h1', { timeout: 5000 });
    await expect(page).toHaveURL(/technical-hub\.html/);
  });

  test('root page tech help link updates href with language switch', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.language-switch', { timeout: 5000 });

    const techLink = page.locator('[data-i18n-href="card_tech_href"]');
    await expect(techLink).toHaveAttribute('href', '/es/technical-hub.html');

    await page.locator('.language-switch[data-lang="en"]').click();
    await expect(techLink).toHaveAttribute('href', '/en/technical-hub.html');
  });

  test('root navbar tech help link updates href with language switch', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.language-switch', { timeout: 5000 });

    const navTechLink = page.locator('.topnav__links [data-i18n-href="nav_tech_href"]');
    await expect(navTechLink).toHaveAttribute('href', '/es/technical-hub.html');

    await page.locator('.language-switch[data-lang="en"]').click();
    await expect(navTechLink).toHaveAttribute('href', '/en/technical-hub.html');
  });
});

test.describe('Tech help navbar links (mobile)', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('EN navbar tech help link goes to technical-hub page', async ({ page }) => {
    await page.goto('/en/index.html');
    await page.waitForSelector('#menu-toggle', { timeout: 5000 });
    await page.locator('#menu-toggle').click();

    const techLink = page.locator('.topnav__links a[data-i18n="nav_tech"]');
    await expect(techLink).toBeVisible();
    const href = await techLink.getAttribute('href');
    expect(href).toContain('technical-hub');

    await techLink.click();
    await page.waitForSelector('h1', { timeout: 5000 });
    await expect(page).toHaveURL(/technical-hub\.html/);
  });

  test('ES navbar tech help link goes to technical-hub page', async ({ page }) => {
    await page.goto('/es/index.html');
    await page.waitForSelector('#menu-toggle', { timeout: 5000 });
    await page.locator('#menu-toggle').click();

    const techLink = page.locator('.topnav__links a[data-i18n="nav_tech"]');
    await expect(techLink).toBeVisible();
    const href = await techLink.getAttribute('href');
    expect(href).toContain('technical-hub');

    await techLink.click();
    await page.waitForSelector('h1', { timeout: 5000 });
    await expect(page).toHaveURL(/technical-hub\.html/);
  });
});
