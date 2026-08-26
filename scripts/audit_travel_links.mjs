import fs from 'node:fs/promises';
import vm from 'node:vm';

const mapDir = 'learning/inquiry/korea-travel-map';
const files = [
  'places.js', 'more-places.js', 'manual-places.js', 'supplement-places.js',
  'value-places.js', 'value-places-extra.js', 'regional-value-places.js',
  'regional-fun-places.js', 'official-link-overrides.js',
];
const context = vm.createContext({ window: {} });
for (const file of files) {
  vm.runInContext(await fs.readFile(`${mapDir}/${file}`, 'utf8'), context, { filename: file });
}

const places = context.window.KOREA_TRAVEL_PLACES || [];
const results = Array(places.length);
let cursor = 0;

function cleanTitle(html) {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '';
  return title.replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, ' ').replace(/\s+/g, ' ').trim();
}

async function inspect(place, index) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(place.officialUrl, {
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': 'Mozilla/5.0 travel-link-audit' },
    });
    const html = await response.text();
    results[index] = {
      id: place.id,
      name: place.name,
      url: place.officialUrl,
      status: response.status,
      finalUrl: response.url,
      title: cleanTitle(html),
    };
  } catch (error) {
    results[index] = {
      id: place.id,
      name: place.name,
      url: place.officialUrl,
      status: 0,
      error: error.name === 'AbortError' ? 'timeout' : error.message,
    };
  } finally {
    clearTimeout(timer);
  }
}

async function worker() {
  while (cursor < places.length) {
    const index = cursor++;
    await inspect(places[index], index);
  }
}

await Promise.all(Array.from({ length: 16 }, worker));
await fs.writeFile('scratch/travel-link-audit.json', JSON.stringify(results, null, 2));

const suspicious = results.filter((item) => {
  if (!item || item.status < 200 || item.status >= 400) return true;
  const sourceHost = new URL(item.url).hostname.replace(/^www\./, '');
  const finalHost = new URL(item.finalUrl).hostname.replace(/^www\./, '');
  if (sourceHost !== finalHost) return true;
  const title = item.title.toLowerCase();
  return !title || ['403', '404', 'error', 'access denied', '?ъ씠?몄뿉 ?곌껐?????놁쓬'].some((word) => title.includes(word));
});

console.log(JSON.stringify({ total: results.length, suspiciousCount: suspicious.length, suspicious }, null, 2));

