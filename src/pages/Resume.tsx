import { SEO } from '../components/SEO';

const RESUME_PATH = '/ketan-vasudeva-resume.pdf';

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
        <object data={RESUME_PATH} type="application/pdf" title="Resume PDF" className="h-[80vh] w-full rounded-md border border-muted-light/20 dark:border-muted-dark/20">
          <p>
            Your browser can't display the embedded PDF. <a href={RESUME_PATH}>Open it directly</a>.
          </p>
        </object>
      </article>
    </>
  );
}
