import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog — the single content collection. Reviews were consolidated in here
// (June 2026): a review is just a post with an optional `rating` and a
// `review` tag. Frontmatter mirrors the 2024 posts (title, date, description,
// tags) so existing content drops in unchanged.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    // Optional 0–10 score for review posts (e.g. Nurture, Yakuza).
    rating: z.number().min(0).max(10).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
