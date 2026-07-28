import assert from "node:assert/strict";
import test from "node:test";

import {
  createPolynomialDivisionRemainderProblems,
  polynomialDivisionRemainderProblems,
} from "../lib/polynomial-division-remainder-workouts.ts";

const EXPECTED_KINDS = [
  "multiply",
  "exact-division",
  "quotient-remainder",
  "remainder-theorem",
  "factor-theorem",
  "quadratic-divisor",
  "determine-remainder",
];

test("다항식 학습지는 곱셈부터 나머지 결정까지 일곱 구조를 다룬다", () => {
  assert.equal(polynomialDivisionRemainderProblems.length, 7);
  assert.deepEqual(
    polynomialDivisionRemainderProblems.map(({ kind }) => kind),
    EXPECTED_KINDS,
  );
});

test("모든 생성 문제는 서로 다른 네 선택지와 정답 하나를 갖는다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createPolynomialDivisionRemainderProblems(seed);
    assert.equal(problems.length, 7);
    for (const problem of problems) {
      assert.match(problem.prompt ?? "", /\?$/);
      assert.equal(problem.choices.length, 4);
      assert.equal(problem.choices.filter(({ correct }) => correct).length, 1);
      assert.equal(new Set(problem.choices.map(({ latex }) => latex)).size, 4);
      assert.ok(problem.choices.some(({ correct, latex }) => correct && latex === problem.correctLatex));
    }
  }
});

test("새 시드는 문제의 숫자와 식을 실제로 바꾼다", () => {
  const signatures = new Set<string>();
  for (let seed = 1; seed <= 20; seed += 1) {
    signatures.add(
      createPolynomialDivisionRemainderProblems(seed)
        .map(({ latex, correctLatex }) => `${latex}|${correctLatex}`)
        .join("::"),
    );
  }
  assert.equal(signatures.size, 20);
});

test("문자 계수 1과 깨진 부호를 표기하지 않는다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const text = createPolynomialDivisionRemainderProblems(seed)
      .flatMap(({ latex, correctLatex, choices }) => [
        latex,
        correctLatex,
        ...choices.map(({ latex: choice }) => choice),
      ])
      .join(" ");
    assert.doesNotMatch(text, /(?:^|[=+(\-])1x/);
    assert.doesNotMatch(text, /NaN|undefined|\+\-|\-\-/);
  }
});

test("같은 시드는 같은 문제지를 재현한다", () => {
  assert.deepEqual(
    createPolynomialDivisionRemainderProblems(77),
    createPolynomialDivisionRemainderProblems(77),
  );
});
