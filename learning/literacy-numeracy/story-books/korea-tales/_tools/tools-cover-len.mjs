/* 표지 소개글이 얼마나 긴지 잰다.
 * 세로 화면(810×1080·768×1024)에서는 표지 오른쪽 칸이 먼저 넘친다.
 * 소개 문단 합이 300자를 넘으면 넘칠 위험이 있다. */
import fs from 'fs';

const rows = [];
for (const d of fs.readdirSync('.', { withFileTypes: true }).filter(x => x.isDirectory())) {
  const p = d.name + '/app.js';
  if (!fs.existsSync(p)) continue;
  const s = fs.readFileSync(p, 'utf8');
  const i = s.indexOf('<h1>');
  if (i < 0) continue;
  const j = s.indexOf('coverToc()', i);
  const block = s.slice(i, j < 0 ? i + 4000 : j);
  const ps = [...block.matchAll(/<p>([\s\S]*?)<\/p>/g)].map(x => x[1].replace(/\s/g, '').length);
  if (!ps.length) continue;
  rows.push([ps.reduce((a, b) => a + b, 0), ps, d.name]);
}
rows.sort((a, b) => b[0] - a[0]);
for (const [t, ps, name] of rows)
  console.log(String(t).padStart(4) + '자  ' + ps.join('+').padEnd(20) + (t > 300 ? '← 세로에서 넘칠라  ' : '  ') + name);
