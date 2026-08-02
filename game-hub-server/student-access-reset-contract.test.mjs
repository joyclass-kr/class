import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const serverSource = await readFile(new URL("./classroom-platform.js", import.meta.url), "utf8");
const adminPage = await readFile(new URL("../admin/students.html", import.meta.url), "utf8");

test("student access reset is restricted to administrators and transactional", () => {
  assert.match(serverSource, /router\.post\("\/admin\/students\/:studentId\/reset-access"/);
  assert.match(serverSource, /const admin = await requireAdmin\(req\)/);
  assert.match(serverSource, /WHERE id = \$1\s+FOR UPDATE/);
  assert.match(serverSource, /await client\.query\("BEGIN"\)/);
  assert.match(serverSource, /await client\.query\("COMMIT"\)/);
});

test("reset revokes sessions, unlinks identity, clears optional birthday, and hashes the initial password", () => {
  assert.match(serverSource, /DELETE FROM classroom_sessions WHERE user_id = \$1/);
  assert.match(serverSource, /SET user_id = NULL, claimed_at = NULL/);
  assert.match(serverSource, /birthday_mmdd = NULL, birthday_visible = FALSE/);
  assert.match(serverSource, /hashStudentPassword\(DEFAULT_STUDENT_PASSWORD\)/);
  assert.match(serverSource, /INSERT INTO classroom_student_access_resets/);
});

test("admin recovery screen explains irreversible effects before confirmation", () => {
  assert.match(adminPage, /되돌릴 수 없습니다/);
  assert.match(adminPage, /if\(!confirm\(message\)\)return/);
  assert.match(adminPage, /초기 비밀번호 재발급/);
});
