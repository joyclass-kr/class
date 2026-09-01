import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";

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
const courseSource = fs.readFileSync(
  path.join(root, "learning/arts/music-theory/harmony/harmony-course.js"),
  "utf8"
);

const curriculumSource = fs.readFileSync(
  path.join(root, "learning/arts/music-theory/harmony/harmony-curriculum.js"),
  "utf8"
);
const traditionalSource = fs.readFileSync(
  path.join(root, "learning/arts/music-theory/harmony/harmony-traditional-extension.js"),
  "utf8"
);
const context = { window: {} };
vm.createContext(context);
vm.runInContext(curriculumSource, context);
vm.runInContext(traditionalSource, context);
const skills = Object.values(context.window.HarmonyCurriculum.skills);

test("tablet lesson flow shows the visual before detailed solving", () => {
  assert.ok(css.includes('"lead visual"'));
  assert.ok(css.includes('"detail visual"'));
  assert.ok(css.includes('"lead"'));
  assert.ok(css.includes('"visual"'));
  assert.ok(css.includes('"detail"'));
  assert.ok(css.includes("width: min(100%, 72ch);"));
  assert.match(courseSource, /section-lead[\s\S]*?visual-board lesson-visual[\s\S]*?section-detail/, "notation must precede the worked example and misconception detail");
  assert.match(courseSource, /skillPreviewMarkup\(skill\)/, "the progress screen must visibly preview each learning item");
});

test("notation receives a legible width at the primary tablet sizes", () => {
  assert.ok(css.includes("width: min(1180px, calc(100% - 24px));"));
  assert.ok(css.includes("width: min(100%, 840px);"));
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
  assert.ok(html.includes("harmony-course.css?v=20260901-9"));
  assert.ok(html.includes("harmony-course.js?v=20260901-10"));
  assert.ok(html.includes("harmony-traditional-extension.js?v=20260901-7"));
});

test("every progress card exposes its lesson order", () => {
  assert.ok(courseSource.includes('class="lesson-order"'));
  assert.ok(courseSource.includes("lessonNumber+'차시"));
  assert.ok(css.includes(".lesson-order"));
});

test("browser back returns from a lesson to the progress list", () => {
  assert.ok(courseSource.includes('window.history.pushState(stateValue, "", skillUrl(id))'));
  assert.ok(courseSource.includes('window.addEventListener("popstate"'));
  assert.ok(courseSource.includes('else showDashboard()'));
  assert.ok(courseSource.includes('els.backToCourse.addEventListener("click", returnToDashboard)'));
});

test("primary tablet notation stays legible in landscape and portrait", () => {
  const clamp = (minimum, preferred, maximum) => Math.max(minimum, Math.min(preferred, maximum));
  const scoreWidth = (viewportWidth) => {
    const shell = Math.min(viewportWidth - (viewportWidth <= 900 ? 20 : 24), 1180);
    const sectionPadding = clamp(22, viewportWidth * 0.04, 40);
    const boardPadding = clamp(14, viewportWidth * 0.02, 22);
    const content = shell - sectionPadding * 2;
    const visualColumn = viewportWidth <= 900 ? content : (content - 18) * .64;
    return Math.min(visualColumn - boardPadding * 2, 840);
  };

  assert.ok(scoreWidth(1024) >= 520);
  assert.ok(scoreWidth(1180) >= 600);
  assert.ok(scoreWidth(768) >= 650);
});
test("lesson copy remains scannable and every section supports seeing and hearing", () => {
  const sections = skills.flatMap((skill) => skill.sections);
  const paragraphs = sections.flatMap((section) => section.body);
  assert.ok(paragraphs.every((paragraph) => paragraph.length <= 120));
  assert.ok(sections.every((section) => section.visual));
  assert.ok(sections.every((section) => section.audioOptions.length >= 2));
});

test("core text colors meet the normal-text contrast threshold", () => {
  const channel = (value) => {
    const normalized = value / 255;
    return normalized <= 0.04045 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
  };
  const luminance = (hex) => {
    const values = [0, 2, 4].map((start) => Number.parseInt(hex.slice(start, start + 2), 16));
    return values.map(channel).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
  };
  const contrast = (foreground, background) => {
    const values = [luminance(foreground), luminance(background)];
    return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05);
  };
  const pairs = [
    ["303842", "f4f1e8"],
    ["4d5661", "f4f1e8"],
    ["4e3d20", "eee7da"],
    ["f6f3ea", "0d1523"],
    ["aebbd0", "0d1523"]
  ];
  assert.ok(pairs.every(([foreground, background]) => contrast(foreground, background) >= 4.5));
});
