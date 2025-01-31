import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import prefetch from "@astrojs/prefetch";
import compress from "astro-compress";
import tailwindcss from "@tailwindcss/vite";


import compressor from 'astro-compressor';


// https://astro.build/config
export default defineConfig({
  site: 'https://www.waldheim.dev',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [mdx(), sitemap(), prefetch(), compress(), compressor({gzip: true})],
  styles: {
    '*.scss': {
      preprocessor: 'sass',
      postprocessor: true
    }
  },
  
  legacy: {
    collections: true
  }
});