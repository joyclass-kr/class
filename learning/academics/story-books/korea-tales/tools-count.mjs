/* 넣기 전에 칸마다 한쪽 글자 수를 보여 준다.
 * 바라는 값은 한쪽 85~95자(공백 뺀 수). 그래야 1366×768에서 5.2~6.5줄이 찬다.
 * 쓰는 법:  node tools-count.mjs 바꿀글.json          — 새로 쓴 글을 잰다
 *          node tools-count.mjs --book 책이름         — 이미 들어 있는 글을 잰다 */
import fs from 'fs';

const LO = 85, HI = 100;

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
const mark = n => n < LO ? '모자람' : n > HI ? '넘칠라' : '좋음  ';
let sum = 0, thin = 0;
beats.forEach((b, i) => {
  const lc = len(b.left), rc = len(b.right);
  console.log(String(i + 1).padStart(3) + '  ' + (b.art || '').padEnd(20)
    + '왼 ' + String(lc).padStart(3) + '자/' + b.left.length + '문단 ' + mark(lc)
    + '   오 ' + String(rc).padStart(3) + '자/' + b.right.length + '문단 ' + mark(rc));
  sum += lc + rc;
  if (lc < LO) thin++;
  if (rc < LO) thin++;
});
const n = beats.length * 2;
console.log('\n한쪽 평균 ' + Math.round(sum / n) + '자 · 모자란 쪽 ' + thin + '/' + n);
