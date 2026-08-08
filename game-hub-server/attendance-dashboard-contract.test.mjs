import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const serverSource = await readFile(new URL("./classroom-platform.js", import.meta.url), "utf8");
const dashboardSource = await readFile(new URL("../classtools/dashboard.html", import.meta.url), "utf8");
const schoolAdminAppSource = await readFile(new URL("../schooladmin/app.js", import.meta.url), "utf8");
const noticeIndexSource = await readFile(new URL("../notice/index.html", import.meta.url), "utf8");

function handlerBody(source, routeSignature) {
  const start = source.indexOf(routeSignature);
  assert.ok(start !== -1, `Route not found: ${routeSignature}`);
  const end = source.indexOf("\n  }));", start);
  assert.ok(end !== -1, `Route handler close not found for: ${routeSignature}`);
  return source.slice(start, end);
}

test("teacher notice endpoints resolve the class from classroom_teachers directly, not from classroom_classes", () => {
  const routes = [
    `router.get("/teacher/quick-absences"`,
    `router.get("/teacher/absence-notes"`,
    `router.patch("/teacher/absence-notes/:id/approve"`,
    `router.get("/teacher/experiential-apps"`,
    `router.patch("/teacher/experiential-apps/:id/approve"`,
  ];
  for (const route of routes) {
    const body = handlerBody(serverSource, route);
    assert.doesNotMatch(body, /classroom_classes/, `${route} should not depend on classroom_classes`);
    assert.match(body, /classroom_teachers/, `${route} should resolve directly from classroom_teachers`);
  }
});

test("GET /school-admin/dashboard counts approved experiential learning applications alongside absence notices", () => {
  const body = handlerBody(serverSource, `router.get("/school-admin/dashboard"`);
  assert.match(body, /FROM classroom_experiential_apps/);
  assert.match(body, /experientialApps: experientialAppsRes\.rows/);
});

test("school-admin dashboard rendering folds experiential learning applications into the absence count", () => {
  assert.match(schoolAdminAppSource, /renderDashboard\(res\.roster, res\.notices, res\.formalNotes, res\.experientialApps\)/);
  assert.match(schoolAdminAppSource, /function renderDashboard\(roster, notices, formalNotes, experientialApps\)/);
});

test("the teacher dashboard's daily alert badges include approved absence notes and experiential learning applications, not just quick notices", () => {
  const body = dashboardSource.slice(
    dashboardSource.indexOf("async function fetchQuickAlertsForDashboard"),
    dashboardSource.indexOf("function renderChecklist")
  );
  assert.match(body, /\/api\/teacher\/quick-absences/);
  assert.match(body, /\/api\/teacher\/absence-notes/);
  assert.match(body, /\/api\/teacher\/experiential-apps/);
  assert.match(body, /status === "approved"/);
});

test("the parent-facing same-day attendance notice (출결 예고) covers all three notice types, and neither dashboard filters any of them out", () => {
  const formBody = noticeIndexSource.slice(
    noticeIndexSource.indexOf('id="tab-quick-absence"'),
    noticeIndexSource.indexOf('id="tab-absence-note"')
  );
  for (const type of ["지각", "결석", "조퇴"]) {
    assert.match(formBody, new RegExp(`<option value="${type}">${type}</option>`));
  }

  // The teacher dashboard stores every quick-absence alert for today verbatim,
  // it must not filter by noticeType (that would silently drop 지각/조퇴).
  const dashboardBody = dashboardSource.slice(
    dashboardSource.indexOf("async function fetchQuickAlertsForDashboard"),
    dashboardSource.indexOf("function renderChecklist")
  );
  const quickAbsenceBlock = dashboardBody.slice(0, dashboardBody.indexOf('"/api/teacher/absence-notes"'));
  assert.doesNotMatch(quickAbsenceBlock, /noticeType\s*===/);

  // The school-admin dashboard must bucket all three notice types, not just 결석.
  for (const type of ["결석", "지각", "조퇴"]) {
    assert.match(schoolAdminAppSource, new RegExp(`n\\.notice_type === '${type}'`));
  }
});
