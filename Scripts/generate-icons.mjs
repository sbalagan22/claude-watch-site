// Every raster brand asset derives from one master: the gradient mark in
// design/claude_watch_app_icon-removebg-preview.png. Icons composite it onto
// the charcoal tile; the hero uses it bare.
import sharp from 'sharp';
import { mkdirSync } from 'fs';

const MASTER = 'design/claude_watch_app_icon-removebg-preview.png';
const CHARCOAL = { r: 0x14, g: 0x14, b: 0x13, alpha: 1 };

// Trim to the artwork so it centres optically, then pad.
const trimmed = await sharp(MASTER).trim({ threshold: 8 }).png().toBuffer();

async function tile(size, out, { inset = 0.16 } = {}) {
  const radius = Math.round(size * 0.2237);   // macOS icon corner ratio
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#fff"/></svg>`);
  const inner = Math.round(size * (1 - inset * 2));
  const mark = await sharp(trimmed).resize(inner, inner, { fit: 'inside' }).png().toBuffer();
  const m = await sharp(mark).metadata();
  await sharp({ create: { width: size, height: size, channels: 4, background: CHARCOAL } })
    .composite([
      { input: mark, left: Math.round((size - m.width) / 2), top: Math.round((size - m.height) / 2) },
      { input: mask, blend: 'dest-in' },
    ])
    .png().toFile(out);
  console.log(`${out}  ${size}x${size}`);
}

mkdirSync('public/brand', { recursive: true });
for (const [s, out] of [
  [16, 'public/favicon-16.png'], [32, 'public/favicon-32.png'], [48, 'public/favicon-48.png'],
  [180, 'public/apple-touch-icon.png'], [192, 'public/favicon-192.png'],
  [192, 'public/brand/icon-192.png'], [512, 'public/brand/icon-512.png'], [1024, 'public/brand/icon-1024.png'],
]) await tile(s, out, { inset: s <= 48 ? 0.08 : 0.16 });

// The bare mark for the page, at a few sizes, as WebP + PNG fallback.
for (const s of [64, 160, 320, 640, 1024]) {
  await sharp(trimmed).resize(s, s, { fit: 'inside' }).webp({ quality: 92 }).toFile(`public/brand/mark-${s}.webp`);
  await sharp(trimmed).resize(s, s, { fit: 'inside' }).png().toFile(`public/brand/mark-${s}.png`);
}
console.log('bare marks 64..1024 written');
