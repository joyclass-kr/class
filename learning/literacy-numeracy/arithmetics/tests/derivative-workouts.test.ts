import assert from "node:assert/strict";
import test from "node:test";

import {
  createDerivativeProblemSet,
  createDerivativeReviewProblems,
  sameDerivativeAnswers,
} from "../lib/derivative-workouts.ts";

const expectedKinds = [
  "power-rule",
  "polynomial-derivative",
  "derivative-at-point",
  "difference-quotient",
  "parameter-from-slope",
  "second-derivative",
  "equal-derivatives",
];

test("미적분Ⅰ 미분은 다항함수 핵심 일곱 유형만 다룬다", () => {
  const first = createDerivativeProblemSet(20260727);
  const second = createDerivativeProblemSet(20260727);
  assert.deepEqual(first, second);
  assert.deepEqual(first.problems.map(({ kind }) => kind), expectedKinds);
});

test("지수·로그·삼각함수와 곱·몫 미분을 미적분Ⅰ 기본 페이지에 섞지 않는다", () => {
  const content = JSON.stringify(
    Array.from({ length: 20 }, (_, seed) => createDerivativeProblemSet(seed + 1)),
  );
  assert.doesNotMatch(
    content,
    /\\ln|\\sin|\\cos|exponential-log|trigonometric-product|quotient-simplify/,
  );
});

test("다항함수 미분의 모든 답은 정수이며 식에 구할 대상이 드러난다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createDerivativeProblemSet(seed).problems;
    assert.equal(problems.length, 7);
    for (const problem of problems) {
      assert.ok(problem.answers.every(Number.isInteger));
      assert.ok(problem.answerLabels.length === problem.answers.length);
      assert.doesNotMatch(problem.latex, /undefined|NaN|(?:^|[=+\-(])1x/);
    }
  }
  assert.equal(sameDerivativeAnswers(["2", "-3"], [2, -3]), true);
  assert.equal(sameDerivativeAnswers(["2.0", "-3"], [2, -3]), false);
});

test("오답 보충은 틀린 유형 중 최대 두 문제만 만든다", () => {
  const original = createDerivativeProblemSet(17);
  const reviews = createDerivativeReviewProblems(
    original.problems.map(({ kind }) => kind),
    18,
  );
  assert.equal(reviews.length, 2);
  assert.deepEqual(
    reviews.map(({ kind }) => kind),
    original.problems.slice(0, 2).map(({ kind }) => kind),
  );
});
