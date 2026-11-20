import { expect, test } from '@playwright/test';
import { allPaths } from './pages';
import { site } from '../src/lib/site';

// The phone number belongs only in the CV PDF (PLAN.md): never on a web page.
const digits = site.phone.replace(/\D/g, '').slice(-7);

test('the CV PDF is served', async ({ request }) => {
  const response = await request.get(site.cvFile);
  expect(response.status()).toBe(200);
  const body = await response.body();
  expect(body.subarray(0, 5).toString()).toBe('%PDF-');
  expect(body.length).toBeLessThan(400 * 1024);
});

for (const path of [...allPaths, '/llms.txt', '/404']) {
  test(`${path} does not show the phone number`, async ({ request }) => {
    const html = await (await request.get(path)).text();
    expect(html.replace(/\D/g, '')).not.toContain(digits);
  });
}

// Maor's freelance projects were his own, not client work, and he does not list Figma
// (AGENTS.md). The page text and llms.txt must never say either.
for (const path of [...allPaths, '/llms.txt']) {
  test(`${path} never says "client" or "Figma"`, async ({ request }) => {
    const html = await (await request.get(path)).text();
    const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, ' ');
    expect(text).not.toMatch(/\bclients?\b|figma/i);
  });
}
