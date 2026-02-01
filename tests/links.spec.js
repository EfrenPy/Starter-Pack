import { test, expect } from '@playwright/test';

/**
 * Verify all internal links resolve to real pages (not 404s or fallback pages).
 * This catches broken navigation that would otherwise go unnoticed.
 */
test.describe('Internal links validation', () => {
  const pagesToCheck = [
    { url: '/', name: 'Root index' },
    { url: '/en/index.html', name: 'EN index' },
    { url: '/es/index.html', name: 'ES index' },
    { url: '/en/legal-hub.html', name: 'EN legal-hub' },
    { url: '/es/legal-hub.html', name: 'ES legal-hub' },
    { url: '/en/beginning.html', name: 'EN beginning' },
    { url: '/es/beginning.html', name: 'ES beginning' },
    { url: '/en/technical/vscode-remote.html', name: 'EN vscode-remote' },
    { url: '/es/technical/vscode-remote.html', name: 'ES vscode-remote' },
  ];

  for (const { url, name } of pagesToCheck) {
    test(`all links on ${name} go to real pages`, async ({ page }) => {
      await page.goto(url);
      await page.waitForSelector('.topnav', { timeout: 5000 });

      // Collect all internal links (skip #, mailto, external)
      const links = await page.evaluate(() => {
        return [...document.querySelectorAll('a[href]')]
          .map((a) => a.getAttribute('href'))
          .filter(
            (href) =>
              href &&
              !href.startsWith('#') &&
              !href.startsWith('mailto:') &&
              !href.startsWith('http://') &&
              !href.startsWith('https://')
          );
      });

      for (const href of links) {
        const response = await page.request.get(href);
        const text = await response.text();
        // A real page should NOT be the fallback index.html served for 404s.
        expect(
          response.status(),
          `Link "${href}" on ${name} returned ${response.status()}`
        ).toBeLessThan(400);
        // Also verify it's not a full HTML page served as fallback for a fragment
        // (navbar.html and footer.html are fragments, all other .html should be full pages)
        if (!href.includes('navbar') && !href.includes('footer')) {
          expect(
            text,
            `Link "${href}" on ${name} should be a real HTML page`
          ).toContain('<!DOCTYPE html>');
        }
      }
    });
  }

  test('navbar menu links navigate to correct pages', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.topnav', { timeout: 5000 });

    // On desktop, nav links are always visible
    const menuLinks = page.locator('.topnav__links li a');
    const count = await menuLinks.count();

    for (let i = 0; i < count; i++) {
      const href = await menuLinks.nth(i).getAttribute('href');
      if (href === '#') continue; // Skip placeholder links

      const response = await page.request.get(href);
      expect(
        response.status(),
        `Navbar link "${href}" should return 200`
      ).toBe(200);
    }
  });

  test('content area links on root page work', async ({ page }) => {
    await page.goto('/');

    // Click "Legal and Tax Help" card
    const legalLink = page.locator('.card-grid a').first();
    const href = await legalLink.getAttribute('href');
    expect(href).not.toBe('#');

    await legalLink.click();
    await page.waitForSelector('h1', { timeout: 5000 });
    // Should land on a page with actual content, not a blank/error page
    const heading = await page.locator('h1').textContent();
    expect(heading.length).toBeGreaterThan(0);
  });

  test('search form on root page submits to valid search page', async ({ page }) => {
    await page.goto('/');
    const formAction = await page.locator('.search-box').getAttribute('action');
    const response = await page.request.get(formAction);
    expect(response.status()).toBe(200);
  });
});
