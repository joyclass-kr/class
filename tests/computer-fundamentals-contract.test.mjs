import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const read = (relativePath) => fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
const exists = (relativePath) => fs.existsSync(new URL(`../${relativePath}`, import.meta.url));
const courseRoot = "learning/inquiry/information-computing/computer-fundamentals";
const portal = read("index.html");
const lessonPage = read(`${courseRoot}/lessons/index.html`);
const lessonSource = read(`${courseRoot}/lessons/system-lessons.js`);
const lessonStyles = read(`${courseRoot}/lessons/system-lessons.css`);

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
  for (const id of ["a02", "a03", "a04", "a05", "b01"]) {
    assert.match(lessonSource, new RegExp(`id: "${id}"`));
  }
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
