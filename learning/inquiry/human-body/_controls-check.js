/**
 * 「이 화면에 있을 까닭이 없는 손잡이」를 코드로 따지는 잣대.
 *
 *   node _controls-check.js          흠만 보인다
 *   SHOW=1 node _controls-check.js   손잡이마다 어느 화면에서 보이는지도 함께 보인다
 *
 * 왜 코드로 따지는가.
 *   브라우저에서 실제로 만져 보는 잣대(_relevance.js)는 두 군데서 헛것을 낸다.
 *     - 스스로 움직이는 장면(피가 흐르는 심장, 도는 원심분리기)에서는 아무것도
 *       안 만져도 그림이 매 틱 달라져서, 무엇을 만지든 「살았다」가 나온다.
 *     - 멈춰 놓고 재면 이번에는 빠르기만 바꾸는 손잡이(심박수)가 죽은 것으로 나온다.
 *   그래서 판정은 코드로 한다. 만져 보는 잣대는 곁에서 거드는 용도다.
 *
 * 따지는 차례.
 *   1. 방마다 장면 열쇠를 모은다 (index.html 의 data-scene 과, 겹판이 스스로
 *      만들어 붙이는 dataset.scene).
 *   2. 파일마다 자기가 맡은 장면을 읽는다 (KEY = '…' / dataset.scene === '…').
 *      아무 겹판도 안 맡은 장면은 캔버스(app.js)가 그린다.
 *   3. 옆칸의 손잡이마다 어느 장면에서 보이는지 읽는다
 *      (자기나 조상의 data-for-scene, 없으면 갈피의 표, 그것도 없으면 모든 장면).
 *   4. 그 화면을 그리는 곳이 그 손잡이를 잡고 있는지 본다.
 *      곧바로 잡지 않더라도, app.js 가 어떤 칸을 고쳐 쓰고 겹판이 그 칸을
 *      읽어 가는 길이 있으면 살아 있는 것으로 친다.
 *
 * 지나온 함정 (같은 데 또 빠지지 않으려고 적어 둔다)
 *   · 자바스크립트 글 안에서 백슬래시 b 는 낱말 경계가 아니라 백스페이스 글자다.
 *     정규식을 글자열로 지으면 아무것도 안 맞는다. 그래서 낱말을 갈라 견준다.
 *   · 이름이 따옴표 안에만 있지 않다. 짜임표의 열쇠로도 쓰인다 (ANTIGENS = { btnVirus: … }).
 *   · 쓰기(organTitle.textContent = …)는 읽기가 아니다. 그것까지 「이어졌다」고
 *     치면 온 방의 손잡이가 다 살아 있는 것이 되어 잣대가 아무 소리도 안 낸다.
 *   · 겹판은 getElementById 를 변수에 담아 두고 한참 뒤에 쓴다. 별칭을 따라가야 한다.
 *   · 뇌 알약처럼 이름표 없는 단추가 있다. 그때는 갈래 이름(class)으로 찾는다.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOMS = fs.readdirSync(__dirname).filter(d =>
    fs.existsSync(path.join(__dirname, d, 'index.html')) &&
    fs.existsSync(path.join(__dirname, d, 'app.js')));

const read = p => fs.readFileSync(p, 'utf8');
const jsFiles = room => fs.readdirSync(room).filter(f => f.endsWith('.js')).map(f => path.join(room, f));

/* ── 글 읽기 ─────────────────────────────────────────────── */

const wordCache = new Map();
function words(src) {
    let s = wordCache.get(src);
    if (!s) { s = new Set(src.split(/[^A-Za-z0-9_-]+/)); wordCache.set(src, s); }
    return s;
}

/** getElementById('x') 를 담아 둔 변수 이름 → 칸 이름 */
function aliases(src) {
    const map = new Map();
    let m;
    const re = /([A-Za-z_$][\w$]*)\s*=\s*document\.getElementById\('([^']+)'\)/g;
    while ((m = re.exec(src))) map.set(m[1], m[2]);
    return map;
}

/** 이 글이 값을 고쳐 쓰는 칸들 (글자·값·눌린 표시) */
function writesTo(src) {
    const al = aliases(src);
    const out = new Set();
    let m;
    const re = /([A-Za-z_$][\w$]*)\s*\.\s*(?:textContent|value)\s*=[^=]/g;
    while ((m = re.exec(src))) if (al.has(m[1])) out.add(al.get(m[1]));
    const re2 = /([A-Za-z_$][\w$]*)\s*\.classList\s*\.\s*(?:add|remove|toggle)/g;
    while ((m = re2.exec(src))) if (al.has(m[1])) out.add(al.get(m[1]));
    const re3 = /document\.getElementById\('([^']+)'\)\s*\.\s*(?:textContent|value|classList)/g;
    while ((m = re3.exec(src))) out.add(m[1]);
    return out;
}

/** 이 글이 값을 읽어 가는 칸들 */
function readsFrom(src) {
    const al = aliases(src);
    const out = new Set();
    let m;
    const re = /([A-Za-z_$][\w$]*)\s*\.\s*(?:textContent|value)(?!\s*=[^=])/g;
    while ((m = re.exec(src))) if (al.has(m[1])) out.add(al.get(m[1]));
    const re2 = /([A-Za-z_$][\w$]*)\s*\.classList\s*\.contains/g;
    while ((m = re2.exec(src))) if (al.has(m[1])) out.add(al.get(m[1]));
    const re3 = /document\.getElementById\('([^']+)'\)\s*\.\s*(?:textContent|value)(?!\s*=[^=])/g;
    while ((m = re3.exec(src))) out.add(m[1]);
    return out;
}

/* ── 방 읽기 ─────────────────────────────────────────────── */

function scenesOf(room) {
    const out = new Set();
    const html = read(path.join(room, 'index.html'));
    let m;
    const re = /data-scene="([^"]+)"/g;
    while ((m = re.exec(html))) out.add(m[1]);
    for (const f of jsFiles(room)) {
        const src = read(f);
        let k;
        const r2 = /dataset\.scene\s*=\s*'([^']+)'/g;
        while ((k = r2.exec(src))) out.add(k[1]);
        if (/dataset\.scene\s*=\s*KEY/.test(src)) {
            const kk = /KEY\s*=\s*'([^']+)'/.exec(src);
            if (kk) out.add(kk[1]);
        }
    }
    return [...out];
}

function owns(src) {
    const out = new Set();
    let m;
    const r1 = /KEY\s*=\s*'([^']+)'/g;
    while ((m = r1.exec(src))) out.add(m[1]);
    const r2 = /dataset\.scene\s*===\s*'([^']+)'/g;
    while ((m = r2.exec(src))) out.add(m[1]);
    return [...out];
}

/**
 * 옆칸의 손잡이를 뽑는다.
 * 이름표(id)가 없으면 갈래 이름(class)을 손잡이의 표로 삼는다.
 */
function knobsOf(room, scenes) {
    const html = read(path.join(room, 'index.html'));
    const aside = html.indexOf('<aside');
    const body = aside < 0 ? html : html.slice(aside);

    const VOID = new Set(['input', 'img', 'br', 'hr', 'meta', 'link', 'source', 'use']);
    const stack = [];
    const tabScope = {};
    let panelTab = null, m;

    const rb = /<button[^>]*class="[^"]*sidebar-tab-btn[^"]*"[^>]*>/g;
    while ((m = rb.exec(body))) {
        const t = /data-tab="([^"]+)"/.exec(m[0]);
        const only = /data-for-scene="([^"]+)"/.exec(m[0]);
        if (t) tabScope[t[1]] = only ? only[1] : null;
    }

    const seen = new Set(), knobs = [];
    const re = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g;
    while ((m = re.exec(body))) {
        const closing = m[0][1] === '/';
        const tag = m[1].toLowerCase();
        const attrs = m[2] || '';

        if (closing) {
            for (let i = stack.length - 1; i >= 0; i--) if (stack[i].tag === tag) { stack.length = i; break; }
            continue;
        }

        const only = (/data-for-scene="([^"]+)"/.exec(attrs) || [])[1] || null;
        const id = (/id="([^"]+)"/.exec(attrs) || [])[1] || null;
        const cls = (/class="([^"]*)"/.exec(attrs) || [])[1] || '';

        if (id && /^tabPanel_/.test(id)) panelTab = id.replace('tabPanel_', '');

        if ((tag === 'button' || tag === 'input' || tag === 'select')
            && !/sidebar-tab-btn|scene-btn/.test(cls)) {

            // 이름표가 없으면 무엇으로 부르는가. data- 이름이 있으면 그것이
            // 진짜 손잡이다 (소화 실험실은 [data-enzyme] 로 잡는다).
            // 없으면 갈래 이름을 쓰되, 온 사이트가 함께 쓰는 흔한 이름은 건너뛴다.
            const 흔한 = /^(sim-|meter-|sidebar-)/;
            const dataName = (/\sdata-([a-z-]+)=/.exec(attrs.replace(/data-for-scene=/, '')) || [])[1];
            const key = id
                || (dataName ? 'data-' + dataName : null)
                || cls.split(/\s+/).filter(c => c && c !== 'active' && !흔한.test(c))[0]
                || cls.split(/\s+/).filter(c => c && c !== 'active')[0];
            if (key && !seen.has(key)) {
                seen.add(key);
                let lim = only;
                if (!lim) for (let i = stack.length - 1; i >= 0; i--) if (stack[i].only) { lim = stack[i].only; break; }
                if (!lim && panelTab && tabScope[panelTab]) lim = tabScope[panelTab];
                knobs.push({
                    표: key,
                    보임: lim ? lim.split(',').map(s => s.trim()) : scenes.slice(),
                    적힘: !!lim
                });
            }
        }

        if (!VOID.has(tag) && !/\/\s*$/.test(attrs)) stack.push({ tag, only });
    }
    return knobs;
}

/* ── 따지기 ─────────────────────────────────────────────── */

let 흠 = 0, 총 = 0;
const 보고 = [];

for (const room of ROOMS) {
    const scenes = scenesOf(room);
    const files = jsFiles(room).map(f => {
        const src = read(f);
        return { f, src, owns: owns(src), 씀: writesTo(src), 읽음: readsFrom(src) };
    });
    const app = files.find(x => path.basename(x.f) === 'app.js');
    const layers = files.filter(x => x.owns.length);

    const lines = [], 흠줄 = [];
    for (const k of knobsOf(room, scenes)) {
        if (process.env.SHOW) lines.push('   · ' + k.표 + ' → ' + k.보임.join(',') + (k.적힘 ? '' : '  (표 없음)'));
        for (const s of k.보임) {
            총++;
            let 그리는곳 = layers.filter(l => l.owns.includes(s));
            if (!그리는곳.length && app) 그리는곳 = [app];

            // data-enzyme 은 코드에서 '[data-enzyme]' 로도, dataset.enzyme 으로도 나온다.
            // 다만 'mode' 같은 흔한 낱말은 그냥 들어 있다고 잡은 것이 아니다 —
            // dataset.mode 나 data-mode 꼴로 쓰였을 때만 잡은 것으로 친다.
            const 낱말 = k.표.replace(/^data-/, '');
            const 잡는가 = src => (k.표 === 낱말)
                ? words(src).has(k.표)
                : (src.includes('dataset.' + 낱말) || src.includes('data-' + 낱말));
            let 길 = 그리는곳.some(l => 잡는가(l.src)) ? '곧바로' : null;

            if (!길 && app && 잡는가(app.src)) {
                const via = [...app.씀].find(id2 =>
                    id2 !== k.표 && 그리는곳.some(l => l !== app && l.읽음.has(id2)));
                if (via) 길 = '캔버스 → ' + via + ' → 겹판';
            }
            if (!길) {
                흠줄.push('     ✘ ' + s + ' 화면의 [' + k.표 + '] — 이 화면을 그리는 곳이 잡지 않는다');
                흠++;
            }
        }
    }
    보고.push('=== ' + room + ' (장면 ' + scenes.length + ': ' + scenes.join(', ') + ')\n'
        + [...lines, ...흠줄].join('\n') + (흠줄.length ? '' : (lines.length ? '' : '     흠 없음 ✔')));
}

console.log(보고.join('\n'));
console.log('\n손잡이×화면 ' + 총 + '칸 가운데 헛것 ' + 흠 + '개');
