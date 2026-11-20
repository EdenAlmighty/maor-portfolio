// Writes src/data/test-report.json from the latest Playwright and Lighthouse results, for
// the /how-this-site-is-tested page. In CI it runs after the gates pass and before the
// production build; locally run it after `npm test` (and Lighthouse, if you ran it).
import { execFileSync } from 'node:child_process';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const out = 'src/data/test-report.json';
const previous = JSON.parse(await readFile(out, 'utf8'));

async function playwright() {
  const raw = await readFile('reports/playwright.json', 'utf8').catch(() => null);
  if (!raw) return previous.playwright;
  const data = JSON.parse(raw);
  const suites = {};
  const paths = new Set();
  let passed = 0;
  let failed = 0;
  const visit = (suite, file) => {
    const f = suite.file ?? file;
    for (const spec of suite.specs ?? []) {
      const name = f.replace(/\.spec\.ts$/, '').replace(/^.*[\\/]/, '');
      for (const test of spec.tests ?? []) {
        // A test skipped on purpose (phone-only or desktop-only) is not a result.
        if (test.results?.every((r) => r.status === 'skipped')) continue;
        suites[name] = (suites[name] ?? 0) + 1;
        const ok = test.results?.some((r) => r.status === 'passed');
        if (ok) passed++;
        else failed++;
      }
      const path = spec.title.match(/^(\/\S*)/)?.[1];
      if (path) paths.add(path);
    }
    for (const child of suite.suites ?? []) visit(child, f);
  };
  for (const suite of data.suites ?? []) visit(suite, suite.file ?? '');
  return { total: passed + failed, passed, failed, pages: paths.size, suites };
}

async function lighthouse() {
  const dir = '.lighthouseci';
  const files = (await readdir(dir).catch(() => [])).filter((f) => /^lhr-.*\.json$/.test(f));
  if (!files.length) return previous.lighthouse;
  const byPath = new Map();
  for (const f of files) {
    const lhr = JSON.parse(await readFile(join(dir, f), 'utf8'));
    const path = new URL(lhr.finalDisplayedUrl ?? lhr.finalUrl).pathname;
    const c = lhr.categories;
    const score = (k) => Math.round((c[k]?.score ?? 0) * 100);
    const row = {
      path,
      performance: score('performance'),
      accessibility: score('accessibility'),
      bestPractices: score('best-practices'),
      seo: score('seo'),
    };
    // Lighthouse CI runs each URL several times; keep the lowest score per category.
    const prev = byPath.get(path);
    byPath.set(
      path,
      prev
        ? Object.fromEntries(
            Object.entries(row).map(([k, v]) => [k, k === 'path' ? v : Math.min(v, prev[k])]),
          )
        : row,
    );
  }
  return [...byPath.values()].sort((a, b) => a.path.localeCompare(b.path));
}

let commit = null;
try {
  commit = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();
} catch {
  // Not a git checkout.
}

const report = {
  generatedAt: new Date().toISOString(),
  commit,
  playwright: await playwright(),
  lighthouse: await lighthouse(),
};
await writeFile(out, `${JSON.stringify(report, null, 2)}\n`);
console.log(
  `Wrote ${out}: ${report.playwright ? `${report.playwright.passed}/${report.playwright.total} tests` : 'no Playwright results'}, ${report.lighthouse ? `${report.lighthouse.length} Lighthouse pages` : 'no Lighthouse results'}`,
);
