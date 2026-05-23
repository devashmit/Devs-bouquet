const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = path.join(__dirname, '../public/assets/template/foliage_base.png');
const OUT = path.join(__dirname, '../public/assets/greenery');

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

async function main() {
  const meta = await sharp(SRC).metadata();
  console.log(`Source: ${meta.width}x${meta.height}`);

  const variants = [
    { name: 'eucalyptus',  rotate: 0,   tint: null },
    { name: 'fern',        rotate: 15,  tint: { r:0, g:20, b:0 } },
    { name: 'ruscus',      rotate: -10, tint: { r:0, g:10, b:5 } },
    { name: 'olive',       rotate: 8,   tint: { r:10, g:15, b:0 } },
    { name: 'salal',       rotate: -5,  tint: null },
    { name: 'babys_breath',rotate: 20,  tint: { r:20, g:20, b:20 } },
    { name: 'lavender',    rotate: -15, tint: { r:10, g:0, b:20 } },
    { name: 'ivy',         rotate: 12,  tint: { r:0, g:25, b:5 } },
  ];

  for (const v of variants) {
    let pipeline = sharp(SRC).rotate(v.rotate, { background: { r:0,g:0,b:0,alpha:0 } });
    if (v.tint) {
      pipeline = pipeline.tint(v.tint);
    }
    const dest = path.join(OUT, `${v.name}.png`);
    await pipeline.toFile(dest);
    console.log(`✓ ${v.name}.png`);
  }
  console.log('Done!');
}

main().catch(console.error);
