import test from "node:test";
import assert from "node:assert/strict";
import {
  createConicProblems,
  createPlaneVectorProblems,
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
  assert.equal(problems.length, 8);
  assert.deepEqual(problems.map(({ label }) => label), [
    "두 직선이 이루는 각 계산",
    "두 평면이 이루는 각 계산",
    "점과 평면 사이의 거리",
    "평행한 두 평면 사이의 거리",
    "평면에 내린 수선의 발",
    "직선 방향으로의 벡터 정사영",
    "평면도형의 정사영 넓이",
    "삼수선과 거리 계산",
  ]);
  assert.ok(problems.filter(({ latex }) => latex.includes("\\begin{gathered}")).length >= 7);
  assert.ok(problems.every(({ label }) => label !== "직선과 평면의 위치 관계"));
  const planeAngle = problems.find(({ label }) => label === "두 평면이 이루는 각 계산");
  assert.ok(planeAngle);
  assert.match(planeAngle.latex, /\\alpha:\d+x=-?\d+/);
  assert.match(planeAngle.latex, /\\beta:\d+x\+\d+y=-?\d+/);
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
  assert.equal(createVectorGeometryProblems(20260910)[5].prompt, "$P$에서 두 좌표축까지 거리의 합은?");
});

test("이차곡선과 평면벡터는 공식 모양을 고르지 않고 주어진 수로 답을 계산한다", () => {
  const conics = createConicProblems(20260910);
  const vectors = createPlaneVectorProblems(20260910);
  assert.deepEqual(conics.slice(1, 4).map(({ label }) => label), ["쌍곡선의 초점", "포물선의 계수 계산", "타원의 중심 계산"]);
  assert.match(conics[2].correctLatex, /^q=\d+$/);
  assert.match(conics[3].prompt ?? "", /완전제곱식/);
  assert.match(vectors[6].correctLatex, /^\\vec p=\\left\(/);
  assert.doesNotMatch(vectors[6].correctLatex, /\\frac\{\\vec/);
});

test("공간좌표는 공식 고르기 대신 주어진 값으로 계산한다", () => {
  const problems = createSpaceCoordinateProblems(20260910);
  assert.deepEqual(problems.slice(2).map(({ label }) => label), [
    "내분점의 좌표",
    "구의 중심과 반지름",
    "좌표평면에 접하는 구",
    "좌표평면 대칭점 사이의 거리",
    "등거리 조건",
  ]);
  assert.doesNotMatch(problems[2].correctLatex, /\\frac\{A\+|\\frac\{\d+A/);
  assert.match(problems[3].latex, /^x\^2\+y\^2\+z\^2/);
  assert.match(problems[3].prompt ?? "", /완전제곱식/);
  assert.equal(problems[5].prompt, "$PQ$는?");
  assert.match(problems[5].correctLatex, /^PQ=\d+$/);
  assert.equal(problems[6].prompt, "$t$는?");
  assert.match(problems[6].correctLatex, /^t=-?\d+$/);
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
