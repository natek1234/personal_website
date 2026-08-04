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
});
