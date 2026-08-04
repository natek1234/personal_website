import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { writeFileSync } from 'node:fs';

const doc = await PDFDocument.create();
const page = doc.addPage([612, 792]);
const font = await doc.embedFont(StandardFonts.HelveticaBold);
const bodyFont = await doc.embedFont(StandardFonts.Helvetica);

page.drawText('Ketan Vasudeva', { x: 50, y: 720, size: 24, font, color: rgb(0.13, 0.11, 0.11) });
page.drawText('Aerospace Engineer & Researcher', { x: 50, y: 695, size: 14, font: bodyFont });
page.drawText('Full resume coming soon — this is a placeholder.', { x: 50, y: 660, size: 12, font: bodyFont });

const bytes = await doc.save();
writeFileSync('public/resume-placeholder.pdf', bytes);
console.log('Wrote public/resume-placeholder.pdf');
