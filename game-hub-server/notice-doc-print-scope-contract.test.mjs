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

test("GET /notice/docs/:formType/:docId (the A4 print form behind the 결재함 print button) resolves the teacher's class from classroom_teachers directly, not classroom_classes", () => {
  const body = handlerBody(serverSource, `router.get("/notice/docs/:formType/:docId"`);
  assert.doesNotMatch(body, /classroom_classes/, "should not depend on classroom_classes being pre-provisioned");
  assert.match(body, /FROM classroom_teachers t/);
  assert.match(body, /t\.user_id = \$3 AND t\.grade = d\.grade AND t\.class_number = d\.class_number/);
});
