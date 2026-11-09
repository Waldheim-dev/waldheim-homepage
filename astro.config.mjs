// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

import compressor from 'astro-compressor';

import compress from 'astro-compress';

import 'dotenv/config';

function collectUsedFontAwesomeClasses(dir, out = new Set()) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectUsedFontAwesomeClasses(full, out);
    } else if (/\.(astro|ts|js|md|mdx|json)$/.test(entry.name)) {
      const content = fs.readFileSync(full, 'utf8');
      for (const m of content.matchAll(/\bfa-[a-z0-9-]+\b/g)) {
        out.add(m[0]);
      }
    }
  }
  return out;
}

const usedFaClasses = collectUsedFontAwesomeClasses('./src');

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'ensure-css-utf8-and-font-display',
        generateBundle(_, bundle) {
          for (const [fileName, chunk] of Object.entries(bundle)) {
            if (fileName.endsWith('.css') && chunk.type === 'asset' && typeof chunk.source === 'string') {
              let css = chunk.source.replace(/font-display:\s*block/g, 'font-display:swap');
              // Strip unused single-class and comma-grouped Font Awesome glyph definitions
              css = css.replace(/((?:\.fa-[a-z0-9-]+,?)+)(\{--fa:"[^"]*"\})/g, (_, selGroup, body) => {
                const kept = selGroup
                  .split(',')
                  .filter((s) => usedFaClasses.has(s.slice(1)));
                return kept.length ? kept.join(',') + body : '';
              });
              if (!css.startsWith('@charset')) {
                css = `@charset "UTF-8";${css}`;
              }
              chunk.source = css;
            }
          }
        },
      },
    ],
  },
  site: 'https://www.waldheim.dev',
  redirects: {
    '/silvacore/': '/suite/forge/',
    '/suite/silvacore/': '/suite/forge/',
    '/suite/portal/': '/suite/',
    '/ecodrive/': '/suite/ecodrive/',
    '/socialverse/': '/suite/socialverse/',
    '/aether/': '/suite/aether/',
  },
  i18n: {
    defaultLocale: 'de',
    locales: ['de'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        // 1. Test-, Tool- & englische Pfade ausschließen
        if (
          page.includes('/test-') ||
          page.includes('/en/') ||
          page.includes('/astro-ai-llms-txt')
        ) {
          return false;
        }
        // 2. noindex-Pflichtseiten NIEMALS in die Sitemap aufnehmen (verhindert GSC "Durch noindex-Tag ausgeschlossen")
        if (
          page.endsWith('/danke/') ||
          page.endsWith('/datenschutz/') ||
          page.endsWith('/impressum/') ||
          page.endsWith('/agb/') ||
          page.endsWith('/widerrufsbelehrung/')
        ) {
          return false;
        }
        // 3. Weiterleitungs-URLs nicht in die Sitemap aufnehmen (verhindert GSC "Seite mit Weiterleitung")
        if (
          page.endsWith('/silvacore/') ||
          page.endsWith('/suite/silvacore/') ||
          page.endsWith('/suite/portal/') ||
          page.endsWith('/ecodrive/') ||
          page.endsWith('/socialverse/') ||
          page.endsWith('/aether/')
        ) {
          return false;
        }
        // 4. Paginierte Archiv-Seiten (/blog/1/..35/, /referenzen/1/..5/) ausschließen (verhindert GSC Duplikate & Crawl-Budget-Verlust)
        if (
          /\/blog\/\d+\/$/.test(page) ||
          /\/referenzen\/\d+\/$/.test(page)
        ) {
          return false;
        }
        return true;
      },
      changefreq: 'weekly',
      lastmod: new Date(),
      serialize: (item) => {
        // Prioritäten nach URL-Muster setzen
        if (item.url === 'https://www.waldheim.dev/') {
          item.priority = 1; // Homepage
        } else if (item.url.includes('/services/') ||
          item.url.includes('/suite/') ||
          item.url.includes('/semrel/')) {
          item.priority = 0.9; // 3 strategische Hauptanker: Services, Suite, semrel
        } else if (item.url.includes('/blog/')) {
          item.priority = 0.7; // Blog-Artikel
        } else if (item.url.includes('/referenzen/')) {
          item.priority = 0.8; // Referenzen
        } else {
          item.priority = 0.6; // Sonstige
        }
        return item;
      }
    }),
    compress({
      Image: false,
      // csso 5.0.5 strips TailwindCSS v4 range media queries (@media (width >= 1024px))
      // Vite + TailwindCSS v4 already minify CSS via Lightning CSS — double-minification breaks breakpoints
      CSS: false,
    }),
    compressor({ gzip: true }),
  ],
  build: {
    inlineStylesheets: 'always',
  },
  prefetch: false,
  compressHTML: true,
  scopedStyleStrategy: 'class',
  trailingSlash: 'always', // Konsistente URLs: immer mit /
  image: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        defaults: {
          jpeg: { quality: 80 },
          webp: { quality: 85 },
          avif: { quality: 80 },
          png: { compressionLevel: 9 },
        },
      },
    },
  },
});