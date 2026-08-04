import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const TILES = [
  { to: '/about', label: 'About', blurb: 'Background, story, and how I work.' },
  { to: '/research', label: 'Research', blurb: 'Lunar surface construction and autonomous space robotics.' },
  { to: '/projects', label: 'Projects', blurb: 'A growing timeline of things I\'ve built.' },
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
            className="rounded-lg border border-muted-light/20 p-6 transition hover:border-accent-light dark:border-muted-dark/20 dark:hover:border-accent-dark"
          >
            <h2 className="font-display text-xl">{tile.label}</h2>
            <p className="mt-2 text-sm text-muted-light dark:text-muted-dark">{tile.blurb}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
