import assert from "node:assert/strict";
import test from "node:test";
import {
  createMiddleTrigonometryProblemSet,
  createMiddleTrigonometryReviewProblems,
  MIDDLE_TRIGONOMETRY_KINDS,
  type MiddleTrigonometryKind,
} from "../lib/middle-trigonometry-workouts.ts";

test("중3 삼각비 계산 12개 세부 유형이 각각 8문제를 생성한다", () => {
  assert.equal(MIDDLE_TRIGONOMETRY_KINDS.length, 12);
  for (const kind of MIDDLE_TRIGONOMETRY_KINDS) {
    const set = createMiddleTrigonometryProblemSet(kind, 20260731);
    assert.equal(set.problems.length, 8);
    assert.equal(set.kind, kind);
  }
});

test("모든 삼각비 문제는 서로 다른 네 선택지와 한 줄 핵심 풀이를 제공한다", () => {
  for (const kind of MIDDLE_TRIGONOMETRY_KINDS) {
    for (let seed = 1; seed <= 100; seed += 1) {
      const problems = createMiddleTrigonometryProblemSet(kind, seed).problems;
      for (const problem of problems) {
        const choices = [problem.answerLatex, ...problem.distractors];
        assert.equal(choices.length, 4);
        assert.equal(new Set(choices).size, 4);
        assert.ok(problem.solutionHint.length >= 15);
        assert.doesNotMatch(`${problem.latex}${problem.answerLatex}${problem.solutionHint}`, /NaN|undefined|\+\-|\-\-/);
      }
    }
  }
});

test("각 삼각비 학습지는 기본 2, 응용 3, 고난도 3문제로 진행한다", () => {
  for (const kind of MIDDLE_TRIGONOMETRY_KINDS) {
    const difficulties = createMiddleTrigonometryProblemSet(kind, 17).problems.map(
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
  for (const kind of MIDDLE_TRIGONOMETRY_KINDS) {
    const problems = createMiddleTrigonometryProblemSet(kind, 20260731).problems;
    const signatures = problems.map(({ latex, answerLatex }) => `${latex}|${answerLatex}`);
    assert.equal(new Set(signatures).size, 8, kind);
  }
});

test("삼각비는 그래프·증명·실생활 문장제 없이 계산식만 출제한다", () => {
  for (const kind of MIDDLE_TRIGONOMETRY_KINDS) {
    const text = createMiddleTrigonometryProblemSet(kind, 31).problems
      .map(({ latex, label }) => `${latex} ${label}`)
      .join(" ");
    assert.doesNotMatch(text, /그래프|증명|건물|그림자|앙각|내려다본|거리 측정/);
  }
});

test("분수·소수 학습지는 두 표기를 네 문제씩 반복한다", () => {
  const structures = createMiddleTrigonometryProblemSet("fraction-decimal", 9).problems.map(
    ({ structure }) => structure,
  );
  assert.equal(structures.filter((value) => value === "fraction-ratio").length, 4);
  assert.equal(structures.filter((value) => value === "decimal-ratio").length, 4);
  for (const problem of createMiddleTrigonometryProblemSet("fraction-decimal", 9).problems) {
    assert.doesNotMatch(problem.latex, /\d+\.\d{3,}/);
  }
});

test("삼각비 종합은 연속 세 세트에서 모든 계산 유형을 순환한다", () => {
  const structures = new Set<string>();
  for (const seed of [1, 2, 3]) {
    for (const problem of createMiddleTrigonometryProblemSet("comprehensive", seed).problems) {
      structures.add(problem.kind);
    }
  }
  const expected = MIDDLE_TRIGONOMETRY_KINDS.filter((kind) => kind !== "comprehensive");
  assert.deepEqual([...structures].sort(), [...expected].sort());
});

test("오답 보충은 서로 다른 틀린 유형 중 최대 두 문제만 만든다", () => {
  const kinds: MiddleTrigonometryKind[] = [
    "single-ratio",
    "single-ratio",
    "special-angle",
    "radical-side",
  ];
  const reviews = createMiddleTrigonometryReviewProblems(kinds, 123);
  assert.equal(reviews.length, 2);
  assert.deepEqual(reviews.map(({ kind }) => kind), ["single-ratio", "special-angle"]);
  assert.ok(reviews.every(({ difficulty }) => difficulty === "advanced"));
});
