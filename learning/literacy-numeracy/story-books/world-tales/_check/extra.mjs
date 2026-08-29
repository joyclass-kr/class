/* 표지 글과 「읽고 나서」를 한자리에 모아 본다 — 본문 말고 남은 글 */
import fs from 'fs';
import path from 'path';
const DIR = process.argv[2] || '..';
const WHAT = process.argv[3] || 'after';
const slugs = JSON.parse(fs.readFileSync(path.join(DIR, '_books.json'), 'utf8'));
const clean = t => String(t).replace(/<br\s*\/?>/g, ' ⏎ ').replace(/<[^>]*>/g, '');
for (const s of slugs) {
    const p = path.join(DIR, s, 'app.js');
    if (!fs.existsSync(p)) continue;
    const src = fs.readFileSync(p, 'utf8');
    if (WHAT === 'cover') {
        const h = src.match(/<h1>([^<]*)<\/h1>([\s\S]*?)<\/div>/);
        if (!h) continue;
        const ps = [...h[2].matchAll(/<p>([\s\S]*?)<\/p>/g)].map(m => clean(m[1]).trim());
        console.log(`\n■ ${s} — ${h[1]}`);
        ps.forEach((t, i) => console.log(`  ${i + 1}. ${t}`));
    } else {
        const m = src.match(/const AFTERWORD = \{[\s\S]*?\n\};/);
        if (!m) continue;
        const A = new Function(m[0] + ' return AFTERWORD;')();
        const ps = A.spreads ? A.spreads.flatMap(sp => [...(sp.left || []), ...(sp.right || [])]) : (A.paras || []);
        console.log(`\n■ ${s}`);
        ps.forEach((t, i) => console.log(`  ${i + 1}. ${clean(t)}`));
    }
}
