import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const groups = [...html.matchAll(/<details class="worksheet-group" data-access-group="([^"]+)">[\s\S]*?<\/details>/g)];
const groupByName = new Map(groups.map((match) => [match[1], match[0]]));

for (const groupName of ['idiomatic-language', 'story-books', 'information-computing', 'korea-maps', 'space-observation', 'music-theory']) {
  assert.ok(groupByName.has(groupName), `Missing disclosure menu: ${groupName}`);
}

const storyBooks = groupByName.get('story-books') || '';
assert.match(storyBooks, /data-content-paths="learning\/literacy-numeracy\/story-books\/"/);
assert.ok(
  html.indexOf('data-access-group="story-books"') < html.indexOf('aria-labelledby="exploration-title"'),
  'Story books must remain in the literacy and numeracy section.',
);

const koreaMaps = groupByName.get('korea-maps') || '';
assert.ok(koreaMaps, 'The domestic-map tools must be grouped in one disclosure menu.');
assert.match(koreaMaps, /<strong>국내 지도<\/strong><small>\(Korea Maps\)<\/small>/);
assert.match(koreaMaps, /data-content-paths="learning\/inquiry\/korean-museum\/\|learning\/inquiry\/korea-travel-map\/\|learning\/inquiry\/korea-geography\/"/);
for (const [href, label, englishLabel] of [
  ['learning/inquiry/korean-museum/', '유물·유적', 'Artifacts &amp; Sites'],
  ['learning/inquiry/korea-travel-map/', '체험·관광', 'Experiences &amp; Tourism'],
  ['learning/inquiry/korea-geography/', '한국지리 수능', 'Korean Geography CSAT'],
]) {
  assert.match(koreaMaps, new RegExp(`href="${href}"[^>]*data-access-parent="korea-maps"[\\s\\S]*?<strong>${label}<\\/strong><small>\\(${englishLabel}\\)<\\/small>`));
}

const idiomaticLanguage = groupByName.get('idiomatic-language') || '';
assert.ok(idiomaticLanguage, 'Idiomatic language tools must be grouped in one disclosure menu.');
assert.match(idiomaticLanguage, /<strong>관용 표현<\/strong><small>\(Idioms &amp; Proverbs\)<\/small>/);
assert.match(idiomaticLanguage, /data-content-paths="learning\/literacy-numeracy\/idiomatic-expressions\/\|learning\/literacy-numeracy\/proverbs\/\|learning\/literacy-numeracy\/classical-chinese-idioms\/"/);
const orderedIdiomaticItems = [
  ['learning/literacy-numeracy/idiomatic-expressions/', '관용어'],
  ['learning/literacy-numeracy/proverbs/', '속담'],
  ['learning/literacy-numeracy/classical-chinese-idioms/', '한자성어'],
];
let previousIdiomaticIndex = -1;
for (const [href, label] of orderedIdiomaticItems) {
  assert.match(idiomaticLanguage, new RegExp(`href="${href}"[^>]*data-access-parent="idiomatic-language"[\\s\\S]*?<strong>${label}<\\/strong>`));
  const itemIndex = idiomaticLanguage.indexOf(`href="${href}"`);
  assert.ok(itemIndex > previousIdiomaticIndex, `Idiomatic-language item ${label} must follow the requested order.`);
  previousIdiomaticIndex = itemIndex;
}

const space = groupByName.get('space-observation') || '';
assert.ok(space, 'Space observation must be grouped directly on the portal.');
assert.match(space, /data-content-paths="learning\/inquiry\/space\/"/);
const orderedSpaceItems = [
  ['learning/inquiry/space/solar-system/', '태양계'],
  ['learning/inquiry/space/constellations/', '별과 별자리'],
  ['learning/inquiry/space/earth-moon/', '지구와 달의 운동'],
];
let previousIndex = -1;
for (const [href, label] of orderedSpaceItems) {
  const itemPattern = new RegExp(`href="${href}"[^>]*data-access-parent="space-observation"[\\s\\S]*?<strong>${label}<\\/strong>`);
  assert.match(space, itemPattern);
  const itemIndex = space.indexOf(`href="${href}"`);
  assert.ok(itemIndex > previousIndex, `Space item ${label} must follow the requested order.`);
  previousIndex = itemIndex;
}
assert.doesNotMatch(html, /<a href="learning\/inquiry\/space\/"/);

assert.match(html, /body\.content-access-editing \.worksheet-group-options \{[\s\S]*?display: none;/);
assert.match(html, /Promise\.all\(paths\.map\(\(path\) => api\('\/api\/teacher\/home-content-access'/);
assert.match(html, /하위 메뉴는 상위 설정을 함께 따릅니다/);
assert.match(html, /@media \(max-width: 600px\)[\s\S]*?\.worksheet-group-options \{[\s\S]*?position: static;/);

console.log('Grouped learning menus and inherited access contract passed.');
