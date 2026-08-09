import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const schoolAdminAppSource = await readFile(new URL("../schooladmin/app.js", import.meta.url), "utf8");

function fnBody(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  assert.ok(start !== -1, `Start marker not found: ${startMarker}`);
  const end = source.indexOf(endMarker, start);
  assert.ok(end !== -1, `End marker not found: ${endMarker}`);
  return source.slice(start, end);
}

test("renderAnnualTimetable34Weeks counts only actual class weeks toward the 34-week cap, not raw calendar weeks", () => {
  const body = fnBody(
    schoolAdminAppSource,
    "async function renderAnnualTimetable34Weeks()",
    "// Call initial load on tab switch"
  );

  // The while loop must scan the whole academic year (Mar 1 ~ Feb 28/29) and must
  // NOT bail out after 34 raw calendar weeks -- that used to cut the table off around
  // early November, before winter vacation and the back half of the 2nd semester.
  assert.match(body, /while \(currMon <= endDate\) \{/);
  assert.doesNotMatch(body, /while \(currMon <= endDate && weekIndex <= 34\)/);

  // A week with zero school days (a pure vacation week) must not consume a week-index
  // slot or produce a row -- only weeks with at least one instructional day count,
  // matching the "weekly_hours * 34" annual-hours convention used elsewhere (curriculum
  // hours auto-calc).
  assert.match(body, /if \(weekSchoolDays > 0\) \{/);
  assert.match(body, /weekIndex\+\+;/);
});

test("annual required hours elsewhere in schooladmin/app.js are computed as weekly_hours * 34 actual class weeks, confirming the 34-week table must skip vacation weeks", () => {
  assert.match(schoolAdminAppSource, /row\.weekly \* 34; \/\/ 34 weeks/);
});
