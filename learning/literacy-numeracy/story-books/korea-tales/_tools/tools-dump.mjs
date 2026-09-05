/* 책의 본문을 한눈에 보이게 뽑는다. 다시 쓸 때 앞에 놓고 본다. */
import fs from 'fs';
for (const d of process.argv.slice(2)) {
  const s = fs.readFileSync(d + '/app.js', 'utf8');
  const i = s.indexOf('const CHAPTERS = [');
  const CH = eval('(' + s.slice(s.indexOf('[', i), s.indexOf('\n];', i) + 2) + ')');
  console.log('===== ' + d);
  for (const c of CH) {
    console.log('-- ' + c.title);
    for (const b of c.beats || []) console.log('[' + b.art + ']\nL: ' + b.left.join(' / ') + '\nR: ' + b.right.join(' / '));
    if (c.moral) console.log('※ ' + c.moral + '  Q:' + c.question);
  }
}
