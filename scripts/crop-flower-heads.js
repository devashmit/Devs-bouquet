/**
 * Crops flower PNGs to show only the flower head (top portion).
 * Saves cropped versions as *_head.png in the same directory.
 * 
 * Each flower has a different crop ratio based on where the head ends.
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const FLOWERS_DIR = path.join(__dirname, '../public/assets/flowers');

// headFraction: how much of the image height to keep (from top)
// These are tuned per flower based on where the stem starts
const CROPS = {
  'classic_red_rose.png':        { headFraction: 0.52 },
  'romantic_pink_peony.png':     { headFraction: 0.50 },
  'vibrant_sunflower.png':       { headFraction: 0.48 },
  'delicate_white_lily.png':     { headFraction: 0.52 },
  'textured_blue_hydrangea.png': { headFraction: 0.54 },
  'cheerful_daisy.png':          { headFraction: 0.50 },
};

async function cropFlowers() {
  for (const [filename, config] of Object.entries(CROPS)) {
    const inputPath = path.join(FLOWERS_DIR, filename);
    const outputName = filename.replace('.png', '_head.png');
    const outputPath = path.join(FLOWERS_DIR, outputName);

    if (!fs.existsSync(inputPath)) {
      console.log(`Skipping ${filename} — not found`);
      continue;
    }

    try {
      const meta = await sharp(inputPath).metadata();
      const cropHeight = Math.round(meta.height * config.headFraction);
      
      await sharp(inputPath)
        .extract({ left: 0, top: 0, width: meta.width, height: cropHeight })
        .toFile(outputPath);

      console.log(`✓ ${filename} → ${outputName} (${meta.width}×${cropHeight})`);
    } catch (err) {
      console.error(`✗ ${filename}: ${err.message}`);
    }
  }
  console.log('\nDone! Head crops saved.');
}

cropFlowers();
