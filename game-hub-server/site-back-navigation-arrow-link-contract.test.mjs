import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const navigation = fs.readFileSync(path.join(root, "assets/site-back-navigation.js"), "utf8");
const expression = navigation.match(/const BACK_LINK_LABEL = (\/.+\/);/)?.[1];
const backLinkLabel = Function(`"use strict"; return (${expression})`)();

test("all arrow-prefixed page links are classified as legacy navigation", () => {
  for (const label of [
    "← 음악 감상",
    "← 수업 도구",
    "← 연산",
    "‹ 기초학력",
    "◀ 다른 섹션"
  ]) {
    assert.equal(backLinkLabel.test(label), true, `back link not recognized: ${label}`);
  }
});

test("ordinary content links and activity buttons are not arrow-link matches", () => {
  for (const label of ["음악 감상", "수업 도구", "차시 목록", "감상 문제"]) {
    assert.equal(backLinkLabel.test(label), false, `ordinary label classified as back link: ${label}`);
  }
  assert.match(navigation, /if \(!\(control instanceof HTMLAnchorElement\)\) return false/);
});

test("legacy back-link classes are covered even when their arrow is decorative", () => {
  assert.match(navigation, /a\.back, a\.back-link, a\.home, a\.home-link, a\.counting-back, a\.catalog-back/);
});
