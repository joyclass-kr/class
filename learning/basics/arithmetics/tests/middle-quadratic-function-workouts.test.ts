import assert from "node:assert/strict";
import test from "node:test";

import { middleSchoolWorksheetCatalog } from "../lib/arithmetic-worksheets.ts";
import {
  createMiddleQuadraticFunctionProblemSet,
  createMiddleQuadraticFunctionReviewProblems,
  MIDDLE_QUADRATIC_FUNCTION_KINDS,
  resolveMiddleQuadraticFunctionKind,
  type MiddleQuadraticFunctionMethodKind,
} from "../lib/middle-quadratic-function-workouts.ts";

const EXPECTED_METHODS = [
  "expand-vertex-form",
  "vertex-axis",
  "complete-square",
  "extreme-value",
  "normalize-first",
  "equation-from-vertex-point",
  "intercepts",
  "line-intersections",
];

test("중3 이차함수는 한 장의 종합 학습지만 제공한다", () => {
  assert.deepEqual(MIDDLE_QUADRATIC_FUNCTION_KINDS, ["comprehensive"]);
  const catalogEntries = middleSchoolWorksheetCatalog.filter(({ route }) => route?.includes("/quadratic-functions"));
  assert.deepEqual(catalogEntries.map(({ title, route }) => ({ title, route })), [{
    title: "이차함수",
    route: "/arithmetic/middle-school/quadratic-functions?kind=comprehensive",
  }]);
});

test("이차함수 한 장은 대입을 빼고 변형과 판단이 필요한 여덟 유형을 한 문제씩 섞는다", () => {
  const set = createMiddleQuadraticFunctionProblemSet("comprehensive", 20260730);
  assert.equal(set.kind, "comprehensive");
  assert.equal(set.problems.length, 8);
  assert.equal(new Set(set.problems.map(({ id }) => id)).size, 8);
  assert.deepEqual(set.problems.map(({ kind }) => kind), EXPECTED_METHODS);
  assert.equal(set.problems.some(({ kind }) => [
    "basic-value", "vertex-value", "fraction-decimal", "coefficient-from-point",
  ].includes(kind)), false);
});

test("모든 이차함수 문제는 네 선택지와 직접 발문을 제공한다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    for (const problem of createMiddleQuadraticFunctionProblemSet("comprehensive", seed).problems) {
      assert.equal(problem.distractors.length, 3, String(seed));
      assert.equal(new Set([problem.answerLatex, ...problem.distractors]).size, 4, String(seed));
      assert.ok(problem.solutionHint.length >= 15);
      assert.doesNotMatch(problem.label, /^이차함수:|[²³⁴⁵⁶⁷⁸⁹]/);
      assert.doesNotMatch(
        problem.label + problem.latex + problem.answerLatex + problem.solutionHint,
        /NaN|undefined|\+-|--/,
      );
    }
  }
});

test("그래프 작도 없이 꼭짓점·최댓값·최솟값·식·절편·교점을 계산한다", () => {
  const problems = createMiddleQuadraticFunctionProblemSet("comprehensive", 20260730).problems;
  assert.ok(problems.some(({ kind }) => kind === "extreme-value"));
  assert.ok(problems.some(({ kind }) => kind === "equation-from-vertex-point"));
  assert.ok(problems.some(({ kind }) => kind === "intercepts"));
  assert.ok(problems.some(({ kind }) => kind === "line-intersections"));
  for (const problem of problems) {
    assert.doesNotMatch(problem.label + problem.solutionHint, /그래프의 개형|그래프를 그|넓이|거리/);
  }
});

test("기존 이차함수 주소는 모두 한 장의 종합 학습지로 연결된다", () => {
  for (const legacy of [
    "values-and-forms", "vertex-and-axis", "determine-equation",
    "intercepts-and-intersections", "basic-value", "complete-square",
    "extreme-value", "coefficient-from-point", "line-intersections",
  ]) {
    assert.equal(resolveMiddleQuadraticFunctionKind(legacy), "comprehensive", legacy);
  }
  assert.equal(resolveMiddleQuadraticFunctionKind("comprehensive"), "comprehensive");
  assert.equal(resolveMiddleQuadraticFunctionKind("unknown"), null);
});

test("오답 보충은 서로 다른 틀린 유형 중 최대 두 문제만 만든다", () => {
  const kinds: MiddleQuadraticFunctionMethodKind[] = [
    "complete-square", "normalize-first", "complete-square", "intercepts",
  ];
  const reviews = createMiddleQuadraticFunctionReviewProblems(kinds, 88);
  assert.equal(reviews.length, 2);
  assert.deepEqual(reviews.map(({ kind }) => kind), ["complete-square", "normalize-first"]);
});
