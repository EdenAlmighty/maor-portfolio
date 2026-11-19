// Crawls the built site through `astro preview` (the production runtime, so
// /he resolves the way it does on Cloudflare) and fails on any broken link.
import { spawn, spawnSync } from 'node:child_process';
import { LinkChecker } from 'linkinator';

const port = 4323;
const origin = `http://localhost:${port}`;
const server = spawn(`npx astro preview --port ${port}`, { shell: true, stdio: 'ignore' });

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(origin)).ok) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Preview server did not start on ${origin}`);
}

let failed;
try {
  await waitForServer();
  const result = await new LinkChecker().check({
    path: origin,
    recurse: true,
    // External links are checked by hand before launch; CI stays offline-safe.
    linksToSkip: [`^(?!${origin})`],
  });
  const broken = result.links.filter((l) => l.state === 'BROKEN');
  for (const link of broken) console.error(`${link.status} ${link.url} (on ${link.parent})`);
  console.log(`Checked ${result.links.length} link(s), ${broken.length} broken.`);
  failed = broken.length > 0;
} finally {
  // Astro allows one preview server per project, so stop it before exiting.
  spawnSync('npx astro preview stop', { shell: true, stdio: 'ignore' });
  server.kill();
}
process.exit(failed ? 1 : 0);
