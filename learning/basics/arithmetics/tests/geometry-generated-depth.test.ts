import test from "node:test";
import assert from "node:assert/strict";
import {
  createConicMoveTangentProblems,
  createProjectionProblems,
  createSpaceCoordinateProblems,
  createSpaceGeometryProjectionProblems,
  createVectorGeometryProblems,
} from "../lib/geometry-generated-workouts.ts";

test("이차곡선 접선은 쉬운 이동 문제 대신 일반점과 매개변수 계산을 훈련한다", () => {
  const problems = createConicMoveTangentProblems(20260812);
  assert.equal(problems.length, 7);
  assert.deepEqual(problems.map(({ label }) => label), [
    "타원의 일반점에서의 접선",
    "타원의 다른 일반점에서의 접선",
    "쌍곡선의 일반점에서의 접선",
    "포물선의 매개변수 접선",
    "세로 포물선의 매개변수 접선",
    "평행이동한 타원의 접선",
    "평행이동한 포물선의 접선",
  ]);
  assert.ok(problems.every(({ label }) => label.includes("접선")));
  assert.ok(problems.every(({ correctLatex }) => !/^(x|y)=0$/.test(correctLatex)));
  assert.ok(problems.every(({ latex, correctLatex }) => !/(^|[^0-9])1[xy]/.test(`${latex} ${correctLatex}`)));
});

test("공간도형 학습지는 위치 관계·거리·정사영을 서로 다른 계산으로 다룬다", () => {
  const problems = createSpaceGeometryProjectionProblems(20260817);
  assert.equal(problems.length, 9);
  assert.deepEqual(problems.map(({ label }) => label), [
    "두 직선이 이루는 각",
    "직선과 평면의 위치 관계",
    "두 평면이 이루는 각",
    "점과 평면 사이의 거리",
    "평행한 두 평면 사이의 거리",
    "평면에 내린 수선의 발",
    "직선 방향으로의 벡터 정사영",
    "평면도형의 정사영 넓이",
    "삼수선의 정리",
  ]);
  for (const problem of problems) {
    assert.equal(problem.choices.length, 4);
    assert.equal(new Set(problem.choices.map(({ latex }) => latex)).size, 4);
    assert.equal(problem.choices.filter(({ correct }) => correct).length, 1);
    assert.doesNotMatch(problem.choices.map(({ latex }) => latex).join(" "), /\+1(?:$|\s)/);
    assert.match(problem.prompt ?? "", /\?$/);
    assert.ok(problem.visualVariant);
  }
});

test("좌표가 들어간 벡터 문항도 실제로 구할 대상을 정확히 묻는다", () => {
  assert.equal(createProjectionProblems(20260910)[6].prompt, "$\\cos\\angle(\\vec a, x\\text{축})$는?");
  assert.equal(createVectorGeometryProblems(20260910)[5].prompt, "수선의 발 $H$는?");
  assert.deepEqual(
    createSpaceCoordinateProblems(20260910).slice(4).map(({ prompt }) => prompt),
    ["구의 방정식은?", "대칭이동한 점의 좌표는?", "$a$는?"],
  );
});

test("벡터 수직 조건의 정답은 근삿값이 아닌 기약분수이고 내적을 정확히 0으로 만든다", () => {
  const parseRational = (latex: string) => {
    const value = latex.replace(/^k=/, "");
    const fraction = value.match(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/);
    if (fraction) return `${fraction[1]}${fraction[2]}/${fraction[3]}`;
    return value;
  };

  for (let seed = 1; seed <= 100; seed += 1) {
    const problem = createProjectionProblems(seed)[1];
    const values = problem.latex.match(/^\(k,(-?\d+)\)\\perp\((-?\d+),(-?\d+)\)/);
    assert.ok(values);
    const scale = BigInt(values[1]);
    const perpendicularX = BigInt(values[2]);
    const perpendicularY = BigInt(values[3]);
    const rational = parseRational(problem.correctLatex);
    const [numeratorText, denominatorText = "1"] = rational.split("/");
    const numerator = BigInt(numeratorText);
    const denominator = BigInt(denominatorText);

    assert.equal(numerator * perpendicularX + scale * perpendicularY * denominator, 0n);
    assert.doesNotMatch(problem.correctLatex, /\d+\.\d+/);
  }
});
