import { render, screen, within } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import { CV } from './CV';
import { publications } from '../data/publications';

describe('CV', () => {
  it('renders category section headings present in the seed data, in order', () => {
    render(
      <HelmetProvider>
        <CV />
      </HelmetProvider>
    );
    const headings = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
    expect(headings).toEqual(['Education', 'Work Experience', 'Publications', 'Awards & Achievements']);
  });

  it('does not render a Research section', () => {
    render(
      <HelmetProvider>
        <CV />
      </HelmetProvider>
    );
    expect(screen.queryByRole('heading', { name: 'Research' })).not.toBeInTheDocument();
  });

  it('renders all work experience entries', () => {
    render(
      <HelmetProvider>
        <CV />
      </HelmetProvider>
    );
    for (const org of ['MDA Space', 'GHGSat', 'Manulife', 'Tangerine']) {
      expect(screen.getAllByText(new RegExp(org)).length).toBeGreaterThan(0);
    }
  });

  it('renders all three degrees with bullet points, not run-on paragraphs', () => {
    render(
      <HelmetProvider>
        <CV />
      </HelmetProvider>
    );
    expect(screen.getByText(/Ph\.D\., Aerospace Engineering/)).toBeInTheDocument();
    expect(screen.getByText(/M\.A\.Sc\., Aerospace Engineering/)).toBeInTheDocument();
    expect(screen.getByText(/B\.A\.Sc\., Engineering Science/)).toBeInTheDocument();

    // Each degree's points should be separate <li> bullets.
    expect(screen.getByText("Thesis: Multi-modal AI for Autonomous Space Service Robots").closest('li')).toBeInTheDocument();
    expect(screen.getByText('Minor in Business').closest('li')).toBeInTheDocument();
    expect(screen.getByText("Dean's List").closest('li')).toBeInTheDocument();
  });

  it('credits the SpaceTREx and Aerospace Mechatronics labs with hyperlinks, and drops the old advisor-name mention', () => {
    render(
      <HelmetProvider>
        <CV />
      </HelmetProvider>
    );
    expect(screen.getByRole('link', { name: 'Member of the SpaceTREx Laboratory' })).toHaveAttribute(
      'href',
      'https://spacetrex.arizona.edu/'
    );
    expect(screen.getByRole('link', { name: 'Member of the Aerospace Mechatronics Laboratory' })).toHaveAttribute(
      'href',
      'https://mechatronics.aerospace.utoronto.ca/'
    );
    // No supervisor name in the Education section — lab/university credited instead. (A
    // supervisor's name can still legitimately appear in a publication's own author list —
    // that's a citation, not a personal mention — so this only checks Education, not the
    // whole page.)
    const educationSection = screen.getByRole('heading', { name: 'Education' }).closest('section') as HTMLElement;
    expect(within(educationSection).queryByText(/Jekan Thanga/)).not.toBeInTheDocument();
  });

  it('renders the Publications section sourced from the same data as the Research page, with DOI links', () => {
    render(
      <HelmetProvider>
        <CV />
      </HelmetProvider>
    );
    for (const pub of publications) {
      expect(screen.getByText(pub.title)).toBeInTheDocument();
      for (const link of pub.links ?? []) {
        const matches = screen.getAllByRole('link', { name: link.label });
        expect(matches.some((el) => el.getAttribute('href') === link.url)).toBe(true);
      }
    }
  });

  it('renders all five awards, including the new SpaceApps Hackathon win', () => {
    render(
      <HelmetProvider>
        <CV />
      </HelmetProvider>
    );
    expect(screen.getByText('NASA SpaceApps Hackathon Winner')).toBeInTheDocument();
    expect(screen.getByText('Paula Burke Bursary')).toBeInTheDocument();
    expect(screen.getByText('University of Toronto Scholar')).toBeInTheDocument();
    expect(screen.getByText('AIA Canada Scholarship')).toBeInTheDocument();
    expect(screen.getByText(/Rookie of the Year/)).toBeInTheDocument();
  });
});
