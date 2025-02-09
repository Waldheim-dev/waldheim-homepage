import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import tailwindcss from '@tailwindcss/vite';
import compressor from 'astro-compressor';
import sentry from "@sentry/astro";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.waldheim.dev',
  vite: {
    plugins: [tailwindcss()],
  },
  prefetch: true,
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
  styles: {
    '*.scss': {
      preprocessor: 'sass',
      postprocessor: true,
    },
  },
  legacy: {
    collections: true,
  },
  build: {
    inlineStylesheets: 'never',
  },
  trailingSlash: 'always'
});
