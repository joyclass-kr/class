import assert from "node:assert/strict";
import test from "node:test";

import {
  createAdvancedProbabilityProblems,
  createDistributionProblems,
  createProbabilityProblems,
} from "../lib/foundation-generated-workouts.ts";
import { createNormalDistributionProblems } from "../lib/normal-distribution-workouts.ts";
import { createStatisticalInferenceProblems } from "../lib/statistical-inference-workouts.ts";

test("확률 계산은 필수 여섯 유형과 심화 두 유형을 분리한다", () => {
  assert.deepEqual(createProbabilityProblems(20260819).map(({ label }) => label), [
    "여사건",
    "합사건",
    "조건부확률",
    "독립사건",
    "독립 시행",
    "곱셈정리",
  ]);
  assert.deepEqual(createAdvancedProbabilityProblems(20260819).map(({ label }) => label), [
    "전체확률",
    "베이즈 정리",
  ]);
});

test("이산·이항분포는 정규분포와 표본평균을 섞지 않는다", () => {
  const problems = createDistributionProblems(20260820);
  assert.deepEqual(problems.map(({ label }) => label), [
    "확률분포의 미지수",
    "확률분포의 기댓값",
    "확률분포의 분산",
    "확률변수의 일차변환",
    "이항분포의 확률",
    "이항분포의 평균",
    "이항분포의 분산",
  ]);
  assert.ok(problems.every(({ latex }) => !/N\(|\\overline X/.test(latex)));
});

test("정규분포는 표준화부터 양쪽 꼬리확률까지 일곱 유형을 반복한다", () => {
  assert.deepEqual(createNormalDistributionProblems(20260821).map(({ label }) => label), [
    "정규확률변수의 표준화",
    "표준화에서 원래 값 복원",
    "구간의 표준화",
    "누적확률",
    "한쪽 꼬리확률",
    "평균을 중심으로 한 구간확률",
    "양쪽 꼬리확률",
  ]);
});

test("분포·확률·추정 생성 문제는 모든 시드에서 유일한 네 보기를 유지한다", () => {
  const factories = [
    createProbabilityProblems,
    createDistributionProblems,
    createNormalDistributionProblems,
    createStatisticalInferenceProblems,
  ];
  for (const createProblems of factories) {
    for (let seed = 1; seed <= 200; seed += 1) {
      for (const problem of createProblems(seed)) {
        assert.equal(problem.choices.length, 4, `${createProblems.name}:${seed}:${problem.id}`);
        assert.equal(new Set(problem.choices.map(({ latex }) => latex)).size, 4);
        assert.equal(problem.choices.filter(({ correct }) => correct).length, 1);
        assert.equal(problem.choices.find(({ correct }) => correct)?.latex, problem.correctLatex);
        assert.ok(problem.choices.every(({ latex }) =>
          ![1, 2, 3].some((offset) => latex === `${problem.correctLatex}+${offset}`)));
      }
    }
  }
});
