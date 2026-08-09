import assert from "node:assert/strict";
import test from "node:test";
import { createGradeSixCircleSet } from "../lib/grade-six-circle.ts";

test("원의 둘레와 넓이는 여덟 유형 중 서로 다른 세 도형만 뽑는다", () => {
  const problems = createGradeSixCircleSet(20260722);
  assert.equal(problems.length, 3);
  assert.equal(new Set(problems.map((problem) => problem.kind)).size, 3);
  assert.ok(problems.every((problem) => problem.perimeter > 0 && problem.area > 0));
  assert.deepEqual(createGradeSixCircleSet(20260722), problems);
});

test("새 시드는 숫자와 복합도형 배치를 함께 바꾼다", () => {
  const first = createGradeSixCircleSet(20260722);
  const second = createGradeSixCircleSet(20260723);
  assert.notDeepEqual(second, first);
  assert.notDeepEqual(second.map((problem) => problem.kind), first.map((problem) => problem.kind));
});

test("고리 모양의 둘레는 안쪽 원의 둘레까지 포함한다", () => {
  const problem = Array.from({ length: 64 }, (_, index) => createGradeSixCircleSet(20260722 + index)).flat().find((item) => item.kind === "annulus");
  assert.ok(problem);
  const { outer, inner } = problem.dimensions;
  assert.equal(problem.perimeter, Number((2 * 3.14 * (outer + inner)).toFixed(2)));
  assert.equal(problem.area, Number((3.14 * (outer ** 2 - inner ** 2)).toFixed(2)));
});
