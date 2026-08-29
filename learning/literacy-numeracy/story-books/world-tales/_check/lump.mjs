/* 여럿을 뭉뚱그려 한 줄로 넘긴 자리를 찾는다 — ① 압축서술
   「저마다」「하나씩」「여럿이」「나라마다」처럼 여럿을 가리키면서
   그 여럿이 각각 무엇을 했는지는 안 보여 주는 문장. */
import fs from 'fs';
import path from 'path';
const DIR = process.argv[2] || '..';
const slugs = JSON.parse(fs.readFileSync(path.join(DIR, '_books.json'), 'utf8'));
const MANY = /(나라마다|저마다|집집마다|사람마다|가지마다|하나씩|한 사람씩|차례로|줄줄이|여럿이|온갖|갖가지|이것저것|여러 가지)/;
// 뒤에 구체적인 움직임이나 소리말이 따라오면 괜찮다
const VIVID = /([가-힣]{2})\1|([가-힣])\2(?=[\s,.!?"'…])|"/;
for (const s of slugs) {
    const p = path.join(DIR, s, 'app.js');
    if (!fs.existsSync(p)) continue;
    const src = fs.readFileSync(p, 'utf8');
    const m = src.match(/const (?:CHAPTERS|FABLES|STORIES) = \[[\s\S]*?\n\];/);
    if (!m) continue;
    const D = new Function(m[0] + ` return ${m[0].match(/const (\w+)/)[1]};`)();
    let sp = 0, hits = [];
    for (const ch of D) for (const b of (ch.beats || [ch])) {
        sp++;
        for (const side of ['left', 'right']) {
            const ps = (b[side] || []).map(x => String(x).replace(/<[^>]*>/g, ''));
            const sents = ps.flatMap(t => t.startsWith('"') ? [t] : t.split(/(?<=[.!?])\s+/)).filter(Boolean);
            for (let i = 0; i < sents.length; i++) {
                if (!MANY.test(sents[i])) continue;
                // 그 문장과 바로 뒤 두 문장 안에 생생한 것이 없으면 뭉뚱그린 것으로 본다
                const around = sents.slice(i, i + 3).join(' ');
                if (!VIVID.test(around)) hits.push(`  [${sp}] ${side === 'left' ? '왼' : '오'}  ${sents[i]}`);
            }
        }
    }
    if (hits.length) { console.log(`\n■ ${s}`); hits.forEach(h => console.log(h)); }
}
