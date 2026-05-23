/**
 * Removes near-white backgrounds from greenery PNGs
 * by making pixels above a brightness threshold transparent.
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const DIR = path.join(__dirname, '../public/assets/greenery');
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.png'));

async function removeWhiteBackground(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8ClampedArray(data);
  const { width, height, channels } = info;

  for (let i = 0; i < pixels.length; i += channels) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    // If pixel is near-white or near-light-grey, make transparent
    const brightness = (r + g + b) / 3;
    if (brightness > 230 && Math.max(r,g,b) - Math.min(r,g,b) < 30) {
      pixels[i + 3] = 0; // fully transparent
    } else if (brightness > 200 && Math.max(r,g,b) - Math.min(r,g,b) < 40) {
      // Semi-transparent for edge pixels
      pixels[i + 3] = Math.round(((255 - brightness) / 55) * 255);
    }
  }

  await sharp(pixels, { raw: { width, height, channels } })
    .png()
    .toFile(outputPath);
}

async function main() {
  for (const file of files) {
    const p = path.join(DIR, file);
    const tmp = p.replace('.png', '_tmp.png');
    try {
      await removeWhiteBackground(p, tmp);
      fs.renameSync(tmp, p);
      console.log(`✓ ${file}`);
    } catch(e) {
      console.error(`✗ ${file}: ${e.message}`);
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    }
  }
  console.log('Done!');
}

main();
