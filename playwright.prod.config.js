import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: ['production.spec.js', 'links.spec.js', 'accessibility-axe.spec.js'],
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:4173',
    headless: true,
  },
  webServer: {
    command: 'npx serve dist -l 4173 --no-clipboard',
    port: 4173,
    reuseExistingServer: false,
  },
  projects: [
    // Chromium runs the full prod set (smoke + links + axe accessibility gate).
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    // Firefox/WebKit re-run the smoke test for cross-engine safety, minus the
    // "no console errors" assertion (engine-specific console noise; already
    // gated on Chromium above).
    {
      name: 'firefox',
      testMatch: ['production.spec.js'],
      grepInvert: /no JS errors on/,
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      testMatch: ['production.spec.js'],
      grepInvert: /no JS errors on/,
      use: { browserName: 'webkit' },
    },
  ],
});
