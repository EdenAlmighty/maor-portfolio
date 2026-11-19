import { defineConfig, devices } from '@playwright/test';

const PORT = 4340; // not 4321, which `astro dev` uses

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // The JSON report feeds /how-this-site-is-tested (scripts/test-report.mjs).
  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }], ['json', { outputFile: 'reports/playwright.json' }]]
    : [['list'], ['json', { outputFile: 'reports/playwright.json' }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  // Chrome only (Eden's rule): a phone profile and desktop.
  projects: [
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
  // Serves the built site through workerd, the same runtime as production.
  webServer: {
    // Local D1 tables first, so /go/ can count clicks.
    command: `npm run db:migrate:local && npm run preview -- --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
