import assert from "node:assert/strict";
import test from "node:test";

import {
  createMiddleStatisticsProblemSet,
  createMiddleStatisticsReviewProblems,
  MIDDLE_STATISTICS_KINDS,
  MIDDLE_STATISTICS_METHOD_KINDS,
  resolveMiddleStatisticsKind,
  type MiddleStatisticsMethodKind,
} from "../lib/middle-statistics-workouts.ts";

function dataValues(latex: string) {
  const match = latex.match(/\\\{([^}]+)\\\}/);
  assert.ok(match);
  return match[1].replaceAll("\\", "").split(",").map((value) => Number(value.trim()));
}

test("중3 통계 계산은 쉬운 세부 유형을 합친 4개 학습지로 구성된다", () => {
  assert.equal(MIDDLE_STATISTICS_KINDS.length, 4);
  for (const kind of MIDDLE_STATISTICS_KINDS) {
    const set = createMiddleStatisticsProblemSet(kind, 20260802);
    assert.equal(set.problems.length, 8);
    assert.equal(set.kind, kind);
  }
});

test("묶음 학습지는 필요한 세부 계산 유형을 빠짐없이 섞는다", () => {
  assert.deepEqual(
    new Set(createMiddleStatisticsProblemSet("representative-values", 7).problems.map(({ kind }) => kind)),
    new Set([
      "mean", "median", "mode", "frequency-mean",
      "total-frequency", "relative-frequency", "missing-frequency", "relative-percentage",
    ]),
  );
  assert.deepEqual(
    new Set(createMiddleStatisticsProblemSet("mean-applications", 7).problems.map(({ kind }) => kind)),
    new Set(["mean", "missing-from-mean", "frequency-mean"]),
  );
  assert.deepEqual(
    new Set(createMiddleStatisticsProblemSet("dispersion", 7).problems.map(({ kind }) => kind)),
    new Set([
      "deviations", "variance", "standard-deviation",
      "variance-from-deviations", "compare-spread",
    ]),
  );
});

test("모든 통계 문제는 서로 다른 네 선택지와 한 줄 핵심 풀이를 제공한다", () => {
  for (const kind of MIDDLE_STATISTICS_KINDS) {
    for (let seed = 1; seed <= 100; seed += 1) {
      for (const problem of createMiddleStatisticsProblemSet(kind, seed).problems) {
        const choices = [problem.answerLatex, ...problem.distractors];
        assert.equal(choices.length, 4);
        assert.equal(new Set(choices).size, 4);
        assert.ok(problem.solutionHint.length >= 15);
        assert.doesNotMatch(problem.label, /^통계:|[²³⁴⁵⁶⁷⁸⁹]/);
        assert.doesNotMatch(`${problem.latex}${problem.answerLatex}${problem.solutionHint}`, /NaN|undefined|\+\-|\-\-/);
      }
    }
  }
});

test("각 통계 학습지는 기본 2, 응용 3, 고난도 3문제로 진행한다", () => {
  for (const kind of MIDDLE_STATISTICS_KINDS) {
    assert.deepEqual(
      createMiddleStatisticsProblemSet(kind, 29).problems.map(({ difficulty }) => difficulty),
      [
        "basic", "basic",
        "application", "application", "application",
        "advanced", "advanced", "advanced",
      ],
    );
  }
});

test("한 학습지 안에서 같은 자료와 정답을 숫자까지 그대로 반복하지 않는다", () => {
  for (const kind of MIDDLE_STATISTICS_KINDS) {
    const problems = createMiddleStatisticsProblemSet(kind, 20260802).problems;
    const signatures = problems.map(({ latex, answerLatex }) => `${latex}|${answerLatex}`);
    assert.equal(new Set(signatures).size, 8, kind);
  }
});

test("표준편차의 근호 계수가 1이면 숫자 1을 쓰지 않는다", () => {
  for (let seed = 1; seed <= 50; seed += 1) {
    const problems = createMiddleStatisticsProblemSet("dispersion", seed).problems
      .filter(({ kind }) => kind === "standard-deviation");
    assert.ok(problems.every(({ answerLatex }) => !answerLatex.startsWith("1\\sqrt")));
  }
});

test("평균·중앙값·최빈값·범위·분산·표준편차의 정답을 수치로 검산한다", () => {
  for (let seed = 1; seed <= 50; seed += 1) {
    const representativeProblems = createMiddleStatisticsProblemSet("representative-values", seed).problems;
    for (const problem of representativeProblems) {
      if (!["mean", "median", "mode", "range"].includes(problem.kind)) continue;
      const values = dataValues(problem.latex);
      if (problem.kind === "mean") {
        assert.equal(values.reduce((sum, value) => sum + value, 0) / values.length, Number(problem.answerLatex));
      }
      if (problem.kind === "median") {
        values.sort((left, right) => left - right);
        const middle = Math.floor(values.length / 2);
        const median = values.length % 2 ? values[middle] : (values[middle - 1] + values[middle]) / 2;
        assert.equal(median, Number(problem.answerLatex));
      }
      if (problem.kind === "mode") {
        const counts = new Map<number, number>();
        for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
        const mode = [...counts].sort((left, right) => right[1] - left[1])[0][0];
        assert.equal(mode, Number(problem.answerLatex));
      }
      if (problem.kind === "range") {
        assert.equal(Math.max(...values) - Math.min(...values), Number(problem.answerLatex));
      }
    }

    const dispersionProblems = createMiddleStatisticsProblemSet("dispersion", seed).problems;
    for (const problem of dispersionProblems) {
      if (problem.kind !== "variance" && problem.kind !== "standard-deviation") continue;
      const values = dataValues(problem.latex);
      const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
      const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
      if (problem.kind === "variance") {
        assert.equal(variance, Number(problem.answerLatex));
      } else {
        const radicalMatch = problem.answerLatex.match(/^(\d+)?\\sqrt\{2\}$/);
        const squaredAnswer = radicalMatch
          ? 2 * Number(radicalMatch[1] ?? 1) ** 2
          : Number(problem.answerLatex) ** 2;
        assert.equal(variance, squaredAnswer);
      }
    }
  }
});

test("통계 학습지는 확률·그래프 해석·서술형 없이 수치 계산만 출제한다", () => {
  for (const kind of MIDDLE_STATISTICS_KINDS) {
    const text = createMiddleStatisticsProblemSet(kind, 31).problems
      .map(({ latex, label }) => `${latex} ${label}`)
      .join(" ");
    assert.doesNotMatch(text, /확률|그래프|증명|설명하|이유를 쓰|서술/);
  }
});

test("통계 종합은 연속 세 세트에서 모든 계산 유형을 순환한다", () => {
  const kinds = new Set<string>();
  for (const seed of [1, 2, 3]) {
    for (const problem of createMiddleStatisticsProblemSet("comprehensive", seed).problems) {
      kinds.add(problem.kind);
    }
  }
  assert.deepEqual([...kinds].sort(), [...MIDDLE_STATISTICS_METHOD_KINDS].sort());
});

test("기존 세부 유형 주소는 해당 묶음 학습지로 연결된다", () => {
  assert.equal(resolveMiddleStatisticsKind("median"), "representative-values");
  assert.equal(resolveMiddleStatisticsKind("relative-frequency"), "representative-values");
  assert.equal(resolveMiddleStatisticsKind("frequency-mean"), "mean-applications");
  assert.equal(resolveMiddleStatisticsKind("variance"), "dispersion");
  assert.equal(resolveMiddleStatisticsKind("comprehensive"), "comprehensive");
  assert.equal(resolveMiddleStatisticsKind("unknown"), null);
});

test("오답 보충은 서로 다른 틀린 유형 중 최대 두 문제만 만든다", () => {
  const kinds: MiddleStatisticsMethodKind[] = [
    "mean", "mean", "variance", "standard-deviation",
  ];
  const reviews = createMiddleStatisticsReviewProblems(kinds, 123);
  assert.equal(reviews.length, 2);
  assert.deepEqual(reviews.map(({ kind }) => kind), ["mean", "variance"]);
  assert.ok(reviews.every(({ difficulty }) => difficulty === "advanced"));
});
