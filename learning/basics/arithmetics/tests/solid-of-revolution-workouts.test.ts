import assert from "node:assert/strict";
import test from "node:test";

import {
  createSolidOfRevolutionProblems,
  solidOfRevolutionProblems,
} from "../lib/solid-of-revolution-workouts.ts";

const expectedKinds = [
  "linear-x-axis-disk",
  "square-root-x-axis-disk",
  "parabolic-arch-x-axis",
  "constant-parabola-washer",
  "power-region-y-axis-washer",
  "symmetric-parabola-x-axis",
  "between-curves-x-axis",
];

test("회전체의 부피를 구하는 서로 다른 일곱 계산 유형을 다룬다", () => {
  assert.equal(solidOfRevolutionProblems.length, 7);
  assert.deepEqual(
    solidOfRevolutionProblems.map(({ kind }) => kind),
    expectedKinds,
  );
});

test("모든 문제는 정답 하나와 서로 다른 선택지 네 개를 가진다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createSolidOfRevolutionProblems(seed);
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
      assert.ok(problem.choices.every(({ latex }) => latex.includes("\\pi")));
    }
  }
});

test("새 시드는 서로 다른 회전체 문제 세트를 만든다", () => {
  const signatures = new Set(
    Array.from({ length: 20 }, (_, index) =>
      createSolidOfRevolutionProblems(index + 1)
        .map(({ latex, correctLatex }) => `${latex}|${correctLatex}`)
        .join("::"),
    ),
  );
  assert.equal(signatures.size, 20);
});

test("각 유형의 함수와 구간이 문제지마다 실제로 바뀐다", () => {
  const sets = Array.from(
    { length: 100 },
    (_, seed) => createSolidOfRevolutionProblems(seed + 1),
  );
  for (const index of [0, 1, 2, 3, 4, 5, 6]) {
    assert.ok(
      new Set(sets.map((problems) => problems[index]!.latex)).size >= 6,
      `${expectedKinds[index]} 유형의 조건이 충분히 변하지 않습니다.`,
    );
  }
});

function latexPiCoefficient(value: string) {
  if (value === "\\pi") return 1;
  const fractionMatch = value.match(/^\\frac\{(\d*)\\pi\}\{(\d+)\}$/);
  if (fractionMatch) {
    return Number(fractionMatch[1] || 1) / Number(fractionMatch[2]);
  }
  const integerMatch = value.match(/^(\d+)\\pi$/);
  return integerMatch ? Number(integerMatch[1]) : Number.NaN;
}

test("생성된 식에서 계수와 구간을 읽어 회전체 부피를 독립 검산한다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createSolidOfRevolutionProblems(seed);

    const linear = problems[0]!.latex.match(/^y=(\d+)x,.*x\\le(\d+),/)!;
    const squareRoot = problems[1]!.latex.match(/^y=\\sqrt\{(\d+)x\},.*x\\le(\d+),/)!;
    const arch = problems[2]!.latex.match(/^y=(\d+)x\((\d+)-x\),/)!;
    const washer = problems[3]!.latex.match(/y=(\d+)x\^2,.*-(\d+)\\le x/)!;
    const power = problems[4]!.latex.match(/y\\le x(\^2)?,.*x\\le(\d+),/)!;
    const symmetric = problems[5]!.latex.match(/^y=\d+-(\d+)x\^2,.*-(\d+)\\le x/)!;
    const between = problems[6]!.latex.match(/y=(\d+)x\^2,.*x\\le(\d+),/)!;

    const expected = [
      Number(linear[1]) ** 2 * Number(linear[2]) ** 3 / 3,
      Number(squareRoot[1]) * Number(squareRoot[2]) ** 2 / 2,
      Number(arch[1]) ** 2 * Number(arch[2]) ** 5 / 30,
      8 * Number(washer[1]) ** 2 * Number(washer[2]) ** 5 / 5,
      2 * Number(power[2]) ** (power[1] ? 4 : 3) / (power[1] ? 4 : 3),
      16 * Number(symmetric[1]) ** 2 * Number(symmetric[2]) ** 5 / 15,
      2 * Number(between[1]) ** 2 * Number(between[2]) ** 5 / 15,
    ];

    problems.forEach((problem, index) => {
      assert.ok(
        Math.abs(latexPiCoefficient(problem.correctLatex) - expected[index]!) < 1e-12,
        `${problem.kind}의 부피가 일치하지 않습니다.`,
      );
    });
  }
});

test("계수 1과 깨진 수식을 만들지 않는다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const formulas = createSolidOfRevolutionProblems(seed).flatMap((problem) => [
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
    createSolidOfRevolutionProblems(731),
    createSolidOfRevolutionProblems(731),
  );
});
