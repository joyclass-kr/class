import assert from "node:assert/strict";
import test from "node:test";

import { greatestCommonDivisor } from "../lib/grade-five-fraction-one.ts";
import { createGradeSixFractionSet } from "../lib/grade-six-fraction.ts";

function fractionValue(operand: { kind: "fraction"; numerator: number; denominator: number }) {
  return operand.numerator / operand.denominator;
}

test("6분수는 원본 순서대로 열 문제를 만든다", () => {
  const set = createGradeSixFractionSet(20260721);
  assert.equal(set.problems.length, 10);
  assert.deepEqual(set.problems.map((problem) => problem.kind), [
    "addition",
    "addition",
    "subtraction",
    "subtraction",
    "three-factor-product",
    "three-factor-product",
    "mixed-division-fraction",
    "mixed-division-natural",
    "fraction-division-natural",
    "fraction-natural-product",
  ]);
  assert.deepEqual(createGradeSixFractionSet(20260721), set);
});

test("모든 분수 피연산자는 진분수이고 답은 기약분수·대분수·자연수다", () => {
  for (let seed = 1; seed <= 250; seed += 1) {
    for (const problem of createGradeSixFractionSet(seed).problems) {
      for (const operand of problem.operands) {
        if (operand.kind === "natural") {
          assert.ok(operand.value >= 2);
          continue;
        }
        if (operand.kind === "mixed" && problem.kind === "mixed-division-natural") assert.ok(operand.whole >= 48);
        assert.ok(operand.numerator > 0);
        assert.ok(operand.numerator < operand.denominator);
      }
      assert.ok(problem.answer.whole >= 0);
      assert.ok(problem.answer.numerator >= 0);
      assert.ok(problem.answer.numerator < problem.answer.denominator);
      if (problem.answer.numerator > 0) {
        assert.equal(greatestCommonDivisor(problem.answer.numerator, problem.answer.denominator), 1);
      }
    }
  }
});

test("뺄셈의 왼쪽 분수는 오른쪽 분수보다 크다", () => {
  for (let seed = 1; seed <= 250; seed += 1) {
    for (const problem of createGradeSixFractionSet(seed).problems.slice(2, 4)) {
      const [left, right] = problem.operands;
      assert.equal(left.kind, "fraction");
      assert.equal(right.kind, "fraction");
      if (left.kind === "fraction" && right.kind === "fraction") {
        assert.ok(fractionValue(left) > fractionValue(right));
      }
    }
  }
});

test("세 수의 곱셈과 두 가지 대분수 나눗셈은 정확한 전략 구조를 갖는다", () => {
  const naturalPositions = [0, 1];
  for (let seed = 1; seed <= 250; seed += 1) {
    const problems = createGradeSixFractionSet(seed).problems;
    problems.slice(4, 6).forEach((problem, index) => {
      assert.equal(problem.operands.filter((operand) => operand.kind === "natural").length, 1);
      assert.equal(problem.operands[naturalPositions[index]].kind, "natural");
      const fractions = problem.operands.filter((operand) => operand.kind === "fraction");
      const naturalOperand = problem.operands.find((operand) => operand.kind === "natural");
      assert.equal(fractions.length, 2);
      assert.ok(naturalOperand?.kind === "natural");
      if (naturalOperand?.kind === "natural") {
        const rawNumerator = naturalOperand.value * fractions[0].numerator * fractions[1].numerator;
        const rawDenominator = fractions[0].denominator * fractions[1].denominator;
        assert.ok(greatestCommonDivisor(rawNumerator, rawDenominator) > 1);
        assert.ok(problem.answer.denominator <= 30);
      }
      const expected = problem.operands.reduce((product, operand) => (
        product * (operand.kind === "natural" ? operand.value : operand.numerator / operand.denominator)
      ), 1);
      const actual = problem.answer.whole + problem.answer.numerator / problem.answer.denominator;
      assert.ok(Math.abs(expected - actual) < 1e-12);
    });

    const fractionDivision = problems[6];
    const [mixedDividend, fractionDivisor] = fractionDivision.operands;
    assert.equal(mixedDividend.kind, "mixed");
    assert.equal(fractionDivisor.kind, "fraction");
    if (mixedDividend.kind === "mixed" && fractionDivisor.kind === "fraction") {
      const improperNumerator = mixedDividend.whole * mixedDividend.denominator + mixedDividend.numerator;
      const expectedNumerator = improperNumerator * fractionDivisor.denominator;
      const expectedDenominator = mixedDividend.denominator * fractionDivisor.numerator;
      const actual = fractionDivision.answer.whole + fractionDivision.answer.numerator / fractionDivision.answer.denominator;
      assert.ok(Math.abs(expectedNumerator / expectedDenominator - actual) < 1e-12);
      assert.ok(greatestCommonDivisor(expectedNumerator, expectedDenominator) > 1);
    }

    const directDivision = problems[7];
    const [mixedNumber, directDivisor] = directDivision.operands;
    assert.equal(mixedNumber.kind, "mixed");
    assert.equal(directDivisor.kind, "natural");
    if (mixedNumber.kind === "mixed" && directDivisor.kind === "natural") {
      assert.equal(mixedNumber.whole % directDivisor.value, 0);
      assert.equal(mixedNumber.numerator % directDivisor.value, 0);
      assert.ok(mixedNumber.whole * mixedNumber.denominator + mixedNumber.numerator >= 1000);
      assert.equal(directDivision.answer.whole, mixedNumber.whole / directDivisor.value);
      assert.equal(directDivision.answer.numerator, mixedNumber.numerator / directDivisor.value);
      assert.equal(directDivision.answer.denominator, mixedNumber.denominator);
    }

    const division = problems[8];
    const product = problems[9];
    const [divisionFraction, divisor] = division.operands;
    const [productFraction, multiplier] = product.operands;
    assert.equal(divisionFraction.kind, "fraction");
    assert.equal(divisor.kind, "natural");
    assert.equal(productFraction.kind, "fraction");
    assert.equal(multiplier.kind, "natural");
    if (divisionFraction.kind === "fraction" && divisor.kind === "natural") {
      const expected = fractionValue(divisionFraction) / divisor.value;
      const actual = division.answer.whole + division.answer.numerator / division.answer.denominator;
      assert.ok(Math.abs(expected - actual) < 1e-12);
    }
    if (productFraction.kind === "fraction" && multiplier.kind === "natural") {
      const expected = fractionValue(productFraction) * multiplier.value;
      const actual = product.answer.whole + product.answer.numerator / product.answer.denominator;
      assert.ok(Math.abs(expected - actual) < 1e-12);
    }
  }
});
