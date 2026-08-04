import logoSource from '../assets/logo.svg?raw';

const themedSvg = logoSource
  .replace(/fill="[^"]*"/g, 'fill="currentColor"')
  .replace('<svg', '<svg role="img" aria-label="Ketan Vasudeva logo"');

export function Logo({ className }: { className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: themedSvg }} />;
}
