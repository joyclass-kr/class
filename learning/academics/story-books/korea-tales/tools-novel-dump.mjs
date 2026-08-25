/* 소설틀 책의 본문을 장·문단 번호와 함께 뽑는다.
 * tools-novel-topup.mjs에 쓸 열쇠("장.문단")를 여기서 읽는다.
 *
 * 쓰는 법: node tools-novel-dump.mjs 책이름 [장번호]
 */
import fs from 'fs';

const [slug, only] = process.argv.slice(2);
const src = fs.readFileSync(slug + '/app.js', 'utf8');
const i = src.indexOf('const CHAPTERS');
const CH = eval('(' + src.slice(src.indexOf('[', i), src.indexOf('\n];', i) + 2) + ')');

for (const c of CH) {
  if (only && String(c.num) !== only) continue;
  const len = (c.paras || []).join('').replace(/<[^>]*>/g, '').replace(/\s/g, '').length;
  console.log(`\n===== ${c.num}장 「${c.title}」  문단 ${(c.paras || []).length}개 · 그림 ${(c.art || []).length}장 · ${len}자`);
  (c.paras || []).forEach((p, n) => {
    const chars = p.replace(/<[^>]*>/g, '').replace(/\s/g, '').length;
    console.log(`${c.num}.${String(n).padStart(2)} (${String(chars).padStart(3)}) ${p}`);
  });
}
