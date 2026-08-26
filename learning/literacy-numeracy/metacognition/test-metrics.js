/* 지표 엔진 검증 — node test-metrics.js */
const assert = require("assert");
const { METACOG_ITEMS, CONFIDENCE_LEVELS } = require("./items.js");
const M = require("./metrics.js");

let passed = 0;
function check(name, fn) {
  fn();
  passed += 1;
  console.log("  ok  " + name);
}

/* 문항 세트 자체의 정합성 */
check("문항 24개, 4지선다, 정답 인덱스 유효", () => {
  assert.strictEqual(METACOG_ITEMS.length, 24);
  METACOG_ITEMS.forEach((item) => {
    assert.strictEqual(item.choices.length, 4, item.id + " 선택지 4개");
    assert.ok(item.answer >= 0 && item.answer < 4, item.id + " 정답 범위");
    assert.notStrictEqual(item.answer, item.lure, item.id + " 유인 답이 정답과 달라야 함");
    assert.ok(item.explain && item.lureWhy, item.id + " 해설 존재");
    assert.ok(["plain", "trap", "looksHard"].includes(item.kind), item.id + " kind 유효");
  });
});

check("문항 id 중복 없음", () => {
  const ids = new Set(METACOG_ITEMS.map((item) => item.id));
  assert.strictEqual(ids.size, METACOG_ITEMS.length);
});

check("kind 구성비: plain 6 이상, trap 10 이상, looksHard 5 이상", () => {
  const count = (kind) => METACOG_ITEMS.filter((item) => item.kind === kind).length;
  assert.ok(count("plain") >= 6, "plain=" + count("plain"));
  assert.ok(count("trap") >= 10, "trap=" + count("trap"));
  assert.ok(count("looksHard") >= 5, "looksHard=" + count("looksHard"));
  assert.strictEqual(count("plain") + count("trap") + count("looksHard"), METACOG_ITEMS.length);
});

/* ── 내용을 몰라도 맞히는 요령이 통하지 않아야 한다 ──────────────
 * 요령으로 맞힌 정답이 섞이면 정답률이 부풀고, 그만큼 과신 지표가 실제보다
 * 작게 나온다. 아래 검사는 그 구멍을 막는 것이 목적이다. 기준은 우연 정답률
 * 25%에 문항 수가 24개인 데서 오는 흔들림을 감안해 33%(8문항)로 잡았다.
 */
const CHANCE_CEILING = Math.floor(METACOG_ITEMS.length / 3); // 8문항 = 33%

function strategyScore(pick) {
  return METACOG_ITEMS.filter((item, index) => pick(item, index) === item.answer).length;
}

check("정답 위치가 네 자리에 고르게 흩어져 있다", () => {
  const counts = [0, 0, 0, 0];
  METACOG_ITEMS.forEach((item) => {
    counts[item.answer] += 1;
  });
  counts.forEach((count, position) => {
    assert.ok(
      count >= 4 && count <= 8,
      `${position + 1}번이 정답인 문항 ${count}개 — 한쪽으로 쏠렸다 (분포 ${counts.join("/")})`
    );
  });
});

check("‘무조건 n번 찍기’ 전략이 우연을 넘지 못한다", () => {
  [0, 1, 2, 3].forEach((position) => {
    const score = strategyScore(() => position);
    assert.ok(
      score <= CHANCE_CEILING,
      `항상 ${position + 1}번 → ${score}/${METACOG_ITEMS.length} 정답 (허용 ${CHANCE_CEILING})`
    );
  });
});

check("‘가장 긴 선택지 찍기’ 전략이 우연을 넘지 못한다", () => {
  const score = strategyScore((item) => {
    const lengths = item.choices.map((choice) => choice.length);
    return lengths.indexOf(Math.max(...lengths));
  });
  assert.ok(
    score <= CHANCE_CEILING,
    `가장 긴 선택지 → ${score}/${METACOG_ITEMS.length} 정답 (허용 ${CHANCE_CEILING})`
  );
});

check("‘가장 짧은 선택지 찍기’ 전략이 우연을 넘지 못한다", () => {
  const score = strategyScore((item) => {
    const lengths = item.choices.map((choice) => choice.length);
    return lengths.indexOf(Math.min(...lengths));
  });
  assert.ok(
    score <= CHANCE_CEILING,
    `가장 짧은 선택지 → ${score}/${METACOG_ITEMS.length} 정답 (허용 ${CHANCE_CEILING})`
  );
});

check("한 문항 안에서 선택지 길이가 크게 벌어지지 않는다", () => {
  const offenders = [];
  METACOG_ITEMS.forEach((item) => {
    const lengths = item.choices.map((choice) => choice.length);
    const max = Math.max(...lengths);
    const min = Math.min(...lengths);
    // 짧은 낱말형 선택지(최장 12자 이하)는 몇 글자 차이가 단서가 되지 않는다
    if (max > 12 && max > min * 1.5) offenders.push(`${item.id}(${lengths.join("/")})`);
  });
  assert.strictEqual(offenders.length, 0, "길이가 튀는 문항: " + offenders.join(", "));
});

check("정답이 혼자 가장 긴 선택지인 문항이 우연 수준이다", () => {
  const soleLongest = METACOG_ITEMS.filter((item) => {
    const lengths = item.choices.map((choice) => choice.length);
    const max = Math.max(...lengths);
    return lengths[item.answer] === max && lengths.filter((length) => length === max).length === 1;
  });
  assert.ok(
    soleLongest.length <= CHANCE_CEILING,
    `${soleLongest.length}문항 (${soleLongest.map((item) => item.id).join(", ")})`
  );
});

check("확신도 척도가 지표 엔진의 구간과 일치", () => {
  assert.deepStrictEqual(
    CONFIDENCE_LEVELS.map((level) => level.value).sort((a, b) => a - b),
    M.CONFIDENCE_BINS.slice().sort((a, b) => a - b)
  );
});

/* 시나리오 생성기 */
function respond(rule) {
  return METACOG_ITEMS.map((item, index) => {
    const spec = rule(item, index);
    return {
      id: item.id,
      choice: spec.correct ? item.answer : (item.answer + 1) % 4,
      confidence: spec.confidence,
      ms: spec.ms === undefined ? 8000 : spec.ms
    };
  });
}

check("완벽한 조율: bias ≈ 0, calibrated 유형", () => {
  // 확신 100 문항 4개는 4개 다, 75 문항 8개는 6개, 50 문항 8개는 4개, 25 문항 4개는 1개 정답
  // → 구간별 실제 정답률이 확신도와 정확히 일치한다 (bias = 0)
  const plan = [
    { confidence: 100, total: 4, correct: 4 },
    { confidence: 75, total: 8, correct: 6 },
    { confidence: 50, total: 8, correct: 4 },
    { confidence: 25, total: 4, correct: 1 }
  ];
  const slots = [];
  plan.forEach((group) => {
    for (let i = 0; i < group.total; i += 1) {
      slots.push({ confidence: group.confidence, correct: i < group.correct });
    }
  });
  assert.strictEqual(slots.length, METACOG_ITEMS.length);
  const responses = METACOG_ITEMS.map((item, index) => ({
    id: item.id,
    choice: slots[index].correct ? item.answer : (item.answer + 1) % 4,
    confidence: slots[index].confidence,
    ms: 9000
  }));
  const out = M.analyze(responses, METACOG_ITEMS);
  assert.ok(Math.abs(out.metrics.bias) < 0.02, "bias=" + out.metrics.bias);
  assert.ok(out.metrics.discrimination > 0.15, "disc=" + out.metrics.discrimination);
  assert.strictEqual(out.profile.key, "calibrated");
});

check("과신·저변별: unchecked 유형 + 확신 100 오답 카드", () => {
  const responses = respond((item, index) => ({ confidence: 100, correct: index % 2 === 0 }));
  const out = M.analyze(responses, METACOG_ITEMS);
  assert.ok(out.metrics.bias > 0.4, "bias=" + out.metrics.bias);
  assert.strictEqual(out.metrics.discrimination, 0, "확신이 모두 같으면 변별도 0");
  assert.strictEqual(out.profile.key, "unchecked");
  assert.ok(out.cards.some((card) => card.title.includes("‘확실해요’")));
  assert.ok(out.cards.some((card) => card.tag === "자기 점검"));
});

check("과소평가·고변별: underconfidentSharp + 저확신 정답 카드", () => {
  const responses = respond((item, index) => ({
    correct: index % 6 !== 0, // 정답률 약 83%
    confidence: index % 6 !== 0 ? 50 : 25
  }));
  const out = M.analyze(responses, METACOG_ITEMS);
  assert.ok(out.metrics.bias < -0.3, "bias=" + out.metrics.bias);
  assert.ok(out.metrics.discrimination >= 0.15, "disc=" + out.metrics.discrimination);
  assert.strictEqual(out.profile.key, "underconfidentSharp");
  assert.ok(out.cards.some((card) => card.tag === "과소평가"));
});

check("함정 문항에서만 과신하면 직관 제동 카드가 뜬다", () => {
  const responses = respond((item) =>
    item.kind === "trap"
      ? { correct: false, confidence: 100 }
      : { correct: true, confidence: 75 }
  );
  const out = M.analyze(responses, METACOG_ITEMS);
  assert.ok(out.metrics.trapPenalty > 0.15, "trapPenalty=" + out.metrics.trapPenalty);
  assert.ok(out.cards.some((card) => card.tag === "직관 제동"));
});

check("전부 정답이면 변별도는 null, 오류 없이 리포트가 나온다", () => {
  const responses = respond(() => ({ correct: true, confidence: 100 }));
  const out = M.analyze(responses, METACOG_ITEMS);
  assert.strictEqual(out.metrics.discrimination, null);
  assert.strictEqual(out.metrics.bias, 0);
  assert.strictEqual(out.profile.key, "blurred"); // 변별도를 잴 수 없으면 '흐릿함'으로 분류
  assert.ok(Array.isArray(out.plan) && out.plan.length === 4);
});

check("우연 수준 정답률이면 해석 주의 카드가 붙는다", () => {
  const responses = respond((item, index) => ({ correct: index % 4 === 0, confidence: 50 }));
  const out = M.analyze(responses, METACOG_ITEMS);
  assert.strictEqual(out.metrics.lowSignal, true);
  assert.ok(out.cards.some((card) => card.tag === "해석 주의"));
});

check("빠르게 틀린 경우 속도 카드가 붙는다", () => {
  const responses = respond((item, index) => {
    const wrong = index % 3 === 0;
    return { correct: !wrong, confidence: wrong ? 100 : 75, ms: wrong ? 3000 : 20000 };
  });
  const out = M.analyze(responses, METACOG_ITEMS);
  assert.ok(out.cards.some((card) => card.tag === "속도"), "속도 카드 없음");
});

check("미응답·잘못된 확신값은 계산에서 제외된다", () => {
  const responses = respond(() => ({ correct: true, confidence: 100 }));
  responses[0].choice = null;
  responses[1].confidence = 60; // 척도에 없는 값
  responses[2].confidence = null;
  const out = M.analyze(responses, METACOG_ITEMS);
  assert.strictEqual(out.metrics.n, 21);
});

check("응답이 하나도 없으면 null", () => {
  assert.strictEqual(M.analyze([], METACOG_ITEMS), null);
});

check("캘리브레이션 곡선의 구간 합이 전체 문항 수와 같다", () => {
  const responses = respond((item, index) => ({
    correct: index % 2 === 0,
    confidence: M.CONFIDENCE_BINS[index % 4]
  }));
  const out = M.analyze(responses, METACOG_ITEMS);
  const total = out.metrics.curve.reduce((sum, bin) => sum + bin.count, 0);
  assert.strictEqual(total, out.metrics.n);
  out.metrics.curve.forEach((bin) => {
    if (bin.count) assert.ok(bin.accuracy >= 0 && bin.accuracy <= 1);
  });
});

check("모든 유형에 2주 실행 계획이 정의돼 있다", () => {
  Object.keys(M.PROFILES).forEach((key) => {
    assert.ok(Array.isArray(M.PLANS[key]) && M.PLANS[key].length >= 4, key + " 계획 누락");
  });
});

console.log("\n" + passed + "개 검사 통과");
