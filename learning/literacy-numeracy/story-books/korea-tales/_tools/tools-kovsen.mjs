/* 한글판과 영어판을 나란히 놓는다.
 *
 *   node _tools/tools-kovsen.mjs            영어판이 있는 책 전부
 *   node _tools/tools-kovsen.mjs tokkijeon  한 권
 *
 * 세 가지를 잰다. 물음 · 보기 수 · 정답 자리.
 * 다 맞아도 안심하면 안 된다. 자리가 맞는데 물음이 딴것일 수 있고,
 * 물음과 정답이 맞는데 틀린 보기가 짝이 안 맞을 수 있다.
 * 그래서 잰 것을 넘어 **두 판을 통째로 찍어 눈으로 읽어야 한다.**
 *
 * 실제로 그렇게 해서 나온 것들:
 *   흥부전 7  두 판이 아예 다른 것을 묻고 있었다(정답 자리도 달랐다)
 *   흥부전 11 물음과 정답은 같은데 틀린 보기 둘이 딴것이었다
 *   홍길동전 10 영어판만 「종이 사람」을 straw(짚)라 적었다.
 *              짚은 옹고집전 것이다. 한글만 봐서는 나오지 않는다.
 *
 * 옆방(세계명작)은 두 판이 번역이 아니라 아예 다른 문제라, 자리를 맞추는
 * 대신 자취를 말별로 갈랐다. 이쪽 62권은 두 판이 번역이라 자리를 맞춘다.
 * 새 책을 들일 때 어느 쪽인지부터 정할 것.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.slice(1)), '..');
const only = process.argv.slice(2);

function grab(src, marker) {
    const i = src.indexOf(marker);
    if (i < 0) return null;
    const s = src.indexOf('[', i);
    let d = 0, j = s;
    for (; j < src.length; j++) { if (src[j] === '[') d++; else if (src[j] === ']') { d--; if (!d) break; } }
    try { return eval('(' + src.slice(s, j + 1) + ')'); } catch { return null; }
}

const 문제 = [];
let 잰책 = 0;

for (const b of fs.readdirSync(ROOT).sort()) {
    if (b.startsWith('_')) continue;
    const f = path.join(ROOT, b, 'app.js');
    if (!fs.existsSync(f) || (only.length && !only.includes(b))) continue;
    const src = fs.readFileSync(f, 'utf8');
    if (!src.includes('\n    quiz: [')) continue;      // 영어판이 없는 책
    잰책++;
    const ko = grab(src, '\nconst QUIZ = [');
    const en = grab(src, '\n    quiz: [');
    if (!ko || !en) { 문제.push('  ' + b + ' — 문항을 못 읽었다'); continue; }
    if (ko.length !== en.length) 문제.push('  ' + b + ' — 문항 수가 다르다 ' + ko.length + '/' + en.length);
    ko.forEach((q, i) => {
        const e = en[i];
        if (!e) return;
        const 앞 = '  ' + b + ' ' + (i + 1) + '번 — ';
        if (q.answer !== e.answer) 문제.push(앞 + '정답 자리가 다르다 ' + q.answer + '/' + e.answer);
        if (q.choices.length !== e.choices.length) 문제.push(앞 + '보기 수가 다르다');
        if (!!q.wide !== !!e.wide) 문제.push(앞 + '한쪽만 wide 다');
    });
    console.log('## ' + b);
    ko.forEach((q, i) => {
        const e = en[i]; if (!e) return;
        console.log('  ' + (i + 1) + '. ' + q.q);
        console.log('     ' + e.q);
        q.choices.forEach((c, k) => {
            console.log('     ' + (k === q.answer ? '*' : ' ') + ' ' + c + '\n        | ' + (e.choices[k] ?? '(없음)'));
        });
    });
}

console.log('\n두 판을 대 본 책 ' + 잰책 + '권, 잰 것이 어긋난 곳 ' + 문제.length + '군데.');
if (문제.length) { console.log('## 어긋난 곳'); console.log(문제.join('\n')); process.exitCode = 1; }
console.log('물음·보기 수·정답 자리만 잰다. 틀린 보기가 짝이 맞는지는');
console.log('위에 찍힌 두 줄을 눈으로 읽어야 나온다.');
