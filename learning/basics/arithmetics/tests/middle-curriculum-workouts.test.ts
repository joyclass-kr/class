import assert from "node:assert/strict";
import test from "node:test";

import {
  createMiddleCurriculumProblemSet,
  createMiddleCurriculumReviewProblems,
  MIDDLE_CURRICULUM_GRADES,
  MIDDLE_CURRICULUM_KINDS,
  MIDDLE_CURRICULUM_TITLES,
  type MiddleCurriculumKind,
} from "../lib/middle-curriculum-workouts.ts";
import { worksheetQuestionForLabel } from "../lib/worksheet-question.ts";

test("중등 교육과정 공통 발문은 구할 대상을 정확히 밝힌다", () => {
  assert.deepEqual(
    [
      "좌표와 사분면",
      "좌표축 위의 점",
      "정비례 상수",
      "반비례의 값",
      "정비례 표의 빈칸",
      "함숫값에서 x 구하기",
      "두 점으로 일차함수 구하기",
      "그래프와 연립방정식",
      "다각형의 대각선",
      "구의 부피와 겉넓이",
      "합의 법칙",
      "직각삼각형 판별",
      "중심각에서 원주각",
      "한 점에서 그은 두 접선",
      "제1사분위수",
      "제3사분위수",
      "사분위범위",
      "범위",
      "다섯 수 요약",
      "상자그림에서 최댓값",
      "두 상자그림의 산포도 비교",
    ].map(worksheetQuestionForLabel),
    [
      "점이 속한 사분면은?",
      "점이 놓인 좌표축은?",
      "상수 $a$는?",
      "$y$의 값은?",
      "빈칸에 들어갈 수는?",
      "$x$는?",
      "일차함수의 식은?",
      "$(x, y)$는?",
      "대각선의 개수는?",
      "부피와 겉넓이는?",
      "경우의 수는?",
      "직각삼각형인가?",
      "각의 크기는?",
      "접선의 길이는?",
      "제1사분위수는?",
      "제3사분위수는?",
      "사분위범위는?",
      "범위는?",
      "다섯 수 요약은?",
      "최댓값은?",
      "사분위범위가 더 큰 자료는?",
    ],
  );
});

const EXPECTED_METHODS: Record<MiddleCurriculumKind, string[]> = {
  "coordinate-proportion": [
    "quadrant", "point-on-axis", "direct-coefficient", "direct-value",
    "inverse-coefficient", "inverse-value", "direct-table", "inverse-table",
  ],
  "linear-function-basics": [
    "function-value", "input-from-value", "slope-two-points", "y-intercept",
    "x-intercept", "equation-slope-intercept", "coefficient-from-point", "parallel-slope",
  ],
  "linear-function-equations": [
    "point-parameter", "equation-two-points", "parallel-through-point", "intersection",
    "system-graph-solution", "x-axis-intersection", "y-axis-intersection", "two-lines-parameter",
  ],
  "plane-geometry": [
    "vertical-angles", "parallel-angles", "triangle-angle", "polygon-interior-sum",
    "regular-polygon-angle", "regular-polygon-exterior", "polygon-diagonals", "sector-arc-area",
  ],
  "solid-geometry": [
    "rectangular-prism-volume", "rectangular-prism-surface", "prism-volume", "pyramid-volume",
    "cylinder-volume", "cylinder-surface", "cone-volume", "sphere-volume-surface",
  ],
  "triangle-quadrilateral": [
    "isosceles-angle", "triangle-exterior", "parallelogram-angle", "parallelogram-side",
    "trapezoid-midline", "circumcenter-distance", "incenter-bisector", "centroid-ratio",
  ],
  similarity: [
    "scale-factor", "missing-side", "perimeter-ratio", "area-ratio",
    "parallel-segment", "midpoint-segment", "two-triangles", "combined-similarity",
  ],
  pythagorean: [
    "hypotenuse", "missing-leg", "rectangle-diagonal", "square-diagonal",
    "coordinate-distance", "right-triangle-check", "isosceles-height", "composite-distance",
  ],
  "counting-probability": [
    "addition-rule", "multiplication-rule", "two-digit-numbers", "outfit-count",
    "die-probability", "two-dice-sum", "complement-probability", "two-step-probability",
  ],
  "quartiles-boxplot": [
    "median", "first-quartile", "third-quartile", "interquartile-range",
    "range", "five-number-summary", "missing-maximum", "compare-boxplots",
  ],
};

test("교육과정 보완 학습지 10개는 필수 계산 유형을 각각 8문제로 묶는다", () => {
  assert.deepEqual(MIDDLE_CURRICULUM_KINDS, Object.keys(EXPECTED_METHODS));
  for (const kind of MIDDLE_CURRICULUM_KINDS) {
    const set = createMiddleCurriculumProblemSet(kind, 20260730);
    assert.equal(set.problems.length, 8, kind);
    assert.deepEqual(set.problems.map(({ kind: method }) => method), EXPECTED_METHODS[kind], kind);
    assert.ok(MIDDLE_CURRICULUM_TITLES[kind]);
    assert.match(MIDDLE_CURRICULUM_GRADES[kind], /^중[123]$/);
  }
});

test("모든 보완 문제는 실제 오답 세 개와 한 줄 핵심 풀이를 제공한다", () => {
  for (const kind of MIDDLE_CURRICULUM_KINDS) {
    for (let seed = 1; seed <= 200; seed += 1) {
      const problems = createMiddleCurriculumProblemSet(kind, seed).problems;
      assert.equal(new Set(problems.map(({ latex, answerLatex }) => `${latex}|${answerLatex}`)).size, 8);
      for (const problem of problems) {
        assert.equal(problem.distractors.length, 3, `${kind}/${seed}/${problem.kind}`);
        assert.equal(new Set([problem.answerLatex, ...problem.distractors]).size, 4);
        assert.ok(problem.solutionHint.length >= 12);
        assert.doesNotMatch(
          `${problem.latex}${problem.answerLatex}${problem.distractors.join("")}`,
          /NaN|undefined|\+\-|\-\-|(?:^|[=+(\-])1x|(?:^|[=+(])\-1x|\d+\.\d+\\pi/,
        );
      }
    }
  }
});

test("보완 학습지는 기본 2·응용 3·고난도 3문제로 진행한다", () => {
  const expected = [
    "basic", "basic",
    "application", "application", "application",
    "advanced", "advanced", "advanced",
  ];
  for (const kind of MIDDLE_CURRICULUM_KINDS) {
    assert.deepEqual(
      createMiddleCurriculumProblemSet(kind, 29).problems.map(({ difficulty }) => difficulty),
      expected,
    );
  }
});

test("같은 시드는 같은 문제를 만들고 오답 보충은 최대 두 유형만 만든다", () => {
  const first = createMiddleCurriculumProblemSet("similarity", 99);
  const second = createMiddleCurriculumProblemSet("similarity", 99);
  const different = createMiddleCurriculumProblemSet("similarity", 100);
  assert.deepEqual(first, second);
  assert.notDeepEqual(first, different);

  const reviews = createMiddleCurriculumReviewProblems(
    "similarity",
    ["scale-factor", "missing-side", "scale-factor", "area-ratio"],
    77,
  );
  assert.equal(reviews.length, 2);
  assert.deepEqual(reviews.map(({ kind }) => kind), ["scale-factor", "missing-side"]);
  assert.ok(reviews.every(({ difficulty }) => difficulty === "advanced"));
});

test("사분위수 학습지는 같은 자료를 다른 번호에 반복하지 않는다", () => {
  for (let seed = 1; seed <= 200; seed += 1) {
    const latex = createMiddleCurriculumProblemSet("quartiles-boxplot", seed)
      .problems
      .map((problem) => problem.latex);
    assert.equal(new Set(latex).size, latex.length, `${seed}`);
  }
});
