# Portfolio Rebuild — Design Spec

Date: 2026-08-03
Source brief: `portfolio-rebuild-brief.md`

## Context & goal

Full rebuild (not a refactor) of a personal portfolio site serving three overlapping audiences: academic/research, industry/tech hiring, and personal-project showcase. The old repo (Create React App, undergrad-era content) is reference-only for content patterns and image assets — none of its code, dependencies, or visual design carry forward.

## Chosen direction: Editorial, multi-page

Phase 0 presented three directions (Editorial Scroll, Structured App, Mission Control). **Editorial** was chosen for its visual/type identity, with one structural change from the original pitch: rather than a single long scrolling page, **every section is its own routed page**, each carrying the Editorial visual language (warm palette, serif/sans type pairing, narrative feel) rather than a dashboard/sidebar layout.

## Site map & routing

React Router, top nav sticky on every page, highlighting the current route (not scroll-position based, since these are real pages).

| Route | Purpose |
|---|---|
| `/` | Home — hero (name, positioning statement, primary CTA) + below-the-fold teaser tiles linking to About, Research, Projects, Resume, Contact |
| `/about` | Bio + background story, skills folded into the narrative (not a tag dump) |
| `/research` | Curated research focus areas, key projects (LRCS, RCUs/LUNAR BRIC(S), Pathfinder), PI/collaborator credit |
| `/research/publications` | Nested under Research in the nav; papers/whitepapers with links |
| `/projects` | Data-driven timeline of personal/side projects (VAPOR, SDA balloon platform, precision-ag balloon platform, literature-sourcing agent, etc.) |
| `/resume` | Inline PDF viewer (condensed 1-pager) + download button |
| `/cv` | Native web page, full data-driven timeline: education, research positions, publications, talks, grants/proposals, service |
| `/contact` | Email (personal + institutional), GitHub, LinkedIn, Google Scholar, ORCID |

**Content boundary (confirmed):** Research page stays curated/narrative; Projects timeline is the broader personal-project portfolio; CV is the exhaustive rollup (including full grant/proposal history like NASA MUREP, STTR) that the other two intentionally omit. No overlap between Research-page entries and Projects-timeline entries.

A persistent lightweight footer (social icons: GitHub, LinkedIn, Scholar, ORCID, email) appears on every page, complementing the fuller `/contact` page.

## Visual system

**Palette**

| Token | Light | Dark |
|---|---|---|
| Base | `#FAF6EF` (warm cream) | `#1B1815` (warm charcoal) |
| Text | `#211D1D` (ink) | `#F2ECE3` (warm off-white) |
| Muted text | `#6B6357` | `#B8AE9E` |
| Accent | `#E4572E` (burnt coral-orange) | `#FF7A54` (brightened coral) |

Accent is reserved for headline highlight words, CTAs, links, and timeline markers — never small body text, to preserve contrast. Exact accent hex gets a final WCAG AA contrast pass during implementation (particularly for white-on-accent button text at small sizes).

**Type:** Fraunces (serif, display/headings) + Inter (body). Fraunces gives the site editorial warmth and avoids reading as a generic academic CV; Inter carries the density of publication lists and CV entries without fatigue.

**Logo:** Reuse the existing "KV" script monogram (thin ellipse outline, `public/images/Ketan_black_logo.png` / `Ketan_white_logo.png` in the old repo) as the asset — the mark itself doesn't need redesigning. Recolor to the new palette (ink for light mode, warm off-white for dark mode) rather than the old blue colorway. Re-trace as a clean SVG during implementation so it scales crisply from favicon to nav-header sizes (source is currently PNG-only).

**Dark mode:** full light/dark toggle, both themes designed from the start (not bolted on later).

## Mobile

First-class, not a squeeze-down of desktop:
- Nav collapses to a full-screen overlay menu (not a cramped dropdown); Research/Publications becomes an inline accordion within it
- Projects/CV timelines are already vertical on desktop, so mobile is a near 1:1 carry-over with tighter spacing — no structural redesign needed
- Hero stacks vertically, headline scales down, CTA becomes full-width-ish

## Data model

Config-driven so new entries mean editing data files, not markup.

```ts
// src/data/projects.ts — flat, reverse-chronological
type Project = {
  id: string;
  title: string;
  dateRange: { start: string; end?: string };  // end omitted = ongoing
  summary: string;
  description?: string;
  role?: string;
  tags: string[];
  links?: { label: string; url: string }[];
  image?: string;
  featured?: boolean;
};

// src/data/cv.ts — grouped by category
type CVEntry = {
  id: string;
  category: "education" | "research" | "publications" | "talks" | "grants" | "service";
  title: string;
  org?: string;
  dateRange: { start: string; end?: string };
  description?: string;
};

// src/data/publications.ts — shared by /research/publications and the CV's publications category
type Publication = {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: "journal" | "conference" | "whitepaper";
  links?: { label: string; url: string }[];
};
```

A single shared `<Timeline>` component renders both `/projects` (flat) and `/cv` (grouped-by-category, denser) so timeline visual styling lives in one place, not duplicated per page.

**Seed content for Projects timeline (first pass, not exhaustive):** VAPOR (Venus aerobot CubeSat concept), high-altitude balloon SDA platform, dual-tier precision agriculture balloon platform, autonomous academic literature-sourcing agent, company website build (if worth showcasing). More entries added later by editing `projects.ts` only.

## Tech stack

- React + Vite + TypeScript
- React Router (added — needed now that each section is a real route rather than a scroll anchor)
- Tailwind CSS
- Framer Motion, used sparingly (page-transition fades, timeline entries animating in on scroll) — not a gimmick
- Deployment: Cloudflare Pages

## SEO & prerendering

A plain client-rendered SPA won't produce correct per-page OG tags for link previews (crawlers for LinkedIn/Slack/Twitter don't execute JS), and the brief requires OG tags. **Decision: prerender each route to static HTML at build time** (lightweight prerender step, not a full SSR framework — there are only ~8 routes) so each page ships with correct `<title>`/meta/OG tags baked in. Stays compatible with Cloudflare Pages static hosting.

## Accessibility

Semantic HTML, keyboard-navigable nav (including the mobile overlay menu and Research/Publications accordion), WCAG AA contrast verified for accent-on-base combinations in both themes, visible focus states.

## Content still needed (not blocking the plan, but blocking final content pass)

- Actual bio/about copy (old repo's bio is undergrad-era and not reusable as written — brief's "candidate content" is a starting menu, not final prose)
- Final project descriptions for each seeded timeline entry
- Publication entries (full citation + links) for the two known papers (*Progress in Aerospace Sciences*, *Aerospace*) and any others
- Headshot image (confirm which asset from the old repo's `public/images/` to use, or a new one)
- Resume: **first build ships a generated minimal stub PDF** (name, headline, "full resume coming soon") so the inline-viewer + download-button component is fully functional and testable; real resume swapped in later without code changes

## Confirmed contact details

- Email: `ketanvasudeva@gmail.com` (personal), `ketanvasudeva@arizona.edu` (institutional)
- GitHub: `github.com/natek1234`
- LinkedIn: `linkedin.com/in/ketan-vasudeva-2305b7177`
- Google Scholar: `scholar.google.ca/citations?user=QWnS3tMAAAAJ&hl=en`
- ORCID: `orcid.org/0009-0009-4647-4299`

## Out of scope for this spec

- Final copywriting/content polish (handled as ongoing content edits to data files, not a code change)
- Real resume PDF (placeholder only, per above)
- Analytics/contact-form backend (brief doesn't request one; old repo's Formspree contact form is not being carried over — `/contact` is link-based, not a form, unless revisited later)
