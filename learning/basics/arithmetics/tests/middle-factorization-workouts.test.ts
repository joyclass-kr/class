import assert from "node:assert/strict";
import test from "node:test";

import {
  createMiddleFactorizationProblemSet,
  createMiddleFactorizationReviewProblems,
  formatNormalizedLinearCombination,
  MIDDLE_FACTORIZATION_KINDS,
  MIDDLE_FACTORIZATION_TITLES,
} from "../lib/middle-factorization-workouts.ts";

test("인수분해 12개 세부 유형이 각각 8문제를 생성한다", () => {
  assert.equal(MIDDLE_FACTORIZATION_KINDS.length, 12);
  for (const kind of MIDDLE_FACTORIZATION_KINDS) {
    const problemSet = createMiddleFactorizationProblemSet(kind, 20260727);
    assert.equal(problemSet.problems.length, 8);
    assert.ok(problemSet.problems.every((problem) => problem.kind === kind || kind === "comprehensive"));
    assert.ok(problemSet.problems.every((problem) => problem.label === MIDDLE_FACTORIZATION_TITLES[problem.kind]));
  }
});

test("모든 인수분해 문제는 정답과 겹치지 않는 오답 세 개를 갖는다", () => {
  for (const kind of MIDDLE_FACTORIZATION_KINDS) {
    for (let seed = 1; seed <= 20; seed += 1) {
      for (const problem of createMiddleFactorizationProblemSet(kind, seed).problems) {
        assert.equal(problem.distractors.length, 3);
        assert.equal(new Set([problem.answerLatex, ...problem.distractors]).size, 4);
        assert.ok(problem.latex.length > 0);
        assert.ok(problem.answerLatex.length > 0);
      }
    }
  }
});

test("같은 번호는 같은 문제를 만들고 오답 보충은 최대 두 유형만 만든다", () => {
  const first = createMiddleFactorizationProblemSet("cubic-common", 77);
  const second = createMiddleFactorizationProblemSet("cubic-common", 77);
  assert.deepEqual(first, second);

  const reviews = createMiddleFactorizationReviewProblems(
    ["common-factor", "grouping", "perfect-square"],
    78,
  );
  assert.equal(reviews.length, 2);
  assert.deepEqual(reviews.map(({ kind }) => kind), ["common-factor", "grouping"]);
});

test("핵심 문자식과 3차식 유형이 실제 식 형태로 생성된다", () => {
  const severalVariables = createMiddleFactorizationProblemSet("multiple-variables", 5);
  assert.ok(severalVariables.problems.every(({ latex }) => /a\^2b|ab\^2/.test(latex)));

  const cubicCommon = createMiddleFactorizationProblemSet("cubic-common", 5);
  assert.ok(cubicCommon.problems.every(({ latex }) => /x\^3/.test(latex)));
  assert.ok(cubicCommon.problems.every(({ answerLatex }) => /x\(/.test(answerLatex)));

  const cubicGrouping = createMiddleFactorizationProblemSet("cubic-grouping", 5);
  assert.ok(cubicGrouping.problems.every(({ latex }) => /x\^3/.test(latex)));
});

test("괄호 안의 숫자 공통인수까지 밖으로 꺼내 완전히 인수분해한다", () => {
  assert.equal(
    formatNormalizedLinearCombination(2, -2, -1),
    "2(x-1)^2",
  );
  assert.equal(
    formatNormalizedLinearCombination(4, 2, -1),
    "2(x-1)(2x+1)",
  );
  assert.equal(
    formatNormalizedLinearCombination(3, -2, 4),
    "(x+4)(3x-2)",
  );
});

test("생성된 일차 인수 안에는 다시 꺼낼 숫자 공통인수가 남지 않는다", () => {
  const gcd = (left: number, right: number): number => (
    right === 0 ? Math.abs(left) : gcd(right, left % right)
  );

  for (const kind of MIDDLE_FACTORIZATION_KINDS) {
    for (let seed = 1; seed <= 100; seed += 1) {
      for (const { answerLatex } of createMiddleFactorizationProblemSet(kind, seed).problems) {
        for (const match of answerLatex.matchAll(/\((\d*)x([+-]\d+)\)/g)) {
          const leading = match[1] ? Number(match[1]) : 1;
          const constant = Number(match[2]);
          assert.equal(gcd(leading, constant), 1, `${answerLatex} has a hidden common factor`);
        }
      }
    }
  }
});
