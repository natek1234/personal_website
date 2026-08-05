import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import { Projects } from './Projects';
import { projects } from '../data/projects';

describe('Projects', () => {
  it('renders every seeded project title', () => {
    render(
      <HelmetProvider>
        <Projects />
      </HelmetProvider>
    );
    for (const project of projects) {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    }
  });

  it('renders the Sound of Space podcast with Spotify + Instagram links (with icons) and the educational-videos bullet', () => {
    render(
      <HelmetProvider>
        <Projects />
      </HelmetProvider>
    );
    const spotifyLink = screen.getByRole('link', { name: 'Spotify' });
    expect(spotifyLink).toHaveAttribute('href', 'https://open.spotify.com/show/6RQjnfSOOfoKXDSyLCLtYg?si=621c3b4e686c4cdd');
    expect(spotifyLink.querySelector('svg')).toBeInTheDocument();

    const instagramLink = screen.getByRole('link', { name: 'Instagram' });
    expect(instagramLink).toHaveAttribute(
      'href',
      'https://www.instagram.com/_thesoundofspace?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
    );
    expect(instagramLink.querySelector('svg')).toBeInTheDocument();

    expect(screen.getByText(/educational space videos/i)).toBeInTheDocument();
  });

  it('renders the literature-sourcing agent GitHub link with an icon', () => {
    render(
      <HelmetProvider>
        <Projects />
      </HelmetProvider>
    );
    const githubLinks = screen.getAllByRole('link', { name: 'GitHub' });
    const litAgentLink = githubLinks.find(
      (el) => el.getAttribute('href') === 'https://github.com/natek1234/literature_scraping_agent'
    );
    expect(litAgentLink).toBeDefined();
    expect(litAgentLink?.querySelector('svg')).toBeInTheDocument();
  });

  it('renders the SpaceApps hackathon GitHub link with an icon', () => {
    render(
      <HelmetProvider>
        <Projects />
      </HelmetProvider>
    );
    const githubLinks = screen.getAllByRole('link', { name: 'GitHub' });
    const spaceAppsLink = githubLinks.find(
      (el) => el.getAttribute('href') === 'https://github.com/natek1234/3.14Heads-SpaceApps2020'
    );
    expect(spaceAppsLink).toBeDefined();
    expect(spaceAppsLink?.querySelector('svg')).toBeInTheDocument();
  });
});
