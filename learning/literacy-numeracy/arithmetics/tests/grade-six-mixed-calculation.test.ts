import assert from "node:assert/strict";
import test from "node:test";
import { createGradeSixMixedCalculationSet, normalizeGradeSixMixedAnswer } from "../lib/grade-six-mixed-calculation.ts";

test("6학년 혼합 계산은 분수와 소수 여섯 문제를 결정적으로 만든다", () => {
  const problems = createGradeSixMixedCalculationSet(20260722);
  assert.equal(problems.length, 6);
  assert.deepEqual(createGradeSixMixedCalculationSet(20260722), problems);
  assert.deepEqual(problems.map((problem) => problem.kind), ["fraction", "decimal", "fraction", "decimal", "decimal", "fraction"]);
});

test("분수와 대분수 답안을 기약분수 형태로 비교한다", () => {
  assert.equal(normalizeGradeSixMixedAnswer(" 1  2/4 "), "1 1/2");
  assert.equal(normalizeGradeSixMixedAnswer("6/8"), "3/4");
  assert.equal(normalizeGradeSixMixedAnswer("2.500"), "2.5");
});

test("첫 문제는 괄호나 나누기 1이 필요 없는 진분수 세 항으로 만든다", () => {
  for (let seed = 1; seed <= 250; seed += 1) {
    const first = createGradeSixMixedCalculationSet(seed)[0];
    assert.deepEqual(first.operators, ["÷", "×"]);
    assert.equal(first.operands.length, 3);
    for (const operand of first.operands) {
      assert.equal(operand.kind, "fraction");
      if (operand.kind === "fraction") {
        assert.ok(operand.numerator > 0);
        assert.ok(operand.numerator < operand.denominator);
      }
    }
  }
});

test("소수 답 문제와 분수 답 문제의 입력 양식을 생성 단계에서 구분한다", () => {
  for (let seed = 1; seed <= 250; seed += 1) {
    const problems = createGradeSixMixedCalculationSet(seed);
    for (const problem of problems) {
      assert.ok(problem.operands.length === problem.operators.length + 1);
      assert.doesNotMatch(problem.answer, /NaN|Infinity/);
      if (problem.kind === "decimal") assert.doesNotMatch(problem.answer, /\//);
      if (problem.kind === "fraction") assert.match(problem.answer, /^\d+(?: \d+\/\d+|\/\d+)?$/);
    }
  }
});