import assert from "node:assert/strict";
import test from "node:test";
import {
  createMiddleCirclePropertiesProblemSet,
  createMiddleCirclePropertiesReviewProblems,
  MIDDLE_CIRCLE_PROPERTIES_KINDS,
  type MiddleCirclePropertiesKind,
} from "../lib/middle-circle-properties-workouts.ts";

test("중3 원의 성질 계산 12개 세부 유형이 각각 8문제를 생성한다", () => {
  assert.equal(MIDDLE_CIRCLE_PROPERTIES_KINDS.length, 12);
  for (const kind of MIDDLE_CIRCLE_PROPERTIES_KINDS) {
    const set = createMiddleCirclePropertiesProblemSet(kind, 20260801);
    assert.equal(set.problems.length, 8);
    assert.equal(set.kind, kind);
  }
});

test("모든 원의 성질 문제는 서로 다른 네 선택지와 한 줄 핵심 풀이를 제공한다", () => {
  for (const kind of MIDDLE_CIRCLE_PROPERTIES_KINDS) {
    for (let seed = 1; seed <= 100; seed += 1) {
      for (const problem of createMiddleCirclePropertiesProblemSet(kind, seed).problems) {
        const choices = [problem.answerLatex, ...problem.distractors];
        assert.equal(choices.length, 4);
        assert.equal(new Set(choices).size, 4);
        assert.ok(problem.solutionHint.length >= 15);
        assert.doesNotMatch(`${problem.latex}${problem.answerLatex}${problem.solutionHint}`, /NaN|undefined|\+\-|\-\-/);
      }
    }
  }
});

test("각 학습지는 기본 2, 응용 3, 고난도 3문제로 진행한다", () => {
  for (const kind of MIDDLE_CIRCLE_PROPERTIES_KINDS) {
    const difficulties = createMiddleCirclePropertiesProblemSet(kind, 23).problems.map(
      ({ difficulty }) => difficulty,
    );
    assert.deepEqual(difficulties, [
      "basic", "basic",
      "application", "application", "application",
      "advanced", "advanced", "advanced",
    ]);
  }
});

test("한 학습지 안에서 같은 식과 정답을 숫자까지 그대로 반복하지 않는다", () => {
  for (const kind of MIDDLE_CIRCLE_PROPERTIES_KINDS) {
    const problems = createMiddleCirclePropertiesProblemSet(kind, 20260801).problems;
    const signatures = problems.map(({ latex, answerLatex }) => `${latex}|${answerLatex}`);
    assert.equal(new Set(signatures).size, 8, kind);
  }
});

test("증명이나 서술형 작도 없이 각도와 길이 계산만 출제한다", () => {
  for (const kind of MIDDLE_CIRCLE_PROPERTIES_KINDS) {
    const text = createMiddleCirclePropertiesProblemSet(kind, 31).problems
      .map(({ latex, label }) => `${latex} ${label}`)
      .join(" ");
    assert.doesNotMatch(text, /증명|작도|설명하|이유를 쓰|서술/);
  }
});

test("현의 길이와 중심까지의 거리는 피타고라스 수로 정확히 생성된다", () => {
  const chordProblems = createMiddleCirclePropertiesProblemSet("chord-length", 7).problems;
  const distanceProblems = createMiddleCirclePropertiesProblemSet("center-to-chord", 7).problems;
  assert.ok(chordProblems.every(({ answerLatex }) => Number(answerLatex) > 0));
  assert.ok(distanceProblems.every(({ answerLatex }) => Number(answerLatex) > 0));
  assert.ok(chordProblems.every(({ solutionHint }) => solutionHint.includes("\\sqrt")));
  assert.ok(distanceProblems.every(({ solutionHint }) => solutionHint.includes("\\sqrt")));
});

test("원의 성질 종합은 연속 세 세트에서 모든 계산 유형을 순환한다", () => {
  const kinds = new Set<string>();
  for (const seed of [1, 2, 3]) {
    for (const problem of createMiddleCirclePropertiesProblemSet("comprehensive", seed).problems) {
      kinds.add(problem.kind);
    }
  }
  const expected = MIDDLE_CIRCLE_PROPERTIES_KINDS.filter((kind) => kind !== "comprehensive");
  assert.deepEqual([...kinds].sort(), [...expected].sort());
});

test("오답 보충은 서로 다른 틀린 유형 중 최대 두 문제만 만든다", () => {
  const kinds: MiddleCirclePropertiesKind[] = [
    "central-to-inscribed",
    "central-to-inscribed",
    "tangent-length",
    "chord-length",
  ];
  const reviews = createMiddleCirclePropertiesReviewProblems(kinds, 123);
  assert.equal(reviews.length, 2);
  assert.deepEqual(reviews.map(({ kind }) => kind), ["central-to-inscribed", "tangent-length"]);
  assert.ok(reviews.every(({ difficulty }) => difficulty === "advanced"));
});
