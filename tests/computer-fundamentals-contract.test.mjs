import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const read = (relativePath) => fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
const exists = (relativePath) => fs.existsSync(new URL(`../${relativePath}`, import.meta.url));
const courseRoot = "learning/inquiry/information-computing/computer-fundamentals";
const portal = read("index.html");
const coursePage = read(`${courseRoot}/index.html`);
const lessonPage = read(`${courseRoot}/lessons/index.html`);
const lessonSource = read(`${courseRoot}/lessons/system-lessons.js`);
const lessonStyles = read(`${courseRoot}/lessons/system-lessons.css`);
const curriculum = read(`${courseRoot}/CURRICULUM.md`);
const glossary = read(`${courseRoot}/GLOSSARY-KO-EN.md`);
const foundationFiles = [
  "foundation-core.js",
  "foundation-compact.js",
  "foundation-b.js",
  "foundation-c.js",
  "foundation-d.js",
  "foundation-e.js",
  "foundation-fg.js",
  "foundation-h.js",
  "foundation-ij.js"
];
const foundationSources = foundationFiles.map((file) => read(`${courseRoot}/lessons/${file}`));
const context = vm.createContext({ window: {} });
for (let index = 0; index < foundationFiles.length; index += 1) {
  vm.runInContext(foundationSources[index], context, { filename: foundationFiles[index] });
}
const generatedLessons = context.window.COMPUTER_FOUNDATION_LESSONS;
const componentImages = ["cpu", "ram", "gpu", "ssd", "hdd", "motherboard", "psu", "cooling"];

test("the information and computing menu keeps both course links", () => {
  assert.match(portal, /data-access-group="information-computing"/);
  assert.match(portal, /learning\/inquiry\/information-computing\/computer-fundamentals\//);
  assert.match(portal, /learning\/inquiry\/information-computing\/typing\//);
  assert.doesNotMatch(portal, /learning\/basics\/typing\//);
});

test("the 36-lesson core course is loaded in dependency order", () => {
  assert.equal(generatedLessons.length, 30);
  assert.equal(new Set(generatedLessons.map((lesson) => lesson.id)).size, 30);
  for (const id of ["a01", "a02", "a03", "a04", "a05", "b01"]) {
    assert.match(lessonSource, new RegExp(`id: "${id}"`));
  }
  for (const id of ["b02", "c01", "d01", "e01", "f01", "g01", "h01", "i01", "j03"]) {
    assert.ok(generatedLessons.some((lesson) => lesson.id === id), `${id} should be generated`);
  }
  assert.match(lessonSource, /\.\.\.detailedLessons, \.\.\.\(window\.COMPUTER_FOUNDATION_LESSONS/);
  assert.match(coursePage, /data-course-root="true"/);
  assert.match(lessonPage, /id="lessonTitle"/);
  for (const page of [coursePage, lessonPage]) {
    const coreAt = page.indexOf("foundation-core.js");
    const compactAt = page.indexOf("foundation-compact.js");
    const courseAt = page.indexOf("foundation-b.js");
    const engineAt = page.indexOf("system-lessons.js");
    assert.ok(coreAt >= 0 && coreAt < compactAt && compactAt < courseAt && courseAt < engineAt);
  }
});

test("every generated lesson has substantive bilingual content, manipulation, and six questions", () => {
  for (const lesson of generatedLessons) {
    assert.ok(lesson.title && lesson.english, `${lesson.id} needs a bilingual title`);
    assert.ok(lesson.details.length >= 4, `${lesson.id} needs four concept explanations`);
    assert.ok(lesson.workedExample.steps.length >= 4, `${lesson.id} needs a four-step example`);
    assert.ok(lesson.comparisons.cards.length >= 4, `${lesson.id} needs four comparisons`);
    assert.ok(lesson.activity.items.length >= 6, `${lesson.id} needs at least six activity items`);
    assert.equal(lesson.questions.length, 6, `${lesson.id} needs six scenario questions`);
    for (const question of lesson.questions) {
      assert.equal(question.options.length, 4, `${lesson.id} question needs four options`);
      assert.ok(question.answer >= 0 && question.answer < question.options.length);
      assert.ok(question.explanation.length >= 20, `${lesson.id} needs a reasoned explanation`);
      assert.doesNotMatch(question.options.join(" "), /무조건|항상|전부 다|오직 .*만/);
    }
  }
});

test("the curriculum presents ten progressive modules instead of an unimplemented outline", () => {
  for (const moduleCode of ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]) {
    assert.match(curriculum, new RegExp(`### ${moduleCode}\\.`));
  }
  assert.match(curriculum, /B02 \| 휴대전화와 태블릿 안에도 컴퓨터가 있을까/);
  assert.match(curriculum, /H04 \| 프론트엔드·백엔드·API·데이터베이스는 어떻게 협력할까/);
  assert.match(curriculum, /J03 \| 버그를 찾고 입력·처리·출력·저장 프로젝트를 완성하려면/);
  assert.match(lessonPage, /id="lessonList" class="course-modules"/);
  assert.match(lessonSource, /<details class="course-module"/);
  assert.match(lessonStyles, /\.course-module summary/);
});

test("every B01 component close-up is visible through an image tab and detailed panel", () => {
  for (const name of componentImages) {
    const asset = `${courseRoot}/assets/images/component-${name}-768.webp`;
    assert.ok(exists(asset), `${asset} should exist`);
    assert.match(lessonSource, new RegExp(`component-${name}-768\\.webp`));
  }
  assert.match(lessonSource, /class="component-tabs"/);
  assert.match(lessonSource, /<img src="\${part\.image}"/);
  assert.match(lessonSource, /Name and Origin/);
  assert.match(lessonStyles, /\.component-tabs button img/);
});

test("activities support touch, pointer, and keyboard while feedback waits for submit", () => {
  assert.match(lessonSource, /document\.addEventListener\("pointermove", moveDrag/);
  assert.match(lessonSource, /탭 방식: 카드와 분류 칸을 차례로 누르기/);
  assert.match(lessonSource, /event\.key === "Enter" \|\| event\.key === " "/);
  assert.match(lessonSource, /submitAnswer\.addEventListener\("click"/);
  const submitHandler = lessonSource.slice(lessonSource.indexOf('submitAnswer.addEventListener("click"'));
  assert.match(submitHandler, /quizFeedback\.textContent = question\.explanation/);
  assert.match(lessonPage, /id="submitAnswer"[^>]*disabled>답 확인/);
});

test("mobile and Chromebook interiors are project assets used in device comparisons", () => {
  for (const name of ["smartphone", "chromebook", "tablet"]) {
    for (const width of [768, 1536]) {
      assert.ok(exists(`${courseRoot}/assets/images/${name}-internals-exploded-${width}.webp`));
    }
    assert.ok(exists(`${courseRoot}/assets/source/${name}-internals-exploded-v1.png`));
  }
  assert.match(lessonSource, /class="device-comparison-grid"/);
  assert.match(lessonSource, /스마트폰.*SoC/s);
  assert.match(lessonStyles, /\.device-comparison-grid/);
  assert.match(lessonStyles, /\.concept-relationship-board/);
});

test("the bilingual glossary covers hardware, files, display, network, and web stacks", () => {
  for (const term of ["시스템 온 칩", "운영체제", "파일", "픽셀", "프론트엔드", "백엔드", "데이터베이스", "호스팅", "배포"]) {
    assert.match(glossary, new RegExp(term));
  }
});

test("quiz totals follow each lesson and answer positions are shuffled", () => {
  assert.match(lessonPage, /id="scoreTotal"/);
  assert.match(lessonSource, /lesson\.questions\.length \* 0\.8/);
  assert.match(lessonSource, /presentedOptions/);
  assert.match(lessonSource, /Math\.random/);
});

test("student-facing copy names the content without promotional filler", () => {
  const studentFacingCopy = [coursePage, lessonPage, lessonSource, ...foundationSources].join("\n");
  for (const phrase of ["헷갈리지 않기", "쉽게 비유하면", "한눈에 비교", "원리 보기", "직접 확인하기", "앞의 개념을 이해하면"] ) {
    assert.doesNotMatch(studentFacingCopy, new RegExp(phrase));
  }
  for (const label of ["개념 설명", "활동 시작", "개념 비교", "동작 순서", "명칭과 어원"]) {
    assert.match(studentFacingCopy, new RegExp(label));
  }
});