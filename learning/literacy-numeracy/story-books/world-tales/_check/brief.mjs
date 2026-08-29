/* 한 펼침면을 한 줄로 줄여 보여 준다. 문제를 새로 낼 때 이야기 재료를 훑는 용도.
   쓰기:  node brief.mjs <책폴더경로> <책이름> [책이름 ...]              */
import fs from 'fs';
import path from 'path';
const [DIR, ...SLUGS] = process.argv.slice(2);
const clean = t => String(t).replace(/<[^>]*>/g, '');
for (const slug of SLUGS) {
    const src = fs.readFileSync(path.join(DIR, slug, 'app.js'), 'utf8');
    const m = src.match(/const (?:CHAPTERS|FABLES|STORIES) = \[[\s\S]*?\n\];/);
    if (!m) { console.log(`\n### ${slug} — 본문 못 읽음`); continue; }
    const D = new Function(m[0] + ` return ${m[0].match(/const (\w+)/)[1]};`)();
    console.log(`\n### ${slug}`);
    let n = 0;
    for (const ch of D) for (const b of (ch.beats || [ch])) {
        const t = [...(b.left || []), ...(b.right || []), ...(b.paras || [])].map(clean).join(' ');
        console.log(`${String(++n).padStart(2)}| ${t}`);
    }
}
