const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const pagePath = path.join(root, 'learning', 'arts', 'art-theory', 'index.html');
const scriptPath = path.join(root, 'learning', 'arts', 'art-theory', 'app.js');
const stylePath = path.join(root, 'learning', 'arts', 'art-theory', 'styles.css');

for (const file of [pagePath, scriptPath, stylePath]) {
  assert.ok(fs.existsSync(file), `${path.basename(file)} 파일이 필요합니다.`);
  assert.ok(fs.statSync(file).size > 100, `${path.basename(file)} 파일이 비어 있습니다.`);
}

const page = fs.readFileSync(pagePath, 'utf8');
const script = fs.readFileSync(scriptPath, 'utf8');
const portal = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

const requiredLessons = ['color-properties', 'color-mixing', 'color-harmony', 'obangsaek', 'visual-elements', 'visual-principles', 'space-composition'];
assert.doesNotMatch(page, /class="topbar"/, '화면 위를 가로지르는 헤더 바를 사용하지 않습니다.');
assert.match(page, /id="courseMenu"/, '첫 화면에 차시 목록이 필요합니다.');
assert.match(page, /색채 이론[\s\S]*data-open-lesson="obangsaek"/, '오방색은 색채 이론 안에 배치해야 합니다.');
const styles = fs.readFileSync(stylePath, 'utf8');
assert.doesNotMatch(styles, /h1, h2[^}]*6\.9rem/, '학습 제목에 포스터 크기의 글자를 사용하지 않습니다.');
for (const id of requiredLessons) {
  assert.match(page, new RegExp(`data-open-lesson="${id}"`), `${id} 차시 목록 항목이 필요합니다.`);
  assert.match(page, new RegExp(`data-lesson="${id}"`), `${id} 학습 화면이 필요합니다.`);
}
assert.strictEqual((page.match(/data-open-lesson=/g) || []).length, 7, '첫 화면에 7개 차시가 있어야 합니다.');

const ids = [...page.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
assert.strictEqual(new Set(ids).size, ids.length, '중복된 HTML id가 없어야 합니다.');

assert.match(script, /paint:[\s\S]*light:/, '물감과 빛의 색 혼합 자료가 필요합니다.');
assert.match(page, /id="mixIntersection"/, '혼합 결과는 두 원의 겹친 영역에 표시해야 합니다.');
assert.doesNotMatch(page, /id="mixResult"/, '겹침과 무관한 별도 결과 원을 사용하지 않습니다.');
assert.match(script, /black:[\s\S]*white:[\s\S]*yellow:[\s\S]*blue:[\s\S]*red:/, '다섯 오방색 자료가 필요합니다.');
assert.match(portal, /href="learning\/arts\/art-theory\/"/, '메인 포털에 미술 이론 링크가 필요합니다.');
assert.doesNotMatch(page, /art-appreciation|art-studio/, '차시 화면에 다른 서비스 유도 카드를 넣지 않습니다.');
assert.doesNotMatch(page, /정답 대신|근거를 말해요|눈으로 발견하고/, '미술 개념과 무관한 홍보 문구를 넣지 않습니다.');

console.log('미술 이론 페이지 계약 검사 통과');
