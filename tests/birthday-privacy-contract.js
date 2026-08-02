const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const roster = fs.readFileSync(path.join(root, "classtools", "roster.html"), "utf8");
const dashboard = fs.readFileSync(path.join(root, "classtools", "dashboard.html"), "utf8");
const platform = fs.readFileSync(path.join(root, "game-hub-server", "classroom-platform.js"), "utf8");

for (const [name, html] of [["roster", roster], ["dashboard", dashboard]]) {
  const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, `${name} script is missing.`);
  new vm.Script(script, { filename: `${name}.html` });
}

assert.match(roster, /생일 \(MMDD\)/, "The roster must collect month and day only.");
assert.doesNotMatch(roster, /생년월일 \(YYMMDD\)/, "The roster must not request a birth year.");
assert.match(roster, /id="birthday-visible"/, "The roster needs a separate birthday visibility field.");
assert.match(roster, /기본값은 N/, "Birthday visibility must default to private.");
assert.match(platform, /ADD COLUMN IF NOT EXISTS birthday_mmdd TEXT/);
assert.match(platform, /ADD COLUMN IF NOT EXISTS birthday_visible BOOLEAN NOT NULL DEFAULT FALSE/);
assert.match(platform, /UPDATE classroom_students SET birth_date = NULL/,
  "Legacy birth years must be discarded after month/day migration.");
assert.match(platform, /birthday_visible = TRUE/,
  "Only opted-in birthdays may be returned as schedules.");
assert.match(platform, /type: "birthday"/);
assert.match(dashboard, /item\.type !== "birthday"/,
  "Generated birthdays must not expose a schedule delete control.");
assert.match(dashboard, /student\?\.birthdayVisible/,
  "Roster birthday badges must respect visibility consent.");

console.log("Birthday privacy contract: OK");
