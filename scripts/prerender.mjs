// Prerenders every route to static HTML using real React server-side rendering
// (react-dom/server + React Router's static router) — no headless browser involved.
//
// This replaced react-snap (which drove a real Chromium via Puppeteer) because Cloudflare
// Pages' build containers don't ship the X11/GTK shared libraries Chromium needs even to
// launch, and don't grant the apt/root access needed to install them. Since this app's
// content is 100% synchronous local data (no async loaders), a full browser was never
// actually necessary — SSR produces the identical static output with zero system
// dependencies, so it runs in any Node environment.
import { build } from 'vite';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROUTES = ['/', '/about', '/research', '/projects', '/resume', '/cv', '/contact'];
const SSR_OUT_DIR = 'dist-ssr';

console.log('Building SSR bundle...');
await build({
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: SSR_OUT_DIR,
    rollupOptions: {
      output: { entryFileNames: 'entry-server.js' },
    },
  },
});

const { render } = await import(pathToFileURL(`${SSR_OUT_DIR}/entry-server.js`).href);

const template = readFileSync('dist/index.html', 'utf-8');

for (const route of ROUTES) {
  const { html, headTags } = await render(route);

  const page = template
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace('</head>', `    ${headTags}\n  </head>`);

  const outPath = route === '/' ? 'dist/index.html' : `dist${route}/index.html`;
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, page);
  console.log(`Prerendered ${route} -> ${outPath}`);
}

rmSync(SSR_OUT_DIR, { recursive: true, force: true });
console.log(`Done — ${ROUTES.length} routes prerendered.`);
