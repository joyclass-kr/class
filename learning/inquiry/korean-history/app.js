(function () {
  "use strict";

  const DATA = window.HANGUKSA;
  const EXPLANATIONS = window.HANGUKSA_EXPLANATIONS || {};
  const CIRCLED = ["①", "②", "③", "④"];

  // 기록은 학생 이름별로 따로 둔다. 이름은 포털이 저장해 두거나 #student= 로 넘겨 준다.
  const PLAYER_NAME_KEY = "classPlayerName";
  const DONE_KEY = "hanguksa-done";
  const LEGACY_SOLVED_KEY = "hanguksa-solved";
  const LEGACY_WRONG_KEY = "hanguksa-wrong";

  const unitById = new Map(DATA.units.map((u) => [u.id, u]));

  const state = {
    unit: "all",
    exam: "all",
    hideDone: false,
    onlyWrong: false,
    player: "",
    done: {}
  };

  const els = {
    unitChips: document.getElementById("unit-chips"),
    examChips: document.getElementById("exam-chips"),
    list: document.getElementById("list"),
    empty: document.getElementById("empty"),
    count: document.getElementById("count"),
    hideDone: document.getElementById("hide-done"),
    onlyWrong: document.getElementById("only-wrong"),
    reset: document.getElementById("reset")
  };

  /* ── 기록 ── */
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

  // 예전 앱은 푼 문제와 틀린 문제를 두 목록으로 따로 적었다. 한 번만 지금 꼴로 옮긴다.
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
      /* 저장이 막혀 있어도 푸는 데는 지장이 없다. */
    }
  }

  /* ── 고르기 줄 ── */
  function countBy(pick) {
    return DATA.questions.filter(pick).length;
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

  function buildUnitChips() {
    const box = els.unitChips;
    box.textContent = "";
    box.appendChild(makeChip("전체", "all", state.unit === "all", DATA.questions.length));
    DATA.units.forEach((u) => {
      const n = countBy((q) => q.unitId === u.id);
      if (n === 0) return;
      box.appendChild(makeChip(u.name, u.id, state.unit === u.id, n));
    });
  }

  function buildExamChips() {
    const box = els.examChips;
    box.textContent = "";
    box.appendChild(makeChip("전체", "all", state.exam === "all", DATA.exams.length + "회차"));
    DATA.exams.forEach((exam) => {
      const n = countBy((q) => q.exam === exam);
      box.appendChild(makeChip(exam + "회", String(exam), state.exam === String(exam), n));
    });
  }

  /* ── 문항 그리기 ── */
  function visibleQuestions() {
    return DATA.questions.filter((q) => {
      if (state.unit !== "all" && q.unitId !== state.unit) return false;
      if (state.exam !== "all" && String(q.exam) !== state.exam) return false;
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
    updateCount();
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
      // 이미 푼 문제는 정답만 보여 주고 다시 고르지 못하게 한다.
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
      '<span class="item-src">' + question.exam + "회 " + question.number + "번</span>" +
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
    // 그림 원본 폭을 CSS에 알려 주어 그보다 크게 늘리지 않는다. 화면 배율(2배 화면)만큼은 나눠 준다.
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

  function updateCount() {
    const shown = visibleQuestions();
    const solved = shown.filter((q) => state.done[q.id]).length;
    const wrong = shown.filter((q) => state.done[q.id] === "wrong").length;
    els.count.textContent =
      shown.length + "문항" +
      (solved ? " · 푼 것 " + solved : "") +
      (wrong ? " · 틀린 것 " + wrong : "");
  }

  function render() {
    const items = visibleQuestions();
    els.list.textContent = "";
    items.forEach((q) => els.list.appendChild(buildCard(q)));
    els.empty.hidden = items.length > 0;
    updateCount();
  }

  /* ── 이어 붙이기 ── */
  function chipHandler(box, key) {
    box.addEventListener("click", function (ev) {
      const btn = ev.target.closest(".chip");
      if (!btn) return;
      state[key] = btn.dataset.value;
      box.querySelectorAll(".chip").forEach((b) => {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      render();
      window.scrollTo({ top: 0 });
    });
  }

  function start() {
    resolvePlayer();
    state.done = loadDone();

    buildUnitChips();
    buildExamChips();
    chipHandler(els.unitChips, "unit");
    chipHandler(els.examChips, "exam");

    els.hideDone.addEventListener("change", function () {
      state.hideDone = els.hideDone.checked;
      render();
    });
    els.onlyWrong.addEventListener("change", function () {
      state.onlyWrong = els.onlyWrong.checked;
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

  start();
})();
