import test from "node:test";
import assert from "node:assert/strict";
import { createLogicProblemSet, createLogicReviewProblems } from "../lib/sets-propositions-workouts.ts";

test("each set contains repeated set calculations rather than proposition recall", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createLogicProblemSet(seed).problems;
    assert.deepEqual(problems.map(({ kind }) => kind), [
      "set-union-cardinality", "set-intersection-cardinality", "set-difference-cardinality",
      "set-symmetric-difference", "subset-condition", "complement-cardinality", "three-set-cardinality",
    ]);
    assert.ok(problems.every((problem) => problem.choices.some((choice) => choice.id === problem.answer)));
    assert.ok(problems.every((problem) => new Set(problem.choices.map(({ id }) => id)).size === problem.choices.length));
    assert.ok(problems.every((problem) => !/참, 거짓|부정|대우|필요조건|충분조건|드모르간/.test(`${problem.label} ${problem.prompt}`)));
  }
});
test("review problems remove duplicates and stop at two", () => {
  const kinds = createLogicProblemSet(1).problems.map(({ kind }) => kind);
  assert.deepEqual(createLogicReviewProblems([kinds[3], kinds[3], kinds[0]], 2).map(({ kind }) => kind), [kinds[3], kinds[0]]);
});
