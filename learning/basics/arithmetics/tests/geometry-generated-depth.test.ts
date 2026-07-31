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
  assert.equal(problems.length, 7);
  assert.deepEqual(problems.map(({ label }) => label), [
    "두 직선이 이루는 각",
    "직선과 평면의 위치 관계",
    "두 평면이 이루는 각",
    "점과 평면 사이의 거리",
    "평행한 두 평면 사이의 거리",
    "평면에 내린 수선의 발",
    "직선 방향으로의 벡터 정사영",
  ]);
  for (const problem of problems) {
    assert.equal(problem.choices.length, 4);
    assert.equal(new Set(problem.choices.map(({ latex }) => latex)).size, 4);
    assert.equal(problem.choices.filter(({ correct }) => correct).length, 1);
    assert.doesNotMatch(problem.choices.map(({ latex }) => latex).join(" "), /\+1(?:$|\s)/);
  }
});

test("좌표가 들어간 벡터 문항도 실제로 구할 대상을 정확히 묻는다", () => {
  assert.equal(createProjectionProblems(20260910)[6].prompt, "$\\cos\\angle(\\vec a, x\\text{축})$는?");
  assert.equal(createVectorGeometryProblems(20260910)[5].prompt, "수선의 발 $H$는?");
  assert.deepEqual(
    createSpaceCoordinateProblems(20260910).slice(5).map(({ prompt }) => prompt),
    ["대칭이동한 점의 좌표는?", "$a$는?"],
  );
});
