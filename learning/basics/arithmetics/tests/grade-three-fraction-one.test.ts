import test from "node:test";
import assert from "node:assert/strict";
import { createGradeThreeFractionOneSet } from "../lib/grade-three-fraction-one.ts";

test("grade 3 relation fractions preserve the given quantities without reduction", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const set = createGradeThreeFractionOneSet(seed);
    for (const problem of set.relationProblems) {
      assert.equal(problem.numerator, problem.selected);
      assert.equal(problem.denominator, problem.whole);
    }
  }
});

test("grade 3 relation questions do not repeat on one worksheet", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createGradeThreeFractionOneSet(seed).relationProblems;
    const keys = problems.map((problem) => `${problem.whole}:${problem.part}:${problem.selected}`);
    assert.equal(new Set(keys).size, problems.length);
  }
});
