/* 영어 낱말풀이의 예문이 그 쪽 본문에서 온 것인지 본다.

   낱말풀이는 `words`에 그림 파일 이름으로 묶여 있고, 아이가 그 쪽을 펼쳤을 때
   그 묶음이 뜬다. 그러니 예문은 **그 쪽에 실린 영어 글**에서 그대로 따온 것이라야
   한다. 다른 쪽 글을 가져다 놓으면, 아이가 눈앞의 글에서 그 문장을 못 찾는다.

   빨간 모자에서 문항은 "Shears"라고 틀리게 적혀 있었는데 낱말풀이 쪽은
   'took out a pot of pepper'로 맞게 적혀 있었다. 두 곳이 서로를 안 보고 있으니
   어느 한쪽이 틀려도 아무도 모른다. 그래서 잰다.

   ■ 세 가지를 본다
   1. 예문이 그 쪽 본문에 있는가
   2. 없다면 다른 쪽에는 있는가 (묶음을 잘못 넣은 것)
   3. 풀이하려는 낱말이 예문 안에 있는가

   ■ 예문은 본문을 줄여 쓴 것이다 — 통째로 대조하면 안 된다
   처음에는 예문이 본문에 그대로 있는지를 재서 4231개 가운데 869개가 걸렸다.
   보니 사고가 아니라 잣대가 틀렸다. 아이가 읽기 좋게 군더더기를 덜어낸 것이다.
     본문  The hare, who was famous for being the fastest thing in the wood,
             stopped dead on the road.
     예문  The hare stopped dead on the road.
   그래서 알맹이 낱말이 그 쪽 글에 모두 있는지를 본다. 하나라도 없으면 짚는다.

   ■ 짚혔다고 다 사고는 아니다
   말을 바꿔 적은 자리는 낱말이 안 겹칠 수 있다. 짚어 주는 눈금이지
   버릴 것을 골라 주는 검사가 아니다. */
import fs from 'node:fs';
import { tally } from './seen.mjs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');

/* 문장 부호와 대소문자를 지우고 견준다. */
const flat = t => t.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

/* 뜻을 지지 않는 낱말은 뺀다. 이것만 겹치면 겹친 것이 아니다. */
const STOP = new Set(('a an the and or but if of to in on at for with from by as is was were be been am are '
    + 'he she it they we you his her their our its him them us me my your this that these those there here '
    + 'what which who when where why how not no so than then too very can could will would shall should '
    + 'do does did done have has had one two all any some each into out up down over under again more '
    + 'only own same such just also his her not').split(' '));

/* 꼴이 아주 바뀌는 동사. 앞 글자가 안 맞아도 같은 낱말이다.
   낱말풀이에 실제로 쓰인 것만 모았다. 늘어나면 여기에 더 적는다. */
const IRREG = {
    bear: ['bore', 'borne'], become: ['became'], begin: ['began'], bend: ['bent'], bite: ['bit'], blow: ['blew'],
    break: ['broke', 'broken'], bring: ['brought'], build: ['built'], burst: ['burst'],
    buy: ['bought'], catch: ['caught'], choose: ['chose'], cling: ['clung'], come: ['came'],
    creep: ['crept'], cut: ['cut'], dig: ['dug'], draw: ['drew', 'drawn'], drink: ['drank'],
    drive: ['drove', 'driven'], eat: ['ate'], fall: ['fell'], feed: ['fed'], feel: ['felt'],
    fight: ['fought'], find: ['found'], fling: ['flung'], fly: ['flew', 'flown'],
    forget: ['forgot'], freeze: ['froze', 'frozen'], get: ['got'], give: ['gave', 'given'],
    go: ['went', 'gone'], grow: ['grew', 'grown'], hang: ['hung'], have: ['had'],
    hear: ['heard'], hide: ['hid', 'hidden'], hold: ['held'], keep: ['kept'], know: ['knew'],
    lay: ['laid'], lead: ['led'], leave: ['left'], lend: ['lent'], let: ['let'],
    lie: ['lay', 'lain'], light: ['lit'], lose: ['lost'], make: ['made'], mean: ['meant'],
    meet: ['met'], pay: ['paid'], put: ['put'], read: ['read'], ride: ['rode'],
    ring: ['rang', 'rung'], rise: ['rose', 'risen'], run: ['ran'], say: ['said'],
    see: ['saw', 'seen'], seek: ['sought'], sell: ['sold'], send: ['sent'], set: ['set'],
    shake: ['shook', 'shaken'], shine: ['shone'], shoot: ['shot'], show: ['showed', 'shown'],
    shut: ['shut'], sing: ['sang', 'sung'], sink: ['sank', 'sunk'], sit: ['sat'], sling: ['slung'],
    sleep: ['slept'], slide: ['slid'], speak: ['spoke', 'spoken'], spend: ['spent'],
    spin: ['spun'], spring: ['sprang', 'sprung'], stand: ['stood'], steal: ['stole'],
    stick: ['stuck'], sting: ['stung'], strike: ['struck'], swear: ['swore'],
    sweep: ['swept'], swim: ['swam'], swing: ['swung'], take: ['took', 'taken'],
    teach: ['taught'], tread: ['trod', 'trodden'], tear: ['tore', 'torn'], tell: ['told'], think: ['thought'],
    throw: ['threw', 'thrown'], wake: ['woke'], wear: ['wore', 'worn'], weep: ['wept'],
    weave: ['wove', 'woven'], win: ['won'], wind: ['wound'], write: ['wrote', 'written']
};

/* 예문의 알맹이 낱말이 모두 그 쪽 글에 있는가. 어미가 바뀌므로 앞 네 글자로 본다. */
function missingWords(sentence, page) {
    return flat(sentence).split(' ')
        .filter(w => w.length > 2 && !STOP.has(w))
        .filter(w => !page.includes(w.slice(0, Math.max(4, w.length - 3))));
}

/* 영어판에서 그림 이름 → 그 쪽 글 을 만든다.

   문제 구역만 골라 도려내려다 크게 데었다. 닫는 자리를 못 찾으면 그 뒤가 통째로
   날아가는데, 해설이 문제 뒤에 있어서 해설이 다 사라졌다. 그러고도 도구는
   아무 말이 없었고, 해설 낱말 백여 개를 "본문에 없다"고 찍었다.
   그래서 도려내지 않고, 필요한 두 구역만 골라 잇는다. */
function pagesOf(src) {
    const at = src.indexOf('const EN = {');
    if (at < 0) return null;
    const end = src.indexOf('words: {', at);
    const stop = end < 0 ? src.length : end;
    const ch = src.indexOf('chapters: [', at);
    const qz = src.indexOf('quiz: [', at);
    const af = src.indexOf('afterword: {', at);
    if (ch < 0 || ch > stop) return null;

    /* 이야기 구역은 chapters 부터 그다음 표지(문제나 해설)까지. */
    const after = [qz, af, stop].filter(k => k > ch).sort((a, b) => a - b)[0];
    let seg = src.slice(ch, after);
    /* 해설 구역은 따로 이어 붙인다. 문제 구역은 아예 건드리지 않는다. */
    if (af > 0 && af < stop) seg += ' ' + src.slice(af, stop);

    const map = {};
    for (const part of seg.split(/art:\s*['"]/).slice(1)) {
        const q = part.search(/['"]/);
        const name = part.slice(0, q);
        const lines = [...part.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map(m => m[1]);
        map[name] = (map[name] || '') + ' ' + flat(lines.join(' '));
    }
    return map;
}

/* 낱말풀이를 그림 이름별로 읽는다. */
function wordsOf(src) {
    const wi = src.indexOf('words: {', src.indexOf('const EN = {'));
    if (wi < 0) return null;
    const seg = src.slice(wi);
    const out = [];
    let now = null;
    const re = /(?:['"]([\w.-]+\.webp)['"]\s*:)|(?:\{\s*word:\s*(['"])([\s\S]*?)\2\s*,\s*meaning:\s*(['"])([\s\S]*?)\4\s*,\s*sentence:\s*(['"])([\s\S]*?)\6\s*\})/g;
    let m;
    while ((m = re.exec(seg))) {
        if (m[1]) { now = m[1]; continue; }
        if (now) out.push({ art: now, word: m[3], meaning: m[5], sentence: m[7] });
    }
    return out.length ? out : null;
}

const only = process.argv.slice(2);
const books = (only.length ? only : fs.readdirSync(ROOT).filter(d => !d.startsWith('_') && fs.existsSync(path.join(ROOT, d, 'app.js')))).sort();
let total = 0, missing = 0, elsewhere = 0, noword = 0;
const seen = tally(books.length);

for (const b of books) {
    const src = fs.readFileSync(path.join(ROOT, b, 'app.js'), 'utf8');
    const pages = pagesOf(src);
    const words = wordsOf(src);
    if (!pages) { seen.skip(b, '영어 본문을 읽지 못했다'); continue; }
    if (!words) { seen.skip(b, '낱말풀이를 읽지 못했다'); continue; }
    const all = Object.values(pages).join(' ');
    if (all.length < 400) { seen.skip(b, '영어 본문이 너무 짧다 — 못 읽은 것으로 본다'); continue; }
    /* 본문에 "the same words:" 같은 문장이 있어 거기서 잘린 적이 있다.
       그러면 쪽 수가 확 줄면서도 길이는 버티며 조용히 통과한다. 쪽 수로도 재 둔다. */
    if (Object.keys(pages).length < 8) { seen.skip(b, '영어 쪽을 ' + Object.keys(pages).length + '개밖에 못 찾았다'); continue; }

    for (const w of words) {
        total++;
        const here = pages[w.art] || '';
        const s = flat(w.sentence);
        if (!s) continue;
        const gone = missingWords(w.sentence, here);
        if (gone.length) {
            if (!missingWords(w.sentence, all).length) {
                elsewhere++;
                console.log('## ' + b + ' — 예문이 다른 쪽 글이다');
                console.log('   ' + w.art + ' / ' + w.word);
                console.log('   ' + w.sentence);
            } else {
                missing++;
                console.log('## ' + b + ' — 예문이 본문에 없다');
                console.log('   ' + w.art + ' / ' + w.word);
                console.log('   ' + w.sentence);
                console.log('   본문에 없는 낱말: ' + gone.join(', '));
            }
            continue;
        }
        /* 풀이하려는 낱말이 예문 안에 있어야 아이가 찾는다.
           앞 세 글자로만 보면 lay → laid, weep → wept 같은 것이 죄다 걸린다.
           그렇게 166개를 짖어 대면 정작 진짜 하나가 그 사이에 묻힌다. 그래서 표를 둔다. */
        const parts = flat(w.word).split(' ').filter(x => x.length > 1 && !STOP.has(x));
        /* cry → cried 처럼 y가 i로 바뀌는 것도 같은 낱말이다. */
        const shown = parts.some(x => s.includes(x.slice(0, 3))
            || (IRREG[x] || []).some(f => s.includes(f))
            || (x.endsWith('y') && s.includes(x.slice(0, -1) + 'i')));
        if (parts.length && !shown) {
            noword++;
            console.log('## ' + b + ' — 낱말이 예문 안에 없다');
            console.log('   ' + w.art + ' / ' + w.word + ' (' + w.meaning + ')');
            console.log('   ' + w.sentence);
        }
    }
}

console.log('');
seen.report();
console.log('낱말 ' + total + '개 — 본문에 없는 예문 ' + missing + ' · 다른 쪽 예문 ' + elsewhere + ' · 낱말이 빠진 예문 ' + noword + '.');
console.log('문장을 잘라 쓰거나 다듬은 자리는 부호와 대소문자를 지우고 견주어 걸러 두었다.');
