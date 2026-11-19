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
