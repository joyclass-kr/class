/* 영어 문제를 영어 본문에 대고 잰다.
 *
 *   node _tools/tools-en-check.mjs            영어판이 있는 책 전부
 *   node _tools/tools-en-check.mjs tokkijeon  한 권
 *
 * 두 가지를 낸다.
 *   [정답이 본문에 안 보임]  정답의 알맹이 낱말이 본문에서 거의 안 나온다.
 *      옆방(세계명작)은 빨간 모자 영어 6번의 정답이 Shears 인데 본문은
 *      a pot of pepper 였다. 후춧가루는 보기에 아예 없었다 — 세 보기 가운데
 *      답이 하나도 없는 문항이었다. 이런 것은 오답 검사로는 못 잡는다.
 *   [틀린 보기가 본문에 있음]  오답이 본문에 그대로 있어서 읽은 아이가
 *      정답과 가를 수 없는 자리.
 *
 * 둘째 잣대는 한 번 갈았다. 본디 「오답이 본문에 있으면」 다 짚었는데
 * 예순네 군데가 걸렸고, 열어 보니 죄다 다른 대목에서 가져온 멀쩡한
 * 오답이었다. 좋은 오답은 본문에 있는 말로 쓰는 것이니 당연한 일이다.
 * 큰 수가 나오면 일이 많은 줄 알고 넘어가게 되므로, 그 안에 진짜가
 * 섞여 있어도 못 본다. 그래서 두 가지를 더 본다.
 *   1) 겹친 토막에 알맹이 낱말이 하나는 있어야 한다. 「he had been」처럼
 *      토씨만 겹친 것은 겹친 것이 아니다.
 *   2) 그 토막이 정답을 받쳐 주는 바로 그 문장 안에 있어야 한다.
 *      다른 대목에 있으면 인물도 곳도 때도 다르니 좋은 오답이다.
 * 이렇게 좁히니 64군데가 0군데가 되었다. 일부러 어긋낸 문항으로 짖는지
 * 확인해 두었다.
 *
 * 기계는 후보만 낸다. 여기서 걸리면 눈으로 한 번 더 본다. */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.slice(1)), '..');
const only = process.argv.slice(2);
const LIMIT_EN = 3;                       // 이어진 낱말이 셋을 넘을 때만 짚는다

const STOP = new Set(('a an the of to in on at for with and or but he she it they we you i him her them his '
  + 'their its our your my that this those these was were is are be been being had has have do did does not '
  + 'no so as by from up down out off over under then when what who which how why all any one two three '
  + 'into about after before again more most other some such only own same than too very can will just').split(' '));

const words = s => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);

/* 낱말꼴을 벗겨 견준다. 본문에 breathe 가 있는데 정답에 breathed 라 적으면
   글자만으로는 없는 낱말이 되어 「정답이 본문에 안 보임」이라 잘못 짖었다.
   parent 와 parents 도 마찬가지였다. 옆방(세계명작)에서도 lay/laid, weep/wept
   때문에 백예순 번을 헛짖었다고 한다. 규칙으로 되는 것은 규칙으로 벗기고,
   안 되는 것은 표에 적어 둔다. */
const 불규칙 = new Map(Object.entries({
    laid: 'lay', wept: 'weep', sank: 'sink', sunk: 'sink', shook: 'shake', shaken: 'shake',
    took: 'take', taken: 'take', gave: 'give', given: 'give', went: 'go', gone: 'go',
    came: 'come', ran: 'run', held: 'hold', kept: 'keep', left: 'leave', made: 'make',
    sold: 'sell', told: 'tell', found: 'find', caught: 'catch', brought: 'bring',
    thought: 'think', bought: 'buy', fell: 'fall', fallen: 'fall', broke: 'break',
    broken: 'break', spoke: 'speak', spoken: 'speak', stood: 'stand', sat: 'sit',
    lost: 'lose', felt: 'feel', slept: 'sleep', ate: 'eat', eaten: 'eat', saw: 'see',
    seen: 'see', grew: 'grow', grown: 'grow', threw: 'throw', thrown: 'throw',
    drew: 'draw', drawn: 'draw', flew: 'fly', flown: 'fly', knew: 'know', known: 'know',
    rose: 'rise', risen: 'rise', wore: 'wear', worn: 'wear', bore: 'bear', born: 'bear',
    hung: 'hang', dug: 'dig', hid: 'hide', hidden: 'hide', crept: 'creep', slid: 'slide',
    sprang: 'spring', sprung: 'spring', swept: 'sweep', tore: 'tear', torn: 'tear',
    rang: 'ring', rung: 'ring', sang: 'sing', sung: 'sing', clung: 'cling', strode: 'stride',
    men: 'man', women: 'woman', children: 'child', feet: 'foot', teeth: 'tooth', geese: 'goose'
}));
function stem(w) {
    if (불규칙.has(w)) return 불규칙.get(w);
    if (w.length > 4 && w.endsWith('ies')) return w.slice(0, -3) + 'y';
    if (w.length > 4 && w.endsWith('ied')) return w.slice(0, -3) + 'y';
    if (w.length > 4 && (w.endsWith('ing') || w.endsWith('ed'))) {
        const c = w.replace(/(ing|ed)$/, '');
        // 자음을 겹쳐 쓴 것(stopped, running)은 하나를 뗀다
        if (c.length > 2 && /([bcdfgklmnprstvz])\1$/.test(c)) return c.slice(0, -1);
        return c;
    }
    if (w.length > 3 && w.endsWith('es')) return w.slice(0, -2);
    if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
    return w;
}
/* breathe/breathed 처럼 e 가 붙었다 떨어지는 것이 있어 벗긴 꼴에 e 를 도로
   붙인 것까지 후보로 둔다. 본문 쪽도 정답 쪽도 같은 방식으로 펼쳐 견준다. */
const forms = w => [w, stem(w), stem(w) + 'e'];
const stemSet = ws => { const s = new Set(); for (const w of ws) for (const f of forms(w)) s.add(f); return s; };

function grab(src, marker) {
    const i = src.indexOf(marker);
    if (i < 0) return null;
    const s = src.indexOf('[', i);
    let d = 0, j = s;
    for (; j < src.length; j++) { if (src[j] === '[') d++; else if (src[j] === ']') { d--; if (!d) break; } }
    try { return eval('(' + src.slice(s, j + 1) + ')'); } catch { return null; }
}

/* 두 낱말줄이 함께 가진 가장 긴 이어진 토막의 낱말 수 */
function runLen(a, b) {
    let best = 0, bestP = '';
    for (let i = 0; i < a.length; i++)
        for (let len = a.length - i; len > best; len--) {
            const p = a.slice(i, i + len).join(' ');
            if (b.includes(' ' + p + ' ')) { best = len; bestP = p; break; }
        }
    return [best, bestP];
}

const 문제 = [];
let 잰책 = 0, 잰문항 = 0;
const skip = [];

for (const b of fs.readdirSync(ROOT).sort()) {
    if (b.startsWith('_')) continue;
    const f = path.join(ROOT, b, 'app.js');
    if (!fs.existsSync(f) || (only.length && !only.includes(b))) continue;
    const src = fs.readFileSync(f, 'utf8');
    if (!src.includes('\n    quiz: [')) continue;
    잰책++;
    const en = grab(src, '\n    quiz: [');
    const ch = grab(src, '\n    chapters: [');
    if (!en || !ch) { skip.push(b + ' — 영어 ' + (!en ? '문항' : '본문') + '을 못 읽었다'); continue; }
    /* 소설틀은 paras, 그림책틀은 beats 의 left/right 다. 좁쌀 한 톨만 그림책틀이라
       paras 만 읽다가 본문을 통째로 빈 것으로 잡고도 아무 말이 없었다.
       대사는 { t, v } 꼴이라 글줄만 줍다가 통째로 빠졌다. 대사에만 나오는 말을
       정답에 쓰면 「본문에 안 보임」이라고 잘못 일렀다. t 도 같이 줍는다. */
    const flat = v => Array.isArray(v) ? v.flatMap(flat)
        : (typeof v === 'string' ? [v]
        : (v && typeof v.t === 'string' ? [v.t] : []));
    const lines = ch.flatMap(c => c.paras ? flat(c.paras) : (c.beats || []).flatMap(x => flat([x.left, x.right])));
    const bodyW = lines.join(' ').replace(/<[^>]*>/g, ' ');
    const body = ' ' + words(bodyW).join(' ') + ' ';
    const bodySet = stemSet(words(bodyW));
    /* 문장 단위로도 잘라 둔다. 정답과 오답이 같은 문장에 들었는지 보려면
       본문을 한 덩어리로 두어서는 알 수 없다. */
    const sents = lines
        .flatMap(l => String(l).replace(/<[^>]*>/g, ' ').split(/(?<=[.!?])\s+/))
        .map(s => ' ' + words(s).join(' ') + ' ')
        .filter(s => s.trim());
    /* 토씨만 겹친 것은 겹친 것이 아니다. */
    const 알맹이있나 = p => p.split(' ').some(w => w && !STOP.has(w));
    if (words(bodyW).length < 50) { skip.push(b + ' — 영어 본문이 ' + words(bodyW).length + '낱말뿐이다. 틀을 잘못 읽었을 것이다'); continue; }

    en.forEach((q, i) => {
        if (q.wide) return;                       // 「읽고 난 반응」은 본문에 없는 말로 쓴다
        잰문항++;
        const ans = words(q.choices[q.answer]).filter(w => !STOP.has(w));
        const 있는것 = ans.filter(w => forms(w).some(f => bodySet.has(f)));
        if (ans.length && 있는것.length === 0)
            문제.push('  [정답이 본문에 안 보임] ' + b + ' ' + (i + 1) + '. ' + q.q
                + '\n     ✔ ' + q.choices[q.answer] + '  ← 「' + ans.join(', ') + '」 가운데 본문에 있는 낱말이 없다');
        const [, ansP] = runLen(words(q.choices[q.answer]), body);
        q.choices.forEach((c, k) => {
            if (k === q.answer) return;
            const [n, p] = runLen(words(c), body);
            // 정답을 받쳐 주는 그 문장 안에 오답까지 들어 있을 때만 짚는다.
            const 한문장 = ansP && 알맹이있나(ansP) && 알맹이있나(p)
                && sents.some(s => s.includes(' ' + p + ' ') && s.includes(' ' + ansP + ' '));
            if (n > LIMIT_EN && 한문장)
                문제.push('  [틀린 보기가 본문에 있음] ' + b + ' ' + (i + 1) + '. ' + q.q
                    + '\n     ✗ ' + c + '  ← 본문에 「' + p + '」');
        });
    });
}

if (문제.length) console.log(문제.join('\n'));
console.log('\n영어판이 있는 책 ' + 잰책 + '권 · 문항 ' + 잰문항 + '개, 후보 ' + 문제.length + '군데.');
if (skip.length) { console.log('## 못 본 책'); console.log(skip.map(x => '  ' + x).join('\n')); process.exitCode = 1; }
console.log('기계는 후보만 낸다. 걸린 것은 눈으로 한 번 더 본다.');
console.log('낱말꼴은 벗겨서 견준다 — breathe/breathed, parent/parents 는 같은 말로 친다.');
