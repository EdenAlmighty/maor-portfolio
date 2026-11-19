---
title: Urban Grocers API
description: 'API testing of a grocery back end: Swagger and apiDoc analysis, a Postman checklist, then automated GET, POST, PUT and DELETE tests in Jest.'
summary: From reading the API docs to automated tests for every HTTP method.
order: 4
featured: true
kind: bootcamp
types: [api, automation]
start: 2024-05
end: 2024-07
role: QA tester (TripleTen project)
tools: [Postman, Jest, Node.js, JavaScript, Swagger, apiDoc, Jira]
result: A Postman checklist from the docs, then Jest tests for GET, POST, PUT and DELETE
notes:
  - Read the apiDoc and Swagger documentation (every endpoint, its parameters, data types, return values and methods) and noted where the docs were inconsistent.
  - 'Wrote a checklist from the requirements and the docs: each endpoint does what it says, valid and invalid data, status codes, error handling, response time.'
  - Designed the test data with boundary values and equivalence classes.
  - Set up a Postman environment, imported the Swagger file, and added assertions on status codes, response structure and response time.
  - Sent JSON and XML requests, and composed SOAP requests from the documentation.
  - 'Automated the checks in Jest with Node.js: one test file per HTTP method.'
  - Reported defects in Jira with steps, expected and actual results, and evidence.
evidence:
  - label: Jest API tests (GitHub)
    href: https://github.com/Maor87/hm07-qa-us
  - label: Checklist and test results (Google Sheets)
    href: https://docs.google.com/spreadsheets/d/1Qf1JpU6v928PK4eCWwtUdTlePHUCmQF8ZEalTwOSTlk/edit
  - label: Postman tests (Google Sheets)
    href: https://docs.google.com/spreadsheets/d/1Y2n2JP3lIC-Dob_auv_3vvkye455ck092YMDCxSQrsg/edit
  - label: Bug reports (Google Drive)
    href: https://drive.google.com/drive/folders/1BifwH64w8-HL_3HFypFJL_DwvdgK8r2H
---

Urban Grocers is a warehouse back end with no screens to click: everything is a request and a
response. I started where a developer would, with the API documentation, and turned it into a
checklist before sending a single request.

The checklist became a Postman collection with assertions, and then plain code: Jest tests
that create, read, change and delete warehouse items and check every answer the server gives.
