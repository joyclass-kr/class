import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const css = fs.readFileSync(
  path.join(process.cwd(), "app/arithmetic/high-school/high-school.css"),
  "utf8",
);
const globalCss = fs.readFileSync(
  path.join(process.cwd(), "app/globals.css"),
  "utf8",
);
const middleCss = fs.readFileSync(
  path.join(process.cwd(), "app/arithmetic/middle-school/middle-school.css"),
  "utf8",
);
const typographyCss = fs.readFileSync(
  path.join(process.cwd(), "app/arithmetic/worksheet-typography.css"),
  "utf8",
);
const highLayout = fs.readFileSync(
  path.join(process.cwd(), "app/arithmetic/high-school/layout.tsx"),
  "utf8",
);
const middleLayout = fs.readFileSync(
  path.join(process.cwd(), "app/arithmetic/middle-school/layout.tsx"),
  "utf8",
);
const inlineMathText = fs.readFileSync(
  path.join(process.cwd(), "app/components/inline-math-text.tsx"),
  "utf8",
);
const middleCorePage = fs.readFileSync(
  path.join(process.cwd(), "app/arithmetic/middle-school/core-calculations/page.tsx"),
  "utf8",
);

test("middle-school worksheets use the same split Korean and math typography as high school", () => {
  assert.match(highLayout, /import "\.\.\/worksheet-typography\.css"/);
  assert.match(middleLayout, /import "\.\/middle-school\.css"/);
  assert.match(middleLayout, /import "\.\.\/worksheet-typography\.css"/);
  assert.match(middleLayout, /className="middle-school-scope"/);
  assert.match(typographyCss, /--worksheet-korean-font:\s*"KoPubWorld Batang"/);
  assert.match(typographyCss, /--worksheet-math-font:\s*"Suneung Math"/);
  assert.match(typographyCss, /--high-school-korean-font:\s*var\(--worksheet-korean-font\)/);
  assert.match(typographyCss, /--high-school-math-font:\s*var\(--worksheet-math-font\)/);
  assert.match(middleCss, /\.middle-school-scope \.polynomial-page\s*\{[\s\S]*?font-family:\s*var\(--high-school-korean-font\)/);
  assert.match(typographyCss, /input,[\s\S]*?font-family:\s*var\(--worksheet-math-font\)/);
});

test("고등 학습지는 공통 글자 크기 토큰을 사용한다", () => {
  for (const token of [
    "--high-school-title-size",
    "--high-school-subject-size",
    "--high-school-prompt-size",
    "--high-school-math-size",
    "--high-school-label-size",
  ]) {
    assert.match(css, new RegExp(token));
  }
  assert.match(css, /font-size:\s*var\(--high-school-math-size\)\s*!important/);
  assert.match(css, /--high-school-title-size:\s*23px/);
});

test("긴 제목과 수식 중심 문항은 어색하게 줄바꿈하지 않는다", () => {
  assert.match(css, /\.counting-sheet-title > strong\s*\{[\s\S]*?white-space:\s*nowrap/);
  assert.match(css, /\.formula-only-page \.worksheet-stage \.polynomial-question-body,[\s\S]*?max-width:\s*100%/);
  assert.match(css, /\.geometry-choice-expression \.katex-display[\s\S]*?text-align:\s*left/);
});

test("한글 소제목과 문제 문장은 교재용 한글 글꼴을 사용하고 수식은 수학 글꼴을 사용한다", () => {
  assert.match(typographyCss, /\.polynomial-focus-label,[\s\S]*?\.geometry-choice-prompt,[\s\S]*?font-family:\s*var\(--worksheet-korean-font\)/);
  assert.match(typographyCss, /\.polynomial-question-body,[\s\S]*?\.worksheet-stage \.polynomial-focus-label,[\s\S]*?font-family:\s*var\(--worksheet-korean-font\)/);
  assert.match(typographyCss, /\.math-formula,[\s\S]*?\.geometry-choice-expression,[\s\S]*?font-family:\s*var\(--worksheet-math-font\)/);
});

test("KaTeX 수식 안의 한글도 본문과 같은 교재용 한글 글꼴을 사용한다", () => {
  assert.match(typographyCss, /\.katex \.hangul_fallback,[\s\S]*?font-family:\s*var\(--worksheet-korean-font\)/);
  assert.match(typographyCss, /\.katex \.mathnormal,[\s\S]*?font-family:\s*"KaTeX_Math"/);
  assert.match(typographyCss, /\.katex \.mathrm,[\s\S]*?font-family:\s*"KaTeX_Main"/);
});

test("중등·고등·이공계 기초 문제 칸은 점선 대신 얇은 실선으로 구분한다", () => {
  assert.match(typographyCss, /\.polynomial-page \.polynomial-question,[\s\S]*?border-bottom:\s*0;[\s\S]*?font-family:\s*var\(--worksheet-korean-font\)/);
  assert.match(typographyCss, /\.trig-derivative-answer-panel \.trig-derivative-answer-item[\s\S]*?border-bottom:\s*0/);
  assert.doesNotMatch(typographyCss, /border-bottom:\s*1px dashed/);
  assert.match(globalCss, /\.polynomial-question\s*\{[\s\S]*?border-bottom:\s*0/);
  assert.match(css, /\.trig-derivative-answer-item\s*\{[\s\S]*?border-bottom:\s*0/);
});

test("다항식 복합 연산은 전체 폭을 사용하고 긴 식을 한 줄로 유지한다", () => {
  assert.match(css, /\.polynomial-page\.polynomial-drill-page \.worksheet-stage \.polynomial-question-body[\s\S]*?max-width:\s*100%/);
  assert.match(css, /\.polynomial-page\.polynomial-drill-page \.worksheet-stage \.polynomial-expression[\s\S]*?flex-wrap:\s*nowrap;[\s\S]*?white-space:\s*nowrap/);
});

test("질문 속 인라인 수식은 한글 본문보다 작아 보이지 않는다", () => {
  assert.match(css, /\.geometry-choice-prompt \.math-formula,[\s\S]*?font-size:\s*1\.18em/);
  assert.match(css, /\.geometry-choice-prompt \.math-formula \.katex,[\s\S]*?font-size:\s*1em/);
  assert.match(inlineMathText, /latex=\{part\.slice\(1, -1\)\}\s+displayStyle/);
});

test("일반 고등 연산 문제에는 줄 없는 계산 여백이 있다", () => {
  assert.match(css, /max-width:\s*46%/);
  assert.doesNotMatch(
    css,
    /\.polynomial-page \.worksheet-stage \.polynomial-question::after\s*\{/,
  );
  assert.doesNotMatch(css, /repeating-linear-gradient/);
});

test("서술형과 도형형 문제는 전체 폭 예외를 둔다", () => {
  for (const pageClass of [
    "combinatorics-page",
    "logic-page",
    "coordinate-page",
    "circle-page",
  ]) {
    assert.match(css, new RegExp(`polynomial-page\\.${pageClass}`));
  }
});

test("도형형 문제의 번호와 본문은 겹치지 않는다", () => {
  assert.match(
    css,
    /\.polynomial-page \.worksheet-stage \.geometry-choice-question\s*\{[^}]*padding-left:\s*42px;/s,
  );
});

test("7문제와 오답 보충 문제도 모든 행의 높이가 같다", () => {
  for (const count of [7, 8, 9]) {
    assert.match(
      css,
      new RegExp(`\\.polynomial-sheet-${count} \\.polynomial-problem-grid\\s*\\{\\s*grid-template-rows:\\s*repeat\\(${count},\\s*minmax\\(0,\\s*1fr\\)\\)`),
    );
  }
});

test("print answer sheets keep long secondary answers inside their A4 rows", () => {
  assert.match(middleCorePage, /middle-core-page/);
  assert.match(
    middleCss,
    /\.middle-core-page \.answer-stage \.logarithm-question \.polynomial-question-body\s*\{[\s\S]*?grid-template-columns:/,
  );
  assert.match(
    css,
    /\.answer-stage \.geometry-choice-question \.polynomial-question-body\s*\{[\s\S]*?grid-template-columns:/,
  );
  assert.match(
    css,
    /\.inequality-page \.answer-stage \.inequality-question\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\)\s*!important/,
  );
  assert.match(
    css,
    /\.stem-foundation-page \.answer-stage \.geometry-choice-expression\s*\{[\s\S]*?font-size:\s*13px\s*!important/,
  );
});
