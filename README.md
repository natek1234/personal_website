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
- Node version: pinned via `.nvmrc` (currently 22). Cloudflare Pages reads this
  automatically; the toolchain (Vite 8, React 19) needs a recent Node, so don't remove it.

No `_redirects` file is needed. Cloudflare Pages serves `dist/index.html` for `/`, the
prerendered `index.html` inside each route directory for that route, and `404.html`
automatically for unmatched paths.

**If the build fails at the `postbuild` step:** that's `react-snap` launching a headless
Chromium via Puppeteer to prerender each route. `package.json`'s `reactSnap.puppeteerArgs`
already passes `--no-sandbox --disable-setuid-sandbox`, which is the standard fix for
Chromium's sandbox not having the kernel permissions most CI/build containers grant — but
this hasn't been verified against an actual Cloudflare Pages build. If it still fails there,
check the build log for a Puppeteer/Chromium launch error specifically (not a generic build
failure) and search Cloudflare Pages' docs/community for current Puppeteer guidance, since
supported flags and workarounds shift over time.

## Updating the resume PDF

The `/resume` page embeds `public/ketan-vasudeva-resume.pdf`. To update it, overwrite that
file **keeping the same filename** — no code changes are required. The path is referenced in
one place (`src/pages/Resume.tsx`) and is served straight from `public/`, so the swap is a
drop-in replacement.
