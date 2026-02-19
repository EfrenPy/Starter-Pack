import { test, expect } from '@playwright/test';

/**
 * Internal link validation for the Eleventy SSG build.
 * Collects all internal hrefs from navbar and hub-page cards
 * on /en/, /es/, and /it/ pages, then verifies each returns HTTP 200.
 */

const languages = ['en', 'es', 'it'];

/**
 * Helper: collect all internal hrefs matching a CSS selector on a page.
 * Filters to links starting with "/" (internal, absolute-path links).
 */
async function collectInternalHrefs(page, selector) {
  return page.$$eval(selector, (anchors) =>
    anchors
      .map((a) => a.getAttribute('href'))
      .filter(
        (href) =>
          href &&
          href.startsWith('/') &&
          !href.startsWith('//') &&
          !href.startsWith('/#')
      )
  );
}

/**
 * Helper: deduplicate an array of strings.
 */
function unique(arr) {
  return [...new Set(arr)];
}

test.describe('Navbar link validation', () => {
  for (const lang of languages) {
    test(`all navbar links return 200 on /${lang}/`, async ({ page }) => {
      await page.goto(`/${lang}/`);
      const hrefs = unique(await collectInternalHrefs(page, '.topnav a[href]'));
      expect(hrefs.length).toBeGreaterThan(0);

      for (const href of hrefs) {
        const response = await page.request.get(href);
        expect(
          response.status(),
          `Navbar link "${href}" on /${lang}/ returned ${response.status()}`
        ).toBe(200);
      }
    });
  }
});


test.describe('Hub page card link validation', () => {
  const hubPages = [
    'legal-hub',
    'technical-hub',
    'daily-life-hub',
  ];

  for (const lang of languages) {
    for (const hub of hubPages) {
      test(`all card links return 200 on /${lang}/${hub}/`, async ({ page }) => {
        const response = await page.goto(`/${lang}/${hub}/`);
        // Skip if this hub page does not exist for this language
        if (response.status() !== 200) {
          test.skip();
          return;
        }

        const hrefs = unique(
          await collectInternalHrefs(page, '.card-grid a[href], .card a[href], article a[href]')
        );

        for (const href of hrefs) {
          const res = await page.request.get(href);
          expect(
            res.status(),
            `Card link "${href}" on /${lang}/${hub}/ returned ${res.status()}`
          ).toBe(200);
        }
      });
    }
  }
});

test.describe('Search form action', () => {
  for (const lang of languages) {
    test(`search form points to a valid page on /${lang}/`, async ({ page }) => {
      await page.goto(`/${lang}/`);
      const form = page.locator('form.search-box, form[role="search"], form[action*="search"]');
      const formCount = await form.count();

      if (formCount === 0) {
        // No search form on this page — skip gracefully
        return;
      }

      const action = await form.first().getAttribute('action');
      expect(action).toBeTruthy();

      const response = await page.request.get(action);
      expect(
        response.status(),
        `Search action "${action}" on /${lang}/ returned ${response.status()}`
      ).toBe(200);
    });
  }
});
