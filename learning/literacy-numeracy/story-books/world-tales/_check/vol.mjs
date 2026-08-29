/* 글 분량 재기 — 한쪽에 몇 자, 몇 문단 들어갔는지
   쓰기:  node vol.mjs <책폴더경로> [책목록.json]
   기준(세계명작동화 59권을 재서 얻은 값):
     한쪽 78~111자(공백 제외) · 3~5문단 · 중간값 93자 4문단      */
import fs from 'fs';
import path from 'path';

const DIR = process.argv[2];
if (!DIR) { console.error('쓰기: node vol.mjs <책폴더경로> [책목록.json]'); process.exit(1); }
const listFile = process.argv[3] || path.join(DIR, '_books.json');
const slugs = JSON.parse(fs.readFileSync(listFile, 'utf8'));

const pull = (src) => {
    const m = src.match(/const (?:CHAPTERS|FABLES|STORIES) = \[[\s\S]*?\n\];/);
    if (!m) return null;
    const name = m[0].match(/const (\w+)/)[1];
    return new Function(m[0] + ` return ${name};`)();
};

const rows = [], L = [], P = [];
for (const s of slugs) {
    const p = path.join(DIR, s, 'app.js');
    if (!fs.existsSync(p)) continue;
    const D = pull(fs.readFileSync(p, 'utf8'));
    if (!D) { console.log('본문을 못 읽음:', s); continue; }
    let n = 0;
    for (const ch of D) for (const b of (ch.beats || [ch])) {
        n++;
        for (const side of ['left', 'right']) {
            const ps = b[side] || [];
            const chars = ps.join('').replace(/\s/g, '').length;
            L.push(chars); P.push(ps.length);
            const bad = chars < 78 || chars > 111 || ps.length < 3 || ps.length > 5;
            if (bad) rows.push(`${bad ? '!' : ' '} ${s} [${n}] ${side} ${chars}자 ${ps.length}문단  ${(ps[0] || '').slice(0, 30)}`);
        }
    }
}
const st = a => { a = a.slice().sort((x, y) => x - y); return `${a[0]} ~ ${a[a.length - 1]} (중간 ${a[Math.floor(a.length / 2)]}, 평균 ${(a.reduce((x, y) => x + y, 0) / a.length).toFixed(1)})`; };
console.log(`잰 칸 ${L.length}개`);
console.log('글자수 ', st(L));
console.log('문단수 ', st(P));
console.log(`\n기준을 벗어난 칸 ${rows.length}개`);
rows.forEach(r => console.log(r));
