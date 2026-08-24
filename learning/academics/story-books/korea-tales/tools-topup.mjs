/* 이미 들어 있는 글에 문단을 덧대기만 한다. 통째로 다시 쓰지 않아도 된다.
 *
 * 쓰는 법:  node tools-topup.mjs 책이름 덧댈것.json
 *
 * 덧댈것.json 꼴 — 열쇠는 "칸번호+쪽", 값은 덧댈 문단들.
 *   {
 *     "2L":  ["뒤에 붙일 문단", "또 하나"],
 *     "5R^": ["앞에 끼울 문단"]          ← 열쇠 끝에 ^를 붙이면 맨 앞에 넣는다
 *   }
 * 칸번호는 tools-count.mjs가 왼쪽에 찍어 주는 번호다(1부터).
 *
 * 안전장치는 tools-refill.mjs와 같다. CHAPTERS 밖은 건드리지 않고,
 * 칸 수와 그림 이름이 달라지면 되돌리고, 문법이 깨져도 되돌린다. */
import fs from 'fs';
import { execFileSync } from 'child_process';

const [slug, patchPath] = process.argv.slice(2);
if (!slug || !patchPath) {
  console.error('쓰는 법: node tools-topup.mjs 책이름 덧댈것.json');
  process.exit(1);
}

const appPath = slug + '/app.js';
const backup = fs.readFileSync(appPath, 'utf8');
const start = backup.indexOf('[', backup.indexOf('const CHAPTERS'));
const end = backup.indexOf('\n];', start) + 2;
const CH = eval('(' + backup.slice(start, end) + ')');
const beats = CH.flatMap(c => c.beats || []);
const beforeArts = beats.map(b => b.art);

const patch = JSON.parse(fs.readFileSync(patchPath, 'utf8'));
let added = 0;
for (const key of Object.keys(patch)) {
  const m = /^(\d+)([LR])(\^?)$/.exec(key);
  if (!m) { console.error('열쇠가 이상하다: ' + key); process.exit(1); }
  const idx = Number(m[1]) - 1;
  if (!beats[idx]) { console.error('그런 칸이 없다: ' + key); process.exit(1); }
  const side = m[2] === 'L' ? 'left' : 'right';
  const lines = patch[key];
  beats[idx][side] = m[3] ? lines.concat(beats[idx][side]) : beats[idx][side].concat(lines);
  added += lines.length;
}

const BS = String.fromCharCode(92);
const q = s => '"' + s.split(BS).join(BS + BS).split('"').join(BS + '"') + '"';
const arr = (a, pad) => '[\n' + a.map(s => pad + '    ' + q(s)).join(',\n') + '\n' + pad + ']';

function render(chapters) {
  const out = ['['];
  chapters.forEach((c, ci) => {
    out.push('    {');
    out.push('        num: ' + c.num + ',');
    out.push('        title: ' + q(c.title) + ',');
    out.push('        beats: [');
    (c.beats || []).forEach((b, bi) => {
      out.push('            {');
      out.push('                art: ' + q(b.art) + ',');
      if (b.emoji) out.push('                emoji: ' + q(b.emoji) + ',');
      out.push('                left: ' + arr(b.left, '                ') + ',');
      out.push('                right: ' + arr(b.right, '                '));
      out.push('            }' + (bi < c.beats.length - 1 ? ',' : ''));
    });
    out.push('        ]' + (c.moral ? ',' : ''));
    if (c.moral) {
      out.push('        moral: ' + q(c.moral) + ',');
      out.push('        question: ' + q(c.question));
    }
    out.push('    }' + (ci < chapters.length - 1 ? ',' : ''));
  });
  out.push('];');
  return out.join('\n');
}

fs.writeFileSync(appPath, backup.slice(0, start) + render(CH) + backup.slice(end + 1), 'utf8');

function bail(why) {
  fs.writeFileSync(appPath, backup, 'utf8');
  console.error(why + ' — 되돌렸다');
  process.exit(1);
}
try { execFileSync('node', ['--check', appPath]); } catch { bail('문법이 깨졌다'); }
const s2 = fs.readFileSync(appPath, 'utf8');
const CH2 = eval('(' + s2.slice(s2.indexOf('[', s2.indexOf('const CHAPTERS')), s2.indexOf('\n];') + 2) + ')');
const afterArts = CH2.flatMap(c => c.beats || []).map(b => b.art);
if (afterArts.join('|') !== beforeArts.join('|')) bail('칸이 어긋났다');

console.log(slug + ': 문단 ' + added + '개를 덧댔다');
