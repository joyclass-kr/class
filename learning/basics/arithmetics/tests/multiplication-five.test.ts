import assert from "node:assert/strict";
import test from "node:test";

import {
  createMultiplicationFiveProblemSet,
  multiplicationFiveSourceFacts,
} from "../lib/multiplication-five.ts";

test("구구단 종합은 0과 1을 한 문제씩만 넣고 어려운 곱을 반복한다", () => {
  const facts = multiplicationFiveSourceFacts();
  assert.equal(facts.length, 100);
  assert.equal(facts.filter(({ multiplicand, factor }) => multiplicand === 0 || factor === 0).length, 1);
  assert.equal(facts.filter(({ multiplicand, factor }) => multiplicand === 1 || factor === 1).length, 1);
  assert.ok(facts.filter(({ multiplicand, factor }) => multiplicand === 7 && factor === 9).length >= 3);
  assert.ok(facts.filter(({ multiplicand, factor }) => multiplicand >= 6 && factor >= 6).length >= 40);
});

test("구구단 종합은 다섯 열에 스무 문제씩 만들고 시드에 따라 순서가 달라진다", () => {
  const first = createMultiplicationFiveProblemSet(20260720);
  assert.deepEqual(first.columns.map((column) => column.length), [20, 20, 20, 20, 20]);
  assert.deepEqual(createMultiplicationFiveProblemSet(20260720), first);
  assert.notDeepEqual(createMultiplicationFiveProblemSet(20260721), first);
});
