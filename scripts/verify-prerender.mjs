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
}

if (failed) {
  console.error('Prerender verification FAILED');
  process.exit(1);
}
console.log('Prerender verification PASSED — all 8 routes have correct title + og:title');
