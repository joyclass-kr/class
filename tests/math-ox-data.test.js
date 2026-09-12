const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

// 문항은 data.js 에 있다(화면 코드 app.js 와 떼어 두었고 학급 순위전도 같은 파일을 읽는다).
const DATA_PATH = path.join(__dirname, "..", "learning", "literacy-numeracy", "math-ox", "data.js");

function loadQuestions() {
  const source = fs.readFileSync(DATA_PATH, "utf8");
  const marker = "window.MATH_OX_DATA = ";
  const start = source.indexOf(marker);
  const end = source.indexOf("\n];", start);

  assert.notEqual(start, -1, "MATH_OX_DATA 시작 위치를 찾을 수 없습니다.");
  assert.notEqual(end, -1, "MATH_OX_DATA 끝 위치를 찾을 수 없습니다.");

  return vm.runInNewContext(
    `(${source.slice(start + marker.length, end + 2)})`,
    Object.create(null)
  );
}

test("모든 수학 OX 문항은 필수 정보와 고유한 ID·문장을 가진다", () => {
  const questions = loadQuestions();
  const ids = new Set();
  const prompts = new Set();

  assert.ok(questions.length >= 100, "문항 수가 예기치 않게 크게 줄었습니다.");

  for (const question of questions) {
    for (const field of ["subject", "topic", "prompt", "answer", "pitfall", "reason"]) {
      assert.equal(typeof question[field], "string", `${question.id}번의 ${field}가 문자열이 아닙니다.`);
      assert.ok(question[field].trim(), `${question.id}번의 ${field}가 비어 있습니다.`);
    }

    assert.match(question.answer, /^[OX]$/, `${question.id}번의 정답은 O 또는 X여야 합니다.`);
    assert.ok(!ids.has(question.id), `${question.id}번 ID가 중복되었습니다.`);
    assert.ok(!prompts.has(question.prompt.trim()), `${question.id}번 문장이 다른 문항과 중복되었습니다.`);
    assert.doesNotMatch(question.topic, /선생님 저격|명품/, `${question.id}번 주제명이 학생용으로 부적절합니다.`);

    ids.add(question.id);
    prompts.add(question.prompt.trim());
  }
});

test("과목별 O/X 정답은 찍기 전략이 통하지 않도록 치우치지 않는다", () => {
  const questions = loadQuestions();
  const grouped = Object.groupBy(questions, (question) => question.subject);

  for (const [subject, items] of Object.entries(grouped)) {
    assert.ok(items.length >= 8, `${subject} 문항은 최소 8개여야 합니다.`);
    const oRatio = items.filter((item) => item.answer === "O").length / items.length;
    assert.ok(oRatio >= 0.3 && oRatio <= 0.7, `${subject}의 O 정답 비율이 지나치게 치우쳤습니다.`);
  }
});

test("오답으로 등록됐던 핵심 문항의 정답과 조건을 유지한다", () => {
  const questions = loadQuestions();
  const byId = new Map(questions.map((question) => [question.id, question]));

  assert.equal(byId.get(108).answer, "O", "도함수의 극한이 존재하는 108번의 정답은 O입니다.");
  assert.match(byId.get(112).prompt, /P\(B\)>0/, "조건부확률 문항에는 P(B)>0 조건이 필요합니다.");
  assert.equal(byId.get(135).answer, "X", "소수 나눗셈에서 확대된 나머지는 원래 나머지와 다릅니다.");
  assert.match(byId.get(135).reason, /0\.1/, "135번 해설에는 원래 나머지 0.1이 있어야 합니다.");
});

test("연산이 아닌 공간좌표 개념은 수학 OX에서 다룬다", () => {
  const questions = loadQuestions();
  const byId = new Map(questions.map((question) => [question.id, question]));

  assert.equal(byId.get(726).answer, "O");
  assert.match(byId.get(726).prompt, /xy.*대칭이동/);
  assert.equal(byId.get(727).answer, "X");
  assert.match(byId.get(727).reason, /a=0/);
});

test("연산에서 분리한 함수·벡터의 단순 지식은 수학 OX에서 다룬다", () => {
  const questions = loadQuestions();
  const byId = new Map(questions.map((question) => [question.id, question]));

  assert.match(byId.get(728).prompt, /함수/);
  assert.match(byId.get(729).prompt, /역함수/);
  assert.equal(byId.get(730).answer, "X");
  assert.match(byId.get(731).topic, /방향벡터/);
  assert.match(byId.get(732).topic, /법선벡터/);
  assert.equal(byId.get(733).answer, "X");
});

// "반드시·항상·언제나"나 "~만 ~하면 된다", "~뿐이다"가 든 문항은 정답이 X이면
// 읽지 않고도 X를 찍을 수 있다. 정답이 O이면 오히려 좋다 — 그런 말이 나와도
// 참일 수 있다는 것을 가르쳐 주기 때문이다. 그래서 X인 것만 막는다.
test("찍기를 부르는 말투는 정답이 X인 문항에 쓰지 않는다", () => {
  const questions = loadQuestions();
  const tells = [
    /반드시|항상|언제나|절대로|무조건/,
    /만 [가-힣]{0,8}하면 된다|만 확인하면|만 보면 된다|기만 하면/,
    /뿐이다|하나뿐|한 가지뿐/,
  ];
  const flagged = questions
    .filter((question) => question.answer === "X" && tells.some((tell) => tell.test(question.prompt)))
    .map((question) => question.id);

  assert.equal(
    flagged.length,
    0,
    `이런 말이 든 문항은 읽지 않고도 X를 찍을 수 있습니다(${Array.from(flagged).join(", ")}번). 낱말을 빼거나 진술을 다시 쓰세요.`
  );
});
