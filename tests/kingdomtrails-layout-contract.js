"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const gameDirectory = path.join(__dirname, "..", "learning", "games", "kingdom-trails");
const html = fs.readFileSync(path.join(gameDirectory, "kingdom-trails.html"), "utf8");
const css = fs.readFileSync(path.join(gameDirectory, "kingdom-trails.css"), "utf8");
const client = fs.readFileSync(path.join(gameDirectory, "kingdom-trails.js"), "utf8");

assert.match(html, /id="gameScreen"/);
assert.match(html, /id="currentTilePreview"/);
assert.match(html, /id="boardViewport"/);
assert.ok(html.indexOf("game-topbar") < html.indexOf("boardViewport"), "현재 차례 정보가 게임판보다 먼저 와야 합니다.");
assert.doesNotMatch(html, /class="[^"]*hero/);

assert.match(css, /\.button,.icon-button,.claim-button\{min-height:44px/);
assert.match(css, /@media\(max-width:1180px\)/);
assert.match(css, /@media\(max-width:900px\)/);
assert.match(css, /@media\(max-width:760px\) and \(orientation:portrait\)/);
assert.match(css, /height:calc\(100vh - 132px\)/);
assert.match(css, /\.board-panel\{height:690px;min-height:690px\}/);

assert.match(client, /allowedPlayerCounts:\s*\[2, 3, 4\]/);
assert.match(client, /KINGDOMTRAILS_ACTION/);
assert.match(client, /suggestedPlacement/);

const imagePath = path.join(gameDirectory, "assets", "images", "kingdom-countryside.png");
assert.ok(fs.existsSync(imagePath), "AI 배경 이미지가 프로젝트 폴더에 있어야 합니다.");
assert.ok(fs.statSync(imagePath).size > 100000, "임시 도형이 아닌 실제 이미지 자산이어야 합니다.");

console.log("kingdomtrails-layout-contract: ok");
