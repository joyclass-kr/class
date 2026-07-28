import assert from "node:assert/strict";
import test from "node:test";

import {
  binomialTheoremProblems,
  createBinomialTheoremProblems,
} from "../lib/binomial-theorem-workouts.ts";

const expectedKinds = [
  "specific-coefficient",
  "constant-term",
  "coefficient-sum",
  "alternating-sum",
  "middle-term",
  "numbered-term",
  "binomial-coefficient-sum",
];

test("이항정리 학습지는 계산 원리가 다른 일곱 유형을 다룬다", () => {
  assert.equal(binomialTheoremProblems.length, 7);
  assert.deepEqual(
    binomialTheoremProblems.map(({ kind }) => kind),
    expectedKinds,
  );
});

test("모든 생성 문제는 정답 하나와 서로 다른 선택지 네 개를 가진다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createBinomialTheoremProblems(seed);
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

test("새 시드는 서로 다른 문제 세트를 만든다", () => {
  const signatures = new Set(
    Array.from({ length: 20 }, (_, index) =>
      createBinomialTheoremProblems(index + 1)
        .map(({ latex, prompt, correctLatex }) => `${latex}|${prompt}|${correctLatex}`)
        .join("::"),
    ),
  );
  assert.equal(signatures.size, 20);
});

test("계수 1과 깨진 부호를 수식에 억지로 표시하지 않는다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    for (const problem of createBinomialTheoremProblems(seed)) {
      assert.doesNotMatch(problem.latex, /(^|[+\-(])1[abxy]/);
      assert.doesNotMatch(problem.correctLatex, /(^|[+\-(])1[abxy]/);
      assert.doesNotMatch(problem.latex, /\+\-|--|\+-/);
      if (/^-?\d+$/.test(problem.correctLatex)) {
        assert.ok(Math.abs(Number(problem.correctLatex)) <= 20_000);
      }
    }
  }
});

test("문장 속 문자식은 인라인 수식으로 표시한다", () => {
  const specific = binomialTheoremProblems.find(
    ({ kind }) => kind === "specific-coefficient",
  );
  assert.match(specific?.prompt ?? "", /^\$x\^\d+\$의 계수는\?$/);
});

test("같은 시드는 같은 학습지를 생성한다", () => {
  assert.deepEqual(
    createBinomialTheoremProblems(731),
    createBinomialTheoremProblems(731),
  );
});
