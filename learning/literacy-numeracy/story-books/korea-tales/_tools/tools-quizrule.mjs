/* 문제 풀이가 사이트 규칙대로인지 실제로 돌려 본다.
 *
 *   node _tools/tools-quizrule.mjs            전권
 *   node _tools/tools-quizrule.mjs dangun     한 권
 *
 * 재는 것은 넷이다.
 *   1) 열 때마다 보기 차례가 섞인다
 *   2) 틀린 보기는 빨갛게 남고, 맞는 것을 고를 때까지 다시 고를 수 있다
 *   3) 쪽을 옮겨 문제 쪽이 다시 그려져도 표시와 진행 수가 그대로 남는다
 *   4) 책을 닫았다 다시 열면 처음으로 돌아간다 — 남겨 두면 안 된다
 *
 * 3과 4는 반대말이 아니다. 한 번 연 동안에는 남고, 닫으면 지워진다.
 * 그래서 답을 localStorage 같은 데 저장하면 4를 어기게 된다.
 *
 * grep 으로 코드 모양만 보면 "있는데 안 되는" 것을 놓친다. 그래서 app.js 를
 * 진짜로 돌린 뒤, 문제 쪽을 두 번 그려 보고 그 사이에 답을 고른 것처럼
 * 꾸며서, 두 번째 그림에 표시가 남는지 눈으로 확인하듯 글자로 확인한다.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.slice(1)), '..');
const only = process.argv.slice(2);

/* tools-boot.mjs 와 같은 가짜 화면. 여기서는 첫 화면을 그리는 데까지만 쓴다. */
function stub() {
    const el = () => ({
        style: {}, classList: { add() {}, remove() {}, contains: () => false, toggle() {} },
        dataset: {}, children: [], scrollHeight: 100, clientHeight: 100,
        offsetHeight: 100, offsetWidth: 100, textContent: '', innerHTML: '',
        addEventListener() {}, removeEventListener() {}, remove() {},
        appendChild: c => c, removeChild: c => c, replaceChild: c => c,
        insertBefore: c => c, contains: () => false,
        firstChild: null, lastChild: null, parentNode: null, nextSibling: null,
        querySelector: () => el(), querySelectorAll: () => [],
        getBoundingClientRect: () => ({ width: 100, height: 100, top: 0, left: 0 }),
        focus() {}, click() {}, setAttribute() {}, getAttribute: () => null,
        insertAdjacentHTML() {}, closest: () => null, scrollTo() {}, cloneNode: () => el(),
    });
    const doc = {
        getElementById: () => el(), querySelector: () => el(), querySelectorAll: () => [],
        createElement: () => el(), addEventListener() {}, removeEventListener() {},
        body: el(), documentElement: el(), head: el(), fonts: { ready: Promise.resolve() },
        readyState: 'complete', title: '',
    };
    const box = {
        document: doc, console: { log() {}, warn() {}, error() {} },
        addEventListener() {}, removeEventListener() {}, dispatchEvent() {},
        getComputedStyle: () => ({ getPropertyValue: () => '', fontSize: '16px', lineHeight: '24px' }),
        innerWidth: 900, innerHeight: 1200, devicePixelRatio: 1, scrollTo() {},
        setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0, clearInterval() {},
        requestAnimationFrame: () => 0, cancelAnimationFrame() {},
        localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
        location: { href: '', hash: '', search: '', reload() {} },
        navigator: { language: 'ko', userAgent: 'node' },
        matchMedia: () => ({ matches: false, addEventListener() {}, addListener() {} }),
        ResizeObserver: class { observe() {} unobserve() {} disconnect() {} },
        IntersectionObserver: class { observe() {} unobserve() {} disconnect() {} },
        Image: class { set src(v) {} },
        fetch: () => Promise.resolve({ ok: true, text: () => Promise.resolve('') }),
        Math, JSON, Date, Array, Object, String, Number, Boolean, Set, Map, Promise,
        RegExp, Error, parseInt, parseFloat, isNaN, encodeURIComponent, decodeURIComponent,
    };
    box.window = box; box.globalThis = box;
    return box;
}

/* app.js 뒤에 붙여, 안에 갇힌 것들을 밖으로 꺼내 온다. */
const PROBE = `
;__out.quizPage = typeof quizPage === 'function' ? quizPage : null;
__out.picked = typeof QUIZ_PICKED !== 'undefined' ? QUIZ_PICKED : null;
__out.wrong = typeof QUIZ_WRONG !== 'undefined' ? QUIZ_WRONG : null;
__out.order = typeof QUIZ_ORDER !== 'undefined' ? QUIZ_ORDER : null;
__out.quiz = typeof QUIZ !== 'undefined' ? QUIZ : null;
__out.initQuiz = typeof initQuiz === 'function' ? String(initQuiz) : '';
`;

function open(book) {
    const src = fs.readFileSync(path.join(ROOT, book, 'app.js'), 'utf8');
    const box = stub();
    box.__out = {};
    vm.createContext(box);
    new vm.Script(src + PROBE, { filename: book + '/app.js' }).runInContext(box, { timeout: 5000 });
    return box.__out;
}

const 문제 = [];
function 흠(book, 말) { 문제.push('  ' + book + ' — ' + 말); }

const books = fs.readdirSync(ROOT).sort()
    .filter(b => !b.startsWith('_') && fs.existsSync(path.join(ROOT, b, 'app.js')))
    .filter(b => !only.length || only.includes(b));

for (const b of books) {
    let o;
    try { o = open(b); } catch (e) { 흠(b, '책이 안 열린다: ' + String(e.message).split('\n')[0]); continue; }

    if (!o.picked || !o.wrong) { 흠(b, '고른 것을 기억할 자리가 없다 (QUIZ_PICKED / QUIZ_WRONG)'); continue; }
    if (!o.quizPage) { 흠(b, '문제 쪽을 그리는 함수를 못 찾았다'); continue; }

    /* 1) 보기 차례를 섞는가 — 같은 책을 여러 번 열어 차례가 달라지는지 본다. */
    const 여러번 = [];
    for (let i = 0; i < 12; i++) {
        try { 여러번.push(JSON.stringify(open(b).order)); } catch { /* 위에서 이미 잡았다 */ }
    }
    if (new Set(여러번).size === 1 && o.quiz.some(q => q.choices.length > 1))
        흠(b, '열 때마다 보기 차례가 그대로다');

    /* 2) 틀려도 다시 고를 수 있는가 — 채점 코드를 읽는다. */
    const 채점 = o.initQuiz.replace(/\s+/g, ' ');
    if (!/if \(chosen !== q\.answer\) \{ btn\.classList\.add\('incorrect'\); QUIZ_WRONG\[qi\]\.add\(chosen\); return; \}/.test(채점))
        흠(b, '틀리면 그대로 잠긴다 — 맞힐 때까지 다시 고르게 해야 한다');

    /* 3) 다시 그려도 표시가 남는가 — 진짜로 두 번 그려 견준다. */
    const 인자 = o.quizPage.length ? [0] : [];   // 소설틀은 몇 쪽으로 나뉘어 있다
    const 처음 = o.quizPage(...인자);
    if (/\b(correct|incorrect|graded)\b/.test(처음))
        흠(b, '아직 아무것도 안 골랐는데 표시가 붙어 있다');

    /* 첫 문제에서 하나는 틀리고 하나는 맞힌 것으로 꾸민다. */
    const q0 = o.quiz[0];
    const 틀린번호 = q0.choices.map((_, i) => i).find(i => i !== q0.answer);
    o.wrong[0].add(틀린번호);
    o.picked[0] = q0.answer;
    const 다시 = o.quizPage(...인자);

    const 남았나 = (표, 몇) => (다시.match(new RegExp(표, 'g')) || []).length >= 몇;
    if (!남았나('quiz-choice correct', 1)) 흠(b, '다시 그리면 맞힌 표시가 사라진다');
    if (!남았나('quiz-choice incorrect', 1)) 흠(b, '다시 그리면 빨간 표시가 사라진다');
    if (!/quiz-item graded/.test(다시)) 흠(b, '다시 그리면 다 푼 문제가 도로 풀린다');

    /* 진행 수도 기억한 값에서 세는지 본다. */
    if (/quizProgress">\s*0\s/.test(다시) || /quizProgress">0 of/.test(다시))
        흠(b, '다시 그리면 진행 수가 0으로 돌아간다');

    /* 4) 책을 닫았다 열면 처음으로 돌아가는가.
          새로 연 책에서는 아무것도 골라 둔 것이 없어야 한다. 답을 어딘가에
          저장해 두면 여기서 걸린다. */
    const 새로 = open(b);
    if (새로.picked.some(v => v !== null) || 새로.wrong.some(w => w.size > 0))
        흠(b, '책을 다시 열었는데 고른 것이 남아 있다 — 닫으면 지워져야 한다');

    const src = fs.readFileSync(path.join(ROOT, b, 'app.js'), 'utf8');
    if (/localStorage[^\n]*(QUIZ|quiz|picked|wrong|답)/i.test(src))
        흠(b, '답을 저장해 두는 것 같다 — 닫으면 지워져야 한다');
}

if (문제.length) { console.log('## 규칙을 어기는 곳'); console.log(문제.join('\n')); }
console.log('\n잰 책 ' + books.length + '권, 어긋난 곳 ' + 문제.length + '군데.');
console.log('열 때마다 섞기 · 맞힐 때까지 다시 고르기 · 쪽을 오가도 표시 남기 ·');
console.log('닫으면 처음으로 돌아가기, 넷을 잰다.');
if (문제.length) process.exitCode = 1;
