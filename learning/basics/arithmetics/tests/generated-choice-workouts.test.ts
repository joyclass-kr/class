import test from "node:test";
import assert from "node:assert/strict";
import {
  createAdvancedProbabilityProblems,
  createArcSectorProblems,
  createDistributionProblems,
  createProbabilityProblems,
  createRadianArcSectorProblems,
  createRadianProblems,
} from "../lib/foundation-generated-workouts.ts";
import {
  createConicMoveTangentProblems,
  createConicProblems,
  createPlaneVectorProblems,
  createProjectionProblems,
  createSpaceCoordinateProblems,
  createSpaceGeometryProjectionProblems,
  createVectorGeometryProblems,
} from "../lib/geometry-generated-workouts.ts";

const factories = [
  createRadianProblems,
  createArcSectorProblems,
  createDistributionProblems,
  createConicProblems,
  createConicMoveTangentProblems,
  createPlaneVectorProblems,
  createProjectionProblems,
  createVectorGeometryProblems,
  createSpaceCoordinateProblems,
  createSpaceGeometryProjectionProblems,
];

const combinedFactories = [createRadianArcSectorProblems, createProbabilityProblems, createAdvancedProbabilityProblems];

test("고정 객관식이 아닌 실제 새 문제 세트를 생성한다", () => {
  for (const createSet of factories) {
    const first = createSet(20260801);
    const second = createSet(20260802);
    const expectedLength = createSet === createSpaceGeometryProjectionProblems ? 9 : 7;
    assert.equal(first.length, expectedLength);
    assert.equal(second.length, expectedLength);
    assert.notDeepEqual(
      first.map(({ latex, correctLatex }) => [latex, correctLatex]),
      second.map(({ latex, correctLatex }) => [latex, correctLatex]),
    );
  }
});

test("통합 호도법과 필수·심화 확률 학습지는 정해진 유형을 새로 생성한다", () => {
  for (const createSet of combinedFactories) {
    const first = createSet(20260801);
    const second = createSet(20260802);
    const expectedLength = createSet === createProbabilityProblems
      ? 6
      : createSet === createAdvancedProbabilityProblems
        ? 2
        : 8;
    assert.equal(first.length, expectedLength);
    assert.equal(second.length, expectedLength);
    assert.notDeepEqual(
      first.map(({ latex, correctLatex }) => [latex, correctLatex]),
      second.map(({ latex, correctLatex }) => [latex, correctLatex]),
    );
  }
});

test("생성형 객관식은 정답 하나와 서로 다른 네 선택지를 유지한다", () => {
  for (const createSet of [...factories, ...combinedFactories]) {
    for (let seed = 1; seed <= 200; seed += 1) {
      for (const problem of createSet(seed)) {
        assert.equal(problem.choices.length, 4, `${createSet.name}:${seed}:${problem.id}`);
        assert.equal(problem.choices.filter(({ correct }) => correct).length, 1);
        assert.equal(new Set(problem.choices.map(({ latex }) => latex)).size, 4);
        assert.equal(problem.choices.find(({ correct }) => correct)?.latex, problem.correctLatex);
        for (const choice of problem.choices.filter(({ correct }) => !correct)) {
          assert.doesNotMatch(choice.latex, new RegExp(`^${problem.correctLatex.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\+[1-9]\\d*$`));
          assert.doesNotMatch(choice.latex, /\\text\{해 없음 \d+\}/);
        }
      }
    }
  }
});
