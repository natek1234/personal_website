import type { ContactLink } from '../../types/content';

export type IconProps = { className?: string };

export const stroke = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function EmailIcon({ className }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="M4.5 7 12 13l7.5-6" />
    </svg>
  );
}

export function GithubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="12" cy="10.5" r="6" />
      <polygon points="8,6.5 9.5,9.5 6.8,8.7" />
      <polygon points="16,6.5 14.5,9.5 17.2,8.7" />
      <path
        d="M8.7 19.5c-.1-1.9.7-2.8 2.8-3s2.9 1.1 2.8 3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LinkedinIcon({ className }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <text x="12" y="16.5" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="sans-serif" fill="currentColor" stroke="none">
        in
      </text>
    </svg>
  );
}

function ScholarIcon({ className }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden="true">
      <path d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9Z" fill="currentColor" stroke="none" />
      <path d="M6.5 11v4c0 1.4 2.4 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4" />
      <path d="M21.5 9v6" />
    </svg>
  );
}

function OrcidIcon({ className }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" />
      <text x="12" y="15.5" textAnchor="middle" fontSize="9" fontWeight="600" fontFamily="sans-serif" fill="currentColor" stroke="none">
        iD
      </text>
    </svg>
  );
}

export const CONTACT_ICONS: Record<ContactLink['icon'], (props: IconProps) => React.JSX.Element> = {
  email: EmailIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  scholar: ScholarIcon,
  orcid: OrcidIcon,
};
