---
title: Taxi database and logs
description: 'Database and log testing for a Chicago taxi data set: SQL queries on a remote server and command-line analysis of 400 and 500 error logs.'
summary: SQL queries and command-line log analysis on a remote server.
order: 7
kind: bootcamp
types: [database]
start: 2024-06
end: 2024-06
role: QA tester (TripleTen project)
tools: [SQL, PostgreSQL, Linux command line]
result: SQL checks on the cabs table and error logs split by status code
notes:
  - Searched server logs for requests from one IP range and pulled out the matching entries.
  - Collected the 400 and 500 errors for given dates and split them into files by code.
  - Connected to the database on a remote server and counted the cabs in service, and the cars per company.
evidence:
  - label: Project write-up (Google Docs)
    href: https://docs.google.com/document/d/11JL4pM-ykFJ2aBrG655uFm4zIlAGToOCGmXq-tl6HCs/edit
---
