import assert from "node:assert/strict";
import test from "node:test";

import {
  createMiddleQuadraticEquationProblemSet,
  createMiddleQuadraticEquationReviewProblems,
  MIDDLE_QUADRATIC_EQUATION_KINDS,
} from "../lib/middle-quadratic-equation-workouts.ts";

test("중3 이차방정식 13개 세부 유형이 각각 8문제를 생성한다", () => {
  assert.equal(MIDDLE_QUADRATIC_EQUATION_KINDS.length, 13);
  for (const kind of MIDDLE_QUADRATIC_EQUATION_KINDS) {
    const set = createMiddleQuadraticEquationProblemSet(kind, 20260729);
    assert.equal(set.problems.length, 8, kind);
    assert.equal(new Set(set.problems.map(({ id }) => id)).size, 8, kind);
  }
});

test("모든 문제는 실수해를 갖고 서로 다른 네 선택지를 제공한다", () => {
  for (const kind of MIDDLE_QUADRATIC_EQUATION_KINDS) {
    for (let seed = 1; seed <= 100; seed += 1) {
      for (const problem of createMiddleQuadraticEquationProblemSet(kind, seed).problems) {
        const [a, b, c] = problem.coefficients;
        assert.notEqual(a, 0, `${kind}/${seed} must be quadratic`);
        assert.ok(b * b - 4 * a * c >= 0, `${kind}/${seed} must have real roots`);
        assert.equal(problem.distractors.length, 3, `${kind}/${seed} distractor count`);
        assert.equal(new Set([problem.answerLatex, ...problem.distractors]).size, 4);
        assert.ok(problem.solutionHint.length >= 15);
      }
    }
  }
});

test("각 학습지는 기본 2문제, 응용 3문제, 고난도 3문제로 진행한다", () => {
  const expected = [
    "basic", "basic",
    "application", "application", "application",
    "advanced", "advanced", "advanced",
  ];
  for (const kind of MIDDLE_QUADRATIC_EQUATION_KINDS) {
    assert.deepEqual(
      createMiddleQuadraticEquationProblemSet(kind, 20260729).problems.map(({ difficulty }) => difficulty),
      expected,
      kind,
    );
  }
});

test("근의 공식 기초는 근호 답을 만들고 치환형 고차방정식은 만들지 않는다", () => {
  const formulaProblems = createMiddleQuadraticEquationProblemSet("quadratic-formula-monic", 20260729).problems;
  assert.ok(formulaProblems.every(({ answerLatex }) => answerLatex.includes("\\sqrt")));

  for (const kind of MIDDLE_QUADRATIC_EQUATION_KINDS) {
    const problems = createMiddleQuadraticEquationProblemSet(kind, 20260729).problems;
    assert.ok(problems.every(({ latex }) => !/x\^4|x\^\{4\}|치환/.test(latex)));
  }
});

test("분수·소수 계수는 분모 제거와 소수 정수화 문제를 모두 포함한다", () => {
  const problems = createMiddleQuadraticEquationProblemSet("fraction-decimal", 20260729).problems;
  assert.ok(problems.some(({ structure }) => structure === "fraction-coefficients"));
  assert.ok(problems.some(({ structure }) => structure === "decimal-coefficients"));
  assert.ok(problems.some(({ latex }) => latex.includes("\\dfrac")));
  assert.ok(problems.some(({ latex }) => latex.includes("0.5")));
});

test("이차방정식 종합은 연속 세 세트에서 모든 세부 유형을 순환한다", () => {
  const kinds = [1, 2, 3].flatMap((seed) => (
    createMiddleQuadraticEquationProblemSet("comprehensive", seed).problems.map(({ kind }) => kind)
  ));
  const expected = MIDDLE_QUADRATIC_EQUATION_KINDS.filter((kind) => kind !== "comprehensive");
  assert.deepEqual([...new Set(kinds)].sort(), [...expected].sort());
});

test("오답 보충은 틀린 유형 중 최대 두 문제만 만든다", () => {
  const reviews = createMiddleQuadraticEquationReviewProblems(
    ["common-factor", "perfect-square", "common-factor", "completing-square"],
    77,
  );
  assert.equal(reviews.length, 2);
  assert.deepEqual(reviews.map(({ kind }) => kind), ["common-factor", "perfect-square"]);
});
