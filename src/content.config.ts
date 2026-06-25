import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog — markdown/MDX in src/content/blog/. Frontmatter mirrors the 2024 posts
// (title, date, description, tags) so existing content drops in unchanged.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Reviews — game/media reviews (Nurture, Yakuza, …). Adds a rating + cover.
const reviews = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    rating: z.number().min(0).max(10).optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, reviews };
