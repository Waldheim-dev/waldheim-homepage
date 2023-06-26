import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.waldheim.dev',
  integrations: [mdx(), sitemap(), tailwind(), prefetch()],
  styles: {
    '*.scss': {
      preprocessor: 'sass',
      postprocessor: true
    }
  }
});