// /llms.txt (llmstxt.org format): a short summary of Maor and links to every project,
// built from the same sources as the pages so it never drifts.

import type { APIRoute } from 'astro';
import { getProjects, formatRange } from '../lib/content';
import { kindLabels } from '../lib/labels';
import { site } from '../lib/site';

export const GET: APIRoute = async () => {
  const projects = await getProjects();
  const url = (path: string) => `${site.url}${path}`;
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.name} is a ${site.title.toLowerCase()} based in ${site.locality}, ${site.country}. He tests web and mobile apps manually and with automation (Playwright, WebdriverIO), tests APIs (Postman, Bruno, Jest), runs load tests (Apache JMeter) and writes test plans, test cases and bug reports. He holds a QA Engineering Certificate from TripleTen Israel (2024). ${site.rolesWanted ? `He is looking for: ${site.rolesWanted}.` : 'He is looking for a QA engineer role.'} Contact: ${site.email}.`,
    '',
    '## Case studies',
    '',
    ...projects
      .filter((p) => p.data.featured)
      .map(
        (p) =>
          `- [${p.data.title}](${url(`/projects/${p.id}`)}): ${p.data.description} (${kindLabels[p.data.kind]}, ${formatRange(p.data.start, p.data.end)})`,
      ),
    '',
    '## Other projects',
    '',
    ...projects
      .filter((p) => !p.data.featured)
      .map(
        (p) =>
          `- [${p.data.title}](${url(`/projects#${p.id}`)}): ${p.data.description} (${kindLabels[p.data.kind]})`,
      ),
    '',
    '## About',
    '',
    `- [CV](${url('/cv')}) and [CV as PDF](${url(site.cvFile)})`,
    `- [About ${site.name}](${url('/about')})`,
    `- [How this site is tested](${url('/how-this-site-is-tested')})`,
    `- [GitHub](${site.github}) and [LinkedIn](${site.linkedin})`,
    '',
    '## Optional',
    '',
    `- [Accessibility statement](${url('/accessibility')})`,
    `- [Privacy](${url('/privacy')})`,
    `- Site designed and built by [${site.builtBy.name}](${site.builtBy.url})`,
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
