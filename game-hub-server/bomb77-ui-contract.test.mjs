import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const gameRoot = path.join(root, "learning", "games", "bomb77");
const html = fs.readFileSync(path.join(gameRoot, "bomb77.html"), "utf8");
const css = fs.readFileSync(path.join(gameRoot, "game.css"), "utf8");
const polish = fs.readFileSync(path.join(gameRoot, "polish.css"), "utf8");
const client = fs.readFileSync(path.join(gameRoot, "game.js"), "utf8");

test("게임 화면은 핵심 합계·위험도·손패 조작을 첫 화면 구조에 둔다", () => {
  for (const id of ["totalText", "dangerFill", "totalCore", "turnBanner", "hand", "playButton"]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /class="game-board"/);
  assert.match(html, /class="hand-zone"/);
});

test("태블릿 가로·세로와 보조 휴대폰 레이아웃 분기 및 터치 크기를 가진다", () => {
  assert.match(css, /min-height:46px/);
  assert.match(css, /@media\(max-width:900px\)/);
  assert.match(css, /@media\(max-width:760px\)/);
  assert.match(css, /@media\(max-width:480px\)/);
  assert.match(polish, /@media\(max-width:900px\)/);
});

test("독자적으로 생성한 배경과 모션 감소 설정을 사용한다", () => {
  assert.equal(fs.existsSync(path.join(gameRoot, "assets", "images", "bomb77-table.webp")), true);
  assert.match(polish, /bomb77-table\.webp/);
  assert.match(polish, /prefers-reduced-motion:reduce/);
});

test("브랜드·규칙·클라이언트에는 원작 이름과 외부 자산 참조가 없다", () => {
  const source = `${html}\n${css}\n${polish}\n${client}`;
  assert.doesNotMatch(source, /로보\s*77|lobo\s*77/i);
  assert.doesNotMatch(source, /https?:\/\//i);
  assert.match(source, /77 폭탄/);
});

test("서버 권한형 2~8인 설정과 25초 자동 행동을 클라이언트가 사용한다", () => {
  assert.match(client, /allowedPlayerCounts:\s*\[2,3,4,5,6,7,8\]/);
  assert.match(client, /type:\s*"BOMB77_ACTION"/);
  assert.match(client, /turnSeconds\s*\|\|\s*25/);
});
