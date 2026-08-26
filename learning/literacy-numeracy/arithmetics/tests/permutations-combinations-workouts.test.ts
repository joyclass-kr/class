import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  choose, createCommonCountingProblemSet, createProbabilityCountingProblemSet,
  createPermutationCombinationReviewProblems, factorial, samePermutationCombinationAnswer,
} from "../lib/permutations-combinations-workouts.ts";

test("factorial and combination helpers return exact values", () => {
  assert.equal(factorial(6), 720);
  assert.equal(choose(8, 3), 56);
  assert.equal(choose(4, 7), 0);
});
test("common math combines easy counting, permutations, and combinations on one progressive page", () => {
  const kinds = createCommonCountingProblemSet(12).problems.map(({ kind }) => kind);
  assert.deepEqual(kinds, [
    "sum-rule", "product-rule", "basic-permutation", "adjacent-arrangement",
    "basic-combination", "required-selection", "not-together-selection",
  ]);
});
test("advanced counting moves to probability and statistics", () => {
  const kinds = createProbabilityCountingProblemSet(12).problems.map(({ kind }) => kind);
  assert.deepEqual(kinds, [
    "circular-permutation", "circular-adjacent", "repeated-permutation", "repeated-leading-zero",
    "identical-permutation", "repeated-combination", "nonnegative-solutions", "positive-solutions",
  ]);
});
test("all generated answers are positive integers", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = [...createCommonCountingProblemSet(seed).problems, ...createProbabilityCountingProblemSet(seed).problems];
    assert.ok(problems.every(({ answer }) => Number.isInteger(answer) && answer > 0));
  }
});
test("new seeds vary wording as well as numbers", () => {
  for (const createSet of [createCommonCountingProblemSet, createProbabilityCountingProblemSet]) {
    const sets = Array.from({ length: 30 }, (_, seed) => createSet(seed + 100).problems);
    for (let index = 0; index < sets[0].length; index += 1) {
      assert.ok(new Set(sets.map((set) => set[index].prompt.replace(/\d+/g, "#"))).size >= 3);
    }
  }
});
test("review selection and answer comparison work", () => {
  const kinds = createCommonCountingProblemSet(1).problems.map(({ kind }) => kind);
  assert.equal(createPermutationCombinationReviewProblems([kinds[0], kinds[0], kinds[2]], 2).length, 2);
  assert.equal(samePermutationCombinationAnswer("120", 120), true);
  assert.equal(samePermutationCombinationAnswer("120.0", 120), false);
});
test("permutation and combination worksheets follow common-math order and show the given data on the worksheet", async () => {
  const page = await readFile(new URL("../app/arithmetic/high-school/combinatorics-worksheet.tsx", import.meta.url), "utf8");
  assert.match(page, /subject=\{common \? "공통수학 1" : "확률과 통계"\}/);
  assert.doesNotMatch(page, /showLatexOnWorksheet=\{false\}/);
  assert.match(page, /NumericChoiceWorksheet/);
});
