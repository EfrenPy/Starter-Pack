import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Representative page types across languages. If a new page type is added,
// add one example here so accessibility can't silently regress.
const PAGES = [
  '/en/',
  '/es/',
  '/en/legal-hub/',
  '/en/technical-hub/',
  '/en/daily-life-hub/',
  '/en/health-insurance/', // content page (page.njk)
  '/es/vehicle-green-plates/',
  '/en/cost-calculator/', // interactive form
  '/en/checklist/',
  '/en/newcomer-glossary/',
  '/en/search/',
  '/fr/faq/',
];

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

for (const path of PAGES) {
  test(`no WCAG A/AA violations: ${path}`, async ({ page }) => {
    test.slow(); // axe analysis + networkidle can exceed the default timeout
    // Wait for the JS-enhanced final state (checklist, calculator, TOC, etc.)
    // so axe sees what real users see, not a transient pre-hydration DOM.
    await page.goto(path, { waitUntil: 'networkidle' });
    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    const summary = results.violations.map(
      (v) => `${v.id} (${v.impact}, ${v.nodes.length}): ${v.help}`,
    );
    expect(summary, `axe violations on ${path}:\n${summary.join('\n')}`).toEqual([]);
  });
}
