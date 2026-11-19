---
title: Urban Routes
description: 'Manual and automated testing of a ride-ordering web app: Figma UI checks, payment form tests, Jira bugs, then an end-to-end WebdriverIO suite.'
summary: 'One app tested twice: by hand first, then with an end-to-end suite.'
order: 3
featured: true
kind: bootcamp
types: [manual, automation, visual]
start: 2024-05
end: 2024-08
role: QA tester (TripleTen project)
tools: [WebdriverIO, Mocha, JavaScript, Node.js, Jira, Figma, Chrome DevTools, GitHub Actions]
result: Manual test cases and Jira bug reports, then an end-to-end suite that passes in CI
notes:
  - 'Compared the car-sharing screens with the Figma designs: fonts, colours, alignment and responsiveness.'
  - Tested the payment form with valid and invalid input, edge cases and equivalence classes.
  - Wrote positive and negative functional test cases and ran them in up-to-date browsers at set screen sizes, with a clean cache.
  - 'Tested the new Aero Taxi option: its icon in the transport panel, when it turns active and inactive, and the travel time, cost and service name it shows.'
  - Intercepted and changed requests and responses in Chrome DevTools to see how the front end reacts.
  - Reported every defect in Jira with a short title, steps, expected and actual results, and screenshots.
  - Automated the taxi-ordering flow end to end in WebdriverIO and Mocha (addresses, phone number and the order form), with a page object and helpers.
  - Configured wdio.conf.js, kept the project in Git with a README, and it runs in GitHub Actions.
evidence:
  - label: End-to-end WebdriverIO suite with CI (GitHub)
    href: https://github.com/Maor87/hm08-qa-us
  - label: Car-sharing test cases (Google Sheets)
    href: https://docs.google.com/spreadsheets/d/1SVjehBu6D4edfwtQuTli7cdAiUO6OeMdtXsLFZat8S0/edit
  - label: Aero Taxi test cases (Google Sheets)
    href: https://docs.google.com/spreadsheets/d/1Wm8Xa4aysi8NKvxcyHRvtKNk8tmoqIt5uOA30TLzSXQ/edit
  - label: Aero Taxi bug reports (Google Drive)
    href: https://drive.google.com/drive/folders/1FLCUOQOdm41j5-JnusubKrqJ8y50dIzF
---

Urban Routes is the TripleTen training app for ordering rides. I met it twice. First as a
manual tester: checking screens against their designs, breaking the payment form on purpose,
and testing a brand-new feature, Aero Taxi, from its written requirements.

A few months later I automated the main flow, ordering a taxi, so the checks I had done by hand
run in seconds. The suite runs in GitHub Actions and passes.
