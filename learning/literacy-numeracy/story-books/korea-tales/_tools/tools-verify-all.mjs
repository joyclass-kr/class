// 전래동화 62권을 통째로 검증한다. 브라우저 없이 잡히는 것만 본다.
//     node tools-verify-all.mjs
import fs from 'fs';
import path from 'path';

const BOOKS = path.dirname(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')));  // _tools/ 위가 책 폴더
const issues = [];
const bad = (s, k, m) => issues.push([s, k, m]);

function grab(src, name) {
  const i = src.indexOf('const ' + name + ' = [');
  if (i < 0) return null;
  const j = src.indexOf('\n];', i);
  if (j < 0) return null;
  try { return eval('(' + src.slice(src.indexOf('[', i), j + 2) + ')'); }
  catch { return 'ERR'; }
}

const slugs = fs.readdirSync(BOOKS).filter(n => fs.existsSync(path.join(BOOKS, n, 'app.js'))).sort();
let nBeat = 0, nQ = 0, nChar = 0, nPic = 0, nNovel = 0;

for (const slug of slugs) {
  const src = fs.readFileSync(path.join(BOOKS, slug, 'app.js'), 'utf8');

  // ── 문항 ──────────────────────────────────────────────
  const QZ = grab(src, 'QUIZ');
  if (!QZ || QZ === 'ERR') bad(slug, '문항', 'QUIZ를 못 읽음');
  else {
    nQ += QZ.length;
    if (QZ.length < 5) bad(slug, '문항', `${QZ.length}개뿐`);
    const seen = new Set(), pos = [];
    for (const it of QZ) {
      if (!it.q || !it.choices) { bad(slug, '문항', '모양이 다름'); continue; }
      pos.push(it.answer);
      /* 「읽고 난 반응」만 보기가 넷이다. 나머지는 셋이어야 한다. */
      const want = it.wide ? 4 : 3;
      if (it.choices.length !== want) bad(slug, '문항', `보기 ${it.choices.length}개: ${it.q}`);
      if (!(it.answer >= 0 && it.answer < it.choices.length)) bad(slug, '문항', `정답 번호 벗어남: ${it.q}`);
      if (new Set(it.choices).size !== it.choices.length) bad(slug, '문항', `보기 중복: ${it.q}`);
      if (seen.has(it.q)) bad(slug, '문항', `같은 물음 두 번: ${it.q}`);
      seen.add(it.q);
      const a = it.choices[it.answer] || '';
      const other = it.choices.filter((_, i) => i !== it.answer).map(c => c.length);
      /* 「읽고 난 반응」은 보기가 다 한 문장이라 몇 자 차이는 표가 안 난다.
         그 대신 눈에 띄게 길면(다른 보기의 1.25배) 잡는다. */
      const gap = other.length ? a.length - Math.max(...other) : 0;
      const tooLong = it.wide ? a.length > Math.max(...other) * 1.25 : gap >= 4;
      if (other.length && tooLong)
        bad(slug, '문항', `정답이 ${gap}자 김: ${it.q}`);
    }
    if (pos.length > 3 && new Set(pos).size === 1) bad(slug, '문항', `정답이 전부 ${pos[0]}번 자리`);
  }

  // ── 본문 ──────────────────────────────────────────────
  const CH = grab(src, 'CHAPTERS');
  if (!CH || CH === 'ERR') { bad(slug, '본문', 'CHAPTERS를 못 읽음'); continue; }
  const isPic = CH.some(c => c.beats);
  isPic ? nPic++ : nNovel++;
  const check = (p, where) => {
    nChar += p.length;
    if ((p.match(/"/g) || []).length % 2) bad(slug, '본문', `따옴표 홀수 ${where}: ${p.slice(0, 36)}`);
    if (/ {2,}/.test(p)) bad(slug, '본문', `겹공백 ${where}: ${p.slice(0, 36)}`);
    if (p !== p.trim()) bad(slug, '본문', `앞뒤 공백 ${where}: ${p.slice(0, 36)}`);
    const o = (p.match(/<span class="gloss">/g) || []).length, c = (p.match(/<\/span>/g) || []).length;
    if (o !== c) bad(slug, '본문', `풀이말 태그 안 맞음 ${where}`);
    if (/[<>]/.test(p.replace(/<span class="gloss">|<\/span>|<br>/g, '')))
      bad(slug, '본문', `수상한 꺾쇠 ${where}: ${p.slice(0, 36)}`);
  };
  // 문단을 덧대다 보면 같은 말을 두 번 하거나 말꼬리가 겹치기 쉽다.
  // 눈으로 훑어서는 놓치니 여기서 잡는다.
  const dupCheck = (arr, where) => {
    const norm = p => p.replace(/\s|["'.,!?—…]/g, '');
    for (let i = 0; i < arr.length; i++) {
      const a = norm(arr[i]);
      for (let j = i + 1; j < arr.length; j++) {
        const b2 = norm(arr[j]);
        const n = Math.min(a.length, b2.length, 12);
        if (n >= 8 && (a.slice(0, n) === b2.slice(0, n) || a.slice(-n) === b2.slice(-n)))
          bad(slug, '본문', `같은 말이 두 번 ${where}: ${arr[j].slice(0, 30)}`);
      }
      if (i + 1 < arr.length) {
        const b2 = norm(arr[i + 1]);
        if (a.length >= 8 && b2.length >= 8 && a.slice(-7) === b2.slice(-7))
          bad(slug, '본문', `말꼬리가 잇달아 겹침 ${where}: ${arr[i + 1].slice(0, 30)}`);
      }
    }
  };
  for (const c of CH) {
    if (!c.title) bad(slug, '본문', `장 제목 없음 (num=${c.num})`);
    for (const b of (c.beats || [])) {
      nBeat++;
      if (!b.art) bad(slug, '본문', '그림 이름 없음');
      if (!b.emoji) bad(slug, '본문', `이모지 없음 (${b.art})`);
      for (const side of ['left', 'right']) {
        const arr = b[side] || [];
        if (!arr.length) bad(slug, '본문', `${side} 칸이 빔 (${b.art})`);
        arr.forEach(p => check(p, b.art + '/' + side));
        dupCheck(arr, b.art + '/' + side);
      }
    }
    (c.paras || []).forEach(p => { nBeat++; check(p, `${c.num}장`); });
  }
  // 교훈 쪽은 동화틀만 있다. 소설틀은 세 트랙 모두 이야기로 끝맺는 것이 규격이다.
  if (isPic) {
    const last = CH[CH.length - 1];
    if (!last.moral) bad(slug, '본문', '마지막 장에 교훈 없음');
    if (!last.question) bad(slug, '본문', '마지막 장에 물음 없음');
    const extra = CH.slice(0, -1).filter(c => c.moral);
    if (extra.length) bad(slug, '본문', `마지막이 아닌 장에도 교훈이 있음 (${extra.length}곳)`);
  }

  // ── 그림 파일 이름 ────────────────────────────────────
  const dir = path.join(BOOKS, slug, 'images');
  const have = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  const want = new Set([...src.matchAll(/["']([a-z0-9\-]+\.(?:png|webp))["']/g)].map(m => m[1]));
  for (const name of want) {
    const stem = name.replace(/\.(png|webp)$/, '');
    const real = have.filter(f => f.replace(/\.(png|webp)$/, '') === stem);
    if (real.length && !real.includes(name))
      bad(slug, '그림', `${name}를 부르는데 실제는 ${real.join(',')}`);
  }
}

console.log(`검사한 책 ${slugs.length}권 (동화틀 ${nPic} · 소설틀 ${nNovel}), 칸 ${nBeat}개, 문항 ${nQ}개, 본문 ${nChar.toLocaleString()}자`);
if (!issues.length) console.log('\n이상 없음');
else {
  console.log(`\n걸린 것 ${issues.length}개`);
  for (const [s, k, m] of issues.slice(0, 40)) console.log(`  [${s}] ${k}  ${m}`);
}
