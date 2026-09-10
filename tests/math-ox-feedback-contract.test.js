const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const app = fs.readFileSync(
  path.join(root, "learning", "literacy-numeracy", "math-ox", "app.js"),
  "utf8"
);
const dataSource = fs.readFileSync(
  path.join(root, "learning", "literacy-numeracy", "math-ox", "data.js"),
  "utf8"
);

function loadQuestions() {
  const marker = "window.MATH_OX_DATA = ";
  const start = dataSource.indexOf(marker);
  const end = dataSource.indexOf("\n];", start);
  return vm.runInNewContext(`(${dataSource.slice(start + marker.length, end + 2)})`, Object.create(null));
}

test("과목과 단원 선택은 부드러운 공통 클릭음을 사용한다", () => {
  assert.match(app, /class="filter-btn/);
  assert.match(app, /class="unit-btn/);
  assert.doesNotMatch(app, /(?:data-subject|data-unit)="[^`]+data-sfx="none"/);
});

test("답 버튼은 클릭음 대신 정답 여부에 맞는 결과음만 재생한다", () => {
  assert.match(app, /data-choice="O" data-sfx="none"/);
  assert.match(app, /data-choice="X" data-sfx="none"/);
  assert.match(app, /ClassGameSfx\?\.play\(isCorrect \? "success" : "error"\)/);
});

test("세 자리 수 덧셈 문항은 자연스러운 문장과 읽기 쉬운 예시를 쓴다", () => {
  const question = loadQuestions().find((item) => item.id === 277);
  assert.equal(question.prompt, "두 개의 세 자리 수를 더하면, 그 합도 세 자리 수이다.");
  assert.match(question.reason, /999\+999=1998/);
  assert.doesNotMatch(question.prompt, /두 세 자리 수/);
});
