import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const serverSource = await readFile(new URL("./classroom-platform.js", import.meta.url), "utf8");

function handlerBody(source, routeSignature) {
  const start = source.indexOf(routeSignature);
  assert.ok(start !== -1, `Route not found: ${routeSignature}`);
  const end = source.indexOf("\n  }));", start);
  assert.ok(end !== -1, `Route handler close not found for: ${routeSignature}`);
  return source.slice(start, end);
}

test("GET /school-admin/students (the schooladmin roster tab) reads from school_students directly instead of requiring classroom_classes provisioning per teacher", () => {
  const body = handlerBody(serverSource, `router.get("/school-admin/students"`);
  assert.match(body, /FROM school_students/);
  assert.doesNotMatch(body, /JOIN classroom_classes c ON c\.teacher_user_id = t\.user_id/);
});

test("GET /school-admin/students dedupes a student who exists in both school_students and legacy classroom_students, preferring school_students", () => {
  const body = handlerBody(serverSource, `router.get("/school-admin/students"`);
  assert.match(body, /NOT EXISTS \(\s*SELECT 1 FROM school_students ss/);
});

test("GET /teacher/groups resolves the teacher's own grade/class directly from classroom_teachers, not via classroom_classes", () => {
  const body = handlerBody(serverSource, `router.get("/teacher/groups"`);
  assert.doesNotMatch(body, /JOIN classroom_classes/);
  assert.match(body, /SELECT t\.school_id, t\.grade, t\.class_number\s*\n\s*FROM classroom_teachers t/);
});
