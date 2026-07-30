import assert from "node:assert/strict";
import test from "node:test";

import {
  createPolynomialDivisionProblems,
  polynomialDivisionProblems,
} from "../lib/polynomial-division-remainder-workouts.ts";
import {
  createPolynomialIdentityRemainderProblems,
  polynomialIdentityRemainderProblems,
} from "../lib/polynomial-identity-remainder-workouts.ts";

const DIVISION_KINDS = [
  "exact-linear",
  "linear-with-remainder",
  "missing-term",
  "synthetic-positive",
  "synthetic-negative",
  "quadratic-divisor",
  "division-identity",
];

const IDENTITY_REMAINDER_KINDS = [
  "coefficient-comparison",
  "special-value-substitution",
  "division-identity",
  "remainder-theorem",
  "factor-theorem",
  "two-linear-remainders",
  "quadratic-reduction",
  "combined-divisors",
];

test("다항식 나눗셈 학습지는 긴 나눗셈과 조립제법의 일곱 구조를 다룬다", () => {
  assert.equal(polynomialDivisionProblems.length, 7);
  assert.deepEqual(polynomialDivisionProblems.map(({ kind }) => kind), DIVISION_KINDS);
});

test("항등식과 나머지정리는 계수 비교부터 곱의 나머지 복원까지 다룬다", () => {
  assert.equal(polynomialIdentityRemainderProblems.length, 8);
  assert.deepEqual(
    polynomialIdentityRemainderProblems.map(({ kind }) => kind),
    IDENTITY_REMAINDER_KINDS,
  );
});

test("모든 생성 문제는 서로 다른 네 선택지와 정답 하나를 갖는다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problemSets = [
      createPolynomialDivisionProblems(seed),
      createPolynomialIdentityRemainderProblems(seed),
    ];
    assert.deepEqual(problemSets.map(({ length }) => length), [7, 8]);
    for (const problem of problemSets.flat()) {
      assert.match(problem.prompt ?? "", /\?$/);
      assert.equal(problem.choices.length, 4);
      assert.equal(problem.choices.filter(({ correct }) => correct).length, 1);
      assert.equal(new Set(problem.choices.map(({ latex }) => latex)).size, 4);
      assert.ok(problem.choices.some(({ correct, latex }) => correct && latex === problem.correctLatex));
    }
  }
});

test("새 시드는 두 학습지의 숫자와 식을 실제로 바꾼다", () => {
  for (const createProblems of [
    createPolynomialDivisionProblems,
    createPolynomialIdentityRemainderProblems,
  ]) {
    const signatures = new Set<string>();
    for (let seed = 1; seed <= 20; seed += 1) {
      signatures.add(
        createProblems(seed)
          .map(({ latex, correctLatex }) => `${latex}|${correctLatex}`)
          .join("::"),
      );
    }
    assert.equal(signatures.size, 20);
  }
});

test("문자 계수 1과 깨진 부호를 표기하지 않는다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const text = [
      ...createPolynomialDivisionProblems(seed),
      ...createPolynomialIdentityRemainderProblems(seed),
    ]
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
    createPolynomialDivisionProblems(77),
    createPolynomialDivisionProblems(77),
  );
  assert.deepEqual(
    createPolynomialIdentityRemainderProblems(77),
    createPolynomialIdentityRemainderProblems(77),
  );
});
