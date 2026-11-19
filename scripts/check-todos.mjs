// Lists every TODO left in the site: `TODO(...)` comments in the source and content,
// and visible TODO markers (the TODO_CLASS class) in the built pages.
// Set TODO_CLASS to the class Todo.astro renders on this site.
// `--strict` exits 1 while any remain: the production deploy runs it, so launch
// is blocked until every TODO is resolved (PLAN.md: never ship placeholder content).
import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const TODO_CLASS = 'mp-todo';
const strict = process.argv.includes('--strict');
const sourceRoots = ['src', 'public'];
const sourceExt = new Set([
  '.astro',
  '.ts',
  '.tsx',
  '.js',
  '.mjs',
  '.md',
  '.mdx',
  '.json',
  '.css',
  '.txt',
  '.svg',
]);
// The marker component itself, not a missing piece of content.
const ignore = new Set([join('src', 'components', 'Todo.astro')]);

async function* walk(dir, extensions) {
  for (const entry of await readdir(dir, { withFileTypes: true }).catch(() => [])) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path, extensions);
    else if (extensions.has(extname(entry.name))) yield path;
  }
}

const found = [];
for (const root of sourceRoots) {
  for await (const file of walk(root, sourceExt)) {
    if (ignore.has(relative('.', file))) continue;
    const lines = (await readFile(file, 'utf8')).split('\n');
    lines.forEach((line, i) => {
      // `TODO(content): ...` comments, and `field: TODO` values in frontmatter.
      if (/TODO\(|:\s*TODO\s*$/.test(line))
        found.push(`${relative('.', file)}:${i + 1}  ${line.trim()}`);
    });
  }
}

const pages = [];
for await (const file of walk('dist/client', new Set(['.html']))) {
  const count = (
    (await readFile(file, 'utf8')).match(new RegExp(`class="${TODO_CLASS}"`, 'g')) ?? []
  ).length;
  if (count) pages.push(`${relative('dist/client', file)}: ${count} visible marker(s)`);
}

console.log(`${found.length} TODO comment(s) in the source:\n${found.join('\n')}`);
console.log(`\n${pages.length} built page(s) with visible TODO markers:\n${pages.join('\n')}`);
if (pages.length === 0 && found.length === 0) console.log('\nNo TODOs left.');
if (strict && (found.length || pages.length)) {
  console.error('\nLaunch is blocked until every TODO is resolved.');
  process.exit(1);
}
