import assert from "node:assert/strict";
import test from "node:test";

import {
  createMiddleTrigonometryProblemSet,
  createMiddleTrigonometryReviewProblems,
  MIDDLE_TRIGONOMETRY_KINDS,
  resolveMiddleTrigonometryKind,
  type MiddleTrigonometryMethodKind,
} from "../lib/middle-trigonometry-workouts.ts";

test("중3 삼각비 계산은 필수 훈련만 남긴 2개 통합 학습지로 구성된다", () => {
  assert.deepEqual(MIDDLE_TRIGONOMETRY_KINDS, ["ratios", "side-lengths"]);
  for (const kind of MIDDLE_TRIGONOMETRY_KINDS) {
    const set = createMiddleTrigonometryProblemSet(kind, 20260731);
    assert.equal(set.problems.length, 8);
    assert.equal(set.kind, kind);
  }
});

test("묶음 학습지는 필요한 세부 계산 유형을 빠짐없이 섞는다", () => {
  assert.deepEqual(
    new Set(createMiddleTrigonometryProblemSet("ratios", 7).problems.map(({ kind }) => kind)),
    new Set([
      "single-ratio", "three-ratios", "pythagorean-first",
      "special-angle", "special-angle-expression", "radical-side",
    ]),
  );

  assert.deepEqual(
    new Set(createMiddleTrigonometryProblemSet("side-lengths", 7).problems.map(({ kind }) => kind)),
    new Set([
      "side-from-sine", "side-from-cosine", "side-from-tangent",
      "ratio-scale", "radical-side", "fraction-decimal",
    ]),
  );
});

test("두 삼각비 통합지는 모든 문항에 직각삼각형 도식을 제공한다", () => {
  for (const kind of MIDDLE_TRIGONOMETRY_KINDS) {
    const problems = createMiddleTrigonometryProblemSet(kind, 20260809).problems;
    assert.ok(problems.every(({ visual }) => visual?.type === "geometry"), kind);
  }
});
test("변의 길이 통합지는 숫자만 바꾼 반복 없이 8개 구조를 한 번씩 다룬다", () => {
  const problems = createMiddleTrigonometryProblemSet("side-lengths", 20260809).problems;
  assert.equal(new Set(problems.map(({ structure }) => structure)).size, 8);
});
test("모든 삼각비 문제는 서로 다른 네 선택지와 한 줄 핵심 풀이를 제공한다", () => {
  for (const kind of MIDDLE_TRIGONOMETRY_KINDS) {
    for (let seed = 1; seed <= 100; seed += 1) {
      for (const problem of createMiddleTrigonometryProblemSet(kind, seed).problems) {
        const choices = [problem.answerLatex, ...problem.distractors];
        assert.equal(choices.length, 4);
        assert.equal(new Set(choices).size, 4);
        assert.ok(problem.solutionHint.length >= 15);
        assert.match(problem.question, /\?$/);
        assert.doesNotMatch(problem.label, /^삼각비:|[²³⁴⁵⁶⁷⁸⁹]/);
        assert.doesNotMatch(`${problem.latex}${problem.answerLatex}${problem.solutionHint}`, /NaN|undefined|\+\-|\-\-/);
      }
    }
  }
});

test("문제지와 답안 입력은 같은 구체적 발문을 사용하고 변의 길이는 선분 기호로 쓴다", () => {
  const problems = createMiddleTrigonometryProblemSet("side-lengths", 20260731).problems;
  for (const problem of problems) {
    if (!problem.question.includes("길이는?")) continue;
    assert.match(problem.question, /\$\\overline\{(?:AB|AC|BC)\}\$의 길이는\?/);
    assert.match(problem.latex, /\\overline\{(?:AB|AC|BC)\}/);
    assert.doesNotMatch(problem.question, /^구할 값은\?|^계산 결과는\?|^구하는 변의 길이는\?/);
  }
});

test("각 삼각비 학습지는 기본 2, 응용 3, 고난도 3문제로 진행한다", () => {
  for (const kind of MIDDLE_TRIGONOMETRY_KINDS) {
    assert.deepEqual(
      createMiddleTrigonometryProblemSet(kind, 17).problems.map(({ difficulty }) => difficulty),
      [
        "basic", "basic",
        "application", "application", "application",
        "advanced", "advanced", "advanced",
      ],
    );
  }
});

test("한 학습지 안에서 같은 식과 정답을 숫자까지 그대로 반복하지 않는다", () => {
  for (const kind of MIDDLE_TRIGONOMETRY_KINDS) {
    const problems = createMiddleTrigonometryProblemSet(kind, 20260731).problems;
    const signatures = problems.map(({ latex, answerLatex }) => `${latex}|${answerLatex}`);
    assert.equal(new Set(signatures).size, 8, kind);
  }
});

test("삼각비는 그래프·증명·실생활 문장 없이 계산식만 출제한다", () => {
  for (const kind of MIDDLE_TRIGONOMETRY_KINDS) {
    const text = createMiddleTrigonometryProblemSet(kind, 31).problems
      .map(({ latex, label }) => `${latex} ${label}`)
      .join(" ");
    assert.doesNotMatch(text, /그래프|증명|건물|그림의 삼각|올려다본|거리 측정/);
  }
});

test("분수·소수 길이 계산은 한 묶음 안에서 두 표기를 모두 연습한다", () => {
  const problems = createMiddleTrigonometryProblemSet("side-lengths", 9).problems
    .filter(({ kind }) => kind === "fraction-decimal");
  assert.deepEqual(problems.map(({ structure }) => structure).sort(), ["decimal-ratio", "fraction-ratio"]);
  for (const problem of problems) {
    assert.doesNotMatch(problem.latex, /\d+\.\d{3,}/);
  }
});

test("기존 세부 유형 주소는 해당 묶음 학습지로 연결된다", () => {
  assert.equal(resolveMiddleTrigonometryKind("single-ratio"), "ratios");
  assert.equal(resolveMiddleTrigonometryKind("special-angle"), "ratios");
  assert.equal(resolveMiddleTrigonometryKind("special-angles"), "ratios");
  assert.equal(resolveMiddleTrigonometryKind("side-from-sine"), "side-lengths");
  assert.equal(resolveMiddleTrigonometryKind("comprehensive"), "side-lengths");
  assert.equal(resolveMiddleTrigonometryKind("unknown"), null);
});

test("오답 보충은 서로 다른 틀린 유형 중 최대 두 문제만 만든다", () => {
  const kinds: MiddleTrigonometryMethodKind[] = [
    "single-ratio", "single-ratio", "special-angle", "radical-side",
  ];
  const reviews = createMiddleTrigonometryReviewProblems(kinds, 123);
  assert.equal(reviews.length, 2);
  assert.deepEqual(reviews.map(({ kind }) => kind), ["single-ratio", "special-angle"]);
  assert.ok(reviews.every(({ difficulty }) => difficulty === "advanced"));
});
