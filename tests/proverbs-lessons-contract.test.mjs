import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const html = fs.readFileSync("learning/basics/proverbs/index.html", "utf8");
const app = fs.readFileSync("learning/basics/proverbs/app.js", "utf8");
const styles = fs.readFileSync("learning/basics/proverbs/styles.css", "utf8");

test("속담은 고정 5개가 아닌 내용별 차시 학습으로 진행된다", () => {
  for (const id of ["lessonOverview", "lessonList", "completionSummary", "learningShell", "backToLessons", "currentLessonTitle"]) assert.match(html, new RegExp(`id="${id}"`));
  assert.match(app, /const LESSONS =/);
  assert.match(app, /말과 소통/);
  assert.match(app, /Effort and growth/);
  assert.match(app, /lessonFor/);
  assert.match(app, /completed/);
  assert.doesNotMatch(app, /BATCH_SIZE|다음 5개|5개 학습/);
  assert.match(styles, /\.lesson-item/);
  assert.match(styles, /min-height:82px/);
});
