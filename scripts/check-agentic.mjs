// Lighthouse "Agentic Browsing" category (Lighthouse 13.5): accessibility tree,
// llms.txt, layout shift and WebMCP form coverage. Fails below a score of 1.
import { execFileSync, spawn, spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';

const port = 4361;
const origin = `http://localhost:${port}`;
// The home page, the project list and the CV page.
const paths = ['/', '/projects', '/cv'];
const server = spawn(`npx astro preview --port ${port}`, { shell: true, stdio: 'ignore' });

let failed = false;
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
  for (const path of paths) {
    const out = `.lighthouseci/agentic-${path.replace(/\W+/g, '_') || 'home'}.json`;
    execFileSync(
      'npx',
      [
        '--yes',
        'lighthouse@13.5.0',
        origin + path,
        '--only-categories=agentic-browsing',
        '--output=json',
        `--output-path=${out}`,
        '--chrome-flags=--headless=new',
        '--quiet',
      ],
      { stdio: 'inherit', shell: process.platform === 'win32' },
    );
    const report = JSON.parse(await readFile(out, 'utf8'));
    const category = report.categories['agentic-browsing'];
    const failing = category.auditRefs
      .map((a) => report.audits[a.id])
      .filter((a) => a.score !== null && a.score < 1);
    console.log(
      `${category.score === 1 ? 'ok  ' : 'FAIL'} ${path}: ${category.score}${failing.length ? ` (${failing.map((a) => a.id).join(', ')})` : ''}`,
    );
    if (category.score !== 1) failed = true;
  }
} finally {
  spawnSync('npx astro preview stop', { shell: true, stdio: 'ignore' });
  server.kill();
}
process.exit(failed ? 1 : 0);
