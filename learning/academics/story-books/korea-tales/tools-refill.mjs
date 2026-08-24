// 펼침면 글을 통째로 갈아 끼운다. 손으로 고치다 파일을 자르는 사고를 막는다.
//     node tools-refill.mjs <slug> <새글.json>
//
// 새글.json 은 [{art, left:[...], right:[...]}, ...] 꼴이다. art 이름으로 칸을 찾는다.
// 넣지 않은 칸은 그대로 둔다.
//
// 반드시 지키는 것
//   1. CHAPTERS 바깥은 한 글자도 안 건드린다 (문항·함수·쪽 나눔 그대로)
//   2. 칸 수와 art 이름이 전과 똑같아야 통과시킨다
//   3. 끝나고 node --check 로 문법을 본다. 틀리면 되돌린다.
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const [slug, jsonPath] = process.argv.slice(2);
const dir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const appPath = path.join(dir, slug, 'app.js');
const src = fs.readFileSync(appPath, 'utf8');
const backup = src;

const i = src.indexOf('const CHAPTERS');
const j = src.indexOf('\n];', i);
if (i < 0 || j < 0) { console.error('CHAPTERS를 못 찾음'); process.exit(1); }
const head = src.slice(0, src.indexOf('[', i));
const tail = src.slice(j + 3);
const CH = eval('(' + src.slice(src.indexOf('[', i), j + 2) + ')');

const news = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const byArt = new Map(news.map(n => [n.art, n]));

const beforeArts = [];
let changed = 0;
for (const c of CH) for (const b of (c.beats || [])) {
  beforeArts.push(b.art);
  const n = byArt.get(b.art);
  if (!n) continue;
  if (n.left) b.left = n.left;
  if (n.right) b.right = n.right;
  changed++;
}
const missing = [...byArt.keys()].filter(a => !beforeArts.includes(a));
if (missing.length) { console.error('그 책에 없는 그림 이름:', missing.join(', ')); process.exit(1); }

const BS = String.fromCharCode(92);
const q = s => '"' + s.split(BS).join(BS + BS).split('"').join(BS + '"') + '"';
const arr = (a, ind) => a.length
  ? '[\n' + a.map(x => ind + '    ' + q(x)).join(',\n') + '\n' + ind + ']'
  : '[]';

let out = '[\n';
CH.forEach((c, ci) => {
  out += '    {\n';
  out += '        num: ' + c.num + ',\n';
  out += '        title: ' + q(c.title) + ',\n';
  if (c.beats) {
    out += '        beats: [\n';
    c.beats.forEach((b, bi) => {
      out += '            {\n';
      out += '                art: ' + q(b.art) + ',\n';
      out += '                emoji: ' + q(b.emoji) + ',\n';
      out += '                left: ' + arr(b.left || [], '                ') + ',\n';
      out += '                right: ' + arr(b.right || [], '                ') + '\n';
      out += '            }' + (bi < c.beats.length - 1 ? ',' : '') + '\n';
    });
    out += '        ]';
  }
  if (c.moral !== undefined) out += ',\n        moral: ' + q(c.moral);
  if (c.question !== undefined) out += ',\n        question: ' + q(c.question);
  out += '\n    }' + (ci < CH.length - 1 ? ',' : '') + '\n';
});
out += '];';

fs.writeFileSync(appPath, head + out + tail, 'utf8');
try {
  execSync('node --check "' + appPath + '"', { stdio: 'pipe' });
} catch (e) {
  fs.writeFileSync(appPath, backup, 'utf8');
  console.error('문법이 깨져서 되돌렸다');
  process.exit(1);
}
const s2 = fs.readFileSync(appPath, 'utf8');
const CH2 = eval('(' + s2.slice(s2.indexOf('[', s2.indexOf('const CHAPTERS')), s2.indexOf('\n];') + 2) + ')');
const afterArts = [];
for (const c of CH2) for (const b of (c.beats || [])) afterArts.push(b.art);
if (afterArts.join('|') !== beforeArts.join('|')) {
  fs.writeFileSync(appPath, backup, 'utf8');
  console.error('칸이 어긋나서 되돌렸다');
  process.exit(1);
}
let ch = 0, par = 0;
for (const c of CH2) for (const b of (c.beats || [])) for (const k of ['left', 'right'])
  (b[k] || []).forEach(p => { ch += p.replace(/\s/g, '').length; par++; });
console.log(slug + ': ' + changed + '칸 · 펼침당 ' + Math.round(ch / afterArts.length)
  + '자 · 칸당 문단 ' + (par / afterArts.length / 2).toFixed(1) + '개');
