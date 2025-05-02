// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

import compressor from 'astro-compressor';

import compress from 'astro-compress';

import sentry from '@sentry/astro';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  site: 'https://www.waldheim.dev',

  integrations: [
    mdx(),
    sitemap(),
    compress(),
    compressor({ gzip: true }),

    sentry({
      dsn: 'https://a58f0f0cc113eb469f1110959a44d8d7@o4508774614630400.ingest.de.sentry.io/4508774618759248',
      sourceMapsUploadOptions: {
        project: 'waldheim-dev',
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
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
  trailingSlash: 'ignore'
});