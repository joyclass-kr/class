import assert from "node:assert/strict";
import test from "node:test";

import { createStatisticalInferenceProblems, statisticalInferenceProblems } from "../lib/statistical-inference-workouts.ts";

test("통계적 추정 학습지는 표본평균의 분포부터 모수 추정까지 순서대로 다룬다", () => {
  assert.equal(statisticalInferenceProblems.length, 7);
  assert.deepEqual(
    statisticalInferenceProblems.map(({ label }) => label),
    [
      "표본평균 계산",
      "표본평균의 분포",
      "표본평균의 표준화",
      "표본평균의 구간확률",
      "모평균의 신뢰구간",
      "오차한계로 표본 크기 구하기",
      "모비율의 신뢰구간",
    ],
  );

  for (const problem of statisticalInferenceProblems) {
    assert.equal(problem.choices.length, 4);
    assert.equal(problem.choices.filter(({ correct }) => correct).length, 1);
    assert.equal(new Set(problem.choices.map(({ latex }) => latex)).size, 4);
  }
});

test("새 시드마다 수치와 정답이 달라진다", () => {
  const first = createStatisticalInferenceProblems(101);
  const second = createStatisticalInferenceProblems(202);
  assert.notDeepEqual(
    first.map(({ latex, correctLatex }) => [latex, correctLatex]),
    second.map(({ latex, correctLatex }) => [latex, correctLatex]),
  );
});

test("구할 대상은 설명문이 아니라 수식에 직접 표시한다", () => {
  assert.ok(statisticalInferenceProblems.every(({ prompt }) => prompt === undefined));
  assert.ok(statisticalInferenceProblems.some(({ latex }) => latex.includes("Z=?")));
  assert.ok(statisticalInferenceProblems.some(({ latex }) => latex.includes("n\\ge?")));
});
