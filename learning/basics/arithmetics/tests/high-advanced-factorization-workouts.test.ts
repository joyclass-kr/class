import assert from "node:assert/strict";
import test from "node:test";

import {
  createHighAdvancedFactorizationProblems,
  highAdvancedFactorizationProblems,
} from "../lib/high-advanced-factorization-workouts.ts";

test("고등 인수분해는 고차식과 세 문자식을 여덟 알고리즘으로 반복한다", () => {
  assert.equal(highAdvancedFactorizationProblems.length, 8);
  assert.equal(new Set(highAdvancedFactorizationProblems.map(({ kind }) => kind)).size, 8);
});

test("고등 인수분해 선택지는 매 시드마다 서로 다르고 정답은 하나다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    for (const problem of createHighAdvancedFactorizationProblems(seed)) {
      assert.equal(problem.choices.length, 4);
      assert.equal(problem.choices.filter(({ correct }) => correct).length, 1);
      assert.equal(new Set(problem.choices.map(({ latex }) => latex)).size, 4);
      assert.ok(problem.choices.some(({ correct, latex }) => correct && latex === problem.correctLatex));
    }
  }
});

test("같은 시드는 같은 고등 인수분해 문제지를 만든다", () => {
  assert.deepEqual(
    createHighAdvancedFactorizationProblems(77),
    createHighAdvancedFactorizationProblems(77),
  );
});
