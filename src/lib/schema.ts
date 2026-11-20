// JSON-LD for every page: one @graph per page, built from site.ts. Maor is a Person,
// not a business, so the home, About and CV pages are ProfilePages about him.
import { site } from './site';

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;

export function personNode() {
  return {
    '@type': 'Person',
    '@id': personId,
    name: site.name,
    jobTitle: site.title,
    email: `mailto:${site.email}`,
    url: site.url,
    image: `${site.url}/icon-512.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.locality,
      addressCountry: site.countryCode,
    },
    sameAs: [site.github, site.linkedin],
    knowsAbout: site.knowsAbout,
    alumniOf: { '@type': 'EducationalOrganization', name: 'TripleTen' },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'QA Engineering Certificate',
      credentialCategory: 'certificate',
      recognizedBy: { '@type': 'EducationalOrganization', name: 'TripleTen' },
    },
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': websiteId,
    url: site.url,
    name: `${site.name}, ${site.title}`,
    inLanguage: 'en',
    author: { '@id': personId },
    creator: { '@type': 'Person', name: site.builtBy.name, url: site.builtBy.url },
  };
}

export function pageNode(type: string, url: string, name: string, description: string) {
  return {
    '@type': type,
    '@id': `${url}#page`,
    url,
    name,
    description,
    inLanguage: 'en',
    isPartOf: { '@id': websiteId },
    ...(type === 'ProfilePage' ? { mainEntity: { '@id': personId } } : {}),
    dateModified: site.updated,
  };
}

export function breadcrumbNode(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path === '/' ? '' : item.path}`,
    })),
  };
}

export function projectNode(p: {
  title: string;
  description: string;
  url: string;
  start: string;
  end: string;
  tools: readonly string[];
}) {
  return {
    '@type': 'CreativeWork',
    '@id': `${p.url}#work`,
    name: p.title,
    headline: p.title,
    description: p.description,
    url: p.url,
    author: { '@id': personId },
    dateCreated: p.start,
    temporalCoverage: `${p.start}/${p.end}`,
    keywords: p.tools.join(', '),
    inLanguage: 'en',
  };
}

export const graph = (nodes: Record<string, unknown>[]) =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
