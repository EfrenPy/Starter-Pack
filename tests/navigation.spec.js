import { test, expect } from '@playwright/test';

test.describe('Navbar link navigation', () => {
  test('EN navbar legal-hub link navigates correctly', async ({ page }) => {
    await page.goto('/en/');
    await page.locator('.topnav__links a[href="/en/legal-hub/"]').click();
    await expect(page).toHaveURL(/\/en\/legal-hub\/$/);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main#main-content')).toBeVisible();
  });

  test('EN navbar daily-life-hub link navigates correctly', async ({ page }) => {
    await page.goto('/en/');
    await page.locator('.topnav__links a[href="/en/daily-life-hub/"]').click();
    await expect(page).toHaveURL(/\/en\/daily-life-hub\/$/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('ES navbar legal-hub link navigates correctly', async ({ page }) => {
    await page.goto('/es/');
    await page.locator('.topnav__links a[href="/es/legal-hub/"]').click();
    await expect(page).toHaveURL(/\/es\/legal-hub\/$/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('ES navbar daily-life-hub link navigates correctly', async ({ page }) => {
    await page.goto('/es/');
    await page.locator('.topnav__links a[href="/es/daily-life-hub/"]').click();
    await expect(page).toHaveURL(/\/es\/daily-life-hub\/$/);
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('Card link navigation on homepage', () => {
  test('EN homepage card navigates to legal-hub', async ({ page }) => {
    await page.goto('/en/');
    await page.locator('a.card[href="legal-hub/"]').click();
    await expect(page).toHaveURL(/\/en\/legal-hub\/$/);
    await expect(page.locator('main#main-content')).toBeVisible();
  });

  test('ES homepage card navigates to legal-hub', async ({ page }) => {
    await page.goto('/es/');
    await page.locator('a.card[href="legal-hub/"]').click();
    await expect(page).toHaveURL(/\/es\/legal-hub\/$/);
    await expect(page.locator('main#main-content')).toBeVisible();
  });
});

test.describe('Subpage navigation back to home', () => {
  test('EN subpage navbar home link returns to homepage', async ({ page }) => {
    await page.goto('/en/legal-hub/');
    await page.locator('.topnav__links a[href="/en/"]').click();
    await expect(page).toHaveURL(/\/en\/$/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('ES subpage navbar home link returns to homepage', async ({ page }) => {
    await page.goto('/es/legal-hub/');
    await page.locator('.topnav__links a[href="/es/"]').click();
    await expect(page).toHaveURL(/\/es\/$/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('EN technical subpage navigates back to home', async ({ page }) => {
    await page.goto('/en/technical/vscode-remote/');
    await page.locator('.topnav__links a[href="/en/"]').click();
    await expect(page).toHaveURL(/\/en\/$/);
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('EN and ES pages load correctly', () => {
  test('EN homepage loads with navbar, content, and footer', async ({ page }) => {
    await page.goto('/en/');
    await expect(page.locator('.topnav')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.site-footer')).toBeVisible();
  });

  test('ES homepage loads with navbar, content, and footer', async ({ page }) => {
    await page.goto('/es/');
    await expect(page.locator('.topnav')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.site-footer')).toBeVisible();
  });

  test('EN beginning page loads correctly', async ({ page }) => {
    await page.goto('/en/beginning/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main#main-content')).toBeVisible();
  });

  test('ES beginning page loads correctly', async ({ page }) => {
    await page.goto('/es/beginning/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main#main-content')).toBeVisible();
  });

  test('EN technical/vscode-remote loads correctly', async ({ page }) => {
    await page.goto('/en/technical/vscode-remote/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main#main-content')).toBeVisible();
  });

  test('ES technical/vscode-remote loads correctly', async ({ page }) => {
    await page.goto('/es/technical/vscode-remote/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main#main-content')).toBeVisible();
  });
});

test.describe('Mobile menu navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('EN mobile menu toggle and navigate to legal-hub', async ({ page }) => {
    await page.goto('/en/');
    await page.locator('#menu-toggle').click();
    await expect(page.locator('.topnav__links')).toBeVisible();
    await page.locator('.topnav__links a[href="/en/legal-hub/"]').click();
    await expect(page).toHaveURL(/\/en\/legal-hub\/$/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('ES mobile menu toggle and navigate to home', async ({ page }) => {
    await page.goto('/es/legal-hub/');
    await page.locator('#menu-toggle').click();
    await expect(page.locator('.topnav__links')).toBeVisible();
    await page.locator('.topnav__links a[href="/es/"]').click();
    await expect(page).toHaveURL(/\/es\/$/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('EN mobile menu toggle and navigate from subpage', async ({ page }) => {
    await page.goto('/en/technical/vscode-remote/');
    await page.locator('#menu-toggle').click();
    await expect(page.locator('.topnav__links')).toBeVisible();
    await page.locator('.topnav__links a[href="/en/daily-life-hub/"]').click();
    await expect(page).toHaveURL(/\/en\/daily-life-hub\/$/);
    await expect(page.locator('h1')).toBeVisible();
  });
});
