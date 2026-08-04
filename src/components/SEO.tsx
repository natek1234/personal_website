import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://ketanvasudeva.com';

export function SEO({ title, description, path }: { title: string; description: string; path: string }) {
  const fullTitle = `${title} | Ketan Vasudeva`;
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}
