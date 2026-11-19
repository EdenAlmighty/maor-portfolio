// GET /go/cv, /go/email, /go/linkedin, /go/github: count the click in D1, then redirect.
// Never indexed; links to it carry rel="nofollow". No personal data is stored.

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { aiSource, referrerHost } from '../../lib/attribution';
import { goDestinations, type GoTarget } from '../../lib/site';

export const prerender = false;

const headers = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' };

const isTarget = (t: string | undefined): t is GoTarget => !!t && t in goDestinations;

export const GET: APIRoute = async ({ params, url, request, locals }) => {
  const target = params.target;
  if (!isTarget(target)) {
    return new Response('Not found', { status: 404, headers });
  }

  const fromParam = url.searchParams.get('from') ?? '';
  const from =
    fromParam.startsWith('/') && !fromParam.startsWith('//') ? fromParam.slice(0, 200) : '/';
  const host = referrerHost(request.headers.get('referer'), url.hostname);

  // Count the click without delaying the redirect. A missing database (no Cloudflare
  // account yet) must never break the link itself.
  try {
    locals.cfContext.waitUntil(
      env.DB.prepare(
        'INSERT INTO clicks (target, page, referrer_host, ai_source) VALUES (?, ?, ?, ?)',
      )
        .bind(target, from, host, aiSource(host))
        .run()
        .catch(() => console.warn('click could not be counted')),
    );
  } catch {
    console.warn('click counting unavailable');
  }

  const destination = new URL(goDestinations[target], url).href;
  return new Response(null, { status: 302, headers: { ...headers, Location: destination } });
};
