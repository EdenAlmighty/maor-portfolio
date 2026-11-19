// Labels for the project fields. Kept apart from content.config.ts so pages can import
// them without pulling the content loader into the server bundle.
export const testingTypes = [
  'manual',
  'automation',
  'api',
  'mobile',
  'performance',
  'accessibility',
  'database',
  'visual',
] as const;

export const typeLabels: Record<(typeof testingTypes)[number], string> = {
  manual: 'Manual',
  automation: 'Automation',
  api: 'API',
  mobile: 'Mobile',
  performance: 'Performance',
  accessibility: 'Accessibility',
  database: 'Database',
  visual: 'UI and visual',
};

export const kindLabels = {
  freelance: 'Freelance',
  bootcamp: 'TripleTen bootcamp',
  practice: 'Practice project',
  course: 'Course work',
} as const;
