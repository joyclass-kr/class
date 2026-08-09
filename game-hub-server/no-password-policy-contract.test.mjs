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

test("no leftover reference to the removed password-hashing helper or its undefined default password constant", () => {
  assert.doesNotMatch(serverSource, /hashStudentPassword/);
  assert.doesNotMatch(serverSource, /DEFAULT_STUDENT_PASSWORD/);
});

test("POST /teacher/students/:studentId/reset-access no longer tries to reset a password (this used to crash with a ReferenceError on every call)", () => {
  const body = handlerBody(serverSource, `router.post("/teacher/students/:studentId/reset-access"`);
  assert.doesNotMatch(body, /password_hash/);
  assert.doesNotMatch(body, /initialPassword/);
});

test("PUT /teacher/class no longer computes or stores a password hash when saving the roster (this used to crash on any new student)", () => {
  const body = handlerBody(serverSource, `router.put("/teacher/class"`);
  assert.doesNotMatch(body, /password_hash/);
  assert.doesNotMatch(body, /passwordHash/);
});

test("GET /teacher/class no longer exposes a passwordConfigured field to the client", () => {
  const body = handlerBody(serverSource, `router.get("/teacher/class"`);
  assert.doesNotMatch(body, /password_configured/);
  assert.doesNotMatch(body, /passwordConfigured/);
});
