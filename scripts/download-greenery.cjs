const https = require('https');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '../public/assets/greenery');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Free botanical illustration PNGs from Wikimedia Commons (public domain)
const GREENERY = [
  {
    name: 'eucalyptus',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Eucalyptus_cinerea_-_Argyle_apple_-_Flickr_-_Tatters_%E2%9C%BF_%281%29.jpg/320px-Eucalyptus_cinerea_-_Argyle_apple_-_Flickr_-_Tatters_%E2%9C%BF_%281%29.jpg'
  },
  {
    name: 'fern',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Single_leaf_of_Nephrolepis_exaltata.jpg/320px-Single_leaf_of_Nephrolepis_exaltata.jpg'
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', err => { fs.unlinkSync(dest); reject(err); });
  });
}

async function main() {
  for (const g of GREENERY) {
    const dest = path.join(OUT_DIR, `${g.name}.jpg`);
    try {
      await download(g.url, dest);
      console.log(`✓ ${g.name}`);
    } catch(e) {
      console.error(`✗ ${g.name}: ${e.message}`);
    }
  }
}

main();
