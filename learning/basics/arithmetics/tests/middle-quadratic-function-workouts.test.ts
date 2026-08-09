import assert from "node:assert/strict";
import test from "node:test";

import {
  createMiddleQuadraticFunctionProblemSet,
  createMiddleQuadraticFunctionReviewProblems,
  MIDDLE_QUADRATIC_FUNCTION_KINDS,
  MIDDLE_QUADRATIC_FUNCTION_METHOD_KINDS,
  resolveMiddleQuadraticFunctionKind,
  type MiddleQuadraticFunctionMethodKind,
} from "../lib/middle-quadratic-function-workouts.ts";

test("중3 이차함수 계산은 쉬운 세부 유형을 합친 5개 학습지로 구성된다", () => {
  assert.equal(MIDDLE_QUADRATIC_FUNCTION_KINDS.length, 5);
  for (const kind of MIDDLE_QUADRATIC_FUNCTION_KINDS) {
    const set = createMiddleQuadraticFunctionProblemSet(kind, 20260730);
    assert.equal(set.problems.length, 8, kind);
    assert.equal(set.kind, kind);
    assert.equal(new Set(set.problems.map(({ id }) => id)).size, 8, kind);
  }
});

test("묶음 학습지는 필요한 세부 계산 유형을 빠짐없이 섞는다", () => {
  assert.deepEqual(
    new Set(createMiddleQuadraticFunctionProblemSet("values-and-forms", 7).problems.map(({ kind }) => kind)),
    new Set([
      "basic-value", "expand-vertex-form", "vertex-axis", "complete-square",
      "extreme-value", "coefficient-from-point", "equation-from-vertex-point", "intercepts",
    ]),
  );
  assert.deepEqual(
    new Set(createMiddleQuadraticFunctionProblemSet("vertex-and-axis", 7).problems.map(({ kind }) => kind)),
    new Set(["vertex-axis", "complete-square", "normalize-first"]),
  );
  assert.deepEqual(
    new Set(createMiddleQuadraticFunctionProblemSet("determine-equation", 7).problems.map(({ kind }) => kind)),
    new Set(["coefficient-from-point", "equation-from-vertex-point"]),
  );
  assert.deepEqual(
    new Set(createMiddleQuadraticFunctionProblemSet("intercepts-and-intersections", 7).problems.map(({ kind }) => kind)),
    new Set(["intercepts", "line-intersections"]),
  );
});

test("모든 이차함수 문제는 네 선택지와 한 줄 핵심 풀이를 제공한다", () => {
  for (const kind of MIDDLE_QUADRATIC_FUNCTION_KINDS) {
    for (let seed = 1; seed <= 100; seed += 1) {
      for (const problem of createMiddleQuadraticFunctionProblemSet(kind, seed).problems) {
        assert.equal(problem.distractors.length, 3, `${kind}/${seed}`);
        assert.equal(new Set([problem.answerLatex, ...problem.distractors]).size, 4, `${kind}/${seed}`);
        assert.ok(problem.solutionHint.length >= 15);
        assert.doesNotMatch(problem.label, /^이차함수:|[²³⁴⁵⁶⁷⁸⁹]/);
        assert.doesNotMatch(`${problem.latex}${problem.answerLatex}${problem.solutionHint}`, /NaN|undefined|\+\-|--/);
      }
    }
  }
});

test("계수 1과 -1은 풀이에서도 불필요한 숫자 1을 쓰지 않는다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createMiddleQuadraticFunctionProblemSet("values-and-forms", seed).problems
      .filter(({ kind }) => kind === "basic-value");
    for (const problem of problems) {
      assert.doesNotMatch(problem.solutionHint, /(?:^|[^0-9])-?1\\times/);
    }
  }
});

test("각 이차함수 학습지는 기본 2, 응용 3, 고난도 3문제로 진행한다", () => {
  const expected = [
    "basic", "basic",
    "application", "application", "application",
    "advanced", "advanced", "advanced",
  ];
  for (const kind of MIDDLE_QUADRATIC_FUNCTION_KINDS) {
    assert.deepEqual(
      createMiddleQuadraticFunctionProblemSet(kind, 20260730).problems.map(({ difficulty }) => difficulty),
      expected,
      kind,
    );
  }
});

test("그래프 작도 없이 꼭짓점에서 최댓값·최솟값을 계산한다", () => {
  const problems = createMiddleQuadraticFunctionProblemSet("values-and-forms", 20260730).problems;
  const extreme = problems.find(({ kind }) => kind === "extreme-value");
  assert.ok(extreme);
  assert.match(`${extreme.label}${extreme.solutionHint}`, /최댓값|최솟값/);
  for (const kind of MIDDLE_QUADRATIC_FUNCTION_KINDS) {
    for (const problem of createMiddleQuadraticFunctionProblemSet(kind, 20260730).problems) {
      assert.doesNotMatch(
        `${problem.label}${problem.solutionHint}`,
        /그래프의 개형|그래프를 그|넓이|거리/,
      );
    }
  }
});

test("식과 꼭짓점 학습지는 단순 함숫값을 한 문제만 둔다", () => {
  const problems = createMiddleQuadraticFunctionProblemSet("values-and-forms", 20260730).problems;
  assert.equal(
    problems.filter(({ kind }) => ["basic-value", "vertex-value", "fraction-decimal"].includes(kind)).length,
    1,
  );
  assert.equal(problems[0].kind, "basic-value");
});

test("이차함수 종합은 연속 세 세트에서 모든 계산 유형을 순환한다", () => {
  const kinds = [1, 2, 3].flatMap((seed) => (
    createMiddleQuadraticFunctionProblemSet("comprehensive", seed).problems.map(({ kind }) => kind)
  ));
  assert.deepEqual([...new Set(kinds)].sort(), [...MIDDLE_QUADRATIC_FUNCTION_METHOD_KINDS].sort());
});

test("기존 세부 유형 주소는 해당 묶음 학습지로 연결된다", () => {
  assert.equal(resolveMiddleQuadraticFunctionKind("basic-value"), "values-and-forms");
  assert.equal(resolveMiddleQuadraticFunctionKind("complete-square"), "vertex-and-axis");
  assert.equal(resolveMiddleQuadraticFunctionKind("extreme-value"), "values-and-forms");
  assert.equal(resolveMiddleQuadraticFunctionKind("coefficient-from-point"), "determine-equation");
  assert.equal(resolveMiddleQuadraticFunctionKind("line-intersections"), "intercepts-and-intersections");
  assert.equal(resolveMiddleQuadraticFunctionKind("comprehensive"), "comprehensive");
  assert.equal(resolveMiddleQuadraticFunctionKind("unknown"), null);
});

test("오답 보충은 서로 다른 틀린 유형 중 최대 두 문제만 만든다", () => {
  const kinds: MiddleQuadraticFunctionMethodKind[] = [
    "basic-value", "complete-square", "basic-value", "intercepts",
  ];
  const reviews = createMiddleQuadraticFunctionReviewProblems(kinds, 88);
  assert.equal(reviews.length, 2);
  assert.deepEqual(reviews.map(({ kind }) => kind), ["basic-value", "complete-square"]);
});
