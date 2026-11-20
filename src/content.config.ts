import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { testingTypes } from './lib/labels';

// Every fact in these files comes from CONTENT-MAP.md (CV, GitHub, Notion, Drive).
const yearMonth = z.string().regex(/^\d{4}-\d{2}$/);

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    // Search result snippet; Bing flags anything outside 25-160 characters.
    description: z.string().min(25).max(160),
    summary: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
    kind: z.enum(['freelance', 'bootcamp', 'practice', 'course']),
    types: z.array(z.enum(testingTypes)).min(1),
    start: yearMonth,
    end: yearMonth,
    role: z.string(),
    tools: z.array(z.string()).min(1),
    // One concrete, sourced result for the project list.
    result: z.string(),
    notes: z.array(z.string()).default([]),
    findings: z
      .array(
        z.object({ id: z.string(), title: z.string(), href: z.url(), test: z.string().optional() }),
      )
      .default([]),
    evidence: z
      .array(
        z.object({
          label: z.string(),
          href: z.url().optional(),
          // A link that needs a login or is not shared yet: shown as a TODO, never as a link.
          missing: z.string().optional(),
        }),
      )
      .min(1),
  }),
});

export const collections = { projects };
