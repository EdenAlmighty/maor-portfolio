# Maor Matthew Shaer portfolio: build plan

Last updated: Nov 20, 2026

## Summary and decisions

Build a fast, static, English-only portfolio for Maor Matthew Shaer, a QA engineer in Tel Aviv. It
has one job: help hiring managers and recruiters decide to interview him. Visitors take one of two
actions, downloading the CV or emailing Maor, and both are counted without cookies. The site is
built the same way as edengilady.com (Astro on Cloudflare, gated by CI). Its own test suite is
public and shown on the site, so the site itself counts as one of Maor's work samples. No code is
written until Eden approves this plan (Gate 1) and then the design (Gate 2).

All facts come from `CONTENT-MAP.md`, which lists the source for each one. Nothing on the site may
go beyond what that map can prove.

Assumptions (correct any of these):

- Maor is looking for a job. Freelance work is welcome, but the site isn't built around selling it.
- Eden builds and maintains the site with Claude Code; Maor approves the content.
- Maor is happy to have the site's code public on GitHub, because the tests in that repo are part
  of what the site proves.
- Claude writes the English copy in Maor's voice from his CV and project write-ups, and Maor
  reads every page before launch.

Decisions:

| Decision | Choice |
| --- | --- |
| Site name | Maor Matthew Shaer, written the same way everywhere |
| Title | QA Engineer (not "QA Manual Tester" as on the old Notion page) |
| Domain | TODO: Maor buys one in his Cloudflare account. Suggested: `maorshaer.com` or `maorshaer.dev`; check availability |
| Audience | Hiring managers, QA leads and recruiters, in Israel and remote |
| Language | English only, at `/`. No Hebrew, so the RTL rules don't apply |
| Voice | First person singular ("I tested…"), plain and specific, no buzzwords |
| Primary action | **Download CV** (`/go/cv`, counted) |
| Second action | **Email Maor** (`/go/email`, counted, opens `mailto:`) and LinkedIn |
| Form | None. No form means no spam, no Turnstile, no lead database and a much shorter privacy page |
| CV | The `/cv` page is the single source. The PDF is generated from it at build time, so the page and the download never disagree (needs Maor's OK; the alternative is that Maor uploads his own PDF) |
| Case studies | First-Rate, Weather App, Urban Routes, Urban Grocers API. Seven more projects as cards |
| Testimonial | One, from Eden as the Weather App's developer, in Eden's own words. No other quotes |
| Photo | Comes later. The design is built to work without one and has a marked spot for it. No stock or AI-made photos |
| Phone number | In the CV PDF only. The `/cv` page and the rest of the site don't show it, which keeps it away from search engines and scrapers. The PDF script renders the CV data with the phone line; the page leaves it out |
| GitHub | Built in Eden's account (`EdenAlmighty/maor-portfolio`, public), then transferred to Maor's account (`Maor87`) when the site is done |
| Cloudflare | Maor's own account, set up later. Until then there is no Cloudflare deploy: see "Building before Cloudflare exists" below |
| AI crawlers | Allowed, including training: recruiters ask ChatGPT, Claude and Perplexity about candidates, and a new name gains nothing from blocking them |
| Analytics | Cloudflare Web Analytics (no cookies, no banner) plus the `/go/` click counts |

Still needed before Gate 1:

- [ ] Maor: the roles he's applying for (manual, automation or both; junior or mid-level; Israel, remote or both). The hero line and the order of the projects depend on this
- [ ] Maor: the languages he speaks, and how well
- [ ] Maor: the moving-quote project was self-directed, not for a client (decided 2026-11-20), so the company stays unnamed. Confirm whether the JMeter load test on its live site had the owner's OK
- [x] Phone number: CV PDF only
- [x] Photo: later; design without it for now
- [x] GitHub: Eden's account first, transferred to Maor at the end
- [x] Cloudflare: Maor's account, later
- [ ] Maor: the CV corrections in `CONTENT-MAP.md` §6 ("Uber Routes" → Urban Routes, one name for the taxi app, CSV vs JSON, First-Rate dates), the First-Rate data-driven script pushed to GitHub, and the Star Wars API Drive folder made public
- [ ] Maor: approve generating the CV PDF from the `/cv` page
- [ ] Maor: agree to the "Site by Eden Gilady" credit in the footer (and the link to edengilady.com in the Weather App case study)
- [ ] Eden: a two-sentence quote about working with Maor on the Weather App (optional)
- [ ] Maor: the domain (needed only at launch; buy it in his Cloudflare account so DNS is there too)
- [ ] Eden: approve or edit the positioning and hero lines below

## How to run this plan

Open Claude Code in `C:\dev\maor-portfolio` and paste:

```
Read PLAN.md and CONTENT-MAP.md completely before doing anything.
Load the site-blueprint skill; it routes to the other site-* skills.
We are building the site PLAN.md describes: Astro on Cloudflare, English only.
Phase 0 is done by Eden and Maor. Start at Phase 1 only after Eden confirms Gate 1.
Work one phase at a time. For each phase:
1. Create a branch named phase-N-short-name.
2. Do only that phase's work, then run every quality gate (npm run verify, Lighthouse).
3. Open a pull request with a summary, the preview URL, the phase's "done when" items ticked,
   and every TODO marker listed.
4. Stop and wait for review.
Stop completely at each gate. Never invent a fact, number, client or quote: anything not in
CONTENT-MAP.md becomes a TODO marker. Ask before adding any dependency or service not named here.
```

## Positioning

Maor is a careful, career-changing QA engineer who has already tested real products end to end:
by hand, with code, under load, and for accessibility. And he documents every step.

The honest angle is the path itself. In two years Maor went from a bootcamp to two freelance
projects, and from manual checklists to Playwright suites with page objects, data-driven runs and
CI. Every claim on the site links to the repo, the bug report or the test document behind it.
For a junior or mid-level hire, that habit of showing the evidence is the most convincing thing
on the page.

Hero lines (drafts; final wording waits for the target-role answer):

| Element | Draft |
| --- | --- |
| H1 | QA engineer. I test web and mobile apps by hand, with code, and under load. |
| Subhead | Playwright and WebdriverIO automation, API testing with Postman and Bruno, JMeter load tests, and clear bug reports. Based in Tel Aviv. |
| Primary button | Download my CV |
| Secondary link | Email me |
| Trust line | Every project links to its code, test cases and bug reports |
| Title tag (≤ 60) | Maor Matthew Shaer, QA Engineer in Tel Aviv |
| Meta description (25–160) | QA engineer in Tel Aviv: manual and automated testing with Playwright, API testing with Postman, JMeter load tests. Projects with code and bug reports. |

Differentiators, each backed by `CONTENT-MAP.md`:

1. **Real freelance work, not only coursework.** First-Rate (a live business) and the Weather App
   (a real app, a real developer, 7 public bug reports).
2. **Every layer of testing:** UI, API, mobile, database, performance and accessibility each have
   at least one project behind them.
3. **Evidence on every claim:** repos, test documents and bug reports are one click away.
4. **The site tests itself:** Playwright, axe and Lighthouse run on every change, and the results
   are on `/how-this-site-is-tested`.
5. **Life before tech:** caregiving taught patience and noticing small changes in a person;
   the same skills find bugs. One line on About, no more.

What the site does not do: no skill bars or percentage ratings, no "years of experience" counters,
no logos of tools in a grid, no claims about a project that its sources don't show.

## Projects and case studies

| Project | URL | Tier | What a hiring manager learns | Proof |
| --- | --- | --- | --- | --- |
| First-Rate Moving & Storage | `/projects/first-rate` | Case study | Plans and runs a full, self-directed test effort on a live business site: manual, Playwright, 50 data-driven runs, JMeter, accessibility, API | GitHub repo + issues, Drive: test plan, requirements, test cases, CSV, video, JMeter report |
| Weather App | `/projects/weather-app` | Case study | Builds a Playwright suite alone: 32 tests, page objects, visual snapshots, mobile and desktop, 7 bug reports | GitHub repo + 7 issues, test-case sheet, Eden's quote |
| Urban Routes | `/projects/urban-routes` | Case study | The same app tested twice: manually (UI check against the designs, payment form, Aero Taxi feature) and then with WebdriverIO end to end | GitHub `hm08-qa-us` (CI passing), Drive sheets and bug folder |
| Urban Grocers API | `/projects/urban-grocers-api` | Case study | Reads Swagger docs, builds a Postman checklist, automates GET/POST/PUT/DELETE tests in Jest | GitHub `hm07-qa-us`, Drive sheets and bug folder |
| Urban Scooter | `/projects#scooter` | Card | Web, Android and API testing plus PostgreSQL checks | Drive |
| Urban Lunch | `/projects#lunch` | Card | Mobile testing on an emulator, under poor network conditions | Drive |
| Taxi database | `/projects#taxi-database` | Card | SQL queries and log analysis on a remote server | Google Doc |
| Star Wars API | `/projects#swapi` | Card | Postman: every resource, search, pagination, a test report | Drive (TODO: currently private) |
| Pet Store load test | `/projects#pet-store` | Card, practice | JMeter + BlazeMeter, a report written for non-technical readers | Drive |
| Katalon Studio | `/projects#katalon` | Card, practice | Low-code automation, data-driven tests, runs from the command line | GitHub, Drive |
| Learn Playwright | `/projects#learn-playwright` | Card, course | Locators, assertions, page objects, API tests | GitHub |

Case-study page order: one-line summary; the product and Maor's role; what was tested and why;
how (tools in plain words); what he found (real bugs, with links); what he would do next; links
to the evidence; the two actions. Screenshots come from Maor's own documents or are taken fresh
from public pages. The moving-quote page never names the company or calls it a client: it was a
self-directed project.

Project data lives in a content collection (`src/content/projects/*.md`) with a Zod schema:
`title`, `summary`, `type[]` (manual, automation, api, mobile, performance, database,
accessibility), `kind` (freelance, bootcamp, practice, course), `dates`, `tools[]`, `evidence[]`
(label + URL), `featured`. The projects page groups entries by testing type in plain HTML, with a jump link per
group; no JavaScript filter.

## Tech stack

The edengilady.com stack, minus what this site doesn't need. Versions: check npm for the
current release of each at Phase 1 and pin exactly (`site-blueprint` lists the last known good set).

| Layer | Choice | Why | Instead of |
| --- | --- | --- | --- |
| Framework | Astro, static output | Zero JS by default; every page is HTML that crawlers and recruiters' AI tools read | Next.js (app features we don't need) |
| Styling | Tailwind v4, tokens in `@theme` | One token source for utilities and hand-written CSS | — |
| Content | Content collections + Zod | A project missing a field or a too-long description fails the build | Hard-coded pages |
| Hosting | Cloudflare Workers static assets + one Worker route (`/go/*`) | Free, fast, and DNS, analytics and D1 in one account | Vercel, GitHub Pages (no server route for click counts) |
| Click counts | D1, one `clicks` table | Same pattern as edengilady.com; counts CV downloads per page and referrer | Google Analytics (needs a cookie banner) |
| Tests | Playwright + axe, Chrome only; Lighthouse CI; html-validate; linkinator | The `site-quality-gates` set, run on Windows in CI | — |
| CV PDF | Playwright `page.pdf()` of `/cv` in a build script | One source for the page and the PDF | A hand-made PDF that drifts |

**Do we need SSR?** No. Only `/go/*` runs on the Worker (`prerender = false`, and listed in
`run_worker_first`).

Not used here (compared with edengilady.com): i18n and RTL, the lead form, Turnstile, Resend,
WhatsApp alerts, the webhook and the CRM binding.

## Sitemap

| URL | Page | Example searches | Phase |
| --- | --- | --- | --- |
| `/` | Home | maor shaer, maor matthew shaer qa | Launch |
| `/projects` | All projects by testing type | qa engineer portfolio playwright | Launch |
| `/projects/first-rate` | Case study | playwright data-driven testing project | Launch |
| `/projects/weather-app` | Case study | playwright page object model project | Launch |
| `/projects/urban-routes` | Case study | webdriverio end to end test project | Launch |
| `/projects/urban-grocers-api` | Case study | api testing postman jest project | Launch |
| `/about` | Path, background, languages, what Maor is looking for | maor shaer | Launch |
| `/cv` | The CV as HTML + PDF download | maor matthew shaer cv | Launch |
| `/how-this-site-is-tested` | The site's own gates and latest results | — | Launch |
| `/accessibility` | Accessibility statement | — | Launch |
| `/privacy` | Short privacy note | — | Launch |
| `/404` | Not found, with links to projects and CV | — | Launch |
| `/go/cv`, `/go/email`, `/go/linkedin`, `/go/github` | Counted redirects (`noindex`, `nofollow`) | — | Launch |

URL rules: lowercase ASCII, no trailing slash, self canonical, 301 on any change.

## Home page blueprint

Each section ends with a way to the CV or email.

1. **Header:** name (home link), Projects, About, CV, and an "Email me" button.
2. **Hero:** H1, subhead, Download my CV, Email me, trust line. Photo if there is one.
3. **The path:** bootcamp, with manual, API and first automation work (2024) → first freelance
   automation project, the Weather App (2025) → a full, self-directed test effort on a live business site,
   First-Rate (2026). Three steps, each linking to its project. This is the bold element in Direction A.
4. **Featured work:** the four case studies, each with what was tested, the tools, and one
   concrete result (for example "7 bug reports filed").
5. **Skills with proof:** grouped by testing type; each skill links to the project that shows it
   (`CONTENT-MAP.md` §3). No bars, no percentages.
6. **How I work:** four short steps from his real process (read requirements and designs → write
   the test plan and cases → test by hand and automate the repeatable parts → report bugs with
   steps, expected and actual results, and evidence).
7. **Eden's quote** (if provided).
8. **This site is tested too:** latest gate results, link to `/how-this-site-is-tested` and the repo.
9. **Closing call:** what roles Maor wants (from the answer above), Download my CV, Email me, LinkedIn, GitHub.
10. **Footer:** email, LinkedIn, GitHub, accessibility, privacy, "last updated" date.

Copy rules: first person; buttons say exactly what happens ("Download my CV (PDF, 120 KB)");
numbers only when a source shows them; tools named the way their makers write them
(Playwright, WebdriverIO, JMeter, Postman, Bruno).

## Design system

Two directions; Phase 2 turns the chosen one into `DESIGN.md` for approval (Gate 2), using the
`site-design-system` and `impeccable` skills. Palettes are starting points; contrast is checked
for every pair in Phase 2.

**Direction A: Test run.** The site is laid out like a clean, readable test-run report. Each
project is a "run" with a status, its steps and links to its evidence. The hero's path is three
passed stages. It's calm and precise, and it shows the way Maor thinks.

- Palette: Ink `#18212B` text, White `#FFFFFF` background, Fog `#EEF2F5` panels, Run blue
  `#1D5FD1` actions and links, Pass green `#1E7A4C` status marks only (never body text).
- Type: Atkinson Hyperlegible Next for everything (a face designed for readability, which suits a
  QA site that cares about accessibility) with IBM Plex Mono for test names, dates and tool names.
- Bold element: the hero path as a run log, with each stage linking to its project.

**Direction B: Marked-up proof.** Built around what Maor actually does: find what's wrong.
Real screenshots of bugs he reported (from his public GitHub issues) appear with hand-drawn
markup circles and margin notes. Everything else is quiet and editorial.

- Palette: Paper `#FFFFFF`, Graphite `#23272E` text, Markup red `#C8233A` for annotations and
  the main button, Highlighter `#FFE15A` behind marked words (never as text colour), Steel
  `#5B6573` secondary text.
- Type: Bricolage Grotesque for headings, Source Sans 3 for body, a handwriting face for the
  margin notes only (subset to the glyphs used, loaded near the viewport).
- Bold element: one annotated bug screenshot in the hero.

Mobile hero wireframe:

```
+--------------------------------+
| Maor Matthew Shaer   [Email][=] |
|                                |
|  H1: QA engineer. I test web   |
|  and mobile apps by hand,      |
|  with code, and under load.    |
|  subhead                       |
|                                |
|  [ Download my CV ]  Email me  |
|  trust line                    |
|                                |
|  [ run log / marked-up bug ]   |
+--------------------------------+
```

Avoid list: the `site-design-system` list. For a QA site in particular: no terminal or
"hacker" green-on-black, no tool-logo grids, no skill percentage bars, no fake code editors in the
hero, no checkmark confetti.

Quality floor: one markup for every screen size, works from 320 px, visible focus, reduced motion
respected, text contrast ≥ 4.5:1, readable with JavaScript off, light and dark themes with the
same token names.

## SEO and AI search

From `site-seo-geo`, adjusted for a person rather than a business:

- **JSON-LD:** `ProfilePage` with `mainEntity` `Person` on home, About and CV (name, `jobTitle`,
  `address` Tel Aviv, `email`, `sameAs` GitHub + LinkedIn, `knowsAbout` from the skills list,
  `alumniOf` TripleTen, `hasCredential` the QA Engineering certificate). `WebSite` on every page.
  Each case study: `CreativeWork` with `author` → the Person, plus `BreadcrumbList`.
  No `Review` or ratings markup.
- **On-page:** one H1 per page, title ≤ 60, description 25–160, canonical, Open Graph with an
  image per page (generated by `scripts/og.mjs`), raster favicons.
- **robots.txt:** everything allowed, one group per AI crawler as in the template, `/go/`
  disallowed. `llms.txt` with who Maor is, what roles he wants, and links to every project.
- **Off-site, after launch:** the new URL goes into LinkedIn (Website and Featured), the GitHub
  profile and README, every project README, and the CV. The Notion page gets one line pointing to
  the new site, and is then left unpublished or kept as an archive (Maor decides).
- **Measured:** Search Console and Bing Webmaster Tools; a monthly check that asking an AI
  assistant "Who is Maor Matthew Shaer, QA engineer?" returns the site.

## Performance budget

Mobile, enforced in CI.

| Metric | Google "good" | Our budget | Enforced by |
| --- | --- | --- | --- |
| LCP | ≤ 2.5 s | ≤ 1.5 s | Lighthouse CI on the Cloudflare preview |
| INP | ≤ 200 ms | ≤ 100 ms | Field data (Cloudflare Web Analytics) |
| CLS | ≤ 0.1 | ≤ 0.05 | Lighthouse CI |
| JS per page (gzip) | — | ≤ 15 KB (theme toggle, font switch; nothing else) | `check-budget.mjs` |
| Page weight | — | ≤ 400 KB | Lighthouse |
| Font files on the first screen | — | ≤ 3 (single language) | `tests/budget.spec.ts` |
| Font data per page | — | ≤ 120 KB | `tests/budget.spec.ts` |
| Lighthouse | — | Performance ≥ 95; Accessibility, Best Practices, SEO 100; Agentic Browsing 1.0 | `lighthouserc*.json`, `check-agentic.mjs` |

How: no third-party script at all; fonts self-hosted, subset to Latin, switched on after the first
paint (the edengilady.com method); screenshots in AVIF with fixed sizes, lazy below the fold;
`content-visibility` on long case-study sections.

## Tracking

| Event | Captured by | Where Eden and Maor see it |
| --- | --- | --- |
| Page views, Web Vitals | Cloudflare Web Analytics | Cloudflare dashboard |
| CV download | `/go/cv` logs time, page, referrer host to D1, then redirects to the PDF | D1 (`npm run clicks` prints a summary) |
| Email click | `/go/email` → `mailto:` | D1 |
| LinkedIn / GitHub click | `/go/linkedin`, `/go/github` | D1 |
| AI assistant referral | Referrer host (chatgpt.com, claude.ai, perplexity.ai, gemini.google.com) | D1 |

No IP addresses, no user agents, no cookies.

## Accessibility, legal and security

- WCAG 2.2 AA, tested with axe in CI and a manual keyboard and NVDA pass before launch. For a QA
  engineer, a single accessibility bug on his own site is a bad first impression.
- `/accessibility`: what was tested, how, known gaps, and how to report a problem (email).
- `/privacy`: no forms, no cookies; Cloudflare Web Analytics; what the click counts store and
  for how long (12 months); contact email. Short, plain, and dated.
- Security headers from the `site-seo-geo` template; CSP with no third-party hosts; `security.txt`.
- No legal review needed beyond Maor reading both pages: the site collects no personal data.

## The "How this site is tested" page

The deploy job writes `src/data/test-report.json` before the production build: Playwright test
count and result, axe violations (0), Lighthouse scores per page, and the commit and date. The page
shows those numbers, explains each gate in two sentences, and links to the repo and the latest
GitHub Actions run. If a gate fails, nothing deploys, so the page only ever shows passing results.
It says that openly.

## Building before Cloudflare exists, and the handover

The whole site is built and tested without a Cloudflare account. Only deploying needs one.

While the repo is in Eden's GitHub:

- `wrangler.jsonc` is complete from day one (assets, `run_worker_first: ['/go/*']`, the D1
  binding). It leaves out `account_id`, and the D1 `database_id` is a placeholder. Local D1
  (`wrangler d1 migrations apply --local`) and `npm run preview` (workerd) run the real Worker
  on Eden's machine, `/go/*` included.
- CI runs the full `quality` job on Windows for every PR: lint, types, build, HTML, links, budget,
  Playwright, axe, Lighthouse and agentic checks against the local workerd preview.
- The `preview` and `deploy` jobs are in the workflow but do nothing while the
  `CLOUDFLARE_API_TOKEN` secret is missing: their first step checks whether it is set, and the
  remaining steps run only if it is (GitHub doesn't allow secrets in a job-level `if`). They
  turn on by themselves after the handover.
- PR review happens locally (`npm run preview`) plus the Playwright report and screenshots
  attached to each PR. The strict LCP check on a Cloudflare preview waits for the handover;
  until then LCP is only a warning, as in the local Lighthouse config.

Handover (after Gate 3, in this order; Maor does every account step himself, and Claude never
handles his tokens):

1. Eden transfers `EdenAlmighty/maor-portfolio` to `Maor87` (GitHub → Settings → Transfer).
   Issues, PRs and Actions history move with it, and GitHub redirects the old URL.
2. Maor creates his Cloudflare account, buys the domain there, and creates a D1 database
   (`wrangler d1 create maor-portfolio`).
3. A PR (Claude) puts Maor's `account_id`, the D1 `database_id` and the domain into
   `wrangler.jsonc`.
4. Maor creates a Cloudflare API token (Workers + D1 Edit) and saves it with
   `gh secret set CLOUDFLARE_API_TOKEN` and `gh secret set CLOUDFLARE_ACCOUNT_ID` in his repo.
5. Merging that PR runs the first deploy: migrations, `wrangler deploy`, smoke test, IndexNow.
   Then the launch-day items below.

## Repo structure

```
src/lib/site.ts              name, title, email, profiles, roles wanted; null = TODO marker
src/content/projects/*.md    one file per project (schema above)
src/content/cv.ts            CV data: summary, skills, experience, education, languages
src/data/test-report.json    written by CI before the production build
src/layouts/Base.astro       meta, canonical, OG, JSON-LD, header, footer
src/views/ + src/pages/      pages; /go/[target].ts is the only Worker route
scripts/                     the site-quality-gates scripts, og.mjs, cv-pdf.mjs, test-report.mjs
tests/                       smoke, seo, a11y, no-js, budget, go-redirects, cv (page and PDF match)
migrations/                  D1: clicks table
AGENTS.md                    from the site-blueprint template; CLAUDE.md = @AGENTS.md
PLAN.md, CONTENT-MAP.md, DESIGN.md
sources/                     Maor's original CV (not served)
```

## Build phases

About 8–11 working days. Work stops at three gates.

| Phase | Effort | Done when |
| --- | --- | --- |
| 0. Answers and content (Maor, Eden) | 2–4 days | Every "Still needed" box ticked; corrected CV facts; photo or decision; domain and accounts |
| **Gate 1** | | **Eden says go ahead** |
| 1. Setup | 1 day | Repo in Eden's GitHub, AGENTS.md, CI on Windows green, Cloudflare jobs present but skipped, local workerd preview runs `/go/*` with local D1, `site.ts` filled from the content map |
| 2. Design | 1–2 days | DESIGN.md with tokens, type, wireframes, contrast ratios, light and dark |
| **Gate 2** | | **Eden approves DESIGN.md** |
| 3. Home page | 2 days | All 10 sections, budget met on mobile, readable with JS off |
| 4. Projects, CV, About, legal | 2–3 days | 4 case studies, projects page with 11 entries, `/cv` + generated PDF, About, accessibility, privacy, 404 |
| 5. Tracking and test-report page | 0.5 day | `/go/*` counts land in D1; `/how-this-site-is-tested` shows real CI numbers |
| 6. SEO and AI layer | 0.5 day | JSON-LD validates; sitemap, robots, llms.txt, OG images, favicons |
| 7. QA | 1 day | Every gate green; keyboard and NVDA pass; Maor has read every page |
| **Gate 3** | | **Launch checklist passes** |
| 8. Handover and launch | 0.5 day + Maor's account setup | Repo transferred to Maor, his Cloudflare account and domain connected, first deploy green, Search Console and Bing verified, links updated in CV, LinkedIn, GitHub |

## Launch checklist

Pre-launch:

- [ ] CI green; Lighthouse targets met on every page on the local workerd preview
- [ ] The CV PDF contains the phone number; no HTML page does (a test checks both)
- [ ] Keyboard and NVDA pass on every page
- [ ] Every page readable with JavaScript off
- [ ] `/go/` counts reach D1; the CV PDF matches `/cv` and is under 200 KB
- [ ] No TODO markers left (`npm run check:launch`), or Eden accepts the list
- [ ] Every claim on the site traced to `CONTENT-MAP.md`; every evidence link opens without a login
- [ ] No page names the moving company or says "client"
- [ ] Maor has read every page and the generated PDF
- [ ] Rich Results Test passes for home and one case study

Launch day (after the handover steps above):

- [ ] Repo in Maor's GitHub, secrets set by Maor, first deploy and smoke test green
- [ ] Strict LCP check passes on the live site (the first time it can be measured on Cloudflare)
- [ ] Domain on Cloudflare, HTTPS, HSTS, `www` → apex
- [ ] Search Console + Bing verified, sitemap submitted, IndexNow pinged
- [ ] Web Analytics on

After launch:

- [ ] Same day: new URL in LinkedIn, GitHub profile, project READMEs, CV; Notion page points to the site
- [ ] Week 1: pages indexed
- [ ] Monthly: click counts reviewed, AI-assistant check, dependencies updated
- [ ] After every new project: a project file, and a case study if it's strong

## Risks

| Risk | How it is handled |
| --- | --- |
| The company objects to the project | The case study stays, with the company unnamed and no screenshots of its site |
| A claim on the CV doesn't match the evidence | `CONTENT-MAP.md` is checked before copy is written; the CV is fixed, not the site stretched |
| Evidence links break (Drive files moved or made private) | A weekly scheduled CI job checks every evidence link; key documents exported as PDFs and hosted on the site, if Maor agrees |
| Weather App host is slow or goes down | Screenshots on the page; the live link is labelled as a demo that may take a minute to wake up |
| Role target unclear, so the copy is vague | Gate 1 waits for the answer |
| Site looks like a template | Two directions, the avoid list, and Gate 2 |

## Nice-to-haves (after launch)

- A short write-up per bug class Maor finds often (form validation, responsive layout, API status
  codes): good for search and interviews.
- A "Test this site" page inviting visitors to report a bug by email, with a public list of the
  ones found.
- Downloadable PDF versions of the best test plan and bug reports, hosted on the site.

## Sources

- `CONTENT-MAP.md` and `sources/Maor_QA_Engineer_CV.pdf`
- github.com/Maor87 (repos, issues, CI runs), read 2026-11-20
- Maor's Notion portfolio and the Drive folders it links to, read 2026-11-20
- Reference build: `C:\dev\edengilady` and the `site-*` skills
