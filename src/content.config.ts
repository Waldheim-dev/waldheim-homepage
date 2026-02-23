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
});


const skills = defineCollection({
  loader: glob({pattern: '**\/*.json', base: "./src/pages/ueber-mich/skills"}),
  schema: z.object({
  name: z.string(),
  image: z.string(),
  productive: z.boolean(),
  isActive: z.boolean(),
  fixedExperience: z.number(),
  isTopSkill: z.boolean(),
  isTechStack: z.boolean(),
  invertImage: z.boolean().optional(),
  sinceLastRollup: z
    .string()
    .optional()
    .transform((str) => (str ? new Date(str) : undefined)),
  knowledgebase: z.enum(['basic', 'advanced', 'expert']),
  layer: z.array(z.enum(['frontend', 'backend', 'design', 'infrastructure', 'quality', 'general', 'system', 'security', 'database', 'ai']))
})
});

const karriere_projects = defineCollection({
  loader: glob({pattern: '**\/*.json', base: "./src/pages/ueber-mich/karriere_projects"}),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    position: z.string(),
    from: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    to: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)).optional(),
    techstack: z.array(reference('skills')).optional(),
  }),
});

const karriere = defineCollection({
  loader: glob({pattern: '**\/*.json', base: "./src/pages/ueber-mich/karriere"}),
  schema: z.object({
    from: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    to: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)).optional(),
    company: z.string(),
    position: z.string(),
    description: z.string(),
    isCurrent: z.boolean(),
    location: z.string(),
    projects: z.array(reference('karriere_projects')).optional(),
    projectReferences: z.array(reference('projects')).optional(),
    showAllReferences: z.boolean().optional(),
  }),
});


const roadmap = defineCollection({
  loader: glob({pattern: '**\/*.json', base: "./src/pages/ecodrive/roadmap"}),
  schema: z.object({
    version: z.string(),
    description: z.string(),
    date: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    planned: z.boolean(),
    features: z.array(z.string()).optional(),
  }),
});

const features = defineCollection({
  loader: glob({pattern: '**\/*.json', base: "./src/pages/ecodrive/features"}),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    image: z.string().or(z.null()).optional(),
    tier: z.enum(['free', 'basic', 'pro', 'premium']),
    planned: z.boolean(),
    since: reference('roadmap'),
  }),
});

const projects_kategorie = defineCollection({
  loader: glob({pattern: '**\/*.json', base: "./src/pages/referenzen/project_kategorie"}),
  schema: z.object({
    name: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({pattern: '**\/*.md', base: "./src/pages/referenzen/projects"}),
  schema: z.object({
    title: z.string(),
    isTopProject: z.boolean(),
    description: z.string(),

    client: z.object({
      name: z.string(),
      web: z.object({url: z.string(), name: z.string()}).optional(),
      description: z.string().optional(),
      shortDescription: z.string().optional(),
    }).optional(),

    heroImage: z.string(),
    keywords: z.array(z.string()).optional(),

    tags: z.array(z.string()).optional(),
    techStack: z.array(reference('skills')).optional(),
    category: reference('projects_kategorie'),

    general: z.array(z.string()).optional(),
    frontend: z.array(z.string()).optional(),
    backend: z.array(z.string()).optional(),
    design: z.array(z.string()).optional(),
    devops: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    products: z.array(z.string()).optional(),
    security: z.array(z.string()).optional(),
    testing: z.array(z.string()).optional(),

    results: z.array(z.object({
      value: z.string(),
      label: z.string()
    })).optional(),

    problem: z.string().optional(),

    solution: z.string().optional(),

    assets: z.array(z.string()).optional(),

    shortDescription: z.string().optional(),

    overview: z.array(z.object({
      title: z.string(),
      meta: z.string(),
      link: z.string().optional()
    })).optional(),

    // Jahres-basierte Event-Serien
    year: z.number().optional(), // Jahr des Events (z.B. 2023, 2024)
    eventSeries: z.string().optional(), // Name der Event-Serie (z.B. "fasching", "serenade")
    previousYear: z.string().optional(), // Pfad zum Vorjahresprojekt (z.B. "mv-obermeitingen/2023/fasching")
    nextYear: z.string().optional(), // Pfad zum Folgejahresprojekt (z.B. "mv-obermeitingen/2024/fasching")

    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  })
});

const testimonials = defineCollection({
  loader: glob({pattern: '**\/*.json', base: "./src/pages/testimonials"}),
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string(),
    company: z.string().optional(),
    image: z.string().optional(),
    stars: z.number().min(1).max(5).default(5)
  })
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { blog, authors, skills, karriere_projects, karriere, roadmap, projects_kategorie, projects, features, testimonials };