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
      "구의 부피와 겉넓이는?",
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
    "function-value", "table-equation", "slope-two-points", "both-intercepts",
    "equation-two-points", "parallel-through-point", "intersection", "two-lines-parameter",
  ],
  "construction-congruence": [
    "line-relation", "line-plane-relation", "perpendicular-bisector", "angle-bisector",
    "triangle-construction", "sss-congruence", "sas-congruence", "asa-congruence",
  ],
  "frequency-graphs": [
    "frequency-table", "histogram-frequency", "histogram-total", "frequency-polygon-maximum",
    "relative-frequency", "relative-frequency-compare", "missing-class-frequency", "class-width",
  ],
  "plane-geometry": [
    "vertical-angles", "parallel-angles", "triangle-angle", "polygon-interior-sum",
    "regular-polygon-angle", "regular-polygon-exterior", "polygon-diagonals", "sector-arc-area",
  ],
  "solid-geometry": [
    "joined-prism-pyramid-volume", "open-pyramid-surface",
    "drilled-prism-volume", "hollow-cylinder-volume",
    "hollow-cylinder-surface", "open-cylinder-surface",
    "joined-cylinder-cone-volume", "capsule-volume-surface",
  ],
  "triangle-quadrilateral": [
    "isosceles-angle", "triangle-exterior", "parallelogram-angle", "parallelogram-side",
    "trapezoid-midline", "circumcenter-distance", "incenter-bisector", "centroid-ratio",
  ],
  pythagorean: [
    "hypotenuse", "missing-leg", "rectangle-diagonal", "square-diagonal",
    "solid-diagonal", "right-triangle-check", "isosceles-height", "composite-distance",
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

test("교육과정 보완 학습지는 필수 유형을 적정 문제 수로 묶는다", () => {
  assert.deepEqual(MIDDLE_CURRICULUM_KINDS, Object.keys(EXPECTED_METHODS));
  for (const kind of MIDDLE_CURRICULUM_KINDS) {
    const set = createMiddleCurriculumProblemSet(kind, 20260730);
    assert.equal(set.problems.length, kind === "frequency-graphs" ? 4 : EXPECTED_METHODS[kind].length, kind);
    assert.ok(set.problems.every(({ kind: method }) => EXPECTED_METHODS[kind].includes(method)), kind);
    assert.ok(MIDDLE_CURRICULUM_TITLES[kind]);
    assert.match(MIDDLE_CURRICULUM_GRADES[kind], /^중[123]$/);
  }
});

test("작도·합동과 도수분포 문제는 정확한 발문과 실제 그림 자료를 제공한다", () => {
  for (const kind of ["construction-congruence", "frequency-graphs"] as const) {
    const problems = createMiddleCurriculumProblemSet(kind, 20260809).problems;
    assert.ok(problems.some(({ visual }) => visual));
    assert.ok(problems.filter(({ visual }) => visual).every(({ question }) => question?.endsWith("?")));
  }
  assert.ok(
    createMiddleCurriculumProblemSet("construction-congruence", 20260809)
      .problems.every(({ kind }) => !["line-name", "point-name"].includes(kind)),
  );
});

test("도수분포 8유형은 두 세트에 걸쳐 모두 출제된다", () => {
  const rotatedMethods = [1, 2].flatMap((seed) =>
    createMiddleCurriculumProblemSet("frequency-graphs", seed).problems.map(({ kind }) => kind),
  );
  assert.deepEqual(new Set(rotatedMethods), new Set(EXPECTED_METHODS["frequency-graphs"]));
});
test("중2 도형 두 학습지는 모든 문항에 유형별 도식을 제공한다", () => {
  for (const kind of ["triangle-quadrilateral", "pythagorean"] as const) {
    const problems = createMiddleCurriculumProblemSet(kind, 20260809).problems;
    assert.equal(problems.length, 8);
    assert.ok(problems.every(({ visual }) => visual?.type === "geometry"), kind);
    assert.deepEqual(
      problems.map(({ visual }) => visual?.type === "geometry" ? visual.variant : ""),
      problems.map(({ kind: method }) => method),
      kind,
    );
  }
});

test("모든 보완 문제는 실제 오답 세 개와 한 줄 핵심 풀이를 제공한다", () => {
  for (const kind of MIDDLE_CURRICULUM_KINDS) {
    for (let seed = 1; seed <= 200; seed += 1) {
      const problems = createMiddleCurriculumProblemSet(kind, seed).problems;
      assert.equal(new Set(problems.map(({ latex, answerLatex }) => `${latex}|${answerLatex}`)).size, problems.length);
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
      expected.slice(0, kind === "frequency-graphs" ? 4 : EXPECTED_METHODS[kind].length),
    );
  }
});

test("같은 시드는 같은 문제를 만들고 오답 보충은 최대 두 유형만 만든다", () => {
  const first = createMiddleCurriculumProblemSet("pythagorean", 99);
  const second = createMiddleCurriculumProblemSet("pythagorean", 99);
  const different = createMiddleCurriculumProblemSet("pythagorean", 100);
  assert.deepEqual(first, second);
  assert.notDeepEqual(first, different);

  const reviews = createMiddleCurriculumReviewProblems(
    "pythagorean",
    ["hypotenuse", "missing-leg", "hypotenuse", "rectangle-diagonal"],
    77,
  );
  assert.equal(reviews.length, 2);
  assert.deepEqual(reviews.map(({ kind }) => kind), ["hypotenuse", "missing-leg"]);
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
