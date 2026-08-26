import assert from "node:assert/strict";
import test from "node:test";

import {
  createQuadraticFunctionRelationProblems,
  createQuadraticRootRelationProblems,
  createSimultaneousQuadraticProblems,
  quadraticFunctionRelationProblems,
  quadraticRootRelationProblems,
  simultaneousQuadraticProblems,
} from "../lib/quadratic-foundation-workouts.ts";

const factories = [
  createQuadraticRootRelationProblems,
  createQuadraticFunctionRelationProblems,
  createSimultaneousQuadraticProblems,
];

test("이차방정식 핵심은 쉬운 도입부터 종합 계산까지 세 장으로 분리한다", () => {
  assert.deepEqual(
    [
      quadraticRootRelationProblems.length,
      quadraticFunctionRelationProblems.length,
      simultaneousQuadraticProblems.length,
    ],
    [8, 8, 7],
  );
  for (const problems of [
    quadraticRootRelationProblems,
    quadraticFunctionRelationProblems,
    simultaneousQuadraticProblems,
  ]) {
    assert.equal(new Set(problems.map(({ kind }) => kind)).size, problems.length);
  }
});

test("모든 이차방정식 생성 문제는 서로 다른 선택지 네 개와 정답 하나를 갖는다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    for (const createProblems of factories) {
      for (const problem of createProblems(seed)) {
        assert.match(problem.prompt ?? "", /\?$/);
        assert.equal(problem.choices.length, 4);
        assert.equal(problem.choices.filter(({ correct }) => correct).length, 1);
        assert.equal(new Set(problem.choices.map(({ latex }) => latex)).size, 4);
        assert.ok(problem.choices.some(({ correct, latex }) => correct && latex === problem.correctLatex));
      }
    }
  }
});

test("이차방정식 식에는 문자 계수 1이나 깨진 부호를 표기하지 않는다", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const text = factories
      .flatMap((createProblems) => createProblems(seed))
      .flatMap(({ latex, correctLatex, choices }) => [
        latex,
        correctLatex,
        ...choices.map(({ latex: choice }) => choice),
      ])
      .join(" ");
    assert.doesNotMatch(text, /(?:^|[=+(\-])1x/);
    assert.doesNotMatch(text, /NaN|undefined|\+\-|\-\-/);
  }
});

test("같은 시드는 이차방정식 세 문제지를 그대로 재현한다", () => {
  for (const createProblems of factories) {
    assert.deepEqual(createProblems(77), createProblems(77));
  }
});
