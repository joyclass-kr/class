/* 영어판 글이 한쪽에 들어가는지 잰다.
 *
 * 그림책 틀은 쪽을 재서 나누지 않는다. 한쪽에 담기는 만큼만 써야 하고, 넘치면
 * 아이가 글칸 안에서 스크롤을 하게 된다. 우리말 눈금은 「한쪽 85~105자 · 4~6문단」인데
 * 영어는 글자 폭이 달라 그대로 쓸 수 없다.
 *
 * 낱말 수만 세면 맞지 않는다. 실제로 넘치는지는 **줄 수**가 정한다. 문단마다
 * 아래 여백이 붙으므로 같은 낱말 수라도 문단이 많으면 줄이 늘어난다.
 * 그래서 브라우저에서 실제 치수를 재어 와 그대로 흉내 낸다(1280x720 기준,
 * 가장 낮은 화면이라 여기서 안 넘치면 다른 화면에서도 안 넘친다).
 *
 *   본문 한쪽 : 칸 242px · 한 줄 25.7px · 문단 아래 여백 4px · 한 줄에 56자
 *   표지      : 세 문단·520자 안쪽 (제목이 접히는 줄 수가 책마다 달라 px 로는 못 셈한다)
 *
 * 이 도구를 통과해도 마지막에는 _sweep-all.html 로 여섯 화면을 다 봐야 한다.
 * 여기서 재는 것은 글 길이뿐이고, 그림이나 화면 비율까지는 못 본다.
 *
 * 쓰는 법: node _tools/tools-en-count.mjs [책이름 ...]   (안 적으면 영어판 있는 전권)
 *         node _tools/tools-en-count.mjs --all           (넘치지 않는 책도 다 보여 준다)
 */
import fs from 'fs';

const SPREAD = { pane: 242, line: 25.7, gap: 4, chars: 56 };
const COVER = { maxParas: 3, maxChars: 520 };

const showAll = process.argv.includes('--all');
const listed = process.argv.slice(2).filter(a => !a.startsWith('--'));
const books = listed.length ? listed
  : fs.readdirSync('.', { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);

const textOf = p => String(typeof p === 'string' ? p : p.t).replace(/<[^>]+>/g, '');
// 한 문단이 몇 줄로 그려지는지. 짧은 문단도 한 줄은 차지한다.
const linesOf = (t, perLine) => Math.max(1, Math.ceil(t.length / perLine));
const heightOf = (parts, m) =>
  parts.reduce((a, p) => a + linesOf(textOf(p), m.chars) * m.line + m.gap, 0);

let seen = 0, bad = 0;
const out = [];
for (const b of books) {
  const p = b + '/app.js';
  if (!fs.existsSync(p)) continue;
  const src = fs.readFileSync(p, 'utf8');
  const i = src.indexOf('const EN = {');
  if (i < 0) continue;                       // 영어판이 없는 책
  let EN;
  try {
    EN = eval('(' + src.slice(src.indexOf('{', i), src.indexOf('\n};', i) + 2) + ')');
  } catch (e) {
    out.push(`## ${b}\n  영어판을 읽지 못했다: ${e.message}`);
    bad++;
    continue;
  }
  // 소설틀은 beats 가 없고 paras 를 쓴다. 쪽을 재서 나누므로 이 눈금과 상관이 없다.
  if (!EN.chapters || !EN.chapters[0] || !EN.chapters[0].beats) continue;
  seen++;

  const hits = [];
  // 표지는 px 로 셈하지 않는다. 제목이 몇 줄로 접히는지, 차례가 몇 줄인지에 따라
  // 남는 자리가 크게 달라져서 셈이 맞지 않았다(줄여 놓고도 넘친 적이 있다).
  // 대신 시범본(좁쌀 한 톨)에서 확인된 선을 그대로 쓴다: 세 문단·520자 안쪽.
  const coverChars = EN.cover.intro.reduce((a, t) => a + textOf(t).length, 0);
  if (EN.cover.intro.length > COVER.maxParas) hits.push(`표지 ${EN.cover.intro.length}문단 (${COVER.maxParas}문단까지)`);
  if (coverChars > COVER.maxChars) hits.push(`표지 ${coverChars}자 (${COVER.maxChars}자까지)`);

  for (const c of EN.chapters) {
    for (const bt of c.beats) {
      for (const side of ['left', 'right']) {
        const h = heightOf(bt[side], SPREAD);
        if (h > SPREAD.pane) {
          hits.push(`${bt.art} ${side === 'left' ? '왼' : '오른'} ${Math.round(h)}px / 자리 ${SPREAD.pane}px`);
        }
      }
    }
  }
  if (hits.length) {
    bad++;
    out.push(`## ${b}\n  ${hits.join('\n  ')}`);
  } else if (showAll) {
    out.push(`   ${b} 넉넉함`);
  }
}

if (out.length) console.log(out.join('\n'));
console.log(`\n영어판 ${seen}권을 쟀다. 넘치는 책 ${bad}권.`);
process.exit(bad ? 1 : 0);
