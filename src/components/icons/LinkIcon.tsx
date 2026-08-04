import { GithubIcon, stroke, type IconProps } from './ContactIcons';

function SpotifyIcon({ className }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M7 9.7c3.2-1 7-1 10 0.9" />
      <path d="M7.5 12.7c2.6-0.8 6-0.5 8.3 0.9" />
      <path d="M8 15.6c2-0.5 4.6-0.3 6.2 0.8" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="16.8" cy="7.2" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

const LINK_ICON_MATCHERS: [pattern: string, icon: (props: IconProps) => React.JSX.Element][] = [
  ['github.com', GithubIcon],
  ['spotify.com', SpotifyIcon],
  ['instagram.com', InstagramIcon],
];

function resolveLinkIcon(url: string) {
  return LINK_ICON_MATCHERS.find(([pattern]) => url.includes(pattern))?.[1];
}

export function LinkIcon({ url, className }: { url: string; className?: string }) {
  const Icon = resolveLinkIcon(url);
  return Icon ? <Icon className={className} /> : null;
}
