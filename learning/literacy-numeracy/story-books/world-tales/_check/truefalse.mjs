/* 사실을 묻는 문항에서, 틀린 보기가 본문에 그대로 있는지 본다.
   본문에 있는 일을 틀린 보기로 써 두면 답이 둘이 된다.

   `quiz.mjs`는 답이 본문에 "없는" 것을 짚는다. 이것은 거꾸로, 오답이 본문에
   "있는" 것을 짚는다. 전래동화 방이 만든 잣대를 그대로 가져왔다.

   ■ wide 문항은 건너뛴다 — 두 잣대가 정반대다
   「읽고 난 반응」의 오답은 실제 장면이어야 한다. 그래야 톤으로 안 걸린다.
   사실을 묻는 문항의 오답은 실제 장면이면 안 된다. 그래야 답이 하나가 된다.
   한 도구로 같이 재면 wide 쪽이 통째로 걸리므로 반드시 갈라 봐야 한다.

   ■ 걸린 것이 다 사고는 아니다
   인물이 다르거나, 곳이 다르거나, 때가 다르면 좋은 오답이다. 진짜 사고는
   묻는 말이 가리키는 그 자리에서 그 일이 실제로 일어난 때뿐이다. */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const LIMIT = 5;   // 이어진 토막이 다섯 자를 넘을 때만 짚는다

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

function quizOf(src) {
    const i = src.indexOf('const QUIZ');
    if (i < 0) return null;
    const j = src.indexOf('const EN', i);
    const body = src.slice(i, j < 0 ? undefined : j);
    const k = body.indexOf('[');
    let depth = 0, end = -1;
    for (let p = k; p < body.length; p++) {
        if (body[p] === '[') depth++;
        else if (body[p] === ']' && --depth === 0) { end = p + 1; break; }
    }
    if (end < 0) return null;
    const s2 = body.slice(k, end)
        .replace(/([{,]\s*)(q|choices|answer|wide)\s*:/g, '$1"$2":')
        .replace(/,(\s*[\]}])/g, '$1');
    try { return JSON.parse(s2); } catch { return null; }
}

/* 본문만 뽑는다. 해설과 영어판은 뺀다. */
function storyText(src) {
    /* 이솝은 CHAPTERS 대신 FABLES로 묶어 둔다. */
    let i = src.indexOf('const CHAPTERS');
    if (i < 0) i = src.indexOf('const FABLES');
    if (i < 0) return '';
    let j = src.length;
    for (const mark of ['const AFTERWORD', 'const CHAPTER_SEGS', 'const COVER', 'const QUIZ', 'const EN']) {
        const k = src.indexOf(mark, i);
        if (k > 0 && k < j) j = k;
    }
    return [...src.slice(i, j).matchAll(/"((?:[^"\\]|\\.)*)"/g)].map(m => m[1]).join(' ');
}

const only = process.argv.slice(2);
const books = (only.length ? only : fs.readdirSync(ROOT).filter(d => !d.startsWith('_') && fs.existsSync(path.join(ROOT, d, 'app.js')))).sort();
let hit = 0;

for (const b of books) {
    const src = fs.readFileSync(path.join(ROOT, b, 'app.js'), 'utf8');
    const qz = quizOf(src);
    const story = storyText(src);
    if (!qz || !story) { console.log('## ' + b + ' — 읽지 못했습니다'); continue; }
    for (const [i, q] of qz.entries()) {
        if (q.wide) continue;                       // 두 잣대가 정반대다. 반드시 건너뛴다.
        for (const [ci, c] of q.choices.entries()) {
            if (ci === q.answer) continue;
            const run = longestRun(c, story);
            if (run.length > LIMIT) {
                hit++;
                console.log('## ' + b + ' ' + (i + 1) + '번');
                console.log('   묻는 말: ' + q.q);
                console.log('   정답: ' + q.choices[q.answer]);
                console.log('   오답인데 본문에 있음: ' + c + '   (토막 ' + run.length + '자: ' + run + ')');
            }
        }
    }
}

console.log('');
console.log('책 ' + books.length + '권, 다시 볼 자리 ' + hit + '군데.');
console.log('인물·곳·때가 다르면 좋은 오답이다. 묻는 그 자리에서 실제로 일어난 일일 때만 사고다.');
