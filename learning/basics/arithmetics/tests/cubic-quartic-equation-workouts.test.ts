import assert from "node:assert/strict";
import test from "node:test";

import {
  createCubicQuarticEquationProblems,
  cubicQuarticEquationProblems,
} from "../lib/cubic-quartic-equation-workouts.ts";

const expectedKinds = [
  "cubic-integer-roots",
  "cubic-rational-root",
  "cubic-repeated-root",
  "quartic-factor-theorem",
  "biquadratic",
  "reciprocal-quartic",
  "common-part-substitution",
];

test("삼차·사차방정식 학습지는 서로 다른 일곱 풀이 유형을 다룬다", () => {
  assert.equal(cubicQuarticEquationProblems.length, 7);
  assert.deepEqual(
    cubicQuarticEquationProblems.map(({ kind }) => kind),
    expectedKinds,
  );
});

test("모든 생성 문제는 정답 하나와 서로 다른 선택지 네 개를 가진다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createCubicQuarticEquationProblems(seed);
    assert.equal(problems.length, 7);
    assert.equal(new Set(problems.map(({ id }) => id)).size, 7);

    for (const problem of problems) {
      assert.match(problem.prompt ?? "", /\?$/);
      assert.equal(problem.choices.length, 4);
      assert.equal(problem.choices.filter(({ correct }) => correct).length, 1);
      assert.equal(new Set(problem.choices.map(({ latex }) => latex)).size, 4);
      assert.equal(
        problem.choices.find(({ correct }) => correct)?.latex,
        problem.correctLatex,
      );
    }
  }
});

test("시드가 바뀌면 새로운 문제 세트가 충분히 생성된다", () => {
  const signatures = new Set(
    Array.from({ length: 20 }, (_, index) =>
      createCubicQuarticEquationProblems(index + 1)
        .map(({ latex, correctLatex }) => `${latex}|${correctLatex}`)
        .join("::"),
    ),
  );
  assert.equal(signatures.size, 20);
});

test("생성식에는 불필요한 계수 1이나 깨진 부호가 없다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    for (const problem of createCubicQuarticEquationProblems(seed)) {
      assert.doesNotMatch(problem.latex, /(^|[+\-(])1x/);
      assert.doesNotMatch(problem.latex, /\+\-|--|\+-/);
      assert.doesNotMatch(
        problem.correctLatex,
        /\\sqrt\{(?:4|8|9|12|16|18|20|24|25|27|28|32|36|40)\}/,
      );
    }
  }
});

test("같은 시드는 같은 학습지를 생성한다", () => {
  assert.deepEqual(
    createCubicQuarticEquationProblems(731),
    createCubicQuarticEquationProblems(731),
  );
});
