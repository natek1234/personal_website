import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { AboutIcon, ResearchIcon, ProjectsIcon, ResumeIcon, CvIcon, ContactIcon } from '../components/icons/TileIcons';

const TILES = [
  { to: '/about', label: 'About', blurb: 'Background, story, and how I work.', Icon: AboutIcon },
  { to: '/research', label: 'Research', blurb: 'Lunar surface construction and autonomous space robotics.', Icon: ResearchIcon },
  { to: '/projects', label: 'Projects', blurb: 'A growing timeline of things I\'ve built.', Icon: ProjectsIcon },
  { to: '/resume', label: 'Resume', blurb: 'A condensed, one-page view.', Icon: ResumeIcon },
  { to: '/cv', label: 'CV', blurb: 'The exhaustive version — education, publications, talks, and service.', Icon: CvIcon },
  { to: '/contact', label: 'Contact', blurb: 'Email, GitHub, LinkedIn, Scholar, ORCID.', Icon: ContactIcon },
];

export function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="Ketan Vasudeva — aerospace engineer, researcher, and builder working at the intersection of academic research and applied robotics."
        path="/"
      />
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-24 text-center">
        <img
          src="/images/headshot.jpg"
          alt="Ketan Vasudeva"
          className="h-32 w-32 rounded-full object-cover shadow-md"
        />
        <h1 className="font-display text-5xl font-semibold">Ketan Vasudeva</h1>
        <p className="font-body text-lg text-muted-light dark:text-muted-dark">
          Space Robotics Engineer, AI Researcher, and STEM Educator — Creating Technology for a Better Future
        </p>
        <Link
          to="/projects"
          className="mx-auto mt-4 rounded-md bg-accent-light px-6 py-3 font-body text-sm font-medium text-ink-light dark:bg-accent-dark"
        >
          See my work
        </Link>
      </section>
      <section className="mx-auto grid max-w-5xl grid-cols-1 place-items-center gap-4 px-4 pb-24 sm:grid-cols-2 md:grid-cols-3">
        {TILES.map((tile) => (
          <Link
            key={tile.to}
            to={tile.to}
            className="flex w-full flex-col items-center gap-3 rounded-lg border border-muted-light/20 p-6 text-center transition hover:border-accent-light dark:border-muted-dark/20 dark:hover:border-accent-dark"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-light/10 text-accent-text-light dark:bg-accent-dark/10 dark:text-accent-dark">
              <tile.Icon className="h-7 w-7" />
            </span>
            <h2 className="font-display text-xl">{tile.label}</h2>
            <p className="text-sm text-muted-light dark:text-muted-dark">{tile.blurb}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
