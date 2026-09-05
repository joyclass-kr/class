import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

async function loadCurriculum() {
  const source = await readFile(new URL("../public/phonics/curriculum.js", import.meta.url), "utf8");
  const context = vm.createContext({ window: {} });
  vm.runInContext(source, context);
  return context.window.PHONICS_CURRICULUM;
}

test("all lessons use unique pictured targets and an honest question count", async () => {
  const data = await loadCurriculum();
  assert.equal(data.lessons.length, 128);

  for (const lesson of data.lessons) {
    const pictured = lesson.words.filter((word) => data.wordBank[word]?.picture);
    assert.ok(pictured.length > 0, `${lesson.id} has no pictured target words`);
    const uniqueTargets = [...new Set(pictured)];
    assert.equal(lesson.questionCount, Math.min(8, uniqueTargets.length), `${lesson.id} has a misleading question count`);
    assert.ok(lesson.questionCount > 0, `${lesson.id} has no playable targets`);
    if (lesson.sourceTitle !== "VC/CVC 합성") assert.equal(lesson.questionCount, 8, `${lesson.id} needs eight unique targets`);
  }
});

test("the published UFLI sequence and child-facing activity metadata stay aligned", async () => {
  const data = await loadCurriculum();
  assert.deepEqual(Array.from(data.lessons.slice(0, 9), (lesson) => lesson.sourceTitle), [
    "a /ă/", "m /m/", "s /s/", "t /t/", "VC/CVC 합성", "p /p/", "f /f/", "i /ĭ/", "n /n/: 처음과 끝"
  ]);
  assert.equal(data.lessons[4].title, "소리를 이어 짧은 단어 읽기");
  assert.equal(data.lessons[4].activityType, "blend");
  assert.equal(new Set(data.lessons.map((lesson) => lesson.activityType)).size, 6);
  assert.ok(data.lessons.every((lesson) => lesson.title && lesson.instruction && lesson.activityLabel));
});

test("every curriculum word has a usable picture reference", async () => {
  const data = await loadCurriculum();
  for (const lesson of data.lessons) {
    for (const word of lesson.words) {
      const picture = data.wordBank[word]?.picture;
      assert.ok(picture, `${lesson.id}: ${word} has no picture`);
      assert.ok(Number.isInteger(picture.index) && picture.index >= 0, `${word} has an invalid picture index`);
      assert.ok(picture.index < picture.columns * picture.rows, `${word} points outside its picture atlas`);
    }
  }
});

test("all shipped card artwork uses WebP", async () => {
  const files = await readdir(new URL("../public/phonics/assets/images/", import.meta.url));
  assert.ok(files.length > 0);
  assert.deepEqual(files.filter((file) => !file.endsWith(".webp")), []);
});

test("the course background is an optimized WebP without an overlay", async () => {
  const css = await readFile(new URL("../public/phonics/styles.css", import.meta.url), "utf8");
  const backgroundRule = css.match(/body::before\{[^}]+\}/)?.[0] || "";
  assert.ok(css.includes('url("assets/images/phonics-space-bg.webp")'));
  assert.ok(!backgroundRule.includes("linear-gradient"));
});

test("the sound game loads only visible work and warms the next round", async () => {
  const source = await readFile(new URL("../public/phonics/app.js", import.meta.url), "utf8");
  const openLesson = source.slice(source.indexOf("function openLesson"), source.indexOf("function closeStudy"));
  assert.ok(source.includes("preloadRoundPictures(round)"));
  assert.ok(source.includes("preloadNextRoundPictures()"));
  assert.ok(!openLesson.includes("renderWordCards()"));
  assert.ok(!openLesson.includes("renderBlend()"));
  assert.ok(!openLesson.includes("renderDictation()"));
});

test("literal phonics targets contain the lesson spelling", async () => {
  const data = await loadCurriculum();
  const semanticMarkers = new Set(["vce", "syllable", "compound", "closed", "open", "drop-e", "y-to-i", "suffix", "prefix"]);
  const fits = (word, focus) => {
    const parts = focus.replace(/^-/, "").split("_").filter(Boolean);
    let cursor = 0;
    return parts.length > 0 && parts.every((part) => {
      const index = word.indexOf(part, cursor);
      if (index < 0) return false;
      cursor = index + part.length;
      return true;
    });
  };

  for (const lesson of data.lessons) {
    if (lesson.focus.some((focus) => semanticMarkers.has(focus))) continue;
    for (const word of lesson.words.slice(0, 8)) {
      assert.ok(lesson.focus.some((focus) => fits(word, focus)), `${lesson.id}: ${word} does not match ${lesson.focus.join(",")}`);
    }
  }
});
