/* 이야기 문제가 본문과 어긋나지 않는지 본다.
   글을 고치고 나면 답이 본문에 없는 말이 되어 버리는 수가 있다. */
import fs from 'fs';
import path from 'path';
const DIR = process.argv[2] || '..';
const slugs = JSON.parse(fs.readFileSync(path.join(DIR, '_books.json'), 'utf8'));
let bad = 0, tot = 0;
for (const s of slugs) {
    const p = path.join(DIR, s, 'app.js');
    if (!fs.existsSync(p)) continue;
    const src = fs.readFileSync(p, 'utf8');
    const qm = src.match(/const QUIZ = \[[\s\S]*?\n\];/);
    if (!qm) continue;
    const Q = new Function(qm[0] + ' return QUIZ;')();
    const bm = src.match(/const (?:CHAPTERS|FABLES|STORIES) = \[[\s\S]*?\n\];/);
    if (!bm) continue;
    const D = new Function(bm[0] + ` return ${bm[0].match(/const (\w+)/)[1]};`)();
    let text = '';
    for (const ch of D) for (const b of (ch.beats || [ch]))
        text += (b.left || []).join(' ') + ' ' + (b.right || []).join(' ') + ' ' + (b.paras || []).join(' ') + ' ';
    text = text.replace(/<[^>]*>/g, '').replace(/["'…·,.!?]/g, '');
    const hits = [];
    Q.forEach((q, i) => {
        tot++;
        // 「읽고 난 반응으로 알맞지 않은 것」은 답이 본문에 없는 것이 정상이다.
        if (q.wide) return;
        const ans = String(q.choices[q.answer]).replace(/["'…·,.!?]/g, '');
        // 답의 뼈대 낱말이 본문에 있는지 본다
        const words = (ans.match(/[가-힣]{2,}/g) || []);
        if (!words.length) return;
        const miss = words.filter(w => !text.includes(w));
        if (miss.length === words.length) hits.push(`  ${i + 1}. ${q.q}\n     답: ${q.choices[q.answer]}   ← 본문에 없는 말`);
    });
    if (hits.length) { bad += hits.length; console.log(`\n■ ${s}`); hits.forEach(h => console.log(h)); }
}
console.log(`\n문제 ${tot}개 · 본문과 어긋나 보이는 것 ${bad}개`);
