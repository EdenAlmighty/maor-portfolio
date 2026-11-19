// Tells Bing and other IndexNow engines about every URL in the sitemap.
// Runs after a production deploy. The key file is public/<key>.txt.
import { readFile, readdir } from 'node:fs/promises';
// Node 24 runs TypeScript with only type annotations directly.
import { site } from '../src/lib/site.ts';

const host = new URL(site.url).host;
const keyFile = (await readdir('public')).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('No IndexNow key file in public/');
const key = keyFile.replace('.txt', '');
const sitemap = await readFile('dist/client/sitemap-0.xml', 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${keyFile}`, urlList }),
});
console.log(`IndexNow: ${response.status} for ${urlList.length} URL(s)`);
if (!response.ok) {
  const body = await response.text();
  // 400 and 422 mean the request itself is wrong (bad JSON, URLs off the host): a bug here.
  // 403 (key not verified yet) and 429 are on the engines' side and must not fail a deploy
  // that has already gone out.
  if (response.status === 400 || response.status === 422) {
    console.error(body);
    process.exit(1);
  }
  console.log(`::warning title=IndexNow ${response.status}::${body}`);
}
