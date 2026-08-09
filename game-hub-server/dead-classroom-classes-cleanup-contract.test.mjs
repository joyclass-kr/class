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

test("no remaining OAUTH_ONLY password placeholder anywhere -- teacher rows are created with no password_hash at all", () => {
  assert.doesNotMatch(serverSource, /OAUTH_ONLY/);
});

test("GET /admin/schools no longer joins classroom_classes to build a teacher.classroom field nothing reads", () => {
  const body = handlerBody(serverSource, `router.get("/admin/schools"`);
  assert.doesNotMatch(body, /classroom_classes/);
  assert.doesNotMatch(body, /classroom: /);
});

test("POST /teacher/notices no longer joins classroom_classes for grade/class_number it never uses", () => {
  const body = handlerBody(serverSource, `router.post("/teacher/notices"`);
  assert.doesNotMatch(body, /classroom_classes/);
});
