import { test, expect } from '@playwright/test';

const TECHNICAL_PAGES = [
  'vscode-remote',
  'kerberos-ssh',
  'root-setup',
  'gitlab-setup',
  'cern-it-basics',
];

test.describe('Technical hub card links', () => {
  test('EN technical hub has card links to all technical pages', async ({ page }) => {
    await page.goto('/en/technical-hub/');
    await page.waitForSelector('.card-grid', { timeout: 5000 });

    for (const slug of TECHNICAL_PAGES) {
      const expectedHref = `/en/technical/${slug}/`;
      const link = page.locator(`.card-grid a[href="${expectedHref}"]`);
      await expect(link, `card link to ${expectedHref} should exist`).toHaveCount(1);
    }
  });

  test('ES technical hub has card links to all technical pages', async ({ page }) => {
    await page.goto('/es/technical-hub/');
    await page.waitForSelector('.card-grid', { timeout: 5000 });

    for (const slug of TECHNICAL_PAGES) {
      const expectedHref = `/es/technical/${slug}/`;
      const link = page.locator(`.card-grid a[href="${expectedHref}"]`);
      await expect(link, `card link to ${expectedHref} should exist`).toHaveCount(1);
    }
  });

  test('clicking an EN card link navigates to the correct page', async ({ page }) => {
    await page.goto('/en/technical-hub/');
    await page.waitForSelector('.card-grid', { timeout: 5000 });

    const link = page.locator('.card-grid a[href="/en/technical/vscode-remote/"]');
    await link.click();
    await page.waitForSelector('h1', { timeout: 5000 });
    await expect(page).toHaveURL(/\/en\/technical\/vscode-remote\//);
  });

  test('clicking an ES card link navigates to the correct page', async ({ page }) => {
    await page.goto('/es/technical-hub/');
    await page.waitForSelector('.card-grid', { timeout: 5000 });

    const link = page.locator('.card-grid a[href="/es/technical/kerberos-ssh/"]');
    await link.click();
    await page.waitForSelector('h1', { timeout: 5000 });
    await expect(page).toHaveURL(/\/es\/technical\/kerberos-ssh\//);
  });
});

test.describe('Navbar has technical hub link', () => {
  test('EN navbar contains a link to technical-hub', async ({ page }) => {
    await page.goto('/en/technical-hub/');
    await page.waitForSelector('.topnav__links', { timeout: 5000 });

    const navLink = page.locator('.topnav__links a[href="/en/technical-hub/"]');
    await expect(navLink).toHaveCount(1);
  });

  test('ES navbar contains a link to technical-hub', async ({ page }) => {
    await page.goto('/es/technical-hub/');
    await page.waitForSelector('.topnav__links', { timeout: 5000 });

    const navLink = page.locator('.topnav__links a[href="/es/technical-hub/"]');
    await expect(navLink).toHaveCount(1);
  });
});

test.describe('Mobile menu shows technical hub link', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('EN mobile menu shows technical hub link and navigates', async ({ page }) => {
    await page.goto('/en/technical-hub/');
    await page.waitForSelector('#menu-toggle', { timeout: 5000 });
    await page.locator('#menu-toggle').click();

    const techLink = page.locator('.topnav__links a[href="/en/technical-hub/"]');
    await expect(techLink).toBeVisible();

    await techLink.click();
    await page.waitForSelector('h1', { timeout: 5000 });
    await expect(page).toHaveURL(/\/en\/technical-hub\//);
  });

  test('ES mobile menu shows technical hub link and navigates', async ({ page }) => {
    await page.goto('/es/technical-hub/');
    await page.waitForSelector('#menu-toggle', { timeout: 5000 });
    await page.locator('#menu-toggle').click();

    const techLink = page.locator('.topnav__links a[href="/es/technical-hub/"]');
    await expect(techLink).toBeVisible();

    await techLink.click();
    await page.waitForSelector('h1', { timeout: 5000 });
    await expect(page).toHaveURL(/\/es\/technical-hub\//);
  });
});
