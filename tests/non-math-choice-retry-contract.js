const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

const retryBanks = [
  ['대항해시대', 'learning/academics/age-of-exploration/server.js', /incorrectIndexes/],
  ['독해', 'learning/basics/reading/app.js', /다시 생각하고 다른 답을 골라보세요/],
  ['맞춤법', 'learning/basics/spelling/app.js', /다시 생각하고 다른 답을 골라보세요/],
  ['속담', 'learning/basics/proverbs/app.js', /다시 생각하고 다른 답을 골라보세요/],
  ['한자성어', 'learning/basics/classical-chinese-idioms/app.js', /다른 답을 골라보세요/],
  ['어휘', 'learning/basics/vocabulary/app.js', /다시 생각하고 다른 그림을 골라보세요/],
  ['인체', 'learning/academics/body-explorer/app.js', /button\.disabled = true;[\s\S]{0,180}button\.classList\.add\("is-wrong"\)/],
  ['한국 문화유산', 'learning/academics/korean-museum/treasure-map.js', /다시 생각하고 다른 답을 골라보세요/],
  ['주기율표', 'learning/academics/periodic-table/app.js', /다시 생각하고 다른 답을 골라보세요/],
  ['지진파와 진앙', 'learning/academics/science-lab/earthquake/app.js', /다시 생각하고 다른 답을 골라보세요/],
  ['용해도', 'learning/academics/science-lab/solubility/app.js', /다시 생각하고 다른 답을 골라보세요/],
  ['별과 별자리', 'learning/academics/space/constellations/app.js', /다시 생각하고 다른 답을 골라보세요/],
  ['지구와 달', 'learning/academics/space/earth-moon/app.js', /다시 생각하고 다른 답을 골라보세요/],
  ['태양계', 'learning/academics/space/solar-system/app.js', /다시 생각하고 다른 답을 골라보세요/],
  ['클래식 음악', 'learning/arts/classical-music/app.js', /다시 생각하고 다른 답을 골라보세요/],
  ['음악', 'learning/arts/music-studio/app.js', /다시 들어보세요/],
  ['미술 감상', 'learning/arts/art-appreciation/museum/museum.js', /다시 생각하고 다른 답을 골라보세요/]
];

for (const [name, file, retryPattern] of retryBanks) {
  assert.match(read(file), retryPattern, `${name}: 오답 뒤 정답을 다시 고르는 흐름이 필요합니다.`);
}

assert.doesNotMatch(
  read('learning/basics/reading/app.js'),
  /feedback\.textContent = `\$\{correct \? "정답 · " : "오답 · "\}/,
  '독해 문제는 첫 오답에 해설을 공개하면 안 됩니다.'
);
assert.doesNotMatch(
  read('learning/academics/periodic-table/app.js'),
  /아쉽네요! 정답은/,
  '주기율표 문제는 첫 오답에 정답을 공개하면 안 됩니다.'
);
assert.doesNotMatch(
  read('learning/academics/space/solar-system/app.js'),
  /오답입니다\. 정답은/,
  '태양계 문제는 첫 오답에 정답을 공개하면 안 됩니다.'
);

console.log(`non-math choice retry contract: ${retryBanks.length} banks validated`);
