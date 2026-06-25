# portfolio-2026 — Project Brief

> The durable context bridge for the rebuild of **samanshaiza.com**.
> This file exists because a fresh session (or a future you) won't remember the
> conversation that produced these decisions. Read this first.

## What this is

A from-scratch rebuild of Saman Shaiza's personal portfolio + blog, replacing
`../portfolio-2024` (React 18 + Vite SPA). Same soul — a **neocities / retro-web
revival** layered over a modern stack — but re-architected for content scale and
performance.

## Stack

- **Astro 7** (static-first), TypeScript strict
- **Content Collections** + **MDX** for blog & reviews
- **Tailwind v4** (via `@tailwindcss/vite`)
- **@astrojs/sitemap** for SEO
- Deploy: **Netlify** (same as before)
- No React unless a genuinely interactive island needs it (the 2024 review
  flagged dependency bloat — keep it lean).

## Architecture decisions (the part that was only in the chat)

The driving question was: "should I add a backend server to fetch blogs/images/
audio for performance?" **Answer: no — a backend would make a content site
slower, not faster.** Astro renders content to static HTML at build time; a
runtime fetch adds a round-trip for content that never changes per-request.

| Content type | Where it lives | How |
|---|---|---|
| Blog posts (`.md`/`.mdx`) | in-repo `src/content/blog/` | Content Collections → static HTML |
| Reviews | in-repo `src/content/reviews/` | Content Collections |
| Inline / content images | in-repo `src/assets/` | Astro `<Image>` (sharp) — responsive, lazy, WebP/AVIF |
| **Audio / music, large galleries** | **object storage** (Cloudflare R2 ▸ free egress; or B2/S3) + CDN | reference by URL; CDNs handle range requests for seeking — **never commit large media to the repo** |
| Comments / publish-without-push / search-at-scale | *not yet* — serverless fn or headless CMS *if/when* needed | à la carte, no rewrite required |

**The one infra decision to make soon:** where audio files live. Pick a bucket
(R2 recommended), not the repo.

## Carry forward / Drop / Fix (from the 2024 review)

Full review: Obsidian vault `wiki/projects/portfolio-2024.md`.
2024 scores — Concept 9 · Visual/UX 7 · Performance 3 · A11y 6 · SEO 3 · Code 5 · Security 4 · Content 5.

**Carry forward** (the good stuff):
- Neocities identity: GIF nav icons, "under construction" banner, iMood widget,
  weather card, `@samanshaiza on everything`
- PP Writer typography + the `clamp()` hero
- Glassmorphism surface (`bg-background/60` + backdrop-blur)
- The markdown-driven blog system (concept) and the casual first-person voice

**Drop**:
- Three.js `<Canvas>` that rendered a *flat color* (`#f5f5f5`) — pure waste, the
  #1 perf bug. Use a CSS background.
- Duplicate deps: `framer-motion` **and** `motion`; unused `gsap`, `matter-js`
- Orphaned `SmoothScrollToggle` component (never rendered)
- Hardcoded OpenWeatherMap API key in `NavBox.tsx` (committed to git — **rotate it**)
- Hot-linked archive.org GIFs (fragile)

**Fix**:
- **Performance**: static HTML solves most of it; no SPA hydration for content
- **SEO** (was 3/10): per-page `<title>`/meta/OpenGraph, sitemap (done), canonical
- **A11y** (was 6/10): the flicker/pulse animations must respect
  `prefers-reduced-motion` (the 2024 versions did not)
- **Self-host** the GeoCities GIFs (`src/assets/icons/`) instead of hot-linking
- **Convert fonts to WOFF2** (~40% smaller than the current OTFs — OTFs copied to
  `public/fonts/` for now; conversion is a TODO)
- **Weather widget → Server Island** (`server:defer`), API key in an env var, not
  source

## Design system

- **Tokens (canonical):** `../portfolio-2024/src/design-tokens.ts` — ported into
  `src/styles/global.css` as CSS custom properties + a Tailwind `@theme` block.
- **Claude Design project:** `saman-portfolio-v1`
  (`https://claude.ai/design/p/1122bc4c-b7b5-4bb6-97e9-aa69c2d7faab`) — 12 visual
  reference cards (Foundation / Components / Patterns). Use it as the visual
  source of truth when rebuilding component looks.
- **Preview cards:** `../portfolio-2024/design-system/*.html`

## Content to migrate

- Blog: 3 posts in `../portfolio-2024/src/data/blog/*.md` (frontmatter: `title`,
  `date`, `description`, `tags`) → `src/content/blog/`
- Reviews: `../portfolio-2024/src/data/reviews.ts` +
  `src/components/reviews/*.tsx` (Nurture, Yakuza: Like a Dragon) → MDX in
  `src/content/reviews/`
- About / Contact copy: `../portfolio-2024/src/RootLayout.tsx` and page components
  (note: 2024 footer leaked a phone number — review before copying personal info)

## Status

Scaffolded: Astro 7 + MDX + Tailwind v4 + sitemap, tokens ported, fonts copied,
content collections defined, base layout + home + blog routes, 3 blog posts
migrated. See `git log` and CLAUDE.md for conventions.
