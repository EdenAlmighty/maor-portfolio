// The CV, as data: the /cv page renders it, and the PDF (scripts/cv-pdf.mjs) is printed
// from that page, so the two never disagree. Source: sources/Maor_QA_Engineer_CV.pdf,
// with the corrections listed in CONTENT-MAP.md section 6 (one name per app, "Urban
// Routes" instead of "Uber Routes", the data file described as it is).

export const summary =
  'QA engineer who tests web and mobile apps by hand, in code and under load, and documents every step. I write test plans and test cases, automate the repeatable checks in Playwright and WebdriverIO, test APIs in Postman and Bruno, and report bugs with clear steps, expected and actual results, and evidence. My years as an elderly caretaker taught me clear communication and a user-centred approach.';

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Testing',
    items: [
      'Manual and exploratory testing',
      'Functional, UI and regression testing',
      'API testing',
      'Mobile testing',
      'Load and performance testing',
      'Accessibility checks',
      'Data-driven testing',
      'Test plans, test cases and reports',
      'Agile',
    ],
  },
  {
    group: 'Automation',
    items: ['Playwright', 'WebdriverIO', 'Mocha', 'Jest', 'Katalon Studio', 'Page object model'],
  },
  {
    group: 'Tools',
    items: [
      'Jira',
      'Postman',
      'Bruno',
      'Apache JMeter',
      'BlazeMeter',
      'Android Studio',
      'Chrome DevTools',
      'VS Code',
    ],
  },
  {
    group: 'Code and data',
    items: ['JavaScript', 'Node.js', 'HTML', 'CSS', 'JSON', 'XML', 'SQL and PostgreSQL'],
  },
  { group: 'Version control and CI', items: ['Git', 'Git Bash', 'GitHub', 'GitHub Actions'] },
];

export const history: { role: string; org: string; place: string; dates: string }[] = [
  {
    role: 'Elderly care provider',
    org: 'Nathan',
    place: 'Tel Aviv, Israel',
    dates: 'Jan 2020 to Dec 2024',
  },
  {
    role: 'Base security',
    org: 'IDF',
    place: 'Galil base, Ramat HaSharon, Israel',
    dates: 'Oct 2012 to Apr 2013',
  },
  {
    role: 'Office mail service',
    org: 'American Union',
    place: 'New York City, USA',
    dates: 'Oct 2008 to May 2009',
  },
];

export const education = {
  title: 'QA Engineering Certificate',
  org: 'TripleTen Israel',
  place: 'Tel Aviv, Israel',
  dates: 'Mar 2024 to Aug 2024',
};
