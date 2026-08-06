/*
 * 메타인지 캘리브레이션 지표 산출 엔진
 *
 * 입력: responses = [{ id, choice, confidence, ms }]
 *       items     = METACOG_ITEMS
 * 출력: 지표 묶음 + 유형 분류 + 규칙 기반 상담 카드
 *
 * 브라우저와 Node 양쪽에서 그대로 돌아간다(테스트용).
 */

(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.MetacogMetrics = api;
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  const BIAS_TOLERANCE = 0.1; // ±10%p 안이면 "조율됨"
  const DISCRIMINATION_GOOD = 0.15; // 정답/오답 확신 차이가 15%p 이상이면 자기 점검이 작동
  const CONFIDENCE_BINS = [25, 50, 75, 100];

  function mean(values) {
    if (!values.length) return null;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  function median(values) {
    if (!values.length) return null;
    const sorted = values.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
  }

  function round(value, digits) {
    if (value === null || value === undefined || Number.isNaN(value)) return null;
    const factor = Math.pow(10, digits === undefined ? 3 : digits);
    return Math.round(value * factor) / factor;
  }

  /** 응답을 문항과 맞춰 채점한다. 미응답 문항은 제외한다. */
  function grade(responses, items) {
    const itemById = new Map(items.map((item) => [item.id, item]));
    return responses
      .filter((response) => itemById.has(response.id))
      .filter((response) => Number.isInteger(response.choice) && CONFIDENCE_BINS.includes(response.confidence))
      .map((response) => {
        const item = itemById.get(response.id);
        return {
          id: item.id,
          domain: item.domain,
          kind: item.kind,
          choice: response.choice,
          correct: response.choice === item.answer,
          tookLure: response.choice === item.lure,
          confidence: response.confidence,
          conf: response.confidence / 100,
          ms: Number.isFinite(response.ms) ? response.ms : null
        };
      });
  }

  /** 확신도 구간별 실제 정답률 — 캘리브레이션 곡선의 원자료 */
  function calibrationCurve(graded) {
    return CONFIDENCE_BINS.map((bin) => {
      const inBin = graded.filter((row) => row.confidence === bin);
      return {
        confidence: bin,
        count: inBin.length,
        accuracy: inBin.length ? inBin.filter((row) => row.correct).length / inBin.length : null,
        gap: inBin.length ? bin / 100 - inBin.filter((row) => row.correct).length / inBin.length : null
      };
    });
  }

  function subgroupBias(graded, predicate) {
    const rows = graded.filter(predicate);
    if (!rows.length) return null;
    const accuracy = rows.filter((row) => row.correct).length / rows.length;
    const confidence = mean(rows.map((row) => row.conf));
    return { n: rows.length, accuracy, confidence, bias: confidence - accuracy };
  }

  function compute(responses, items) {
    const graded = grade(responses, items);
    const n = graded.length;
    if (!n) return null;

    const correctRows = graded.filter((row) => row.correct);
    const wrongRows = graded.filter((row) => !row.correct);

    const accuracy = correctRows.length / n;
    const confidence = mean(graded.map((row) => row.conf));
    const bias = confidence - accuracy;

    const confWhenCorrect = mean(correctRows.map((row) => row.conf));
    const confWhenWrong = mean(wrongRows.map((row) => row.conf));
    const discrimination =
      confWhenCorrect !== null && confWhenWrong !== null ? confWhenCorrect - confWhenWrong : null;

    const curve = calibrationCurve(graded);
    // ECE: 구간별 |확신도 − 실제 정답률|을 문항 수로 가중 평균
    const calibrationError =
      curve.reduce((sum, bin) => (bin.count ? sum + bin.count * Math.abs(bin.gap) : sum), 0) / n;
    // Brier: 낮을수록 좋음. 확신도를 확률로 본 예측 오차.
    const brier = mean(graded.map((row) => Math.pow(row.conf - (row.correct ? 1 : 0), 2)));

    const highConfErrors = graded.filter((row) => !row.correct && row.confidence >= 75);
    const certainErrors = graded.filter((row) => !row.correct && row.confidence === 100);
    const lowConfHits = graded.filter((row) => row.correct && row.confidence <= 50);

    const byKind = {
      trap: subgroupBias(graded, (row) => row.kind === "trap"),
      plain: subgroupBias(graded, (row) => row.kind === "plain"),
      looksHard: subgroupBias(graded, (row) => row.kind === "looksHard")
    };
    const trapPenalty =
      byKind.trap && byKind.plain ? byKind.trap.bias - byKind.plain.bias : null;

    const domains = Array.from(new Set(graded.map((row) => row.domain))).map((domain) => {
      const stats = subgroupBias(graded, (row) => row.domain === domain);
      return Object.assign({ domain }, stats);
    });

    const timedRows = graded.filter((row) => row.ms !== null);
    const pace = {
      median: median(timedRows.map((row) => row.ms)),
      medianOnHighConfErrors: median(
        timedRows.filter((row) => !row.correct && row.confidence >= 75).map((row) => row.ms)
      ),
      medianOnCorrect: median(timedRows.filter((row) => row.correct).map((row) => row.ms))
    };

    return {
      n,
      accuracy,
      confidence,
      bias,
      confWhenCorrect,
      confWhenWrong,
      discrimination,
      calibrationError,
      brier,
      curve,
      highConfErrors,
      certainErrors,
      lowConfHits,
      byKind,
      trapPenalty,
      domains,
      pace,
      graded,
      // 정답률이 우연(25%) 언저리면 확신도 해석 자체가 흔들린다
      lowSignal: accuracy < 0.35
    };
  }

  const PROFILES = {
    unchecked: {
      key: "unchecked",
      name: "브레이크 없는 확신형",
      headline: "확신이 실제 실력보다 크게 앞서 있고, 맞을 때와 틀릴 때의 확신이 거의 같습니다.",
      risk: "high"
    },
    overconfidentSharp: {
      key: "overconfidentSharp",
      name: "아는 건 아는데, 모를 때도 확신형",
      headline: "맞고 틀림을 어느 정도 감지하고 있지만, 전체적으로 확신을 높게 부릅니다.",
      risk: "mid"
    },
    calibrated: {
      key: "calibrated",
      name: "잘 조율된 형",
      headline: "확신의 크기와 실제 정답률이 잘 맞고, 모를 때는 확신을 낮출 줄 압니다.",
      risk: "low"
    },
    blurred: {
      key: "blurred",
      name: "평균은 맞지만 흐릿한 형",
      headline: "전체 평균은 잘 맞는데, 문항 하나하나에서 알고 모름을 가려내지 못합니다.",
      risk: "mid"
    },
    underconfidentSharp: {
      key: "underconfidentSharp",
      name: "실력보다 낮춰 잡는 형",
      headline: "실제로는 잘 맞히면서 스스로를 낮게 평가합니다. 아는 것을 아는 것으로 인정하지 못합니다.",
      risk: "mid"
    },
    withdrawn: {
      key: "withdrawn",
      name: "판단 근거 부족형",
      headline: "확신을 전반적으로 낮게 주고, 맞을 때와 틀릴 때의 차이도 뚜렷하지 않습니다.",
      risk: "mid"
    }
  };

  function classify(result) {
    const over = result.bias > BIAS_TOLERANCE;
    const under = result.bias < -BIAS_TOLERANCE;
    const sharp = result.discrimination !== null && result.discrimination >= DISCRIMINATION_GOOD;

    if (over) return sharp ? PROFILES.overconfidentSharp : PROFILES.unchecked;
    if (under) return sharp ? PROFILES.underconfidentSharp : PROFILES.withdrawn;
    return sharp ? PROFILES.calibrated : PROFILES.blurred;
  }

  /**
   * 규칙 기반 상담 카드.
   * 각 카드는 [발동 조건 → 근거 수치 → 처방]으로 구성된다.
   * 조건에 걸린 것만 나오고, 심각도 순으로 정렬된다.
   */
  function counsel(result, profile) {
    const cards = [];
    const pct = (value) => `${Math.round(value * 100)}%`;
    const pp = (value) => `${value >= 0 ? "+" : "−"}${Math.abs(Math.round(value * 100))}%p`;

    if (result.lowSignal) {
      cards.push({
        severity: 3,
        tag: "해석 주의",
        title: "이번 결과는 참고용으로만 보세요",
        evidence: `정답률이 ${pct(result.accuracy)}로 찍었을 때(25%)와 크게 다르지 않습니다.`,
        action:
          "문항 자체가 어려웠거나 집중이 어려운 상태였을 수 있습니다. 다음번에 시간을 넉넉히 두고 한 번 더 해보고, 두 결과를 나란히 보는 편이 정확합니다."
      });
    }

    if (result.certainErrors.length >= 2) {
      cards.push({
        severity: 5,
        tag: "가장 먼저 고칠 것",
        title: "‘확실해요’라고 한 문항에서 틀렸습니다",
        evidence: `확신 100%를 준 문항 중 ${result.certainErrors.length}개(${result.certainErrors
          .map((row) => row.id)
          .join(", ")})가 오답이었습니다.`,
        action:
          "확신 100%는 ‘틀리면 이상한’ 자리입니다. 앞으로 문제를 풀 때 100%를 주기 전에 “왜 그런지 한 줄로 쓸 수 있나?”를 스스로 물어보세요. 못 쓰면 75%로 내립니다."
      });
    } else if (result.highConfErrors.length >= 3) {
      cards.push({
        severity: 4,
        tag: "주의",
        title: "자신 있게 고른 답에서 틀린 문항이 많습니다",
        evidence: `확신 75% 이상에서 ${result.highConfErrors.length}개(${result.highConfErrors
          .map((row) => row.id)
          .join(", ")})를 틀렸습니다.`,
        action:
          "시험지를 다시 볼 때 ‘자신 있던 문제’부터 검산하세요. 대개는 자신 없던 문제만 다시 보는데, 점수를 갉아먹는 건 그 반대쪽입니다."
      });
    }

    if (result.trapPenalty !== null && result.trapPenalty > 0.15) {
      cards.push({
        severity: 4,
        tag: "직관 제동",
        title: "답이 바로 떠오르는 문제에서 특히 크게 어긋납니다",
        evidence: `함정 문항의 과신 정도(${pp(result.byKind.trap.bias)})가 평범한 문항(${pp(
          result.byKind.plain.bias
        )})보다 훨씬 큽니다.`,
        action:
          "답이 3초 안에 떠오르면 그 문제는 오히려 위험 신호입니다. 떠오른 답을 일단 적어두고, ‘이 답이 틀리려면 어떤 경우여야 하나?’를 한 번 따져본 뒤 확정하세요."
      });
    }

    if (result.lowConfHits.length >= 4) {
      cards.push({
        severity: 3,
        tag: "과소평가",
        title: "찍었다고 생각한 문항을 실제로는 맞혔습니다",
        evidence: `확신 50% 이하로 답한 ${result.lowConfHits.length}개 문항이 정답이었습니다.`,
        action:
          "감으로 고른 게 아니라 근거를 알아채고도 말로 못 옮긴 경우가 많습니다. 답을 고른 뒤 “왜 이걸 골랐지?”를 한 문장으로 적어보면 아는 것이 아는 것으로 바뀝니다."
      });
    }

    if (result.discrimination !== null && result.discrimination < 0.08) {
      cards.push({
        severity: 4,
        tag: "자기 점검",
        title: "맞을 때와 틀릴 때 느낌이 거의 같습니다",
        evidence: `정답일 때 평균 확신 ${pct(result.confWhenCorrect)}, 오답일 때 ${pct(
          result.confWhenWrong
        )} — 차이가 ${pp(result.discrimination)}에 그칩니다.`,
        action:
          "이게 메타인지에서 가장 중요한 신호입니다. 확신도를 매기는 연습 자체가 훈련이 됩니다. 앞으로 문제집을 풀 때 문항 옆에 ○(확실)·△(반반)·?(모름)를 표시하고, 채점 후 △·?에서 몇 개나 맞았는지 세어보세요."
      });
    }

    const worstDomain = result.domains
      .filter((entry) => entry.n >= 3)
      .slice()
      .sort((a, b) => b.bias - a.bias)[0];
    if (worstDomain && worstDomain.bias > 0.2) {
      cards.push({
        severity: 2,
        tag: "영역",
        title: `‘${worstDomain.domain}’ 영역에서 특히 자신을 크게 봅니다`,
        evidence: `${worstDomain.domain} 문항 ${worstDomain.n}개에서 확신 ${pct(
          worstDomain.confidence
        )}, 실제 정답률 ${pct(worstDomain.accuracy)} (${pp(worstDomain.bias)}).`,
        action: `${worstDomain.domain} 공부는 ‘문제를 더 푸는 것’보다 ‘푼 문제를 설명해 보는 것’이 먼저입니다. 오늘 배운 것 중 하나를 골라 다른 사람에게 설명하듯 소리 내어 말해 보세요.`
      });
    }

    if (
      result.pace.medianOnHighConfErrors !== null &&
      result.pace.medianOnCorrect !== null &&
      result.pace.medianOnHighConfErrors < result.pace.medianOnCorrect * 0.6 &&
      result.highConfErrors.length >= 2
    ) {
      cards.push({
        severity: 3,
        tag: "속도",
        title: "틀린 문항일수록 더 빨리 답했습니다",
        evidence: `자신 있게 틀린 문항의 풀이 시간 중앙값 ${Math.round(
          result.pace.medianOnHighConfErrors / 1000
        )}초 vs 맞힌 문항 ${Math.round(result.pace.medianOnCorrect / 1000)}초.`,
        action:
          "빨리 푼 문제가 곧 아는 문제는 아닙니다. 답을 고른 뒤 ‘열까지 세기’를 규칙으로 넣어 보세요. 그 사이에 다른 선택지를 한 번씩 다시 읽습니다."
      });
    }

    if (profile.key === "calibrated" && cards.length === 0) {
      cards.push({
        severity: 1,
        tag: "유지",
        title: "지금 하고 있는 방식을 유지하세요",
        evidence: `과신 정도 ${pp(result.bias)}, 정답·오답 확신 차이 ${pp(
          result.discrimination
        )}로 둘 다 좋은 범위에 있습니다.`,
        action:
          "다음 단계는 더 어려운 재료에서도 이 감각이 유지되는지 보는 것입니다. 한 단계 위 난도의 문제로 같은 진단을 한 번 더 해보세요."
      });
    }

    return cards.sort((a, b) => b.severity - a.severity);
  }

  /** 2주 실행 계획 — 유형별로 고정된 처방을 돌려준다 */
  const PLANS = {
    unchecked: [
      "1주차: 문제를 풀 때마다 문항 옆에 ○·△·? 표시하기. 채점 뒤 ○인데 틀린 문항만 오답노트에 옮기기.",
      "1주차: ‘확실해요’는 하루에 다섯 번만 쓸 수 있다고 정해 두기. 아껴 쓰면 기준이 생깁니다.",
      "2주차: ○ 표시한 문항 중 하나를 골라, 답의 근거를 한 문장으로 적기. 못 적으면 그건 ○가 아니었던 것.",
      "2주차 끝: 같은 진단을 한 번 더 하고 ‘○인데 틀린 개수’가 줄었는지만 비교하기."
    ],
    overconfidentSharp: [
      "1주차: 자신 있던 문제부터 검산하는 순서로 바꾸기.",
      "1주차: 답이 3초 안에 떠오른 문항에 별표를 치고, 그 문항만 다시 읽기.",
      "2주차: 틀린 문항을 ‘몰라서 틀림 / 알았는데 실수 / 함정에 걸림’ 세 가지로 나눠 세어 보기.",
      "2주차 끝: 세 가지 중 어느 쪽이 가장 많았는지 한 줄로 적기."
    ],
    blurred: [
      "1주차: 모든 문항에 ○·△·? 표시를 빠짐없이 남기기. 표시 자체가 목표입니다.",
      "1주차: 채점 후 △와 ? 문항의 정답률을 세어 보기.",
      "2주차: ? 표시한 문항 중 맞힌 것을 골라, 어떤 단서로 골랐는지 적기.",
      "2주차 끝: ○의 정답률과 ?의 정답률 차이가 벌어졌는지 확인하기."
    ],
    underconfidentSharp: [
      "1주차: 답을 고친 흔적을 남기고, 처음 답과 고친 답 중 어느 쪽이 정답이었는지 세어 보기.",
      "1주차: 확신 50% 이하로 답한 문항 중 맞힌 것에 형광펜 치기.",
      "2주차: 형광펜 친 문항의 근거를 한 문장씩 적기 — 대개 근거는 이미 알고 있습니다.",
      "2주차 끝: ‘아는데 자신 없던’ 문항이 몇 개였는지 세어 보고, 그 수만큼 스스로 인정해 주기."
    ],
    withdrawn: [
      "1주차: 쉬운 문제집으로 시작해 정답률을 눈으로 확인하기. 근거 없는 불안은 자료로 눌러야 합니다.",
      "1주차: 모든 문항에 확신 표시를 남기되, ‘그냥 찍음’은 정말 아무 단서도 없을 때만 쓰기.",
      "2주차: 맞힌 문항 중 확신이 낮았던 것을 골라 근거를 말로 설명하기.",
      "2주차 끝: 같은 진단을 다시 하고 평균 확신이 올라갔는지 보기."
    ],
    calibrated: [
      "1주차: 지금 방식대로 계속하되, 한 단계 어려운 문제집에서도 ○·△·? 표시를 유지하기.",
      "1주차: 어려운 재료에서 ○의 정답률이 떨어지는지 확인하기.",
      "2주차: 친구의 문제 풀이를 보고 어디서 확신이 어긋나는지 짚어 주기 — 설명이 가장 좋은 훈련입니다.",
      "2주차 끝: 난도를 올렸을 때도 과신이 10%p 안에 머무는지 확인하기."
    ]
  };

  function analyze(responses, items) {
    const result = compute(responses, items);
    if (!result) return null;
    const profile = classify(result);
    return {
      metrics: result,
      profile,
      cards: counsel(result, profile),
      plan: PLANS[profile.key],
      summary: {
        n: result.n,
        accuracy: round(result.accuracy),
        confidence: round(result.confidence),
        bias: round(result.bias),
        discrimination: round(result.discrimination),
        calibrationError: round(result.calibrationError),
        brier: round(result.brier),
        highConfErrorCount: result.highConfErrors.length,
        certainErrorCount: result.certainErrors.length,
        lowConfHitCount: result.lowConfHits.length,
        trapPenalty: round(result.trapPenalty),
        profileKey: profile.key
      }
    };
  }

  return {
    analyze,
    compute,
    classify,
    counsel,
    grade,
    calibrationCurve,
    round,
    BIAS_TOLERANCE,
    DISCRIMINATION_GOOD,
    CONFIDENCE_BINS,
    PROFILES,
    PLANS
  };
});
