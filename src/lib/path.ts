/**
 * The clean path of the current page: "/" for the home page, "/about" for about.html.
 * At build time Astro reports "/index.html" and "/about.html" (build.format: 'file').
 */
export function pagePath(url: URL) {
  const path = url.pathname
    .replace(/\.html$/, '')
    .replace(/\/index$/, '/')
    .replace(/(.)\/$/, '$1');
  return path || '/';
}
