import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const css = fs.readFileSync(path.join(process.cwd(), "app/globals.css"), "utf8");

test("초등 공통 세로셈은 피연산자, 가로선, 답칸의 오른쪽 기준선을 맞춘다", () => {
  assert.match(css, /\.vertical-operation > strong\s*\{[\s\S]*?width:\s*92px;[\s\S]*?justify-self:\s*end;/);
  assert.match(css, /\.vertical-operation > span\s*\{[\s\S]*?grid-template-columns:\s*13px 92px;/);
  assert.match(css, /\.vertical-operation > span strong\s*\{[\s\S]*?text-align:\s*right;/);
  assert.match(css, /\.vertical-operation > span strong\s*\{[\s\S]*?padding-right:\s*8px;/);
  assert.match(css, /\.vertical-operation > b\s*\{[\s\S]*?width:\s*92px;[\s\S]*?justify-self:\s*end;/);
  assert.match(css, /\.vertical-input,[\s\S]*?width:\s*92px;[\s\S]*?justify-self:\s*end;/);
  assert.match(css, /\.vertical-input,[\s\S]*?text-align:\s*right;/);
});

test("time and length unit calculations share one fixed alignment axis", () => {
  assert.match(css, /\.time-calculation-line\s*\{[\s\S]*?width:\s*var\(--time-calculation-width\);[\s\S]*?grid-template-columns:\s*24px var\(--time-calculation-value-width\);[\s\S]*?justify-self:\s*center;/);
  assert.match(css, /\.time-calculation-value\s*\{[\s\S]*?width:\s*var\(--time-calculation-value-width\);/);
  assert.match(css, /\.time-calculation-value strong\s*\{[\s\S]*?padding-right:\s*6px;/);
  assert.match(css, /\.time-calculation-rule\s*\{[\s\S]*?width:\s*var\(--time-calculation-value-width\);[\s\S]*?margin-left:\s*24px;/);
  assert.match(css, /\.time-calculation-input,[\s\S]*?width:\s*100%;[\s\S]*?box-sizing:\s*border-box;/);
  assert.match(css, /\.time-calculation-input,[\s\S]*?text-align:\s*right;/);
  assert.match(css, /\.length-operation-line\s*\{[\s\S]*?width:\s*195px;[\s\S]*?grid-template-columns:\s*22px 173px;[\s\S]*?justify-self:\s*center;/);
  assert.match(css, /\.length-operation-rule\s*\{[\s\S]*?width:\s*173px;[\s\S]*?margin-left:\s*22px;/);
  assert.match(css, /\.length-operation-value strong\s*\{[\s\S]*?padding-right:\s*6px;/);
  assert.match(css, /\.length-operation-input,[\s\S]*?text-align:\s*right;/);
});

test("single-digit blanks stay subordinate to the surrounding numerals", () => {
  assert.match(css, /\.digit-input,[\s\S]*?width:\s*38px;[\s\S]*?height:\s*40px;/);
  assert.match(css, /\.grade-four-fraction-whole-input\s*\{[\s\S]*?width:\s*38px;[\s\S]*?height:\s*40px;/);
  assert.match(css, /\.grade-five-fraction-one-whole-input\s*\{[\s\S]*?width:\s*36px;[\s\S]*?height:\s*40px;/);
});

test("4학년 세로곱셈도 같은 자릿값 기준선 규칙을 사용한다", () => {
  assert.match(css, /\.grade-four-multiply-question\.horizontal\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\);[^}]*place-items:\s*center;/);
  assert.match(css, /\.grade-four-multiply-question\.vertical\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\);[^}]*place-items:\s*center;/);
  assert.match(css, /\.grade-four-multiply-horizontal-expression\s*\{[\s\S]*?grid-template-columns:\s*max-content 18px max-content 18px 100px;[\s\S]*?font-size:\s*22px;/);
  assert.match(css, /\.grade-four-multiply-vertical-operation > strong\s*\{[\s\S]*?width:\s*108px;[\s\S]*?justify-self:\s*end;/);
  assert.match(css, /\.grade-four-multiply-vertical-operation > span\s*\{[\s\S]*?grid-template-columns:\s*12px 108px;/);
  assert.match(css, /\.grade-four-multiply-vertical-operation > span strong\s*\{[\s\S]*?padding-right:\s*8px;/);
  assert.match(css, /\.grade-four-multiply-vertical-operation > b\s*\{[\s\S]*?width:\s*108px;[\s\S]*?justify-self:\s*end;/);
  assert.match(css, /\.grade-four-multiply-input,\s*\.grade-four-multiply-static-answer\s*\{[^}]*height:\s*44px;[^}]*font-size:\s*24px;/);
  assert.match(css, /\.grade-four-multiply-input:focus\s*\{[^}]*box-shadow:\s*inset 0 0 0 3px/);
  assert.match(css, /\.grade-four-multiply-input,[\s\S]*?text-align:\s*right;/);
});
