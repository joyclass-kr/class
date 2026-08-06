import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const platformSource = await readFile(new URL("./classroom-platform.js", import.meta.url), "utf8");
const moduleSource = await readFile(new URL("./metacognition.js", import.meta.url), "utf8");
const migrationSource = await readFile(
  new URL("./migrations/004-metacognition.sql", import.meta.url),
  "utf8"
);

test("metacognition router is mounted and initialized by the classroom platform", () => {
  assert.match(platformSource, /require\("\.\/metacognition"\)/);
  assert.match(platformSource, /const metacognition = createMetacognition\(\{/);
  assert.match(platformSource, /router\.use\("\/metacognition", metacognition\.router\)/);
  assert.match(platformSource, /await metacognition\.initialize\(\);/);
});

test("attempt metrics are recomputed on the server, never taken from the client", () => {
  // 저장되는 지표는 analysis.summary(서버 계산)에서만 나와야 한다.
  assert.match(moduleSource, /const analysis = MetacogMetrics\.analyze\(responses, METACOG_ITEMS\)/);
  assert.match(moduleSource, /const summary = analysis\.summary;/);
  // 클라이언트 요약은 별도 칸에 원문 그대로만 남긴다.
  assert.match(moduleSource, /client_summary/);
  assert.doesNotMatch(moduleSource, /summary\s*=\s*req\.body/);
});

test("submission is restricted to student accounts and complete-enough attempts", () => {
  assert.match(moduleSource, /STUDENT_REQUIRED/);
  assert.match(moduleSource, /INCOMPLETE_ATTEMPT/);
  assert.match(moduleSource, /Math\.ceil\(METACOG_ITEMS\.length \* 0\.5\)/);
});

test("teacher views are scoped to a class the teacher may see", () => {
  assert.match(moduleSource, /CLASS_NOT_ALLOWED/);
  assert.match(moduleSource, /WHERE id = \$1 AND school_id = \$2/);
  assert.match(moduleSource, /WHERE teacher_user_id = \$1/);
});

test("research export carries no student names or numbers", () => {
  const exportBlock = moduleSource.slice(moduleSource.indexOf('"/teacher/export.csv"'));
  assert.doesNotMatch(exportBlock, /roster_name|student_number/);
});

test("a missing or broken item set disables this feature only, never the whole server", () => {
  // 이 require는 서버 부팅 경로에 있다. 잡지 않으면 포털 전체가 안 뜬다.
  assert.match(moduleSource, /try\s*\{[\s\S]*require\(path\.join\(PAGE_DIR, "items\.js"\)\)/);
  assert.match(moduleSource, /catch \(error\) \{\s*\n\s*loadError = error;/);
  assert.match(moduleSource, /if \(loadError\) \{[\s\S]*METACOGNITION_UNAVAILABLE/);
});

test("stored metrics are range-checked in the database, not only in JavaScript", () => {
  assert.match(migrationSource, /accuracy REAL NOT NULL CHECK \(accuracy BETWEEN 0 AND 1\)/);
  assert.match(migrationSource, /bias REAL NOT NULL CHECK \(bias BETWEEN -1 AND 1\)/);
  assert.match(migrationSource, /JSONB_TYPEOF\(responses\) = 'array'/);
});
