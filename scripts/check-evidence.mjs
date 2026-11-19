// Checks that every evidence link in the project files still opens without a login:
// GitHub repos and issues, Google Sheets, Docs and Drive folders. Runs weekly in CI
// (and by hand: `npm run check:evidence`), because those pages can change under us.
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = 'src/content/projects';
const urls = new Map();
for (const file of await readdir(dir)) {
  if (!file.endsWith('.md')) continue;
  const text = await readFile(join(dir, file), 'utf8');
  for (const [, url] of text.matchAll(/href: ['"]?(https?:\/\/[^\s'"]+)/g)) urls.set(url, file);
}

let failed = 0;
for (const [url, file] of urls) {
  let problem = '';
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: { 'User-Agent': 'portfolio-link-check' },
      signal: AbortSignal.timeout(60_000),
    });
    if (response.status >= 400) problem = `status ${response.status}`;
    else if (/accounts\.google\.com|github\.com\/login/.test(response.url))
      problem = 'asks for a login';
  } catch (error) {
    problem = error instanceof Error ? error.message : String(error);
  }
  console.log(`${problem ? 'FAIL' : 'ok  '} ${url}${problem ? ` (${problem}, in ${file})` : ''}`);
  if (problem) failed++;
}
console.log(`\nChecked ${urls.size} evidence link(s), ${failed} failing.`);
process.exit(failed ? 1 : 0);
