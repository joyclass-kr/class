import assert from "node:assert/strict";
import test from "node:test";

import {
  createStemFoundationProblems,
  STEM_BRIDGE_KINDS,
  STEM_FOUNDATION_KINDS,
} from "../lib/stem-foundation-workouts.ts";

test("기존 주소를 위한 이공계 확장 문제은행 18종은 각각 8문제를 유지한다", () => {
  assert.equal(STEM_FOUNDATION_KINDS.length, 18);

  for (const kind of STEM_FOUNDATION_KINDS) {
    for (let seed = 1; seed <= 200; seed += 1) {
      const problems = createStemFoundationProblems(kind, seed);
      assert.equal(problems.length, 8, kind);
      assert.equal(
        new Set(problems.map(({ latex, correctLatex }) => `${latex}|${correctLatex}`)).size,
        8,
        `${kind}: 같은 문제가 한 장에서 반복됨`,
      );

      for (const problem of problems) {
        assert.equal(problem.choices.length, 4, problem.id);
        assert.equal(
          new Set(problem.choices.map(({ latex }) => latex)).size,
          4,
          `${problem.id}: 선택지 중복`,
        );
        assert.equal(
          problem.choices.filter(({ correct }) => correct).length,
          1,
          `${problem.id}: 정답 개수`,
        );
        assert.equal(
          problem.choices.find(({ correct }) => correct)?.latex,
          problem.correctLatex,
          `${problem.id}: 정답 불일치`,
        );
      }
    }
  }
});

test("이공계 확장 문제은행은 새 문제 버튼으로 실제 식이나 수가 바뀐다", () => {
  for (const kind of STEM_FOUNDATION_KINDS) {
    assert.notDeepEqual(
      createStemFoundationProblems(kind, 1),
      createStemFoundationProblems(kind, 2),
      kind,
    );
  }
});

test("공대 진학 전 6장에는 고등학교 반복과 대학 전공 심화 유형을 섞지 않는다", () => {
  const labels = STEM_BRIDGE_KINDS.flatMap((kind) => (
    createStemFoundationProblems(kind, 20260910).map(({ label }) => label)
  ));
  for (const excludedType of [
    "크래머",
    "최소제곱",
    "대각화",
    "삼중적분",
    "라플라스",
    "푸리에",
    "수치해석",
  ]) {
    assert.ok(!labels.some((label) => label.includes(excludedType)), excludedType);
  }
});

test("각 이공계 학습지는 기본 2·응용 3·고난도 3문제로 진행한다", () => {
  for (const kind of STEM_FOUNDATION_KINDS) {
    const problems = createStemFoundationProblems(kind, 20260910);
    assert.deepEqual(
      problems.reduce<Record<string, number>>((counts, problem) => {
        counts[problem.difficulty ?? "missing"] = (counts[problem.difficulty ?? "missing"] ?? 0) + 1;
        return counts;
      }, {}),
      { basic: 2, application: 3, advanced: 3 },
      kind,
    );
  }
});

test("공식 이름만 고르는 문항 대신 실제 계산 자료를 제시한다", () => {
  const labels = STEM_FOUNDATION_KINDS.flatMap((kind) => (
    createStemFoundationProblems(kind, 20260910).map(({ label }) => label)
  ));
  for (const removedRecallLabel of [
    "정규방정식",
    "직교행렬",
    "대각화",
    "그린 정리",
    "스토크스 정리",
    "발산정리",
    "이동정리",
    "계단함수",
    "뉴턴 방법",
    "오일러 방법",
    "오차 차수",
  ]) {
    assert.ok(!labels.includes(removedRecallLabel), removedRecallLabel);
  }
});

test("144문항 모두 무엇을 구할지 질문에 명시한다", () => {
  const prompts = STEM_FOUNDATION_KINDS.flatMap((kind) => (
    createStemFoundationProblems(kind, 20260910).map(({ prompt }) => prompt)
  ));
  assert.equal(prompts.length, 144);
  assert.ok(prompts.every((prompt) => typeof prompt === "string" && prompt.length >= 10));
  assert.ok(prompts.every((prompt) => !prompt.includes("값이나 식")));
  assert.ok(prompts.every((prompt) => /구하세요|나타내세요|판정하세요|쓰세요/.test(prompt)));
});

test("이공계 질문의 수학 기호는 모두 수식 구간 안에서 표준 표기로 렌더링한다", () => {
  const prompts = STEM_FOUNDATION_KINDS.flatMap((kind) => (
    createStemFoundationProblems(kind, 20260910).map(({ prompt }) => prompt)
  ));
  for (const prompt of prompts) {
    const delimiters = prompt.match(/\$/g) ?? [];
    assert.equal(delimiters.length % 2, 0, prompt);
    const proseOnly = prompt.replace(/\$[^$]+\$/g, "");
    assert.doesNotMatch(proseOnly, /[A-Za-zλμκφω∇|]/, prompt);
  }
  assert.equal(
    createStemFoundationProblems("orthogonality-least-squares", 20260910)[6]?.prompt,
    "$A^{T}A$와 $A^{T}b$를 구하세요.",
  );
});

test("2계 미분방정식은 일반해·초기값해·특수해·론스키안을 구분한다", () => {
  const prompts = createStemFoundationProblems("second-order-ode", 20260910)
    .map(({ prompt }) => prompt);
  assert.deepEqual(prompts, [
    "특성방정식을 이용해 일반해 $y(x)$를 구하세요.",
    "중근을 이용해 일반해 $y(x)$를 구하세요.",
    "복소근을 이용해 일반해 $y(x)$를 구하세요.",
    "초기조건을 만족하는 해 $y(x)$를 구하세요.",
    "미정계수법으로 특수해 $y_p$를 구하세요.",
    "공진을 고려한 특수해 $y_p$를 구하세요.",
    "코시–오일러 방정식의 일반해 $y(x)$를 구하세요.",
    "두 해의 론스키안 $W(y_1,y_2)$를 구하세요.",
  ]);
});

test("통합 행렬 입문은 행렬식과 역행렬까지 한 장에서 훈련한다", () => {
  const problems = createStemFoundationProblems("matrix-systems", 20260910);
  assert.deepEqual(
    problems.map(({ label }) => label),
    [
      "전치행렬 포함 복합연산",
      "교환자 계산",
      "3×3 행렬식",
      "3×3 역행렬",
      "3원 연립방정식",
      "확대행렬의 기약행사다리꼴",
      "매개변수에 따른 해의 개수",
      "여러 우변의 동시 풀이",
    ],
  );
  for (const removedElementaryLabel of [
    "행렬의 덧셈",
    "행렬의 곱",
    "행렬과 벡터",
    "연립방정식",
    "기본 행연산",
  ]) {
    assert.ok(!problems.some(({ label }) => label === removedElementaryLabel));
  }
});

test("이공계 기초 새 문제는 유형 순서를 유지하면서 대부분의 식과 해를 실제로 바꾼다", () => {
  for (const kind of STEM_BRIDGE_KINDS) {
    const first = createStemFoundationProblems(kind, 1001);
    const second = createStemFoundationProblems(kind, 2002);

    assert.deepEqual(first.map(({ label }) => label), second.map(({ label }) => label), kind);
    assert.ok(
      first.filter((problem, index) => problem.latex !== second[index].latex).length >= 6,
      kind,
    );
    assert.ok([...first, ...second].every(({ latex }) => !/--|\+\-/.test(latex)), kind);
  }
});
