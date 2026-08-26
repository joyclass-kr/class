import assert from "node:assert/strict";
import test from "node:test";

import {
  createMathematicalInductionProblems,
  mathematicalInductionProblems,
} from "../lib/mathematical-induction-workouts.ts";

const expectedKinds = [
  "base-case",
  "induction-hypothesis",
  "add-next-term",
  "complete-sum-step",
  "divisibility-step",
  "recurrence-step",
  "odd-number-sum",
];

test("수학적 귀납법은 첫 단계부터 귀납 단계까지 일곱 유형을 다룬다", () => {
  assert.deepEqual(
    mathematicalInductionProblems.map(({ kind }) => kind),
    expectedKinds,
  );
});

test("모든 귀납법 문제는 정답 하나와 서로 다른 선택지 네 개를 가진다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createMathematicalInductionProblems(seed);
    assert.equal(problems.length, 7);
    assert.equal(new Set(problems.map(({ id }) => id)).size, 7);

    for (const problem of problems) {
      assert.match(problem.prompt ?? "", /\?$/);
      assert.equal(problem.choices.length, 4);
      assert.equal(problem.choices.filter(({ correct }) => correct).length, 1);
      assert.equal(new Set(problem.choices.map(({ latex }) => latex)).size, 4);
      assert.equal(problem.choices.find(({ correct }) => correct)?.latex, problem.correctLatex);
    }
  }
});

test("새 시드는 계수가 다른 귀납법 문제 세트를 만든다", () => {
  const signatures = new Set(
    Array.from({ length: 20 }, (_, index) =>
      createMathematicalInductionProblems(index + 1)
        .map(({ latex, correctLatex }) => `${latex}|${correctLatex}`)
        .join("::"),
    ),
  );
  assert.ok(signatures.size >= 10);
});
