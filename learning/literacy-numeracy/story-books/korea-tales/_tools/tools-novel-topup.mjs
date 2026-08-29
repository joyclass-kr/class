/* 소설틀 책의 문단 안에 문장을 끼워 넣는다.
 *
 * 동화틀은 문단을 새로 만들어 덧댔는데, 그러다 이야기 순서가 백 곳 넘게 어긋났다.
 * 소설틀은 문단이 이어지는 산문이라 **문단 안에** 문장을 끼우는 편이 안전하다.
 * 문단을 새로 만들지 않으니 대사가 두 도막 날 자리도 안 생긴다.
 *
 * 쓰는 법:  node tools-novel-topup.mjs 책이름 덧댈것.json
 *
 * 덧댈것.json 꼴 — 열쇠는 "장.문단" 또는 "장.문단@문장자리"
 *   {
 *     "1.2":    ["문단 맨 뒤에 붙일 문장."],
 *     "1.5@1":  ["첫 문장 바로 뒤에 끼울 문장."],
 *     "3.0@0":  ["문단 맨 앞에 놓을 문장."]
 *   }
 * 장 번호는 1부터, 문단 자리는 0부터다(tools-novel-dump.mjs가 찍어 주는 번호).
 * 문장 자리는 `. ! ?` 뒤에서 끊어 센다. <br>가 든 대사 도막은 하나로 본다.
 *
 * 안전장치
 *   - CHAPTERS 밖은 건드리지 않는다
 *   - 장 수와 문단 수가 달라지면 되돌린다
 *   - node --check가 실패하면 되돌린다
 */
import fs from 'fs';
import { execFileSync } from 'child_process';

const [slug, patchPath] = process.argv.slice(2);
if (!slug || !patchPath) {
  console.error('쓰는 법: node tools-novel-topup.mjs 책이름 덧댈것.json');
  process.exit(1);
}

const appPath = slug + '/app.js';
const backup = fs.readFileSync(appPath, 'utf8');
const start = backup.indexOf('[', backup.indexOf('const CHAPTERS'));
const end = backup.indexOf('\n];', start) + 2;
const CH = eval('(' + backup.slice(start, end) + ')');
const beforeShape = CH.map(c => (c.paras || []).length).join('|');

// 문장으로 끊는다. <br>로 이어진 대사 도막은 통째로 하나다.
function sentences(t) {
  const out = [];
  for (const chunk of t.split(/(<br\s*\/?>)/i)) {
    if (/^<br/i.test(chunk)) { out[out.length - 1] += chunk; continue; }
    const parts = chunk.split(/(?<=[.!?…])\s+/).filter(x => x !== '');
    if (!out.length) out.push(...parts);
    else if (parts.length) { out[out.length - 1] += parts[0]; out.push(...parts.slice(1)); }
  }
  return out.filter(x => x.length);
}

const patch = JSON.parse(fs.readFileSync(patchPath, 'utf8'));
let added = 0;
for (const key of Object.keys(patch)) {
  const m = /^(\d+)\.(\d+)(?:@(\d+))?$/.exec(key);
  if (!m) { console.error('열쇠가 이상하다: ' + key); process.exit(1); }
  const ch = CH.find(c => c.num === Number(m[1]));
  if (!ch || !ch.paras) { console.error('그런 장이 없다: ' + key); process.exit(1); }
  const pi = Number(m[2]);
  if (!ch.paras[pi]) { console.error('그런 문단이 없다: ' + key); process.exit(1); }
  const ss = sentences(ch.paras[pi]);
  const at = m[3] === undefined ? ss.length : Number(m[3]);
  if (at > ss.length) {
    console.error('그 자리가 없다: ' + key + ' (문장 ' + ss.length + '개)');
    process.exit(1);
  }
  ch.paras[pi] = ss.slice(0, at).concat(patch[key], ss.slice(at)).join(' ')
    .replace(/\s*(<br\s*\/?>)\s*/gi, '<br>');
  added += patch[key].length;
}

const BS = String.fromCharCode(92);
const q = s => '"' + s.split(BS).join(BS + BS).split('"').join(BS + '"') + '"';

function render(chapters) {
  const out = ['['];
  chapters.forEach((c, ci) => {
    out.push('    {');
    out.push('        num: ' + c.num + ',');
    out.push('        title: ' + q(c.title) + ',');
    if (c.art) out.push('        art: [' + c.art.map(q).join(', ') + '],');
    out.push('        paras: [');
    c.paras.forEach((p, i) => out.push('            ' + q(p) + (i < c.paras.length - 1 ? ',' : '')));
    out.push('        ]');
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
if (CH2.map(c => (c.paras || []).length).join('|') !== beforeShape) bail('문단 수가 달라졌다');

const chars = CH2.reduce((n, c) => n + c.paras.join('').replace(/<[^>]*>/g, '').replace(/\s/g, '').length, 0);
console.log(slug + ': 문장 ' + added + '개를 끼워 넣었다 · 본문 ' + chars + '자');
