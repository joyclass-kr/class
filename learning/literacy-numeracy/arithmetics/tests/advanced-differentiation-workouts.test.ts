import assert from "node:assert/strict";
import test from "node:test";

import {
  advancedDifferentiationProblems,
  createAdvancedDifferentiationProblems,
} from "../lib/advanced-differentiation-workouts.ts";

const expectedKinds = [
  "parametric-first",
  "parametric-second",
  "implicit-circle",
  "implicit-product",
  "inverse-derivative-data",
  "inverse-derivative-polynomial",
  "logarithmic-differentiation",
];

test("여러 가지 미분법의 핵심 일곱 알고리즘을 다룬다", () => {
  assert.deepEqual(
    advancedDifferentiationProblems.map(({ kind }) => kind),
    expectedKinds,
  );
});

test("여러 가지 미분법 문제는 유일한 정답과 서로 다른 네 보기를 가진다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createAdvancedDifferentiationProblems(seed);
    assert.equal(problems.length, 7);
    for (const problem of problems) {
      assert.match(problem.prompt ?? "", /\?$/);
      assert.equal(problem.choices.length, 4);
      assert.equal(problem.choices.filter(({ correct }) => correct).length, 1);
      assert.equal(new Set(problem.choices.map(({ latex }) => latex)).size, 4);
      assert.equal(problem.choices.find(({ correct }) => correct)?.latex, problem.correctLatex);
    }
  }
});

test("매개변수·음함수·역함수 문제는 시드에 따라 실제 식이 바뀐다", () => {
  const signatures = new Set(
    Array.from({ length: 20 }, (_, index) =>
      createAdvancedDifferentiationProblems(index + 1)
        .map(({ latex, correctLatex }) => `${latex}|${correctLatex}`)
        .join("::"),
    ),
  );
  assert.equal(signatures.size, 20);
});
