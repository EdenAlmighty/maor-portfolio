# Maor Matthew Shaer, QA Engineer

The portfolio site of Maor Matthew Shaer, a QA engineer in Tel Aviv: projects with their code,
test documents and bug reports, a CV page with a PDF download, and the site's own test results.

Astro on Cloudflare Workers, Tailwind v4, Playwright + axe + Lighthouse in CI.

```sh
npm ci
npm run dev        # http://localhost:4321
npm run verify     # every quality gate
```

- `PLAN.md`: what is built and why, the phases and the launch checklist.
- `CONTENT-MAP.md`: every fact on the site and where it comes from.
- `DESIGN.md`: the design system ("checked drawing sheets").
- `AGENTS.md`: commands and rules for working on the site.

The site deploys to Cloudflare once Maor's account is connected (PLAN.md, "Building before
Cloudflare exists, and the handover"). Until then CI runs every check but deploys nothing.
