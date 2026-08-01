import assert from "node:assert/strict";
import test from "node:test";

import { arithmeticWorksheetCatalog } from "../lib/arithmetic-worksheets.ts";
import { readFileSync } from "node:fs";

test("초1 학습지는 실제 유형명을 쓰고 암산 표시를 붙이지 않는다", () => {
  const gradeOne = arithmeticWorksheetCatalog.filter(({ grade }) => grade === "초1");
  assert.deepEqual(gradeOne.map(({ title }) => title), [
    "1부터 9까지 수 세기",
    "한 자리 수 덧셈·뺄셈",
    "두 자리 수 덧셈·뺄셈",
    "주고받은 뒤의 수 구하기",
    "10 모으기·가르기",
    "10을 넘는 덧셈·뺄셈",
    "덧셈·뺄셈 빈칸 채우기",
    "두 자리 수 읽기",
    "뛰어 세기",
  ]);
  assert.equal(gradeOne.some(({ badge }) => badge === "암산"), false);
});

test("암산 표시는 3학년 이상 가로셈 학습지에만 붙인다", () => {
  const elementary = arithmeticWorksheetCatalog.filter(({ grade }) => /^초[1-6]$/.test(grade));
  assert.equal(elementary.filter(({ grade }) => grade === "초2").some(({ badge }) => badge === "암산"), false);
  assert.equal(elementary.filter(({ badge }) => badge === "암산").every(({ grade }) => Number(grade.slice(1)) >= 3), true);
  assert.deepEqual(
    elementary.filter(({ grade, badge }) => grade === "초3" && badge === "암산").map(({ name }) => name),
    ["3덧셈뺄셈빈칸", "3보수뺄셈100", "3보수뺄셈1000", "3덧셈뺄셈②", "3곱셈②", "3곱셈③", "19단", "제곱수", "3나눗셈②", "3나눗셈③"],
  );
});

test("초등 문제지 제목은 중·고등 문제지와 같은 23px 제목 규격을 쓴다", () => {
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.counting-sheet-title strong\s*\{[\s\S]*?font-size:\s*23px;/);
  assert.match(css, /\.counting-sheet-title strong\s*\{[\s\S]*?line-height:\s*1\.2;/);
  assert.match(css, /\.counting-sheet-title strong\s*\{[\s\S]*?font-family:\s*var\(--elementary-korean-font\);/);
});

test("목록의 모든 암산 학습지는 실제 문제지 제목에도 암산 딱지를 표시한다", () => {
  const mentalWorksheets = arithmeticWorksheetCatalog.filter(({ badge }) => badge === "암산");
  assert.ok(mentalWorksheets.length > 0);
  for (const worksheet of mentalWorksheets) {
    assert.ok(worksheet.route);
    const directory = worksheet.route!.replace("/arithmetic/", "");
    const source = readFileSync(new URL(`../app/arithmetic/${directory}/page.tsx`, import.meta.url), "utf8");
    assert.match(source, /className="a4-sheet counting-sheet mental-math-sheet /, worksheet.route!);
  }
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.mental-math-sheet \.counting-sheet-title::after\s*\{[\s\S]*?content:\s*"암산";/);
  assert.match(css, /\.mental-math-sheet :where\([\s\S]*?\.multiplication-question,[\s\S]*?\.digit-equation,[\s\S]*?\.complement-row,[\s\S]*?input,[\s\S]*?button[\s\S]*?\)\s*\{[\s\S]*?font-family:\s*"Suneung Math", "STIX Two Math"[\s\S]*?font-synthesis:\s*none;[\s\S]*?font-weight:\s*400;/);
});

test("초등 목록 버튼과 실제 학습지 제목은 같은 유형명을 쓴다", () => {
  for (const worksheet of arithmeticWorksheetCatalog) {
    if (!worksheet.route?.startsWith("/arithmetic/") || worksheet.route.includes("?")) continue;
    const directory = worksheet.route.replace("/arithmetic/", "");
    const source = readFileSync(new URL(`../app/arithmetic/${directory}/page.tsx`, import.meta.url), "utf8");
    const literalTitle = source.match(/<strong>([^<{]+)\{answerSheet \?/u)?.[1];
    if (literalTitle) assert.equal(literalTitle, worksheet.title, worksheet.route);
  }
});

test("가로 계산식은 작은 글씨로 왼쪽 정렬하고 불필요한 안내띠를 표시하지 않는다", () => {
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.mixed-calculation-expression\s*\{[\s\S]*?font-size:\s*20px;/);
  assert.match(css, /\.mixed-calculation-expression strong\s*\{[\s\S]*?text-align:\s*left;/);

  const pages = [
    "grade-4-angle-estimation", "grade-4-fraction", "grade-5-decimals",
    "grade-5-divisors-multiples", "grade-5-fraction-1", "grade-5-fraction-2",
    "grade-5-fraction-3", "grade-5-mixed-calculation", "grade-5-prime-numbers",
    "grade-6-decimals-1", "grade-6-fraction", "grade-6-mixed-calculation",
    "grade-6-proportion",
  ];
  for (const page of pages) {
    const source = readFileSync(new URL(`../app/arithmetic/${page}/page.tsx`, import.meta.url), "utf8");
    assert.doesNotMatch(source, /<p className="[^"]*guide/);
  }

  const decomposition = readFileSync(new URL("../app/arithmetic/grade-5-natural-number-decomposition/page.tsx", import.meta.url), "utf8");
  assert.match(decomposition, /곱셈은 \*로 입력하세요\./);
  assert.match(decomposition, /answerSheet \|\| isExample/);
  assert.match(decomposition, /problems\.slice\(1\)\.map/);
  assert.match(decomposition, /<small>\/14 정답<\/small>/);
});

test("주고받기 문제는 동물 친구 이름과 어린이 눈높이 표현을 쓴다", () => {
  const source = readFileSync(new URL("../app/arithmetic/give-and-take-1/page.tsx", import.meta.url), "utf8");
  assert.match(source, /const FRIENDS: Friend\[\] = \["토끼", "거북이", "호랑이"\]/);
  assert.match(source, /세 친구가 가지고 있는 카드는 각각 몇 장입니까\?/);
  assert.doesNotMatch(source, /지혜|슬기|용기|세 사람이/);
});
