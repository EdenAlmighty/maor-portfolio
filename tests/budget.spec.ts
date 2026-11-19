import { expect, test, type Request } from '@playwright/test';
import { allPaths } from './pages';

// scripts/check-budget.mjs can only see preloads in the HTML. A page still pulls in font
// files through @font-face unicode ranges, so this counts what the browser really fetches.
//
// First screen, at most:
//   ltr 4 = display + text face of the page's language, the other script's text face
//           (the language switch label, e.g. "עברית" on English pages), one decorative face
//   rtl 5 = the same, plus a Latin display face for English words in Hebrew headings
// A single-language site should stay at 2–3: lower these numbers there.
// Whole page after a full scroll (faces loaded near a note included): at most 150 KB of
// font data. With the first-paint font strategy (site-design-system) no font file blocks
// LCP, so bytes matter more than the count.
// An English-only site: one text face and one mono face (PLAN.md, Performance budget).
const MAX_FILES = { ltr: 3, rtl: 3 } as const;
const MAX_BYTES = 120 * 1024;

for (const path of allPaths) {
  test(`${path} stays inside the font budget`, async ({ page }) => {
    const fonts: Request[] = [];
    page.on('request', (request) => {
      if (request.resourceType() === 'font') fonts.push(request);
    });
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    const firstScreen = [...new Set(fonts.map((r) => new URL(r.url()).pathname))];

    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += innerHeight) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 50));
      }
    });
    await page.waitForLoadState('networkidle');

    const dir = (await page.locator('html').getAttribute('dir')) === 'rtl' ? 'rtl' : 'ltr';
    const sizes = await Promise.all(fonts.map((r) => r.sizes()));
    const bytes = sizes.reduce((sum, s) => sum + s.responseBodySize, 0);
    expect(
      firstScreen.length,
      `font files on the first screen of ${path}: ${firstScreen.join(', ')}`,
    ).toBeLessThanOrEqual(MAX_FILES[dir]);
    expect(bytes, `font bytes on ${path}`).toBeLessThanOrEqual(MAX_BYTES);
  });
}
