// The parts list: each skill with the projects that show it (CONTENT-MAP.md section 3).
// Project ids are the file names in src/content/projects; a wrong id fails the build
// (see src/pages/index.astro).
export const partsList: { skill: string; detail: string; projects: string[] }[] = [
  {
    skill: 'Playwright',
    detail: 'JavaScript, page objects, Inspector, Codegen',
    projects: ['moving-quote-app', 'weather-app', 'learn-playwright'],
  },
  {
    skill: 'Data-driven testing',
    detail: 'one test, many rows of data',
    projects: ['moving-quote-app', 'katalon-studio'],
  },
  {
    skill: 'Visual comparison',
    detail: 'baseline screenshots on every run',
    projects: ['weather-app'],
  },
  {
    skill: 'WebdriverIO and Mocha',
    detail: 'an end-to-end flow',
    projects: ['urban-routes'],
  },
  {
    skill: 'API testing',
    detail: 'Postman, Bruno, Jest, SOAP and XML',
    projects: ['urban-grocers-api', 'star-wars-api', 'urban-scooter', 'moving-quote-app'],
  },
  {
    skill: 'Load testing',
    detail: 'Apache JMeter, BlazeMeter',
    projects: ['moving-quote-app', 'pet-store-load-test'],
  },
  {
    skill: 'Accessibility checks',
    detail: 'keyboard order, text alternatives',
    projects: ['moving-quote-app'],
  },
  {
    skill: 'Mobile testing',
    detail: 'Android Studio emulator, slow networks, device logs',
    projects: ['urban-lunch', 'urban-scooter'],
  },
  {
    skill: 'SQL and logs',
    detail: 'PostgreSQL, Linux command line',
    projects: ['taxi-database', 'urban-scooter'],
  },
  {
    skill: 'Test design',
    detail: 'boundary values, equivalence classes, positive and negative cases',
    projects: ['urban-grocers-api', 'urban-scooter', 'urban-routes'],
  },
  {
    skill: 'Test documentation',
    detail: 'test plans, test cases, summary reports',
    projects: ['moving-quote-app', 'weather-app', 'star-wars-api'],
  },
  {
    skill: 'Bug reports',
    detail: 'Jira and GitHub Issues, with steps and evidence',
    projects: ['weather-app', 'moving-quote-app', 'urban-routes'],
  },
  {
    skill: 'Designs as the spec',
    detail: 'screens compared with the design mock-ups',
    projects: ['urban-routes', 'urban-lunch'],
  },
  {
    skill: 'CI',
    detail: 'GitHub Actions',
    projects: ['urban-routes', 'urban-grocers-api', 'moving-quote-app'],
  },
  {
    skill: 'Low-code automation',
    detail: 'Katalon Studio, Groovy',
    projects: ['katalon-studio'],
  },
];
