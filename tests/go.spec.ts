import { expect, test } from '@playwright/test';
import { site } from '../src/lib/site';

// /go/* runs on the Worker: it counts the click and redirects. If it ever falls back to
// the static 404 page, run_worker_first in wrangler.jsonc is missing the prefix.
const targets: [string, RegExp][] = [
  ['cv', new RegExp(`${site.cvFile.replaceAll('.', '[.]')}$`)],
  ['email', /^mailto:/],
  ['linkedin', /^https:\/\/www\.linkedin\.com\//],
  ['github', /^https:\/\/github\.com\//],
];

for (const [target, location] of targets) {
  test(`/go/${target} redirects`, async ({ request }) => {
    const response = await request.get(`/go/${target}?from=/`, { maxRedirects: 0 });
    expect(response.status()).toBe(302);
    expect(response.headers()['location']).toMatch(location);
    expect(response.headers()['x-robots-tag']).toContain('noindex');
  });
}

test('/go/ refuses unknown targets', async ({ request }) => {
  const response = await request.get('/go/elsewhere', { maxRedirects: 0 });
  expect(response.status()).toBe(404);
});
