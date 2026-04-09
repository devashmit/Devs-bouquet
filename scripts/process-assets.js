import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FLOWERS_DIR = path.join(__dirname, '../public/assets/flowers');

function isNearGrey(r, g, b, tolerance = 22) {
  const avg = (r + g + b) / 3;
  if (avg < 155) return false;
  const spread = Math.max(r, g, b) - Math.min(r, g, b);
  return spread < tolerance;
}

async function removeCheckerboard(filePath) {
  console.log(`Flood-fill processing: ${path.basename(filePath)}`);
  try {
    const { data, info } = await sharp(filePath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const w = info.width;
    const h = info.height;
    
    const checkerMask = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        if (a > 200 && isNearGrey(r, g, b, 22)) {
          checkerMask[y * w + x] = 1;
        }
      }
    }

    const visited = new Uint8Array(w * h);
    const background = new Uint8Array(w * h);
    const queue = [];

    // Seed edges
    for (let x = 0; x < w; x++) {
      if (checkerMask[x] && !visited[x]) { queue.push({x, y: 0}); visited[x] = 1; }
      const bottomIdx = (h-1)*w + x;
      if (checkerMask[bottomIdx] && !visited[bottomIdx]) { queue.push({x, y: h-1}); visited[bottomIdx] = 1; }
    }
    for (let y = 0; y < h; y++) {
      if (checkerMask[y*w] && !visited[y*w]) { queue.push({x: 0, y}); visited[y*w] = 1; }
      const rightIdx = y*w + w-1;
      if (checkerMask[rightIdx] && !visited[rightIdx]) { queue.push({x: w-1, y}); visited[rightIdx] = 1; }
    }

    const dirs = [[-1,0], [1,0], [0,-1], [0,1], [-1,-1], [-1,1], [1,-1], [1,1]];
    let qIdx = 0;
    
    // Process queue
    while (qIdx < queue.length) {
      const p = queue[qIdx++];
      const cy = p.y, cx = p.x;
      background[cy * w + cx] = 1;

      for (let i = 0; i < 8; i++) {
        const nx = cx + dirs[i][0];
        const ny = cy + dirs[i][1];
        if (nx >= 0 && ny >= 0 && nx < w && ny < h) {
          const idx = ny * w + nx;
          if (!visited[idx]) {
            visited[idx] = 1;
            const pxIdx = idx * 4;
            const r = data[pxIdx];
            const g = data[pxIdx + 1];
            const b = data[pxIdx + 2];
            const a = data[pxIdx + 3];

            if (checkerMask[idx] || (a > 200 && isNearGrey(r, g, b, 18))) {
              queue.push({x: nx, y: ny});
            }
          }
        }
      }
    }

    // Apply alpha 
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (background[y * w + x]) {
          data[(y * w + x) * 4 + 3] = 0; // Alpha 0
        }
      }
    }

    const tmpPath = filePath.replace('.png', '_tmp.png');
    await sharp(data, {
      raw: { width: w, height: h, channels: 4 }
    }).png().toFile(tmpPath);
    
    fs.renameSync(tmpPath, filePath);
    console.log(`Saved ${path.basename(filePath)} (Native Res Alpha BFS)`);
  } catch (e) {
    console.error(`Error processing ${filePath}:`, e);
  }
}

async function processAll() {
  // First ensure raw files are copied to remove contaminated states
  const files = fs.readdirSync(FLOWERS_DIR);
  for (const file of files) {
    if (file.endsWith('.png') && !file.includes('_raw.png') && !file.includes('harmonious_dream')) {
      await removeCheckerboard(path.join(FLOWERS_DIR, file));
    }
  }
  console.log('All BFS processing complete!');
}

processAll();
