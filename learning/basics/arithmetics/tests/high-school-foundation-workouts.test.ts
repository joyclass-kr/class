import test from "node:test";
import assert from "node:assert/strict";
import {
  radianProblems,
  arcSectorProblems,
  radianArcSectorProblems,
  probabilityProblems,
  advancedProbabilityProblems,
  distributionProblems,
} from "../lib/high-school-foundation-workouts.ts";

test("keeps foundational high-school workouts complete and unambiguous", () => {
  for (const problems of [radianProblems, arcSectorProblems, distributionProblems]) {
    assert.equal(problems.length, 7);
    for (const problem of problems) {
      assert.equal(problem.choices.length, 4);
      assert.equal(problem.choices.filter(({ correct }) => correct).length, 1);
      assert.equal(new Set(problem.choices.map(({ latex }) => latex)).size, 4);
      assert.match(problem.prompt ?? "", /\?$/, `${problem.id} needs an explicit question`);
    }
  }
  assert.equal(probabilityProblems.length, 6);
  assert.equal(advancedProbabilityProblems.length, 2);
  for (const problem of [...probabilityProblems, ...advancedProbabilityProblems]) {
    assert.equal(problem.choices.length, 4);
    assert.equal(problem.choices.filter(({ correct }) => correct).length, 1);
    assert.equal(new Set(problem.choices.map(({ latex }) => latex)).size, 4);
    assert.match(problem.prompt ?? "", /\?$/, `${problem.id} needs an explicit question`);
  }
  assert.ok(radianProblems.some(({ label }) => label === "육십분법을 호도법으로"));
  assert.ok(arcSectorProblems.some(({ label }) => label === "부채꼴의 넓이"));
  assert.ok(probabilityProblems.some(({ label }) => label === "조건부확률"));
  assert.ok(distributionProblems.some(({ label }) => label === "표준화"));
});

test("호도법과 부채꼴의 쉬운 계산은 한 장의 점진적 혼합 문제로 묶는다", () => {
  assert.equal(radianArcSectorProblems.length, 8);
  assert.deepEqual(
    radianArcSectorProblems.map(({ label }) => label),
    [
      "육십분법을 호도법으로",
      "호도법을 육십분법으로",
      "사분면",
      "일반각",
      "호의 길이",
      "부채꼴의 넓이",
      "중심각",
      "넓이와 호의 길이",
    ],
  );
});

test("확률분포와 통계 문제는 구할 대상을 수식에 명시한다", () => {
  const targets = [
    String.raw`E(X)=?`,
    String.raw`V(X)=?`,
    String.raw`E(X)=?`,
    String.raw`V(X)=?`,
    String.raw`Z=?`,
    String.raw`E(\overline X)=?`,
    String.raw`\sigma_{\overline X}=?`,
  ];

  distributionProblems.forEach((problem, index) => {
    assert.ok(problem.latex.includes(targets[index]));
  });
});
