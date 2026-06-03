export type Lang = 'de' | 'en';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en') return 'en';
  return 'de';
}

/** Build the alternate-locale URL for a given path */
export function getAlternateUrl(url: URL, targetLang: Lang): string {
  const path = url.pathname;
  if (targetLang === 'en') {
    return '/en' + (path === '/' ? '' : path);
  }

  return path.replace(/^\/en/, '') || '/';
}
