import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/** Every project, in the order set in its file (newest strong work first). */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects');
  return all.sort((a, b) => a.data.order - b.data.order);
}

export const projectPath = (p: Project) =>
  p.data.featured ? `/projects/${p.id}` : `/projects#${p.id}`;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const formatMonth = (ym: string) => {
  const [y, m] = ym.split('-');
  return `${months[Number(m) - 1]} ${y}`;
};

/** "May 2026" or "May to Jun 2026" or "May 2024 to Aug 2024". */
export function formatRange(start: string, end: string) {
  if (start === end) return formatMonth(start);
  const [sy] = start.split('-');
  const [ey] = end.split('-');
  return sy === ey
    ? `${formatMonth(start).split(' ')[0]} to ${formatMonth(end)}`
    : `${formatMonth(start)} to ${formatMonth(end)}`;
}

/** Months between two "YYYY-MM" values, both months counted. */
export function monthSpan(start: string, end: string) {
  const [sy, sm] = start.split('-').map(Number);
  const [ey, em] = end.split('-').map(Number);
  return (ey - sy) * 12 + (em - sm) + 1;
}
