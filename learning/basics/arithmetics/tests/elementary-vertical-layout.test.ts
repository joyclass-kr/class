import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const css = fs.readFileSync(path.join(process.cwd(), "app/globals.css"), "utf8");

test("초등 공통 세로셈은 피연산자, 가로선, 답칸의 오른쪽 기준선을 맞춘다", () => {
  assert.match(css, /\.vertical-operation > strong\s*\{[\s\S]*?width:\s*92px;[\s\S]*?justify-self:\s*end;/);
  assert.match(css, /\.vertical-operation > span\s*\{[\s\S]*?grid-template-columns:\s*13px 92px;/);
  assert.match(css, /\.vertical-operation > b\s*\{[\s\S]*?width:\s*92px;[\s\S]*?justify-self:\s*end;/);
  assert.match(css, /\.vertical-input,[\s\S]*?width:\s*92px;[\s\S]*?justify-self:\s*end;/);
});

test("4학년 세로곱셈도 같은 자릿값 기준선 규칙을 사용한다", () => {
  assert.match(css, /\.grade-four-multiply-vertical-operation > strong\s*\{[\s\S]*?width:\s*134px;[\s\S]*?justify-self:\s*end;/);
  assert.match(css, /\.grade-four-multiply-vertical-operation > span\s*\{[\s\S]*?grid-template-columns:\s*14px 134px;/);
  assert.match(css, /\.grade-four-multiply-vertical-operation > b\s*\{[\s\S]*?width:\s*134px;[\s\S]*?justify-self:\s*end;/);
});
