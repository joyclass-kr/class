/* 영어 본문에서 따옴표가 열리기만 하고 안 닫힌 줄을 찾는다.

   오즈에서 "Dorothy! I don't know how to make it stop —" 가 열린 채로 끝나
   있었다. 말이 끊기는 자리라 쓴 사람은 알아채기 어렵고, 아이 화면에는
   따옴표 하나가 그냥 떠 있다. 58권을 읽다 눈에 걸려서 만든 잣대다.
   한 줄 안의 큰따옴표가 홀수면 짚는다. 여러 줄에 걸친 말은 여기서는 못 본다. */
import fs from 'node:fs';
import path from 'node:path';
import { tally } from './seen.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const only = process.argv.slice(2);
const books = (only.length ? only : fs.readdirSync(ROOT)
    .filter(d => !d.startsWith('_') && fs.existsSync(path.join(ROOT, d, 'app.js')))).sort();
const seen = tally(books.length);
let bad = 0, lines = 0;

for (const b of books) {
    const src = fs.readFileSync(path.join(ROOT, b, 'app.js'), 'utf8');
    const at = src.indexOf('const EN = {');
    if (at < 0) { seen.skip(b, '영어판이 없다'); continue; }
    const ch = src.indexOf('chapters: [', at), qz = src.indexOf('quiz: [', at);
    if (ch < 0 || qz < 0) { seen.skip(b, '영어 본문 틀을 못 찾았다'); continue; }
    const seg = src.slice(ch, qz);
    const re = new RegExp(String.raw`"((?:[^"\\]|\\.)*)"`, 'g');
    let n = 0;
    for (const m of seg.matchAll(re)) {
        n++;
        const t = m[1];
        if (((t.match(/\\"/g) || []).length) % 2 === 1) {
            bad++;
            console.log('## ' + b + ' — 따옴표가 안 닫혔다');
            console.log('   ' + t.replace(/\\"/g, '"').slice(0, 110));
        }
    }
    if (n < 40) { seen.skip(b, '영어 줄을 ' + n + '개밖에 못 읽었다'); continue; }
    lines += n;
}

console.log('');
seen.report();
console.log('영어 줄 ' + lines + '개 — 따옴표가 안 닫힌 줄 ' + bad + '.');
