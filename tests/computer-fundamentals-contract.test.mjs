import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

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

const componentImages = ["cpu", "ram", "gpu", "ssd", "hdd", "motherboard", "psu", "cooling"];

test("the information and computing menu keeps both course links", () => {
  assert.match(portal, /data-access-group="information-computing"/);
  assert.match(portal, /learning\/inquiry\/information-computing\/computer-fundamentals\//);
  assert.match(portal, /learning\/inquiry\/information-computing\/typing\//);
  assert.doesNotMatch(portal, /learning\/basics\/typing\//);
});

test("the six completed lessons and their bilingual titles remain reachable", () => {
  assert.ok(exists(`${courseRoot}/index.html`));
  assert.ok(exists(`${courseRoot}/lessons/index.html`));
  for (const id of ["a01", "a02", "a03", "a04", "a05", "b01"]) {
    assert.match(lessonSource, new RegExp(`id: "${id}"`));
  }
  assert.match(coursePage, /data-course-root="true"/);
  assert.match(coursePage, /lessons\/system-lessons\.js/);
  assert.match(lessonPage, /id="lessonTitle"/);
  assert.match(lessonSource, /lesson\.title} <small>\${lesson\.english}/);
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

test("activities support direct manipulation and quizzes reveal explanations only after submit", () => {
  assert.match(lessonSource, /document\.addEventListener\("pointermove", moveDrag/);
  assert.match(lessonSource, /탭 방식: 카드와 분류 칸을 차례로 누르기/);
  assert.match(lessonSource, /submitAnswer\.addEventListener\("click"/);
  const submitHandler = lessonSource.slice(lessonSource.indexOf('submitAnswer.addEventListener("click"'));
  assert.match(submitHandler, /quizFeedback\.textContent = question\.explanation/);
  assert.match(lessonPage, /id="submitAnswer"[^>]*disabled>답 확인/);
});
test("mobile and Chromebook interiors are real project assets used in device comparisons", () => {
  for (const name of ["smartphone", "chromebook", "tablet"]) {
    for (const width of [768, 1536]) {
      assert.ok(exists(`${courseRoot}/assets/images/${name}-internals-exploded-${width}.webp`));
    }
    assert.ok(exists(`${courseRoot}/assets/source/${name}-internals-exploded-v1.png`));
  }
  assert.match(lessonSource, /class="device-comparison-grid"/);
  assert.match(lessonSource, /스마트폰.*SoC/s);
  assert.match(lessonStyles, /\.device-comparison-grid/);
});

test("the curriculum and glossary connect mobile hardware to the web service stack", () => {
  assert.match(curriculum, /B02 \| 스마트폰과 태블릿 안에도 같은 부품이 있을까/);
  assert.match(curriculum, /H04 \| 프론트엔드와 백엔드는 어떤 일을 나눌까/);
  for (const term of ["시스템 온 칩", "프론트엔드", "백엔드", "데이터베이스", "호스팅", "배포"]) {
    assert.match(glossary, new RegExp(term));
  }
});

test("quiz totals follow each lesson and answer positions are shuffled", () => {
  assert.match(lessonPage, /id="scoreTotal"/);
  assert.match(lessonSource, /lesson\.questions\.length \* 0\.8/);
  assert.match(lessonSource, /presentedOptions/);
  assert.match(lessonSource, /Math\.random/);
});

test("student-facing section labels name the content without promotional filler", () => {
  const studentFacingCopy = [coursePage, lessonPage, lessonSource].join("\n");
  for (const phrase of ["헷갈리지 않기", "쉽게 비유하면", "한눈에 비교", "원리 보기", "직접 확인하기"]) {
    assert.doesNotMatch(studentFacingCopy, new RegExp(phrase));
  }
  for (const label of ["개념 설명", "활동 시작", "개념 비교", "동작 순서", "명칭과 어원"]) {
    assert.match(studentFacingCopy, new RegExp(label));
  }
});