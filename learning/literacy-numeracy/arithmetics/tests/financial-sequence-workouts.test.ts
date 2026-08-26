import assert from "node:assert/strict";
import test from "node:test";

import {
  createFinancialSequenceProblems,
  financialSequenceProblems,
} from "../lib/financial-sequence-workouts.ts";

const expectedKinds = [
  "geometric-growth",
  "geometric-decay",
  "geometric-total",
  "compound-future-value",
  "compound-principal",
  "compound-rate",
];

test("등비수열의 활용은 증가·감소·합과 기본 복리 계산만 다룬다", () => {
  assert.equal(financialSequenceProblems.length, 6);
  assert.deepEqual(
    financialSequenceProblems.map(({ kind }) => kind),
    expectedKinds,
  );
});

test("모든 등비수열 활용 문제는 정답 하나와 서로 다른 선택지 네 개를 가진다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createFinancialSequenceProblems(seed);
    assert.equal(problems.length, 6);
    assert.equal(new Set(problems.map(({ id }) => id)).size, 6);

    for (const problem of problems) {
      assert.match(problem.prompt ?? "", /\?$/);
      assert.equal(problem.choices.length, 4);
      assert.equal(problem.choices.filter(({ correct }) => correct).length, 1);
      assert.equal(new Set(problem.choices.map(({ latex }) => latex)).size, 4);
      assert.equal(
        problem.choices.find(({ correct }) => correct)?.latex,
        problem.correctLatex,
      );
      assert.doesNotMatch(problem.correctLatex, /undefined|NaN|e[+-]\d/i);
    }
  }
});

test("새 시드는 서로 다른 등비수열 활용 문제 세트를 만든다", () => {
  const signatures = new Set(
    Array.from({ length: 20 }, (_, index) =>
      createFinancialSequenceProblems(index + 1)
        .map(({ latex, prompt, correctLatex }) => `${latex}|${prompt}|${correctLatex}`)
        .join("::"),
    ),
  );
  assert.equal(signatures.size, 20);
});

test("금융 맥락은 기본 복리 계산을 넘어서지 않는다", () => {
  const content = JSON.stringify(
    Array.from({ length: 20 }, (_, seed) => createFinancialSequenceProblems(seed + 1)),
  );
  assert.doesNotMatch(content, /대출|상환|현재가치|할인율|매년 초|매년 말|연금/);
});

test("같은 시드는 같은 학습지를 생성한다", () => {
  assert.deepEqual(
    createFinancialSequenceProblems(731),
    createFinancialSequenceProblems(731),
  );
});
