import assert from "node:assert/strict";
import test from "node:test";

import {
  createMatrixProblems,
  matrixProblems,
} from "../lib/matrix-workouts.ts";

const expectedKinds = [
  "equal-matrices",
  "addition",
  "linear-combination",
  "scalar-unknown",
  "multiplication",
  "square-component",
  "matrix-equation",
];

test("공통수학1 행렬 학습지는 계산 원리가 다른 일곱 유형을 다룬다", () => {
  assert.equal(matrixProblems.length, 7);
  assert.deepEqual(
    matrixProblems.map(({ kind }) => kind),
    expectedKinds,
  );
});

test("모든 생성 문제는 정답 하나와 서로 다른 선택지 네 개를 가진다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createMatrixProblems(seed);
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

test("새 시드는 서로 다른 행렬 문제 세트를 만든다", () => {
  const signatures = new Set(
    Array.from({ length: 20 }, (_, index) =>
      createMatrixProblems(index + 1)
        .map(({ latex, prompt, correctLatex }) => `${latex}|${prompt}|${correctLatex}`)
        .join("::"),
    ),
  );
  assert.equal(signatures.size, 20);
});

test("행렬 표기에는 깨진 부호나 잘못된 행 구분이 없다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    for (const problem of createMatrixProblems(seed)) {
      const content = `${problem.latex}|${problem.correctLatex}`;
      assert.doesNotMatch(content, /\+\-|--|\+-/);
      for (const matrix of content.match(/\\begin\{pmatrix\}.*?\\end\{pmatrix\}/g) ?? []) {
        assert.match(matrix, /&/);
        assert.match(matrix, /\\\\/);
      }
    }
  }
});

test("공통수학1 범위를 넘는 선형대수 내용을 섞지 않는다", () => {
  const content = JSON.stringify(
    Array.from({ length: 20 }, (_, seed) => createMatrixProblems(seed + 1)),
  );
  assert.doesNotMatch(content, /역행렬|행렬식|케일리|단위행렬/);
});

test("같은 시드는 같은 학습지를 생성한다", () => {
  assert.deepEqual(
    createMatrixProblems(731),
    createMatrixProblems(731),
  );
});
