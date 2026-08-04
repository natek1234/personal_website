import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import { Resume } from './Resume';

describe('Resume', () => {
  it('renders an inline PDF viewer and a download link, both pointing at the resume file', () => {
    render(
      <HelmetProvider>
        <Resume />
      </HelmetProvider>
    );
    expect(screen.getByTitle(/resume/i)).toHaveAttribute('data', '/resume-placeholder.pdf');
    const downloadLink = screen.getByRole('link', { name: /download/i });
    expect(downloadLink).toHaveAttribute('href', '/resume-placeholder.pdf');
    expect(downloadLink).toHaveAttribute('download');
  });
});
