import assert from "node:assert/strict";
import test from "node:test";

import {
  createSecondDerivativeApplicationProblems,
  secondDerivativeApplicationProblems,
} from "../lib/second-derivative-application-workouts.ts";

const expectedKinds = [
  "exponential-second",
  "trigonometric-second",
  "cubic-inflection",
  "inflection-parameter",
  "concavity-interval",
  "stationary-classification",
  "inflection-count",
];

test("이계도함수 활용은 계산 원리가 다른 일곱 유형을 다룬다", () => {
  assert.deepEqual(
    secondDerivativeApplicationProblems.map(({ kind }) => kind),
    expectedKinds,
  );
});

test("이계도함수 활용 문제는 유일한 정답과 서로 다른 네 보기를 가진다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createSecondDerivativeApplicationProblems(seed);
    assert.equal(problems.length, 7);
    for (const problem of problems) {
      assert.match(problem.prompt ?? "", /\?$/);
      assert.equal(problem.choices.length, 4);
      assert.equal(problem.choices.filter(({ correct }) => correct).length, 1);
      assert.equal(new Set(problem.choices.map(({ latex }) => latex)).size, 4);
      assert.equal(problem.choices.find(({ correct }) => correct)?.latex, problem.correctLatex);
      assert.doesNotMatch(problem.latex, /undefined|NaN/);
    }
  }
});

test("오목·볼록과 변곡점 조건은 실제로 시드마다 바뀐다", () => {
  const signatures = new Set(
    Array.from({ length: 20 }, (_, index) =>
      createSecondDerivativeApplicationProblems(index + 1)
        .map(({ latex, correctLatex }) => `${latex}|${correctLatex}`)
        .join("::"),
    ),
  );
  assert.equal(signatures.size, 20);
});
