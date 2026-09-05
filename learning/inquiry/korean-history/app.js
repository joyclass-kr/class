(function () {
  "use strict";

  const DATA = window.HANGUKSA;
  const EXPLANATIONS = window.HANGUKSA_EXPLANATIONS || {};
  const CIRCLED = ["①", "②", "③", "④"];
  const CHUNK_SIZE = 15;

  const PLAYER_NAME_KEY = "classPlayerName";
  const DONE_KEY = "hanguksa-done";
  const LEGACY_SOLVED_KEY = "hanguksa-solved";
  const LEGACY_WRONG_KEY = "hanguksa-wrong";

  const UNITS_META = {
    "prehistoric": { short: "선사·고조선", icon: "🪨", color: "mint" },
    "early-states": { short: "여러 나라", icon: "🌾", color: "yellow" },
    "three-kingdoms": { short: "삼국·가야", icon: "👑", color: "coral" },
    "north-south": { short: "남북국", icon: "🪷", color: "sky" },
    "goryeo": { short: "고려", icon: "🏺", color: "lavender" },
    "joseon-early": { short: "조선 전기", icon: "📜", color: "mint" },
    "joseon-late": { short: "조선 후기", icon: "🎨", color: "yellow" },
    "opening": { short: "개항기", icon: "🚂", color: "coral" },
    "occupation": { short: "일제강점기", icon: "🇰🇷", color: "sky" },
    "contemporary": { short: "현대사", icon: "🏢", color: "lavender" },
    "integrated": { short: "시대 통합", icon: "🗺️", color: "mint" }
  };

  const unitById = new Map(DATA.units.map((u) => [u.id, u]));

  const state = {
    unit: null,
    exam: null,
    hideDone: false,
    onlyWrong: false,
    player: "",
    done: {},
    displayLimit: CHUNK_SIZE
  };

  const els = {
    unitGrid: document.getElementById("unit-grid"),
    examChips: document.getElementById("exam-chips"),
    list: document.getElementById("list"),
    moreWrap: document.getElementById("more-wrap"),
    btnMore: document.getElementById("btn-more"),
    empty: document.getElementById("empty"),
    count: document.getElementById("count"),
    hideDone: document.getElementById("hide-done"),
    onlyWrong: document.getElementById("only-wrong"),
    reset: document.getElementById("reset")
  };

  /* ── 기록 관리 ── */
  function normalizePlayerName(value) {
    const name = String(value || "").replace(/[^가-힣]/g, "").slice(0, 6);
    return /^[가-힣]{2,6}$/.test(name) ? name : "";
  }

  function playerKey(base) {
    return state.player ? base + ":" + encodeURIComponent(state.player) : base;
  }

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      return fallback;
    }
  }

  function resolvePlayer() {
    try {
      const params = new URLSearchParams(location.hash.replace(/^#/, ""));
      const handed = normalizePlayerName(params.get("student"));
      const saved = normalizePlayerName(localStorage.getItem(PLAYER_NAME_KEY));
      state.player = handed || saved;
      if (handed) {
        localStorage.setItem(PLAYER_NAME_KEY, handed);
        history.replaceState(null, "", location.pathname + location.search);
      }
    } catch (err) {
      state.player = "";
    }
  }

  function loadDone() {
    const done = readJson(playerKey(DONE_KEY), null);
    if (done) return done;
    const migrated = {};
    const wrong = new Set(readJson(playerKey(LEGACY_WRONG_KEY), []));
    readJson(playerKey(LEGACY_SOLVED_KEY), []).forEach((id) => {
      migrated[id] = wrong.has(id) ? "wrong" : "right";
    });
    wrong.forEach((id) => { migrated[id] = "wrong"; });
    return migrated;
  }

  function saveDone() {
    try {
      localStorage.setItem(playerKey(DONE_KEY), JSON.stringify(state.done));
    } catch (err) {
      /* 저장이 막혀 있어도 무방 */
    }
  }

  /* ── 고르기 UI 빌드 ── */
  function countBy(pick) {
    return DATA.questions.filter(pick).length;
  }

  function buildUnitGrid() {
    if (!els.unitGrid) return;
    els.unitGrid.textContent = "";

    DATA.units.forEach((u, idx) => {
      const meta = UNITS_META[u.id] || { icon: "📖", color: "mint" };
      const n = countBy((q) => q.unitId === u.id);
      if (n === 0) return;

      const card = document.createElement("button");
      card.type = "button";
      card.className = `unit-card ${meta.color}`;
      card.dataset.value = u.id;
      card.setAttribute("aria-pressed", state.unit === u.id ? "true" : "false");

      const numStr = String(idx + 1).padStart(2, "0");

      card.innerHTML = `
        <div class="unit-card-head">
          <span class="unit-number">${numStr}</span>
          <span class="unit-icon" aria-hidden="true">${meta.icon}</span>
        </div>
        <div class="unit-name">${u.name}</div>
        <div class="unit-details">${n}문제</div>
      `;

      card.addEventListener("click", function () {
        const nextValue = state.unit === u.id ? null : u.id;
        state.unit = nextValue;
        state.displayLimit = CHUNK_SIZE;

        els.unitGrid.querySelectorAll(".unit-card").forEach((c) => {
          c.setAttribute("aria-pressed", c.dataset.value === nextValue ? "true" : "false");
        });

        render();
      });

      els.unitGrid.appendChild(card);
    });
  }

  function makeChip(label, value, active, n) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip";
    btn.dataset.value = value;
    btn.setAttribute("aria-pressed", active ? "true" : "false");
    btn.innerHTML = label + (n == null ? "" : ' <span class="chip-n">' + n + "</span>");
    return btn;
  }

  function buildExamChips() {
    if (!els.examChips) return;
    els.examChips.textContent = "";

    const allBtn = makeChip("전체 회차", "all", state.exam === "all", `${DATA.exams.length}회`);
    els.examChips.appendChild(allBtn);

    DATA.exams.forEach((exam) => {
      const n = countBy((q) => q.exam === exam);
      const chip = makeChip(`${exam}회`, String(exam), state.exam === String(exam), n);
      els.examChips.appendChild(chip);
    });

    els.examChips.addEventListener("click", function (ev) {
      const btn = ev.target.closest(".chip");
      if (!btn) return;
      const val = btn.dataset.value;
      const nextValue = state.exam === val ? null : val;
      state.exam = nextValue;
      state.displayLimit = CHUNK_SIZE;

      els.examChips.querySelectorAll(".chip").forEach((b) => {
        b.setAttribute("aria-pressed", b.dataset.value === nextValue ? "true" : "false");
      });

      render();
    });
  }

  /* ── 문항 필터링 및 렌더링 ── */
  function visibleQuestions() {
    if (!state.unit && !state.exam) {
      return [];
    }

    return DATA.questions.filter((q) => {
      if (state.unit && q.unitId !== state.unit) return false;
      if (state.exam && state.exam !== "all" && String(q.exam) !== state.exam) return false;
      if (state.hideDone && state.done[q.id]) return false;
      if (state.onlyWrong && state.done[q.id] !== "wrong") return false;
      return true;
    });
  }

  function markDone(question, card, right) {
    state.done[question.id] = right ? "right" : "wrong";
    saveDone();
    card.classList.add("is-done");
    card.classList.toggle("is-wrong", !right);
    card.querySelector(".item-mark").textContent = right ? "맞음" : "틀림";
    const items = visibleQuestions();
    updateCount(items, Math.min(state.displayLimit, items.length));
  }

  function buildChoices(question, card) {
    const list = document.createElement("ul");
    list.className = "choices";
    const mark = state.done[question.id];

    CIRCLED.forEach((symbol, i) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice";
      btn.textContent = symbol;
      btn.setAttribute("aria-label", (i + 1) + "번 선택");

      if (mark) {
        btn.disabled = true;
        if (i + 1 === question.answer) btn.classList.add("is-right");
      }

      btn.addEventListener("click", function () {
        const picked = i + 1;
        const right = picked === question.answer;
        list.querySelectorAll(".choice").forEach((b, j) => {
          b.disabled = true;
          if (j + 1 === question.answer) b.classList.add("is-right");
        });
        if (!right) btn.classList.add("is-wrong");
        markDone(question, card, right);
      });

      li.appendChild(btn);
      list.appendChild(li);
    });
    return list;
  }

  function buildAids(question) {
    const note = EXPLANATIONS[question.id];
    if (!note) return document.createDocumentFragment();

    const wrap = document.createElement("div");
    const bar = document.createElement("div");
    bar.className = "aids";

    const body = document.createElement("div");
    body.className = "aid-body";
    body.hidden = true;
    body.innerHTML =
      "<p><b>정답</b>" + note.answerReason + "</p>" +
      "<p><b>핵심</b>" + note.keyPoint + "</p>" +
      "<p><b>오답</b>" + note.wrongReason + "</p>";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "aid-btn";
    btn.textContent = "해설";
    btn.setAttribute("aria-expanded", "false");
    btn.addEventListener("click", function () {
      const open = body.hidden;
      body.hidden = !open;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "해설 접기" : "해설";
    });

    bar.appendChild(btn);
    wrap.append(bar, body);
    return wrap;
  }

  function buildCard(question) {
    const li = document.createElement("li");
    li.className = "item";
    const mark = state.done[question.id];
    if (mark) li.classList.add("is-done");
    if (mark === "wrong") li.classList.add("is-wrong");

    const unit = unitById.get(question.unitId);
    const head = document.createElement("div");
    head.className = "item-head";
    head.innerHTML =
      '<span class="item-src">제' + question.exam + "회 " + question.number + "번</span>" +
      '<span class="item-unit">' + (unit ? unit.name : "") + " · " + question.points + "점</span>" +
      '<span class="item-mark">' + (mark === "right" ? "맞음" : mark === "wrong" ? "틀림" : "") + "</span>";
    li.appendChild(head);

    const fig = document.createElement("div");
    fig.className = "figure";
    const img = document.createElement("img");
    img.src = question.image;
    img.alt = "제" + question.exam + "회 기본 " + question.number + "번 문제";
    img.loading = "lazy";
    img.decoding = "async";

    img.addEventListener("load", function () {
      const ratio = window.devicePixelRatio || 1;
      img.style.setProperty("--native-width", Math.round(img.naturalWidth / ratio) + "px");
    }, { once: true });

    fig.appendChild(img);
    li.appendChild(fig);

    li.appendChild(buildChoices(question, li));
    li.appendChild(buildAids(question));
    return li;
  }

  function updateCount(items, renderedCount) {
    if (!state.unit && !state.exam) {
      els.count.textContent = `총 ${DATA.exams.length}회차 · ${DATA.questions.length}문항`;
      return;
    }
    const solved = items.filter((q) => state.done[q.id]).length;
    const wrong = items.filter((q) => state.done[q.id] === "wrong").length;
    els.count.textContent =
      items.length + "문항" +
      (solved ? " · 푼 것 " + solved : "") +
      (wrong ? " · 틀린 것 " + wrong : "") +
      (renderedCount < items.length ? ` (${renderedCount}/${items.length}개 표시 중)` : "");
  }

  function render() {
    const isFilterSelected = Boolean(state.unit || state.exam);
    const items = visibleQuestions();

    if (!isFilterSelected) {
      els.list.textContent = "";
      els.empty.hidden = true;
      if (els.moreWrap) els.moreWrap.hidden = true;
      updateCount([], 0);
      return;
    }

    if (items.length === 0) {
      els.list.textContent = "";
      els.empty.hidden = false;
      if (els.moreWrap) els.moreWrap.hidden = true;
      updateCount([], 0);
      return;
    }

    els.empty.hidden = true;

    const toShow = items.slice(0, state.displayLimit);
    els.list.textContent = "";
    toShow.forEach((q) => els.list.appendChild(buildCard(q)));

    if (els.moreWrap && els.btnMore) {
      if (items.length > state.displayLimit) {
        els.moreWrap.hidden = false;
        const remain = items.length - state.displayLimit;
        const nextChunk = Math.min(CHUNK_SIZE, remain);
        els.btnMore.textContent = `더 보기 (${nextChunk}개 더 표시 · ${state.displayLimit}/${items.length})`;
      } else {
        els.moreWrap.hidden = true;
      }
    }

    updateCount(items, toShow.length);
  }

  function start() {
    resolvePlayer();
    state.done = loadDone();

    buildUnitGrid();
    buildExamChips();

    if (els.btnMore) {
      els.btnMore.addEventListener("click", function () {
        const items = visibleQuestions();
        const prevLimit = state.displayLimit;
        state.displayLimit += CHUNK_SIZE;
        const newItems = items.slice(prevLimit, state.displayLimit);

        const frag = document.createDocumentFragment();
        newItems.forEach((q) => frag.appendChild(buildCard(q)));
        els.list.appendChild(frag);

        if (items.length > state.displayLimit) {
          els.moreWrap.hidden = false;
          const remain = items.length - state.displayLimit;
          const nextChunk = Math.min(CHUNK_SIZE, remain);
          els.btnMore.textContent = `더 보기 (${nextChunk}개 더 표시 · ${state.displayLimit}/${items.length})`;
        } else {
          els.moreWrap.hidden = true;
        }

        updateCount(items, Math.min(state.displayLimit, items.length));
      });
    }

    els.hideDone.addEventListener("change", function () {
      state.hideDone = els.hideDone.checked;
      state.displayLimit = CHUNK_SIZE;
      render();
    });

    els.onlyWrong.addEventListener("change", function () {
      state.onlyWrong = els.onlyWrong.checked;
      state.displayLimit = CHUNK_SIZE;
      render();
    });

    els.reset.addEventListener("click", function () {
      if (!window.confirm("지금까지 푼 기록을 모두 지울까요?")) return;
      state.done = {};
      saveDone();
      render();
    });

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
