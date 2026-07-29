import assert from "node:assert/strict";
import test from "node:test";

import {
  createMiddleQuadraticEquationProblemSet,
  createMiddleQuadraticEquationReviewProblems,
  MIDDLE_QUADRATIC_EQUATION_KINDS,
  MIDDLE_QUADRATIC_EQUATION_METHOD_KINDS,
  resolveMiddleQuadraticEquationKind,
} from "../lib/middle-quadratic-equation-workouts.ts";

test("중3 이차방정식은 다섯 개의 통합 학습지로 각각 8문제를 생성한다", () => {
  assert.deepEqual(MIDDLE_QUADRATIC_EQUATION_KINDS, [
    "roots-and-squares",
    "factorization",
    "quadratic-formula",
    "normalize-and-solve",
    "comprehensive",
  ]);
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
        assert.doesNotMatch(problem.label, /^이차방정식:|[²³⁴⁵⁶⁷⁸⁹]/);
      }
    }
  }
});

test("각 통합 학습지는 기본 2문제, 응용 3문제, 고난도 3문제로 진행한다", () => {
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

test("제곱근·완전제곱 학습지는 단순 제곱근에서 완전제곱꼴 변형으로 진행한다", () => {
  const kinds = createMiddleQuadraticEquationProblemSet("roots-and-squares", 20260729)
    .problems.map(({ kind }) => kind);
  assert.deepEqual(kinds.slice(0, 2), ["square-root-basic", "perfect-square"]);
  assert.ok(kinds.slice(2, 5).includes("completing-square"));
  assert.ok(kinds.slice(5).includes("completing-square"));
});

test("인수분해 학습지는 쉬운 곱셈식에서 일반형과 부호 정리로 진행한다", () => {
  const kinds = createMiddleQuadraticEquationProblemSet("factorization", 20260729)
    .problems.map(({ kind }) => kind);
  assert.deepEqual(kinds.slice(0, 2), ["zero-product", "common-factor"]);
  assert.ok(kinds.slice(2, 5).includes("monic-factorization"));
  assert.ok(kinds.slice(5).includes("nonmonic-factorization"));
  assert.ok(kinds.slice(5).includes("negative-leading"));
});

test("근의 공식 학습지는 계수가 1인 식과 일반형을 한 장에서 반복한다", () => {
  const problems = createMiddleQuadraticEquationProblemSet("quadratic-formula", 20260729).problems;
  assert.ok(problems.some(({ kind }) => kind === "quadratic-formula-monic"));
  assert.ok(problems.some(({ kind }) => kind === "quadratic-formula-general"));
  assert.ok(problems.filter(({ kind }) => kind === "quadratic-formula-monic")
    .every(({ answerLatex }) => answerLatex.includes("\\sqrt")));
  assert.ok(problems.every(({ latex }) => !/x\^4|x\^\{4\}|치환/.test(latex)));
});

test("식 정리 학습지는 전개·이항과 분수·소수 계수를 모두 포함한다", () => {
  const problems = createMiddleQuadraticEquationProblemSet("normalize-and-solve", 20260729).problems;
  assert.ok(problems.some(({ kind }) => kind === "expand-and-solve"));
  assert.ok(problems.some(({ structure }) => structure === "fraction-coefficients"));
  assert.ok(problems.some(({ structure }) => structure === "decimal-coefficients"));
  assert.ok(problems.some(({ latex }) => latex.includes("\\dfrac")));
  assert.ok(problems.some(({ latex }) => latex.includes("0.5")));
});

test("이차방정식 종합은 연속 세 세트에서 모든 풀이 유형을 순환한다", () => {
  const kinds = [1, 2, 3].flatMap((seed) => (
    createMiddleQuadraticEquationProblemSet("comprehensive", seed).problems.map(({ kind }) => kind)
  ));
  assert.deepEqual([...new Set(kinds)].sort(), [...MIDDLE_QUADRATIC_EQUATION_METHOD_KINDS].sort());
});

test("기존 세부 유형 주소는 대응하는 통합 학습지로 연결된다", () => {
  assert.equal(resolveMiddleQuadraticEquationKind("square-root-basic"), "roots-and-squares");
  assert.equal(resolveMiddleQuadraticEquationKind("perfect-square"), "roots-and-squares");
  assert.equal(resolveMiddleQuadraticEquationKind("zero-product"), "factorization");
  assert.equal(resolveMiddleQuadraticEquationKind("negative-leading"), "factorization");
  assert.equal(resolveMiddleQuadraticEquationKind("quadratic-formula-general"), "quadratic-formula");
  assert.equal(resolveMiddleQuadraticEquationKind("fraction-decimal"), "normalize-and-solve");
  assert.equal(resolveMiddleQuadraticEquationKind("comprehensive"), "comprehensive");
  assert.equal(resolveMiddleQuadraticEquationKind("unknown"), null);
});

test("오답 보충은 틀린 풀이 유형 중 최대 두 문제만 만든다", () => {
  const reviews = createMiddleQuadraticEquationReviewProblems(
    ["common-factor", "perfect-square", "common-factor", "completing-square"],
    77,
  );
  assert.equal(reviews.length, 2);
  assert.deepEqual(reviews.map(({ kind }) => kind), ["common-factor", "perfect-square"]);
});
