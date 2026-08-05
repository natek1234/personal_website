export type DateRange = { start: string; end?: string };

export type Bullet = string | { text: string; url: string };

export type Project = {
  id: string;
  title: string;
  dateRange: DateRange;
  summary: string;
  description?: string;
  role?: string;
  tags: string[];
  links?: { label: string; url: string }[];
  image?: string;
  featured?: boolean;
  bullets?: Bullet[];
};

export type CVCategory = 'education' | 'work' | 'research' | 'publications' | 'talks' | 'awards' | 'grants' | 'service';

export type CVEntry = {
  id: string;
  category: CVCategory;
  title: string;
  org?: string;
  dateRange: DateRange;
  description?: string;
  bullets?: Bullet[];
};

export type Publication = {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: 'journal' | 'conference' | 'whitepaper' | 'thesis';
  description?: string;
  links?: { label: string; url: string }[];
};

export type ContactLink = {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: 'email' | 'github' | 'linkedin' | 'scholar' | 'orcid';
};
