/* 비슷한 문장이 바로 뒤에 또 나오는 곳을 찾는다 — 「같은 말이 두 번」
   쓰기:  node dup.mjs <책폴더경로> [책목록.json]                        */
import fs from 'fs';
import path from 'path';

const DIR = process.argv[2];
if (!DIR) { console.error('쓰기: node dup.mjs <책폴더경로> [책목록.json]'); process.exit(1); }
const slugs = JSON.parse(fs.readFileSync(process.argv[3] || path.join(DIR, '_books.json'), 'utf8'));

// 조사·어미를 털어 낸 뼈대만 남긴다
const bone = t => String(t).replace(/<[^>]*>/g, '').replace(/["'".,!?…—\s]/g, '')
    .replace(/(습니다|했지요|었지요|았지요|지요|입니다|이었|였|하는|하고|해서|에서|에게|으로|라고|처럼|같이|다시|더욱|아주|참|또)/g, '');
const two = (a, b) => {
    const A = bone(a), B = bone(b);
    if (A.length < 6 || B.length < 6) return 0;
    const S = new Set([...A]), hit = [...new Set([...B])].filter(c => S.has(c)).length;
    return hit / Math.max(new Set([...A]).size, new Set([...B]).size);
};

let n = 0;
for (const s of slugs) {
    const p = path.join(DIR, s, 'app.js');
    if (!fs.existsSync(p)) continue;
    const m = fs.readFileSync(p, 'utf8').match(/const (?:CHAPTERS|FABLES|STORIES) = \[[\s\S]*?\n\];/);
    if (!m) continue;
    const D = new Function(m[0] + ` return ${m[0].match(/const (\w+)/)[1]};`)();
    let sp = 0;
    for (const ch of D) for (const b of (ch.beats || [ch])) {
        sp++;
        for (const side of ['left', 'right']) {
            const ps = (b[side] || []).map(x => String(x).replace(/<[^>]*>/g, ''));
            for (let i = 0; i + 1 < ps.length; i++) {
                if (ps[i].startsWith('"') || ps[i + 1].startsWith('"')) continue;
                const r = two(ps[i], ps[i + 1]);
                if (r > 0.82) { n++; console.log(`${s} [${sp}] ${side}\n   ${ps[i]}\n   ${ps[i + 1]}\n`); }
            }
        }
    }
}
console.log(`닮은 자리 ${n}곳`);
