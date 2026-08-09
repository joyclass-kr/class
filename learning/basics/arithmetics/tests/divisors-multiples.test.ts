import assert from "node:assert/strict";
import test from "node:test";

import {
  commonDivisors,
  commonMultiples,
  createDivisorMultipleSet,
  divisors,
  GCD_CANDIDATE_ROWS,
  greatestCommonDivisor,
  LCM_BASES,
  leastCommonMultiple,
  multiples,
} from "../lib/divisors-multiples.ts";

test("약수·배수·공약수·공배수를 정확히 나열한다", () => {
  assert.deepEqual(divisors(18), [1, 2, 3, 6, 9, 18]);
  assert.deepEqual(multiples(7, 5), [7, 14, 21, 28, 35]);
  assert.deepEqual(commonDivisors(18, 24), [1, 2, 3, 6]);
  assert.deepEqual(commonMultiples(6, 8, 3), [24, 48, 72]);
});

test("최대공약수와 최소공배수를 정확히 계산한다", () => {
  assert.equal(greatestCommonDivisor(92, 60), 4);
  assert.equal(greatestCommonDivisor(60, 100), 20);
  assert.equal(leastCommonMultiple(100, 75), 300);
  assert.equal(leastCommonMultiple(24, 18), 72);
});

test("쉬운 네 유형은 두 문제씩만 넣고 최대공약수·최소공배수에 훈련량을 배정한다", () => {
  const problemSet = createDivisorMultipleSet(20260721);
  assert.deepEqual(problemSet.columns.map((column) => column.length), [8, 11, 11]);
  assert.equal(GCD_CANDIDATE_ROWS.length, 21);
  assert.equal(LCM_BASES.length, 24);

  const problems = problemSet.columns.flat();
  assert.equal(new Set(problems.map(({ id }) => id)).size, 30);
  for (const kind of ["divisors", "multiples", "common-divisors", "common-multiples"] as const) {
    assert.equal(problems.filter((problem) => problem.kind === kind).length, 2);
  }
  assert.equal(problems.filter((problem) => problem.kind === "gcd").length, 11);
  assert.equal(problems.filter((problem) => problem.kind === "lcm").length, 11);
  assert.ok(problems.every(({ prompt }) => prompt.endsWith("?")));
});

test("같은 시드는 같은 문제를 만들고 다른 시드는 문제 구성을 바꾼다", () => {
  assert.deepEqual(createDivisorMultipleSet(1234), createDivisorMultipleSet(1234));
  assert.notDeepEqual(createDivisorMultipleSet(1234), createDivisorMultipleSet(5678));
});
