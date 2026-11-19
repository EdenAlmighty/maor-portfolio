---
title: Moving-quote web app
client: First-Rate Moving & Storage
clientUnnamed: New Jersey moving company
description: 'Freelance QA for a moving-quote web app: manual and exploratory testing, Playwright, 50 data-driven runs, a JMeter load test and an accessibility check.'
summary: A full test effort for a business client, from the test plan to the load test.
order: 1
featured: true
kind: freelance
types: [manual, automation, api, performance, accessibility, mobile]
start: 2026-05
end: 2026-06
role: QA engineer, sole tester
tools:
  [
    Playwright,
    JavaScript,
    Apache JMeter,
    Bruno,
    Browser DevTools,
    Google Docs and Sheets,
    Git,
    GitHub Actions,
  ]
result: 50 data-driven form scenarios, a 50-user load test and 2 issues filed
notes:
  - Wrote the test plan and the requirements document, then the test cases in Google Sheets.
  - Checked layouts, alignment and the logo across screen resolutions against the requirements.
  - 'Explored the quote form the way real people break it: pressing back during a submission, interrupting a form, then checking what the fields kept.'
  - 'Did a keyboard-only pass on the form: Name, Email and Phone must follow a sensible tab order.'
  - 'Tested in phone viewports: layout changes, touch targets and mobile input behaviour.'
  - Checked API responses and the stored data with Bruno.
  - 'Automated the quote form in Playwright with a page object: the happy path, required-field validation, and a link check across four pages of the site.'
  - Ran the form with 50 customer scenarios (local and long-distance moves, different cities) read from one data file.
  - Load-tested the form submission in Apache JMeter with 50 concurrent users and wrote the results into a report.
  - Set up headless regression runs in several browsers and a GitHub Actions workflow.
findings:
  - id: '1'
    title: The company logo has an empty alt attribute, so a screen reader gets nothing if the image fails to load
    href: https://github.com/Maor87/First-Rate/issues/1
    test: TC-5
  - id: '2'
    title: Automated runs against the live site are stopped by its firewall and bot protection
    href: https://github.com/Maor87/First-Rate/issues/2
    test: TC-16
evidence:
  - label: Playwright code and CI workflow (GitHub)
    href: https://github.com/Maor87/First-Rate
  - label: Bug reports (GitHub issues)
    href: https://github.com/Maor87/First-Rate/issues
  - label: Test plan, requirements, test cases, the 50-row data file, a run video and the JMeter report (Google Drive)
    href: https://drive.google.com/drive/folders/1tDqSGB1lDhu6SV1oP9xVLL85HIROQ-th
---

The company gets moving quotes through one form on its website, so that form is the business.
I planned the testing around it: what it must accept, what it must refuse, how it behaves on a
phone, with only a keyboard, and when many people send it at once.

The most useful finding was not a bug in the form. When I pointed the automated suite at the
live site, every run stopped at the site's firewall and bot protection, which treats a headless
browser as an attacker. That is the protection doing its job, so I wrote it up as an issue with
what it means for the client: automated regression tests need a staging copy of the site, or an
allow-list rule for the test runner, before they can run on a schedule.
