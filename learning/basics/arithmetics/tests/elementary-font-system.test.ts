import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const css = fs.readFileSync(path.join(process.cwd(), "app/globals.css"), "utf8");

test("elementary worksheets use the shared Korean and math font stacks", () => {
  assert.match(css, /\.counting-sheet\s*\{[\s\S]*?--elementary-korean-font:[\s\S]*?KoPubWorld Batang[\s\S]*?--elementary-math-font:[\s\S]*?Suneung Math/);
  assert.match(css, /\.counting-sheet > :not\(\.counting-sheet-header\)\s*\{[\s\S]*?font-family:\s*var\(--elementary-math-font\);[\s\S]*?font-synthesis:\s*none;/);
  assert.match(css, /\.counting-sheet-title strong\s*\{[\s\S]*?font-family:\s*var\(--elementary-korean-font\);/);
});

test("Latin measurement units use the math font without synthetic bolding", () => {
  assert.match(css, /\.counting-sheet :where\([\s\S]*?\.measurement-quantity span,[\s\S]*?\.time-conversion-unit,[\s\S]*?\.unit-conversion-value small,[\s\S]*?font-family:\s*var\(--elementary-math-font\);[\s\S]*?font-synthesis:\s*none;[\s\S]*?font-weight:\s*400;/);
  assert.match(css, /\.measurement-quantity span,[\s\S]*?font-size:\s*15px;[\s\S]*?font-weight:\s*400;/);
});

test("dense 100-item worksheets retain their compact type sizes", () => {
  assert.match(css, /\.multiplication-five-question\s*\{[\s\S]*?font-size:\s*17px;/);
  assert.match(css, /\.multiplication-five-input,[\s\S]*?font-size:\s*17px;/);
  assert.match(css, /\.prime-number-value\s*\{[\s\S]*?font-size:\s*18px;/);
});

test("dense division uses spare vertical space without separator clutter", () => {
  assert.match(css, /\.division-three-question\s*\{[\s\S]*?border-bottom:\s*0;[\s\S]*?font-size:\s*16px;/);
  assert.match(css, /\.division-three-input,[\s\S]*?height:\s*27px;[\s\S]*?font-size:\s*16px;/);
  assert.match(css, /\.division-three-column\s*\{[\s\S]*?border-right:\s*0;/);
});
