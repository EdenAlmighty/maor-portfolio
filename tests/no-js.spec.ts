import { expect, test } from '@playwright/test';
import { allPaths } from './pages';

test.use({ javaScriptEnabled: false });

for (const path of allPaths) {
  test(`${path} shows its content with JavaScript turned off`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).not.toHaveText('');
  });
}
