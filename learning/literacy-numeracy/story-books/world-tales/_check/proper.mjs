/* 본문에 낯선 이름(땅·나라·물건)이 설명 없이 나오는지 본다 — ④ 아이의 말
   책 이름에 든 낱말, 사람 이름은 뺀다. */
import fs from 'fs';
import path from 'path';
const DIR = process.argv[2] || '..';
const slugs = JSON.parse(fs.readFileSync(path.join(DIR, '_books.json'), 'utf8'));
// 아이가 모를 만한 땅이름·물건이름
const WORDS = ['브레멘', '캔자스', '에메랄드 시', '라플란드', '핀란드', '먼치킨', '아라비아', '바그다드',
    '하멜른', '플랜더스', '노트르담', '베네치아', '나폴리', '제노바', '부에노스아이레스',
    '우단', '옷고름', '됫박', '밀랍', '광에서', '물레', '베틀', '금접시', '주석', '양철',
    '후작', '대신', '관리', '방앗간', '광한루', '누각'];
for (const s of slugs) {
    const p = path.join(DIR, s, 'app.js');
    if (!fs.existsSync(p)) continue;
    const src = fs.readFileSync(p, 'utf8');
    const m = src.match(/const (?:CHAPTERS|FABLES|STORIES) = \[[\s\S]*?\n\];/);
    if (!m) continue;
    const D = new Function(m[0] + ` return ${m[0].match(/const (\w+)/)[1]};`)();
    let text = '';
    for (const ch of D) for (const b of (ch.beats || [ch]))
        text += (b.left || []).join('\n') + '\n' + (b.right || []).join('\n') + '\n';
    const hits = WORDS.filter(w => text.includes(w));
    if (hits.length) console.log(`${s.padEnd(20)} ${hits.join(' · ')}`);
}
