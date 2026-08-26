import assert from "node:assert/strict";
import test from "node:test";

import {
  createExponentialLogFunctionProblems,
  exponentialLogFunctionProblems,
} from "../lib/exponential-log-function-workouts.ts";

const expectedKinds = [
  "exponential-monotonicity",
  "exponential-asymptote",
  "exponential-base",
  "logarithmic-domain",
  "logarithmic-asymptote",
  "inverse-functions",
  "exponential-model",
  "logarithmic-model",
];

test("지수·로그함수는 그래프와 활용의 핵심 여덟 유형을 다룬다", () => {
  assert.deepEqual(
    exponentialLogFunctionProblems.map(({ kind }) => kind),
    expectedKinds,
  );
});

test("모든 지수·로그함수 문제는 명시적 질문과 유일한 정답을 가진다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createExponentialLogFunctionProblems(seed);
    assert.equal(problems.length, 8);
    assert.equal(new Set(problems.map(({ id }) => id)).size, 8);

    for (const problem of problems) {
      assert.match(problem.prompt ?? "", /\?$/);
      assert.equal(problem.choices.length, 4);
      assert.equal(problem.choices.filter(({ correct }) => correct).length, 1);
      assert.equal(new Set(problem.choices.map(({ latex }) => latex)).size, 4);
      assert.equal(problem.choices.find(({ correct }) => correct)?.latex, problem.correctLatex);
    }
  }
});

test("새 시드는 서로 다른 지수·로그함수 문제 세트를 만든다", () => {
  const signatures = new Set(
    Array.from({ length: 20 }, (_, index) =>
      createExponentialLogFunctionProblems(index + 1)
        .map(({ latex, correctLatex }) => `${latex}|${correctLatex}`)
        .join("::"),
    ),
  );
  assert.equal(signatures.size, 20);
});
