/* 「paras」 짜임으로 쓰인 책을 읽는다 (탈무드·예수님의 비유·「~전」 소설틀)
   쓰기:  node read-paras.mjs <책폴더경로> <책이름> [장번호]            */
import fs from 'fs';
import path from 'path';
const [DIR, SLUG, ONLY] = process.argv.slice(2);
if (!SLUG) { console.error('쓰기: node read-paras.mjs <책폴더경로> <책이름> [장번호]'); process.exit(1); }
const src = fs.readFileSync(path.join(DIR, SLUG, 'app.js'), 'utf8');
const m = src.match(/const CHAPTERS = \[[\s\S]*?\n\];/);
if (!m) { console.error('본문을 못 읽음'); process.exit(1); }
const D = new Function(m[0] + ' return CHAPTERS;')();
const clean = t => String(t).replace(/<br\s*\/?>/g, ' ⏎ ').replace(/<[^>]*>/g, '');
for (const ch of D) {
    if (ONLY && String(ch.num) !== String(ONLY)) continue;
    console.log(`\n${'═'.repeat(64)}\n▣ ${ch.num}. ${ch.title || ''}`);
    let n = 0;
    for (const para of (ch.paras || [])) {
        const t = clean(para);
        const sents = t.split(/(?<=[.!?])\s+/).filter(Boolean);
        for (const s of sents) console.log(`  ${String(++n).padStart(3)}. ${s}`);
        console.log('       ·');
    }
}
