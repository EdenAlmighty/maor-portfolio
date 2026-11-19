import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { allPaths } from './pages';

for (const path of allPaths) {
  test(`${path} has no axe violations (WCAG 2.2 AA)`, async ({ page }) => {
    // The hero demo dims nodes while it plays; reduced motion shows the final frame.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
