import { trace } from 'potrace';
import { writeFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SOURCE = resolve('scripts/.tmp/logo-source.png');
const OUT = resolve('src/assets/logo.svg');

readFileSync(SOURCE); // fail fast with a clear error if the source asset is missing

trace(SOURCE, { threshold: 128 }, (err, svg) => {
  if (err) throw err;
  writeFileSync(OUT, svg);
  console.log(`Wrote ${OUT}`);
});
