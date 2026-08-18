import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const groups = [...html.matchAll(/<details class="worksheet-group" data-access-group="([^"]+)">[\s\S]*?<\/details>/g)];
const groupByName = new Map(groups.map((match) => [match[1], match[0]]));

assert.equal(groups.length, 2, 'Domestic maps and space observation must each use one disclosure menu.');

const koreaMaps = groupByName.get('korea-maps') || '';
assert.ok(koreaMaps, 'The domestic-map tools must be grouped in one disclosure menu.');
assert.match(koreaMaps, /<strong>국내 지도<\/strong><small>\(Korea Maps\)<\/small>/);
assert.match(koreaMaps, /data-content-paths="learning\/academics\/korean-museum\/\|learning\/academics\/korea-travel-map\/"/);
for (const [href, label] of [
  ['learning/academics/korean-museum/', '한국사 유물·유적'],
  ['learning/academics/korea-travel-map/', '국내 여행 지도'],
]) {
  assert.match(koreaMaps, new RegExp(`href="${href}"[^>]*data-access-parent="korea-maps"[\\s\\S]*?<strong>${label}<\\/strong>`));
}
assert.doesNotMatch(koreaMaps, /learning\/academics\/east-asia-history-lab\/|한국사 지도/);

const space = groupByName.get('space-observation') || '';
assert.ok(space, 'Space observation must be grouped directly on the portal.');
assert.match(space, /data-content-paths="learning\/academics\/space\/"/);
const orderedSpaceItems = [
  ['learning/academics/space/solar-system/', '태양계'],
  ['learning/academics/space/constellations/', '별과 별자리'],
  ['learning/academics/space/earth-moon/', '지구와 달의 운동'],
];
let previousIndex = -1;
for (const [href, label] of orderedSpaceItems) {
  const itemPattern = new RegExp(`href="${href}"[^>]*data-access-parent="space-observation"[\\s\\S]*?<strong>${label}<\\/strong>`);
  assert.match(space, itemPattern);
  const itemIndex = space.indexOf(`href="${href}"`);
  assert.ok(itemIndex > previousIndex, `Space item ${label} must follow the requested order.`);
  previousIndex = itemIndex;
}
assert.doesNotMatch(html, /<a href="learning\/academics\/space\/"/);

assert.match(html, /body\.content-access-editing \.worksheet-group-options \{[\s\S]*?display: none;/);
assert.match(html, /Promise\.all\(paths\.map\(\(path\) => api\('\/api\/teacher\/home-content-access'/);
assert.match(html, /하위 메뉴는 상위 설정을 함께 따릅니다/);
assert.match(html, /@media \(max-width: 600px\)[\s\S]*?\.worksheet-group-options \{[\s\S]*?position: static;/);

console.log('Grouped Discover menus and inherited access contract passed.');
