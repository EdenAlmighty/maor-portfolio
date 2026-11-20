// Deploys a review preview to Eden's Cloudflare account, as a separate Worker
// (maor-portfolio-preview on workers.dev), until Maor's own account exists. The preview:
// - has no D1 database, so /go/ links redirect without counting the click;
// - keeps the TODO markers visible, so reviewers see what is still missing;
// - sends X-Robots-Tag: noindex on every response, so search engines skip it.
// Run: `npm run deploy:preview` (builds first). Never used for the real site.
import { execSync } from 'node:child_process';
import { appendFile, readFile, writeFile } from 'node:fs/promises';

const NAME = 'maor-portfolio-preview';

execSync('npm run build', { stdio: 'inherit' });

const configPath = 'dist/server/wrangler.json';
const config = JSON.parse(await readFile(configPath, 'utf8'));
config.name = NAME;
config.topLevelName = NAME;
config.d1_databases = [];
config.workers_dev = true;
delete config.routes;
delete config.account_id;
const previewConfig = 'dist/server/wrangler.preview.json';
await writeFile(previewConfig, JSON.stringify(config, null, 2));

// Static files: noindex on everything. The Worker route (/go/*) already sends it.
await appendFile('dist/client/_headers', '\n/*\n  X-Robots-Tag: noindex\n');

execSync(`npx wrangler deploy --config ${previewConfig}`, { stdio: 'inherit' });
