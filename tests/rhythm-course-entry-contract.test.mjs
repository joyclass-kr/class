import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const testDir = path.dirname(fileURLToPath(import.meta.url));
const rhythmRoot = path.join(testDir, "..", "learning", "arts", "music-theory", "rhythm");
const html = fs.readFileSync(path.join(rhythmRoot, "index.html"), "utf8");
const app = fs.readFileSync(path.join(rhythmRoot, "app.js"), "utf8");

test("리듬 메뉴는 학습 본문보다 목차를 먼저 보여 준다", () => {
    assert.match(html, /id="courseOverview"[\s\S]*id="stageList"/);
    assert.match(html, /id="lessonView"[^>]*hidden/);
    assert.match(app, /showCourseOverview\(\);[\s\S]*if \(requestedStage\) selectStage/);
});

test("목차에서 9개 리듬 단계를 선택할 수 있다", () => {
    assert.equal((app.match(/\{ id: \d+, title:/g) || []).length, 9);
    assert.match(app, /button\.addEventListener\("click", function \(\) \{ selectStage\(stage\.id\); \}\)/);
    assert.match(app, /elements\.backToCourse\.addEventListener\("click", returnToCourse\)/);
});

test("연주 리듬에는 짧은 어택 레이어가 있다", () => {
    assert.match(app, /const transient = context\.createOscillator\(\);/);
    assert.match(app, /transientGain\.gain\.setValueAtTime\(accent \? \.2 : \.14, start\)/);
});
