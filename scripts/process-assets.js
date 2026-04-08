import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FLOWERS_DIR = path.join(__dirname, '../public/assets/flowers');
const TEMPLATE_DIR = path.join(__dirname, '../public/assets/template');

if (!fs.existsSync(TEMPLATE_DIR)) {
  fs.mkdirSync(TEMPLATE_DIR, { recursive: true });
}

async function removeBackgroundAlpha(imagePath, targetSize) {
  console.log(`Processing with transparency: ${imagePath}`);
  try {
    let imgPipeline = sharp(imagePath);
    if (targetSize) {
      imgPipeline = imgPipeline.resize(targetSize.width, targetSize.height, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } });
    }

    const { data, info } = await imgPipeline
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (r > 230 && g > 230 && b > 230) {
        data[i + 3] = 0;
      } else if (r > 210 && g > 210 && b > 210) {
        const avg = (r + g + b) / 3;
        const diff = avg - 210; 
        const a = 255 - Math.min(255, diff * 10);
        data[i + 3] = Math.min(data[i + 3], a);
      }
    }

    const outputBuffer = await sharp(data, {
      raw: { width: info.width, height: info.height, channels: 4 }
    }).png().toBuffer();

    return outputBuffer;
  } catch (e) {
    console.error(`Error processing ${imagePath}:`, e);
    return null;
  }
}

async function processAll() {
  console.log('--- Processing Base Assets ---');
  const baseStemsDest = path.join(TEMPLATE_DIR, 'base_stems.png');
  const baseStemsSrc = path.join(TEMPLATE_DIR, 'base_stems_raw.png');
  if (fs.existsSync(baseStemsSrc)) {
    await sharp(baseStemsSrc).resize(800, 900, { fit: 'cover' }).toFile(baseStemsDest);
    console.log('Saved base_stems.png at 800x900px');
  }

  const ribbonDest = path.join(TEMPLATE_DIR, 'front_ribbon.png');
  const ribbonSrc = path.join(TEMPLATE_DIR, 'front_ribbon_raw.png');
  if (fs.existsSync(ribbonSrc)) {
    const result = await removeBackgroundAlpha(ribbonSrc, { width: 300, height: 250 });
    if (result) await sharp(result).toFile(ribbonDest);
    console.log('Saved front_ribbon.png with transparency at 300x250px');
  }

  console.log('--- Processing Flower Assets ---');
  if (fs.existsSync(FLOWERS_DIR)) {
    const files = fs.readdirSync(FLOWERS_DIR);
    for (const file of files) {
      if (file.endsWith('.png') && !file.includes('_raw.png')) {
        const filePath = path.join(FLOWERS_DIR, file);
        const tmpPath = path.join(FLOWERS_DIR, `tmp_${file}`);
        const result = await removeBackgroundAlpha(filePath, { width: 250, height: 250 });
        if (result) {
          await sharp(result).toFile(tmpPath);
          fs.renameSync(tmpPath, filePath);
          console.log(`Processed ${file} with transparency at 250x250px`);
        }
      }
    }
  }
  console.log('All processing complete!');
}

processAll();
