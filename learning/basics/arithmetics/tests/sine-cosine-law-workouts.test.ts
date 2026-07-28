import assert from "node:assert/strict";
import test from "node:test";

import {
  createSineCosineLawProblems,
  sineCosineLawProblems,
} from "../lib/sine-cosine-law-workouts.ts";

const expectedKinds = [
  "sine-law-side",
  "sine-law-angle",
  "circumradius",
  "cosine-law-side",
  "cosine-law-angle",
  "cosine-value",
  "triangle-area",
];

test("사인법칙과 코사인법칙의 서로 다른 일곱 계산 유형을 다룬다", () => {
  assert.equal(sineCosineLawProblems.length, 7);
  assert.deepEqual(
    sineCosineLawProblems.map(({ kind }) => kind),
    expectedKinds,
  );
});

test("모든 문제는 정답 하나와 서로 다른 선택지 네 개를 가진다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createSineCosineLawProblems(seed);
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
      const prefix = `${problem.correctLatex.split("=")[0]}=`;
      assert.ok(problem.choices.every(({ latex }) => latex.startsWith(prefix)));
    }
  }
});

test("새 시드는 서로 다른 문제 세트를 만든다", () => {
  const signatures = new Set(
    Array.from({ length: 20 }, (_, index) =>
      createSineCosineLawProblems(index + 1)
        .map(({ latex, correctLatex }) => `${latex}|${correctLatex}`)
        .join("::"),
    ),
  );
  assert.equal(signatures.size, 20);
});

test("각 유형의 수치나 각도가 문제지마다 실제로 바뀐다", () => {
  const sets = Array.from(
    { length: 100 },
    (_, seed) => createSineCosineLawProblems(seed + 1),
  );
  for (const index of [0, 1, 2, 3, 4, 5, 6]) {
    assert.ok(
      new Set(sets.map((problems) => problems[index]!.latex)).size >= 5,
      `${expectedKinds[index]} 유형의 조건이 충분히 변하지 않습니다.`,
    );
  }
});

test("코사인법칙에 쓰는 세 변은 항상 삼각형을 이룬다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createSineCosineLawProblems(seed);
    for (const index of [4, 5]) {
      const values = [...problems[index]!.latex.matchAll(/[abc]=(\d+)/g)]
        .map((match) => Number(match[1]));
      assert.equal(values.length, 3);
      const [a, b, c] = values;
      assert.ok(a! + b! > c! && a! + c! > b! && b! + c! > a!);
    }
  }
});

test("깨진 수식이나 불필요한 근호 계수 1이 없다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const formulas = createSineCosineLawProblems(seed).flatMap((problem) => [
      problem.latex,
      problem.correctLatex,
      ...problem.choices.map(({ latex }) => latex),
    ]);
    for (const formula of formulas) {
      assert.ok(!formula.includes(String.raw`\\`));
      assert.doesNotMatch(formula, /undefined|NaN|Infinity|1\\sqrt/);
    }
  }
});

test("같은 시드는 같은 학습지를 생성한다", () => {
  assert.deepEqual(
    createSineCosineLawProblems(731),
    createSineCosineLawProblems(731),
  );
});
