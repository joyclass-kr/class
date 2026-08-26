import assert from "node:assert/strict";
import test from "node:test";

import {
  createTrigonometricAdditionProblems,
  trigonometricAdditionProblems,
} from "../lib/trigonometric-addition-workouts.ts";

const expectedKinds = [
  "sine-special-angle",
  "cosine-special-angle",
  "tangent-special-angle",
  "given-tangent-addition",
  "sine-sum-to-product",
  "cosine-sum-to-product",
  "product-to-sum",
];

test("덧셈정리 학습지는 계산 원리가 다른 일곱 유형을 다룬다", () => {
  assert.equal(trigonometricAdditionProblems.length, 7);
  assert.deepEqual(
    trigonometricAdditionProblems.map(({ kind }) => kind),
    expectedKinds,
  );
});

test("모든 문제는 정답 하나와 서로 다른 선택지 네 개를 가진다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createTrigonometricAdditionProblems(seed);
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

test("새 시드는 서로 다른 덧셈정리 문제 세트를 만든다", () => {
  const signatures = new Set(
    Array.from({ length: 20 }, (_, index) =>
      createTrigonometricAdditionProblems(index + 1)
        .map(({ latex, correctLatex }) => `${latex}|${correctLatex}`)
        .join("::"),
    ),
  );
  assert.equal(signatures.size, 20);
});

test("특수각·합차 계산·합곱 변환이 문제지마다 실제로 바뀐다", () => {
  const sets = Array.from(
    { length: 100 },
    (_, seed) => createTrigonometricAdditionProblems(seed + 1),
  );
  for (const index of [0, 1, 2, 3, 4, 5, 6]) {
    assert.ok(
      new Set(sets.map((problems) => problems[index]!.latex)).size >= 4,
      `${expectedKinds[index]} 유형의 식이 충분히 변하지 않습니다.`,
    );
  }
});

test("깨진 수식이나 계산 불가능한 결과가 없다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const formulas = createTrigonometricAdditionProblems(seed).flatMap((problem) => [
      problem.latex,
      problem.correctLatex,
      ...problem.choices.map(({ latex }) => latex),
    ]);
    for (const formula of formulas) {
      assert.ok(!formula.includes(String.raw`\\`));
      assert.doesNotMatch(formula, /undefined|NaN|Infinity/);
      assert.doesNotMatch(formula, /\\(?:sin|cos)(?:1x|x)/);
    }
  }
});

test("같은 시드는 같은 학습지를 생성한다", () => {
  assert.deepEqual(
    createTrigonometricAdditionProblems(731),
    createTrigonometricAdditionProblems(731),
  );
});
