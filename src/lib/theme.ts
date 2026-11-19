// Light and dark. The site follows the visitor's system setting until they press the
// switch in the header (Header.astro); a choice that differs from the system is saved
// under THEME_KEY and set as data-theme on <html>.
export const THEME_KEY = 'mp-theme';

// Runs inline in <head> (Base.astro) so a saved choice applies before the first paint
// and the page never flashes the other theme. It also turns the web fonts on before the
// first paint once an earlier page of the visit has loaded them (FONTS_KEY, set by
// src/scripts/fonts.ts). astro.config.ts hashes this exact string for the CSP, so keep it
// a plain string with no line breaks.
export const FONTS_KEY = 'mp-fonts';
export const themeScript =
  "try{var d=document.documentElement,t=localStorage.getItem('mp-theme');if(t==='light'||t==='dark')d.dataset.theme=t;if(sessionStorage.getItem('mp-fonts'))d.classList.add('mp-fonts')}catch(e){}";
