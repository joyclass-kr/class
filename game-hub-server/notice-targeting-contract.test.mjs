import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const serverSource = await readFile(new URL("./classroom-platform.js", import.meta.url), "utf8");

// Extracts the actual filter callback body used by GET /notice/list and runs
// it for real, rather than just regex-matching the source -- this is a
// viewer-facing access boundary (who can see which notice), so behavior is
// what matters, not merely the presence of some targeting-looking code.
function noticeVisibleTo(notice, viewer) {
  const marker = "const filtered = noticesRes.rows.filter(n => {";
  const start = serverSource.indexOf(marker);
  assert.ok(start !== -1, "GET /notice/list filter not found");
  const bodyStart = start + marker.length;
  const end = serverSource.indexOf("\n    });", bodyStart);
  assert.ok(end !== -1, "GET /notice/list filter close not found");
  const body = serverSource.slice(bodyStart, end);
  const fn = new Function("n", "schoolId", "grade", "classNumber", "studentNumber", body);
  return fn(notice, viewer.schoolId, viewer.grade, viewer.classNumber, viewer.studentNumber);
}

const viewer = { schoolId: 1, grade: 6, classNumber: 2, studentNumber: "99" };

test("a notice targeted at a specific roster of students is hidden from a student not on that list", () => {
  const notice = { school_id: 1, target_type: "students", target_grade: 6, target_class_number: 2, target_student_numbers: "3,4,5" };
  assert.equal(noticeVisibleTo(notice, viewer), false);
});

test("a notice targeted at a different class is hidden even when the school matches", () => {
  const notice = { school_id: 1, target_type: "class", target_grade: 1, target_class_number: 1 };
  assert.equal(noticeVisibleTo(notice, viewer), false);
});

test("a notice from a different school is hidden entirely", () => {
  const notice = { school_id: 2, target_type: "all" };
  assert.equal(noticeVisibleTo(notice, viewer), false);
});

test("a notice targeted at a different grade is hidden", () => {
  const notice = { school_id: 1, target_type: "grade", target_grade: 5 };
  assert.equal(noticeVisibleTo(notice, viewer), false);
});

test("whole-school, matching-grade, matching-class, and correctly-listed-student notices remain visible", () => {
  assert.equal(noticeVisibleTo({ school_id: 1, target_type: "all" }, viewer), true);
  assert.equal(noticeVisibleTo({ school_id: 1, target_type: "grade", target_grade: 6 }, viewer), true);
  assert.equal(noticeVisibleTo({ school_id: 1, target_type: "class", target_grade: 6, target_class_number: 2 }, viewer), true);
  assert.equal(
    noticeVisibleTo({ school_id: 1, target_type: "students", target_grade: 6, target_class_number: 2, target_student_numbers: "3,99" }, viewer),
    true
  );
});
