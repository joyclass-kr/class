import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../app/components/elementary-focus-scroll.tsx", import.meta.url), "utf8");
const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");

test("초등 문제지 입력칸은 아래 문제를 보여 주도록 공통 자동 스크롤을 쓴다", () => {
  assert.match(source, /\.worksheet-stage \.counting-sheet/);
  assert.match(source, /\^\[1-6\]학년\$/);
  assert.match(source, /document\.addEventListener\("focusin", revealFollowingProblems\)/);
  assert.match(source, /window\.matchMedia\("\(pointer: coarse\)"\)\.matches/);
  assert.match(source, /isTouch\) return \{ safeLine: 0\.68, targetLine: 0\.44 \}/);
  assert.match(source, /viewportHeight < 760\) return \{ safeLine: 0\.7, targetLine: 0\.48 \}/);
  assert.match(source, /return \{ safeLine: 0\.78, targetLine: 0\.56 \}/);
  assert.match(source, /window\.visualViewport\?\.height \?\? window\.innerHeight/);
  assert.match(source, /lowerSafeLine = viewportHeight \* guide\.safeLine/);
  assert.match(source, /targetLine = viewportHeight \* guide\.targetLine/);
  assert.match(source, /window\.scrollBy\(\{ top: rect\.top - targetLine, left: 0, behavior: "auto" \}\)/);
  assert.match(layout, /<ElementaryFocusScroll \/>/);
});

test("답지와 중·고등 학습지는 자동 스크롤 대상이 아니다", () => {
  assert.doesNotMatch(source, /\.answer-stage/);
  assert.match(source, /ELEMENTARY_GRADE\.test\(grade\)/);
});
