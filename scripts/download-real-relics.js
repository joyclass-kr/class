const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '..', 'learning', 'academics', 'korean-museum', 'assets', 'relics');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const REAL_RELIC_URLS = {
  p01: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Comb-Pattern_Pottery-Amsadong-01.jpg/800px-Comb-Pattern_Pottery-Amsadong-01.jpg',
  p02: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Ganghwa_Dolmen.jpg/800px-Ganghwa_Dolmen.jpg',
  p03: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Lute-shaped_bronze_dagger.jpg/800px-Lute-shaped_bronze_dagger.jpg',
  p04: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Eight-pointed_Bronze_Bell.jpg/800px-Eight-pointed_Bronze_Bell.jpg',

  g01: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Muyongchong_hunting_scene.jpg/800px-Muyongchong_hunting_scene.jpg',
  g02: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Gwanggaeto_Stele_1908.jpg/800px-Gwanggaeto_Stele_1908.jpg',
  g03: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Three-legged-crow.png/800px-Three-legged-crow.png',

  b01: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Gilt-bronze_Incense_Burner_of_Baekje.jpg/800px-Gilt-bronze_Incense_Burner_of_Baekje.jpg',
  b02: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Gold_Diadem_Ornaments_of_King_Muryeong.jpg/800px-Gold_Diadem_Ornaments_of_King_Muryeong.jpg',
  b03: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Five-story_Stone_Pagoda_at_Jeonglimsaji_Temple_Site.jpg/800px-Five-story_Stone_Pagoda_at_Jeonglimsaji_Temple_Site.jpg',

  s01: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Gold_Crown_from_Hwangnamdaechong.jpg/800px-Gold_Crown_from_Hwangnamdaechong.jpg',
  s02: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Mugujeonggwang_daedaranigyeong.jpg/800px-Mugujeonggwang_daedaranigyeong.jpg',
  s03: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Seokguram_Grotto.jpg/800px-Seokguram_Grotto.jpg',
  s04: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cheonmado.jpg/800px-Cheonmado.jpg',

  k01: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Celadon_Prunus_Vase_with_Inlaid_Cloud_and_Crane_Design.jpg/800px-Celadon_Prunus_Vase_with_Inlaid_Cloud_and_Crane_Design.jpg',
  k02: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Tripitaka_Koreana_Haeinsa.jpg/800px-Tripitaka_Koreana_Haeinsa.jpg',
  k03: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Jikji.jpg/800px-Jikji.jpg',

  j01: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Hunminjeongeum.jpg/800px-Hunminjeongeum.jpg',
  j02: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Jagyeongru.jpg/800px-Jagyeongru.jpg',
  j03: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Mongyudowondo.jpg/800px-Mongyudowondo.jpg',

  l01: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Kim_Hong-do-Ssireum.jpg/800px-Kim_Hong-do-Ssireum.jpg',
  l02: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/White_Porcelain_Moon_Jar.jpg/800px-White_Porcelain_Moon_Jar.jpg',
  l03: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Daedongyeojido.jpg/800px-Daedongyeojido.jpg',

  m01: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Dongnibmum.jpg/800px-Dongnibmum.jpg',
  m02: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/An_Jung-geun_calligraphy.jpg/800px-An_Jung-geun_calligraphy.jpg',
  m03: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_the_Provisional_Government_of_the_Republic_of_Korea.svg/800px-Flag_of_the_Provisional_Government_of_the_Republic_of_Korea.svg.png'
};

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };
    https.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Downloading real historical photographs from Wikimedia Commons...');
  for (const [id, url] of Object.entries(REAL_RELIC_URLS)) {
    const ext = url.endsWith('.png') ? '.png' : '.jpg';
    const filePath = path.join(targetDir, `${id}${ext}`);
    try {
      await downloadImage(url, filePath);
      console.log(`Downloaded ${id}${ext} successfully!`);
    } catch (err) {
      console.error(`Error downloading ${id}:`, err.message);
    }
  }
  console.log('All real historical photographs downloaded to assets/relics!');
}

main();
