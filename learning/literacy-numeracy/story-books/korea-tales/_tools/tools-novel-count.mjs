/* 소설틀 책의 한쪽 글자 수를 잰다.
 *
 * 소설틀은 쪽나눔이 미리 박혀 있지 않고 열 때마다 재서 나눈다. 그래서 쪽수를
 * 파일만 보고는 알 수 없다. 대신 장 전체 글자를 세고, 명작소설 방이 쓰는 것과
 * 같은 셈(펼침면 수 × 2)으로 나눈다. 펼침면 수는 그림 수로 어림잡는다 —
 * slotPlan이 그림 한 장에 펼침면 하나를 주기 때문이다.
 *
 * 견줄 값 (명작소설 42권, 2026-08-25):
 *   한쪽 203~251자 · 문단 2.7~3.7개
 *   그림이 든 쪽은 글자가 절반쯤밖에 안 들어간다.
 *
 * 쓰는 법: node tools-novel-count.mjs [책이름 ...]
 */
import fs from 'fs';

const books = process.argv.slice(2).length ? process.argv.slice(2)
  : fs.readdirSync('.', { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);

const rows = [];
for (const b of books) {
  const p = b + '/app.js';
  if (!fs.existsSync(p)) continue;
  const src = fs.readFileSync(p, 'utf8');
  const i = src.indexOf('const CHAPTERS = [');
  if (i < 0) continue;
  let CH;
  try { CH = eval('(' + src.slice(src.indexOf('[', i), src.indexOf('\n];', i) + 2) + ')'); } catch { continue; }
  // 소설틀은 beats가 없고 paras를 쓴다
  if (CH.some(c => c.beats)) continue;
  let ch = 0, par = 0, arts = 0;
  for (const c of CH) {
    for (const t of (c.paras || [])) {
      // 태그를 걷어 내고 공백만 뺀다
      ch += t.replace(/<[^>]*>/g, '').replace(/\s/g, '').length;
      par++;
    }
    arts += (c.art && c.art.length) || 0;
  }
  // 그림 한 장에 펼침면 하나. 그림이 없는 장도 적어도 한 펼침면은 쓴다.
  const spreads = CH.reduce((n, c) => n + Math.max((c.art && c.art.length) || 0, 1), 0);
  const pages = spreads * 2;
  rows.push([Math.round(ch / pages), +(par / pages).toFixed(1), pages, arts, ch, b]);
}
rows.sort((a, b) => a[0] - b[0]);
console.log('한쪽글자 한쪽문단  쪽수 그림  본문글자  책');
for (const r of rows)
  console.log(String(r[0]).padStart(6) + '자' + String(r[1]).padStart(7) + '개'
    + String(r[2]).padStart(6) + String(r[3]).padStart(5) + String(r[4]).padStart(9) + '  ' + r[5]
    + (r[0] < 180 ? '  ← 얇음' : ''));
