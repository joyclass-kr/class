/* 표지 소개글에 적은 해와 「읽고 나서」에 적은 햇수가 서로 맞는지 본다.

   두 글은 같은 책의 같은 사실을 적는 자리인데 쓴 때가 다르다. 그래서
   표지에는 「1890년」이라 적어 놓고 해설에는 「이백 년쯤 전」이라고 적힌
   책이 있었다. 아이는 둘 다 읽는다. 둘이 다르면 어느 쪽을 믿어야 할지
   알 수 없다. 다섯 권이 그랬다.

   ■ 이 잣대가 못 보는 것 — 같은 것을 두 이름으로 부르는 자리
   한 책 안에 라푼젤과 라푼첼이, 베아트릭스와 비어트릭스가, 르나르와
   라이너드가 같이 있었다. 이것도 재 보려고 「한 글자만 다른 낱말 찾기」를
   붙여 봤는데, 우리말은 조사가 붙어 「이솝은」과 「이솝이」가 한 글자
   차이라 오백 번을 짖었다. 진짜는 그 가운데 하나였다.
   그렇게 짖는 잣대는 없느니만 못해서 뺐다. 이름 어긋남은 아직 눈으로
   읽어서만 잡는다. 못 잡는 것을 잡는 척하지 않으려고 여기 적어 둔다. */
import fs from 'node:fs';
import path from 'node:path';
import { tally } from './seen.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const NOW = new Date().getFullYear();
/* 해설의 햇수는 어림수다. 어림한 자리만큼 봐준다.
   「삼백 년쯤」은 백 자리로 어림한 것이니 329년도 맞는 말이고,
   「백팔십 년쯤」은 십 자리로 어림한 것이니 189년이면 백구십이라야 한다.
   그래서 눈금을 하나로 정하지 않고, 어림한 자리에서 뽑아 쓴다. */
const step = n => { let p = 1; while (n % (p * 10) === 0) p *= 10; return p; };
const slackFor = n => step(n) * 0.6;

/* 한자어 수를 셈한다. 이천 → 2000, 백사십 → 140, 이백칠십 → 270 */
const D = { 일: 1, 이: 2, 삼: 3, 사: 4, 오: 5, 육: 6, 칠: 7, 팔: 8, 구: 9 };
function korNum(t) {
    let n = 0, ok = false;
    for (const [unit, size] of [['천', 1000], ['백', 100], ['십', 10]]) {
        const i = t.indexOf(unit);
        if (i < 0) continue;
        const head = i > 0 ? t[i - 1] : '';
        n += (D[head] || 1) * size;
        t = t.slice(i + 1);
        ok = true;
    }
    if (t && D[t[0]]) { n += D[t[0]]; ok = true; }
    return ok ? n : null;
}

/* 영어 수를 셈한다. a hundred and forty → 140, two thousand six hundred → 2600 */
const E = {
    a: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
    ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
    seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50,
    sixty: 60, seventy: 70, eighty: 80, ninety: 90
};
function engNum(words) {
    let total = 0, run = 0, ok = false;
    for (const w of words) {
        if (w === 'and') continue;
        if (w === 'hundred') { run = (run || 1) * 100; ok = true; continue; }
        if (w === 'thousand') { total += (run || 1) * 1000; run = 0; ok = true; continue; }
        if (E[w] === undefined) return null;
        run += E[w]; ok = true;
    }
    return ok ? total + run : null;
}

/* 「about a hundred and forty years ago」에서 햇수를 뽑는다. */
const EN_WORD = 'a|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen'
    + '|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty'
    + '|sixty|seventy|eighty|ninety|hundred|thousand|and';
function engAges(text) {
    const re = new RegExp('((?:\\b(?:' + EN_WORD + ')\\b[ -]+)+)years', 'gi');
    const out = [];
    for (const m of text.matchAll(re)) {
        const n = engNum(m[1].toLowerCase().trim().split(/[ -]+/));
        if (n) out.push(n);
    }
    return out;
}

/* 영어판의 표지 소개글과 해설을 뽑는다. 없는 책도 있다. */
function englishParts(src) {
    const en = src.indexOf('const EN = {');
    if (en < 0) return null;
    const cv = src.indexOf('cover: {', en);
    const af = src.indexOf('afterword: {', en);
    if (cv < 0 || af < 0) return null;
    const wi = src.indexOf('words: {', af);
    return {
        cover: src.slice(cv, src.indexOf('},', cv)),
        after: src.slice(af, wi < 0 ? af + 4000 : wi)
    };
}

/* 따옴표 안의 우리말 문장만 뽑는다. */
const lines = seg => [...seg.matchAll(/(['"])((?:(?!\1)[^\\]|\\.)*)\1/g)]
    .map(m => m[2]).filter(t => /[가-힣]/.test(t) && t.length > 12);

/* 「백사십 년쯤 전」「이백 년 가까이」「팔백 년 넘게」에서 햇수를 뽑는다. */
function agesIn(text) {
    const out = [];
    for (const m of text.matchAll(/([일이삼사오육칠팔구]?[천백십][일이삼사오육칠팔구십백]*)\s*년/g)) {
        const n = korNum(m[1]);
        if (n) out.push(n);
    }
    return out;
}

/* 표지에 적힌 해와 해설에 적힌 햇수를 견준다. */
function check(book, lang, coverText, ages) {
    const years = [...coverText.matchAll(/\b(1[0-9]{3}|20[0-2][0-9])\b/g)].map(m => +m[1]);
    const list = ages.filter(a => a <= 900);   /* 「이천 년도 더 전」 같은 아득한 수는 견주지 않는다 */
    if (!years.length || !list.length) return;
    paired++;
    const want = years.map(y => NOW - y);
    for (const a of list) {
        if (want.some(w => Math.abs(w - a) <= slackFor(a))) continue;
        bad++;
        console.log('## ' + book + ' (' + lang + ') — 표지의 해와 해설의 햇수가 다르다');
        console.log('   표지 ' + years.join('년, ') + '년 (곧 ' + want.join('년 전, ') + '년 전)');
        console.log('   해설 ' + a + '년 전');
    }
}

const only = process.argv.slice(2);
const books = (only.length ? only : fs.readdirSync(ROOT)
    .filter(d => !d.startsWith('_') && fs.existsSync(path.join(ROOT, d, 'app.js')))).sort();
const seen = tally(books.length);
let bad = 0, paired = 0;

for (const b of books) {
    const src = fs.readFileSync(path.join(ROOT, b, 'app.js'), 'utf8');
    const ci = src.indexOf('const COVER = {');
    const ai = src.indexOf('const AFTERWORD = {');
    if (ci < 0) { seen.skip(b, '표지 소개글을 못 찾았다'); continue; }
    if (ai < 0) { seen.skip(b, '「읽고 나서」를 못 찾았다'); continue; }
    const cover = lines(src.slice(ci, src.indexOf('};', ci))).join(' ');
    const after = lines(src.slice(ai, src.indexOf('\n};', ai))).join(' ');
    if (!after) { seen.skip(b, '「읽고 나서」가 비어 있다'); continue; }

    check(b, '한글', cover, agesIn(after));

    /* 영어판도 같은 자리를 본다. 한글만 재면 말을 바꾼 아이는 어긋난 채로 읽는다. */
    const enp = englishParts(src);
    if (enp) check(b, '영어', enp.cover, engAges(enp.after));
}

console.log('');
seen.report();
console.log('견준 자리 ' + paired + '군데 (한글과 영어를 따로 센다) — 어긋난 자리 ' + bad + '.');
console.log('나머지는 표지나 해설 한쪽에 햇수가 없어 견줄 것이 없었다.');
