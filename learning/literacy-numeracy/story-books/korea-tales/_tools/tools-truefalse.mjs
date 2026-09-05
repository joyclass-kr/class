/* 틀린 보기가 본문에 그대로 있는지 본다.
   보통 문항의 오답이 본문에서 실제로 일어난 일이면 그것은 오답이 아니다.
   기계는 후보만 낸다 — 겹치는 토막이 우연일 수 있으니 눈으로 가려야 한다. */
import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.slice(1)), '..');
const only = process.argv.slice(2);
let seen = 0, read = 0;
const skip = [];

const flat = v => Array.isArray(v) ? v.flatMap(flat) : (typeof v === 'string' ? [v] : []);
const strip = s => s.replace(/<[^>]*>/g, '').replace(/\\"/g, '"').replace(/[^가-힣]/g, '');

/* 두 글줄이 함께 가진 가장 긴 토막(한글만, 띄어쓰기·토씨 무시) */
function run(a, b) {
  let best = '';
  for (let i = 0; i < a.length; i++)
    for (let len = a.length - i; len > best.length; len--) {
      const p = a.slice(i, i + len);
      if (b.includes(p)) { best = p; break; }
    }
  return best;
}

for (const bk of fs.readdirSync(ROOT).sort()) {
  if (bk.startsWith('_')) continue;
  const f = path.join(ROOT, bk, 'app.js');
  if (!fs.existsSync(f) || (only.length && !only.includes(bk))) continue;
  const src = fs.readFileSync(f, 'utf8');
  seen++;
  const ci = src.indexOf('const CHAPTERS = [');
  const qi = src.indexOf('\nconst QUIZ = [');
  /* 틀이 다른 책을 조용히 건너뛰면, 다 봤다고 말하면서 실은 안 본 것이 된다.
     옆방은 이솝만 const FABLES 라 예순여덟 권 가운데 한 권을 놓칠 뻔했다.
     그래서 못 본 책은 반드시 이름을 대고 종료값도 1로 돌린다. */
  if (ci < 0 || qi < 0) { skip.push(bk + ' — ' + (ci < 0 ? 'CHAPTERS' : 'QUIZ') + ' 를 못 찾았다'); continue; }
  let CH, Q;
  try {
    CH = eval('(' + src.slice(src.indexOf('[', ci), src.indexOf('\n];', ci) + 2) + ')');
    Q = eval('(' + src.slice(src.indexOf('[', qi), src.indexOf('\n];', qi) + 2) + ')');
  } catch (e) { skip.push(bk + ' — 읽다 실패: ' + String(e.message).split('\n')[0]); continue; }
  read++;
  const body = strip(CH.flatMap(c => c.paras ? flat(c.paras) : (c.beats || []).flatMap(x => flat([x.left, x.right]))).join(' '));
  const hits = [];
  Q.forEach((q, i) => {
    if (q.wide) return;                       // 「읽고 난 반응」은 오답도 실제 장면이어야 한다
    q.choices.forEach((c, ci2) => {
      if (ci2 === q.answer) return;
      const piece = run(strip(c), body);
      if (piece.length >= 5) hits.push('  ' + (i + 1) + '. ' + q.q + '\n     ✗ ' + c + '  ← 본문에 「' + piece + '」');
    });
  });
  if (hits.length) { console.log('## ' + bk); console.log(hits.join('\n')); }
}

console.log('');
console.log('본 책 ' + read + '권' + (seen !== read ? ' (' + seen + '권 가운데)' : '') + '.');
if (skip.length) {
    console.log('## 못 본 책 — 틀이 다르거나 읽다 실패했다');
    for (const x of skip) console.log('  ' + x);
    process.exitCode = 1;
}
console.log('기계는 후보만 낸다. 인물·곳·때가 다르면 좋은 오답이니 눈으로 가려야 한다.');
