// Renders the raster icons search engines and phones use from public/favicon.svg:
// PNGs at 48/96/192/512 (Google wants multiples of 48), a 180 px Apple touch icon
// with a solid background, and a 16/32/48 favicon.ico. Run: `npm run icons`.
import { readFile, writeFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const svg = await readFile('public/favicon.svg', 'utf8');
const browser = await chromium.launch();
const page = await browser.newPage();

async function render(size, { background } = {}) {
  await page.setViewportSize({ width: size, height: size });
  const bg = background ? `background:${background};` : 'background:transparent;';
  await page.setContent(
    `<html><body style="margin:0;${bg}"><div style="width:${size}px;height:${size}px">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</div></body></html>`,
  );
  return page.screenshot({
    omitBackground: !background,
    clip: { x: 0, y: 0, width: size, height: size },
  });
}

for (const size of [48, 96, 192, 512])
  await writeFile(`public/icon-${size}.png`, await render(size));
// iOS rounds the corners itself and shows transparency as black, so fill the square.
const fill = svg.match(/<rect[^>]*fill="(#[0-9a-fA-F]{3,8})"/)?.[1] ?? '#ffffff';
await writeFile('public/apple-touch-icon.png', await render(180, { background: fill }));

// favicon.ico: PNG-compressed entries at 16, 32 and 48 px.
const entries = await Promise.all(
  [16, 32, 48].map(async (size) => ({ size, data: await render(size) })),
);
const header = Buffer.alloc(6 + 16 * entries.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(entries.length, 4);
let offset = header.length;
entries.forEach(({ size, data }, i) => {
  const at = 6 + 16 * i;
  header.writeUInt8(size, at);
  header.writeUInt8(size, at + 1);
  header.writeUInt16LE(1, at + 4);
  header.writeUInt16LE(32, at + 6);
  header.writeUInt32LE(data.length, at + 8);
  header.writeUInt32LE(offset, at + 12);
  offset += data.length;
});
await writeFile('public/favicon.ico', Buffer.concat([header, ...entries.map((e) => e.data)]));
await browser.close();
console.log('Rendered icon-48/96/192/512.png, apple-touch-icon.png and favicon.ico');
