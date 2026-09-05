/* 영어 문제를 영어 본문에 대고 잰다.
 *
 *   node _tools/tools-en-check.mjs            영어판이 있는 책 전부
 *   node _tools/tools-en-check.mjs tokkijeon  한 권
 *
 * 두 가지를 낸다.
 *   [정답이 본문에 안 보임]  정답의 알맹이 낱말이 본문에서 거의 안 나온다.
 *      옆방(세계명작)은 빨간 모자 영어 6번의 정답이 Shears 인데 본문은
 *      a pot of pepper 였다. 후춧가루는 보기에 아예 없었다 — 세 보기 가운데
 *      답이 하나도 없는 문항이었다. 이런 것은 오답 검사로는 못 잡는다.
 *   [틀린 보기가 본문에 있음]  truefalse 의 영어판. 한글은 글자로 재지만
 *      영어는 흔한 낱말에 묻히므로 낱말 단위로 재고 셋을 넘을 때만 짚는다.
 *
 * 기계는 후보만 낸다. 인물·곳·때가 다르면 좋은 오답이다. */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.slice(1)), '..');
const only = process.argv.slice(2);
const LIMIT_EN = 3;                       // 이어진 낱말이 셋을 넘을 때만 짚는다

const STOP = new Set(('a an the of to in on at for with and or but he she it they we you i him her them his '
  + 'their its our your my that this those these was were is are be been being had has have do did does not '
  + 'no so as by from up down out off over under then when what who which how why all any one two three '
  + 'into about after before again more most other some such only own same than too very can will just').split(' '));

const words = s => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);

function grab(src, marker) {
    const i = src.indexOf(marker);
    if (i < 0) return null;
    const s = src.indexOf('[', i);
    let d = 0, j = s;
    for (; j < src.length; j++) { if (src[j] === '[') d++; else if (src[j] === ']') { d--; if (!d) break; } }
    try { return eval('(' + src.slice(s, j + 1) + ')'); } catch { return null; }
}

/* 두 낱말줄이 함께 가진 가장 긴 이어진 토막의 낱말 수 */
function runLen(a, b) {
    let best = 0, bestP = '';
    for (let i = 0; i < a.length; i++)
        for (let len = a.length - i; len > best; len--) {
            const p = a.slice(i, i + len).join(' ');
            if (b.includes(' ' + p + ' ')) { best = len; bestP = p; break; }
        }
    return [best, bestP];
}

const 문제 = [];
let 잰책 = 0, 잰문항 = 0;
const skip = [];

for (const b of fs.readdirSync(ROOT).sort()) {
    if (b.startsWith('_')) continue;
    const f = path.join(ROOT, b, 'app.js');
    if (!fs.existsSync(f) || (only.length && !only.includes(b))) continue;
    const src = fs.readFileSync(f, 'utf8');
    if (!src.includes('\n    quiz: [')) continue;
    잰책++;
    const en = grab(src, '\n    quiz: [');
    const ch = grab(src, '\n    chapters: [');
    if (!en || !ch) { skip.push(b + ' — 영어 ' + (!en ? '문항' : '본문') + '을 못 읽었다'); continue; }
    /* 소설틀은 paras, 그림책틀은 beats 의 left/right 다. 좁쌀 한 톨만 그림책틀이라
       paras 만 읽다가 본문을 통째로 빈 것으로 잡고도 아무 말이 없었다.
       대사는 { t, v } 꼴이라 글줄만 줍다가 통째로 빠졌다. 대사에만 나오는 말을
       정답에 쓰면 「본문에 안 보임」이라고 잘못 일렀다. t 도 같이 줍는다. */
    const flat = v => Array.isArray(v) ? v.flatMap(flat)
        : (typeof v === 'string' ? [v]
        : (v && typeof v.t === 'string' ? [v.t] : []));
    const lines = ch.flatMap(c => c.paras ? flat(c.paras) : (c.beats || []).flatMap(x => flat([x.left, x.right])));
    const bodyW = lines.join(' ').replace(/<[^>]*>/g, ' ');
    const body = ' ' + words(bodyW).join(' ') + ' ';
    if (words(bodyW).length < 50) { skip.push(b + ' — 영어 본문이 ' + words(bodyW).length + '낱말뿐이다. 틀을 잘못 읽었을 것이다'); continue; }

    en.forEach((q, i) => {
        if (q.wide) return;                       // 「읽고 난 반응」은 본문에 없는 말로 쓴다
        잰문항++;
        const ans = words(q.choices[q.answer]).filter(w => !STOP.has(w));
        const 있는것 = ans.filter(w => body.includes(' ' + w + ' '));
        if (ans.length && 있는것.length === 0)
            문제.push('  [정답이 본문에 안 보임] ' + b + ' ' + (i + 1) + '. ' + q.q
                + '\n     ✔ ' + q.choices[q.answer] + '  ← 「' + ans.join(', ') + '」 가운데 본문에 있는 낱말이 없다');
        q.choices.forEach((c, k) => {
            if (k === q.answer) return;
            const [n, p] = runLen(words(c), body);
            if (n > LIMIT_EN)
                문제.push('  [틀린 보기가 본문에 있음] ' + b + ' ' + (i + 1) + '. ' + q.q
                    + '\n     ✗ ' + c + '  ← 본문에 「' + p + '」');
        });
    });
}

if (문제.length) console.log(문제.join('\n'));
console.log('\n영어판이 있는 책 ' + 잰책 + '권 · 문항 ' + 잰문항 + '개, 후보 ' + 문제.length + '군데.');
if (skip.length) { console.log('## 못 본 책'); console.log(skip.map(x => '  ' + x).join('\n')); process.exitCode = 1; }
console.log('기계는 후보만 낸다. 「정답이 본문에 안 보임」은 말만 바꿔 적은 것일 때가 많고,');
console.log('「틀린 보기가 본문에 있음」은 인물·곳·때가 다르면 좋은 오답이다.');
