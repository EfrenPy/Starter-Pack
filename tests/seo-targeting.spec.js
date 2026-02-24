import { test, expect } from '@playwright/test';

const PAGES = [
  '/en/access-cards/',
  '/es/first-weeks-guide/',
  '/it/transportation/',
  '/fr/faq/',
  '/en/access-card-building-55/',
  '/es/cross-border-tax-france-switzerland/',
  '/it/first-month-checklist/',
  '/fr/newcomer-glossary/',
];

test.describe('SEO international targeting', () => {
  for (const path of PAGES) {
    test(`canonical and alternates are valid for ${path}`, async ({ page, request }) => {
      await page.goto(path);

      const canonicalHref = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonicalHref).toBeTruthy();
      expect(new URL(canonicalHref).pathname).toBe(path);

      const alternateLinks = page.locator('link[rel="alternate"][hreflang]');
      await expect(alternateLinks).toHaveCount(5); // en, es, it, fr, x-default

      const hrefs = await alternateLinks.evaluateAll((els) =>
        els.map((el) => el.getAttribute('href')),
      );
      for (const href of hrefs) {
        expect(href).toBeTruthy();
        const localPath = new URL(href).pathname;
        const res = await request.get(localPath);
        expect(res.status()).toBe(200);
      }
    });
  }
});
