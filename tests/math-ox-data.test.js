const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const APP_PATH = path.join(__dirname, "..", "learning", "literacy-numeracy", "math-ox", "app.js");

function loadQuestions() {
  const source = fs.readFileSync(APP_PATH, "utf8");
  const marker = "const mathOxData = ";
  const start = source.indexOf(marker);
  const end = source.indexOf("\n  ];", start);

  assert.notEqual(start, -1, "mathOxData 시작 위치를 찾을 수 없습니다.");
  assert.notEqual(end, -1, "mathOxData 끝 위치를 찾을 수 없습니다.");

  return vm.runInNewContext(
    `(${source.slice(start + marker.length, end + 4)})`,
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
