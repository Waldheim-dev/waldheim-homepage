// 1. Import utilities from `astro:content`
import { defineCollection, reference, z } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Define your collection(s)
const blog = defineCollection({
  loader: glob({pattern: '**\/*.md', base: "./src/pages/blog/content"}),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string().optional(),
    heroImage: z.string(),
    author: reference('authors'),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  })
});

const authors = defineCollection({
  loader: glob({pattern: '**\/*.json', base: "./src/pages/blog/authors"}),
  schema: z.object({
    name: z.string(),
    image: z.string()
  })
})

// 4. Export a single `collections` object to register your collection(s)
export const collections = { blog };