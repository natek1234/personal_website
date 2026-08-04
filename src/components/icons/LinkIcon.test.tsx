import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LinkIcon } from './LinkIcon';

describe('LinkIcon', () => {
  it('renders a github icon for a github.com url', () => {
    const { container } = render(<LinkIcon url="https://github.com/example/repo" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders a spotify icon for a spotify.com url', () => {
    const { container } = render(<LinkIcon url="https://open.spotify.com/show/abc123" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders an instagram icon for an instagram.com url', () => {
    const { container } = render(<LinkIcon url="https://www.instagram.com/example" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders nothing for an unrecognized url, rather than a broken/generic icon', () => {
    const { container } = render(<LinkIcon url="https://example.com/paper.pdf" />);
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it('all rendered icons are hidden from the accessibility tree', () => {
    const { container } = render(<LinkIcon url="https://github.com/example/repo" />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });
});
