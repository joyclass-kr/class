/* 이웃한 문장에서 같은 말이 되풀이되는 곳을 찾는다 — ② 같은 말 두 번
   쓰기:  node echo.mjs <책폴더경로> [책목록.json]                       */
import fs from 'fs';
import path from 'path';
const DIR = process.argv[2] || '..';
const slugs = JSON.parse(fs.readFileSync(process.argv[3] || path.join(DIR, '_books.json'), 'utf8'));

// 되풀이돼도 괜찮은 말 (이어 주는 말·흔한 임자)
const OK = new Set(['그리고', '그런데', '그러나', '하지만', '이제', '다시', '아주', '정말', '참']);

let total = 0;
for (const s of slugs) {
    const p = path.join(DIR, s, 'app.js');
    if (!fs.existsSync(p)) continue;
    const m = fs.readFileSync(p, 'utf8').match(/const (?:CHAPTERS|FABLES|STORIES) = \[[\s\S]*?\n\];/);
    if (!m) continue;
    const D = new Function(m[0] + ` return ${m[0].match(/const (\w+)/)[1]};`)();
    let sp = 0, hits = [];
    for (const ch of D) for (const b of (ch.beats || [ch])) {
        sp++;
        for (const side of ['left', 'right']) {
            const ps = (b[side] || []).map(x => String(x).replace(/<[^>]*>/g, ''));
            // 한 칸 안의 모든 문장을 이어 놓고 이웃끼리 견준다
            const sents = ps.flatMap(t => t.startsWith('"') ? [t] : t.split(/(?<=[.!?])\s+/)).filter(Boolean);
            for (let i = 0; i + 1 < sents.length; i++) {
                const a = sents[i], c2 = sents[i + 1];
                if (a.startsWith('"') || c2.startsWith('"')) continue;
                // 두 글자 이상 낱말이 잇달아 두 문장에 다 나오면 잡는다
                const wa = new Set((a.match(/[가-힣]{2,}/g) || []).filter(w => !OK.has(w)));
                const shared = [...new Set(c2.match(/[가-힣]{2,}/g) || [])].filter(w => wa.has(w) && !OK.has(w));
                if (shared.length >= 2 || shared.some(w => w.length >= 4))
                    hits.push(`  [${sp}] ${side === 'left' ? '왼' : '오'}  ${shared.join('·')}\n      ${a}\n      ${c2}`);
            }
        }
    }
    if (hits.length) { total += hits.length; console.log(`\n■ ${s}  (${hits.length}곳)`); hits.forEach(h => console.log(h)); }
}
console.log(`\n모두 ${total}곳`);
