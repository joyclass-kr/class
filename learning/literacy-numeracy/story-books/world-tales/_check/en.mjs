/* 영어 원고가 한국어 원고와 뼈대가 같은지 본다.
   장 수, 펼침면 수, 그림 이름 차례, 장 번호, 문제 수, 선지 수, 정답 자리,
   그리고 단어장이 그림마다 붙어 있는지.
   쓰기: node _check/en.mjs .            (영어판 있는 책 전부)
        node _check/en.mjs . three-pigs  (한 권만) */
import fs from 'fs';
import path from 'path';

const root = process.argv[2] || '.';
const only = process.argv[3];
const slugs = JSON.parse(fs.readFileSync(path.join(root, '_books.json'), 'utf8'))
    .filter(s => !only || s === only);

const pull = (src, re, name) => {
    const m = src.match(re);
    return m ? new Function(m[0] + ' return ' + name + ';')() : null;
};

let bad = 0, seen = 0;
for (const slug of slugs) {
    const src = fs.readFileSync(path.join(root, slug, 'app.js'), 'utf8');
    if (!src.includes('const EN = {')) continue;
    seen++;

    const arrName = src.includes('const FABLES = [') ? 'FABLES' : 'CHAPTERS';
    const KO = pull(src, new RegExp('const ' + arrName + ' = \\[[\\s\\S]*?\\n\\];'), arrName);
    const KOQ = pull(src, /const QUIZ = \[[\s\S]*?\n\];/, 'QUIZ');
    const KOA = pull(src, /const AFTERWORD = \{[\s\S]*?\n\};/, 'AFTERWORD');
    const EN = pull(src, /const EN = \{[\s\S]*?\n\};/, 'EN');

    const say = [];
    const koArt = KO.flatMap(c => c.beats.map(b => b.art));
    const enArt = EN.chapters.flatMap(c => c.beats.map(b => b.art));

    if (EN.chapters.length !== KO.length) say.push(`장 ${EN.chapters.length}≠${KO.length}`);
    if (enArt.join() !== koArt.join()) say.push('그림 차례 어긋남');
    EN.chapters.forEach((c, i) => { if (c.num !== KO[i].num) say.push(`장번호 ${c.num}≠${KO[i].num}`); });
    if (arrName === 'FABLES') {
        EN.chapters.forEach((c, i) => { if (!c.moral) say.push(`${KO[i].num}장 교훈 없음`); });
    }
    if (EN.quiz.length !== KOQ.length) say.push(`문제 ${EN.quiz.length}≠${KOQ.length}`);
    EN.quiz.forEach((q, i) => {
        // 「읽고 난 반응」 문제만 선지가 넷이다. 나머지는 셋으로 맞춘다.
        const want = q.wide ? 4 : 3;
        if (q.choices.length !== want) say.push(`${i + 1}번 선지 ${q.choices.length}개`);
        if (q.answer < 0 || q.answer >= q.choices.length) say.push(`${i + 1}번 정답 자리 벗어남`);
    });
    // 정답이 죄다 한자리에 몰리면 읽지 않고도 맞힐 수 있다
    const spread = new Set(EN.quiz.map(q => q.answer));
    if (EN.quiz.length >= 3 && spread.size < 2) say.push('정답이 한 자리에만 몰림');

    if (EN.afterword.spreads.length !== KOA.spreads.length) say.push('읽고나서 펼침 수 다름');
    const afterArt = EN.afterword.spreads.map(s => s.art).join();
    if (afterArt !== KOA.spreads.map(s => s.art).join()) say.push('읽고나서 그림 다름');

    const need = [...enArt, ...EN.afterword.spreads.map(s => s.art)];
    const missing = need.filter(a => !EN.words[a] || !EN.words[a].length);
    if (missing.length) say.push(`단어장 빠짐 ${missing.length}곳 (${missing[0]})`);

    if (say.length) { bad++; console.log('✗ ' + slug.padEnd(18) + say.join(' | ')); }
}
console.log(`\n영어판 ${seen}권 가운데 어긋남 ${bad}권.`);
process.exit(bad ? 1 : 0);
