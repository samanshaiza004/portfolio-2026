# portfolio-2026

Rebuild of samanshaiza.com — a neocities/retro-web revival on Astro 7.
**Read `BRIEF.md` first** for the full context, architecture decisions, and the
carry-forward/drop/fix list from the 2024 review. Predecessor lives at
`../portfolio-2024` (React/Vite SPA) — reference only, not the source of truth.

## Project conventions

- **Stack:** Astro 7 (static), TS strict, Tailwind v4 (`@tailwindcss/vite`), MDX,
  `@astrojs/sitemap`. No React unless an island genuinely needs it (keep lean).
- **Design tokens** live in `src/styles/global.css` as CSS custom properties +
  a Tailwind `@theme` block. Canonical source: `../portfolio-2024/src/design-tokens.ts`.
  Visual reference: Claude Design project `saman-portfolio-v1`.
- **Content** is Content Collections (`src/content.config.ts`): `blog/` and
  `reviews/` as `.md`/`.mdx`. Add a post = drop a file; no code changes.
- **Media policy:** `.md`/inline images in-repo (use Astro `<Image>`). Audio and
  large media go to **object storage (Cloudflare R2)** by URL — never the repo.
- **A11y:** every decorative animation must respect `prefers-reduced-motion`
  (the 2024 site failed this — see `.under-construction`/`.handle-pulse` in CSS).
- **Secrets:** no hardcoded API keys (the 2024 weather key was committed). Use
  env vars; the weather widget should be a Server Island.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
