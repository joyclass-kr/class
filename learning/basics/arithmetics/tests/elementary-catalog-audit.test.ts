import assert from "node:assert/strict";
import test from "node:test";

import { arithmeticWorksheetCatalog } from "../lib/arithmetic-worksheets.ts";

test("초1 학습지는 실제 유형명과 암산 표시를 구분한다", () => {
  const gradeOne = arithmeticWorksheetCatalog.filter(({ grade }) => grade === "초1");
  assert.deepEqual(gradeOne.map(({ title }) => title), [
    "1부터 9까지 수 세기",
    "한 자리 수 덧셈·뺄셈",
    "받아올림·받아내림 없는 두 자리 수 계산",
    "주고받은 뒤의 수 구하기",
    "10 모으기·가르기",
    "10을 넘는 덧셈·뺄셈",
    "덧셈·뺄셈 빈칸 채우기",
    "두 자리 수 읽기",
    "여러 간격으로 뛰어 세기",
  ]);
  assert.deepEqual(
    gradeOne.filter(({ badge }) => badge === "암산").map(({ name }) => name),
    ["1덧셈뺄셈①", "1덧셈뺄셈②", "1보수", "1덧셈뺄셈③", "1덧셈뺄셈④", "1뛰어세기"],
  );
});

