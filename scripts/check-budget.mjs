// Enforces the PLAN.md budget for each built page: JavaScript <= 30 KB gzip,
// at most 3 font files. Total page weight is checked by Lighthouse CI.
import { readFile, readdir } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';

const dist = 'dist/client';
const JS_BUDGET = 30 * 1024;
const FONT_FILES_BUDGET = 3;

const htmlFiles = (await readdir(dist, { recursive: true })).filter((f) => f.endsWith('.html'));
let failed = false;

for (const file of htmlFiles) {
  const html = await readFile(join(dist, file), 'utf8');
  const scripts = [...html.matchAll(/<script\b[^>]*\bsrc="(\/[^"]+)"/g)].map((m) => m[1]);
  const inline = [...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)]
    .map((m) => m[1])
    .filter((body) => !/^\s*\{/.test(body)); // skip JSON-LD
  let js = inline.reduce((sum, body) => sum + gzipSync(body).length, 0);
  for (const src of scripts) js += gzipSync(await readFile(join(dist, src))).length;

  // Preloaded font files: each page preloads only its own language's subsets. The
  // @font-face rules for the other subsets sit in the inlined CSS but load only
  // when a character in their unicode range appears.
  const fonts = new Set(
    [...html.matchAll(/<link[^>]+rel="preload"[^>]+href="([^"]+\.woff2)"/g)].map((m) => m[1]),
  );

  const jsKb = (js / 1024).toFixed(1);
  const ok = js <= JS_BUDGET && fonts.size <= FONT_FILES_BUDGET;
  console.log(
    `${ok ? 'ok  ' : 'FAIL'} ${file}: ${jsKb} KB JS (gzip), ${fonts.size} font file(s) preloaded`,
  );
  if (!ok) failed = true;
}

if (failed) {
  console.error(
    `\nBudget: <= ${JS_BUDGET / 1024} KB JS gzip and <= ${FONT_FILES_BUDGET} font files per page.`,
  );
  process.exit(1);
}
