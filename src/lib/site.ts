// Maor's details: the single source for the header, footer, title blocks, JSON-LD,
// llms.txt, security.txt, OG images and the CV. Every fact here is backed by
// CONTENT-MAP.md. `null` means not known yet: pages show a TODO marker instead.

export const site = {
  // TODO(content): the real domain once Maor buys it (PLAN.md, Decisions). Every
  // canonical URL, the sitemap and the JSON-LD are built from this value.
  url: 'https://maorshaer.com',
  name: 'Maor Matthew Shaer',
  shortName: 'Maor Shaer',
  initials: 'M. Shaer',
  title: 'QA Engineer',
  locality: 'Tel Aviv',
  country: 'Israel',
  countryCode: 'IL',
  email: 'maorshaer87@gmail.com',
  // Shown only inside the CV PDF (scripts/cv-pdf.mjs), never on an HTML page.
  phone: '+972 50-217-2419',
  github: 'https://github.com/Maor87',
  githubHandle: 'Maor87',
  linkedin: 'https://www.linkedin.com/in/maor-matthew-shaer1987/',
  // This site's own repo: public, so the tests behind /how-this-site-is-tested can be read.
  repo: 'https://github.com/EdenAlmighty/maor-portfolio',
  cvFile: '/Maor-Matthew-Shaer-QA-Engineer-CV.pdf',
  description:
    'QA engineer in Tel Aviv: manual and automated testing with Playwright, API testing with Postman, JMeter load tests. Projects with code and bug reports.',
  tagline: 'I test web and mobile apps by hand, in code and under load.',
  // TODO(content): the roles Maor is applying for (manual, automation or both; level;
  // Israel, remote or both). PLAN.md, Still needed before Gate 1.
  rolesWanted: null as string | null,
  // TODO(content): languages Maor speaks and how well.
  languages: null as { language: string; level: string }[] | null,
  // TODO(content): Eden's quote about the Weather App, in Eden's own words. Optional.
  quote: null as { text: string; by: string; role: string } | null,
  knowsAbout: [
    'Software testing',
    'Manual testing',
    'Test automation',
    'Playwright',
    'WebdriverIO',
    'API testing',
    'Postman',
    'Mobile testing',
    'Performance testing',
    'Apache JMeter',
    'Accessibility testing',
    'SQL',
    'Test documentation',
  ],
  // Who built the site: one branded credit in the footer, plus the WebSite node's
  // creator in JSON-LD (site-seo-geo, "Builder credit").
  builtBy: { name: 'Eden Gilady', url: 'https://edengilady.com' },
  // The date shown in footers and title blocks. Update it when the content changes.
  updated: '2026-11-20',
} as const;

export const mailto = `mailto:${site.email}?subject=${encodeURIComponent('QA engineer role')}`;

/** Links that go through /go/ so each click is counted (src/pages/go/[target].ts). */
export const go = {
  cv: '/go/cv',
  email: '/go/email',
  linkedin: '/go/linkedin',
  github: '/go/github',
} as const;

export type GoTarget = keyof typeof go;

export const goDestinations: Record<GoTarget, string> = {
  cv: site.cvFile,
  email: mailto,
  linkedin: site.linkedin,
  github: site.github,
};

/** Appends the current page so the click count knows where it came from. */
export const goFrom = (target: GoTarget, path: string) =>
  `${go[target]}?from=${encodeURIComponent(path)}`;
