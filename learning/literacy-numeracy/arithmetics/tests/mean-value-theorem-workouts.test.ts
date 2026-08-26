import assert from "node:assert/strict";
import test from "node:test";

import {
  createMeanValueTheoremProblems,
  meanValueTheoremProblems,
} from "../lib/mean-value-theorem-workouts.ts";

const expectedKinds = [
  "polynomial-average-rate",
  "parameter-from-average-rate",
  "quadratic-mvt",
  "cubic-mvt",
  "rolle-theorem",
  "quartic-mvt",
  "two-mvt-points",
];

test("평균값정리의 서로 다른 일곱 계산 유형을 다룬다", () => {
  assert.equal(meanValueTheoremProblems.length, 7);
  assert.deepEqual(
    meanValueTheoremProblems.map(({ kind }) => kind),
    expectedKinds,
  );
});

test("모든 문제는 정답 하나와 서로 다른 선택지 네 개를 가진다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createMeanValueTheoremProblems(seed);
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
      if (problem.correctLatex.includes("=")) {
        const prefix = `${problem.correctLatex.split("=")[0]}=`;
        assert.ok(problem.choices.every(({ latex }) => latex.startsWith(prefix)));
      }
    }
  }
});

test("새 시드는 서로 다른 평균값정리 문제 세트를 만든다", () => {
  const signatures = new Set(
    Array.from({ length: 20 }, (_, index) =>
      createMeanValueTheoremProblems(index + 1)
        .map(({ latex, prompt, correctLatex }) => `${latex}|${prompt}|${correctLatex}`)
        .join("::"),
    ),
  );
  assert.equal(signatures.size, 20);
});

test("각 유형의 함수와 구간이 문제지마다 실제로 바뀐다", () => {
  const sets = Array.from(
    { length: 100 },
    (_, seed) => createMeanValueTheoremProblems(seed + 1),
  );
  for (const index of [0, 1, 2, 3, 4, 5, 6]) {
    assert.ok(
      new Set(sets.map((problems) => problems[index]!.latex)).size >= 8,
      `${expectedKinds[index]} 유형의 조건이 충분히 변하지 않습니다.`,
    );
  }
});

test("평균값정리와 롤의 정리의 모든 c가 열린구간 안에 있다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createMeanValueTheoremProblems(seed);
    for (const problem of problems.slice(2)) {
      const [left, right] = problem.interval;
      assert.ok((problem.solutionValues?.length ?? 0) >= 1);
      for (const value of problem.solutionValues ?? []) {
        assert.ok(left < value && value < right, `${problem.kind}: ${value}`);
      }
    }
    assert.equal(problems[6]!.solutionValues?.length, 2);
  }
});

test("각 c에서의 도함숫값이 실제 평균변화율과 일치한다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createMeanValueTheoremProblems(seed);
    for (const problem of problems.slice(2)) {
      const verification = problem.verification!;
      assert.equal(
        verification.derivativeValues.length,
        problem.solutionValues!.length,
      );
      for (const derivativeValue of verification.derivativeValues) {
        assert.ok(
          Math.abs(derivativeValue - verification.averageRate) < 1e-12,
          problem.kind,
        );
      }
    }
  }
});

test("개념 암기 문항 없이 계산 문제만 출제한다", () => {
  const content = JSON.stringify(
    Array.from({ length: 20 }, (_, seed) => createMeanValueTheoremProblems(seed + 1)),
  );
  assert.doesNotMatch(content, /적용할 수 있는 조건|연속이고|미분 가능/);
});

test("계수 1과 깨진 수식을 만들지 않는다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const formulas = createMeanValueTheoremProblems(seed).flatMap((problem) => [
      problem.latex,
      problem.correctLatex,
      ...problem.choices.map(({ latex }) => latex),
    ]);
    for (const formula of formulas) {
      assert.ok(!formula.includes(String.raw`\\`));
      assert.doesNotMatch(formula, /undefined|NaN|(?:^|[=+\-(])1x/);
    }
  }
});

test("같은 시드는 같은 학습지를 생성한다", () => {
  assert.deepEqual(
    createMeanValueTheoremProblems(731),
    createMeanValueTheoremProblems(731),
  );
});
