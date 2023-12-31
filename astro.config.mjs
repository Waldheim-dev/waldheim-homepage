import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";
import compress from "astro-compress";


// https://astro.build/config
export default defineConfig({
  site: 'https://www.waldheim.dev',
  integrations: [mdx(), sitemap(), tailwind(), prefetch(), compress()],
  styles: {
    '*.scss': {
      preprocessor: 'sass',
      postprocessor: true
    }
  }
});