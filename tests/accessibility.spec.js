import { test, expect } from '@playwright/test';

const pages = [
  { url: '/', name: 'Root index' },
  { url: '/beginning.html', name: 'Root beginning' },
  { url: '/en/index.html', name: 'EN index' },
  { url: '/es/index.html', name: 'ES index' },
  { url: '/en/beginning.html', name: 'EN beginning' },
  { url: '/es/beginning.html', name: 'ES beginning' },
  { url: '/en/legal-hub.html', name: 'EN legal-hub' },
  { url: '/es/legal-hub.html', name: 'ES legal-hub' },
  { url: '/en/tax_declaration_spain.html', name: 'EN tax declaration' },
  { url: '/es/tax_declaration_spain.html', name: 'ES tax declaration' },
  { url: '/en/search.html', name: 'EN search' },
  { url: '/es/search.html', name: 'ES search' },
  { url: '/en/complete.html', name: 'EN complete' },
  { url: '/es/complete.html', name: 'ES complete' },
  { url: '/en/technical/vscode-remote.html', name: 'EN vscode-remote' },
  { url: '/es/technical/vscode-remote.html', name: 'ES vscode-remote' },
];

for (const { url, name } of pages) {
  test.describe(`Accessibility: ${name}`, () => {
    test('has skip link', async ({ page }) => {
      await page.goto(url);
      const skipLink = page.locator('.skip-link');
      await expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    test('has main landmark', async ({ page }) => {
      await page.goto(url);
      await expect(page.locator('main#main-content')).toBeAttached();
    });

    test('has correct lang attribute', async ({ page }) => {
      await page.goto(url);
      const lang = await page.locator('html').getAttribute('lang');
      if (url.includes('/en/')) {
        expect(lang).toBe('en');
      } else {
        expect(lang).toBe('es');
      }
    });

    test('navbar has aria-label', async ({ page }) => {
      await page.goto(url);
      await page.waitForSelector('.topnav', { timeout: 5000 });
      await expect(page.locator('.topnav')).toHaveAttribute('aria-label', /navigation|navegaci/i);
    });

    test('menu toggle has aria attributes', async ({ page }) => {
      await page.goto(url);
      await page.waitForSelector('.topnav', { timeout: 5000 });
      // menu-toggle exists in DOM but is hidden on desktop; check attributes via attached state
      await expect(page.locator('#menu-toggle')).toBeAttached();
      await expect(page.locator('#menu-toggle')).toHaveAttribute('aria-label', /menu/i);
    });

    test('no console errors', async ({ page }) => {
      const errors = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      await page.goto(url);
      await page.waitForSelector('.topnav', { timeout: 5000 });
      const realErrors = errors.filter(
        (e) => !e.includes('@vite') && !e.includes('WebSocket') && !e.includes('vite')
      );
      expect(realErrors).toHaveLength(0);
    });
  });
}
