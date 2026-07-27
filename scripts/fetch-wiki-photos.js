const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '..', 'learning', 'academics', 'korean-museum', 'assets', 'relics');

const TITLES = {
  p01: '빗살무늬토기',
  p02: '강화_고인돌',
  p03: '비파형_동검',
  p04: '팔주령',
  g01: '무용총',
  g02: '광개토대왕릉비',
  b01: '백제금동대향로',
  b02: '무령왕_금제관식',
  b03: '부여_정림사지_오층석탑',
  s01: '황남대총_금관',
  s02: '무구정광대다라니경',
  s03: '석굴암',
  s04: '천마도',
  k01: '청자_상감운학문_매병',
  k02: '합천_해인사_대장경판',
  k03: '직지심체요절',
  j01: '훈민정음',
  j02: '자격루',
  j03: '몽유도원도',
  l01: '씨름_(그림)',
  l02: '백자_달항아리',
  l03: '대동여지도',
  m01: '독립문',
  m02: '안중근',
  m03: '대한민국_임시정부'
};

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'AntigravityHistoryBot/1.0 (contact@example.com)'
      }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const options = {
      headers: {
        'User-Agent': 'AntigravityHistoryBot/1.0 (contact@example.com)'
      }
    };
    https.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const [key, title] of Object.entries(TITLES)) {
    const apiUrl = `https://ko.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&piprop=original|thumbnail&pithumbsize=800&format=json`;
    try {
      const data = await fetchJSON(apiUrl);
      const pages = data.query.pages;
      const pageKey = Object.keys(pages)[0];
      const page = pages[pageKey];
      const imgUrl = (page.thumbnail && page.thumbnail.source) || (page.original && page.original.source);
      if (imgUrl) {
        const dest = path.join(targetDir, `${key}.jpg`);
        await downloadFile(imgUrl, dest);
        console.log(`[SUCCESS] Downloaded ${key}.jpg for ${title} (${fs.statSync(dest).size} bytes)`);
      } else {
        console.log(`[NO IMAGE] No image found for ${title}`);
      }
    } catch (err) {
      console.error(`[ERROR] ${key} (${title}):`, err.message);
    }
  }
}

run();
