import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const gameRoot = path.join(root, "learning", "games", "bomb77");
const html = fs.readFileSync(path.join(gameRoot, "bomb77.html"), "utf8");
const music = fs.readFileSync(path.join(gameRoot, "music.js"), "utf8");
const tracks = ["stone-road-time.m4a", "midnight-pulse.m4a"];

test("77 폭탄은 공용 음악·효과음 조절기보다 먼저 재생목록을 준비한다", () => {
  assert.match(html, /music\.js[\s\S]*?assets\/sound\/music-control\.js/);
  assert.match(music, /audio\.id\s*=\s*"bgm"/);
  assert.match(music, /addEventListener\("ended"/);
});

test("제공된 두 곡은 AAC M4A로 변환되고 원본 MP3를 배포하지 않는다", () => {
  for (const track of tracks) {
    const file = path.join(gameRoot, "assets", "sound", track);
    assert.equal(fs.existsSync(file), true);
    assert.ok(fs.statSync(file).size > 1_000_000);
    assert.match(music, new RegExp(track.replace(".", "\\.")));
  }
  assert.doesNotMatch(music, /\.mp3/i);
});
