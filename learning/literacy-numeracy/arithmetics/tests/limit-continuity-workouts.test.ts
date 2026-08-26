import assert from "node:assert/strict";
import test from "node:test";

import {
  createLimitSet,
  sameLimitAnswers,
} from "../lib/limit-continuity-workouts.ts";

test("극한·연속은 쉬운 대입부터 연속 조건까지 일곱 방법을 한 장에 묶는다", () => {
  assert.deepEqual(
    createLimitSet(1).problems.map(({ kind }) => kind),
    [
      "direct-substitution",
      "factorization",
      "rationalization",
      "infinity",
      "infinity-rationalization",
      "one-sided",
      "continuity",
    ],
  );
});

test("좌극한과 우극한은 부호 분석 결과를 모두 요구한다", () => {
  const problem = createLimitSet(4).problems.find(({ kind }) => kind === "one-sided");
  assert.ok(problem);
  assert.match(problem.latex, /\|x-/);
  assert.equal(problem.answers[0], -problem.answers[1]);
  assert.equal(sameLimitAnswers(["2", "5"], [2, 5]), true);
  assert.equal(sameLimitAnswers(["2"], [2, 5]), false);
});

test("무한대 근호식은 최고차항 비교와 다른 유리화 유형이다", () => {
  const problem = createLimitSet(4).problems.find(
    ({ kind }) => kind === "infinity-rationalization",
  );
  assert.ok(problem);
  assert.match(problem.latex, /x\\to\\infty/);
  assert.match(problem.latex, /\\sqrt\{x\^2/);
});

test("각 극한 유형은 숫자만 바꾼 같은 식을 반복하지 않는다", () => {
  const problems = createLimitSet(4).problems;
  assert.equal(problems.length, 7);
  assert.equal(new Set(problems.map(({ latex }) => latex)).size, 7);
  assert.match(problems.at(-1)?.prompt ?? "", /k/);
});
