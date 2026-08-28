import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { PublicationEntry } from './PublicationEntry';
import type { Publication } from '../types/content';

const withLinks: Publication = {
  id: 'linked-paper',
  title: 'A linked paper',
  authors: ['Ketan Vasudeva'],
  venue: 'Journal of Testing',
  year: 2025,
  type: 'journal',
  links: [
    { label: 'PDF', url: 'https://example.com/paper.pdf' },
    { label: '10.0000/example', url: 'https://doi.org/10.0000/example' },
  ],
};

const withCoAuthors: Publication = {
  id: 'co-authored-paper',
  title: 'A co-authored paper',
  authors: ['Jane Collaborator', 'Ketan Vasudeva', 'Sam Colleague'],
  venue: 'Journal of Testing',
  year: 2025,
  type: 'journal',
};

const withEmbeddedPdf: Publication = {
  id: 'thesis-with-pdf',
  title: 'A thesis with an embedded PDF',
  authors: ['Ketan Vasudeva'],
  venue: 'Some University',
  year: 2024,
  type: 'thesis',
  pdfUrl: '/theses/example-thesis.pdf',
};

describe('PublicationEntry', () => {
  it('renders title, authors, and venue', () => {
    render(
      <ul>
        <PublicationEntry publication={withLinks} />
      </ul>
    );
    expect(screen.getByText('A linked paper')).toBeInTheDocument();
    expect(screen.getByText('A linked paper').closest('li')?.textContent).toContain('Ketan Vasudeva — Journal of Testing');
  });

  it('bolds the site owner\'s name within a multi-author list, leaving co-authors unbolded', () => {
    render(
      <ul>
        <PublicationEntry publication={withCoAuthors} />
      </ul>
    );

    const authorsLine = screen.getByText('A co-authored paper').closest('li');
    expect(authorsLine?.textContent).toContain('Jane Collaborator, Ketan Vasudeva, Sam Colleague — Journal of Testing');

    const bolded = authorsLine?.querySelector('strong');
    expect(bolded?.textContent).toBe('Ketan Vasudeva');
  });

  it('renders each publication link with its label and href', () => {
    render(
      <ul>
        <PublicationEntry publication={withLinks} />
      </ul>
    );

    expect(screen.getByRole('link', { name: 'PDF' })).toHaveAttribute('href', 'https://example.com/paper.pdf');
    expect(screen.getByRole('link', { name: '10.0000/example' })).toHaveAttribute('href', 'https://doi.org/10.0000/example');
  });

  it('prefixes DOI links with "DOI: " as plain text outside the hyperlink, but not non-DOI links', () => {
    render(
      <ul>
        <PublicationEntry publication={withLinks} />
      </ul>
    );

    const doiLink = screen.getByRole('link', { name: '10.0000/example' });
    expect(doiLink.parentElement?.textContent).toBe('DOI: 10.0000/example');
    // The "DOI: " text itself must not be part of the link's own accessible name/content.
    expect(doiLink.textContent).toBe('10.0000/example');

    const pdfLink = screen.getByRole('link', { name: 'PDF' });
    expect(pdfLink.parentElement?.textContent).toBe('PDF');
  });

  it('renders no link list when a publication has no links', () => {
    const { links: _omitted, ...noLinks } = withLinks;
    render(
      <ul>
        <PublicationEntry publication={noLinks} />
      </ul>
    );

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('keeps the embedded PDF collapsed by default, with a toggle to expand it', () => {
    render(
      <ul>
        <PublicationEntry publication={withEmbeddedPdf} />
      </ul>
    );

    expect(screen.queryByTitle(/embedded pdf/i)).not.toBeInTheDocument();
    const toggle = screen.getByRole('button', { name: /view pdf/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('expands to show the embedded PDF viewer when the toggle is clicked, and collapses again on a second click', async () => {
    const user = userEvent.setup();
    render(
      <ul>
        <PublicationEntry publication={withEmbeddedPdf} />
      </ul>
    );

    const toggle = screen.getByRole('button', { name: /view pdf/i });
    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: /hide pdf/i })).toBe(toggle);
    const viewer = screen.getByTitle('A thesis with an embedded PDF PDF');
    expect(viewer).toHaveAttribute('data', '/theses/example-thesis.pdf');

    await user.click(toggle);
    expect(screen.queryByTitle(/embedded pdf/i)).not.toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders no PDF toggle when a publication has no pdfUrl', () => {
    render(
      <ul>
        <PublicationEntry publication={withLinks} />
      </ul>
    );

    expect(screen.queryByRole('button', { name: /view pdf/i })).not.toBeInTheDocument();
  });
});
