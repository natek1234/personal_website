/// <reference types="node" />
import { readFileSync, existsSync } from 'node:fs';
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
    expect(screen.getByTitle(/resume/i)).toHaveAttribute('data', '/ketan-vasudeva-resume.pdf');
    const downloadLink = screen.getByRole('link', { name: /download/i });
    expect(downloadLink).toHaveAttribute('href', '/ketan-vasudeva-resume.pdf');
    expect(downloadLink).toHaveAttribute('download');
  });

  it('the referenced PDF actually exists in public/ and is a real PDF file', () => {
    const path = 'public/ketan-vasudeva-resume.pdf';
    expect(existsSync(path)).toBe(true);
    const bytes = readFileSync(path);
    expect(bytes.subarray(0, 4).toString()).toBe('%PDF');
  });
});
