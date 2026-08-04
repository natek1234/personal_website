import { render, screen } from '@testing-library/react';
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

describe('PublicationEntry', () => {
  it('renders title, authors, and venue', () => {
    render(
      <ul>
        <PublicationEntry publication={withLinks} />
      </ul>
    );
    expect(screen.getByText('A linked paper')).toBeInTheDocument();
    expect(screen.getByText(/Ketan Vasudeva — Journal of Testing/)).toBeInTheDocument();
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
});
