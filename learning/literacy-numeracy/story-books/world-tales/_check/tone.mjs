/* 「읽고 난 반응」 넷 가운데 오답만 말끝이 딴 꼴이면 말투로 걸러진다.
   보기를 다 읽지 않고 가락만 듣고도 고를 수 있으니, 문제가 아무것도 묻지 않는 셈이다.

   잣대는 좁게 잡는다. 넷이 저마다 다르면 튀는 것이 없어 아무 표도 안 난다.
   나쁜 것은 "셋은 한 꼴, 하나만 딴 꼴"일 때뿐이다. 전래동화 방이 짚어 준 대로다.

   말끝 목록을 정규식으로 못 박지 않고 끝 두 글자만 본다. 목록을 정하면 그 목록
   안에서만 쓰게 되어, 문장마다 자연스러운 말끝을 고르라는 뜻과 어긋난다. */
import fs from 'node:fs';
import { tally } from './seen.mjs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const 맺음 = c => c.trim().replace(/[.]$/, '').slice(-2);

const books = fs.readdirSync(ROOT).filter(d => !d.startsWith('_') && fs.existsSync(path.join(ROOT, d, 'app.js'))).sort();
let hit = 0;
const seen = tally(books.length);
const 통계 = {};

for (const b of books) {
    const s = fs.readFileSync(path.join(ROOT, b, 'app.js'), 'utf8');
    const i = s.indexOf('"wide": true');
    if (i < 0) { seen.skip(b, '넓은 문항이 없다'); continue; }
    const a = s.indexOf('[', i), z = s.indexOf(']', a);
    const opts = [...s.slice(a, z).matchAll(/"((?:[^"\\]|\\.)*)"/g)].map(m => m[1]);
    const am = s.slice(z).match(/"answer":\s*(\d+)/);
    if (opts.length < 3 || !am) { seen.skip(b, '보기를 읽지 못했다'); continue; }
    const ai = Number(am[1]);
    opts.forEach(o => { const e = 맺음(o); 통계[e] = (통계[e] || 0) + 1; });

    const 남들 = opts.filter((_, k) => k !== ai).map(맺음);
    if (new Set(남들).size === 1 && 남들[0] !== 맺음(opts[ai])) {
        hit++;
        console.log('## ' + b);
        console.log('   나머지 셋은 모두 ' + 남들[0] + ', 오답만 ' + 맺음(opts[ai]));
        console.log('   ✗ ' + opts[ai]);
    }
}

const 총 = Object.values(통계).reduce((x, y) => x + y, 0);
const 줄 = Object.entries(통계).sort((x, y) => y[1] - x[1]).slice(0, 8)
    .map(([e, n]) => e + ' ' + Math.round(n / 총 * 100) + '%').join(' · ');
console.log('');
seen.report();
console.log('보기 ' + 총 + '개 — ' + 줄);
console.log('오답만 말끝이 딴 꼴인 책 ' + hit + '권.');
