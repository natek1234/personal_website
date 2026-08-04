# Ketan Vasudeva — Personal Site

Personal portfolio and academic site. Built with Vite, React, TypeScript, Tailwind CSS v4,
React Router, and Framer Motion. Content lives in typed data modules under `src/data/`, so
adding a project, publication, or CV entry means editing data — not components.

Every route is prerendered to static HTML at build time (react-snap), so each page ships
with real content and its own `<title>`/Open Graph metadata before any JavaScript runs.

## Local development

```bash
npm install
npm run dev      # Vite dev server, http://localhost:5173
npm test         # Vitest, single run
npm run lint     # oxlint
```

## Build

```bash
npm run build
```

This type-checks (`tsc -b`), bundles with Vite into `dist/`, then runs `postbuild`, which
prerenders every route with react-snap and verifies the output via
`scripts/verify-prerender.mjs`. That check fails the build if any route is missing, has the
wrong `<title>`/`og:title`, or ships content stuck at `opacity: 0` from an unplayed entrance
animation — so prerender regressions surface at build time instead of in production.

Preview the built output locally with `npm run preview`.

## Deployment

Static hosting on **Cloudflare Pages**:

- Build command: `npm run build`
- Output directory: `dist`

No `_redirects` file is needed. Cloudflare Pages serves `dist/index.html` for `/`, the
prerendered `index.html` inside each route directory for that route, and `404.html`
automatically for unmatched paths.

## Updating the resume PDF

The `/resume` page embeds `public/resume-placeholder.pdf`. To publish the real resume,
overwrite that file **keeping the same filename** — no code changes are required. The path
is referenced in one place (`src/pages/Resume.tsx`) and is served straight from `public/`,
so the swap is a drop-in replacement.
