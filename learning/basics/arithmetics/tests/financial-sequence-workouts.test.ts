import assert from "node:assert/strict";
import test from "node:test";

import {
  createFinancialSequenceProblems,
  financialSequenceProblems,
} from "../lib/financial-sequence-workouts.ts";

const expectedKinds = [
  "simple-future-value",
  "compound-future-value",
  "compound-principal",
  "compound-rate",
  "ordinary-annuity",
  "annuity-due",
  "simple-compound-difference",
];

test("원리합계 학습지는 계산 원리가 다른 일곱 유형을 다룬다", () => {
  assert.equal(financialSequenceProblems.length, 7);
  assert.deepEqual(
    financialSequenceProblems.map(({ kind }) => kind),
    expectedKinds,
  );
});

test("모든 금융수열 문제는 정답 하나와 서로 다른 선택지 네 개를 가진다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createFinancialSequenceProblems(seed);
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

test("새 시드는 서로 다른 금융수열 문제 세트를 만든다", () => {
  const signatures = new Set(
    Array.from({ length: 20 }, (_, index) =>
      createFinancialSequenceProblems(index + 1)
        .map(({ latex, prompt, correctLatex }) => `${latex}|${prompt}|${correctLatex}`)
        .join("::"),
    ),
  );
  assert.equal(signatures.size, 20);
});

test("금액은 정확한 유한소수로 정리하고 단위를 빠뜨리지 않는다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    for (const problem of createFinancialSequenceProblems(seed)) {
      assert.doesNotMatch(problem.correctLatex, /undefined|NaN|e[+-]\d/i);
      if (problem.kind === "compound-rate") {
        assert.match(problem.correctLatex, /^\d+(?:\.\d+)?\\%$/);
      } else {
        assert.match(problem.correctLatex, /^\d+(?:\.\d{1,5})?\\text\{만 원\}$/);
      }
    }
  }
});

test("대수의 원리합계·적립 범위를 벗어난 금융 내용을 섞지 않는다", () => {
  const content = JSON.stringify(
    Array.from({ length: 20 }, (_, seed) => createFinancialSequenceProblems(seed + 1)),
  );
  assert.doesNotMatch(content, /대출|상환|현재가치|할인율/);
});

test("같은 시드는 같은 학습지를 생성한다", () => {
  assert.deepEqual(
    createFinancialSequenceProblems(731),
    createFinancialSequenceProblems(731),
  );
});
