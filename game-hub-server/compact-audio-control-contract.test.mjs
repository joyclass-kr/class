import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = relativePath => fs.readFileSync(path.join(root, relativePath), "utf8");
const version = "20260825-compact-vertical-1";

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if ([".git", "node_modules"].includes(entry.name)) return [];
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(target);
    return entry.isFile() && entry.name.endsWith(".html") ? [target] : [];
  });
}

test("sound control is one compact top-right speaker", () => {
  const control = read("assets/sound/music-control.js");
  const styles = read("assets/sound/music-control.css");

  assert.match(control, /unified-audio-menu-toggle/);
  assert.match(control, /unified-audio-panel[^>]*hidden/);
  assert.match(styles, /right: max\(12px, env\(safe-area-inset-right\)\)/);
  assert.match(styles, /\.unified-audio-menu-toggle[\s\S]*width: 48px;[\s\S]*height: 48px;/);
  assert.match(styles, /\.unified-audio-panel\s*\{[\s\S]*grid-template-columns: 48px 1px 48px;/);
});

test("music and effects use vertical touch sliders", () => {
  const styles = read("assets/sound/music-control.css");

  assert.match(styles, /\.unified-audio-slider\s*\{[\s\S]*writing-mode: vertical-lr;[\s\S]*touch-action: pan-y;/);
  assert.match(styles, /height: 98px;/);
  assert.doesNotMatch(styles, /touch-action: pan-x/);
});

test("every page requests the cache-busted compact control", () => {
  const expected = `music-control.js?v=${version}`;
  const users = htmlFiles(root).filter(file => fs.readFileSync(file, "utf8").includes("music-control.js"));
  assert.ok(users.length > 30, "expected the shared control across site pages");
  for (const file of users) {
    assert.ok(fs.readFileSync(file, "utf8").includes(expected), path.relative(root, file));
  }

  const control = read("assets/sound/music-control.js");
  assert.match(control, new RegExp(`stylesheetUrl\\.searchParams\\.set\\("v", "${version}"\\)`));
});
