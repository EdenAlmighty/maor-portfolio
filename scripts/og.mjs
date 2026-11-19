// Renders a 1200x630 Open Graph image for every built page, as a small drawing sheet:
// the page's H1, a title block with Maor's name and role, and the sheet number.
// Run after a build: `npm run og`. Writes public/og/<slug>.png (committed) and dist/client/og.
import { copyFile, mkdir, readdir, readFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { chromium } from '@playwright/test';
import { site } from '../src/lib/site.ts';

const dist = 'dist/client';
const skip = /(^|[\\/])404\.html$/;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

const text = (html) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();

const font = async (file) =>
  `data:font/woff2;base64,${(await readFile(resolve('public/fonts', file))).toString('base64')}`;
const sans = await font('overpass-latin-wght-normal.woff2');
const mono = await font('overpass-mono-latin-wght-normal.woff2');

function card({ title, sheet }) {
  const zones = Array.from({ length: 8 }, (_, i) => `<span>${i + 1}</span>`).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Overpass;src:url(${sans});font-weight:100 900}
@font-face{font-family:'Overpass Mono';src:url(${mono});font-weight:300 700}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#f4f6f3;color:#111820;font-family:Overpass;position:relative}
.zones{position:absolute;top:22px;left:56px;right:56px;display:grid;grid-template-columns:repeat(8,1fr);font:500 15px 'Overpass Mono';color:#47515a}
.zones span{border-left:1px solid #a3acb2;padding-left:6px}
.sheet{position:absolute;inset:48px 40px 40px;border:1.5px solid #111820;padding:52px 56px}
h1{font-weight:800;font-size:${title.length > 40 ? 64 : 84}px;line-height:1.02;letter-spacing:-0.03em;max-width:880px}
.tb{position:absolute;right:-1px;bottom:-1px;display:grid;grid-template-columns:repeat(2,auto);border:1.5px solid #111820;background:#111820;gap:1.5px}
.tb div{background:#f4f6f3;padding:10px 16px 12px}
.tb .full{grid-column:1/-1}
.l{display:block;font:500 13px 'Overpass Mono';text-transform:uppercase;letter-spacing:.04em;color:#47515a}
.v{display:block;font-weight:800;font-size:24px}
.m{background:linear-gradient(#ffe14a,#ffe14a) no-repeat 0 88%/100% .62em}
</style></head><body>
<div class="zones">${zones}</div>
<div class="sheet">
<h1>${title}</h1>
<div class="tb">
<div class="full"><span class="l">Name</span><span class="v">${site.name}</span></div>
<div><span class="l">Role</span><span class="v"><span class="m">${site.title}</span></span></div>
<div><span class="l">Sheet</span><span class="v" style="font-family:'Overpass Mono';font-weight:600">${sheet}</span></div>
</div>
</div>
</body></html>`;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
let count = 0;
for await (const file of walk(dist)) {
  const rel = relative(dist, file).replace(/\\/g, '/');
  if (skip.test(rel)) continue;
  const html = await readFile(file, 'utf8');
  if (/<meta name="robots" content="noindex"/.test(html)) continue;
  const h1 = text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? site.name);
  const sheet = text(html.match(/Sheet<\/span>\s*<span[^>]*>([\s\S]*?)<\/span>/)?.[1] ?? '');
  const slug = rel === 'index.html' ? 'home' : rel.replace(/\.html$/, '').replace(/\//g, '-');
  await page.setContent(card({ title: h1, sheet: sheet || 'Note' }));
  await page.evaluate(() => document.fonts.ready);
  const out = join('public/og', `${slug}.png`);
  await mkdir('public/og', { recursive: true });
  await page.screenshot({ path: out });
  await mkdir(join(dist, 'og'), { recursive: true });
  await copyFile(out, join(dist, 'og', `${slug}.png`));
  count++;
}
await browser.close();
console.log(`Rendered ${count} Open Graph images into public/og`);
