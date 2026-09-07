/* 소설틀 영어 원고가 우리말 원고와 뼈대가 같은지 본다.

   영어 장은 우리말 장의 그림·번호·이모지를 그대로 쓰므로 장 수가 같아야 하고,
   문단 수도 같아야 한다 — 소설틀은 문단을 재서 쪽을 나누니 문단이 빠지거나
   합쳐지면 쪽이 통째로 어긋난다. 문제는 우리말 문제를 옮긴 것이라 수·정답·
   넓은 보기 표시가 다 같아야 한다.

   쓰기:  node _check/en.mjs            영어판 있는 책 전부
          node _check/en.mjs lupin      한 권 */
import fs from 'node:fs';
import path from 'node:path';
import { tally } from './seen.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');

/* app.js 에서 자료 덩어리를 실제로 돌려 값으로 꺼낸다. 문자열로 세면 따옴표 하나에 어긋난다. */
function loadData(src) {
    const cut = (a, b) => { const i = src.indexOf(a); const j = src.indexOf(b, i); return (i < 0 || j < 0) ? null : src.slice(i, j); };
    const chapters = cut('const CHAPTERS = [', '/* ── 쪽 나누기') || cut('const CHAPTERS = [', 'const EN = {');
    const en = cut('const EN = {', '/* ── 말 바꾸기');
    const afterword = cut('const AFTERWORD = {', 'let AFTER_SEGS');
    const quiz = cut('const QUIZ = [', 'const QUIZ_GROUPS');
    const label = (src.match(/const CHAPTER_LABEL = [^\n]+/) || [''])[0];
    if (!chapters || !afterword || !quiz) return null;
    const code = 'const BOOK_TITLE = "";\n' + label + '\n' + chapters + (en || '') + afterword + quiz
        + '\nreturn { CHAPTERS, AFTERWORD, QUIZ, EN: typeof EN === "undefined" ? null : EN };';
    try { return new Function(code)(); } catch (e) { return { error: e.message }; }
}

const only = process.argv.slice(2);
const books = (only.length ? only : fs.readdirSync(ROOT)
    .filter(d => !d.startsWith('_') && fs.existsSync(path.join(ROOT, d, 'app.js')))).sort();
const seen = tally(books.length);
let withEn = 0, bad = 0;

for (const b of books) {
    const src = fs.readFileSync(path.join(ROOT, b, 'app.js'), 'utf8');
    if (!src.includes('const EN = {')) { seen.skip(b, '영어 원고가 없다'); continue; }
    const d = loadData(src);
    if (!d || d.error) { seen.skip(b, '원고를 읽지 못했다' + (d && d.error ? ': ' + d.error : '')); continue; }
    withEn++;
    const { CHAPTERS, AFTERWORD, QUIZ, EN } = d;
    const faults = [];
    const need = (ok, what) => { if (!ok) faults.push(what); };
    need(EN.title && EN.cover && EN.cover.title && EN.cover.tag && Array.isArray(EN.cover.intro), '표지 글이 빠졌다');
    need(EN.chapters.length === CHAPTERS.length, '장 수 ' + CHAPTERS.length + ' ↔ ' + EN.chapters.length);
    CHAPTERS.forEach((ch, i) => {
        const e = EN.chapters[i];
        if (!e) return;
        need(e.title, (i + 1) + '장 제목이 없다');
        need(e.paras.length === ch.paras.length, (i + 1) + '장 문단 ' + ch.paras.length + ' ↔ ' + e.paras.length);
        e.paras.forEach((p, k) => need(!/[가-힣]/.test(p), (i + 1) + '장 ' + (k + 1) + '문단에 한글이 남았다'));
    });
    need(EN.afterword && EN.afterword.paras.length === AFTERWORD.paras.length,
        '해설 문단 ' + AFTERWORD.paras.length + ' ↔ ' + (EN.afterword ? EN.afterword.paras.length : 0));
    need(EN.quiz.length === QUIZ.length, '문제 수 ' + QUIZ.length + ' ↔ ' + EN.quiz.length);
    QUIZ.forEach((q, i) => {
        const e = EN.quiz[i];
        if (!e) return;
        need(e.choices.length === q.choices.length, (i + 1) + '번 보기 수 ' + q.choices.length + ' ↔ ' + e.choices.length);
        need(e.answer === q.answer, (i + 1) + '번 정답 자리 ' + q.answer + ' ↔ ' + e.answer);
        need(!!e.wide === !!q.wide, (i + 1) + '번 넓은 보기 표시가 다르다');
    });
    if (faults.length) { bad++; console.log('## ' + b); faults.forEach(f => console.log('   ' + f)); }
}

console.log('');
seen.report();
console.log('영어판 ' + withEn + '권 가운데 어긋남 ' + bad + '권.');
