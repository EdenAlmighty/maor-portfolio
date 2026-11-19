// /.well-known/security.txt (RFC 9116), built from lib/site.ts. Expires one year after
// each build, so a regular deploy keeps it current.

import type { APIRoute } from 'astro';
import { site } from '../../lib/site';

export const GET: APIRoute = () => {
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
  const lines = [
    `Contact: mailto:${site.email}`,
    `Expires: ${expires}`,
    'Preferred-Languages: en',
    `Canonical: ${site.url}/.well-known/security.txt`,
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
