import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const html = fs.readFileSync("learning/literacy-numeracy/proverbs/index.html", "utf8");
const app = fs.readFileSync("learning/literacy-numeracy/proverbs/app.js", "utf8");
const styles = fs.readFileSync("learning/literacy-numeracy/proverbs/styles.css", "utf8");

function curriculumCounts() {
  const dataContext = { window: {} };
  vm.runInNewContext(fs.readFileSync("learning/literacy-numeracy/proverbs/proverbs-data.js", "utf8"), dataContext);
  vm.runInNewContext(fs.readFileSync("learning/literacy-numeracy/proverbs/proverbs-essential-additions.js", "utf8"), dataContext);
  const lessonContext = {};
  vm.runInNewContext(app.slice(app.indexOf("const LESSONS ="), app.indexOf("let language")) + ";globalThis.lessons=LESSONS", lessonContext);
  return Object.fromEntries(["ko", "en"].map((language) => {
    const lessons = lessonContext.lessons[language];
    const counts = Array(lessons.length).fill(0);
    for (const item of dataContext.window.PROVERB_BANKS[language]) {
      const text = item.proverb + " " + item.meaning;
      const found = lessons.findIndex((lesson) => lesson[2].test(text));
      counts[found < 0 ? lessons.length - 1 : found] += 1;
    }
    return [language, counts];
  }));
}

test("속담은 고정 개수가 아닌 내용별 차시 학습으로 진행된다", () => {
  for (const id of ["lessonOverview", "lessonList", "completionSummary", "learningShell", "backToLessons", "currentLessonTitle"]) assert.match(html, new RegExp(`id="${id}"`));
  assert.match(app, /말의 힘과 소통/);
  assert.match(app, /Hope and possibility/);
  assert.doesNotMatch(app, /BATCH_SIZE|다음 5개|5개 학습|세상살이의 지혜/);
  const counts = curriculumCounts();
  assert.equal(counts.ko.length, 16);
  assert.equal(counts.en.length, 9);
  assert.equal(counts.ko.reduce((sum, count) => sum + count, 0), 111);
  assert.equal(counts.en.reduce((sum, count) => sum + count, 0), 50);
  assert.ok(counts.ko.every((count) => count > 0 && count <= 11), counts.ko.join(","));
  assert.ok(counts.en.every((count) => count > 0 && count <= 9), counts.en.join(","));
  assert.match(styles, /\.lesson-item/);
});
