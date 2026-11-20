# Product

<!-- impeccable:product-schema 1 -->

Inferred from `PLAN.md` and `CONTENT-MAP.md` (Eden asked for the build to proceed without
check-ins). Lines marked *(inferred)* were not confirmed in an interview.

## Platform

web

## Stack

Astro (static output) + Tailwind v4 on Cloudflare Workers static assets, one Worker route for
`/go/*` click counts (D1). Built the edengilady.com way (`site-*` skills).

## Users

Hiring managers, QA leads and tech recruiters, in Israel and remote, deciding whether to
interview Maor Matthew Shaer for a QA engineer role. They arrive from LinkedIn, the CV PDF, a
GitHub profile or a search for his name, usually on a laptop between other candidates, and give
the page one or two minutes. *(inferred: scan time and devices)*

## Product Purpose

A portfolio that gets Maor interviews. Success: the visitor downloads the CV or emails him, and
leaves believing he tests carefully and documents everything.

## Positioning

Every claim links to its evidence: a repo, a bug report, a test document. A career changer from
caregiving who went from a 2024 bootcamp to self-directed freelance testing in 2026, and shows his receipts.
The site's own test suite is public and shown on the site.

## Operating Context

Visitors compare candidates' CVs, LinkedIn profiles and GitHub. QA leads judge attention to
detail: typos, broken links and accessibility bugs on a QA candidate's site count against him.

## Capabilities and Constraints

- English only. No contact form; actions are Download CV (`/go/cv`) and Email (`/go/email`).
- Phone number appears only inside the CV PDF, never on an HTML page.
- No photo yet (comes later); the design must not depend on one.
- No third-party scripts; everything readable with JavaScript off.
- There are no clients. The freelance projects are Maor's own; the moving company whose site he
  tested stays unnamed, and no copy says "client".

## Brand Commitments

Name: Maor Matthew Shaer. Title: QA Engineer. Voice: first person, plain, specific. No existing
logo, colors or fonts. His GitHub handle is `Maor87`.

## Evidence on Hand

`CONTENT-MAP.md`: 11 projects with public GitHub repos, GitHub issues (7 Weather App bug
reports, 2 First-Rate), Google Drive test plans, test cases and reports; the CV in
`sources/`. Absent and never to be invented: testimonials (one may come from Eden), metrics
beyond those in the sources, client logos, photos.

## Product Principles

1. Show the evidence, then the claim.
2. Honest labels: freelance, bootcamp, practice and course work are named as such.
3. The site is itself a work sample: no bug a QA lead could find in a minute.
4. One action at a time: CV first, email second.

## Accessibility & Inclusion

WCAG 2.2 AA, tested with axe in CI plus a keyboard and NVDA pass; reduced motion respected.
