import assert from "node:assert/strict";
import test from "node:test";

import {
  createMiddleCirclePropertiesProblemSet,
  createMiddleCirclePropertiesReviewProblems,
  MIDDLE_CIRCLE_PROPERTIES_KINDS,
  resolveMiddleCirclePropertiesKind,
  type MiddleCirclePropertiesMethodKind,
} from "../lib/middle-circle-properties-workouts.ts";

test("중3 원의 성질은 각과 길이 2개 통합 학습지로 구성된다", () => {
  assert.deepEqual(MIDDLE_CIRCLE_PROPERTIES_KINDS, ["inscribed-angles", "circle-lengths"]);
  for (const kind of MIDDLE_CIRCLE_PROPERTIES_KINDS) {
    const set = createMiddleCirclePropertiesProblemSet(kind, 20260801);
    assert.equal(set.problems.length, 8);
    assert.equal(set.kind, kind);
  }
});

test("묶음 학습지는 필요한 세부 계산 유형을 빠짐없이 섞는다", () => {
  assert.deepEqual(
    new Set(createMiddleCirclePropertiesProblemSet("inscribed-angles", 7).problems.map(({ kind }) => kind)),
    new Set([
      "central-to-inscribed", "inscribed-to-central", "arc-to-inscribed",
      "same-arc", "semicircle-angle", "arc-sum",
      "cyclic-quadrilateral", "tangent-chord-angle",
    ]),
  );

  assert.deepEqual(
    new Set(createMiddleCirclePropertiesProblemSet("circle-lengths", 7).problems.map(({ kind }) => kind)),
    new Set([
      "tangent-length", "tangent-expression", "tangent-perimeter", "chord-length",
      "center-to-chord", "equal-chord-distance", "equal-chord-length", "chord-comparison",
    ]),
  );
});

test("두 원의 성질 통합지는 모든 문항에 원 도식을 제공한다", () => {
  for (const kind of MIDDLE_CIRCLE_PROPERTIES_KINDS) {
    const problems = createMiddleCirclePropertiesProblemSet(kind, 20260809).problems;
    assert.ok(problems.every(({ visual }) => visual?.type === "geometry"), kind);
  }
});
test("접선·현 길이 학습지는 숫자만 바꾼 반복 없이 8개 구조를 한 번씩 다룬다", () => {
  const problems = createMiddleCirclePropertiesProblemSet("circle-lengths", 20260809).problems;
  assert.equal(new Set(problems.map(({ kind }) => kind)).size, 8);
  assert.equal(new Set(problems.map(({ structure }) => structure)).size, 8);
});
test("모든 원의 성질 문제는 서로 다른 네 선택지와 한 줄 핵심 풀이를 제공한다", () => {
  for (const kind of MIDDLE_CIRCLE_PROPERTIES_KINDS) {
    for (let seed = 1; seed <= 100; seed += 1) {
      for (const problem of createMiddleCirclePropertiesProblemSet(kind, seed).problems) {
        const choices = [problem.answerLatex, ...problem.distractors];
        assert.equal(choices.length, 4);
        assert.equal(new Set(choices).size, 4);
        assert.ok(problem.solutionHint.length >= 15);
        assert.doesNotMatch(problem.label, /^원의 성질:|[²³⁴⁵⁶⁷⁸⁹]/);
        assert.doesNotMatch(`${problem.latex}${problem.answerLatex}${problem.solutionHint}`, /NaN|undefined|\+\-|\-\-/);
      }
    }
  }
});

test("각 원의 성질 학습지는 기본 2, 응용 3, 고난도 3문제로 진행한다", () => {
  for (const kind of MIDDLE_CIRCLE_PROPERTIES_KINDS) {
    assert.deepEqual(
      createMiddleCirclePropertiesProblemSet(kind, 23).problems.map(({ difficulty }) => difficulty),
      [
        "basic", "basic",
        "application", "application", "application",
        "advanced", "advanced", "advanced",
      ],
    );
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
  const problems = createMiddleCirclePropertiesProblemSet("circle-lengths", 7).problems;
  const chordProblems = problems.filter(({ kind }) => kind === "chord-length");
  const distanceProblems = problems.filter(({ kind }) => kind === "center-to-chord");
  assert.ok(chordProblems.length > 0);
  assert.ok(distanceProblems.length > 0);
  assert.ok(chordProblems.every(({ answerLatex }) => Number(answerLatex) > 0));
  assert.ok(distanceProblems.every(({ answerLatex }) => Number(answerLatex) > 0));
  assert.ok(chordProblems.every(({ solutionHint }) => solutionHint.includes("\\sqrt")));
  assert.ok(distanceProblems.every(({ solutionHint }) => solutionHint.includes("\\sqrt")));
});

test("기존 세부 유형 주소는 해당 묶음 학습지로 연결된다", () => {
  assert.equal(resolveMiddleCirclePropertiesKind("central-to-inscribed"), "inscribed-angles");
  assert.equal(resolveMiddleCirclePropertiesKind("cyclic-quadrilateral"), "inscribed-angles");
  assert.equal(resolveMiddleCirclePropertiesKind("chord-length"), "circle-lengths");
  assert.equal(resolveMiddleCirclePropertiesKind("angle-applications"), "inscribed-angles");
  assert.equal(resolveMiddleCirclePropertiesKind("comprehensive"), "inscribed-angles");
  assert.equal(resolveMiddleCirclePropertiesKind("unknown"), null);
});

test("오답 보충은 서로 다른 틀린 유형 중 최대 두 문제만 만든다", () => {
  const kinds: MiddleCirclePropertiesMethodKind[] = [
    "central-to-inscribed", "central-to-inscribed", "tangent-length", "chord-length",
  ];
  const reviews = createMiddleCirclePropertiesReviewProblems(kinds, 123);
  assert.equal(reviews.length, 2);
  assert.deepEqual(reviews.map(({ kind }) => kind), ["central-to-inscribed", "tangent-length"]);
  assert.ok(reviews.every(({ difficulty }) => difficulty === "advanced"));
});
