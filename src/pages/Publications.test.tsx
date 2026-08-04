import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import { Publications, PublicationEntry } from './Publications';
import { publications } from '../data/publications';
import type { Publication } from '../types/content';

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

  const withLinks: Publication = {
    id: 'linked-paper',
    title: 'A linked paper',
    authors: ['Ketan Vasudeva'],
    venue: 'Journal of Testing',
    year: 2025,
    type: 'journal',
    links: [
      { label: 'PDF', url: 'https://example.com/paper.pdf' },
      { label: 'DOI', url: 'https://doi.org/10.0000/example' },
    ],
  };

  it('renders each publication link with its label and href', () => {
    render(
      <ul>
        <PublicationEntry publication={withLinks} />
      </ul>
    );

    expect(screen.getByRole('link', { name: 'PDF' })).toHaveAttribute('href', 'https://example.com/paper.pdf');
    expect(screen.getByRole('link', { name: 'DOI' })).toHaveAttribute('href', 'https://doi.org/10.0000/example');
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
