/* 「읽고 난 반응」의 틀린 보기가 같은 시험 다른 문항에서 답으로 새어 나가는지 본다.
   ㄱ형(사실이 어긋난 것)은 그 사실이 거짓이라는 것을 본문에서만 알아야 하는데,
   다른 문항이 "그런 일은 없었다"를 답으로 알려 주면 본문을 안 읽고도 고를 수 있다.
   무영탑과 콩쥐 팥쥐가 그렇게 걸렸다.

   세는 법은 전래동화 방 눈금을 그대로 쓴다. 겹치는 조각 수로 세면 흔한 낱말
   때문에 잡음이 묻힌다. 이어진 토막의 길이로 재고, 여섯 자를 넘을 때만 짚는다.

   버릴 것을 골라 주는 검사가 아니라 다시 볼 자리를 짚어 주는 눈금이다.
   ㄴ형(사실은 맞고 읽어 낸 것이 어긋난 것)은 사실 절이 겹치는 것이 당연하다. */
import fs from 'node:fs';
import { tally } from './seen.mjs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');

/* 두 글줄에 똑같이 이어져 나오는 가장 긴 토막. 띄어쓰기도 이어진 것으로 친다. */
function longestRun(a, b) {
    let best = '';
    for (let i = 0; i < a.length; i++) {
        for (let len = a.length - i; len > best.length; len--) {
            const piece = a.slice(i, i + len);
            if (/^[가-힣 ]+$/.test(piece) && b.includes(piece)) { best = piece; break; }
        }
    }
    return best.trim();
}

/* app.js에서 KR 문제만 떼어 온다. EN은 뒤에 따로 붙어 있으므로 앞쪽만 본다. */
function quizOf(src) {
    const i = src.indexOf('const QUIZ = [');
    if (i < 0) return null;
    const j = src.indexOf('const EN = {', i);
    const body = src.slice(i, j < 0 ? undefined : j);
    const k = body.indexOf('[');
    let depth = 0, end = -1;
    for (let p = k; p < body.length; p++) {
        if (body[p] === '[') depth++;
        else if (body[p] === ']' && --depth === 0) { end = p + 1; break; }
    }
    if (end < 0) return null;
    /* 이솝은 열쇠말에 따옴표가 없다. 붙여 주고 읽는다. */
    const src2 = body.slice(k, end)
        .replace(/([{,]\s*)(q|choices|answer|wide)\s*:/g, '$1"$2":')
        .replace(/,(\s*[\]}])/g, '$1');
    try { return JSON.parse(src2); }
    catch { return null; }
}

const LIMIT = 6;   // 이어진 토막이 여섯 자를 넘을 때만 짚는다
const books = fs.readdirSync(ROOT).filter(d => fs.existsSync(path.join(ROOT, d, 'app.js'))).sort();
let hit = 0;
const seen = tally(books.length);

for (const b of books) {
    const qz = quizOf(fs.readFileSync(path.join(ROOT, b, 'app.js'), 'utf8'));
    if (!qz) { seen.skip(b, '문제를 읽지 못했다'); continue; }
    const wideIdx = qz.findIndex(q => q.wide);
    if (wideIdx < 0) { seen.skip(b, '넓은 문항이 없다'); continue; }
    const wide = qz[wideIdx];

    /* 틀린 보기 = 답. 그 앞절(…한 것을 보면)이 사실을 담은 자리다. */
    const wrong = wide.choices[wide.answer] || '';
    const fact = (wrong.split('것을 보면')[0] || wrong).trim();
    if (fact.length < 8) continue;

    const lines = [];
    for (const [i, q] of qz.entries()) {
        if (i === wideIdx) continue;
        lines.push(['묻는 말 ' + (i + 1), q.q]);
        lines.push(['답 ' + (i + 1), q.choices[q.answer]]);
    }
    for (const [where, line] of lines) {
        const run = longestRun(fact, line || '');
        if (run.length > LIMIT) {
            hit++;
            console.log('## ' + b);
            console.log('   틀린 보기: ' + wrong);
            console.log('   ' + where + ': ' + line);
            console.log('   이어진 토막(' + run.length + '자): ' + run);
        }
    }
}

console.log('');
seen.report();
console.log('다시 볼 자리 ' + hit + '군데.');
console.log('ㄴ형은 사실 절이 겹치는 것이 당연하니, 짚혔다고 다 고칠 것은 아니다.');
