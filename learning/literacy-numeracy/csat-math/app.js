(function () {
  "use strict";

  const DATA = window.CSAT_MATH;
  const STORE_KEY = "csat-math-done";
  const CIRCLED = ["①", "②", "③", "④", "⑤"];

  const examById = new Map(DATA.exams.map((e) => [e.id, e]));

  const state = {
    unit: "all",
    exam: "all",
    hideDone: false,
    done: loadDone()
  };

  const els = {
    unitChips: document.getElementById("unit-chips"),
    examSelect: document.getElementById("exam-select"),
    list: document.getElementById("list"),
    empty: document.getElementById("empty"),
    count: document.getElementById("count"),
    hideDone: document.getElementById("hide-done"),
    reset: document.getElementById("reset")
  };

  /* ── 기록 ── */
  function loadDone() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (err) {
      return {};
    }
  }

  function saveDone() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state.done));
    } catch (err) {
      /* 저장이 막혀 있어도 푸는 데는 지장이 없다. */
    }
  }

  /* ── 고르기 줄 ── */
  function countBy(pick) {
    return DATA.problems.filter(pick).length;
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

    let subject = null;
    DATA.units.forEach((u) => {
      if (u.subject !== subject) {
        subject = u.subject;
        const tag = document.createElement("span");
        tag.className = "chip-group-label";
        tag.textContent = subject;
        box.appendChild(tag);
      }
      const n = countBy((p) => p.units.indexOf(u.id) >= 0);
      box.appendChild(makeChip(u.name, u.id, state.unit === u.id, n));
    });
  }

  function buildExamSelect() {
    const sel = els.examSelect;
    if (!sel) return;
    if (DATA.exams.length < 2) {
      sel.closest(".picker-row").hidden = true;
      return;
    }
    sel.textContent = "";

    const optAll = document.createElement("option");
    optAll.value = "all";
    optAll.textContent = `전체 (${DATA.exams.length}회차 · ${DATA.problems.length}문항)`;
    optAll.selected = state.exam === "all";
    sel.appendChild(optAll);

    DATA.exams.forEach((e) => {
      const n = countBy((p) => p.exam === e.id);
      const opt = document.createElement("option");
      opt.value = e.id;
      opt.textContent = `${e.label} (${n}문항)`;
      if (state.exam === e.id) opt.selected = true;
      sel.appendChild(opt);
    });
  }

  /* ── 문항 그리기 ── */
  function visibleProblems() {
    return DATA.problems.filter((p) => {
      if (state.unit !== "all" && p.units.indexOf(state.unit) < 0) return false;
      if (state.exam !== "all" && p.exam !== state.exam) return false;
      if (state.hideDone && state.done[p.id]) return false;
      return true;
    });
  }

  function noteBox(problem) {
    const box = document.createElement("div");
    box.className = "note-box" + (problem.noteTitle ? " has-title" : "");
    if (problem.noteTitle) {
      const title = document.createElement("span");
      title.className = "note-title";
      title.textContent = problem.noteTitle;
      box.appendChild(title);
    }
    const ul = document.createElement("ul");
    if (problem.bullets) ul.className = "has-bullets";
    problem.note.forEach((line) => {
      const li = document.createElement("li");
      li.innerHTML = line;
      ul.appendChild(li);
    });
    box.appendChild(ul);
    return box;
  }

  function markDone(problem, card, right) {
    state.done[problem.id] = right ? "right" : "wrong";
    saveDone();
    card.classList.add("is-done");
    card.querySelector(".item-mark").textContent = right ? "맞음" : "틀림";
    updateCount();
  }

  function buildChoices(problem, card) {
    const list = document.createElement("ul");
    list.className = "choices";
    const short = problem.choices.every((c) => c.length < 30);
    if (short) list.classList.add("is-wide");

    problem.choices.forEach((text, i) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice";
      btn.innerHTML = '<span class="choice-n">' + CIRCLED[i] + "</span><span>" + text + "</span>";
      btn.addEventListener("click", function () {
        const picked = i + 1;
        const right = picked === problem.answer;
        list.querySelectorAll(".choice").forEach((b, j) => {
          b.disabled = true;
          if (j + 1 === problem.answer) b.classList.add("is-right");
        });
        if (!right) btn.classList.add("is-wrong");
        markDone(problem, card, right);
      });
      li.appendChild(btn);
      list.appendChild(li);
    });
    return list;
  }

  function buildShort(problem, card) {
    const wrap = document.createElement("div");
    wrap.className = "short";

    const input = document.createElement("input");
    input.type = "text";
    input.inputMode = "numeric";
    input.setAttribute("aria-label", "답 적기");
    input.placeholder = "답";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "확인";

    const msg = document.createElement("span");
    msg.className = "short-msg";

    function check() {
      const typed = input.value.trim();
      if (!typed) return;
      const right = Number(typed) === problem.answer;
      msg.textContent = right ? "맞았습니다" : "답은 " + problem.answer;
      msg.className = "short-msg " + (right ? "is-right" : "is-wrong");
      input.disabled = true;
      btn.disabled = true;
      markDone(problem, card, right);
    }

    btn.addEventListener("click", check);
    input.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter") check();
    });

    wrap.append(input, btn, msg);
    return wrap;
  }

  function buildAids(problem) {
    if (!problem.help) return document.createDocumentFragment();

    const wrap = document.createElement("div");
    const bar = document.createElement("div");
    bar.className = "aids";

    const body = document.createElement("div");
    body.className = "aid-body";
    body.hidden = true;
    body.innerHTML = problem.help;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "aid-btn";
    btn.textContent = "풀이";
    btn.setAttribute("aria-expanded", "false");
    btn.addEventListener("click", function () {
      const open = body.hidden;
      body.hidden = !open;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "풀이 접기" : "풀이";
    });

    bar.appendChild(btn);
    wrap.append(bar, body);
    return wrap;
  }

  function buildCard(problem) {
    const li = document.createElement("li");
    li.className = "item";
    const mark = state.done[problem.id];
    if (mark) li.classList.add("is-done");

    const head = document.createElement("div");
    head.className = "item-head";
    const exam = examById.get(problem.exam);
    head.innerHTML =
      '<span class="item-src">' + exam.label + " " + problem.no + "번</span>" +
      '<span class="item-mark">' + (mark === "right" ? "맞음" : mark === "wrong" ? "틀림" : "") + "</span>";
    li.appendChild(head);

    const body = document.createElement("div");
    body.className = "body";
    body.innerHTML = "<p>" + problem.body + "</p>";
    li.appendChild(body);

    if (problem.figure) {
      const fig = document.createElement("div");
      fig.className = "figure";
      const img = document.createElement("img");
      img.src = "assets/figures/" + problem.figure;
      img.alt = exam.label + " " + problem.no + "번 그림";
      img.loading = "lazy";
      fig.appendChild(img);
      li.appendChild(fig);
    }

    if (problem.note) li.appendChild(noteBox(problem));

    if (problem.bodyAfter) {
      const after = document.createElement("div");
      after.className = "body";
      after.innerHTML = problem.bodyAfter;
      li.appendChild(after);
    }

    li.appendChild(problem.short ? buildShort(problem, li) : buildChoices(problem, li));
    li.appendChild(buildAids(problem));
    return li;
  }

  function renderMath(root) {
    if (!window.renderMathInElement) return;
    window.renderMathInElement(root, {
      delimiters: [
        { left: "\\[", right: "\\]", display: true },
        { left: "\\(", right: "\\)", display: false }
      ],
      throwOnError: false
    });
  }

  function updateCount() {
    const shown = visibleProblems();
    const solved = shown.filter((p) => state.done[p.id]).length;
    els.count.textContent = shown.length + "문항" + (solved ? " · 푼 것 " + solved : "");
  }

  function render() {
    const items = visibleProblems();
    els.list.textContent = "";
    items.forEach((p) => els.list.appendChild(buildCard(p)));
    els.empty.hidden = items.length > 0;
    renderMath(els.list);
    updateCount();
  }

  /* ── 이어 붙이기 ── */
  function chipHandler(box, key) {
    box.addEventListener("click", function (ev) {
      const btn = ev.target.closest(".chip");
      if (!btn) return;
      const val = btn.dataset.value;
      const nextValue = state[key] === val && val !== "all" ? "all" : val;
      state[key] = nextValue;
      box.querySelectorAll(".chip").forEach((b) => {
        b.setAttribute("aria-pressed", b.dataset.value === nextValue ? "true" : "false");
      });
      render();
    });
  }

  function start() {
    buildUnitChips();
    buildExamSelect();
    chipHandler(els.unitChips, "unit");

    if (els.examSelect) {
      els.examSelect.addEventListener("change", function () {
        state.exam = els.examSelect.value;
        render();
      });
    }

    els.hideDone.addEventListener("change", function () {
      state.hideDone = els.hideDone.checked;
      render();
    });

    els.reset.addEventListener("click", function () {
      state.done = {};
      saveDone();
      render();
    });

    render();
  }

  // katex가 다 실린 뒤에 그려야 수식이 살아난다.
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start);
})();
