import assert from "node:assert/strict";
import test from "node:test";

import {
  createInequalityChoices,
  createInequalityProblemSet,
  createInequalityReviewProblems,
  formatInequalitySolution,
  normalizeSolutionPieces,
} from "../lib/inequality-workouts.ts";

test("부등식 세트는 연립일차부터 연립이차까지 일곱 유형을 만든다", () => {
  const first = createInequalityProblemSet(20260725);
  const second = createInequalityProblemSet(20260725);
  assert.deepEqual(first, second);
  assert.equal(first.problems.length, 7);
  assert.equal(new Set(first.problems.map(({ kind }) => kind)).size, 7);
  first.problems.forEach((problem) => assert.ok(formatInequalitySolution(problem.solution).length > 2));
});

test("구간과 한 점은 입력 순서에 관계없이 같은 해집합으로 비교된다", () => {
  const first = [
    { kind: "interval" as const, left: 4, right: "inf" as const, leftClosed: true, rightClosed: false },
    { kind: "point" as const, value: 1 },
  ];
  assert.deepEqual(normalizeSolutionPieces([...first].reverse()), normalizeSolutionPieces(first));
});

test("오답 보충은 틀린 유형 중 최대 두 문제만 만든다", () => {
  const original = createInequalityProblemSet(17);
  const reviews = createInequalityReviewProblems(original.problems.map(({ kind }) => kind), 18);
  assert.equal(reviews.length, 2);
});

test("새 시드는 부등식의 경계값과 식을 실제로 바꾼다", () => {
  const signatures = new Set<string>();
  for (let seed = 1; seed <= 20; seed += 1) {
    signatures.add(createInequalityProblemSet(seed).problems.map(({ expression }) => expression).join("|"));
  }
  assert.equal(signatures.size, 20);
});

test("모든 부등식 문제는 서로 다른 선택지 네 개와 정답 하나를 갖는다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    for (const problem of createInequalityProblemSet(seed).problems) {
      const choices = createInequalityChoices(problem);
      assert.equal(choices.length, 4);
      assert.equal(choices.filter(({ correct }) => correct).length, 1);
      assert.equal(new Set(choices.map(({ solution }) => JSON.stringify(normalizeSolutionPieces(solution)))).size, 4);
    }
  }
});
