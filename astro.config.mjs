// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

import compressor from 'astro-compressor';

import compress from 'astro-compress';

import partytown from '@astrojs/partytown';

import robotsTxt from 'astro-robots-txt';

import 'dotenv/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  site: 'https://www.waldheim.dev',
  redirects: {
    '/silvacore/': '/suite/forge/',
    '/suite/silvacore/': '/suite/forge/',
    '/ecodrive/': '/suite/ecodrive/',
    '/socialverse/': '/suite/socialverse/',
    '/aether/': '/suite/aether/',
  },
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
    fallback: {
      en: 'de',
    },
  },

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        // Test-Seiten nicht in Sitemap aufnehmen
        return !page.includes('/test-') &&
          !page.includes('/astro-ai-llms-txt');
      },
      changefreq: 'weekly',
      lastmod: new Date(),
      serialize: (item) => {
        // Prioritäten nach URL-Muster setzen
        if (item.url === 'https://www.waldheim.dev/') {
          item.priority = 1; // Homepage
        } else if (item.url.includes('/services/') ||
          item.url.includes('/suite/')) {
          item.priority = 0.9; // Hauptprodukte/Services
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
    }),
    compressor({ gzip: true }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    robotsTxt({
      host: 'www.waldheim.dev',
      sitemap: 'https://www.waldheim.dev/sitemap-index.xml',
      policy: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/danke/', '/test-*', '/*?*utm_source=', '/*?*ref='],
        },
      ],
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true
  },
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
  markdown: {
    smartypants: true,
  },
});