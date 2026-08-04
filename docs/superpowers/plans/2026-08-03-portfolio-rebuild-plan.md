# Portfolio Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the personal portfolio site from scratch as a data-driven, multi-page React site (Editorial visual direction) covering Home, About, Research, Publications, Projects, Resume, CV, and Contact.

**Architecture:** Vite + React + TypeScript SPA with React Router for real per-page routes, prerendered to static HTML at build time (react-snap) for correct SEO/OG tags, deployed to Cloudflare Pages. Content (projects, publications, CV entries, contact links) lives in typed data files under `src/data/`, rendered through a shared `Timeline` component — adding an entry later means editing a data file, not markup.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, React Router v7, Framer Motion, react-helmet-async, react-snap, Vitest + React Testing Library, pdf-lib (placeholder resume generation), potrace (logo vectorization), @fontsource/fraunces + @fontsource/inter. (Updated from an initial React 18/Router v6 assumption after Task 1: the plan never pinned versions, npm resolved current majors, and the human partner confirmed targeting React 19/Router v7 rather than pinning down.)

## Global Constraints

- Palette — light: base `#FAF6EF`, text `#211D1D`, muted `#6B6357`, accent `#E4572E`. Dark: base `#1B1815`, text `#F2ECE3`, muted `#B8AE9E`, accent `#FF7A54`.
- Type: Fraunces for headings/display, Inter for body — self-hosted via @fontsource, not a CDN.
- Accent color reserved for CTAs/links/highlights/timeline markers — never small body text.
- Every page is a real route (React Router), not a scroll-anchor section.
- Dark mode is a first-class toggle (persisted to localStorage, defaults to `prefers-color-scheme`), designed alongside light mode from the start, not retrofitted.
- Mobile is first-class: nav collapses to a full-screen overlay with an accordion for Research/Publications; timelines are vertical on both desktop and mobile.
- All timeline/list content (`projects`, `cv`, `publications`, `contact`) is data-driven from typed arrays in `src/data/` — no hand-coded per-entry markup.
- Contact page is link-based (email/GitHub/LinkedIn/Scholar/ORCID) — no contact form.
- No third-party font/analytics CDN calls (perf + the brief's "minimal JS bloat" requirement).
- Resume page ships a generated placeholder PDF for this build; real PDF swapped in later without code changes.
- Each route must prerender with correct `<title>` and OG meta tags for link previews.

---

## Task 1: Project scaffold + test harness

**Files:**
- Delete: `package.json`, `package-lock.json`, `src/`, `public/` (old Create React App project — this repo is a from-scratch rebuild; nothing here carries forward as code)
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`
- Create: `src/main.tsx`, `src/App.tsx`, `src/App.test.tsx`, `src/test/setup.ts`
- Create: `.gitignore` (append `dist`, `.superpowers` already present)

**Interfaces:**
- Produces: `<App />` root component later tasks wrap with providers/router.

- [ ] **Step 1: Remove the old CRA project before scaffolding**

The repo currently contains an old Create React App site (`package.json`, `package-lock.json`, `src/`, `public/`). This is a clean rebuild — none of that code carries forward. Content and image assets from it are pulled from git history in later tasks (e.g. Task 5's logo), not from these files directly, so it's safe to delete outright. Do NOT delete `.git`, `.gitignore`, `LICENSE`, `README.md`, or `docs/`.

```bash
git rm -r --quiet package.json package-lock.json src public
git commit -m "chore: remove old Create React App project (clean rebuild)"
```

- [ ] **Step 2: Scaffold the Vite React-TS project**

```bash
npm create vite@latest . -- --template react-ts
npm install
```

- [ ] **Step 3: Install core runtime dependencies**

```bash
npm install react-router-dom framer-motion react-helmet-async @fontsource/fraunces @fontsource/inter
```

- [ ] **Step 4: Install dev/test dependencies**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom tailwindcss postcss autoprefixer pdf-lib potrace react-snap
```

- [ ] **Step 5: Configure Vitest inside `vite.config.ts`**

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
});
```

- [ ] **Step 6: Create test setup file**

`src/test/setup.ts`:
```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 7: Write the failing smoke test**

`src/App.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the site name', () => {
    render(<App />);
    expect(screen.getByText(/Ketan Vasudeva/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 8: Run test to verify it fails**

Run: `npx vitest run`
Expected: FAIL — `App` doesn't render "Ketan Vasudeva" yet (default Vite template content).

- [ ] **Step 9: Implement minimal `App.tsx`**

```tsx
function App() {
  return <div>Ketan Vasudeva</div>;
}

export default App;
```

- [ ] **Step 10: Run test to verify it passes**

Run: `npx vitest run`
Expected: PASS

- [ ] **Step 11: Add npm scripts to `package.json`**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "postbuild": "react-snap",
    "preview": "vite preview",
    "test": "vitest run"
  }
}
```

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite+React+TS project with Vitest harness"
```

---

## Task 2: Design tokens + Tailwind theme

**Note on Tailwind version:** Task 1 installed `tailwindcss@4.x` (npm resolved current; nothing was pinned). Tailwind v4 is CSS-first — there is no `tailwind.config.ts` or `postcss.config.js` by default, and theme values are declared inside an `@theme` block in CSS rather than a JS config object. The steps below target v4's actual API, not v3's.

**Files:**
- Create: `src/theme/tokens.ts`, `src/theme/tokens.test.ts` (the source-of-truth values, locked in by a test — Tailwind's CSS `@theme` block below must be kept in sync with these by hand, since v4 can't import a `.ts` file into CSS)
- Modify: `vite.config.ts` (add the `@tailwindcss/vite` plugin)
- Modify: `src/index.css` (Tailwind import + `@theme` block + font imports + dark-mode custom variant)
- Modify: `src/main.tsx` (import `./index.css`)

**Interfaces:**
- Produces: `tokens.light`, `tokens.dark` (each `{ base, text, muted, accent }` hex strings, the spec-locked values) and Tailwind utility classes `bg-base-light/dark`, `text-ink-light/dark`, `text-muted-light/dark`, `text-accent-light/dark`, `bg-accent-light/dark`, `border-accent-light/dark`, `border-muted-light/dark`, `font-display`, `font-body`, plus a `dark:` variant keyed off `[data-theme="dark"]` — consumed by `ThemeContext` (Task 3, sets the attribute) and every page/component task from Task 6 onward (uses the utility classes).

- [ ] **Step 1: Write the failing test for tokens**

`src/theme/tokens.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { tokens } from './tokens';

describe('theme tokens', () => {
  it('defines exact light and dark palette values from the spec', () => {
    expect(tokens.light).toEqual({
      base: '#FAF6EF',
      text: '#211D1D',
      muted: '#6B6357',
      accent: '#E4572E',
    });
    expect(tokens.dark).toEqual({
      base: '#1B1815',
      text: '#F2ECE3',
      muted: '#B8AE9E',
      accent: '#FF7A54',
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/theme/tokens.test.ts`
Expected: FAIL — `tokens.ts` doesn't exist.

- [ ] **Step 3: Implement `tokens.ts`**

```ts
export const tokens = {
  light: {
    base: '#FAF6EF',
    text: '#211D1D',
    muted: '#6B6357',
    accent: '#E4572E',
  },
  dark: {
    base: '#1B1815',
    text: '#F2ECE3',
    muted: '#B8AE9E',
    accent: '#FF7A54',
  },
} as const;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/theme/tokens.test.ts`
Expected: PASS

- [ ] **Step 5: Install the Tailwind v4 Vite plugin and wire it into `vite.config.ts`**

```bash
npm install @tailwindcss/vite
```

Add the plugin to `vite.config.ts` (alongside the existing `react()` plugin from Task 1):

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
});
```

- [ ] **Step 6: Write `src/index.css` — Tailwind import, theme tokens, dark-mode variant, fonts**

Values here must match `src/theme/tokens.ts` exactly (v4 can't import the `.ts` file, so this is a manual mirror of Step 3's literal hex values):

```css
@import 'tailwindcss';
@import '@fontsource/fraunces/400.css';
@import '@fontsource/fraunces/600.css';
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/500.css';

/* Attribute-based dark mode (not prefers-color-scheme) — ThemeContext (Task 3) sets data-theme on <html> */
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

@theme {
  --color-base-light: #FAF6EF;
  --color-ink-light: #211D1D;
  --color-muted-light: #6B6357;
  --color-accent-light: #E4572E;

  --color-base-dark: #1B1815;
  --color-ink-dark: #F2ECE3;
  --color-muted-dark: #B8AE9E;
  --color-accent-dark: #FF7A54;

  --font-display: 'Fraunces', serif;
  --font-body: 'Inter', sans-serif;
}

html {
  background-color: var(--color-base-light);
  color: var(--color-ink-light);
}
html[data-theme='dark'] {
  background-color: var(--color-base-dark);
  color: var(--color-ink-dark);
}
```

- [ ] **Step 7: Import the stylesheet in `main.tsx`**

Add `import './index.css';` as the first import in `src/main.tsx`.

- [ ] **Step 8: Run the full test suite and a build to confirm nothing broke**

Run: `npx vitest run`
Expected: PASS (both `App.test.tsx` and `tokens.test.ts`)

Run: `npx vite build`
Expected: succeeds — confirms the `@tailwindcss/vite` plugin and `@theme`/`@custom-variant` CSS are syntactically valid and compile.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add theme tokens and Tailwind v4 theme with Fraunces/Inter"
```

---

## Task 3: ThemeContext (light/dark toggle + persistence)

**Files:**
- Create: `src/theme/ThemeContext.tsx`, `src/theme/ThemeContext.test.tsx`
- Modify: `src/main.tsx` (wrap `<App />` in `<ThemeProvider>`)

**Interfaces:**
- Consumes: nothing new.
- Produces: `ThemeProvider` (React component), `useTheme()` hook returning `{ theme: 'light' | 'dark', toggleTheme: () => void }` — consumed by `Nav` (Task 6) for the toggle button.

- [ ] **Step 1: Write the failing test**

`src/theme/ThemeContext.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider, useTheme } from './ThemeContext';

function Consumer() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  );
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('defaults to light, toggles to dark, persists, and sets data-theme on <html>', () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    fireEvent.click(screen.getByText('toggle'));

    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/theme/ThemeContext.test.tsx`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement `ThemeContext.tsx`**

```tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/theme/ThemeContext.test.tsx`
Expected: PASS

- [ ] **Step 5: Wrap the app in `ThemeProvider`**

In `src/main.tsx`, wrap `<App />` with `<ThemeProvider>`.

- [ ] **Step 6: Run full suite**

Run: `npx vitest run`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add ThemeContext with persisted light/dark toggle"
```

---

## Task 4: Content types + seeded data files

**Files:**
- Create: `src/types/content.ts`
- Create: `src/data/projects.ts`, `src/data/publications.ts`, `src/data/cv.ts`, `src/data/contact.ts`
- Create: `src/data/data.test.ts`

**Interfaces:**
- Produces: `Project`, `CVEntry`, `Publication`, `ContactLink` types; `projects`, `publications`, `cvEntries`, `contactLinks` arrays — consumed by Timeline (Task 7), Projects/CV/Publications/Contact pages (Tasks 11-15).

- [ ] **Step 1: Define content types**

`src/types/content.ts`:
```ts
export type DateRange = { start: string; end?: string };

export type Project = {
  id: string;
  title: string;
  dateRange: DateRange;
  summary: string;
  description?: string;
  role?: string;
  tags: string[];
  links?: { label: string; url: string }[];
  image?: string;
  featured?: boolean;
};

export type CVCategory = 'education' | 'research' | 'publications' | 'talks' | 'grants' | 'service';

export type CVEntry = {
  id: string;
  category: CVCategory;
  title: string;
  org?: string;
  dateRange: DateRange;
  description?: string;
};

export type Publication = {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: 'journal' | 'conference' | 'whitepaper';
  links?: { label: string; url: string }[];
};

export type ContactLink = {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: 'email' | 'github' | 'linkedin' | 'scholar' | 'orcid';
};
```

- [ ] **Step 2: Write the failing data-integrity test**

`src/data/data.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { projects } from './projects';
import { publications } from './publications';
import { cvEntries } from './cv';
import { contactLinks } from './contact';

function idsAreUnique(items: { id: string }[]) {
  const ids = items.map((i) => i.id);
  return new Set(ids).size === ids.length;
}

describe('content data integrity', () => {
  it('has at least one seed project with unique ids', () => {
    expect(projects.length).toBeGreaterThan(0);
    expect(idsAreUnique(projects)).toBe(true);
  });

  it('has unique publication ids and valid types', () => {
    expect(idsAreUnique(publications)).toBe(true);
    for (const pub of publications) {
      expect(['journal', 'conference', 'whitepaper']).toContain(pub.type);
    }
  });

  it('has unique cv entry ids and only known categories', () => {
    expect(idsAreUnique(cvEntries)).toBe(true);
    const known = ['education', 'research', 'publications', 'talks', 'grants', 'service'];
    for (const entry of cvEntries) {
      expect(known).toContain(entry.category);
    }
  });

  it('has exactly 6 contact links (2 emails + github + linkedin + scholar + orcid)', () => {
    expect(contactLinks).toHaveLength(6);
    expect(idsAreUnique(contactLinks)).toBe(true);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/data/data.test.ts`
Expected: FAIL — data files don't exist yet.

- [ ] **Step 4: Seed `src/data/projects.ts`**

```ts
import type { Project } from '../types/content';

export const projects: Project[] = [
  {
    id: 'vapor',
    title: 'VAPOR — Venus Aerobot CubeSat Mission Concept',
    dateRange: { start: '2023' },
    summary: 'Mission concept and ConOps/trade study work for a Venus atmospheric aerobot delivered via CubeSat.',
    tags: ['CubeSat', 'ConOps', 'Venus', 'Mission Design'],
    featured: true,
  },
  {
    id: 'sda-balloon',
    title: 'High-Altitude Balloon SDA Platform',
    dateRange: { start: '2022' },
    summary: 'Optical LEO-observation payload flown on a high-altitude balloon for Space Domain Awareness.',
    tags: ['Space Domain Awareness', 'Optics', 'High-Altitude Balloon'],
  },
  {
    id: 'precision-ag-balloon',
    title: 'Dual-Tier Precision Agriculture Balloon Platform',
    dateRange: { start: '2021' },
    summary: 'A two-tier balloon platform for precision agriculture sensing.',
    tags: ['Precision Agriculture', 'High-Altitude Balloon', 'Remote Sensing'],
  },
  {
    id: 'lit-agent',
    title: 'Autonomous Academic Literature-Sourcing Agent',
    dateRange: { start: '2025' },
    summary: 'A multi-agent architecture, built with Claude Code, that autonomously sources and synthesizes academic literature.',
    tags: ['Multi-Agent Systems', 'LLM Tooling', 'Claude Code'],
  },
];
```

- [ ] **Step 5: Seed `src/data/publications.ts`**

```ts
import type { Publication } from '../types/content';

export const publications: Publication[] = [
  {
    id: 'lunar-construction-survey',
    title: 'A survey of lunar surface construction techniques',
    authors: ['Ketan Vasudeva'],
    venue: 'Progress in Aerospace Sciences',
    year: 2024,
    type: 'journal',
  },
  {
    id: 'pathfinder-concept',
    title: 'Pathfinder mission concept for lunar surface operations',
    authors: ['Ketan Vasudeva'],
    venue: 'Aerospace',
    year: 2024,
    type: 'journal',
  },
];
```

- [ ] **Step 6: Seed `src/data/cv.ts`**

```ts
import type { CVEntry } from '../types/content';

export const cvEntries: CVEntry[] = [
  {
    id: 'phd-arizona',
    category: 'education',
    title: 'Ph.D., Aerospace Engineering',
    org: 'University of Arizona',
    dateRange: { start: '2021' },
    description: 'Advised by Prof. Jekan Thanga. Focus: lunar surface construction, regolith containment systems, autonomous space robotics.',
  },
  {
    id: 'lrcs-research',
    category: 'research',
    title: 'Lunar Robotic Construction System (LRCS)',
    org: 'University of Arizona',
    dateRange: { start: '2022' },
    description: 'Regolith containment units (RCUs / LUNAR BRIC(S)) for autonomous lunar surface construction.',
  },
  {
    id: 'pub-lunar-survey-cv',
    category: 'publications',
    title: 'A survey of lunar surface construction techniques',
    org: 'Progress in Aerospace Sciences',
    dateRange: { start: '2024' },
  },
  {
    id: 'pub-pathfinder-cv',
    category: 'publications',
    title: 'Pathfinder mission concept for lunar surface operations',
    org: 'Aerospace',
    dateRange: { start: '2024' },
  },
];
```

- [ ] **Step 7: Seed `src/data/contact.ts`**

```ts
import type { ContactLink } from '../types/content';

export const contactLinks: ContactLink[] = [
  { id: 'email-personal', label: 'Email (personal)', value: 'ketanvasudeva@gmail.com', href: 'mailto:ketanvasudeva@gmail.com', icon: 'email' },
  { id: 'email-institutional', label: 'Email (institutional)', value: 'ketanvasudeva@arizona.edu', href: 'mailto:ketanvasudeva@arizona.edu', icon: 'email' },
  { id: 'github', label: 'GitHub', value: 'natek1234', href: 'https://github.com/natek1234', icon: 'github' },
  { id: 'linkedin', label: 'LinkedIn', value: 'ketan-vasudeva', href: 'https://linkedin.com/in/ketan-vasudeva-2305b7177', icon: 'linkedin' },
  { id: 'scholar', label: 'Google Scholar', value: 'Ketan Vasudeva', href: 'https://scholar.google.ca/citations?user=QWnS3tMAAAAJ&hl=en', icon: 'scholar' },
  { id: 'orcid', label: 'ORCID', value: '0009-0009-4647-4299', href: 'https://orcid.org/0009-0009-4647-4299', icon: 'orcid' },
];
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npx vitest run src/data/data.test.ts`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add typed content data files (projects, publications, cv, contact)"
```

---

## Task 5: Logo vectorization + Logo component

**Files:**
- Create: `scripts/vectorize-logo.mjs`
- Create: `src/assets/logo.svg` (generated by the script, committed)
- Create: `src/components/Logo.tsx`, `src/components/Logo.test.tsx`

**Interfaces:**
- Produces: `Logo` component (`<Logo className?: string />`) — consumed by `Nav` (Task 6).

- [ ] **Step 1: Pull the source logo PNG from git history**

The old CRA project's files were removed from the working tree in Task 1, but the `master` branch (this repo's original history, untouched by this rebuild) still has the original asset. Pull it out via git rather than assuming a sibling directory on disk:

```bash
mkdir -p scripts/.tmp
git show master:public/images/Ketan_black_logo.png > scripts/.tmp/logo-source.png
```

- [ ] **Step 2: Write the vectorization script**

`scripts/vectorize-logo.mjs`:
```js
import { trace } from 'potrace';
import { writeFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SOURCE = resolve('scripts/.tmp/logo-source.png');
const OUT = resolve('src/assets/logo.svg');

readFileSync(SOURCE); // fail fast with a clear error if the source asset is missing

trace(SOURCE, { threshold: 128 }, (err, svg) => {
  if (err) throw err;
  writeFileSync(OUT, svg);
  console.log(`Wrote ${OUT}`);
});
```

- [ ] **Step 3: Run the script and verify output**

Run: `node scripts/vectorize-logo.mjs`
Expected: `src/assets/logo.svg` created, containing `<svg` and at least one `<path`.

- [ ] **Step 4: Write the failing component test**

`src/components/Logo.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Logo } from './Logo';

describe('Logo', () => {
  it('renders an accessible svg logo', () => {
    render(<Logo />);
    expect(screen.getByRole('img', { name: /ketan vasudeva logo/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Run test to verify it fails**

Run: `npx vitest run src/components/Logo.test.tsx`
Expected: FAIL — `Logo` component doesn't exist.

- [ ] **Step 6: Implement `Logo.tsx`**

Import the generated SVG as a raw string via Vite's `?raw` suffix, strip its hardcoded fill so it inherits `currentColor` (themes automatically with light/dark text color), and wrap it with an accessible role.

```tsx
import logoSource from '../assets/logo.svg?raw';

const themedSvg = logoSource
  .replace(/fill="[^"]*"/g, 'fill="currentColor"')
  .replace('<svg', '<svg role="img" aria-label="Ketan Vasudeva logo"');

export function Logo({ className }: { className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: themedSvg }} />;
}
```

- [ ] **Step 7: Run test to verify it passes**

Run: `npx vitest run src/components/Logo.test.tsx`
Expected: PASS

- [ ] **Step 8: Add the temp source PNG to `.gitignore` and commit**

The intermediate `scripts/.tmp/logo-source.png` is a build-time extraction artifact, not a source file — ignore it, don't commit it. Append `scripts/.tmp/` to `.gitignore`.

```bash
git add -A
git commit -m "feat: vectorize KV logo and add themed Logo component"
```

---

## Task 6: Nav, MobileMenu, Footer, PageLayout (site chrome + routing skeleton)

**Files:**
- Create: `src/router.tsx`
- Create: `src/components/layout/Nav.tsx`, `src/components/layout/Nav.test.tsx`
- Create: `src/components/layout/MobileMenu.tsx`, `src/components/layout/MobileMenu.test.tsx`
- Create: `src/components/layout/Footer.tsx`, `src/components/layout/Footer.test.tsx`
- Create: `src/components/layout/PageLayout.tsx`
- Create: `src/pages/Home.tsx`, `src/pages/About.tsx`, `src/pages/Research.tsx`, `src/pages/Publications.tsx`, `src/pages/Projects.tsx`, `src/pages/Resume.tsx`, `src/pages/CV.tsx`, `src/pages/Contact.tsx` (stubs — fleshed out in Tasks 9-15)
- Modify: `src/App.tsx` (mount `RouterProvider`)

**Interfaces:**
- Consumes: `useTheme()` (Task 3), `Logo` (Task 5), `contactLinks` (Task 4).
- Produces: route paths `/`, `/about`, `/research`, `/research/publications`, `/projects`, `/resume`, `/cv`, `/contact` — consumed by every page task and by prerendering (Task 16).

- [ ] **Step 1: Create page stubs**

Each of the 8 files in `src/pages/` starts as:

```tsx
export function Home() {
  return <h1>Home</h1>;
}
```

(same pattern, swapping the export name and heading text, for `About`, `Research`, `Publications`, `Projects`, `Resume`, `CV`, `Contact`)

- [ ] **Step 2: Define the router**

`src/router.tsx`:
```tsx
import { createBrowserRouter } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Research } from './pages/Research';
import { Publications } from './pages/Publications';
import { Projects } from './pages/Projects';
import { Resume } from './pages/Resume';
import { CV } from './pages/CV';
import { Contact } from './pages/Contact';

export const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/research', element: <Research /> },
      { path: '/research/publications', element: <Publications /> },
      { path: '/projects', element: <Projects /> },
      { path: '/resume', element: <Resume /> },
      { path: '/cv', element: <CV /> },
      { path: '/contact', element: <Contact /> },
    ],
  },
]);
```

- [ ] **Step 3: Write the failing Nav test**

`src/components/layout/Nav.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '../../theme/ThemeContext';
import { Nav } from './Nav';

function renderNav(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ThemeProvider>
        <Nav />
      </ThemeProvider>
    </MemoryRouter>
  );
}

describe('Nav', () => {
  it('renders links to every top-level page', () => {
    renderNav('/');
    for (const [name, href] of [
      ['About', '/about'],
      ['Research', '/research'],
      ['Projects', '/projects'],
      ['Resume', '/resume'],
      ['CV', '/cv'],
      ['Contact', '/contact'],
    ]) {
      expect(screen.getByRole('link', { name })).toHaveAttribute('href', href);
    }
  });

  it('marks the current route with aria-current', () => {
    renderNav('/research');
    expect(screen.getByRole('link', { name: 'Research' })).toHaveAttribute('aria-current', 'page');
  });

  it('toggles the theme when the theme button is clicked', () => {
    renderNav('/');
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    button.click();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npx vitest run src/components/layout/Nav.test.tsx`
Expected: FAIL — `Nav` doesn't exist.

- [ ] **Step 5: Implement `Nav.tsx`**

```tsx
import { NavLink } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Logo } from '../Logo';
import { useTheme } from '../../theme/ThemeContext';
import { MobileMenu } from './MobileMenu';

const LINKS = [
  { to: '/about', label: 'About' },
  { to: '/research', label: 'Research' },
  { to: '/projects', label: 'Projects' },
  { to: '/resume', label: 'Resume' },
  { to: '/cv', label: 'CV' },
  { to: '/contact', label: 'Contact' },
];

export function Nav() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  return (
    <header className="sticky top-0 z-40 border-b border-muted-light/20 bg-base-light/90 backdrop-blur dark:bg-base-dark/90">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <NavLink to="/" aria-label="Home">
          <Logo className="h-8 w-8 text-ink-light dark:text-ink-dark" />
        </NavLink>
        <nav className="hidden gap-6 font-body text-sm md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'text-accent-light dark:text-accent-dark' : '')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} aria-label={`Toggle theme, currently ${theme}`}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button
            ref={hamburgerRef}
            className="md:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>
        </div>
      </div>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={LINKS} triggerRef={hamburgerRef} />
    </header>
  );
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run src/components/layout/Nav.test.tsx`
Expected: PASS

- [ ] **Step 7: Write the failing MobileMenu test (keyboard a11y)**

`src/components/layout/MobileMenu.test.tsx`:
```tsx
import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { MobileMenu } from './MobileMenu';

const LINKS = [{ to: '/about', label: 'About' }];

describe('MobileMenu', () => {
  it('is hidden when closed and visible when open', () => {
    const { rerender } = render(
      <MemoryRouter>
        <MobileMenu open={false} onClose={() => {}} links={LINKS} triggerRef={createRef()} />
      </MemoryRouter>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    rerender(
      <MemoryRouter>
        <MobileMenu open onClose={() => {}} links={LINKS} triggerRef={createRef()} />
      </MemoryRouter>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    const onClose = vi.fn();
    render(
      <MemoryRouter>
        <MobileMenu open onClose={onClose} links={LINKS} triggerRef={createRef()} />
      </MemoryRouter>
    );
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('restores focus to the trigger element when closed', () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);
    const triggerRef = { current: trigger };
    const onClose = vi.fn();

    const { rerender } = render(
      <MemoryRouter>
        <MobileMenu open onClose={onClose} links={LINKS} triggerRef={triggerRef} />
      </MemoryRouter>
    );

    rerender(
      <MemoryRouter>
        <MobileMenu open={false} onClose={onClose} links={LINKS} triggerRef={triggerRef} />
      </MemoryRouter>
    );

    expect(document.activeElement).toBe(trigger);
    document.body.removeChild(trigger);
  });

  it('Research/Publications is a real collapsible accordion, closed by default', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <MobileMenu open onClose={() => {}} links={[{ to: '/research', label: 'Research' }]} triggerRef={createRef()} />
      </MemoryRouter>
    );

    const toggle = screen.getByRole('button', { name: 'Research' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('link', { name: /publications/i })).not.toBeInTheDocument();

    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: /publications/i })).toHaveAttribute('href', '/research/publications');
  });
});
```

- [ ] **Step 8: Run test to verify it fails**

Run: `npx vitest run src/components/layout/MobileMenu.test.tsx`
Expected: FAIL — `MobileMenu` doesn't exist.

- [ ] **Step 9: Implement `MobileMenu.tsx`**

```tsx
import { useEffect, useRef, useState, type RefObject } from 'react';
import { NavLink } from 'react-router-dom';

type Link = { to: string; label: string };

export function MobileMenu({
  open,
  onClose,
  links,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  links: Link[];
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [researchExpanded, setResearchExpanded] = useState(false);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      closeButtonRef.current?.focus();
    } else if (wasOpen.current) {
      wasOpen.current = false;
      setResearchExpanded(false);
      triggerRef.current?.focus();
    }
  }, [open, triggerRef]);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 flex flex-col gap-6 bg-base-light p-6 font-body dark:bg-base-dark">
      <button ref={closeButtonRef} onClick={onClose} aria-label="Close menu" className="self-end text-xl">
        ✕
      </button>
      {links.map((link) =>
        link.label === 'Research' ? (
          <div key={link.to} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <NavLink to={link.to} onClick={onClose}>
                {link.label}
              </NavLink>
              <button
                aria-expanded={researchExpanded}
                aria-label="Research"
                onClick={() => setResearchExpanded((v) => !v)}
              >
                {researchExpanded ? '▲' : '▼'}
              </button>
            </div>
            {researchExpanded && (
              <NavLink to={`${link.to}/publications`} onClick={onClose} className="pl-4 text-muted-light dark:text-muted-dark">
                Publications
              </NavLink>
            )}
          </div>
        ) : (
          <NavLink key={link.to} to={link.to} onClick={onClose}>
            {link.label}
          </NavLink>
        )
      )}
    </div>
  );
}
```

Note: the visible "Research" text is on the `NavLink` (role `link`, still navigates directly to `/research`), and the disclosure toggle is a separate `<button aria-label="Research">` (role `button`) with only a decorative arrow glyph as visible content. `screen.getByRole('button', { name: 'Research' })` in the test matches the button by role + accessible name, and does not collide with the link of the same accessible name since roles differ.

- [ ] **Step 10: Run test to verify it passes**

Run: `npx vitest run src/components/layout/MobileMenu.test.tsx`
Expected: PASS

- [ ] **Step 11: Write the failing Footer test**

`src/components/layout/Footer.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders all 6 contact links from data', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /email \(personal\)/i })).toHaveAttribute('href', 'mailto:ketanvasudeva@gmail.com');
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/natek1234');
    expect(screen.getByRole('link', { name: /orcid/i })).toHaveAttribute('href', 'https://orcid.org/0009-0009-4647-4299');
  });
});
```

- [ ] **Step 12: Run test to verify it fails**

Run: `npx vitest run src/components/layout/Footer.test.tsx`
Expected: FAIL — `Footer` doesn't exist.

- [ ] **Step 13: Implement `Footer.tsx`**

```tsx
import { contactLinks } from '../../data/contact';

export function Footer() {
  return (
    <footer className="mx-auto max-w-5xl px-4 py-8 font-body text-sm text-muted-light dark:text-muted-dark">
      <ul className="flex flex-wrap gap-4">
        {contactLinks.map((link) => (
          <li key={link.id}>
            <a href={link.href} aria-label={link.label}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4">© {new Date().getFullYear()} Ketan Vasudeva</p>
    </footer>
  );
}
```

- [ ] **Step 14: Run test to verify it passes**

Run: `npx vitest run src/components/layout/Footer.test.tsx`
Expected: PASS

- [ ] **Step 15: Implement `PageLayout.tsx` with Framer Motion page transitions**

```tsx
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Nav } from './Nav';
import { Footer } from './Footer';

export function PageLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col font-body">
      <Nav />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 16: Wire the router into `App.tsx`**

```tsx
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

Delete or update `src/App.test.tsx` at this point since `App` no longer renders static text directly — replace its assertion with one that renders `<RouterProvider router={router} />` and checks for the Home stub heading:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import { ThemeProvider } from './theme/ThemeContext';

describe('App', () => {
  it('renders the Home route by default', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument();
  });
});
```

- [ ] **Step 17: Run full suite**

Run: `npx vitest run`
Expected: PASS

- [ ] **Step 18: Commit**

```bash
git add -A
git commit -m "feat: add Nav, MobileMenu, Footer, PageLayout and wire router"
```

---

## Task 7: Shared Timeline component

**Files:**
- Create: `src/components/Timeline/groupByCategory.ts`, `src/components/Timeline/groupByCategory.test.ts`
- Create: `src/components/Timeline/Timeline.tsx`, `src/components/Timeline/Timeline.test.tsx`
- Create: `src/components/Timeline/TimelineEntry.tsx`

**Interfaces:**
- Consumes: `Project`, `CVEntry` types (Task 4).
- Produces: `groupByCategory(entries: CVEntry[]): Record<CVCategory, CVEntry[]>`; `<Timeline items={Project[] | CVEntry[]} mode="flat" | "grouped" />` — consumed by Projects (Task 12) and CV (Task 13) pages.

- [ ] **Step 1: Write the failing test for `groupByCategory`**

`src/components/Timeline/groupByCategory.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { groupByCategory } from './groupByCategory';
import type { CVEntry } from '../../types/content';

const entries: CVEntry[] = [
  { id: 'a', category: 'research', title: 'A', dateRange: { start: '2022' } },
  { id: 'b', category: 'education', title: 'B', dateRange: { start: '2021' } },
  { id: 'c', category: 'research', title: 'C', dateRange: { start: '2024' } },
];

describe('groupByCategory', () => {
  it('groups entries by category, newest first within each group', () => {
    const grouped = groupByCategory(entries);
    expect(grouped.research.map((e) => e.id)).toEqual(['c', 'a']);
    expect(grouped.education.map((e) => e.id)).toEqual(['b']);
    expect(grouped.publications).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/Timeline/groupByCategory.test.ts`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement `groupByCategory.ts`**

```ts
import type { CVCategory, CVEntry } from '../../types/content';

const CATEGORIES: CVCategory[] = ['education', 'research', 'publications', 'talks', 'grants', 'service'];

export function groupByCategory(entries: CVEntry[]): Record<CVCategory, CVEntry[]> {
  const result = Object.fromEntries(CATEGORIES.map((c) => [c, [] as CVEntry[]])) as Record<CVCategory, CVEntry[]>;

  for (const entry of entries) {
    result[entry.category].push(entry);
  }

  for (const category of CATEGORIES) {
    result[category].sort((a, b) => b.dateRange.start.localeCompare(a.dateRange.start));
  }

  return result;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/Timeline/groupByCategory.test.ts`
Expected: PASS

- [ ] **Step 5: Implement `TimelineEntry.tsx`**

```tsx
import { motion } from 'framer-motion';

export function TimelineEntry({
  title,
  org,
  dateLabel,
  description,
}: {
  title: string;
  org?: string;
  dateLabel: string;
  description?: string;
}) {
  return (
    <motion.li
      className="border-l-2 border-accent-light pl-4 dark:border-accent-dark"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3 }}
    >
      <p className="font-body text-xs font-medium text-accent-light dark:text-accent-dark">{dateLabel}</p>
      <h3 className="font-display text-lg">{title}</h3>
      {org && <p className="text-sm text-muted-light dark:text-muted-dark">{org}</p>}
      {description && <p className="mt-1 text-sm">{description}</p>}
    </motion.li>
  );
}
```

- [ ] **Step 6: Write the failing Timeline test**

`src/components/Timeline/Timeline.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Timeline } from './Timeline';
import type { Project } from '../../types/content';

const projects: Project[] = [
  { id: 'p1', title: 'Older', dateRange: { start: '2021' }, summary: 's1', tags: [] },
  { id: 'p2', title: 'Newer', dateRange: { start: '2023' }, summary: 's2', tags: [] },
];

describe('Timeline (flat mode)', () => {
  it('renders every item, newest first', () => {
    render(<Timeline mode="flat" items={projects} />);
    const headings = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(headings).toEqual(['Newer', 'Older']);
  });
});
```

- [ ] **Step 7: Run test to verify it fails**

Run: `npx vitest run src/components/Timeline/Timeline.test.tsx`
Expected: FAIL — `Timeline` doesn't exist.

- [ ] **Step 8: Implement `Timeline.tsx`**

```tsx
import type { CVEntry, Project } from '../../types/content';
import { TimelineEntry } from './TimelineEntry';
import { groupByCategory } from './groupByCategory';

type FlatProps = { mode: 'flat'; items: Project[] };
type GroupedProps = { mode: 'grouped'; items: CVEntry[] };

const CATEGORY_LABELS: Record<string, string> = {
  education: 'Education',
  research: 'Research',
  publications: 'Publications',
  talks: 'Talks',
  grants: 'Grants & Proposals',
  service: 'Service',
};

function dateLabel(range: { start: string; end?: string }) {
  return range.end ? `${range.start} — ${range.end}` : `${range.start} — Present`;
}

export function Timeline(props: FlatProps | GroupedProps) {
  if (props.mode === 'flat') {
    const sorted = [...props.items].sort((a, b) => b.dateRange.start.localeCompare(a.dateRange.start));
    return (
      <ul className="flex flex-col gap-8">
        {sorted.map((item) => (
          <TimelineEntry key={item.id} title={item.title} dateLabel={dateLabel(item.dateRange)} description={item.summary} />
        ))}
      </ul>
    );
  }

  const grouped = groupByCategory(props.items);
  return (
    <div className="flex flex-col gap-10">
      {Object.entries(grouped)
        .filter(([, entries]) => entries.length > 0)
        .map(([category, entries]) => (
          <section key={category}>
            <h2 className="mb-4 font-display text-2xl">{CATEGORY_LABELS[category]}</h2>
            <ul className="flex flex-col gap-6">
              {entries.map((entry) => (
                <TimelineEntry key={entry.id} title={entry.title} org={entry.org} dateLabel={dateLabel(entry.dateRange)} description={entry.description} />
              ))}
            </ul>
          </section>
        ))}
    </div>
  );
}
```

- [ ] **Step 9: Run test to verify it passes**

Run: `npx vitest run src/components/Timeline/Timeline.test.tsx`
Expected: PASS

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: add shared Timeline component (flat + grouped modes)"
```

---

## Task 8: SEO component (react-helmet-async)

**Files:**
- Create: `src/components/SEO.tsx`, `src/components/SEO.test.tsx`
- Modify: `src/main.tsx` (wrap in `<HelmetProvider>`)

**Interfaces:**
- Produces: `<SEO title description path />` — consumed by every page task (Tasks 9-15).

- [ ] **Step 1: Write the failing test**

`src/components/SEO.test.tsx`:
```tsx
import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import { SEO } from './SEO';

describe('SEO', () => {
  it('sets document title and og:title meta tag', async () => {
    render(
      <HelmetProvider>
        <SEO title="Research" description="Research focus areas" path="/research" />
      </HelmetProvider>
    );

    await waitFor(() => expect(document.title).toBe('Research | Ketan Vasudeva'));
    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle?.getAttribute('content')).toBe('Research | Ketan Vasudeva');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/SEO.test.tsx`
Expected: FAIL — `SEO` doesn't exist.

- [ ] **Step 3: Implement `SEO.tsx`**

```tsx
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://ketanvasudeva.com';

export function SEO({ title, description, path }: { title: string; description: string; path: string }) {
  const fullTitle = `${title} | Ketan Vasudeva`;
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/SEO.test.tsx`
Expected: PASS

- [ ] **Step 5: Wrap the app in `HelmetProvider`**

In `src/main.tsx`, wrap `<App />` with `<HelmetProvider>` (outermost, before `ThemeProvider`).

- [ ] **Step 6: Run full suite**

Run: `npx vitest run`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add SEO component with react-helmet-async"
```

---

## Task 9: Home page (hero + teaser tiles)

**Files:**
- Modify: `src/pages/Home.tsx`
- Create: `src/pages/Home.test.tsx`

**Interfaces:**
- Consumes: `SEO` (Task 8).

- [ ] **Step 1: Write the failing test**

`src/pages/Home.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import { Home } from './Home';

function renderHome() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe('Home', () => {
  it('renders the hero heading and positioning statement', () => {
    renderHome();
    expect(screen.getByRole('heading', { level: 1, name: /ketan vasudeva/i })).toBeInTheDocument();
    expect(screen.getByText(/aerospace/i)).toBeInTheDocument();
  });

  it('renders 5 teaser tiles linking to About, Research, Projects, Resume, Contact', () => {
    renderHome();
    for (const [name, href] of [
      ['About', '/about'],
      ['Research', '/research'],
      ['Projects', '/projects'],
      ['Resume', '/resume'],
      ['Contact', '/contact'],
    ]) {
      expect(screen.getByRole('link', { name: new RegExp(name, 'i') })).toHaveAttribute('href', href);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/pages/Home.test.tsx`
Expected: FAIL — stub `Home` only renders `<h1>Home</h1>`.

- [ ] **Step 3: Implement `Home.tsx`**

```tsx
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const TILES = [
  { to: '/about', label: 'About', blurb: 'Background, story, and how I work.' },
  { to: '/research', label: 'Research', blurb: 'Lunar surface construction and autonomous space robotics.' },
  { to: '/projects', label: 'Projects', blurb: 'A growing timeline of things I’ve built.' },
  { to: '/resume', label: 'Resume', blurb: 'A condensed, one-page view.' },
  { to: '/contact', label: 'Contact', blurb: 'Email, GitHub, LinkedIn, Scholar, ORCID.' },
];

export function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="Ketan Vasudeva — aerospace engineer, researcher, and builder working at the intersection of academic research and applied robotics."
        path="/"
      />
      <section className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-24 text-center">
        <h1 className="font-display text-5xl font-semibold">Ketan Vasudeva</h1>
        <p className="font-body text-lg text-muted-light dark:text-muted-dark">
          Aerospace engineer and researcher building autonomous space robotics — from lunar surface construction to
          side projects that ship.
        </p>
        <Link
          to="/projects"
          className="mx-auto mt-4 rounded-md bg-accent-light px-6 py-3 font-body text-sm font-medium text-ink-light dark:bg-accent-dark"
        >
          See my work
        </Link>
      </section>
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-4 pb-24 sm:grid-cols-2 md:grid-cols-3">
        {TILES.map((tile) => (
          <Link
            key={tile.to}
            to={tile.to}
            className="rounded-lg border border-muted-light/20 p-6 transition hover:border-accent-light dark:hover:border-accent-dark"
          >
            <h2 className="font-display text-xl">{tile.label}</h2>
            <p className="mt-2 text-sm text-muted-light dark:text-muted-dark">{tile.blurb}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/pages/Home.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: build Home page with hero and teaser tiles"
```

---

## Task 10: About page

**Files:**
- Modify: `src/pages/About.tsx`
- Create: `src/pages/About.test.tsx`

- [ ] **Step 1: Write the failing test**

`src/pages/About.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import { About } from './About';

describe('About', () => {
  it('renders the bio narrative with skills folded in, not as a separate tag list', () => {
    render(
      <HelmetProvider>
        <About />
      </HelmetProvider>
    );
    expect(screen.getByRole('heading', { level: 1, name: /about/i })).toBeInTheDocument();
    expect(screen.getByText(/TypeScript/)).toBeInTheDocument();
    expect(screen.queryByRole('list', { name: /skills/i })).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/pages/About.test.tsx`
Expected: FAIL — stub only renders `<h1>About</h1>`.

- [ ] **Step 3: Implement `About.tsx`**

```tsx
import { SEO } from '../components/SEO';

export function About() {
  return (
    <>
      <SEO
        title="About"
        description="About Ketan Vasudeva — aerospace engineering PhD candidate and builder."
        path="/about"
      />
      <article className="mx-auto max-w-2xl px-4 py-16 font-body leading-relaxed">
        <h1 className="mb-6 font-display text-4xl">About</h1>
        <p className="mb-4">
          I'm an aerospace engineering PhD candidate at the University of Arizona, working under Prof. Jekan Thanga
          on lunar surface construction, regolith containment systems, and autonomous space robotics. My research
          sits at the intersection of mechanical design, robotics, and mission concept development.
        </p>
        <p className="mb-4">
          Outside the lab, I build things end to end — writing production TypeScript and Python, standing up
          full-stack web apps on Cloudflare Pages and FastAPI, and experimenting with multi-agent LLM systems built
          with tools like Claude Code. I'm equally comfortable in a CAD tool, a CFD solver, or a React codebase.
        </p>
        <p>
          That mix — formal research training plus a builder's instinct for shipping working software — is what
          this site is meant to show: not just what I've studied, but what I've made.
        </p>
      </article>
    </>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/pages/About.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: build About page"
```

---

## Task 11: Research + Publications pages

**Files:**
- Modify: `src/pages/Research.tsx`, `src/pages/Publications.tsx`
- Create: `src/pages/Research.test.tsx`, `src/pages/Publications.test.tsx`

**Interfaces:**
- Consumes: `publications` (Task 4).

- [ ] **Step 1: Write the failing Research test**

`src/pages/Research.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import { Research } from './Research';

describe('Research', () => {
  it('credits the PI and links to Publications', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Research />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(screen.getByText(/Jekan Thanga/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /publications/i })).toHaveAttribute('href', '/research/publications');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/pages/Research.test.tsx`
Expected: FAIL — stub only renders `<h1>Research</h1>`.

- [ ] **Step 3: Implement `Research.tsx`**

```tsx
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export function Research() {
  return (
    <>
      <SEO
        title="Research"
        description="Lunar surface construction, regolith containment, and autonomous space robotics research."
        path="/research"
      />
      <article className="mx-auto max-w-2xl px-4 py-16 font-body leading-relaxed">
        <h1 className="mb-6 font-display text-4xl">Research</h1>
        <p className="mb-4">
          My PhD research at the University of Arizona, advised by <strong>Prof. Jekan Thanga</strong>, focuses on
          autonomous systems for lunar surface construction.
        </p>
        <h2 className="mb-2 mt-8 font-display text-2xl">Lunar Robotic Construction System (LRCS)</h2>
        <p className="mb-4">
          A system for autonomous regolith handling and structure assembly on the lunar surface, including regolith
          containment units (RCUs / LUNAR BRIC(S)) designed to hold and shape regolith into building elements.
        </p>
        <h2 className="mb-2 mt-8 font-display text-2xl">Pathfinder Mission Concept</h2>
        <p className="mb-4">
          Concept development for a pathfinder mission validating construction-relevant lunar surface operations
          ahead of larger-scale infrastructure deployment.
        </p>
        <p className="mt-8">
          <Link to="/research/publications" className="text-accent-light underline dark:text-accent-dark">
            Read the publications & writing →
          </Link>
        </p>
      </article>
    </>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/pages/Research.test.tsx`
Expected: PASS

- [ ] **Step 5: Write the failing Publications test**

`src/pages/Publications.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import { Publications } from './Publications';
import { publications } from '../data/publications';

describe('Publications', () => {
  it('renders every seeded publication', () => {
    render(
      <HelmetProvider>
        <Publications />
      </HelmetProvider>
    );
    for (const pub of publications) {
      expect(screen.getByText(pub.title)).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npx vitest run src/pages/Publications.test.tsx`
Expected: FAIL — stub only renders `<h1>Publications</h1>`.

- [ ] **Step 7: Implement `Publications.tsx`**

```tsx
import { SEO } from '../components/SEO';
import { publications } from '../data/publications';

export function Publications() {
  const sorted = [...publications].sort((a, b) => b.year - a.year);

  return (
    <>
      <SEO title="Publications & Writing" description="Papers and whitepapers by Ketan Vasudeva." path="/research/publications" />
      <article className="mx-auto max-w-2xl px-4 py-16 font-body">
        <h1 className="mb-6 font-display text-4xl">Publications & Writing</h1>
        <ul className="flex flex-col gap-6">
          {sorted.map((pub) => (
            <li key={pub.id} className="border-l-2 border-accent-light pl-4 dark:border-accent-dark">
              <p className="text-xs font-medium text-accent-light dark:text-accent-dark">{pub.year}</p>
              <h2 className="font-display text-lg">{pub.title}</h2>
              <p className="text-sm text-muted-light dark:text-muted-dark">
                {pub.authors.join(', ')} — {pub.venue}
              </p>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npx vitest run src/pages/Publications.test.tsx`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: build Research and Publications pages"
```

---

## Task 12: Projects page (timeline)

**Files:**
- Modify: `src/pages/Projects.tsx`
- Create: `src/pages/Projects.test.tsx`

**Interfaces:**
- Consumes: `Timeline` (Task 7), `projects` (Task 4).

- [ ] **Step 1: Write the failing test**

`src/pages/Projects.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import { Projects } from './Projects';
import { projects } from '../data/projects';

describe('Projects', () => {
  it('renders every seeded project title', () => {
    render(
      <HelmetProvider>
        <Projects />
      </HelmetProvider>
    );
    for (const project of projects) {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/pages/Projects.test.tsx`
Expected: FAIL — stub only renders `<h1>Projects</h1>`.

- [ ] **Step 3: Implement `Projects.tsx`**

```tsx
import { SEO } from '../components/SEO';
import { Timeline } from '../components/Timeline/Timeline';
import { projects } from '../data/projects';

export function Projects() {
  return (
    <>
      <SEO title="Projects" description="A timeline of side projects and things I've built." path="/projects" />
      <article className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="mb-8 font-display text-4xl">Projects</h1>
        <Timeline mode="flat" items={projects} />
      </article>
    </>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/pages/Projects.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: build Projects timeline page"
```

---

## Task 13: CV page (grouped timeline)

**Files:**
- Modify: `src/pages/CV.tsx`
- Create: `src/pages/CV.test.tsx`

**Interfaces:**
- Consumes: `Timeline` (Task 7), `cvEntries` (Task 4).

- [ ] **Step 1: Write the failing test**

`src/pages/CV.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import { CV } from './CV';

describe('CV', () => {
  it('renders category section headings present in the seed data', () => {
    render(
      <HelmetProvider>
        <CV />
      </HelmetProvider>
    );
    expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Research' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Publications' })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/pages/CV.test.tsx`
Expected: FAIL — stub only renders `<h1>CV</h1>`.

- [ ] **Step 3: Implement `CV.tsx`**

```tsx
import { SEO } from '../components/SEO';
import { Timeline } from '../components/Timeline/Timeline';
import { cvEntries } from '../data/cv';

export function CV() {
  return (
    <>
      <SEO
        title="CV"
        description="Full curriculum vitae: education, research, publications, talks, grants, and service."
        path="/cv"
      />
      <article className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="mb-8 font-display text-4xl">Curriculum Vitae</h1>
        <Timeline mode="grouped" items={cvEntries} />
      </article>
    </>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/pages/CV.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: build CV page with grouped timeline"
```

---

## Task 14: Resume page (placeholder PDF + inline viewer)

**Files:**
- Create: `scripts/generate-placeholder-resume.mjs`
- Create: `public/resume-placeholder.pdf` (generated)
- Modify: `src/pages/Resume.tsx`
- Create: `src/pages/Resume.test.tsx`, `scripts/generate-placeholder-resume.test.mjs`

- [ ] **Step 1: Write the PDF generation script**

`scripts/generate-placeholder-resume.mjs`:
```js
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { writeFileSync } from 'node:fs';

const doc = await PDFDocument.create();
const page = doc.addPage([612, 792]);
const font = await doc.embedFont(StandardFonts.HelveticaBold);
const bodyFont = await doc.embedFont(StandardFonts.Helvetica);

page.drawText('Ketan Vasudeva', { x: 50, y: 720, size: 24, font, color: rgb(0.13, 0.11, 0.11) });
page.drawText('Aerospace Engineer & Researcher', { x: 50, y: 695, size: 14, font: bodyFont });
page.drawText('Full resume coming soon — this is a placeholder.', { x: 50, y: 660, size: 12, font: bodyFont });

const bytes = await doc.save();
writeFileSync('public/resume-placeholder.pdf', bytes);
console.log('Wrote public/resume-placeholder.pdf');
```

- [ ] **Step 2: Run the script**

Run: `node scripts/generate-placeholder-resume.mjs`
Expected: `public/resume-placeholder.pdf` created.

- [ ] **Step 3: Write the failing test verifying the generated file is a real PDF**

`scripts/generate-placeholder-resume.test.mjs`:
```js
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';

describe('generated placeholder resume', () => {
  it('exists and starts with the PDF magic bytes', () => {
    expect(existsSync('public/resume-placeholder.pdf')).toBe(true);
    const bytes = readFileSync('public/resume-placeholder.pdf');
    expect(bytes.subarray(0, 4).toString()).toBe('%PDF');
  });
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run scripts/generate-placeholder-resume.test.mjs`
Expected: PASS (script must have been run in Step 2 first)

- [ ] **Step 5: Write the failing Resume page test**

`src/pages/Resume.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import { Resume } from './Resume';

describe('Resume', () => {
  it('renders an inline PDF viewer and a download link, both pointing at the resume file', () => {
    render(
      <HelmetProvider>
        <Resume />
      </HelmetProvider>
    );
    expect(screen.getByTitle(/resume/i)).toHaveAttribute('data', '/resume-placeholder.pdf');
    const downloadLink = screen.getByRole('link', { name: /download/i });
    expect(downloadLink).toHaveAttribute('href', '/resume-placeholder.pdf');
    expect(downloadLink).toHaveAttribute('download');
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npx vitest run src/pages/Resume.test.tsx`
Expected: FAIL — stub only renders `<h1>Resume</h1>`.

- [ ] **Step 7: Implement `Resume.tsx`**

```tsx
import { SEO } from '../components/SEO';

const RESUME_PATH = '/resume-placeholder.pdf';

export function Resume() {
  return (
    <>
      <SEO title="Resume" description="Condensed one-page resume for Ketan Vasudeva." path="/resume" />
      <article className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-16">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-4xl">Resume</h1>
          <a
            href={RESUME_PATH}
            download
            className="rounded-md bg-accent-light px-4 py-2 font-body text-sm font-medium text-ink-light dark:bg-accent-dark"
          >
            Download PDF
          </a>
        </div>
        <object data={RESUME_PATH} type="application/pdf" title="Resume PDF" className="h-[80vh] w-full rounded-md border border-muted-light/20">
          <p>
            Your browser can't display the embedded PDF. <a href={RESUME_PATH}>Download it instead</a>.
          </p>
        </object>
      </article>
    </>
  );
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npx vitest run src/pages/Resume.test.tsx`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: generate placeholder resume PDF and build Resume page"
```

---

## Task 15: Contact page

**Files:**
- Modify: `src/pages/Contact.tsx`
- Create: `src/pages/Contact.test.tsx`

**Interfaces:**
- Consumes: `contactLinks` (Task 4).

- [ ] **Step 1: Write the failing test**

`src/pages/Contact.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import { Contact } from './Contact';
import { contactLinks } from '../data/contact';

describe('Contact', () => {
  it('renders every contact link from data', () => {
    render(
      <HelmetProvider>
        <Contact />
      </HelmetProvider>
    );
    for (const link of contactLinks) {
      expect(screen.getByRole('link', { name: new RegExp(link.label, 'i') })).toHaveAttribute('href', link.href);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/pages/Contact.test.tsx`
Expected: FAIL — stub only renders `<h1>Contact</h1>`.

- [ ] **Step 3: Implement `Contact.tsx`**

```tsx
import { SEO } from '../components/SEO';
import { contactLinks } from '../data/contact';

export function Contact() {
  return (
    <>
      <SEO title="Contact" description="Get in touch with Ketan Vasudeva." path="/contact" />
      <article className="mx-auto max-w-xl px-4 py-16 font-body">
        <h1 className="mb-8 font-display text-4xl">Contact</h1>
        <ul className="flex flex-col gap-4">
          {contactLinks.map((link) => (
            <li key={link.id}>
              <a href={link.href} className="flex flex-col">
                <span className="text-xs uppercase tracking-wide text-muted-light dark:text-muted-dark">{link.label}</span>
                <span className="text-lg text-accent-light dark:text-accent-dark">{link.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/pages/Contact.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: build Contact page"
```

---

## Task 16: Prerendering, Cloudflare Pages config, and final verification

**Files:**
- Modify: `package.json` (react-snap config)
- Create: `public/_redirects`, `public/404.html`
- Create: `scripts/verify-prerender.mjs`

**Interfaces:**
- Consumes: all 8 routes (Task 6), `SEO` output (Task 8).

- [ ] **Step 1: Configure react-snap in `package.json`**

```json
{
  "reactSnap": {
    "source": "dist",
    "include": [
      "/",
      "/about",
      "/research",
      "/research/publications",
      "/projects",
      "/resume",
      "/cv",
      "/contact"
    ]
  }
}
```

`postbuild` script from Task 1 (`react-snap`) already runs this after `vite build`.

- [ ] **Step 2: Add Cloudflare Pages fallback files**

`public/_redirects`:
```
/*  /404.html  404
```

`public/404.html`:
```html
<!doctype html>
<html lang="en">
  <head><meta charset="utf-8" /><title>Page not found | Ketan Vasudeva</title></head>
  <body>
    <h1>Page not found</h1>
    <p><a href="/">Back to home</a></p>
  </body>
</html>
```

- [ ] **Step 3: Run the full build**

Run: `npm run build`
Expected: `dist/` populated, then react-snap crawls all 8 routes and writes prerendered `index.html` files under matching subdirectories (e.g. `dist/research/index.html`).

- [ ] **Step 4: Write the verification script**

`scripts/verify-prerender.mjs`:
```js
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
```

- [ ] **Step 5: Run the verification script**

Run: `node scripts/verify-prerender.mjs`
Expected: `Prerender verification PASSED — all 8 routes have correct title + og:title`

- [ ] **Step 6: Manual QA pass**

Run: `npm run preview`, open the printed local URL, and check by hand (not automatable in this stack):
- Toggle dark/light mode and confirm every page (not just Home) reflects the theme
- Resize to a mobile width (≤ 390px) and confirm the nav collapses to the overlay menu, the Research/Publications accordion works, and no horizontal scroll appears on any page
- Tab through the Nav and mobile menu with keyboard only — focus should be visible at every stop
- Open Chrome DevTools → Lighthouse, run an audit against the preview build, confirm Performance/Accessibility/SEO scores are all in the 90s; note and fix anything below that before considering the build done

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add prerendering config, Cloudflare Pages fallback, and prerender verification"
```

---

## Post-plan follow-ups (not part of this build)

- Swap the generated placeholder PDF for the real resume (`public/resume-placeholder.pdf` — same filename, no code changes needed)
- Fill in grant/proposal history (NASA MUREP, STTR, etc.) as additional `cvEntries` with `category: 'grants'`
- Add more `projects` entries as new work ships — edit `src/data/projects.ts` only
- Final copy pass on About/Research prose once the user has reviewed the draft text written in Tasks 10-11
- Confirm the headshot image to use (none was carried over from the old repo in this plan) and add it to the About page
- Set up the actual Cloudflare Pages project (connect repo, build command `npm run build`, output directory `dist`) — infrastructure step outside this codebase
