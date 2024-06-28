import { defineCollection, reference, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
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
  type: 'data',
  schema: z.object({
    name: z.string(),
  }),
});

const authorCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    image: z.string()
  })
});

const projectCollection = defineCollection({
  type: 'content',
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

const skillsCollection = defineCollection({
  type: 'data',
  schema: skill
});

export const collections = {
  blog: blogCollection,
  author: authorCollection,
  project: projectCollection,
  project_kategorie: project_kategorie,
  skills: skillsCollection
};
