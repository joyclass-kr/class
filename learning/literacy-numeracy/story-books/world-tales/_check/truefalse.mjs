/* 사실을 묻는 문항에서, 틀린 보기가 본문에 그대로 있는지 본다.
   본문에 있는 일을 틀린 보기로 써 두면 답이 둘이 된다.

   `quiz.mjs`는 답이 본문에 "없는" 것을 짚는다. 이것은 거꾸로, 오답이 본문에
   "있는" 것을 짚는다. 전래동화 방이 만든 잣대를 그대로 가져왔다.

   ■ wide 문항은 건너뛴다 — 두 잣대가 정반대다
   「읽고 난 반응」의 오답은 실제 장면이어야 한다. 그래야 톤으로 안 걸린다.
   사실을 묻는 문항의 오답은 실제 장면이면 안 된다. 그래야 답이 하나가 된다.
   한 도구로 같이 재면 wide 쪽이 통째로 걸리므로 반드시 갈라 봐야 한다.

   ■ 영어판도 같이 재야 한다
   영어 문제는 한글 문제를 옮긴 것이 아니라 따로 낸 문제다. 그래서 한글만 재면
   영어 쪽 탈은 그대로 남는다. 미녀와 야수 4번과 황금 사슴 6번이 두 판 다 같은
   병을 앓고 있었다. 영어는 글자 대신 낱말로 재고, 세 낱말을 넘을 때만 짚는다.

   ■ 걸린 것이 다 사고는 아니다
   인물이 다르거나, 곳이 다르거나, 때가 다르면 좋은 오답이다. 진짜 사고는
   묻는 말이 가리키는 그 자리에서 그 일이 실제로 일어난 때뿐이다.
   전래동화 방이 쓰는 선을 그대로 옮겨 적어 둔다.
     · 문항이 한 순간을 못 박고 그 순간의 답이 하나뿐이면 → 둔다
     · 묻는 때가 넓거나("결국", "그 뒤로", "~한 뒤") 오답이 그 범위 안에도 들면 → 고친다 */
import fs from 'node:fs';
import { tally } from './seen.mjs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const LIMIT_KO = 5;   // 이어진 글자가 다섯 자를 넘을 때만 짚는다
const LIMIT_EN = 3;   // 이어진 낱말이 셋을 넘을 때만 짚는다

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

/* 영어는 낱말 단위로 잰다. 글자로 재면 흔한 토씨에 묻힌다. */
function longestWordRun(a, b) {
    const cut = t => t.toLowerCase().replace(/[^a-z0-9' ]/g, ' ').split(/\s+/).filter(Boolean);
    const wa = cut(a);
    const wb = ' ' + cut(b).join(' ') + ' ';
    let best = [];
    for (let i = 0; i < wa.length; i++) {
        for (let len = wa.length - i; len > best.length; len--) {
            const piece = wa.slice(i, i + len);
            if (wb.includes(' ' + piece.join(' ') + ' ')) { best = piece; break; }
        }
    }
    return best.join(' ');
}

function koQuiz(src) {
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
    const s2 = body.slice(k, end)
        .replace(/([{,]\s*)(q|choices|answer|wide)\s*:/g, '$1"$2":')
        .replace(/,(\s*[\]}])/g, '$1');
    try { return JSON.parse(s2); } catch { return null; }
}

/* 한글 본문만 뽑는다. 해설과 영어판은 뺀다. 이솝은 CHAPTERS 대신 FABLES를 쓴다. */
function koStory(src) {
    let i = src.indexOf('const CHAPTERS = [');
    if (i < 0) i = src.indexOf('const FABLES = [');
    if (i < 0) return '';
    let j = src.length;
    for (const mark of ['const AFTERWORD', 'const CHAPTER_SEGS', 'const COVER', 'const QUIZ', 'const EN']) {
        const k = src.indexOf(mark, i);
        if (k > 0 && k < j) j = k;
    }
    return [...src.slice(i, j).matchAll(/"((?:[^"\\]|\\.)*)"/g)].map(m => m[1]).join(' ');
}

/* 영어판은 따옴표 없는 열쇠말을 쓰고 홑따옴표를 섞어 쓴다. */
function enQuiz(src) {
    const at = src.indexOf('const EN = {');
    if (at < 0) return null;
    const i = src.indexOf('quiz: [', at);
    if (i < 0) return null;
    const seg = src.slice(i);
    const out = [];
    const re = /q:\s*(['"])([\s\S]*?)\1\s*,\s*(wide:\s*true\s*,\s*)?choices:\s*\[([\s\S]*?)\]\s*,\s*answer:\s*(\d+)/g;
    let m;
    while ((m = re.exec(seg))) {
        const chs = [...m[4].matchAll(/(['"])([\s\S]*?)\1/g)].map(x => x[2]);
        out.push({ q: m[2], wide: !!m[3], choices: chs, answer: Number(m[5]) });
    }
    return out.length ? out : null;
}

function enStory(src) {
    const i = src.indexOf('const EN = {');
    if (i < 0) return '';
    let j = src.length;
    for (const mark of ['afterword:', 'quiz:', 'const UI']) {
        const k = src.indexOf(mark, i);
        if (k > 0 && k < j) j = k;
    }
    return [...src.slice(i, j).matchAll(/"((?:[^"\\]|\\.)*)"/g)].map(m => m[1]).join(' ');
}

const only = process.argv.slice(2);
const books = (only.length ? only : fs.readdirSync(ROOT).filter(d => !d.startsWith('_') && fs.existsSync(path.join(ROOT, d, 'app.js')))).sort();
let hit = 0;
const seen = tally(books.length);

for (const b of books) {
    const src = fs.readFileSync(path.join(ROOT, b, 'app.js'), 'utf8');
    const ko = koQuiz(src), koText = koStory(src);
    const en = enQuiz(src), enText = enStory(src);
    if (!ko) { seen.skip(b, '한글 문제를 읽지 못했다'); continue; }
    if (!koText) { seen.skip(b, '한글 본문 틀을 못 찾았다'); continue; }
    if (!en) { seen.skip(b, '영어 문제를 읽지 못했다'); continue; }
    if (!enText) { seen.skip(b, '영어 본문을 못 찾았다'); continue; }

    const look = (label, qz, story, run, limit, size) => {
        for (const [i, q] of qz.entries()) {
            if (q.wide) continue;                   // 두 잣대가 정반대다. 반드시 건너뛴다.
            for (const [ci, c] of q.choices.entries()) {
                if (ci === q.answer) continue;
                const got = run(c, story);
                if (size(got) > limit) {
                    hit++;
                    console.log('## ' + b + ' ' + label + ' ' + (i + 1) + '번');
                    console.log('   묻는 말: ' + q.q);
                    console.log('   정답: ' + q.choices[q.answer]);
                    console.log('   오답인데 본문에 있음: ' + c);
                    console.log('   겹친 토막: ' + got);
                }
            }
        }
    };
    look('한글', ko, koText, longestRun, LIMIT_KO, t => t.length);
    look('영어', en, enText, longestWordRun, LIMIT_EN, t => (t ? t.split(' ').length : 0));
}

console.log('');
seen.report();
console.log('다시 볼 자리 ' + hit + '군데.');
console.log('인물·곳·때가 다르면 좋은 오답이다. 묻는 그 자리에서 실제로 일어난 일일 때만 사고다.');
