import assert from "node:assert/strict";
import test from "node:test";
import {
  createMiddleCoreProblemSet,
  createMiddleCoreReviewProblems,
  MIDDLE_CORE_KINDS,
  type MiddleCoreKind,
} from "../lib/middle-core-workouts.ts";
import { middleSchoolWorksheetCatalog } from "../lib/arithmetic-worksheets.ts";

test("중등 핵심 연산 19개 유형이 각각 8문제를 생성한다", () => {
  assert.equal(MIDDLE_CORE_KINDS.length, 19);
  for (const kind of MIDDLE_CORE_KINDS) {
    const set = createMiddleCoreProblemSet(kind, 20260803);
    assert.equal(set.problems.length, 8);
    assert.equal(set.kind, kind);
  }
});

test("모든 핵심 연산 문제는 서로 다른 네 선택지와 한 줄 핵심 풀이를 제공한다", () => {
  for (const kind of MIDDLE_CORE_KINDS) {
    for (let seed = 1; seed <= 100; seed += 1) {
      for (const problem of createMiddleCoreProblemSet(kind, seed).problems) {
        const choices = [problem.answerLatex, ...problem.distractors];
        assert.equal(choices.length, 4);
        assert.equal(new Set(choices).size, 4);
        assert.ok(problem.solutionHint.length >= 12);
        assert.doesNotMatch(
          `${problem.latex}${problem.answerLatex}${problem.distractors.join("")}`,
          /NaN|undefined|\+\-|\-\-/,
        );
      }
    }
  }
});

test("계수가 1 또는 -1이면 문자 앞의 숫자 1을 쓰지 않는다", () => {
  for (const kind of MIDDLE_CORE_KINDS) {
    for (let seed = 1; seed <= 100; seed += 1) {
      const text = createMiddleCoreProblemSet(kind, seed).problems
        .flatMap(({ latex, answerLatex, distractors }) => [latex, answerLatex, ...distractors])
        .join(" ");
      assert.doesNotMatch(text, /(?:^|[=+(\-])1x/);
      assert.doesNotMatch(text, /(?:^|[=+(])\-1x/);
    }
  }
});

test("각 학습지는 기본 2, 응용 3, 고난도 3문제로 구성된다", () => {
  for (const kind of MIDDLE_CORE_KINDS) {
    assert.deepEqual(
      createMiddleCoreProblemSet(kind, 29).problems.map(({ difficulty }) => difficulty),
      [
        "basic", "basic",
        "application", "application", "application",
        "advanced", "advanced", "advanced",
      ],
    );
  }
});

test("한 학습지 안에서 같은 문제와 정답 조합을 반복하지 않는다", () => {
  for (const kind of MIDDLE_CORE_KINDS) {
    for (let seed = 1; seed <= 100; seed += 1) {
      const signatures = createMiddleCoreProblemSet(kind, seed).problems
        .map(({ latex, answerLatex }) => `${latex}|${answerLatex}`);
      assert.equal(new Set(signatures).size, 8, `${kind}, seed ${seed}`);
    }
  }
});

test("분배법칙 문제는 의미 없는 1배와 상수 없는 괄호를 만들지 않는다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const problems = createMiddleCoreProblemSet("linear-expression", seed).problems;
    for (const problem of problems.filter(({ structure }) => structure.startsWith("distribute"))) {
      assert.doesNotMatch(problem.latex, /(?:^|[+\-])1\(/);
      assert.doesNotMatch(problem.latex, /\(x\)/);
    }
  }
});

test("종합 곱셈공식은 다항식의 곱셈, 완전제곱식, 합과 차를 순환한다", () => {
  const structures = createMiddleCoreProblemSet("formula-comprehensive", 31).problems
    .map(({ structure }) => structure);
  assert.ok(structures.some((structure) => structure === "monomial-binomial"));
  assert.ok(structures.some((structure) => structure.endsWith("-square")));
  assert.ok(structures.some((structure) => structure.endsWith("-leading")));
});

test("오답 보충은 서로 다른 유형에서 최대 두 문제만 만든다", () => {
  const kinds: MiddleCoreKind[] = [
    "linear-equation",
    "linear-equation",
    "linear-inequality",
    "radical-calculation",
  ];
  const reviews = createMiddleCoreReviewProblems(kinds, 123);
  assert.equal(reviews.length, 2);
  assert.deepEqual(reviews.map(({ kind }) => kind), ["linear-equation", "linear-inequality"]);
  assert.ok(reviews.every(({ difficulty }) => difficulty === "advanced"));
});

test("중학교 연산 목록 86개는 모두 연결되며 이름과 경로가 중복되지 않는다", () => {
  assert.equal(middleSchoolWorksheetCatalog.length, 86);
  assert.ok(middleSchoolWorksheetCatalog.every(({ route }) => route !== null));
  assert.equal(
    new Set(middleSchoolWorksheetCatalog.map(({ name }) => name)).size,
    middleSchoolWorksheetCatalog.length,
  );
  assert.equal(
    new Set(middleSchoolWorksheetCatalog.map(({ route }) => route)).size,
    middleSchoolWorksheetCatalog.length,
  );
});
