/* 책을 안 읽어도 풀리는 문제를 골라낸다.
 *
 *   node _tools/tools-quizfair.mjs            전권
 *   node _tools/tools-quizfair.mjs dangun     한 권
 *
 * 세 가지를 본다.
 *   1) 말 흘림   문제에 쓴 말이 정답 보기에만 그대로 나온다
 *                 "무엇에 닿으면" → "불에 닿으면" 만 그 말을 쓴다
 *   2) 착한 답   나머지 보기가 다 나쁜 짓이고 정답만 착한 짓이다(거꾸로도 마찬가지)
 *                 읽지 않아도 도덕으로 고른다
 *   3) 긴 답     정답만 눈에 띄게 길다
 *
 * 기계는 후보만 낸다. 멀쩡한 것이 섞이니 눈으로 가려야 한다. */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.slice(1)), '..');
const only = process.argv.slice(2);

/* 흔한 토씨·맺음말. 이것만 겹치는 것은 흘림이 아니다. */
const COMMON = ['하나', '무엇', '누구', '어디', '어떻', '무슨', '까닭', '이야기', '사람', '하는', '했나', '되었', '가요', '나요',
  '라고', '이라', '으로', '하고', '에서', '에게', '였다', '했다', '이다', '리는', '이가', '지요', '어요', '인가', '리고', '으며'];

/* 두 글줄이 함께 가진 두 글자 이상의 토막을 모은다. */
function shared(a, b) {
  const out = new Set();
  for (let i = 0; i < a.length - 1; i++) {
    for (let len = Math.min(8, a.length - i); len >= 2; len--) {
      const piece = a.slice(i, i + len);
      if (/[^가-힣]/.test(piece)) continue;
      if (b.includes(piece)) { out.add(piece); break; }
    }
  }
  return [...out].filter(p => !COMMON.some(c => p.includes(c) || c.includes(p)));
}

const BAD = ['침을 뱉', '달아났', '찡그', '비웃', '놀렸', '때렸', '쫓아냈', '내쫓', '빼앗', '훔쳤',
  '모른 척', '거짓말', '골탕', '짓밟', '버리고', '외면', '고개를 돌렸', '못 본 척', '욕심'];
const GOOD = ['도와', '나누어', '나눠', '감싸', '돌보', '구해', '안아', '덮어', '지켜',
  '양보', '기다려', '데려다', '풀어 주', '살려 주', '내려놓'];
const has = (s, list) => list.some(w => s.includes(w));

const books = fs.readdirSync(ROOT).sort()
  .filter(b => !b.startsWith('_') && fs.existsSync(path.join(ROOT, b, 'app.js')))
  .filter(b => !only.length || only.includes(b));

let n = 0;
for (const b of books) {
  const src = fs.readFileSync(path.join(ROOT, b, 'app.js'), 'utf8');
  const i = src.indexOf('const QUIZ');
  if (i < 0) continue;
  let QUIZ;
  try { QUIZ = eval('(' + src.slice(src.indexOf('[', i), src.indexOf('\n];', i) + 2) + ')'); } catch { continue; }

  const hits = [];
  QUIZ.forEach((q, idx) => {
    const ans = q.choices[q.answer];
    const others = q.choices.filter((_, j) => j !== q.answer);
    const why = [];

    const leak = shared(q.q, ans).filter(p => !others.some(o => o.includes(p)));
    if (leak.length) why.push('말 흘림 · ' + leak.join(', '));

    /* 나머지 보기가 다 나쁜 짓이면 정답이 무엇이든 도덕으로 고를 수 있다.
       착한 말 목록에 기대면 "가만히 들여다보았다" 같은 답을 놓친다. */
    if (others.every(o => has(o, BAD)) && !has(ans, BAD)) why.push('나머지가 다 나쁜 짓');
    if (others.every(o => has(o, GOOD)) && !has(ans, GOOD)) why.push('나머지가 다 착한 짓');

    const maxOther = Math.max(...others.map(o => o.length));
    if (ans.length >= maxOther + 5) why.push('긴 답 · ' + ans.length + '자 vs ' + maxOther + '자');

    if (why.length) hits.push('  ' + (idx + 1) + '. ' + q.q + '\n     정답: ' + ans + '\n     [' + why.join(' / ') + ']');
  });

  if (hits.length) { console.log('## ' + b); console.log(hits.join('\n')); n += hits.length; }
}
console.log('\n' + books.length + '권 가운데 후보 ' + n + '문항.');
console.log('기계는 후보만 낸다. 멀쩡한 것이 섞이니 눈으로 가려야 한다.');
