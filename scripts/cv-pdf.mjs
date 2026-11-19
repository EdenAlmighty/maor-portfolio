// Prints /cv to the PDF that "Download my CV" serves, so the page and the PDF never
// disagree. The phone number is added here and appears on no web page (PLAN.md).
// Run after a build: `npm run cv:pdf`. Writes public/<file> (committed) and dist/client/<file>.
import { spawn, spawnSync } from 'node:child_process';
import { copyFile, mkdir, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { chromium } from '@playwright/test';
import { site } from '../src/lib/site.ts';

const port = 4362;
const origin = `http://localhost:${port}`;
const server = spawn(`npx astro preview --port ${port}`, { shell: true, stdio: 'ignore' });

try {
  for (let i = 0; i < 60; i++) {
    if (
      await fetch(origin)
        .then((r) => r.ok)
        .catch(() => false)
    )
      break;
    await new Promise((r) => setTimeout(r, 500));
  }
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.emulateMedia({ media: 'print', colorScheme: 'light' });
  await page.goto(`${origin}/cv`, { waitUntil: 'networkidle' });
  // Web fonts on, and the phone number into its slot.
  await page.evaluate((phone) => {
    document.documentElement.classList.add('mp-fonts');
    const slot = document.querySelector('[data-phone]');
    if (slot) {
      slot.textContent = phone;
      slot.removeAttribute('hidden');
    }
    // Links in the PDF point at the live site, not the local preview.
  }, site.phone);
  await page.evaluate(() => document.fonts.ready);
  const out = join('public', site.cvFile);
  await mkdir(dirname(out), { recursive: true });
  await page.pdf({
    path: out,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
    outline: true,
  });
  await browser.close();
  await copyFile(out, join('dist/client', site.cvFile)).catch(() => {});
  console.log(`Wrote ${out} (${Math.round((await stat(out)).size / 1024)} KB)`);
} finally {
  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/pid', String(server.pid), '/T', '/F'], { stdio: 'ignore' });
  } else {
    server.kill();
  }
}
