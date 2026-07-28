import assert from "node:assert/strict";
import test from "node:test";

import {
  createSequenceLimitsSeriesProblems,
  sequenceLimitsSeriesProblems,
} from "../lib/sequence-limits-series-workouts.ts";

const expectedKinds = [
  "rational-same-degree",
  "rational-degree-comparison",
  "radical-rationalization",
  "geometric-series-sum",
  "geometric-series-parameter",
  "geometric-series-convergence",
  "telescoping-series",
];

test("수열의 극한과 급수의 서로 다른 일곱 계산 유형을 다룬다", () => {
  assert.equal(sequenceLimitsSeriesProblems.length, 7);
  assert.deepEqual(
    sequenceLimitsSeriesProblems.map(({ kind }) => kind),
    expectedKinds,
  );
});

test("모든 문제는 정답 하나와 서로 다른 선택지 네 개를 가진다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createSequenceLimitsSeriesProblems(seed);
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

test("새 시드는 서로 다른 극한과 급수 문제 세트를 만든다", () => {
  const signatures = new Set(
    Array.from({ length: 20 }, (_, index) =>
      createSequenceLimitsSeriesProblems(index + 1)
        .map(({ latex, prompt, correctLatex }) => `${latex}|${prompt}|${correctLatex}`)
        .join("::"),
    ),
  );
  assert.equal(signatures.size, 20);
});

test("각 유형의 식이 문제지마다 실제로 바뀐다", () => {
  const sets = Array.from(
    { length: 100 },
    (_, seed) => createSequenceLimitsSeriesProblems(seed + 1),
  );
  for (const index of [0, 1, 2, 3, 4, 5, 6]) {
    assert.ok(
      new Set(sets.map((problems) => problems[index]!.latex)).size >= 8,
      `${expectedKinds[index]} 유형의 식이 충분히 변하지 않습니다.`,
    );
  }
});

test("무한등비급수는 수렴하는 공비만 사용하고 수렴구간의 끝점을 제외한다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createSequenceLimitsSeriesProblems(seed);
    const directSeries = problems[3]!;
    assert.doesNotMatch(directSeries.correctLatex, /\\infty/);

    const parameter = problems[4]!;
    const prefix = `${parameter.correctLatex.split("=")[0]}=`;
    assert.ok(parameter.choices.every(({ latex }) => latex.startsWith(prefix)));

    const convergence = problems[5]!;
    assert.match(convergence.correctLatex, /^-?\d+<x<-?\d+$/);
    assert.doesNotMatch(convergence.correctLatex, /\\le/);
  }
});

function latexNumber(value: string) {
  const fractionMatch = value.match(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/);
  if (fractionMatch) {
    return (fractionMatch[1] === "-" ? -1 : 1)
      * Number(fractionMatch[2]) / Number(fractionMatch[3]);
  }
  return Number(value);
}

test("부분분수 망원급수의 합을 독립 계산한 값과 일치한다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problem = createSequenceLimitsSeriesProblems(seed)[6]!;
    const shifts = [...problem.latex.matchAll(/n\+(\d+)/g)]
      .map((match) => Number(match[1]));
    const start = shifts.length === 1 ? 0 : shifts[0]!;
    const end = shifts.at(-1)!;
    const gap = end - start;
    let expected = 0;
    for (let offset = 1; offset <= gap; offset += 1) {
      expected += 1 / (start + offset);
    }
    expected /= gap;
    assert.ok(Math.abs(latexNumber(problem.correctLatex) - expected) < 1e-12);
  }
});

test("문자항의 계수 1과 깨진 수식을 만들지 않는다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const formulas = createSequenceLimitsSeriesProblems(seed).flatMap((problem) => [
      problem.latex,
      problem.correctLatex,
      ...problem.choices.map(({ latex }) => latex),
    ]);
    for (const formula of formulas) {
      assert.ok(!formula.includes(String.raw`\\`));
      assert.doesNotMatch(formula, /undefined|NaN|1n(?:\^|\b)/);
    }
  }
});

test("같은 시드는 같은 학습지를 생성한다", () => {
  assert.deepEqual(
    createSequenceLimitsSeriesProblems(731),
    createSequenceLimitsSeriesProblems(731),
  );
});
