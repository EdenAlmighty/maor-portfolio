// The drawing register: every main page is one sheet, numbered in this order. The title
// block of each page shows "Sheet n of N" and its drawing number from here.
export const sheets = [
  '/',
  '/projects',
  '/projects/moving-quote-app',
  '/projects/weather-app',
  '/projects/urban-routes',
  '/projects/urban-grocers-api',
  '/about',
  '/cv',
  '/how-this-site-is-tested',
] as const;

export function sheetOf(path: string) {
  const i = sheets.indexOf(path as (typeof sheets)[number]);
  if (i === -1) return null;
  return { n: i + 1, total: sheets.length, dwg: `MS-QA-${String(i + 1).padStart(3, '0')}` };
}
