import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createAuthenticationFailureLimiter } = require("./classroom-platform.js");
const serverSource = fs.readFileSync(new URL("./server.js", import.meta.url), "utf8");
const platformSource = fs.readFileSync(new URL("./classroom-platform.js", import.meta.url), "utf8");

test("authentication failures are blocked after 30 attempts for 15 minutes", () => {
  let timestamp = 1_000_000;
  const limiter = createAuthenticationFailureLimiter({ now: () => timestamp });
  const request = { ip: "203.0.113.10" };

  for (let attempt = 0; attempt < 29; attempt += 1) {
    limiter.recordFailure(request, "student-join", "class:student-7");
  }
  assert.doesNotThrow(() => limiter.enforce(request, "student-join", "class:student-7"));

  limiter.recordFailure(request, "student-join", "class:student-7");
  assert.throws(
    () => limiter.enforce(request, "student-join", "class:student-7"),
    (error) => error.status === 429 && error.code === "TOO_MANY_AUTH_FAILURES" && error.retryAfterSeconds === 900
  );

  timestamp += 15 * 60 * 1000 + 1;
  assert.doesNotThrow(() => limiter.enforce(request, "student-join", "class:student-7"));
});

test("an account identity cannot bypass the limit by changing IP addresses", () => {
  const limiter = createAuthenticationFailureLimiter();
  const identity = "school:grade:class:student-12";
  for (let attempt = 0; attempt < 30; attempt += 1) {
    limiter.recordFailure({ ip: `198.51.100.${attempt + 1}` }, "student-join", identity);
  }
  const nextRequest = { ip: "192.0.2.200" };
  assert.throws(
    () => limiter.enforce(nextRequest, "student-join", identity),
    (error) => error.status === 429
  );
  limiter.recordSuccess(nextRequest, "student-join", identity);
  assert.doesNotThrow(() => limiter.enforce(nextRequest, "student-join", identity));
});

test("server applies same-origin controls and baseline security headers", () => {
  for (const header of [
    "Content-Security-Policy",
    "Strict-Transport-Security",
    "X-Content-Type-Options",
    "X-Frame-Options",
    "Referrer-Policy",
    "Permissions-Policy"
  ]) {
    assert.match(serverSource, new RegExp(header));
  }
  assert.match(serverSource, /app\.disable\("x-powered-by"\)/);
  assert.match(serverSource, /CROSS_ORIGIN_REQUEST_BLOCKED/);
  assert.match(serverSource, /fetchSite === "cross-site"/);
  assert.doesNotMatch(serverSource, /Access-Control-Allow-Origin", "\*"/);
  assert.match(serverSource, /Cache-Control", "no-store"/);
});

test("Google sign-in is rate-limited by the 30-failure limiter (the only login path -- there is no password verification route to share it with)", () => {
  assert.match(platformSource, /const AUTH_FAILURE_LIMIT = 30/);
  assert.match(platformSource, /const AUTH_FAILURE_WINDOW_MS = 15 \* 60 \* 1000/);
  assert.match(platformSource, /authFailureLimiter\.enforce\(req, "google-sign-in"/);
  assert.doesNotMatch(platformSource, /"student-password"/);
  assert.match(platformSource, /Retry-After/);
});
