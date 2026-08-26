import assert from "node:assert/strict";
import test from "node:test";
import {
  createHighCubicFactorizationProblemSet,
  createHighCubicFactorizationReviewProblems,
  type HighCubicFactorizationProblem,
} from "../lib/high-cubic-factorization-workouts.ts";
import { highSchoolWorksheetCatalog } from "../lib/arithmetic-worksheets.ts";

function evaluate(latex: string, x: number, y: number) {
  const expression = latex
    .replaceAll("^", "**")
    .replace(/(\d)([xy(])/g, "$1*$2")
    .replace(/([xy)])([xy(])/g, "$1*$2")
    .replace(/(\))(\d)/g, "$1*$2");
  return Function("x", "y", `"use strict"; return (${expression});`)(x, y);
}

test("세제곱의 합·차 학습지는 서로 다른 여덟 구조를 한 문제씩 만든다", () => {
  const problems = createHighCubicFactorizationProblemSet(20260804).problems;
  assert.equal(problems.length, 8);
  assert.deepEqual(
    problems.map(({ structure }) => structure),
    [
      "monic-sum",
      "monic-difference",
      "coefficient-sum",
      "coefficient-difference",
      "two-variable",
      "common-factor",
      "shifted-binomial",
      "higher-power",
    ],
  );
});

test("모든 정답을 전개하면 원래 세제곱식과 정확히 같다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    for (const problem of createHighCubicFactorizationProblemSet(seed).problems) {
      for (const [x, y] of [[-3, 2], [2, -1], [5, 3]]) {
        assert.equal(
          evaluate(problem.answerLatex, x, y),
          evaluate(problem.latex, x, y),
          `${problem.structure}: ${problem.latex} → ${problem.answerLatex}`,
        );
      }
    }
  }
});

test("각 문제는 정답 하나와 서로 다른 실제 오답 세 개를 제공한다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    for (const problem of createHighCubicFactorizationProblemSet(seed).problems) {
      const choices = [problem.answerLatex, ...problem.distractors];
      assert.equal(choices.length, 4);
      assert.equal(new Set(choices).size, 4);
      for (const distractor of problem.distractors) {
        const isActuallyWrong = [[-3, 2], [2, -1], [5, 3]].some(
          ([x, y]) => evaluate(distractor, x, y) !== evaluate(problem.latex, x, y),
        );
        assert.equal(isActuallyWrong, true, `${problem.structure}: ${distractor}`);
      }
    }
  }
});

test("계수 1과 의미 없는 일차인수 괄호를 표기하지 않는다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const text = createHighCubicFactorizationProblemSet(seed).problems
      .flatMap(({ latex, answerLatex }) => [latex, answerLatex])
      .join(" ");
    assert.doesNotMatch(text, /(?:^|[=+(\-])1x/);
    assert.doesNotMatch(text, /\(x\)(?=\()/);
    assert.doesNotMatch(text, /NaN|undefined|\+\-|\-\-/);
  }
});

test("난이도는 기본 2, 응용 3, 고난도 3문제 순서다", () => {
  assert.deepEqual(
    createHighCubicFactorizationProblemSet(31).problems.map(({ difficulty }) => difficulty),
    [
      "basic", "basic",
      "application", "application", "application",
      "advanced", "advanced", "advanced",
    ],
  );
});

test("오답 보충은 서로 다른 구조에서 최대 두 문제만 만든다", () => {
  const structures: HighCubicFactorizationProblem["structure"][] = [
    "coefficient-sum",
    "coefficient-sum",
    "shifted-binomial",
    "higher-power",
  ];
  const reviews = createHighCubicFactorizationReviewProblems(structures, 77);
  assert.equal(reviews.length, 2);
  assert.deepEqual(reviews.map(({ structure }) => structure), ["coefficient-sum", "shifted-binomial"]);
  assert.ok(reviews.every(({ difficulty }) => difficulty === "advanced"));
});

test("고등 연산 목록은 모두 연결되고 이름과 경로가 중복되지 않는다", () => {
  assert.ok(highSchoolWorksheetCatalog.length >= 55);
  assert.ok(highSchoolWorksheetCatalog.every(({ route }) => route !== null));
  assert.equal(new Set(highSchoolWorksheetCatalog.map(({ name }) => name)).size, highSchoolWorksheetCatalog.length);
  assert.equal(new Set(highSchoolWorksheetCatalog.map(({ route }) => route)).size, highSchoolWorksheetCatalog.length);
});
