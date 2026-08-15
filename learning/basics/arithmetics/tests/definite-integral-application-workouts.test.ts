import assert from "node:assert/strict";
import test from "node:test";
import {
  createDefiniteIntegralApplicationReviews,
  createDefiniteIntegralApplicationSet,
} from "../lib/definite-integral-application-workouts.ts";

const expectedKinds = [
  "quadratic-factor-area",
  "between-curves",
  "cubic-tangent-area",
  "cubic-inflection-area",
  "cubic-correction-area",
  "extrema-value-difference",
  "quadratic-velocity-distance",
  "position-total-distance",
];

test("정적분의 활용은 필수 넓이 공식과 실제 적용만 한 장에 묶는다", () => {
  const set = createDefiniteIntegralApplicationSet(20260812);
  assert.deepEqual(set.problems.map(({ kind }) => kind), expectedKinds);
  assert.equal(set.problems.length, 8);
  assert.deepEqual(set.problems.slice(0, 5).map(({ label }) => label), [
    "이차함수 6분의 공식",
    "두 함수 사이의 6분의 공식",
    "삼차함수와 접선 12분의 공식",
    "변곡점과 한쪽 넓이 4분의 공식",
    "일반 삼차함수 6분의 보정치",
  ]);
  assert.equal(set.problems.some(({ kind }) => kind.includes("quartic")), false);

  for (const problem of set.problems) {
    assert.equal(problem.answers.length, 1);
    assert.ok(problem.answers[0] > 0);
    assert.ok(Number.isInteger(problem.answers[0]));
    assert.match(problem.prompt, /(?:은|는)\?$/);
    assert.doesNotMatch(problem.prompt, /구하세요/);
  }
});

test("극값 차 공식은 삼차함수 최고차항 계수 기준 직접 계산과 역산을 섞는다", () => {
  const prompts = new Set<string>();
  const latexValues: string[] = [];
  for (let seed = 1; seed <= 80; seed += 1) {
    const problem = createDefiniteIntegralApplicationSet(seed).problems.find(
      ({ kind }) => kind === "extrema-value-difference",
    );
    assert.ok(problem);
    prompts.add(problem.prompt);
    latexValues.push(problem.latex);
    assert.ok(Number.isInteger(problem.answers[0]));
    assert.ok(problem.answers[0] > 0);
  }
  assert.ok([...prompts].some((prompt) => prompt.includes("f(\\alpha)")));
  assert.ok(prompts.has("$a$의 값은?"));
  assert.ok(prompts.has("$\\beta-\\alpha$의 값은?"));
  assert.ok(latexValues.some((latex) => latex.includes("f'(x)=3a")));
});

test("필수 넓이 공식형은 여러 시드에서도 정수 정답을 만든다", () => {
  for (let seed = 1; seed <= 50; seed += 1) {
    const areaProblems = createDefiniteIntegralApplicationSet(seed).problems.slice(0, 5);
    for (const problem of areaProblems) {
      assert.ok(Number.isInteger(problem.answers[0]), `${seed}: ${problem.kind}`);
      assert.ok(problem.latex.length > 0);
    }
  }
});

test("정적분 활용 보충 문제는 중복 유형을 제거한다", () => {
  const reviews = createDefiniteIntegralApplicationReviews(
    ["quadratic-factor-area", "quadratic-factor-area", "position-total-distance"],
    7,
  );
  assert.deepEqual(reviews.map(({ kind }) => kind), ["quadratic-factor-area", "position-total-distance"]);
});

test("정적분 활용 문제는 같은 시드에서 재현된다", () => {
  assert.deepEqual(
    createDefiniteIntegralApplicationSet(19),
    createDefiniteIntegralApplicationSet(19),
  );
});
