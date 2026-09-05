/* 한글 문제와 영어 문제가 문항별로 나란한지 본다.

   이 책들의 영어 문제는 한글 문제를 옮긴 것이 아니라 따로 낸 문제다.
   그래서 푸는 자취를 말별로 따로 적어 둔다(QK). 그러면 정답 자리가 달라도
   탈이 나지 않는다. 이 도구는 그래도 두 판이 얼마나 갈라졌는지를
   적어 두려고 남긴다. 언젠가 두 판을 같은 것으로 여기고 고치려 할 때
   먼저 돌려 보라는 표지판이다.

   전래동화 방은 두 판이 번역이어서 자리를 맞추는 쪽을 골랐다.
   여기는 번역이 아니므로 자리를 맞출 길이 없고, 대신 자취를 갈랐다. */
import fs from 'node:fs';
import { tally } from './seen.mjs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');

/* 따옴표 여부와 홑따옴표를 가리지 않고 문항을 훑는다. */
function items(src) {
    const out = [];
    const re = /["']?q["']?\s*:\s*(['"])((?:\\.|(?!\1)[^\\])*)\1([\s\S]*?)["']?answer["']?\s*:\s*(\d+)/g;
    let m;
    while ((m = re.exec(src))) {
        const seg = m[3];
        const ci = seg.indexOf('[');
        const cz = seg.indexOf(']', ci);
        const n = ci < 0 ? 0 : [...seg.slice(ci, cz).matchAll(/(['"])(?:\\.|(?!\1)[^\\])*\1/g)].length;
        out.push({ q: m[2], n, a: Number(m[4]), wide: /wide/.test(seg) });
    }
    return out;
}

const books = fs.readdirSync(ROOT).filter(d => !d.startsWith('_') && fs.existsSync(path.join(ROOT, d, 'app.js'))).sort();
let bad = 0;
const seen = tally(books.length);

for (const b of books) {
    const s = fs.readFileSync(path.join(ROOT, b, 'app.js'), 'utf8');
    const cut = s.indexOf('const EN');
    if (cut < 0) { seen.skip(b, '영어판이 없다'); continue; }
    const ko = items(s.slice(0, cut));
    const en = items(s.slice(cut));
    const say = [];
    if (ko.length !== en.length) say.push('문항 수 ' + ko.length + ' / ' + en.length);
    const n = Math.min(ko.length, en.length);
    for (let i = 0; i < n; i++) {
        if (ko[i].a !== en[i].a) say.push((i + 1) + '번 정답 자리 ' + ko[i].a + ' / ' + en[i].a);
        if (ko[i].n !== en[i].n) say.push((i + 1) + '번 보기 수 ' + ko[i].n + ' / ' + en[i].n);
        if (ko[i].wide !== en[i].wide) say.push((i + 1) + '번 wide 표시가 한쪽에만');
    }
    if (say.length) {
        bad++;
        console.log('## ' + b);
        say.forEach(t => console.log('   ' + t));
    }
}

console.log('');
seen.report();
console.log('두 판이 어긋난 책 ' + bad + '권.');
console.log('자취를 말별로 적어 두므로 자리가 달라도 탈은 나지 않는다. 두 판이 갈라진 자리를 적어 둘 뿐이다.');
