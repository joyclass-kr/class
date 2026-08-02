import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const serverSource = await readFile(new URL("./classroom-platform.js", import.meta.url), "utf8");
const dashboardSource = await readFile(new URL("../classtools/dashboard.html", import.meta.url), "utf8");

test("teachers can update only schedules belonging to their own class", () => {
  assert.match(serverSource, /router\.patch\("\/teacher\/schedules\/:scheduleId"/);
  assert.match(serverSource, /c\.teacher_user_id = \$4/);
  assert.match(serverSource, /SET event_date = \$2::DATE, title = \$3, updated_at = NOW\(\)/);
});

test("dashboard exposes schedule edit and clear visual date groups", () => {
  assert.match(dashboardSource, /editingScheduleId/);
  assert.match(dashboardSource, /schedule-today/);
  assert.match(dashboardSource, /schedule-this-week/);
  assert.match(dashboardSource, /cancelScheduleEditBtn/);
});
