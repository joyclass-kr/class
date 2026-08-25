/* 문단을 덧대다 보면 이야기 순서가 어긋난다. 겹말은 tools-verify-all.mjs가 잡지만
 * 순서는 못 잡는다. 여기서는 어긋나기 쉬운 자리를 찾아 준다.
 *
 *  1) 앞 문단이 쉼표로 끝나는데 뒤 문단이 그 말을 잇지 않는 경우
 *     — "…지나는데," 다음에는 반드시 그 결과가 와야 한다
 *  2) 이어지는 두 문단이 같은 주어로 시작하는 경우 — 같은 말을 두 번 한 것이기 쉽다
 *  3) 완성·끝남을 말한 문단이 그것을 쓰는 문단보다 뒤에 오는 경우
 *
 * 쓰는 법: node tools-order-check.mjs [책이름 ...]   (안 적으면 전부) */
import fs from 'fs';

const books = process.argv.slice(2).length ? process.argv.slice(2)
  : fs.readdirSync('.', { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);

const isQuote = s => /^["'“”]/.test(s.trim());
const head = s => s.replace(/^["'“”]/, '').replace(/\s/g, '').slice(0, 4);

let hits = 0;
for (const b of books) {
  const p = b + '/app.js';
  if (!fs.existsSync(p)) continue;
  const src = fs.readFileSync(p, 'utf8');
  const i = src.indexOf('const CHAPTERS');
  if (i < 0) continue;
  let CH;
  try { CH = eval('(' + src.slice(src.indexOf('[', i), src.indexOf('\n];', i) + 2) + ')'); } catch { continue; }
  const beats = CH.flatMap(c => c.beats || []);
  beats.forEach((beat, n) => {
    for (const side of ['left', 'right']) {
      const a = beat[side] || [];
      for (let k = 0; k + 1 < a.length; k++) {
        const cur = a[k], nxt = a[k + 1];
        const where = `${b} 칸${n + 1}${side === 'left' ? 'L' : 'R'} @${k + 1}`;
        // 1) 쉼표로 끊긴 말이 이어지지 않는다
        if (/[,]\s*$/.test(cur) && !isQuote(cur)) {
          hits++;
          console.log(`[말이 끊김] ${where}\n    ${cur}\n  → ${nxt}`);
          continue;
        }
        // 2) 같은 주어가 잇달아 나온다
        // 아그작 아그작처럼 일부러 되풀이하는 소리말은 뺀다
        const 소리말 = s2 => /^[가-힣]{2,4}[.,!]?$/.test(s2.trim());
        if (!isQuote(cur) && !isQuote(nxt) && !소리말(cur) && head(cur).length >= 3 && head(cur) === head(nxt)) {
          hits++;
          console.log(`[같은 주어 잇달림] ${where}\n    ${cur}\n  → ${nxt}`);
          continue;
        }
        // 4) 쉼표로 끊긴 대사 사이에 딴 문장이 끼어들었다
        //    '내가 온다고 해도 안 그치던 아기가,' / 호랑이는 발밑만 보았어요 / '곶감이라니까 뚝 그쳤어.'
        //    — 가운데 문장이 두 도막 난 말을 갈라놓았다
        if (isQuote(cur) && /[,]["'”]?\s*$/.test(cur) && !isQuote(nxt)) {
          hits++;
          console.log(`[대사가 갈림] ${where}
    ${cur}
  → ${nxt}`);
          continue;
        }
        // 5) 이어지는 두 대사가 거의 같은 말이다
        if (isQuote(cur) && isQuote(nxt)) {
          const A = cur.replace(/[^가-힣]/g, ''), B = nxt.replace(/[^가-힣]/g, '');
          if (A.length >= 5 && B.length >= 5) {
            const short = A.length < B.length ? A : B, long = A.length < B.length ? B : A;
            let same = 0;
            for (const c of new Set(short)) if (long.includes(c)) same++;
            if (same / new Set(short).size > 0.85) {
              hits++;
              console.log(`[대사가 겹침] ${where}
    ${cur}
  → ${nxt}`);
              continue;
            }
          }
        }
        // 3) 다 되었다는 말이 그것을 쓰는 말보다 뒤에 온다
        if (/(완성되었|다 되었|만들어졌)/.test(nxt) && /(쓰고|입고|들고|얹고|썼|입었)/.test(cur)) {
          hits++;
          console.log(`[순서 뒤집힘] ${where}\n    ${cur}\n  → ${nxt}`);
        }
      }
    }
  });
}
console.log(hits ? `\n걸린 자리 ${hits}곳` : '\n이상 없음');
