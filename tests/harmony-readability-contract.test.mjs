import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const css = fs.readFileSync(
  path.join(root, "learning/arts/music-theory/harmony/harmony-course.css"),
  "utf8"
);
const baseCss = fs.readFileSync(
  path.join(root, "learning/arts/music-theory/harmony/course-v2.css"),
  "utf8"
);
const html = fs.readFileSync(
  path.join(root, "learning/arts/music-theory/harmony/index.html"),
  "utf8"
);

test("tablet lesson flow keeps explanation and notation in one reading column", () => {
  assert.ok(css.includes("grid-template-columns: minmax(0, 1fr);"));
  assert.ok(css.includes(".lesson-section:nth-child(even) .section-copy,"));
  assert.ok(css.includes("order: initial;"));
  assert.ok(css.includes("width: min(100%, 72ch);"));
});

test("notation receives textbook-scale width at the primary tablet sizes", () => {
  assert.ok(css.includes("width: min(1180px, calc(100% - 24px));"));
  assert.ok(css.includes("width: min(100%, 960px);"));
  assert.ok(css.includes(".score-svg {"));
  assert.ok(css.includes("height: auto;"));
});

test("body copy and controls remain readable and touchable", () => {
  assert.ok(baseCss.includes("font-size: 17px;"));
  assert.ok(baseCss.includes(".example-button { min-height: 44px;"));
  assert.ok(css.includes(".section-audio button {"));
  assert.ok(css.includes("min-height: 44px;"));
});

test("the page loads the readability revision", () => {
  assert.ok(html.includes("harmony-course.css?v=20260827-3"));
});

test("primary tablet notation widths remain materially larger than the old split column", () => {
  const clamp = (minimum, preferred, maximum) => Math.max(minimum, Math.min(preferred, maximum));
  const scoreWidth = (viewportWidth) => {
    const shell = Math.min(viewportWidth - (viewportWidth <= 900 ? 20 : 24), 1180);
    const sectionPadding = clamp(22, viewportWidth * 0.04, 40);
    const boardPadding = clamp(14, viewportWidth * 0.02, 22);
    return Math.min(shell - sectionPadding * 2 - boardPadding * 2, 960);
  };

  assert.ok(scoreWidth(1024) >= 875);
  assert.equal(scoreWidth(1180), 960);
  assert.ok(scoreWidth(768) >= 650);
});