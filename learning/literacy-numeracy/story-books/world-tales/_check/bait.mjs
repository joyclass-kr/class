/* 이야기를 안 읽고도 답이 보이는 문제를 찾는다.
   아이들이 쓰는 다섯 가지 수를 그대로 규칙으로 삼았다.
     ① 착한 것 고르기      정답에만 착한 말이 들어 있다
     ② 책 제목 베끼기      정답에만 제목의 낱말이 들어 있다
     ③ 윗문제 베끼기       정답에만 앞 문제에 나온 말이 들어 있다
     ④ 긴 선지 고르기      정답이 오답들보다 눈에 띄게 길다
     ⑤ 특이한 선지 고르기  오답이 본문에 아예 안 나온다(읽지 않고도 지울 수 있다)
   쓰기:  node bait.mjs <책폴더경로> [책이름]                              */
import fs from 'fs';
import path from 'path';

const [DIR, ONLY] = process.argv.slice(2);
const books = ONLY ? [ONLY] : JSON.parse(fs.readFileSync(path.join(DIR, '_books.json'), 'utf8'));

const GOOD = ['진짜','착한','착하','정직','도와','도왔','도우','용서','나누','나눠','베풀','참았','참는','고맙','고마','정성','사랑','약속을 지','열심','부지런','솔직','양보','구해','살려'];
const clean = t => String(t).replace(/<[^>]*>/g, '');
// 두 글자 이상 이어진 한글 덩어리만 본다. 조사는 앞 두 글자로 견준다.
// 조사를 떼고 낱말 뿌리만 남긴다. 「빵을」은 「빵」, 「머리가」는 「머리」.
const JOSA = /(으로|에서|에게|께서|한테|보다|처럼|까지|부터|마다|이나|이랑|을|를|이|가|은|는|에|의|도|과|와|로|만)$/;
const stems = s => (clean(s).match(/[가-힣]{2,}/g) || [])
    .map(w => { const b = w.replace(JOSA, ''); return (b || w).slice(0, 2); })
    .filter(w => w && !STOP.has(w));
// 「것·무엇·누구」 같은 매인말은 견주어 봐야 뜻이 없다
const STOP = new Set(['것','거','수','때','일','말','이것','저것','그것','무엇','누구','어디','어떻','무슨','모두','다시','아주','정말','자기','사람']);

let total = 0, leaky = 0;
for (const slug of books) {
    let src;
    try { src = fs.readFileSync(path.join(DIR, slug, 'app.js'), 'utf8'); } catch { continue; }
    const qm = src.match(/const QUIZ = \[[\s\S]*?\n\];/);
    if (!qm) continue;
    const QUIZ = new Function(qm[0] + ' return QUIZ;')();
    const bm = src.match(/const (?:CHAPTERS|FABLES|STORIES) = \[[\s\S]*?\n\];/);
    let body = '';
    if (bm) {
        const D = new Function(bm[0] + ` return ${bm[0].match(/const (\w+)/)[1]};`)();
        const walk = o => { if (Array.isArray(o)) o.forEach(walk);
            else if (o && typeof o === 'object') Object.values(o).forEach(walk);
            else if (typeof o === 'string') body += ' ' + clean(o); };
        walk(D);
    }
    let title = slug;
    try { title = (fs.readFileSync(path.join(DIR, slug, 'index.html'), 'utf8')
        .match(/<title>([\s\S]*?)<\/title>/) || [, slug])[1].trim(); } catch {}
    const titleStems = new Set(stems(title));

    const rows = [];
    QUIZ.forEach((q, i) => {
        total++;
        const ans = clean(q.choices[q.answer]);
        const wrongs = q.choices.filter((_, k) => k !== q.answer).map(clean);
        const hit = [];

        if (GOOD.some(g => ans.includes(g)) && !wrongs.some(w => GOOD.some(g => w.includes(g)))) hit.push('①착한말');
        if (stems(ans).some(s => titleStems.has(s)) && !wrongs.some(w => stems(w).some(s => titleStems.has(s)))) hit.push('②제목');
        if (i > 0) {
            const prev = new Set(QUIZ.slice(0, i).flatMap(p => [...stems(p.q), ...stems(p.choices[p.answer])]));
            if (stems(ans).some(s => prev.has(s)) && !wrongs.some(w => stems(w).some(s => prev.has(s)))) hit.push('③윗문제');
        }
        const L = q.choices.map(c => clean(c).replace(/\s/g, '').length);
        if (L[q.answer] === Math.max(...L) && L[q.answer] >= Math.max(...L.filter((_, k) => k !== q.answer)) + 3) hit.push('④긴선지');
        // 본문에 한 번도 안 나오는 오답은 읽지 않아도 지울 수 있다
        // 「한 장」처럼 두 글자 낱말이 없는 보기는 통째로 견준다
        const inBody = w => stems(w).some(s => body.includes(s)) || body.includes(w);
        const ghost = wrongs.filter(w => !inBody(w));
        if (ghost.length === wrongs.length && wrongs.length) hit.push('⑤오답이유령');
        else if (ghost.length) hit.push(`⑤유령오답 ${ghost.length}/${wrongs.length}`);

        if (hit.length) { leaky++; rows.push(`  ${i + 1}. ${q.q}\n     → ${ans}   [${hit.join(' ')}]\n     오답: ${wrongs.join(' / ')}`); }
    });
    if (rows.length) console.log(`\n■ ${title} (${slug})  ${rows.length}/${QUIZ.length}\n` + rows.join('\n'));
}
console.log(`\n${'─'.repeat(60)}\n문제 ${total}개 중 ${leaky}개가 안 읽고도 풀립니다. (${(leaky / total * 100).toFixed(0)}%)`);
