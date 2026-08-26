import assert from "node:assert/strict";
import test from "node:test";

import {
  createFunctionFoundationProblemSet,
  createFunctionFoundationReviewProblems,
} from "../lib/function-foundation-workouts.ts";

test("합성함수와 역함수 종합은 빠지기 쉬운 여섯 기초 유형을 한 문제씩 통합한다", () => {
  const set = createFunctionFoundationProblemSet(20260809);
  assert.deepEqual(set, createFunctionFoundationProblemSet(20260809));
  assert.deepEqual(set.problems.map(({ kind }) => kind), [
    "function-correspondence",
    "one-to-one",
    "inverse-existence",
    "domain-range-restriction",
    "composition-domain",
    "inverse-graph-symmetry",
  ]);
  assert.ok(set.problems.every(({ options, answerIndex }) =>
    options.length === 4 && new Set(options).size === 4 && answerIndex >= 0 && answerIndex < 4));
});

test("오답 보충은 틀린 개념 유형만 최대 두 문제로 다시 만든다", () => {
  const problems = createFunctionFoundationProblemSet(17).problems;
  const reviews = createFunctionFoundationReviewProblems([
    problems[4].kind,
    problems[4].kind,
    problems[1].kind,
    problems[2].kind,
  ], 18);
  assert.deepEqual(reviews.map(({ kind }) => kind), [problems[4].kind, problems[1].kind]);
});
