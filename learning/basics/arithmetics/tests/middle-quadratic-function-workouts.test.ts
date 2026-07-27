import assert from "node:assert/strict";
import test from "node:test";

import {
  createMiddleQuadraticFunctionProblemSet,
  createMiddleQuadraticFunctionReviewProblems,
  MIDDLE_QUADRATIC_FUNCTION_KINDS,
} from "../lib/middle-quadratic-function-workouts.ts";

test("중3 이차함수 계산 12개 세부 유형이 각각 8문제를 생성한다", () => {
  assert.equal(MIDDLE_QUADRATIC_FUNCTION_KINDS.length, 12);
  for (const kind of MIDDLE_QUADRATIC_FUNCTION_KINDS) {
    const problems = createMiddleQuadraticFunctionProblemSet(kind, 20260730).problems;
    assert.equal(problems.length, 8, kind);
    assert.equal(new Set(problems.map(({ id }) => id)).size, 8, kind);
  }
});

test("모든 이차함수 문제는 네 선택지와 한 줄 핵심 풀이를 제공한다", () => {
  for (const kind of MIDDLE_QUADRATIC_FUNCTION_KINDS) {
    for (let seed = 1; seed <= 100; seed += 1) {
      for (const problem of createMiddleQuadraticFunctionProblemSet(kind, seed).problems) {
        assert.equal(problem.distractors.length, 3, `${kind}/${seed}`);
        assert.equal(new Set([problem.answerLatex, ...problem.distractors]).size, 4, `${kind}/${seed}`);
        assert.ok(problem.solutionHint.length >= 15);
        assert.doesNotMatch(`${problem.latex}${problem.answerLatex}${problem.solutionHint}`, /NaN|undefined|\+\-|--/);
      }
    }
  }
});

test("계수 1과 -1은 핵심 풀이에서도 숫자 1을 억지로 쓰지 않는다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createMiddleQuadraticFunctionProblemSet("basic-value", seed).problems;
    for (const problem of problems) {
      assert.doesNotMatch(problem.solutionHint, /(?:^|[^0-9])-?1\\times/);
    }
  }
});

test("각 이차함수 학습지는 기본 2, 응용 3, 고난도 3문제로 진행한다", () => {
  const expected = [
    "basic", "basic",
    "application", "application", "application",
    "advanced", "advanced", "advanced",
  ];
  for (const kind of MIDDLE_QUADRATIC_FUNCTION_KINDS) {
    assert.deepEqual(
      createMiddleQuadraticFunctionProblemSet(kind, 20260730).problems.map(({ difficulty }) => difficulty),
      expected,
      kind,
    );
  }
});

test("순수 연산 범위만 사용하고 그래프 개형·최대최소 활용은 출제하지 않는다", () => {
  for (const kind of MIDDLE_QUADRATIC_FUNCTION_KINDS) {
    const problems = createMiddleQuadraticFunctionProblemSet(kind, 20260730).problems;
    for (const problem of problems) {
      assert.doesNotMatch(
        `${problem.label}${problem.solutionHint}`,
        /그래프의 개형|그래프를 그|최댓값|최솟값|넓이|속력|거리/,
      );
    }
  }
});

test("분수·소수 학습지는 두 계수 표기를 모두 반복한다", () => {
  const problems = createMiddleQuadraticFunctionProblemSet("fraction-decimal", 20260730).problems;
  assert.equal(problems.filter(({ structure }) => structure === "fraction-value").length, 4);
  assert.equal(problems.filter(({ structure }) => structure === "decimal-value").length, 4);
  assert.ok(problems.some(({ latex }) => latex.includes("\\dfrac{1}{2}")));
  assert.ok(problems.some(({ latex }) => latex.includes("-0.5")));
});

test("이차함수 종합은 연속 세 세트에서 모든 계산 유형을 순환한다", () => {
  const kinds = [1, 2, 3].flatMap((seed) => (
    createMiddleQuadraticFunctionProblemSet("comprehensive", seed).problems.map(({ kind }) => kind)
  ));
  const expected = MIDDLE_QUADRATIC_FUNCTION_KINDS.filter((kind) => kind !== "comprehensive");
  assert.deepEqual([...new Set(kinds)].sort(), [...expected].sort());
});

test("오답 보충은 서로 다른 틀린 유형 중 최대 두 문제만 만든다", () => {
  const reviews = createMiddleQuadraticFunctionReviewProblems(
    ["basic-value", "complete-square", "basic-value", "intercepts"],
    88,
  );
  assert.equal(reviews.length, 2);
  assert.deepEqual(reviews.map(({ kind }) => kind), ["basic-value", "complete-square"]);
});
