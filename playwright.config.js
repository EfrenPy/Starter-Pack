import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // The axe accessibility suite runs in the prod config (against the fast static
  // dist build) as the CI gate; keep it out of this live-reload dev suite where
  // heavy axe analysis contends with the Eleventy server.
  testIgnore: ['accessibility-axe.spec.js'],
  timeout: 15000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:5000',
    headless: true,
  },
  webServer: {
    command: 'node scripts/build-assets.js && npx @11ty/eleventy --serve --port 5000',
    port: 5000,
    reuseExistingServer: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
