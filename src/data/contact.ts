import type { ContactLink } from '../types/content';

export const contactLinks: ContactLink[] = [
  { id: 'email-personal', label: 'Email (personal)', value: 'ketanvasudeva@gmail.com', href: 'mailto:ketanvasudeva@gmail.com', icon: 'email' },
  { id: 'email-institutional', label: 'Email (institutional)', value: 'ketanvasudeva@arizona.edu', href: 'mailto:ketanvasudeva@arizona.edu', icon: 'email' },
  { id: 'github', label: 'GitHub', value: 'natek1234', href: 'https://github.com/natek1234', icon: 'github' },
  { id: 'linkedin', label: 'LinkedIn', value: 'ketan-vasudeva', href: 'https://linkedin.com/in/ketan-vasudeva-2305b7177', icon: 'linkedin' },
  { id: 'scholar', label: 'Google Scholar', value: 'Ketan Vasudeva', href: 'https://scholar.google.ca/citations?user=QWnS3tMAAAAJ&hl=en', icon: 'scholar' },
  { id: 'orcid', label: 'ORCID', value: '0009-0009-4647-4299', href: 'https://orcid.org/0009-0009-4647-4299', icon: 'orcid' },
];
