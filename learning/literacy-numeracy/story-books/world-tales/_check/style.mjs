// 글 다듬기 검사 — 세 트랙 어디서나 쓸 수 있다.
//
//   node _check/style.mjs <책들이 있는 폴더> [책이름]
//   예) node _check/style.mjs .
//       node _check/style.mjs ../korea-tales
//       node _check/style.mjs ../world-novels tom-sawyer
//
// 동화틀("left"/"right" 배열)과 소설틀(paras 안의 백틱 문자열)을 둘 다 읽는다.
// 세계명작 58권을 다듬으면서 실제로 걸렸던 것들을 그대로 찾는다.
// 기계는 후보만 내놓는다. 판단은 사람이 한다.
import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2] || '.';
const only = process.argv[3] || null;

// ── 찾는 것 ────────────────────────────────────────────────
// 1) 압축서술 — 장면으로 보여 줄 것을 한 줄로 때운 자리
const SUMMARY = [
    ['채비·변장', /(채비를|차비를|준비를)\s*(했|갖추|마쳤)|꾸몄습니다|꾸몄지요|변장했/],
    ['되풀이 뭉갬', /되풀이됐|또 깜빡|또 속아|또 넘어갔/],
    ['말로 때움', /(그동안의|그간의|자초지종|있었던) 일을 (다 )?(이야기|말)했|일러 주었|설명해 주었/],
];

// 2) 어른 말 — 아이들 책에 안 쓰는 말
const HARD = ['파리한', '파리했', '연방 ', '반신반의', '기진맥진', '우악스', '삿대질',
    '눈시울', '이맛살', '남루한', '아연실색', '망연자실', '전전긍긍', '고군분투'];

// 3) 책이 제 편집을 해명하는 문장
const SELF = /이 책은 [가-힣]|이 책에서는|이 책이 담|여기서는 .{0,10}(줄였|다듬었|바꿨)/;

// 4) 낡은 물건 이름 — 그 자리에서 뜻을 알려 주는지 사람이 봐야 한다
const OLD_THING = ['코담뱃갑', '골무', '됫박', '밀랍', '물레가락', '부싯깃', '나막신',
    '도롱이', '삿갓', '쟁기', '여물통', '길쌈', '무두질', '풀무'];

const strRe = () => new RegExp('"((?:[^"\\\\]|\\\\.)*)"', 'g');

// 본문만 골라낸다. 코드가 딸려 오지 않게 한글이 있는 것만 남긴다.
function storyText(body) {
    const out = [];
    let m;
    const r = strRe();
    while ((m = r.exec(body))) out.push(m[1]);
    // 소설틀: paras: [ `...`, `...` ]
    const pr = /paras:\s*\[([\s\S]*?)\n\s*\]/g;
    let p;
    while ((p = pr.exec(body))) {
        const br = /`([^`]*)`/g;
        let b;
        while ((b = br.exec(p[1]))) out.push(b[1]);
    }
    return out.filter(t => t.length >= 12 && /[가-힣]/.test(t) && !/[{}<>=]{2}|function |const |=>/.test(t));
}

const books = fs.readdirSync(root)
    .filter(d => fs.existsSync(path.join(root, d, 'app.js')))
    .filter(d => !only || d === only)
    .sort();

let total = 0;
for (const b of books) {
    const s = fs.readFileSync(path.join(root, b, 'app.js'), 'utf8');
    // 본문만. 「읽고 나서」와 영어판은 뺀다 — 해설에서 "이 책은…"은 정상이다.
    const start = Math.max(0, s.indexOf('const CHAPTERS = ['));
    let end = s.length;
    for (const k of ['const AFTERWORD', 'const CHAPTER_SEGS', 'const EN']) {
        const i = s.indexOf(k, start);
        if (i > 0 && i < end) end = i;
    }
    const body = s.slice(start, end);
    const lines = [];

    const texts = storyText(body);
    texts.forEach((t, i) => {
        for (const [label, rx] of SUMMARY) {
            if (!rx.test(t)) continue;
            // "일러 주었다" 뒤에 곧바로 그 내용이 나오면 요약이 아니라 안내다.
            if (/일러 주었|설명해 주었|알려 주었/.test(t) &&
                texts.slice(i, i + 3).some(x => x.includes('"'))) continue;
            lines.push(['압축 · ' + label, t]);
        }
        for (const w of HARD) if (t.includes(w)) lines.push(['어른 말 · ' + w.trim(), t]);
        if (SELF.test(t)) lines.push(['제 얘기', t]);
        for (const w of OLD_THING) if (t.includes(w)) lines.push(['낡은 물건 · ' + w, t]);
    });

    // 서술을 한 문장씩 끊어 놓았는가 (동화틀만)
    // 압축서술을 풀다 보면 문장마다 문단을 나누는 버릇이 든다. 분량은 차는데 문단이 무너진다.
    {
        let sides = 0; const choppy = [];
        const br2 = /"art":\s*"([^"]+)"[\s\S]*?"left":\s*\[([\s\S]*?)\],\s*"right":\s*\[([\s\S]*?)\]\s*\}/g;
        let z;
        while ((z = br2.exec(body))) {
            for (const [side, raw] of [['왼', z[2]], ['오른', z[3]]]) {
                const out = []; let y; const rr = strRe();
                while ((y = rr.exec(raw))) out.push(y[1]);
                // 대사는 빼고 서술만 센다
                const tell = out.filter(t => !t.trim().startsWith('\\"') && !t.trim().startsWith("'"));
                if (tell.length < 3) continue;
                const oneSentence = t => (t.replace(/<br>/g, ' ').match(/[.!?]|다\.|요\./g) || []).length <= 1;
                sides++;
                if (tell.every(oneSentence)) choppy.push(z[1] + ' ' + side);
            }
        }
        // 한 쪽만 그러면 흔한 일이다. 책 전체가 그러면 문단 규칙이 무너진 것이다.
        if (sides >= 10 && choppy.length / sides >= 0.4) {
            lines.push(['한 문장씩 끊는 버릇', sides + '쪽 가운데 ' + choppy.length + '쪽이 서술을 문장마다 끊었다 (' + choppy.slice(0, 4).join(', ') + ' …)']);
        }
    }

    // 해설이 이야기의 끝을 짚는가 (동화틀만)
    const aw = s.match(/const AFTERWORD = \{[\s\S]*?\n\};/);
    if (aw) {
        const beats = [];
        const br = /"art":\s*"([^"]+)"[\s\S]*?"left":\s*\[([\s\S]*?)\],\s*"right":\s*\[([\s\S]*?)\]\s*\}/g;
        let x;
        while ((x = br.exec(body))) {
            const grab = raw => { const o = []; let y; const rr = strRe(); while ((y = rr.exec(raw))) o.push(y[1]); return o.join(' '); };
            beats.push(grab(x[2]) + ' ' + grab(x[3]));
        }
        if (beats.length >= 4) {
            const words = t => (t.match(/[가-힣]{2,}/g) || []);
            const early = new Set(words(beats.slice(0, -2).join(' ')));
            const endOnly = [...new Set(words(beats.slice(-2).join(' ')))].filter(w => !early.has(w));
            const awText = [...aw[0].matchAll(/"([^"]{10,})"/g)].map(v => v[1]).join(' ');
            if (endOnly.length && !endOnly.some(w => awText.includes(w))) {
                lines.push(['해설이 끝을 안 짚음', '(「읽고 나서」가 마지막 두 펼침면을 언급하지 않는다)']);
            }
        }
    }

    if (!lines.length) continue;
    total += lines.length;
    console.log('## ' + b);
    for (const [tag, t] of lines) console.log('   [' + tag + '] ' + t.replace(/<br>/g, ' ').slice(0, 74));
    console.log();
}
console.log(books.length + '권 가운데 후보 ' + total + '곳.');
console.log('기계는 후보만 낸다. 멀쩡한 것이 많이 섞이니 눈으로 가려야 한다.');
