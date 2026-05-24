/**
 * Creates 4 beautiful greenery variants from foliage_base.png
 * using different crops, rotations, and color treatments.
 * Removes white background to make them transparent.
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = path.join(__dirname, '../public/assets/template/foliage_base.png');
const OUT = path.join(__dirname, '../public/assets/greenery');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

async function removeWhiteBg(inputBuffer) {
  const { data, info } = await sharp(inputBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8ClampedArray(data);
  const { width, height, channels } = info;

  for (let i = 0; i < pixels.length; i += channels) {
    const r = pixels[i], g = pixels[i+1], b = pixels[i+2];
    const brightness = (r + g + b) / 3;
    const saturation = Math.max(r,g,b) - Math.min(r,g,b);
    if (brightness > 235 && saturation < 25) {
      pixels[i+3] = 0;
    } else if (brightness > 215 && saturation < 35) {
      pixels[i+3] = Math.round(((255 - brightness) / 40) * 255);
    }
  }

  return sharp(pixels, { raw: { width, height, channels } }).png().toBuffer();
}

async function main() {
  const variants = [
    {
      name: 'romantic',
      ops: (s) => s.rotate(0).modulate({ brightness: 1.0, saturation: 1.1, hue: 5 }),
    },
    {
      name: 'garden',
      ops: (s) => s.rotate(8, { background: { r:255,g:255,b:255,alpha:0 } }).modulate({ brightness: 1.05, saturation: 1.2, hue: -5 }),
    },
    {
      name: 'wildflower',
      ops: (s) => s.rotate(-8, { background: { r:255,g:255,b:255,alpha:0 } }).modulate({ brightness: 0.98, saturation: 0.95, hue: 15 }),
    },
    {
      name: 'elegant',
      ops: (s) => s.rotate(0).modulate({ brightness: 1.08, saturation: 0.85, hue: -10 }),
    },
  ];

  for (const v of variants) {
    try {
      const processed = await v.ops(sharp(SRC)).png().toBuffer();
      const transparent = await removeWhiteBg(processed);
      const dest = path.join(OUT, `${v.name}.png`);
      fs.writeFileSync(dest, transparent);
      console.log(`✓ ${v.name}.png`);
    } catch(e) {
      console.error(`✗ ${v.name}: ${e.message}`);
    }
  }
  console.log('Done!');
}

main();
