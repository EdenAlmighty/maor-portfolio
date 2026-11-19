import { expect, test } from '@playwright/test';
import { allPaths } from './pages';

for (const path of allPaths) {
  test(`${path} loads with one h1, a title and a canonical`, async ({ page }) => {
    // Console errors include CSP violations and failed requests.
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page).toHaveTitle(/\S/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await page.waitForLoadState('networkidle');
    expect(errors, 'console errors').toEqual([]);
  });
}

test('an unknown path returns the 404 page', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText('This page does not exist.');
});

test('every project in the drawing list links somewhere real', async ({ page, request }) => {
  await page.goto('/projects');
  const links = await page
    .locator('.mp-list tbody a')
    .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href') ?? ''));
  expect(links).toHaveLength(11);
  for (const href of links) {
    if (href.startsWith('#')) {
      await expect(page.locator(href)).toHaveCount(1);
    } else {
      expect((await request.get(href)).status(), href).toBe(200);
    }
  }
});
