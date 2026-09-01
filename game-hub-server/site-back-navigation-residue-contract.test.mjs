import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const navigation = fs.readFileSync(path.join(root, "assets/site-back-navigation.js"), "utf8");
const expression = navigation.match(/const LEGACY_LABEL = (\/.+\/i);/)?.[1];
const legacyLabel = Function(`"use strict"; return (${expression})`)();

test("section-specific legacy navigation labels are recognized", () => {
  for (const label of [
    "← 학습 홈",
    "학습 홈",
    "‹ 기초학력",
    "← 연산",
    "← 메인",
    "← 메인 페이지로 돌아가기",
    "← 학생 화면",
    "RETURN TO LOBBY",
    "로비로 돌아가기",
    "게임 대기실로 돌아가기"
  ]) {
    assert.equal(legacyLabel.test(label), true, `legacy control not recognized: ${label}`);
  }
});

test("in-activity navigation controls remain available", () => {
  for (const label of ["← 차시 목록", "← 자습 목록", "새 문제", "다시 풀기"]) {
    assert.equal(legacyLabel.test(label), false, `activity control was classified as legacy: ${label}`);
  }
});

test("client-rendered legacy navigation is observed and hidden", () => {
  assert.match(navigation, /new MutationObserver/);
  assert.match(navigation, /mutation\.addedNodes/);
  assert.match(navigation, /attributeFilter: \["aria-label", "hidden"\]/);
  assert.match(navigation, /\[data-site-back-legacy\]\{display:none!important\}/);
});

test("top rows collapse when legacy navigation is their only content", () => {
  assert.match(navigation, /hasMeaningfulContainerContent/);
  assert.match(navigation, /container\.toggleAttribute\("data-site-back-empty"/);
  assert.match(navigation, /\[data-site-back-empty\]\{display:none!important\}/);
  assert.match(navigation, /characterData: true/);
  assert.match(navigation, /attributeFilter: \["aria-label", "hidden"\]/);
});
