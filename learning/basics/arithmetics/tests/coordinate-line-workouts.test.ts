import test from "node:test";
import assert from "node:assert/strict";
import { coordinateLineAnswerLatex, createCoordinateLineProblemSet, createCoordinateLineReviewProblems, sameCoordinateLineAnswer } from "../lib/coordinate-line-workouts.ts";

test("each set covers coordinate, line, distance, and absorbed transform types", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const set = createCoordinateLineProblemSet(seed);
    assert.deepEqual(set.problems.map(({ kind }) => kind), [
      "distance", "internal-division", "two-point-line", "parallel-line",
      "perpendicular-line", "point-line-distance", "line-translation", "point-reflection",
    ]);
    assert.ok(set.problems.every(({ answer }) => answer.every(Number.isInteger)));
  }
});
test("line answers are normalized with positive first coefficient", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    for (const problem of createCoordinateLineProblemSet(seed).problems.filter(({ answerMode }) => answerMode === "line")) {
      assert.ok(problem.answer[0] > 0);
    }
  }
});
test("answer comparison requires ordered exact entries", () => {
  assert.equal(sameCoordinateLineAnswer(["3", "-2", "5"], [3, -2, 5]), true);
  assert.equal(sameCoordinateLineAnswer(["3", "5", "-2"], [3, -2, 5]), false);
});
test("review problems preserve requested kinds and stop at two", () => {
  const kinds = createCoordinateLineProblemSet(1).problems.map(({ kind }) => kind);
  assert.deepEqual(createCoordinateLineReviewProblems([kinds[4], kinds[4], kinds[2]], 2).map(({ kind }) => kind), [kinds[4], kinds[2]]);
});
test("line display omits coefficients one and zero terms", () => {
  assert.equal(coordinateLineAnswerLatex({ id: "a", kind: "parallel-line", label: "", prompt: "", latex: "", answer: [1, 2, 1], answerMode: "line" }), "x+2y+1=0");
  assert.equal(coordinateLineAnswerLatex({ id: "b", kind: "parallel-line", label: "", prompt: "", latex: "", answer: [1, -1, 0], answerMode: "line" }), "x-y=0");
});

test("좌표와 직선 문항은 계산 조건을 생략하지 않고 질문형으로 표시한다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createCoordinateLineProblemSet(seed).problems;
    assert.ok(problems.every(({ prompt }) => prompt.endsWith("?")));
    assert.match(problems[1].prompt, /선분 \$AB\$를 \d+:\d+으로 내분하는 점 \$P\$의 좌표는\?/);
    for (const problem of problems.filter(({ answerMode }) => answerMode === "line")) {
      assert.match(problem.prompt, /(?:방정식|꼴의 식)은\?/);
    }
    for (const problem of problems.filter(({ kind }) => ["two-point-line", "parallel-line", "perpendicular-line"].includes(kind))) {
      assert.match(problem.prompt, /\$a>0\$/);
      assert.match(problem.prompt, /계수가 서로소/);
      assert.match(problem.prompt, /\$ax\+by\+c=0\$/);
    }
  }
});
