import assert from "node:assert/strict";
import test from "node:test";

import { createMiddleRationalProblemSet } from "../lib/middle-rational-add-subtract.ts";
import { createMiddleRationalMixedProblemSet } from "../lib/middle-rational-mixed.ts";
import { createMiddleRationalMultiplyProblemSet } from "../lib/middle-rational-multiply-divide.ts";

test("중학교 혼합계산은 불필요한 양수 괄호와 반복 지시문을 쓰지 않는다", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    const { problems } = createMiddleRationalMixedProblemSet(seed);
    for (const problem of problems) {
      assert.equal(
        problem.prompt,
        problem.kind === "fraction-comparison"
          ? "알맞은 부등호는?"
          : "",
      );
      assert.doesNotMatch(problem.latex, /\([1-9](?:\\frac)?\)/, problem.latex);
      assert.doesNotMatch(problem.latex, /\\times\([1-9]/, problem.latex);
      assert.doesNotMatch(problem.latex, /\\div\([1-9]/, problem.latex);
      assert.doesNotMatch(problem.latex, /\^\{-1\}/, problem.latex);
    }
  }
});

test("중학교 정수·유리수 문제는 초등 양수 계산으로 퇴화하지 않는다", () => {
  for (let seed = 1; seed <= 250; seed += 1) {
    const mixed = createMiddleRationalMixedProblemSet(seed).problems;
    const addSubtract = createMiddleRationalProblemSet(seed).problems;
    const multiplyDivide = createMiddleRationalMultiplyProblemSet(seed).problems;
    assert.ok([...mixed, ...addSubtract, ...multiplyDivide].every(({ latex }) => latex.includes("-")));

    assert.ok(mixed.every(({ kind }) => kind !== "integer-comparison"));

    const fractionComparison = mixed.find(({ kind }) => kind === "fraction-comparison");
    assert.ok(fractionComparison);
    assert.equal((fractionComparison.latex.match(/-/g) ?? []).length, 2);
  }
});
