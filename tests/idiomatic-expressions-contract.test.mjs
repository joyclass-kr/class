import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const data = require("../learning/basics/idiomatic-expressions/idiomatic-expressions-data.js");
const html = fs.readFileSync("learning/basics/idiomatic-expressions/index.html", "utf8");
const app = fs.readFileSync("learning/basics/idiomatic-expressions/app.js", "utf8");
const styles = fs.readFileSync("learning/basics/idiomatic-expressions/styles.css", "utf8");
const menu = fs.readFileSync("index.html", "utf8");

test("관용구 핵심 학습 은행은 선별된 완성형 자료다", () => {
  assert.equal(data.length, 110);
  assert.equal(new Set(data.map((item) => item.expression)).size, data.length);
  for (const item of data) {
    assert.ok(item.expression.length >= 3, item.expression);
    assert.ok(item.category.length >= 3, item.expression);
    assert.ok(item.meaning.endsWith("."), item.expression);
    assert.ok(item.example.endsWith("요."), item.expression);
    assert.ok(item.question.endsWith("요."), item.expression);
    assert.ok(Number.isInteger(item.lesson), item.expression);
  }
  assert.deepEqual(
    Array.from({ length: 11 }, (_, lesson) => data.filter((item) => item.lesson === lesson).length),
    [10, 10, 14, 14, 8, 8, 9, 9, 11, 9, 8]
  );
  const expressions = data.map((item) => item.expression).join("\n");
  assert.doesNotMatch(expressions, /누워서 떡 먹기|가뭄에 콩 나듯|갈수록 태산|천 리 길도/);
});

test("관용구 화면과 메인 메뉴가 내용별 차시 학습에 연결된다", () => {
  assert.match(menu, /href="learning\/basics\/idiomatic-expressions\/"/);
  assert.match(menu, /<strong>관용어<\/strong>/);
  assert.match(menu, /data-access-group="idiomatic-language"/);
  assert.match(menu, /<strong>관용 표현<\/strong>/);
  assert.match(menu, /data-content-paths="learning\/basics\/idiomatic-expressions\/\|learning\/basics\/proverbs\/\|learning\/basics\/classical-chinese-idioms\/"/);
  assert.equal((menu.match(/data-access-parent="idiomatic-language"/g) || []).length, 3);
  for (const id of [
    "studyView", "quizView", "expression", "meaning", "example", "question",
    "choices", "feedback", "previous", "next", "nextQuestion", "score"
  ]) {
    assert.match(html, new RegExp("id=\\\"" + id + "\\\""), id);
  }
  assert.match(html, /id="lessonOverview"/);
  assert.match(html, /id="lessonList"/);
  assert.match(html, /id="backToLessons"/);
  assert.match(app, /const LESSONS =/);
  assert.match(app, /1차시 · 감정과 반응/);
  assert.match(app, /renderLessonList/);
  assert.match(app, /completedLessons/);
  assert.doesNotMatch(app, /BATCH_SIZE = 5/);
  assert.match(app, /이 상황에 알맞은 관용어는/);
  assert.match(styles, /min-height:\s*48px/);
  assert.match(styles, /@media \(max-width: 520px\)/);
});
