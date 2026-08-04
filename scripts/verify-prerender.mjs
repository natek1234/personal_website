import { readFileSync, existsSync } from 'node:fs';

const ROUTES = [
  { path: 'dist/index.html', title: 'Home | Ketan Vasudeva' },
  { path: 'dist/about/index.html', title: 'About | Ketan Vasudeva' },
  { path: 'dist/research/index.html', title: 'Research | Ketan Vasudeva' },
  { path: 'dist/research/publications/index.html', title: 'Publications & Writing | Ketan Vasudeva' },
  { path: 'dist/projects/index.html', title: 'Projects | Ketan Vasudeva' },
  { path: 'dist/resume/index.html', title: 'Resume | Ketan Vasudeva' },
  { path: 'dist/cv/index.html', title: 'CV | Ketan Vasudeva' },
  { path: 'dist/contact/index.html', title: 'Contact | Ketan Vasudeva' },
];

// Matches a zero opacity in a serialized inline style, but not 0.5 / 0.25 etc.
const HIDDEN_OPACITY = /opacity\s*:\s*0(?![.\d%])/g;

let failed = false;
for (const route of ROUTES) {
  if (!existsSync(route.path)) {
    console.error(`MISSING: ${route.path}`);
    failed = true;
    continue;
  }
  const html = readFileSync(route.path, 'utf-8');
  if (!html.includes(`<title>${route.title}</title>`)) {
    console.error(`WRONG TITLE: ${route.path} missing "${route.title}"`);
    failed = true;
  }
  if (!html.includes(`property="og:title" content="${route.title}"`)) {
    console.error(`MISSING OG TITLE: ${route.path}`);
    failed = true;
  }
  // Scroll-triggered entrance animations must not serialize their pre-animation hidden
  // state into the static HTML — content below the fold at crawl time would otherwise ship
  // invisible to users and crawlers until JS hydrates. See TimelineEntry's isPrerendering.
  const hidden = html.match(HIDDEN_OPACITY);
  if (hidden) {
    console.error(`HIDDEN CONTENT: ${route.path} has ${hidden.length} element(s) prerendered at opacity:0`);
    failed = true;
  }
}

if (failed) {
  console.error('Prerender verification FAILED');
  process.exit(1);
}
console.log(
  `Prerender verification PASSED — all ${ROUTES.length} routes have correct title + og:title and no opacity:0 content`
);
