/* 넣기 전에 칸마다 한쪽 분량을 보여 준다.
 *
 * 채워지는 줄 수는 글자 수만으로 정해지지 않는다. 문단이 하나 늘면 줄도 하나 는다.
 * 명작동화 42권을 재 보니 **한쪽에 85~100자, 문단 4개**가 기준이었다.
 * 글자만 채우고 문단이 두셋이면 줄이 안 차고, 짧은 대사만 늘어놓아도 글이 얇아진다.
 *
 * 쓰는 법:  node tools-count.mjs 바꿀글.json          — 새로 쓴 글을 잰다
 *          node tools-count.mjs --book 책이름         — 이미 들어 있는 글을 잰다 */
import fs from 'fs';

const LO = 85, HI = 100, LOP = 4;

let beats;
if (process.argv[2] === '--book') {
  const s = fs.readFileSync(process.argv[3] + '/app.js', 'utf8');
  const i = s.indexOf('const CHAPTERS');
  const CH = eval('(' + s.slice(s.indexOf('[', i), s.indexOf('\n];', i) + 2) + ')');
  beats = CH.flatMap(c => c.beats || []);
} else {
  beats = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
}

const len = a => a.join('').replace(/\s/g, '').length;
const mark = (c, p) => (c < LO ? '글자↓' : c > HI ? '글자↑' : '    ')
  + (p < LOP ? ' 문단↓' : '     ');

let sum = 0, par = 0, thin = 0;
beats.forEach((b, i) => {
  const lc = len(b.left), rc = len(b.right);
  console.log(String(i + 1).padStart(3) + '  ' + (b.art || '').padEnd(20)
    + '왼 ' + String(lc).padStart(3) + '자 ' + b.left.length + '문단 ' + mark(lc, b.left.length)
    + '  오 ' + String(rc).padStart(3) + '자 ' + b.right.length + '문단 ' + mark(rc, b.right.length));
  sum += lc + rc;
  par += b.left.length + b.right.length;
  if (lc < LO || b.left.length < LOP) thin++;
  if (rc < LO || b.right.length < LOP) thin++;
});
const n = beats.length * 2;
console.log('\n한쪽 평균 ' + Math.round(sum / n) + '자 · 문단 ' + (par / n).toFixed(1) + '개'
  + '   (바라는 값 85~100자 · 4문단)   모자란 쪽 ' + thin + '/' + n);
