import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const group = html.match(/<details class="worksheet-group">[\s\S]*?<\/details>/)?.[0] || '';

assert.ok(group, 'The domestic-map tools must be grouped in one disclosure menu.');
assert.match(group, /<strong>국내 지도<\/strong><small>\(Korea Maps\)<\/small>/);
assert.equal((html.match(/<details class="worksheet-group">/g) || []).length, 1);

for (const [href, label] of [
  ['learning/academics/korean-museum/', '한국사 유물·유적'],
  ['learning/academics/korea-travel-map/', '국내 여행 지도'],
]) {
  assert.match(group, new RegExp(`href="${href}"[\\s\\S]*?<strong>${label}<\\/strong>`));
}

assert.equal((group.match(/data-requires-player="true"/g) || []).length, 2);
assert.doesNotMatch(group, /learning\/academics\/east-asia-history-lab\/|한국사 지도/);
assert.match(html, /@media \(max-width: 600px\)[\s\S]*?\.worksheet-group-options \{[\s\S]*?position: static;/);

console.log('Domestic map disclosure menu contract passed.');
