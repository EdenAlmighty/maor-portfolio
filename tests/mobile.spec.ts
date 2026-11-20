import { expect, test } from '@playwright/test';
import { allPaths } from './pages';

// Mobile audit, Nov 2026: table rows broke apart on phones, tables scrolled sideways
// with their links off-screen, and many links were too small to tap.

test.describe('on a phone', () => {
  test.skip(({ isMobile }) => !isMobile, 'phone profile only');

  for (const path of allPaths) {
    test(`${path}: tables fit the screen and links are big enough to tap`, async ({ page }) => {
      await page.goto(path);
      const problems = await page.evaluate(() => {
        const found: string[] = [];
        for (const s of document.querySelectorAll<HTMLElement>('.mp-scroll')) {
          if (s.scrollWidth > s.clientWidth + 1)
            found.push(`table scrolls sideways: ${s.getAttribute('aria-label')}`);
        }
        // WCAG 2.5.8 exempts links inside a sentence; everything else gets 44px.
        for (const el of document.querySelectorAll<HTMLElement>('a, button')) {
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height) continue;
          const inText =
            getComputedStyle(el).display === 'inline' && el.closest('p, li, dd') !== null;
          if (!inText && r.height < 44)
            found.push(`${Math.round(r.height)}px tall: ${el.textContent?.trim().slice(0, 40)}`);
        }
        return found;
      });
      expect(problems).toEqual([]);
    });
  }
});

test.describe('on a desktop', () => {
  test.skip(({ isMobile }) => isMobile, 'desktop profile only');

  for (const path of allPaths) {
    test(`${path}: table cells stay table cells`, async ({ page }) => {
      await page.goto(path);
      const broken = await page
        .locator('td, th')
        .evaluateAll((cells) =>
          cells
            .filter((c) => getComputedStyle(c).display !== 'table-cell')
            .map((c) => c.textContent?.trim().slice(0, 40)),
        );
      expect(broken).toEqual([]);
    });
  }
});
