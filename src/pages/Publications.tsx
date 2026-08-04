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
