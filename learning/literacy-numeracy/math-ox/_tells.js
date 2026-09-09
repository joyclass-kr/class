/*
 * 수학 OX — 읽지 않고도 답을 찍을 수 있는 말투를 잡는다.
 *   node _tells.js          걸린 문항을 보여 준다
 *   node _tells.js --stats  말투별 X 비율만 본다
 * 이 파일은 어느 페이지에서도 불러 쓰지 않는 검사 도구다.
 *
 * 규칙: "반드시·항상·언제나"나 "~만 ~하면 된다", "~뿐이다" 같은 말이 들어간
 * 문항은 **정답이 X이면** 읽지 않고도 X를 찍을 수 있다. 정답이 O이면 오히려
 * 좋다 — 그런 말이 나와도 참일 수 있다는 것을 가르쳐 주기 때문이다.
 * 그래서 잡아야 할 것은 '이런 말이 든 X 문항'뿐이다.
 */
const fs = require("fs");
const path = require("path");

const TELLS = [
  ["극단어", /반드시|항상|언제나|절대로|무조건/],
  ["한정", /만 [가-힣]{0,8}하면 된다|만 확인하면|만 보면 된다|기만 하면/],
  ["유일", /뿐이다|하나뿐|한 가지뿐/],
];

const src = fs.readFileSync(path.join(__dirname, "data.js"), "utf8");
const data = eval(src.match(/window\.MATH_OX_DATA = (\[[\s\S]*\n\]);/)[1]);

const statsOnly = process.argv.includes("--stats");
const baseX = data.filter((q) => q.answer === "X").length / data.length;

console.log(`\n전체 ${data.length}문항 · X ${(baseX * 100).toFixed(0)}%\n`);

let flagged = 0;
for (const [name, re] of TELLS) {
  const hit = data.filter((q) => re.test(q.prompt));
  const bad = hit.filter((q) => q.answer === "X");
  const ok = hit.length - bad.length;
  console.log(
    `${name.padEnd(5)} 든 문항 ${String(hit.length).padStart(3)}개 · ` +
      `X ${String(bad.length).padStart(3)}개(고칠 것) · O ${String(ok).padStart(3)}개(그대로 두어도 좋음)`
  );
  if (!statsOnly) {
    for (const q of bad) {
      flagged++;
      console.log(`   ✗ ${q.id} [${q.subject}/${q.unit}] ${q.prompt}`);
    }
  } else {
    flagged += bad.length;
  }
}

console.log(
  flagged === 0
    ? "\n읽지 않고 찍히는 X 문항 없음\n"
    : `\n고쳐야 할 X 문항 ${flagged}개 — 극단어를 빼거나, 진술을 더 그럴듯하게 다시 쓴다\n`
);
process.exitCode = flagged === 0 ? 0 : 1;
