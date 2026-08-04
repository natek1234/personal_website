import sharp from 'sharp';

const SOURCE = 'public/images/headshot.jpg';

const buffer = await sharp(SOURCE)
  .resize({ width: 800, withoutEnlargement: true })
  .jpeg({ quality: 82, mozjpeg: true })
  .toBuffer();

await sharp(buffer).toFile(SOURCE + '.tmp');
const { renameSync } = await import('node:fs');
renameSync(SOURCE + '.tmp', SOURCE);

console.log(`Optimized ${SOURCE}: ${(buffer.length / 1024).toFixed(0)} KB`);
