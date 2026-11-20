// The latest results of this site's own quality gates, written by scripts/test-report.mjs
// after the tests and Lighthouse run (in CI before the production build, or locally).
import raw from '../data/test-report.json';

export interface TestReport {
  generatedAt: string | null;
  commit: string | null;
  playwright: {
    total: number;
    passed: number;
    failed: number;
    pages: number;
    suites: Record<string, number>;
  } | null;
  lighthouse:
    | {
        path: string;
        performance: number;
        accessibility: number;
        bestPractices: number;
        seo: number;
      }[]
    | null;
}

export const report = raw as TestReport;

/** The run's date as it was in Israel (the report stores UTC). */
export const israelDate = (iso: string) =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jerusalem' }).format(new Date(iso));

export const suiteLabels: Record<string, string> = {
  smoke: 'Every page loads: status 200, one H1, a title, a canonical, no console errors',
  seo: 'Structured data, meta description length, Open Graph image, robots, sitemap, llms.txt',
  a11y: 'axe accessibility rules (WCAG 2.2 AA and best practice), zero violations allowed',
  'no-js': 'Every page shows its content with JavaScript turned off',
  layout: 'No sideways scrolling at 320 px',

  budget: 'Font files and font bytes each page really downloads',
  mobile: 'On a phone: no table scrolls sideways, every standalone link is 44 px tall',
  go: 'Click counting redirects: CV, email, LinkedIn, GitHub',
  cv: 'The CV PDF is served, and the phone number appears on no web page',
};
