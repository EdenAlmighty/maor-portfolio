// Turns the web fonts on right after the page first paints (.mp-fonts on <html>, see
// global.css), so the first screen never waits for a font file: it paints at once in the
// metric-matched fallbacks, and the fonts swap in without moving anything. Later pages of
// the visit have the files cached, so the head script (src/lib/theme.ts) turns them on
// before the first paint there.

// The same key as FONTS_KEY in src/lib/theme.ts. Not imported, to keep one small bundle.
const FONTS_KEY = 'mp-fonts';
const root = document.documentElement;
const enable = () => {
  root.classList.add('mp-fonts');
  try {
    sessionStorage.setItem(FONTS_KEY, '1');
  } catch {
    // Storage blocked: every page then paints first and swaps, which is fine.
  }
};
if (!root.classList.contains('mp-fonts')) {
  if (PerformanceObserver.supportedEntryTypes?.includes('paint')) {
    const observer = new PerformanceObserver((list) => {
      if (list.getEntriesByName('first-contentful-paint').length) {
        observer.disconnect();
        setTimeout(enable);
      }
    });
    observer.observe({ type: 'paint', buffered: true });
  } else {
    setTimeout(enable, 100);
  }
}
