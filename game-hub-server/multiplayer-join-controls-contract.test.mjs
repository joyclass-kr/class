import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const gamesRoot = path.join(root, "learning", "games");
const modeId = /id="(?:joinTab|joinMode|join-tab|join-mode-btn)"/;
const modeButton = /<button\b[^>]*id="(?:joinTab|joinMode|join-tab|join-mode-btn)"[^>]*>([\s\S]*?)<\/button>/i;
const actionButton = /<button\b[^>]*id="(?:joinBtn|join|join-room-btn)"[^>]*>([\s\S]*?)<\/button>/i;

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const filepath = path.join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(filepath);
    return entry.isFile() && entry.name.endsWith(".html") ? [filepath] : [];
  });
}

const stripTags = value => value.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

test("every multiplayer lobby distinguishes mode selection from joining", () => {
  const audited = [];

  for (const filepath of htmlFiles(gamesRoot)) {
    const html = fs.readFileSync(filepath, "utf8");
    if (!modeId.test(html)) continue;

    const mode = html.match(modeButton);
    const action = html.match(actionButton);
    assert.ok(mode, `${path.relative(root, filepath)}: 방 번호 입력 모드 선택이 필요합니다.`);
    assert.ok(action, `${path.relative(root, filepath)}: 실제 참가 버튼이 필요합니다.`);
    assert.equal(stripTags(mode[1]), "방번호 입력", `${path.relative(root, filepath)}: 모드 선택 문구가 중복됩니다.`);
    assert.equal(stripTags(action[1]), "참가", `${path.relative(root, filepath)}: 실제 실행 버튼은 ‘참가’여야 합니다.`);
    assert.notEqual(stripTags(mode[1]), stripTags(action[1]), `${path.relative(root, filepath)}: 같은 버튼 문구를 두 번 쓰면 안 됩니다.`);
    assert.match(mode[0], /role="tab"/);
    assert.match(mode[0], /aria-label="방 번호 입력 방식 선택"/);
    assert.match(action[0], /aria-label="입력한 방 번호로 참가"/);
    audited.push(path.relative(root, filepath));
  }

  assert.equal(audited.length, 26, `멀티플레이 로비 전수 조사 수가 달라졌습니다: ${audited.length}`);
});

test("shared lobby prevents duplicate join controls in future games", () => {
  const lobby = fs.readFileSync(path.join(root, "assets", "network", "multiplayer-lobby.js"), "utf8");
  assert.match(lobby, /joinTab\.textContent = "방번호 입력"/);
  assert.match(lobby, /joinButton\.textContent = "참가"/);
  assert.match(lobby, /setAttribute\("aria-selected"/);
});
