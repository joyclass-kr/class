/* 이야기 문제가 본문과 어긋나지 않는지 본다.
   글을 고치고 나면 답이 본문에 없는 말이 되어 버리는 수가 있다.

   ■ 조사와 어미는 떼고 견준다
   처음에는 답의 낱말을 붙은 그대로 찾았다. 그랬더니 답이 「백조였다」인데
   본문은 「백조들이」라서 못 찾고 짚었다. 472개 가운데 46개가 걸렸는데
   열어 보니 전부 그것이었다. 진짜는 하나도 없었다.
   그렇게 짖는 잣대는 없느니만 못하다. 진짜 하나가 46개 사이에 묻히니까.
   그래서 뒤 음절을 하나씩 떼면서 찾는다. 두 음절까지만 떼어 본다.

   ■ 지금 남은 아홉 개는 다 확인했다 — 바꿔 적은 자리다
   답은 본문을 한 줄로 줄인 말이라, 낱말이 그대로 겹치지 않는 것이 오히려
   맞다. 아홉 개를 다 본문에서 찾아 대 봤고 어긋난 것은 없었다.
     신데렐라   콩을 다 고르기      ← 본문 「콩은 아무리 골라도」
     일곱 아기 염소  덜그럭덜그럭    ← 본문 「덜그럭, 덜그럭.」(사이가 떠 있다)
     벌거벗은 임금님  안 보일까 봐    ← 본문 「혹시 나에게도 안 보이면?」
     구두장이   옷 한 벌과 신       ← 본문 「웃옷·바지·모자」와 「구두를 지었지요」
     밤꾀꼬리   소 울음            ← 본문 「소가 음매 하고 울었습니다」
     완두콩 공주  콩을 느껴서        ← 본문 「등 밑에 뭔가 딱딱한 것이 배겼습니다」
     전나무     방 안에 섰다        ← 본문 「따뜻한 방 한가운데 서 있더라」
     야생 백조   짓던 옷           ← 본문 「엘리사는 옷을 놓지 않았지요」
     마르코     빚 때문에          ← 본문 「빚이 자꾸 늘어만 갔지요」
   그러니 이 잣대는 9가 예사 값이다. 수가 늘면 그때 열어 보면 된다. */
import fs from 'fs';
import path from 'path';
import { tally } from './seen.mjs';
const DIR = process.argv[2] || '..';
const slugs = JSON.parse(fs.readFileSync(path.join(DIR, '_books.json'), 'utf8'));
/* 조사와 어미를 하나씩 떼면서 본문에서 찾는다.
   「백조였다」는 본문에 「백조들이」로 있다. 두 음절까지만 떼어 본다. */
function found(word, text) {
    for (let n = word.length; n >= Math.max(2, word.length - 2); n--)
        if (text.includes(word.slice(0, n))) return true;
    return false;
}

let bad = 0, tot = 0;
const seen = tally(slugs.length);
for (const s of slugs) {
    const p = path.join(DIR, s, 'app.js');
    if (!fs.existsSync(p)) { seen.skip(s, 'app.js 가 없다'); continue; }
    const src = fs.readFileSync(p, 'utf8');
    const qm = src.match(/const QUIZ = \[[\s\S]*?\n\];/);
    if (!qm) { seen.skip(s, '문제를 못 찾았다'); continue; }
    const Q = new Function(qm[0] + ' return QUIZ;')();
    const bm = src.match(/const (?:CHAPTERS|FABLES|STORIES) = \[[\s\S]*?\n\];/);
    if (!bm) { seen.skip(s, '본문을 못 찾았다'); continue; }
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
        const miss = words.filter(w => !found(w, text));
        if (miss.length === words.length) hits.push(`  ${i + 1}. ${q.q}\n     답: ${q.choices[q.answer]}   ← 본문에 없는 말`);
    });
    if (hits.length) { bad += hits.length; console.log(`\n■ ${s}`); hits.forEach(h => console.log(h)); }
}
console.log('');
seen.report();
console.log(`문제 ${tot}개 · 본문과 어긋나 보이는 것 ${bad}개`);
console.log('조사와 어미는 떼고 견주었다. 바꿔 적은 자리는 여전히 짚힐 수 있다.');
