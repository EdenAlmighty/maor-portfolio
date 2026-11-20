# Maor Matthew Shaer portfolio: agent rules

A static, English-only portfolio that helps Maor Matthew Shaer, a QA engineer in Tel Aviv, get
interviews. Read `PLAN.md` before any work; it is the source of truth for scope, copy rules and
phases. Every fact on the site must trace to `CONTENT-MAP.md`. Design rules live in `DESIGN.md`.
Built the edengilady.com way: the `site-*` skills (start with `site-blueprint`).

## Stack (pinned exactly; Renovate proposes updates)

| Package                                | Version                                                    |
| -------------------------------------- | ---------------------------------------------------------- |
| Node                                   | 24 (`.nvmrc`)                                              |
| astro                                  | 7.3.5, static output                                       |
| @astrojs/cloudflare                    | 14.3.3 (images compiled at build, sessions off)            |
| tailwindcss, @tailwindcss/vite         | 4.3.3, tokens in `@theme inline` (`src/styles/global.css`) |
| typescript                             | 6.0.3, strict                                              |
| wrangler                               | 4.147.0                                                    |
| @astrojs/sitemap                       | 3.7.4                                                      |
| @playwright/test, @axe-core/playwright | 1.65.1, 4.13.0 (Chromium only)                             |
| Lighthouse CI                          | `npx @lhci/cli@0.15.1` in CI only (not a dependency)       |

## Commands

| Task                                            | Command                                                                  |
| ----------------------------------------------- | ------------------------------------------------------------------------ |
| Install                                         | `npm ci`                                                                 |
| Dev server                                      | `npm run dev`                                                            |
| Build                                           | `npm run build` (output in `dist/client`)                                |
| Serve the build (workerd)                       | `npm run preview`; stop with `npx astro preview stop`                    |
| Review preview (Eden's account, noindex, no D1) | `npm run deploy:preview` → maor-portfolio-preview.edengilady.workers.dev |
| Every quality gate                              | `npm run verify`                                                         |
| Lint, format, types                             | `npm run lint`, `npm run format:check`, `npm run check`                  |
| HTML, links, budget                             | `npm run check:html`, `npm run check:links`, `npm run check:budget`      |
| Evidence links (GitHub, Drive...)               | `npm run check:evidence`                                                 |
| Browser tests                                   | `npm test` (Playwright + axe; Pixel 7 and desktop Chrome)                |
| Lighthouse                                      | `npx @lhci/cli@0.15.1 autorun`, `npm run check:agentic`                  |
| After a build: OG images, CV PDF                | `npm run og`, `npm run cv:pdf`; commit `public/og/` and the PDF          |
| Results for the testing page                    | `npm run test-report` (after `npm test` and Lighthouse)                  |
| Worker types / local D1                         | `npm run generate-types` / `npm run db:migrate:local`                    |
| Click counts (after the handover)               | `npm run clicks -- --remote`                                             |
| TODO report / launch gate                       | `npm run check:todos` / `npm run check:launch`                           |

Astro allows one preview server per project, and on Windows a running preview locks `dist/`
so the next build fails: stop it (`npx astro preview stop`) before building, testing or
running Lighthouse.

## Folder map

```
src/lib/site.ts            Maor's details; null = TODO marker; phone is for the PDF only
src/content/projects/*.md  one file per project (schema in src/content.config.ts)
src/data/cv.ts             CV summary, skills, history, education
src/data/test-report.json  written by scripts/test-report.mjs, shown on /how-this-site-is-tested
src/lib/skills.ts          the parts list: each skill and the projects that show it
src/lib/sheets.ts          the drawing register: sheet numbers for the title blocks
src/layouts/Base.astro     meta, canonical, OG, JSON-LD, header, footer
src/components/            PageSheet (sheet + title block), PathDrawing (hero), ProjectRows...
src/scripts/ruler.ts       draws the hero's leader lines from live layout boxes
src/pages/go/[target].ts   the only Worker route: counts /go/ clicks in D1, then redirects
tests/pages.ts             the paths every test runs on; add each new page
scripts/                   checks, OG images, CV PDF, test report, IndexNow
```

## Content rules

- Every claim comes from `CONTENT-MAP.md` (CV, GitHub, Notion, Drive). Nothing invented:
  no numbers, clients, quotes or skills a source does not show. Missing content is a
  `TODO(content): …` comment, `null` in `site.ts`, or a `<Todo />` marker.
- Label every project honestly: freelance, TripleTen bootcamp, practice project or course work.
- The First-Rate client is named only when `site.firstRateNamed` is true (needs their OK).
- The phone number appears only in the CV PDF. `tests/cv.spec.ts` fails if any page shows it.
- First person, plain, specific. Buttons say exactly what happens. No dash-separated clauses
  in project copy (write a colon or a new sentence).

## Tables on phones

Tables with `mp-table--stack` turn each row into a block under 40rem (`src/styles/sheet.css`).
Changing a cell's display can drop table semantics in some screen readers, so those tables
carry explicit `role` attributes (`table`, `rowgroup`, `row`, `cell`...). html-validate's
`no-redundant-role` is off for that reason. Secondary cells get a `data-label` for their
heading on phones.

## Performance budget (mobile; CI fails above it)

LCP ≤ 1.5 s (on the Cloudflare preview once it exists), CLS ≤ 0.05, JS ≤ 30 KB gzip per
page, page weight ≤ 400 KB, at most 3 font files and 120 KB of fonts per page. Lighthouse:
Performance ≥ 95; Accessibility, Best Practices and SEO 100; Agentic Browsing 1.0.

## Never

- `left`/`right` in CSS or physical Tailwind utilities (`ml-`, `pr-`, `left-`).
- Inline `style` attributes (the CSP blocks them) or scripts from new hosts.
- A third-party script on first load, or any new dependency or service not in `PLAN.md`
  without asking Eden.
- Text or numbers that appear only after JavaScript runs.
- Secrets in the repo. There are none today; at the handover Maor sets
  `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` with `gh secret set` himself.
- Cloudflare resources in Eden's account, apart from the review preview Worker
  (`maor-portfolio-preview`, `npm run deploy:preview`): the real site goes to Maor's account.

## Definition of done for a change

1. `npm run verify`, Lighthouse CI and `npm run check:agentic` pass locally and in CI.
2. Checked at 320 px and on desktop, in light and dark.
3. After content changes: `npm run build && npm run og && npm run cv:pdf`, commit the outputs.
4. Production deploys and merges need Eden's explicit go-ahead.
