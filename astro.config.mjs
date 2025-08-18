// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

import compressor from 'astro-compressor';

import compress from 'astro-compress';

import sentry from '@sentry/astro';

import llmsTxt from '@waldheimdev/astro-ai-llms-txt';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  site: 'https://www.waldheim.dev',

  integrations: [
    mdx(),
    sitemap(),
    llmsTxt({
      site: 'https://www.waldheim.dev',
      projectName: 'waldheim.dev',
      description: 'Moderne Webpräsenz für digitale Beratung, Entwicklung und Innovation. Fokus: Webentwicklung, Cloud, DevOps, KI, Automatisierung.',
      sectionTitle: 'Seitenübersicht',
      aiProvider: 'openai',
      aiModel: 'gpt-4.1',
      aiApiKey: "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"
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
  trailingSlash: 'ignore'
});