import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import { Research } from './Research';
import { publications } from '../data/publications';

describe('Research', () => {
  it('summarizes undergraduate, masters, and PhD research by lab and university, not supervisor name', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Research />
        </MemoryRouter>
      </HelmetProvider>
    );
    // Undergraduate — University of Toronto
    expect(screen.getByText(/University of Toronto Aerospace Team/)).toBeInTheDocument();
    expect(screen.getByText(/Markov Brain techniques/)).toBeInTheDocument();
    // Masters — Aerospace Mechatronics Laboratory
    expect(screen.getByText(/Aerospace Mechatronics Laboratory/)).toBeInTheDocument();
    expect(screen.getByText(/Lunar BRICS consortium/)).toBeInTheDocument();
    // PhD — SpaceTREx Laboratory, University of Arizona
    expect(screen.getByText(/SpaceTREx Laboratory/)).toBeInTheDocument();
    expect(screen.getByText(/University of Arizona/)).toBeInTheDocument();
    // No supervisor name — lab/university credited instead
    expect(screen.queryByText(/Jekan Thanga/)).not.toBeInTheDocument();
  });

  it('merges the summary into a single paragraph with the trimmed RCU parenthetical and the specific focus statement', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Research />
        </MemoryRouter>
      </HelmetProvider>
    );
    // Single combined paragraph, not two separate ones.
    const summaryParagraphs = document.querySelectorAll('article > p');
    expect(summaryParagraphs).toHaveLength(1);
    const summary = within(summaryParagraphs[0] as HTMLElement);

    expect(summary.getByText(/\(RCUs\)/)).toBeInTheDocument();
    expect(summary.queryByText(/LUNAR BRIC\(S\)/)).not.toBeInTheDocument();

    expect(summary.getByText(/I am now a Ph\.D\. candidate/)).toBeInTheDocument();
    expect(summary.queryByText(/I'm now/)).not.toBeInTheDocument();

    expect(
      summary.getByText(
        /focuses on increasing the robustness of multi-modal AI for space robots, bridging terrestrial capabilities with space implementation/
      )
    ).toBeInTheDocument();
    expect(summary.queryByText(/building on my earlier lunar construction work/)).not.toBeInTheDocument();
  });

  it('renders the publications timeline inline, with no separate publications link', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Research />
        </MemoryRouter>
      </HelmetProvider>
    );
    for (const pub of publications) {
      expect(screen.getByText(pub.title)).toBeInTheDocument();
    }
    expect(screen.queryByRole('link', { name: /publications/i })).not.toBeInTheDocument();
  });

  it('renders each DOI link with the bare DOI as its visible text, not a generic "DOI" label', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Research />
        </MemoryRouter>
      </HelmetProvider>
    );
    for (const pub of publications) {
      for (const link of pub.links ?? []) {
        const matches = screen.getAllByRole('link', { name: link.label });
        expect(matches.some((el) => el.getAttribute('href') === link.url)).toBe(true);
        expect(link.label).not.toBe('DOI');
      }
    }
  });
});
