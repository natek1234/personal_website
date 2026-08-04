import sharp from 'sharp';

const SOURCE = 'src/assets/logo.svg';
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

async function render(size, outPath) {
  await sharp(SOURCE, { density: 300 })
    .resize(size, size, { fit: 'contain', background: TRANSPARENT })
    .png()
    .toFile(outPath);
  console.log(`Wrote ${outPath} (${size}x${size})`);
}

await render(180, 'public/apple-touch-icon.png');
await render(32, 'public/favicon-32x32.png');
