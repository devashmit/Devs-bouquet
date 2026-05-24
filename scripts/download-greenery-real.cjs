/**
 * Downloads real botanical bouquet base PNGs from free CDN sources.
 * These are actual watercolor/botanical illustration images.
 */
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../public/assets/greenery');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// Free botanical bouquet base images from open sources
const IMAGES = [
  {
    name: 'romantic',
    // Watercolor eucalyptus + flowers bouquet base - Wikimedia Commons
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Eucalyptus_bouquet_watercolor.jpg/400px-Eucalyptus_bouquet_watercolor.jpg',
    fallback: null
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    proto.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlinkSync(dest);
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', err => {
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function main() {
  for (const img of IMAGES) {
    const ext = img.url.includes('.png') ? '.png' : '.jpg';
    const dest = path.join(OUT, img.name + ext);
    try {
      await download(img.url, dest);
      const stat = fs.statSync(dest);
      console.log(`✓ ${img.name}${ext} (${Math.round(stat.size/1024)}KB)`);
    } catch(e) {
      console.error(`✗ ${img.name}: ${e.message}`);
    }
  }
}

main();
