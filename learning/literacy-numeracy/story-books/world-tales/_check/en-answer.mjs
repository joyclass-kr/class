/* 영어 문항의 정답이 영어 본문에 보이는지 본다.

   빨간 모자 6번을 두고 나는 "어떤 도구로도 못 잡는다"고 했는데 틀렸다.
   정답이 Shears인데 본문에는 pepper뿐이었으니, 정답의 알맹이 낱말이 본문에
   하나도 없는 것을 재면 바로 걸린다. 한글은 `quiz.mjs`가 그 일을 하고 있었고
   영어에만 그 검사가 없었을 뿐이다. 없는 도구를 없는 줄 모르고 있었다.

   ■ 못 읽고도 조용한 것을 막는다
   전래동화 방이 영어 검사를 만들다 본문을 통째로 빈 것으로 잡고도 아무 말이
   없는 버그를 겪었다. 그래서 본문이 쉰 낱말도 안 되면 잰 것으로 치지 않고
   책 이름을 대고 종료값 1을 돌린다.

   ■ 짚혔다고 다 사고는 아니다
   말을 바꿔 적은 정답은 낱말이 안 겹칠 수 있다. 짚어 주는 눈금이지
   버릴 것을 골라 주는 검사가 아니다. */
import fs from 'node:fs';
import { tally } from './seen.mjs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const MIN_WORDS = 50;   // 본문이 이보다 짧으면 못 읽은 것으로 친다

/* 뜻을 지지 않는 낱말은 빼고 본다. 이것만 겹치면 겹친 것이 아니다. */
const STOP = new Set(('a an the and or but if of to in on at for with from by as is was were be been am are '
    + 'he she it they we you his her their our its him them us me my your this that these those there here '
    + 'what which who whom whose when where why how not no nor so than then too very can could will would '
    + 'shall should may might must do does did done have has had having one two three all any some each '
    + 'into out up down over under again more most other only own same such just also').split(' '));

const words = t => t.toLowerCase().replace(/[^a-z0-9' ]/g, ' ').split(/\s+/).filter(Boolean);

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
let hit = 0, asked = 0;
const seen = tally(books.length);

for (const b of books) {
    const src = fs.readFileSync(path.join(ROOT, b, 'app.js'), 'utf8');
    const qz = enQuiz(src);
    const story = enStory(src);
    if (!qz) { seen.skip(b, '영어 문제를 읽지 못했다'); continue; }
    const bag = new Set(words(story));
    if (bag.size < MIN_WORDS) { seen.skip(b, '영어 본문이 너무 짧다 — 못 읽은 것으로 본다'); continue; }

    for (const [i, q] of qz.entries()) {
        if (q.wide) continue;
        asked++;
        const ans = words(q.choices[q.answer]).filter(w => !STOP.has(w));
        if (!ans.length) continue;
        const found = ans.filter(w => bag.has(w));
        if (!found.length) {
            hit++;
            console.log('## ' + b + ' ' + (i + 1) + '번');
            console.log('   묻는 말: ' + q.q);
            console.log('   정답: ' + q.choices[q.answer] + '   ← 알맹이 낱말이 본문에 하나도 없다');
        }
    }
}

console.log('');
seen.report();
console.log('영어 문항 ' + asked + '개 · 정답이 본문에 안 보이는 것 ' + hit + '개.');
console.log('말을 바꿔 적은 정답은 낱말이 안 겹칠 수 있다. 짚어 주는 눈금이지 버릴 것을 고르는 검사가 아니다.');
