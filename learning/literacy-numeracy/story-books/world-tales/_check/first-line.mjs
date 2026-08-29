/* 「읽고 나서」 첫 문장이 책마다 겹치는지 보기
   쓰기:  node first-line.mjs <책폴더경로> [책목록.json]
   지은이 이름만 대는 첫 문장은 판박이가 된다. 그 책에서만 나올 사실로 시작할 것. */
import fs from 'fs';
import path from 'path';

const DIR = process.argv[2];
if (!DIR) { console.error('쓰기: node first-line.mjs <책폴더경로> [책목록.json]'); process.exit(1); }
const slugs = JSON.parse(fs.readFileSync(process.argv[3] || path.join(DIR, '_books.json'), 'utf8'));

const rows = [];
for (const s of slugs) {
    const p = path.join(DIR, s, 'app.js');
    if (!fs.existsSync(p)) continue;
    const m = fs.readFileSync(p, 'utf8').match(/const AFTERWORD = \{[\s\S]*?\n\};/);
    if (!m) continue;
    const A = new Function(m[0] + ' return AFTERWORD;')();
    const first = (A.spreads && A.spreads[0] ? A.spreads[0].left : A.paras) || [];
    const t = (first[0] || '').replace(/<[^>]*>/g, '');
    if (t) rows.push({ s, sent: (t.split(/(?<=\.)\s/)[0] || t) });
}
const bag = new Map();
rows.forEach(r => { const k = r.sent.slice(0, 12); if (!bag.has(k)) bag.set(k, []); bag.get(k).push(r.s); });
console.log(`책 ${rows.length}권\n`);
[...bag.entries()].sort((a, b) => b[1].length - a[1].length).forEach(([k, v]) => {
    console.log(`${String(v.length).padStart(2)}권  "${k}…"`);
    if (v.length > 1) console.log('      ' + v.join(' '));
});
