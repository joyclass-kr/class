/*
 * 메타인지 진단 — 화면 흐름과 리포트 렌더링
 *
 * 진행 중에는 정오 피드백을 절대 노출하지 않는다. 중간 피드백이 들어가면
 * 이후 문항의 확신도가 오염되어 캘리브레이션 지표가 성립하지 않는다.
 */
(function () {
  "use strict";

  // 학년별 페이지는 app.js를 불러오기 전에 window.METACOG_ITEM_SET_VERSION /
  // window.METACOG_LEVEL_KEY를 지정해 둔다. 지정이 없으면(기존 index.html) 원래 값 그대로다.
  const ITEM_SET_VERSION = (typeof window !== "undefined" && window.METACOG_ITEM_SET_VERSION) || "metacog-v2";
  const LEVEL_SUFFIX = typeof window !== "undefined" && window.METACOG_LEVEL_KEY ? "-" + window.METACOG_LEVEL_KEY : "";
  const PROGRESS_KEY = "metacog-progress-v1" + LEVEL_SUFFIX;
  const RESULT_KEY = "metacog-results-v1" + LEVEL_SUFFIX;

  const items = METACOG_ITEMS;

  /*
   * 선택지 순서를 학생마다 섞는다.
   * items.js 안에서 정답 위치와 선택지 길이를 이미 고르게 맞춰 두었지만,
   * 그것만으로는 "3번이 답이래"가 교실에서 옆으로 퍼지는 것을 막지 못한다.
   * orders[i]는 화면에 보이는 순서대로 담긴 '원래 선택지 번호'다.
   * 저장·채점은 언제나 원래 번호로 하므로 서버 쪽 코드는 이 섞기를 몰라도 된다.
   */
  function shuffledOrder(length) {
    const order = Array.from({ length: length }, (_, index) => index);
    for (let i = order.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const swap = order[i];
      order[i] = order[j];
      order[j] = swap;
    }
    return order;
  }

  function freshOrders() {
    return items.map((item) => shuffledOrder(item.choices.length));
  }

  function validOrders(candidate) {
    return (
      Array.isArray(candidate) &&
      candidate.length === items.length &&
      candidate.every((order, index) => {
        const size = items[index].choices.length;
        return (
          Array.isArray(order) &&
          order.length === size &&
          order.slice().sort((a, b) => a - b).every((value, position) => value === position)
        );
      })
    );
  }

  const state = {
    index: 0,
    responses: items.map((item) => ({ id: item.id, choice: null, confidence: null, ms: 0 })),
    orders: freshOrders(),
    shownAt: 0,
    analysis: null
  };

  const el = (id) => document.getElementById(id);
  const view = {
    intro: el("introView"),
    quiz: el("quizView"),
    report: el("reportView")
  };

  /* ── 진행 상황 임시 저장 ───────────────────────────────── */
  function saveProgress() {
    try {
      localStorage.setItem(
        PROGRESS_KEY,
        JSON.stringify({
          version: ITEM_SET_VERSION,
          index: state.index,
          responses: state.responses,
          orders: state.orders
        })
      );
    } catch (_) {
      /* 저장 실패는 진단 진행을 막지 않는다 */
    }
  }

  function clearProgress() {
    try {
      localStorage.removeItem(PROGRESS_KEY);
    } catch (_) {}
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem(PROGRESS_KEY);
      if (!raw) return null;
      const saved = JSON.parse(raw);
      if (!saved || saved.version !== ITEM_SET_VERSION) return null;
      if (!Array.isArray(saved.responses) || saved.responses.length !== items.length) return null;
      return saved;
    } catch (_) {
      return null;
    }
  }

  /* ── 문항 렌더링 ───────────────────────────────────────── */
  function renderQuestion() {
    const item = items[state.index];
    const response = state.responses[state.index];

    el("qIndex").textContent = String(state.index + 1);
    el("qTotal").textContent = String(items.length);
    el("qDomain").textContent = item.domain;
    el("qPrompt").textContent = item.prompt;

    const answered = state.responses.filter((row) => row.choice !== null && row.confidence !== null).length;
    const percent = Math.round((answered / items.length) * 100);
    el("progressFill").style.width = percent + "%";
    el("progressBar").setAttribute("aria-valuenow", String(percent));

    const choiceGroup = el("choiceGroup");
    choiceGroup.innerHTML = "";
    // 화면 순서는 섞여 있지만, 저장하는 값은 언제나 원래 선택지 번호다
    state.orders[state.index].forEach((originalIndex, displayIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-btn";
      button.setAttribute("role", "radio");
      button.setAttribute("aria-checked", response.choice === originalIndex ? "true" : "false");
      button.innerHTML =
        '<span class="choice-num">' + (displayIndex + 1) + "</span><span></span>";
      button.lastChild.textContent = item.choices[originalIndex];
      button.addEventListener("click", () => {
        response.choice = originalIndex;
        renderQuestion();
        saveProgress();
      });
      choiceGroup.appendChild(button);
    });

    const confidenceBlock = el("confidenceBlock");
    confidenceBlock.hidden = response.choice === null;
    const confidenceGroup = el("confidenceGroup");
    confidenceGroup.innerHTML = "";
    CONFIDENCE_LEVELS.forEach((level) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "conf-btn";
      button.setAttribute("role", "radio");
      button.setAttribute("aria-checked", response.confidence === level.value ? "true" : "false");
      const strong = document.createElement("strong");
      strong.textContent = level.label;
      const small = document.createElement("small");
      small.textContent = level.sub;
      button.appendChild(strong);
      button.appendChild(small);
      button.addEventListener("click", () => {
        response.confidence = level.value;
        renderQuestion();
        saveProgress();
      });
      confidenceGroup.appendChild(button);
    });

    el("prevBtn").disabled = state.index === 0;
    const ready = response.choice !== null && response.confidence !== null;
    const nextBtn = el("nextBtn");
    nextBtn.disabled = !ready;
    nextBtn.textContent = state.index === items.length - 1 ? "결과 보기" : "다음 →";

    state.shownAt = Date.now();
  }

  function recordTime() {
    if (!state.shownAt) return;
    state.responses[state.index].ms += Date.now() - state.shownAt;
    state.shownAt = 0;
  }

  function goTo(nextIndex) {
    recordTime();
    state.index = nextIndex;
    renderQuestion();
    saveProgress();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ── SVG 유틸 ──────────────────────────────────────────── */
  const SVG_NS = "http://www.w3.org/2000/svg";
  function svgEl(name, attrs) {
    const node = document.createElementNS(SVG_NS, name);
    Object.keys(attrs || {}).forEach((key) => node.setAttribute(key, attrs[key]));
    return node;
  }

  function makeTooltip(holder) {
    holder.style.position = "relative";
    const tip = document.createElement("div");
    tip.className = "chart-tooltip";
    Object.assign(tip.style, {
      position: "absolute",
      pointerEvents: "none",
      opacity: "0",
      transition: "opacity 0.12s ease",
      background: "#0b0d14",
      border: "1px solid rgba(255,255,255,0.18)",
      borderRadius: "10px",
      padding: "8px 10px",
      fontSize: "12px",
      lineHeight: "1.5",
      color: "#f8fafc",
      whiteSpace: "nowrap",
      transform: "translate(-50%, -115%)",
      zIndex: "5"
    });
    holder.appendChild(tip);
    return {
      show(x, y, html) {
        tip.innerHTML = html;
        tip.style.left = x + "%";
        tip.style.top = y + "%";
        tip.style.opacity = "1";
      },
      hide() {
        tip.style.opacity = "0";
      }
    };
  }

  /* ── 차트 1: 캘리브레이션 곡선 ─────────────────────────── */
  function renderCalibrationChart(metrics) {
    const holder = el("calibrationChart");
    holder.innerHTML = "";
    const W = 360;
    const H = 250;
    const pad = { top: 16, right: 16, bottom: 40, left: 40 };
    const plotW = W - pad.left - pad.right;
    const plotH = H - pad.top - pad.bottom;
    const x = (value) => pad.left + (value / 100) * plotW;
    const y = (value) => pad.top + plotH - (value / 100) * plotH;

    const svg = svgEl("svg", {
      viewBox: "0 0 " + W + " " + H,
      role: "img",
      "aria-label": "확신도 구간별 실제 정답률"
    });

    [0, 25, 50, 75, 100].forEach((tick) => {
      svg.appendChild(
        svgEl("line", {
          x1: pad.left, x2: pad.left + plotW, y1: y(tick), y2: y(tick),
          stroke: "rgba(255,255,255,0.08)", "stroke-width": 1
        })
      );
    });
    svg.appendChild(
      svgEl("line", {
        x1: pad.left, x2: pad.left + plotW, y1: y(0), y2: y(0),
        stroke: "rgba(255,255,255,0.22)", "stroke-width": 1
      })
    );

    // 기준선(이상적인 상태): 확신 = 실제 정답률
    svg.appendChild(
      svgEl("line", {
        x1: x(0), y1: y(0), x2: x(100), y2: y(100),
        stroke: "#7c879b", "stroke-width": 2, "stroke-dasharray": "5 4", "stroke-linecap": "round"
      })
    );

    // y축 눈금
    [0, 50, 100].forEach((tick) => {
      const label = svgEl("text", {
        x: pad.left - 8, y: y(tick) + 4, "text-anchor": "end",
        fill: "#94a3b8", "font-size": "11", "font-family": "inherit"
      });
      label.textContent = tick + "%";
      svg.appendChild(label);
    });

    // x축 눈금
    METRIC_BINS.forEach((bin) => {
      const label = svgEl("text", {
        x: x(bin), y: pad.top + plotH + 18, "text-anchor": "middle",
        fill: "#94a3b8", "font-size": "11", "font-family": "inherit"
      });
      label.textContent = bin + "%";
      svg.appendChild(label);
    });
    const axisTitle = svgEl("text", {
      x: pad.left + plotW / 2, y: H - 6, "text-anchor": "middle",
      fill: "#64748b", "font-size": "11", "font-family": "inherit"
    });
    axisTitle.textContent = "내가 매긴 확신";
    svg.appendChild(axisTitle);

    const used = metrics.curve.filter((bin) => bin.count > 0);
    if (used.length > 1) {
      svg.appendChild(
        svgEl("polyline", {
          points: used.map((bin) => x(bin.confidence) + "," + y(bin.accuracy * 100)).join(" "),
          fill: "none", stroke: "#06b6d4", "stroke-width": 2,
          "stroke-linejoin": "round", "stroke-linecap": "round"
        })
      );
    }

    const tooltip = makeTooltip(holder);
    used.forEach((bin) => {
      const cx = x(bin.confidence);
      const cy = y(bin.accuracy * 100);
      const radius = Math.min(11, 5 + bin.count * 0.7);
      svg.appendChild(svgEl("circle", { cx: cx, cy: cy, r: radius + 2, fill: "#12141c" }));
      svg.appendChild(svgEl("circle", { cx: cx, cy: cy, r: radius, fill: "#06b6d4" }));
      const hit = svgEl("circle", { cx: cx, cy: cy, r: 18, fill: "transparent", tabindex: "0" });
      hit.setAttribute(
        "aria-label",
        "확신 " + bin.confidence + "퍼센트, " + bin.count + "문항, 실제 정답률 " + Math.round(bin.accuracy * 100) + "퍼센트"
      );
      const html =
        "<strong>확신 " + bin.confidence + "%</strong><br>" +
        bin.count + "문항 · 실제 정답률 " + Math.round(bin.accuracy * 100) + "%<br>" +
        "<span style=\"color:#94a3b8\">차이 " + formatPp(bin.gap) + "</span>";
      const showTip = () => tooltip.show((cx / W) * 100, (cy / H) * 100, html);
      hit.addEventListener("mouseenter", showTip);
      hit.addEventListener("focus", showTip);
      hit.addEventListener("mouseleave", tooltip.hide);
      hit.addEventListener("blur", tooltip.hide);
      svg.appendChild(hit);
    });

    holder.appendChild(svg);

    const empty = metrics.curve.filter((bin) => !bin.count);
    const legend = document.createElement("div");
    legend.className = "chart-legend";
    legend.innerHTML =
      '<span class="legend-item"><span class="legend-swatch" style="background:#06b6d4"></span>내 결과</span>' +
      '<span class="legend-item"><span class="legend-swatch dashed"></span>이상적인 상태(확신 = 정답률)</span>' +
      (empty.length
        ? '<span class="legend-item">' + empty.map((bin) => bin.confidence + "%").join(", ") + " 구간은 답한 문항 없음</span>"
        : "");
    holder.appendChild(legend);
  }

  /* ── 차트 2: 정답·오답 확신 비교 ───────────────────────── */
  function renderDiscriminationChart(metrics) {
    const holder = el("discriminationChart");
    holder.innerHTML = "";
    const W = 360;
    const H = 250;
    const pad = { top: 26, right: 16, bottom: 46, left: 40 };
    const plotW = W - pad.left - pad.right;
    const plotH = H - pad.top - pad.bottom;
    const y = (value) => pad.top + plotH - (value / 100) * plotH;

    const svg = svgEl("svg", {
      viewBox: "0 0 " + W + " " + H,
      role: "img",
      "aria-label": "정답 문항과 오답 문항의 평균 확신 비교"
    });

    [0, 25, 50, 75, 100].forEach((tick) => {
      svg.appendChild(
        svgEl("line", {
          x1: pad.left, x2: pad.left + plotW, y1: y(tick), y2: y(tick),
          stroke: "rgba(255,255,255,0.08)", "stroke-width": 1
        })
      );
      if (tick % 50 === 0) {
        const label = svgEl("text", {
          x: pad.left - 8, y: y(tick) + 4, "text-anchor": "end",
          fill: "#94a3b8", "font-size": "11", "font-family": "inherit"
        });
        label.textContent = tick + "%";
        svg.appendChild(label);
      }
    });

    const bars = [
      { key: "ok", label: "맞힌 문항", mark: "✓", color: "#10b981", value: metrics.confWhenCorrect, count: metrics.graded.filter((r) => r.correct).length },
      { key: "no", label: "틀린 문항", mark: "✕", color: "#ef4444", value: metrics.confWhenWrong, count: metrics.graded.filter((r) => !r.correct).length }
    ];
    const barWidth = 62;
    const slot = plotW / bars.length;
    const tooltip = makeTooltip(holder);

    bars.forEach((bar, barIndex) => {
      const cx = pad.left + slot * (barIndex + 0.5);
      const label = svgEl("text", {
        x: cx, y: pad.top + plotH + 20, "text-anchor": "middle",
        fill: "#94a3b8", "font-size": "12", "font-family": "inherit"
      });
      label.textContent = bar.mark + " " + bar.label;
      svg.appendChild(label);

      if (bar.value === null) {
        const none = svgEl("text", {
          x: cx, y: y(0) - 10, "text-anchor": "middle",
          fill: "#64748b", "font-size": "12", "font-family": "inherit"
        });
        none.textContent = "해당 문항 없음";
        svg.appendChild(none);
        return;
      }

      const value = bar.value * 100;
      const top = y(value);
      const height = Math.max(4, y(0) - top);
      svg.appendChild(
        svgEl("rect", {
          x: cx - barWidth / 2, y: top, width: barWidth, height: height,
          rx: 4, fill: bar.color
        })
      );
      const valueLabel = svgEl("text", {
        x: cx, y: top - 9, "text-anchor": "middle",
        fill: "#f8fafc", "font-size": "15", "font-weight": "700", "font-family": "inherit"
      });
      valueLabel.textContent = Math.round(value) + "%";
      svg.appendChild(valueLabel);

      const hit = svgEl("rect", {
        x: cx - slot / 2, y: pad.top, width: slot, height: plotH,
        fill: "transparent", tabindex: "0"
      });
      hit.setAttribute("aria-label", bar.label + " " + bar.count + "개, 평균 확신 " + Math.round(value) + "퍼센트");
      const html =
        "<strong>" + bar.label + " " + bar.count + "개</strong><br>평균 확신 " + Math.round(value) + "%";
      const showTip = () => tooltip.show((cx / W) * 100, (top / H) * 100, html);
      hit.addEventListener("mouseenter", showTip);
      hit.addEventListener("focus", showTip);
      hit.addEventListener("mouseleave", tooltip.hide);
      hit.addEventListener("blur", tooltip.hide);
      svg.appendChild(hit);
    });

    holder.appendChild(svg);

    const legend = document.createElement("div");
    legend.className = "chart-legend";
    legend.textContent =
      metrics.discrimination === null
        ? "정답 또는 오답 문항이 없어 차이를 계산할 수 없습니다."
        : "두 막대의 차이 " + formatPp(metrics.discrimination) + " · 15%p 이상이면 자기 점검이 잘 작동하는 편입니다.";
    holder.appendChild(legend);
  }

  /* ── 숫자 표기 ─────────────────────────────────────────── */
  const METRIC_BINS = [25, 50, 75, 100];
  function formatPct(value) {
    return value === null || value === undefined ? "—" : Math.round(value * 100) + "%";
  }
  function formatPp(value) {
    if (value === null || value === undefined) return "—";
    const rounded = Math.round(value * 100);
    return (rounded > 0 ? "+" : rounded < 0 ? "−" : "±") + Math.abs(rounded) + "%p";
  }

  /* ── 리포트 ────────────────────────────────────────────── */
  function renderReport(analysis) {
    const metrics = analysis.metrics;
    const profile = analysis.profile;

    const card = el("profileCard");
    card.setAttribute("data-risk", profile.risk);
    el("profileName").textContent = profile.name;
    el("profileHeadline").textContent = profile.headline;

    const biasTone = Math.abs(metrics.bias) <= 0.1 ? "good" : metrics.bias > 0.2 ? "bad" : "warn";
    const discTone =
      metrics.discrimination === null ? "neutral" : metrics.discrimination >= 0.15 ? "good" : metrics.discrimination < 0.08 ? "bad" : "warn";
    const tiles = [
      {
        label: "실제 정답률",
        value: formatPct(metrics.accuracy),
        note: metrics.n + "문항 중 " + Math.round(metrics.accuracy * metrics.n) + "개 정답",
        tone: "neutral"
      },
      {
        label: "내가 매긴 평균 확신",
        value: formatPct(metrics.confidence),
        note: "실제보다 " + (metrics.bias >= 0 ? "높게" : "낮게") + " 잡았습니다",
        tone: "neutral"
      },
      {
        label: "어긋난 정도",
        value: formatPp(metrics.bias),
        note: metrics.bias > 0 ? "확신이 실력보다 앞섬" : metrics.bias < 0 ? "실력보다 자신을 낮춤" : "거의 일치",
        tone: biasTone
      },
      {
        label: "알고 모름을 가려내는 힘",
        value: formatPp(metrics.discrimination),
        note: "맞힐 때와 틀릴 때 확신 차이",
        tone: discTone
      }
    ];
    const statRow = el("statRow");
    statRow.innerHTML = "";
    tiles.forEach((tile) => {
      const node = document.createElement("div");
      node.className = "stat-tile";
      node.setAttribute("data-tone", tile.tone);
      const label = document.createElement("div");
      label.className = "stat-label";
      label.textContent = tile.label;
      const value = document.createElement("div");
      value.className = "stat-value";
      value.textContent = tile.value;
      const note = document.createElement("div");
      note.className = "stat-note";
      note.textContent = tile.note;
      node.append(label, value, note);
      statRow.appendChild(node);
    });

    renderCalibrationChart(metrics);
    renderDiscriminationChart(metrics);

    const cardList = el("counselCards");
    cardList.innerHTML = "";
    if (!analysis.cards.length) {
      const empty = document.createElement("p");
      empty.className = "counsel-action";
      empty.textContent = "특별히 걸리는 신호가 없습니다. 아래 실행 계획대로 유지하세요.";
      cardList.appendChild(empty);
    }
    analysis.cards.forEach((entry) => {
      const node = document.createElement("div");
      node.className = "counsel-card";
      node.setAttribute("data-severity", String(entry.severity));
      const tag = document.createElement("div");
      tag.className = "counsel-tag";
      tag.textContent = entry.tag;
      const title = document.createElement("h4");
      title.className = "counsel-title";
      title.textContent = entry.title;
      const evidence = document.createElement("p");
      evidence.className = "counsel-evidence";
      evidence.textContent = "근거 — " + entry.evidence;
      const action = document.createElement("p");
      action.className = "counsel-action";
      action.textContent = entry.action;
      node.append(tag, title, evidence, action);
      cardList.appendChild(node);
    });

    const planList = el("planList");
    planList.innerHTML = "";
    analysis.plan.forEach((step) => {
      const node = document.createElement("li");
      node.textContent = step;
      planList.appendChild(node);
    });

    renderItemTable(metrics);
  }

  function renderItemTable(metrics) {
    const holder = el("itemTableHolder");
    holder.innerHTML = "";
    const table = document.createElement("table");
    table.className = "item-table";
    table.innerHTML =
      "<thead><tr>" +
      "<th>번호</th><th>영역</th><th>내 확신</th><th>결과</th><th>해설</th>" +
      "</tr></thead>";
    const body = document.createElement("tbody");

    metrics.graded.forEach((row, rowIndex) => {
      const item = items.find((entry) => entry.id === row.id);
      const tr = document.createElement("tr");
      if (!row.correct && row.confidence >= 75) tr.setAttribute("data-flag", "hce");
      else if (row.correct && row.confidence <= 50) tr.setAttribute("data-flag", "lch");

      const num = document.createElement("td");
      num.className = "num";
      num.textContent = String(rowIndex + 1);

      const domain = document.createElement("td");
      domain.textContent = item.domain;

      const conf = document.createElement("td");
      conf.className = "num";
      conf.textContent = row.confidence + "%";

      const mark = document.createElement("td");
      const span = document.createElement("span");
      span.className = "mark " + (row.correct ? "ok" : "no");
      span.textContent = row.correct ? "✓ 정답" : "✕ 오답";
      mark.appendChild(span);

      const explain = document.createElement("td");
      explain.className = "exp-cell";
      explain.textContent = item.explain + (row.tookLure && !row.correct ? " (자주 걸리는 답: " + item.lureWhy + ")" : "");

      tr.append(num, domain, conf, mark, explain);
      body.appendChild(tr);
    });

    table.appendChild(body);
    holder.appendChild(table);

    const note = document.createElement("p");
    note.className = "table-note";
    note.textContent =
      "붉은 줄 = 자신 있게 틀린 문항, 초록 줄 = 자신 없이 맞힌 문항. 이 두 가지가 메타인지를 읽는 핵심 자료입니다.";
    holder.appendChild(note);
  }

  /* ── 저장 ──────────────────────────────────────────────── */
  function buildPayload(analysis) {
    return {
      itemSetVersion: ITEM_SET_VERSION,
      completedAt: new Date().toISOString(),
      responses: state.responses.map((row) => ({
        id: row.id,
        choice: row.choice,
        confidence: row.confidence,
        ms: row.ms
      })),
      summary: analysis.summary
    };
  }

  function saveLocally(payload) {
    try {
      const raw = localStorage.getItem(RESULT_KEY);
      const history = raw ? JSON.parse(raw) : [];
      history.push(payload);
      localStorage.setItem(RESULT_KEY, JSON.stringify(history.slice(-20)));
      return true;
    } catch (_) {
      return false;
    }
  }

  async function saveResult(analysis) {
    const payload = buildPayload(analysis);
    const status = el("saveStatus");
    const storedLocally = saveLocally(payload);

    if (window.location.protocol === "file:") {
      status.setAttribute("data-state", "local");
      status.textContent = storedLocally
        ? "이 기기에만 저장했습니다. 학급 기록으로 남기려면 학습 포털 주소로 접속해 주세요."
        : "결과를 저장하지 못했습니다. 아래 버튼으로 파일을 받아 두세요.";
      return;
    }

    try {
      const response = await fetch("/api/metacognition/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        status.setAttribute("data-state", "ok");
        status.textContent = "결과를 학급 기록에 저장했습니다. 선생님이 확인할 수 있습니다.";
        return;
      }
      const detail = await response.json().catch(() => ({}));
      status.setAttribute("data-state", "local");
      status.textContent =
        (detail.error === "LOGIN_REQUIRED" || response.status === 401
          ? "로그인하지 않아 학급 기록에는 저장하지 못했습니다."
          : "서버에 저장하지 못했습니다.") +
        (storedLocally ? " 이 기기에는 저장해 두었습니다." : "");
    } catch (_) {
      status.setAttribute("data-state", "local");
      status.textContent = storedLocally
        ? "서버에 연결하지 못해 이 기기에만 저장했습니다."
        : "결과를 저장하지 못했습니다. 아래 버튼으로 파일을 받아 두세요.";
    }
  }

  /*
   * 결과 내려받기 — 사람이 읽는 리포트(HTML) 한 장.
   * 화면에 그려진 리포트를 그대로 복사해 담으므로 본 것과 같은 내용이 나온다.
   * 원자료(문항별 응답)는 눈에 보이지 않는 script 블록에 함께 넣는다.
   * 파일 하나만 챙기면 읽는 것과 분석하는 것이 둘 다 되게 하려는 것이다.
   */

  // 스타일시트를 읽지 못하는 환경(파일로 직접 열기 등)에서 쓰는 최소 스타일
  const FALLBACK_EXPORT_CSS = `
:root{--panel-bg:#1a1e2e;--panel-border:rgba(255,255,255,.12);--accent-gold:#ffb54a;
--accent-cyan:#06b6d4;--text-main:#f8fafc;--text-muted:#94a3b8;--text-dim:#64748b;
--correct-green:#10b981;--wrong-red:#ef4444;--grid-line:rgba(255,255,255,.08)}
body{margin:0;padding:24px;background:#12141c;color:var(--text-main);line-height:1.55;
font-family:Pretendard,-apple-system,"Segoe UI",Roboto,sans-serif;word-break:keep-all}
.panel{background:var(--panel-bg);border:1px solid var(--panel-border);border-radius:20px;
padding:22px;margin-bottom:16px}
.panel-title{font-size:17px;font-weight:700;margin:0 0 10px}
.profile-card{border-left:4px solid var(--accent-cyan)}
.profile-card[data-risk="high"]{border-left-color:var(--wrong-red)}
.profile-card[data-risk="mid"]{border-left-color:var(--accent-gold)}
.profile-card[data-risk="low"]{border-left-color:var(--correct-green)}
.profile-tag{font-size:12px;font-weight:700;color:var(--text-dim)}
.profile-name{font-size:24px;font-weight:800;margin:4px 0 8px}
.profile-headline{font-size:15px;color:#dbe3ee;margin:0}
.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px}
.stat-tile{background:var(--panel-bg);border:1px solid var(--panel-border);border-radius:16px;padding:16px}
.stat-label{font-size:12px;color:var(--text-muted)}
.stat-value{font-size:28px;font-weight:800}
.stat-note{font-size:12px;color:var(--text-dim)}
.stat-tile[data-tone="good"] .stat-value{color:var(--correct-green)}
.stat-tile[data-tone="warn"] .stat-value{color:var(--accent-gold)}
.stat-tile[data-tone="bad"] .stat-value{color:var(--wrong-red)}
.chart-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.chart-help{font-size:13px;color:var(--text-muted);margin:0 0 12px}
.chart-holder svg{width:100%;height:auto;display:block}
.chart-legend{display:flex;flex-wrap:wrap;gap:14px;margin-top:10px;font-size:12px;color:var(--text-muted)}
.legend-item{display:inline-flex;align-items:center;gap:6px}
.legend-swatch{width:14px;height:3px;border-radius:2px;display:inline-block}
.legend-swatch.dashed{background:repeating-linear-gradient(90deg,#7c879b 0 4px,transparent 4px 7px)}
.card-list{display:flex;flex-direction:column;gap:12px}
.counsel-card{background:rgba(0,0,0,.25);border-radius:14px;padding:16px 18px;border-left:4px solid var(--accent-cyan)}
.counsel-card[data-severity="5"],.counsel-card[data-severity="4"]{border-left-color:var(--wrong-red)}
.counsel-card[data-severity="3"]{border-left-color:var(--accent-gold)}
.counsel-card[data-severity="1"]{border-left-color:var(--correct-green)}
.counsel-tag{font-size:11px;font-weight:700;color:var(--text-dim)}
.counsel-title{font-size:16px;font-weight:700;margin:3px 0 8px}
.counsel-evidence{font-size:13px;color:var(--accent-cyan);margin:0 0 8px}
.counsel-action{font-size:14.5px;color:#dbe3ee;margin:0}
.plan-list{margin:0 0 0 20px;display:flex;flex-direction:column;gap:9px;font-size:14.5px;color:#dbe3ee}
.item-table{width:100%;border-collapse:collapse;font-size:13.5px;margin-top:12px}
.item-table th,.item-table td{padding:9px 8px;text-align:left;border-bottom:1px solid var(--grid-line);vertical-align:top}
.item-table th{color:var(--text-muted);font-weight:600;font-size:12px}
.item-table td.num{font-variant-numeric:tabular-nums}
.mark{font-weight:700}.mark.ok{color:var(--correct-green)}.mark.no{color:var(--wrong-red)}
.item-table tr[data-flag="hce"]{background:rgba(239,68,68,.09)}
.item-table tr[data-flag="lch"]{background:rgba(16,185,129,.09)}
.table-note{font-size:12px;color:var(--text-dim);margin-top:10px}
.exp-cell{color:var(--text-muted);font-size:13px}
@media (max-width:900px){.stat-row{grid-template-columns:repeat(2,1fr)}.chart-grid{grid-template-columns:1fr}}
`;

  /*
   * 인쇄용 스타일.
   * 화면은 어두운 바탕에 밝은 글씨라 그대로 인쇄하면 흰 종이에 흰 글씨가 된다.
   * 색은 대부분 :root 변수에서 오므로 변수를 밝은 배경용으로 다시 정의하면 한 번에 뒤집힌다.
   * 다만 SVG 차트는 색을 속성으로 직접 갖고 있어 변수가 닿지 않는다. 아래에서 따로 덮는다.
   */
  const PRINT_CSS = `
@media print{
  :root{
    --panel-bg:#ffffff;--panel-border:#d1d5db;--grid-line:#e5e7eb;
    --text-main:#111827;--text-muted:#4b5563;--text-dim:#6b7280;
    --accent-cyan:#0e7490;--accent-gold:#b45309;
    --correct-green:#047857;--wrong-red:#b91c1c;
  }
  body{background:#ffffff;color:#111827;padding:0}
  .panel,.stat-tile{background:#ffffff;border:1px solid #d1d5db;box-shadow:none;break-inside:avoid}
  .counsel-card{background:#f9fafb;break-inside:avoid}
  .profile-headline,.counsel-action,.plan-list,.exp-cell{color:#374151}
  .item-table tr[data-flag="hce"]{background:#fee2e2}
  .item-table tr[data-flag="lch"]{background:#d1fae5}
  .item-table tr,.chart-card{break-inside:avoid}
  .export-hint{display:none}

  svg text[fill="#f8fafc"]{fill:#111827}
  svg text[fill="#94a3b8"],svg text[fill="#64748b"]{fill:#4b5563}
  svg line[stroke="rgba(255,255,255,0.08)"]{stroke:#e5e7eb}
  svg line[stroke="rgba(255,255,255,0.22)"]{stroke:#9ca3af}
  svg circle[fill="#12141c"]{fill:#ffffff}
  svg circle[fill="#06b6d4"]{fill:#0e7490}
  svg polyline[stroke="#06b6d4"]{stroke:#0e7490}
  svg rect[fill="#10b981"]{fill:#047857}
  svg rect[fill="#ef4444"]{fill:#b91c1c}
}
`;

  /** 페이지에 적용된 스타일을 문자열로 뽑는다. 못 뽑으면 최소 스타일로 되돌린다. */
  function collectStyles() {
    try {
      const collected = Array.from(document.styleSheets)
        .map((sheet) => Array.from(sheet.cssRules).map((rule) => rule.cssText).join("\n"))
        .join("\n");
      if (collected.trim().length > 200) return collected;
    } catch (_) {
      // file:// 로 직접 열면 브라우저가 cssRules 접근을 막는다
    }
    return FALLBACK_EXPORT_CSS;
  }

  function escapeForScript(text) {
    return text.replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
  }

  function buildReportHtml(payload) {
    const clone = document.getElementById("reportView").cloneNode(true);
    clone.removeAttribute("hidden");
    // 인쇄본에 필요 없는 조작 요소를 걷어낸다
    const savePanel = clone.querySelector(".save-panel");
    if (savePanel) savePanel.remove();
    const toggle = clone.querySelector("#toggleTableBtn");
    if (toggle) toggle.remove();
    const tableHolder = clone.querySelector("#itemTableHolder");
    if (tableHolder) tableHolder.removeAttribute("hidden"); // 문항별 기록은 펼친 채로
    // 마지막으로 가리켰던 내용이 남아 있는 말풍선과, 마우스만 받는 투명 영역을 걷어낸다
    clone.querySelectorAll(".chart-tooltip").forEach((node) => node.remove());
    clone.querySelectorAll('[fill="transparent"]').forEach((node) => node.remove());
    clone.querySelectorAll("[tabindex]").forEach((node) => node.removeAttribute("tabindex"));

    const completedDate = payload.completedAt.slice(0, 10).replace(/-/g, ".");
    return (
      "<!DOCTYPE html>\n" +
      '<html lang="ko">\n<head>\n<meta charset="UTF-8">\n' +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
      "<title>메타인지 진단 결과 " + completedDate + "</title>\n" +
      "<style>\n" + collectStyles() + "\n" + PRINT_CSS + "\n</style>\n</head>\n<body>\n" +
      '<div style="max-width:900px;margin:0 auto">\n' +
      '<h1 style="font-size:22px;font-weight:800;margin:0 0 4px">메타인지 진단 결과</h1>\n' +
      '<p class="export-hint" style="font-size:13px;color:#64748b;margin:0 0 18px">' +
      completedDate + " · 문항 세트 " + payload.itemSetVersion +
      " · 브라우저에서 인쇄하면 종이로 뽑을 수 있습니다</p>\n" +
      clone.innerHTML +
      "\n</div>\n" +
      '<script type="application/json" id="metacog-raw">' +
      escapeForScript(JSON.stringify(payload)) +
      "<\/script>\n</body>\n</html>\n"
    );
  }

  function saveBlob(content, mimeType, filename) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /*
   * 파일 이름은 반드시 아스키로 짓는다.
   * 한글이 하나라도 들어가면 크로미움이 download 속성의 이름을 통째로 버리고
   * 확장자 없는 "download"로 저장한다. 확장자가 없으면 학생이 파일을 열 수 없다.
   */
  function downloadResult() {
    if (!state.analysis) return;
    const payload = buildPayload(state.analysis);
    saveBlob(
      buildReportHtml(payload),
      "text/html;charset=utf-8",
      "metacognition-report-" + payload.completedAt.slice(0, 10) + ".html"
    );
  }

  function downloadRawData() {
    if (!state.analysis) return;
    const payload = buildPayload(state.analysis);
    saveBlob(
      JSON.stringify(payload, null, 2),
      "application/json",
      "metacognition-raw-" + payload.completedAt.slice(0, 10) + ".json"
    );
  }

  /* ── 화면 전환 ─────────────────────────────────────────── */
  function show(name) {
    view.intro.hidden = name !== "intro";
    view.quiz.hidden = name !== "quiz";
    view.report.hidden = name !== "report";
    document.body.setAttribute("data-mode", name);
  }

  function finish() {
    recordTime();
    const analysis = MetacogMetrics.analyze(state.responses, items);
    if (!analysis) return;
    state.analysis = analysis;
    clearProgress();
    renderReport(analysis);
    show("report");
    window.scrollTo({ top: 0, behavior: "smooth" });
    saveResult(analysis);
  }

  /* ── 이벤트 ────────────────────────────────────────────── */
  el("startBtn").addEventListener("click", () => {
    show("quiz");
    renderQuestion();
  });

  el("prevBtn").addEventListener("click", () => {
    if (state.index > 0) goTo(state.index - 1);
  });

  el("nextBtn").addEventListener("click", () => {
    if (state.index === items.length - 1) finish();
    else goTo(state.index + 1);
  });

  el("toggleTableBtn").addEventListener("click", (event) => {
    const holder = el("itemTableHolder");
    holder.hidden = !holder.hidden;
    event.currentTarget.setAttribute("aria-expanded", String(!holder.hidden));
    event.currentTarget.textContent = holder.hidden ? "펼치기" : "접기";
  });

  el("downloadBtn").addEventListener("click", downloadResult);
  el("rawBtn").addEventListener("click", downloadRawData);

  el("retryBtn").addEventListener("click", () => {
    state.index = 0;
    state.responses = items.map((item) => ({ id: item.id, choice: null, confidence: null, ms: 0 }));
    state.orders = freshOrders();
    state.analysis = null;
    clearProgress();
    show("intro");
    el("restoreNote").hidden = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ── 초기화 ────────────────────────────────────────────── */
  (function init() {
    el("qTotal").textContent = String(items.length);
    const saved = loadProgress();
    if (saved) {
      const answered = saved.responses.filter((row) => row.choice !== null && row.confidence !== null).length;
      if (answered > 0 && answered < items.length) {
        const note = el("restoreNote");
        note.hidden = false;
        note.textContent = "지난번에 " + answered + "문항까지 풀었습니다. ‘진단 시작하기’를 누르면 이어서 진행합니다.";
        state.responses = saved.responses;
        state.index = Math.min(saved.index, items.length - 1);
        // 이어서 풀 때 선택지가 다시 섞이면 학생이 혼란스럽다. 저장된 순서를 그대로 쓴다.
        if (validOrders(saved.orders)) state.orders = saved.orders;
      } else {
        clearProgress();
      }
    }
  })();
})();
