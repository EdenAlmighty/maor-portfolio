import { expect, test } from '@playwright/test';
import { allPaths } from './pages';
import { site } from '../src/lib/site';

const profilePages = ['/', '/about', '/cv'];

for (const path of allPaths) {
  test(`${path} has a valid JSON-LD graph and Open Graph tags`, async ({ page, request }) => {
    await page.goto(path);
    const raw = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(raw ?? '{}') as { '@graph': { '@type': string }[] };
    const types = data['@graph'].map((n) => n['@type']);
    expect(types).toEqual(expect.arrayContaining(['Person', 'WebSite']));
    if (profilePages.includes(path)) expect(types).toContain('ProfilePage');
    if (path !== '/') expect(types).toContain('BreadcrumbList');
    if (/^\/projects\/./.test(path)) expect(types).toContain('CreativeWork');

    // Google cuts titles near 60 characters; Bing flags descriptions outside 25-160.
    expect((await page.title()).length, 'title length').toBeLessThanOrEqual(60);
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description?.length ?? 0, 'meta description length').toBeGreaterThanOrEqual(25);
    expect(description?.length ?? 0, 'meta description length').toBeLessThanOrEqual(160);

    const image = await page.locator('meta[property="og:image"]').getAttribute('content');
    const imagePath = new URL(image ?? '').pathname;
    expect((await request.get(imagePath)).status(), `${imagePath} exists`).toBe(200);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'en_US');
  });
}

test('the 404 page is noindex and carries no JSON-LD', async ({ page }) => {
  await page.goto('/this-page-does-not-exist');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
});

test('robots.txt, sitemap, llms.txt and security.txt are served', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain(`Sitemap: ${site.url}/sitemap-index.xml`);
  expect(robots).toMatch(/User-agent: ClaudeBot[\s\S]*Allow: \//);

  const sitemap = await (await request.get('/sitemap-0.xml')).text();
  for (const path of allPaths) {
    expect(sitemap).toContain(`<loc>${site.url}${path === '/' ? '/' : path}</loc>`);
  }
  expect(sitemap).not.toContain('/404');

  const llms = await (await request.get('/llms.txt')).text();
  expect(llms).toMatch(new RegExp(`^# ${site.name}`));
  expect(llms).toContain('/projects/weather-app');

  const security = await (await request.get('/.well-known/security.txt')).text();
  expect(security).toMatch(/Expires: \d{4}-/);
});
