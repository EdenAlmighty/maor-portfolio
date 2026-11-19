// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { createHash } from 'node:crypto';
import { site } from './src/lib/site';
import { themeScript } from './src/lib/theme';

// The light/dark script runs inline in <head> before the first paint (src/lib/theme.ts);
// its hash is computed here so the CSP always matches the current script.
const themeScriptHash =
  `sha256-${createHash('sha256').update(themeScript).digest('base64')}` as const;

// https://astro.build/config
export default defineConfig({
  site: site.url,
  // Static by default; only /go/* (prerender = false) runs on the Worker.
  output: 'static',
  adapter: cloudflare({ imageService: { build: 'compile', runtime: 'passthrough' } }),
  session: false,
  // Lowercase paths with no trailing slash: /about is served from about.html.
  trailingSlash: 'never',
  // Inline CSS saves a render-blocking request (LCP budget: 1.5 s on mobile).
  build: { format: 'file', inlineStylesheets: 'always' },
  // No code blocks on the site; Shiki's inline styles would also conflict with the CSP.
  markdown: { syntaxHighlight: false },
  integrations: [
    sitemap({
      filter: (page) => !/\/404$/.test(new URL(page).pathname),
    }),
  ],
  // Content Security Policy: Astro hashes every inline script and style into a <meta>
  // tag. The only third party is Cloudflare Web Analytics (added by Cloudflare once the
  // site runs on Maor's account).
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self' https://cloudflareinsights.com",
        "form-action 'self'",
        "base-uri 'self'",
        "object-src 'none'",
      ],
      scriptDirective: {
        resources: ["'self'", 'https://static.cloudflareinsights.com'],
        hashes: [themeScriptHash],
      },
    },
  },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  vite: {
    plugins: [tailwindcss()],
  },
});
