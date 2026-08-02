import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const serverSource = await readFile(new URL("./classroom-platform.js", import.meta.url), "utf8");
const pageSource = await readFile(new URL("../classtools/profile.html", import.meta.url), "utf8");

test("student profile changes are scoped to the signed-in student", () => {
  assert.match(serverSource, /router\.patch\("\/student\/profile"/);
  assert.match(serverSource, /WHERE user_id = \$1/);
  assert.match(serverSource, /birthday_visible = \$3/);
});

test("student password changes verify the current password and store a hash", () => {
  assert.match(serverSource, /router\.patch\("\/student\/password"/);
  assert.match(serverSource, /verifyStudentPassword\(currentPassword, student\.password_hash\)/);
  assert.match(serverSource, /hashStudentPassword\(newPassword\)/);
  assert.doesNotMatch(serverSource, /SET password_hash = newPassword/);
  assert.match(serverSource, /existingPassword\?\.passwordHash \|\| hashStudentPassword\(DEFAULT_STUDENT_PASSWORD\)/);
});

test("student profile screen confirms the new password and explains birthday choice", () => {
  assert.match(pageSource, /id="confirmPassword"/);
  assert.match(pageSource, /공개하지 않아도 학습과 학급 활동에는 아무런 불이익이 없습니다/);
  assert.match(pageSource, /newPassword\.value!==confirmPassword\.value/);
});

test("teacher roster cannot overwrite student-managed birthday or password", async () => {
  const rosterSource = await readFile(new URL("../classtools/roster.html", import.meta.url), "utf8");
  assert.match(rosterSource, /id="birthdates" disabled/);
  assert.match(rosterSource, /id="birthday-visible" disabled/);
  assert.match(rosterSource, /id="passwords" disabled/);
  assert.match(serverSource, /existingPassword\?\.birthdayMmdd \|\| null/);
  assert.match(serverSource, /existingPassword\?\.passwordHash \|\| hashStudentPassword\(DEFAULT_STUDENT_PASSWORD\)/);
  assert.doesNotMatch(serverSource, /student\.birthdayMmdd \|\| null, student\.birthdayVisible/);
});
