/* 한 펼침면씩, 문장마다 번호를 붙여 보여 준다.
   줄거리를 따라 읽으면 머릿속에서 저절로 메워 읽게 되어 어긋난 곳이 안 보인다.
   쓰기:  node read.mjs <책폴더경로> <책이름> [장번호]                 */
import fs from 'fs';
import path from 'path';

const [DIR, SLUG, ONLY] = process.argv.slice(2);
if (!SLUG) { console.error('쓰기: node read.mjs <책폴더경로> <책이름> [장번호]'); process.exit(1); }

const src = fs.readFileSync(path.join(DIR, SLUG, 'app.js'), 'utf8');
const m = src.match(/const (?:CHAPTERS|FABLES|STORIES) = \[[\s\S]*?\n\];/);
if (!m) { console.error('본문을 못 읽음'); process.exit(1); }
const D = new Function(m[0] + ` return ${m[0].match(/const (\w+)/)[1]};`)();

const clean = t => String(t).replace(/<[^>]*>/g, '');
let spread = 0;
for (const ch of D) {
    if (ONLY && String(ch.num) !== String(ONLY)) continue;
    console.log(`\n${'═'.repeat(64)}\n▣ ${ch.num}장 ${ch.title || ''}`);
    for (const b of (ch.beats || [ch])) {
        spread++;
        console.log(`\n── 펼침면 ${spread}  (${b.art || ''}) ──`);
        for (const side of ['left', 'right']) {
            const ps = b[side] || b.paras || [];
            if (!ps.length) continue;
            console.log(`  [${side === 'left' ? '왼' : '오'}]`);
            let n = 0;
            for (const para of ps) {
                const t = clean(para);
                // 문장 단위로 쪼갠다. 대사는 통째로 둔다.
                const sents = t.startsWith('"') ? [t] : t.split(/(?<=[.!?])\s+/).filter(Boolean);
                for (const s of sents) console.log(`   ${String(++n).padStart(2)}. ${s}`);
                if (sents.length > 1 || ps.length > 1) console.log('      ·');
            }
        }
    }
}
