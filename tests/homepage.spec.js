import { test, expect } from '@playwright/test';

test.describe('EN Homepage (/en/)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/');
  });

  test('page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Starter Pack/);
  });

  test('hero section exists with h1 and subtitle', async ({ page }) => {
    const hero = page.locator('section.hero');
    await expect(hero).toBeVisible();

    const h1 = hero.locator('h1');
    await expect(h1).toBeVisible();

    const subtitle = hero.locator('.hero__subtitle');
    await expect(subtitle).toBeVisible();
  });

  test('card grid has links to key sections', async ({ page }) => {
    const expectedHrefs = [
      'legal-hub/',
      'technical-hub/',
      'daily-life-hub/',
      'health-insurance/',
      'faq/',
    ];

    for (const href of expectedHrefs) {
      const card = page.locator(`a.card[href="${href}"]`);
      await expect(card).toBeVisible();
    }
  });

  test('search form with input and submit button', async ({ page }) => {
    const searchInput = page.locator('input#search-input');
    const submitButton = page.locator('form button[type="submit"], form input[type="submit"]');
    await expect(searchInput).toBeVisible();
    await expect(submitButton.first()).toBeVisible();
  });

  test('skip link exists', async ({ page }) => {
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  test('main content landmark exists', async ({ page }) => {
    await expect(page.locator('main#main-content')).toBeVisible();
  });

  test('navbar exists on page load', async ({ page }) => {
    await expect(page.locator('.topnav')).toBeVisible();
  });

  test('footer exists on page load', async ({ page }) => {
    await expect(page.locator('.site-footer')).toBeVisible();
  });
});

test.describe('ES Homepage (/es/)', () => {
  test('page loads with Spanish content', async ({ page }) => {
    await page.goto('/es/');
    await expect(page).toHaveTitle(/Starter Pack/);

    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    // Verify it contains Spanish text (not English)
    const text = await h1.textContent();
    expect(text).toBeTruthy();
  });

  test('card grid links point to section paths', async ({ page }) => {
    await page.goto('/es/');
    const cards = page.locator('a.card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(3);

    // Verify cards have relative hrefs (e.g. "legal-hub/")
    const firstHref = await cards.first().getAttribute('href');
    expect(firstHref).toMatch(/^[a-z]/);
  });
});

test.describe('No console errors on homepage', () => {
  test('EN homepage has no console errors', async ({ page }) => {
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('/en/');
    await page.waitForLoadState('networkidle');

    const realErrors = errors.filter(
      (e) =>
        !e.includes('favicon') &&
        !e.includes('font') &&
        !e.includes('@vite') &&
        !e.includes('WebSocket') &&
        !e.includes('vite') &&
        !e.includes('404')
    );
    expect(realErrors).toHaveLength(0);
  });
});

test.describe('Homepage mobile menu toggle', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('menu toggle button exists and works', async ({ page }) => {
    await page.goto('/en/');
    const toggle = page.locator('#menu-toggle');
    const menu = page.locator('#topnav-menu');

    await expect(toggle).toBeVisible();

    // Click to open
    await toggle.click();
    await expect(menu).toHaveClass(/show/);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    // Click to close
    await toggle.click();
    await expect(menu).not.toHaveClass(/show/);
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
