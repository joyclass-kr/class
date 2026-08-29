/* 흉내말(소리말·모양말) 밀도 재기
   쓰기:  node mimetic.mjs <책폴더경로> [책목록.json]
   기준: 세계명작동화는 천 자당 3.2번. 이보다 훨씬 낮으면 설명체로 흐른 것이다. */
import fs from 'fs';
import path from 'path';

const DIR = process.argv[2];
if (!DIR) { console.error('쓰기: node mimetic.mjs <책폴더경로> [책목록.json]'); process.exit(1); }
const slugs = JSON.parse(fs.readFileSync(process.argv[3] || path.join(DIR, '_books.json'), 'utf8'));

// 같은 글자가 두 번 겹치는 두 음절 짝 — 반짝반짝·쿵쿵·엉금엉금 꼴
const RE = /([가-힣]{2})\1|([가-힣])\2(?=[\s,.!?"'…])/g;
for (const s of slugs) {
    const p = path.join(DIR, s, 'app.js');
    if (!fs.existsSync(p)) continue;
    const src = fs.readFileSync(p, 'utf8');
    const m = src.match(/const (?:CHAPTERS|FABLES|STORIES) = \[[\s\S]*?\n\];/);
    if (!m) continue;
    const D = new Function(m[0] + ` return ${m[0].match(/const (\w+)/)[1]};`)();
    let text = '';
    for (const ch of D) for (const b of (ch.beats || [ch])) text += (b.left || []).join('') + (b.right || []).join('');
    const hits = text.match(RE) || [];
    const chars = text.replace(/\s/g, '').length;
    const per1000 = chars ? (hits.length / chars * 1000).toFixed(1) : '0';
    const flag = per1000 < 2 ? '  ← 적음' : '';
    console.log(`${s.padEnd(20)} ${String(hits.length).padStart(4)}번 / ${String(chars).padStart(6)}자  천자당 ${per1000}${flag}`);
}
