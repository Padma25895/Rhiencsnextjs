const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'public', 'images', 'hero-bg.webp');
const destWebp = path.join(__dirname, '..', 'public', 'images', 'hero-bg.webp');
const destJpg = path.join(__dirname, '..', 'public', 'images', 'hero-bg.optimized.webp');

function stat(p) {
  try { return fs.statSync(p).size; } catch { return null; }
}

// Try sharp first
try {
  const sharp = require('sharp');
  sharp(src)
    .webp({ quality: 80, alphaQuality: 100, effort: 4 })
    .toFile(destWebp, (err) => {
      if (err) {
        console.error('Sharp WebP failed:', err.message || err);
      } else {
        console.log('Created WebP  :', destWebp, '→', stat(destWebp), 'bytes');
      }
      // Also create optimized jpeg as fallback
      sharp(src)
        .webp({ quality: 82, mozjpeg: true, progressive: true })
        .toFile(destJpg, (jerr) => {
          if (jerr) console.warn('Sharp JPG optimize failed:', jerr.message || jerr);
          else console.log('Optimized JPG:', destJpg, '→', stat(destJpg), 'bytes');
          process.exit(0);
        });
    });
} catch (e) {
  console.warn('Sharp unavailable, skipping WebP/JPG conversion. Install sharp: npm i -D sharp');
  console.warn('Original hero-bg.webp size:', stat(src), 'bytes');
  process.exit(0);
}
