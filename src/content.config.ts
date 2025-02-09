import { defineCollection, reference, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({pattern: '**\/*.md', base: "./src/content/blog"}),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()).optional(),
    heroImage: z.string(),
    author: reference('authors'),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  })
});


const project_kategorie = defineCollection({
  loader: glob({pattern: '**\/*.json', base: "./src/content/project_kategorie"}),
  schema: z.object({
    name: z.string(),
  }),
});

const author = defineCollection({
  loader: glob({pattern: '**\/*.json', base: "./src/content/authors"}),
  schema: z.object({
    name: z.string(),
    image: z.string()
  })
});

const project = defineCollection({
  loader: glob({pattern: '**\/*.md', base: "./src/content/referenzen"}),
  schema: z.object({
    title: z.string(),
    isTopProject: z.boolean(),
    description: z.string(),
    
    client: z.object({
      name: z.string(),
      web: z.object({url: z.string(), name: z.string()}).optional(),
      description: z.string(),
      shortDescription: z.string().optional(),
    }).optional(),

    heroImage: z.string(),
    keywords: z.array(z.string()).optional(),

    tags: z.array(z.string()).optional(),
    techStack: z.array(reference('skills')).optional(),
    category: reference('project_kategorie'),
    
    general: z.array(z.string()).optional(),
    frontend: z.array(z.string()).optional(),
    backend: z.array(z.string()).optional(),
    design: z.array(z.string()).optional(),
    

    problem: z.string().optional(),

    solution: z.string().optional(),

    assets: z.array(z.string()).optional(),

    shortDescription: z.string().optional(),

    overview: z.array(z.object({
      title: z.string(),
      meta: z.string(),
      link: z.string().optional()
    })).optional(),

    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  })
});

const skill = z.object({
  name: z.string(),
  image: z.string(),
  productive: z.boolean(),
  isActive: z.boolean(),
  fixedExperience: z.number(),
  isTopSkill: z.boolean(),
  isTechStack: z.boolean(),
  sinceLastRollup: z
    .string()
    .optional()
    .transform((str) => (str ? new Date(str) : undefined)),
  knowledgebase: z.enum(['basic', 'advanced', 'expert']),
  layer: z.array(z.enum(['frontend', 'backend', 'design', 'infrastructure', 'quality', 'general', 'system', 'security', 'database']))
});

const skills = defineCollection({
  loader: glob({pattern: '**\/*.json', base: "./src/content/skills"}),
  schema: skill
});

const karriere_projects = defineCollection({
  loader: glob({pattern: '**\/*.json', base: "./src/content/karriere_projects"}),
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
  loader: glob({pattern: '**\/*.json', base: "./src/content/karriere"}),
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
  }),
});

const ecodrive_versions = defineCollection({
  loader: glob({pattern: '**\/*.json', base: "./src/content/ecodrive_versions"}),
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
})

export const collections = {
  blog,
  author,
  project,
  project_kategorie,
  skills,
  karriere,
  karriere_projects,
  ecodrive_versions
};
