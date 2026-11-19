# Maor Matthew Shaer: content map

Everything the portfolio can say, where each fact comes from, and what still needs Maor's answer.
Gathered 2026-11-20 from four sources: the CV (`sources/Maor_QA_Engineer_CV.pdf`), the Notion
portfolio, GitHub `Maor87`, and the Google Drive folders the Notion pages link to. LinkedIn shows a
sign-up wall to logged-out visitors, so nothing here was taken from it.

Rule for the build: the site states only what one of these sources backs up. Anything marked
**Ask** becomes a `TODO(content)` marker until Maor answers.

## 1. Identity (goes into `src/lib/site.ts`)

| Field | Value | Source | Note |
| --- | --- | --- | --- |
| Name | Maor Matthew Shaer | CV, GitHub | Same spelling everywhere |
| Title | QA Engineer | CV, GitHub | The Notion page says "QA Manual Tester". The site uses **QA Engineer** |
| Location | Tel Aviv, Israel | GitHub, Notion | The CV says only "Israel" |
| Email | maorshaer87@gmail.com | CV, Notion, GitHub | Shown on the site and used in `mailto:` |
| Phone | +972 50-217-2419 | CV, Notion | **Ask:** show it on the site? It stays in the CV PDF either way |
| GitHub | https://github.com/Maor87 | given | |
| LinkedIn | https://www.linkedin.com/in/maor-matthew-shaer1987/ | given | |
| Notion portfolio | thoracic-echinodon-ed7.notion.site/… | given | The new site replaces it. After launch, update the links in the CV, GitHub bio and README |
| Discord | maor_matthew_shaer | GitHub README | Leave it off the site |
| Education | QA Engineering Certificate, TripleTen Israel, Mar–Aug 2024 | CV | |
| Front-end background | 13 HTML/CSS/JS repos, 2023 (Vercel) | GitHub | Supports "I understand how the code I test is built". Mention in one line on About; no project cards |

## 2. Positioning, in Maor's own words

- CV summary: manual testing done to recognized methodologies, with JIRA, Postman, DevTools and
  Android Studio. Eye for detail. Caregiving taught clear communication and a user-centred approach.
- GitHub bio: "a graduate of the TripleTen Israel boot camp. Always motivated to continue learning."
- The work itself tells the real story: Maor started with manual testing in the bootcamp, moved to
  automation (WebdriverIO, then Playwright), and finished with a freelance project that covered
  every layer (manual, automated, API, performance, accessibility). The home page should lead with
  that path, not with a list of tools.

**Ask:** which jobs Maor is applying for: manual QA, automation, or both? Junior or mid-level? In
Israel, remote, or both? The hero line depends on the answers.

## 3. Skills, each linked to proof

Each skill on the site links to a project that shows it. A skill with no project behind it is
listed without a link.

| Skill | Shown in |
| --- | --- |
| Playwright (JavaScript), Page Object Model | Weather App, First-Rate, Learn Playwright |
| Data-driven testing | First-Rate (50-row data file in Drive), Katalon |
| Visual / screenshot comparison | Weather App (4 baseline snapshots in the repo) |
| WebdriverIO + Mocha end-to-end | Urban Routes automation (hm08) |
| API testing: Postman, Bruno, Jest, Playwright API | Urban Grocers (hm07), Star Wars API, Scooter, First-Rate, Learn Playwright |
| SOAP / XML requests | Urban Grocers (CV) |
| Performance: JMeter, BlazeMeter | First-Rate (JMeter report PDF), Pet Store |
| Accessibility (keyboard order, alt text) | First-Rate (bug #1 on GitHub: empty `alt` on the logo) |
| Mobile: Android Studio emulator (Pixel 5), network conditions | Lunch app, Scooter courier app |
| SQL / PostgreSQL, log analysis on a remote server | Taxi database project, Scooter API project |
| Test design: boundary values, equivalence classes, positive/negative | Urban Grocers, Scooter, Urban Routes |
| Test documentation: test plan, requirements, test cases, summary report | First-Rate, Weather App, every bootcamp project |
| Bug reports in Jira and GitHub Issues | 7 public issues in Weather App, 2 in First-Rate, Jira reports in Drive folders |
| CI: GitHub Actions | hm07, hm08 and First-Rate each have a workflow |
| Low-code automation: Katalon Studio (Groovy, CLI runs) | Katalon practice project |
| Git, GitHub, Git Bash, VS Code, DevTools | all |

## 4. Projects

### Tier 1: full case-study pages

**First-Rate Moving & Storage** — freelance, May–June 2026
- Client: firstratemove.com, a moving company in New Jersey. Maor tested the moving-quote web app.
- Work: test plan, requirements and test-case documents (Drive). Manual UI and exploratory
  testing, a keyboard and accessibility audit, mobile viewports. Playwright with a page object
  (`pages/QuotePage.js`): a quote-form happy path, required-field validation, and a link check
  across 4 site pages. Data-driven runs with 50 scenarios. JMeter load test with 50 concurrent
  users. Bruno API checks.
- Proof: GitHub `Maor87/First-Rate` (2 spec files, a CI workflow, 2 issues). Drive folder: test plan,
  requirements, test documentation, `50 rows for Quote Form….csv`, `50_Iterations_QuoteForm.mp4`,
  `JMeter First Rate Performance Testing Report.pdf`.
- Strong story: GitHub issue #2 records that automated runs against production were blocked by the
  site's Cloudflare bot protection, and explains why. That is a real-world finding worth telling.
- **Ask:**
  - Did First-Rate agree to be named on Maor's site and to have screenshots of its site shown?
    Until they do, the page calls the client "a New Jersey moving company".
  - Did the client approve load-testing the production site? The case study should say so.
  - The CV says the 50 scenarios come from "external JSON data". The file in Drive is a CSV, and
    the data-driven script isn't in the GitHub repo. Push that script to the repo, and make the
    CV wording match the file.
  - The CI workflow's last two runs were cancelled. Either make it pass or explain it on the page
    (the bot protection is a fair reason).

**Weather App: Playwright automation** — freelance, May–June 2025
- App built by Eden Gilady; Maor was the automation tester. "My first independent automation project."
- Work: 32 Playwright tests in a page-object structure (8 page objects), desktop and mobile layouts,
  4 visual snapshots, Playwright Inspector, a test-case sheet and a test summary report.
- Proof: GitHub repo; **7 public bug reports** (wrong time zone, latitude and longitude for New
  York; an invalid city that returns weather; a missing error message; a button that doesn't
  render); the Google Sheet with test cases.
- The app is still online (`weather-app-6iqa.onrender.com`), but the free host takes ~50 s to
  wake up. Show screenshots on the page and link to the app with a note about the wait.
- **Ask Eden:** you were the developer. A two-sentence quote from you about working with Maor would
  be the site's only testimonial, and a real one. Should I add it? You write it.

**Urban Routes: end-to-end automation** — TripleTen, Aug 2024
- WebdriverIO + Mocha, page object (`page.js`) and helpers, the taxi-ordering flow end to end.
- Proof: `Maor87/hm08-qa-us`, CI green (last run Mar 2026). Two open Dependabot/Snyk PRs.
- Merge with the manual Urban Routes work (Figma UI check, payment form, Jira bugs) and the Aero
  Taxi feature tests into one page: the same app, tested manually first and then automated.

**Urban Grocers: API testing** — TripleTen, Jul 2024
- Postman collection built from the Swagger docs, then automated in Jest: GET, POST, PUT and DELETE
  handlers. Boundary values, equivalence classes, SOAP and XML requests.
- Proof: `Maor87/hm07-qa-us` (4 test files, CI workflow); checklist and bug-report folders in Drive.

### Tier 2: project cards (a short summary and links, no page of their own)

| Project | Type | Date | Link | Note |
| --- | --- | --- | --- | --- |
| Urban Scooter: web, mobile and API | Manual, mobile, API, PostgreSQL | Aug 2024 | Drive sheet + bug folder | Widest manual project. Could be promoted to Tier 1 |
| Urban Lunch mobile app | Mobile (Pixel 5 emulator) | Jun 2024 | Drive sheet + bug folder | |
| Taxi database: SQL and logs | SQL, Linux log analysis | Jun 2024 | Google Doc | Not on the CV; worth adding |
| Star Wars API (SWAPI) | Postman API | Feb 2025 | **Drive folder is private** | **Ask:** share the folder publicly or export it as a PDF |
| Pet Store load test | JMeter, BlazeMeter | Feb 2025 | Drive folder | Practice project; say so |
| Katalon Studio | Low-code automation | Apr 2025 | GitHub + Drive | Practice project |
| Learn Playwright | Playwright course (Udemy) | May 2025 | GitHub | Course work; say so |

Practice and course projects are labelled honestly. To a hiring manager, labels read as
self-awareness; a course project dressed up as client work reads as a red flag.

## 5. Work history (About page)

| Role | Where | When | How the site uses it |
| --- | --- | --- | --- |
| Elderly care provider | Nathan, Tel Aviv | Jan 2020 – Dec 2024 | One line: patience, clear communication, noticing small changes. The CV bullets about personal care stay off the site |
| Base security | IDF, Galil base, Ramat HaSharon | Oct 2012 – Apr 2013 | One line |
| Office mail service | American Union, New York City | Oct 2008 – May 2009 | One line: lived and worked in the US. Fluent English? **Ask** |

**Ask:** what languages Maor speaks, and at what level. Recruiters in Israel look for this.

## 6. Fix before the site points at these sources

Recruiters will click through from the site, and a QA candidate's own pages get read closely:

- Typos in public places: "independant" (two repo descriptions), "Augest", "Febuary",
  "Groccers", "Requirments" (Notion), "uesed", "a overview" (Weather README).
- The CV says "Uber Routes Web App". The TripleTen app is **Urban Routes**, and Uber is a real
  company. Rename it on the CV.
- The CV says "Taxi Routes" for the same Urban Routes app. Use one name.
- The CV says the First-Rate data was "external JSON data"; the file is a CSV (see above).
- The CV's dates show First-Rate as May–June 2026, but the repo was created in February 2026.
  Check which dates are right.

- The Notion page for the Pet Store load test links to `petstore.octoperf.com/actions/Catalog.action`,
  which now returns 404. The site links to the demo shop's home page instead (found by
  `npm run check:evidence`, 2026-11-20).

## 7. Site map (draft; becomes PLAN.md's sitemap)

| URL | Page | Search intent |
| --- | --- | --- |
| `/` | Home: who Maor is, what roles he wants, 3 featured projects, skills with proof, CV download | "Maor Shaer QA" |
| `/projects` | All projects, filterable by testing type | "QA engineer portfolio Playwright" |
| `/projects/first-rate` | Case study | |
| `/projects/weather-app` | Case study | |
| `/projects/urban-routes` | Case study (manual and automated) | |
| `/projects/urban-grocers-api` | Case study | |
| `/about` | Career path, background, languages, what Maor is looking for | |
| `/cv` | The CV as HTML (indexable) + PDF download | "Maor Matthew Shaer CV" |
| `/how-this-site-is-tested` | This site's own Playwright, axe and Lighthouse checks, with live CI results | Proof on its own |
| `/accessibility`, `/privacy` | Short statements | |

Every page ends with the same two actions: **Download CV** (`/go/cv`, counted) and **Email Maor**
(`/go/email`, counted).
