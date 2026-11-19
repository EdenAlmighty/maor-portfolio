---
title: Weather App
description: 'Freelance Playwright automation for a weather web app: 32 tests with page objects, desktop and mobile layouts, visual snapshots and 7 bug reports.'
summary: My first independent automation project, with a developer fixing what I found.
order: 2
featured: true
kind: freelance
types: [automation, visual, mobile]
start: 2025-05
end: 2025-06
role: Automation tester, working with the app's developer, Eden Gilady
tools: [Playwright, JavaScript, Playwright Inspector, VS Code, Git Bash, GitHub]
result: 32 Playwright tests and 7 bug reports
notes:
  - Wrote the test cases and a test summary report in Google Sheets.
  - 'Built the suite with the page object model: one object per part of the page (city search, main text on desktop and on mobile, coordinates, logo, colour theme), a manager and shared actions.'
  - Covered the search, the weather data shown, and the flows around them.
  - Tested the layout at desktop and phone sizes, with 4 baseline screenshots compared on every run.
  - Stepped through each test in Playwright Inspector to separate script mistakes from real defects.
  - Used Gemini to help debug my own test scripts, and the Playwright documentation for everything else.
  - Filed every defect as a GitHub issue with steps, expected and actual results, and screenshots.
findings:
  - id: '1'
    title: The Check button does not render on the full-screen desktop search page in the automated run
    href: https://github.com/Maor87/Weather-App---Frontend-Playwright-QA-Automation/issues/1
    test: TC-8
  - id: '2'
    title: The city search accepts invalid characters
    href: https://github.com/Maor87/Weather-App---Frontend-Playwright-QA-Automation/issues/2
    test: TC-10
  - id: '3'
    title: Submitting an empty city shows no error message, so there is nothing to test against
    href: https://github.com/Maor87/Weather-App---Frontend-Playwright-QA-Automation/issues/3
    test: TC-9
  - id: '4'
    title: An invalid city name ("Nowhere") returns weather instead of an error
    href: https://github.com/Maor87/Weather-App---Frontend-Playwright-QA-Automation/issues/4
    test: TC-11
  - id: '5'
    title: Wrong latitude shown for New York City
    href: https://github.com/Maor87/Weather-App---Frontend-Playwright-QA-Automation/issues/5
    test: TC-17
  - id: '6'
    title: Wrong longitude shown for New York City
    href: https://github.com/Maor87/Weather-App---Frontend-Playwright-QA-Automation/issues/6
    test: TC-18
  - id: '7'
    title: Wrong time zone on the New York City timestamp
    href: https://github.com/Maor87/Weather-App---Frontend-Playwright-QA-Automation/issues/7
    test: TC-19
evidence:
  - label: Playwright suite with page objects and snapshots (GitHub)
    href: https://github.com/Maor87/Weather-App---Frontend-Playwright-QA-Automation
  - label: 7 bug reports (GitHub issues)
    href: https://github.com/Maor87/Weather-App---Frontend-Playwright-QA-Automation/issues
  - label: Test cases and test summary report (Google Sheets)
    href: https://docs.google.com/spreadsheets/d/10b1DC__HNyE10vrPXHzMg4xkEEoDFjoZmgtP4OVSn7E/edit
  - label: The app itself (free hosting, so it can take a minute to wake up)
    href: https://weather-app-6iqa.onrender.com/
---

A full-stack developer built a weather app; I was its tester. This was the first project where
nobody handed me the test cases: I decided what to cover, built the suite, ran it, and reported
what failed.

Three of the seven bugs were wrong data rather than broken buttons: the latitude, the longitude
and the time zone for New York were off. Those are the bugs a quick click-through misses,
because the page looks fine. The suite checks the numbers, not only that something appears.
