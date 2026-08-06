/* 초5 레벨 문항 세트 검증 — node test-grade5-items.js */
const assert = require("assert");
const { METACOG_ITEMS_G5 } = require("./items-grade5.js");

let passed = 0;
function check(name, fn) {
  fn();
  passed += 1;
  console.log("  ok  " + name);
}

const N = METACOG_ITEMS_G5.length;
const CHANCE_CEILING = Math.floor(N / 3);

check(`문항 ${N}개, 4지선다, 정답 인덱스 유효`, () => {
  METACOG_ITEMS_G5.forEach((item) => {
    assert.strictEqual(item.choices.length, 4, item.id + " 선택지 4개");
    assert.ok(item.answer >= 0 && item.answer < 4, item.id + " 정답 범위");
    assert.notStrictEqual(item.answer, item.lure, item.id + " 유인 답이 정답과 달라야 함");
    assert.ok(item.explain && item.lureWhy, item.id + " 해설 존재");
    assert.ok(["plain", "trap", "looksHard"].includes(item.kind), item.id + " kind 유효");
  });
});

check("문항 id 중복 없음", () => {
  const ids = new Set(METACOG_ITEMS_G5.map((item) => item.id));
  assert.strictEqual(ids.size, METACOG_ITEMS_G5.length);
});

check("kind 구성비: plain 3 이상, trap 6 이상, looksHard 3 이상", () => {
  const count = (kind) => METACOG_ITEMS_G5.filter((item) => item.kind === kind).length;
  assert.ok(count("plain") >= 3, "plain=" + count("plain"));
  assert.ok(count("trap") >= 6, "trap=" + count("trap"));
  assert.ok(count("looksHard") >= 3, "looksHard=" + count("looksHard"));
  assert.strictEqual(count("plain") + count("trap") + count("looksHard"), N);
});

function strategyScore(pick) {
  return METACOG_ITEMS_G5.filter((item, index) => pick(item, index) === item.answer).length;
}

check("정답 위치가 네 자리에 고르게 흩어져 있다", () => {
  const counts = [0, 0, 0, 0];
  METACOG_ITEMS_G5.forEach((item) => {
    counts[item.answer] += 1;
  });
  counts.forEach((count, position) => {
    assert.ok(
      count >= 3 && count <= 6,
      `${position + 1}번이 정답인 문항 ${count}개 — 한쪽으로 쏠렸다 (분포 ${counts.join("/")})`
    );
  });
});

check("‘무조건 n번 찍기’ 전략이 우연을 넘지 못한다", () => {
  [0, 1, 2, 3].forEach((position) => {
    const score = strategyScore(() => position);
    assert.ok(score <= CHANCE_CEILING, `항상 ${position + 1}번 → ${score}/${N} 정답 (허용 ${CHANCE_CEILING})`);
  });
});

check("‘가장 긴 선택지 찍기’ 전략이 우연을 넘지 못한다", () => {
  const score = strategyScore((item) => {
    const lengths = item.choices.map((choice) => choice.length);
    return lengths.indexOf(Math.max(...lengths));
  });
  assert.ok(score <= CHANCE_CEILING, `가장 긴 선택지 → ${score}/${N} 정답 (허용 ${CHANCE_CEILING})`);
});

check("‘가장 짧은 선택지 찍기’ 전략이 우연을 넘지 못한다", () => {
  const score = strategyScore((item) => {
    const lengths = item.choices.map((choice) => choice.length);
    return lengths.indexOf(Math.min(...lengths));
  });
  assert.ok(score <= CHANCE_CEILING, `가장 짧은 선택지 → ${score}/${N} 정답 (허용 ${CHANCE_CEILING})`);
});

check("한 문항 안에서 선택지 길이가 크게 벌어지지 않는다", () => {
  const offenders = [];
  METACOG_ITEMS_G5.forEach((item) => {
    const lengths = item.choices.map((choice) => choice.length);
    const max = Math.max(...lengths);
    const min = Math.min(...lengths);
    if (max > 12 && max > min * 1.5) offenders.push(`${item.id}(${lengths.join("/")})`);
  });
  assert.strictEqual(offenders.length, 0, "길이가 튀는 문항: " + offenders.join(", "));
});

check("정답이 혼자 가장 긴 선택지인 문항이 우연 수준이다", () => {
  const soleLongest = METACOG_ITEMS_G5.filter((item) => {
    const lengths = item.choices.map((choice) => choice.length);
    const max = Math.max(...lengths);
    return lengths[item.answer] === max && lengths.filter((length) => length === max).length === 1;
  });
  assert.ok(
    soleLongest.length <= CHANCE_CEILING,
    `${soleLongest.length}문항 (${soleLongest.map((item) => item.id).join(", ")})`
  );
});

console.log("\n" + passed + "개 검사 통과 (문항 " + N + "개)");
