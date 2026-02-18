// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

import compressor from 'astro-compressor';

import compress from 'astro-compress';

import sentry from '@sentry/astro';

import llmsTxt from '@waldheimdev/astro-ai-llms-txt';

import 'dotenv/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  site: 'https://www.waldheim.dev',

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
          item.priority = 1.0; // Homepage
        } else if (item.url.includes('/services/') ||
          item.url.includes('/silvacore/') ||
          item.url.includes('/ecodrive/') ||
          item.url.includes('/socialverse/')) {
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
    llmsTxt({
      site: 'https://www.waldheim.dev',
      projectName: 'waldheim.dev',
      description: 'Moderne Webpräsenz für digitale Beratung, Entwicklung und Innovation. Fokus: Webentwicklung, Cloud, DevOps, KI, Automatisierung.',
      sectionTitle: 'Seitenübersicht',
      aiProvider: 'gemini',
      aiModel: 'gemini-2-5-flash',
      aiApiKey: process.env.GEMINI_API_KEY,
      llmsFull: true,
      debug: true
    }),
    sentry({
      dsn: 'https://a58f0f0cc113eb469f1110959a44d8d7@o4508774614630400.ingest.de.sentry.io/4508774618759248',
      sourceMapsUploadOptions: {
        project: 'waldheim-dev',
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
    compress(),
    compressor({ gzip: true }),
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
});