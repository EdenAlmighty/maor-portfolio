// Where a visit came from, without cookies: the referring host, and whether it
// was an AI assistant (PLAN.md, Conversion tracking).

const AI_HOSTS: Record<string, string> = {
  'chatgpt.com': 'chatgpt',
  'chat.openai.com': 'chatgpt',
  'claude.ai': 'claude',
  'perplexity.ai': 'perplexity',
  'www.perplexity.ai': 'perplexity',
  'gemini.google.com': 'gemini',
  'copilot.microsoft.com': 'copilot',
};

export function referrerHost(referrer: string | null | undefined, ownHost?: string): string {
  if (!referrer) return '';
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    return host === ownHost ? '' : host;
  } catch {
    return '';
  }
}

export function aiSource(host: string, utm = ''): string {
  if (AI_HOSTS[host]) return AI_HOSTS[host];
  // Some assistants tag links instead of sending a referrer.
  const source = new URLSearchParams(utm).get('utm_source')?.toLowerCase() ?? '';
  return Object.values(AI_HOSTS).find((name) => source.includes(name)) ?? '';
}
