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

  // 시대별 한국사 대표 문화유산/상징 맞춤형 고화질 벡터 SVG 아이콘
  const ERA_ICONS = {
    // 1. 선사 시대와 고조선: 빗살무늬 토기 (Comb-pattern Pottery)
    "prehistoric": `
      <svg viewBox="0 0 48 48" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="potteryGrad" x1="12" y1="10" x2="36" y2="44" gradientUnits="userSpaceOnUse">
            <stop stop-color="#C87D55"/>
            <stop offset="1" stop-color="#8C4320"/>
          </linearGradient>
        </defs>
        <path d="M12 11C12 11 11 26 24 43C37 26 36 11 36 11H12Z" fill="url(#potteryGrad)" stroke="#5C260E" stroke-width="2" stroke-linejoin="round"/>
        <path d="M10 11C10 9.8 12 9 24 9C36 9 38 9.8 38 11C38 12.2 36 13 24 13C12 13 10 12.2 10 11Z" fill="#E29A72" stroke="#5C260E" stroke-width="1.8"/>
        <path d="M14 16L24 22L34 16" stroke="#FFE3D1" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16 22L24 27L32 22" stroke="#FFE3D1" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M18 28L24 32L30 28" stroke="#FFE3D1" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M20 34L24 37L28 34" stroke="#FFE3D1" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    // 2. 여러 나라의 성장: 비파형/세형동검 & 다뉴세문경 (정문경)
    "early-states": `
      <svg viewBox="0 0 48 48" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bronzeGrad" x1="16" y1="6" x2="32" y2="42" gradientUnits="userSpaceOnUse">
            <stop stop-color="#D4AF37"/>
            <stop offset="0.5" stop-color="#8A9A5B"/>
            <stop offset="1" stop-color="#4B5320"/>
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="18" fill="#5F7D64" stroke="#2D4433" stroke-width="2"/>
        <circle cx="24" cy="24" r="14" stroke="#A9C7AE" stroke-width="1.2" stroke-dasharray="2 2"/>
        <path d="M24 6L26.5 16C28.5 19 28.5 24 26 27L25 35H23L22 27C19.5 24 19.5 19 21.5 16L24 6Z" fill="url(#bronzeGrad)" stroke="#233527" stroke-width="1.5"/>
        <line x1="24" y1="6" x2="24" y2="35" stroke="#F4E8A4" stroke-width="1.2"/>
        <rect x="22" y="35" width="4" height="6" rx="1" fill="#7A5230" stroke="#233527" stroke-width="1.2"/>
        <ellipse cx="24" cy="42" rx="4" ry="2" fill="#D4AF37" stroke="#233527" stroke-width="1.2"/>
      </svg>
    `,

    // 3. 삼국과 가야: 신라 금관 (Gold Crown) & 곡옥
    "three-kingdoms": `
      <svg viewBox="0 0 48 48" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldGrad" x1="8" y1="8" x2="40" y2="42" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFF275"/>
            <stop offset="0.4" stop-color="#FFD700"/>
            <stop offset="1" stop-color="#D48806"/>
          </linearGradient>
        </defs>
        <path d="M24 8V32M19 14H29M18 22H30" stroke="url(#goldGrad)" stroke-width="3" stroke-linecap="round"/>
        <path d="M12 14V32M9 20H15M9 26H15" stroke="url(#goldGrad)" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M36 14V32M33 20H39M33 26H39" stroke="url(#goldGrad)" stroke-width="2.5" stroke-linecap="round"/>
        <rect x="7" y="32" width="34" height="7" rx="2" fill="url(#goldGrad)" stroke="#874D00" stroke-width="1.5"/>
        <circle cx="24" cy="8" r="2.5" fill="#FFE58F" stroke="#874D00" stroke-width="1"/>
        <circle cx="12" cy="14" r="2" fill="#FFE58F" stroke="#874D00" stroke-width="1"/>
        <circle cx="36" cy="14" r="2" fill="#FFE58F" stroke="#874D00" stroke-width="1"/>
        <path d="M14 36C14 38 12 40 10 39C8 38 9 35 11 34C13 33 14 34 14 36Z" fill="#52C41A" stroke="#135200" stroke-width="1"/>
        <path d="M34 36C34 38 36 40 38 39C40 38 39 35 37 34C35 33 34 34 34 36Z" fill="#52C41A" stroke="#135200" stroke-width="1"/>
      </svg>
    `,

    // 4. 남북국 시대: 삼층석탑 (석가탑/다보탑)
    "north-south": `
      <svg viewBox="0 0 48 48" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="stoneGrad" x1="12" y1="6" x2="36" y2="44" gradientUnits="userSpaceOnUse">
            <stop stop-color="#CBD5E1"/>
            <stop offset="1" stop-color="#64748B"/>
          </linearGradient>
        </defs>
        <line x1="24" y1="5" x2="24" y2="12" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
        <circle cx="24" cy="6" r="2" fill="#F59E0B" stroke="#B45309" stroke-width="1"/>
        <path d="M18 14H30L28 17H20L18 14Z" fill="url(#stoneGrad)" stroke="#334155" stroke-width="1.2"/>
        <rect x="21" y="17" width="6" height="4" fill="#E2E8F0" stroke="#334155" stroke-width="1.2"/>
        <path d="M15 21H33L31 25H17L15 21Z" fill="url(#stoneGrad)" stroke="#334155" stroke-width="1.2"/>
        <rect x="19" y="25" width="10" height="5" fill="#E2E8F0" stroke="#334155" stroke-width="1.2"/>
        <path d="M12 30H36L33 35H15L12 30Z" fill="url(#stoneGrad)" stroke="#334155" stroke-width="1.2"/>
        <rect x="17" y="35" width="14" height="6" fill="#E2E8F0" stroke="#334155" stroke-width="1.2"/>
        <path d="M9 41H39V44H9V41Z" fill="#94A3B8" stroke="#334155" stroke-width="1.5"/>
      </svg>
    `,

    // 5. 고려: 고려청자 상감운학문 매병 (Goryeo Celadon)
    "goryeo": `
      <svg viewBox="0 0 48 48" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="celadonGrad" x1="12" y1="8" x2="36" y2="44" gradientUnits="userSpaceOnUse">
            <stop stop-color="#99D5C9"/>
            <stop offset="0.5" stop-color="#4EA898"/>
            <stop offset="1" stop-color="#236B5E"/>
          </linearGradient>
        </defs>
        <path d="M21 7C21 6.5 22.5 6 24 6C25.5 6 27 6.5 27 7C27 8 26 9 26 10C33 11 38 18 36 27C34 34 31 38 31 43H17C17 38 14 34 12 27C10 18 15 11 22 10C22 9 21 8 21 7Z" fill="url(#celadonGrad)" stroke="#13473D" stroke-width="1.8" stroke-linejoin="round"/>
        <circle cx="24" cy="22" r="6.5" fill="#C7EAE3" stroke="#FFFFFF" stroke-width="1.2"/>
        <path d="M21 23C23 20 26 21 27 22M23 20L25 24M24 23L27 25" stroke="#13473D" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M18 40C20 38 22 41 24 39C26 41 28 38 30 40" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round"/>
      </svg>
    `,

    // 6. 조선 전기: 훈민정음 해례본 (Hunminjeongeum)
    "joseon-early": `
      <svg viewBox="0 0 48 48" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hanjiGrad" x1="10" y1="8" x2="38" y2="40" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFFDF5"/>
            <stop offset="1" stop-color="#EAD9B8"/>
          </linearGradient>
        </defs>
        <rect x="9" y="8" width="28" height="34" rx="2" fill="url(#hanjiGrad)" stroke="#6B4F28" stroke-width="1.8"/>
        <line x1="13" y1="8" x2="13" y2="42" stroke="#B83A2C" stroke-width="2" stroke-dasharray="4 3"/>
        <rect x="17" y="11" width="8" height="18" fill="#FDFBF7" stroke="#6B4F28" stroke-width="1"/>
        <line x1="21" y1="13" x2="21" y2="27" stroke="#2C1810" stroke-width="1.5" stroke-dasharray="2 1.5"/>
        <path d="M28 14H33V20" stroke="#B83A2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M28 24V30H33" stroke="#1B4D89" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="30.5" cy="35" r="2.5" stroke="#1B4D89" stroke-width="1.8"/>
        <line x1="28" y1="35" x2="33" y2="35" stroke="#1B4D89" stroke-width="1.8"/>
      </svg>
    `,

    // 7. 조선 후기: 상평통보 엽전 (Sangpyeong Tongbo Coin)
    "joseon-late": `
      <svg viewBox="0 0 48 48" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="coinGrad" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stop-color="#E6A15C"/>
            <stop offset="0.5" stop-color="#BD742A"/>
            <stop offset="1" stop-color="#733E0A"/>
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="18" fill="url(#coinGrad)" stroke="#4A2600" stroke-width="2"/>
        <circle cx="24" cy="24" r="15" stroke="#FCE7A6" stroke-width="0.8"/>
        <rect x="19" y="19" width="10" height="10" rx="1" fill="#FFFDF8" stroke="#4A2600" stroke-width="1.8"/>
        <path d="M24 9V11M21 11H27M22 13H26" stroke="#FFE9A3" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M21 35H27M24 32V38" stroke="#FFE9A3" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M11 22H15V26H11M13 22V27" stroke="#FFE9A3" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M33 22H37M35 22V26M33 26H37" stroke="#FFE9A3" stroke-width="1.4" stroke-linecap="round"/>
      </svg>
    `,

    // 8. 개항기와 대한제국: 독립문 (Independence Gate)
    "opening": `
      <svg viewBox="0 0 48 48" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gateGrad" x1="10" y1="8" x2="38" y2="44" gradientUnits="userSpaceOnUse">
            <stop stop-color="#F1F5F9"/>
            <stop offset="1" stop-color="#94A3B8"/>
          </linearGradient>
        </defs>
        <path d="M10 12H38V42H29V28C29 25 27 23 24 23C21 23 19 25 19 28V42H10V12Z" fill="url(#gateGrad)" stroke="#334155" stroke-width="1.8" stroke-linejoin="round"/>
        <rect x="8" y="8" width="32" height="4" rx="1" fill="#E2E8F0" stroke="#334155" stroke-width="1.5"/>
        <rect x="18" y="14" width="12" height="5" fill="#1E293B" rx="0.5"/>
        <line x1="20" y1="16.5" x2="28" y2="16.5" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round"/>
        <line x1="10" y1="20" x2="19" y2="20" stroke="#64748B" stroke-width="1"/>
        <line x1="29" y1="20" x2="38" y2="20" stroke="#64748B" stroke-width="1"/>
        <line x1="10" y1="30" x2="19" y2="30" stroke="#64748B" stroke-width="1"/>
        <line x1="29" y1="30" x2="38" y2="30" stroke="#64748B" stroke-width="1"/>
        <circle cx="24" cy="10" r="1.5" fill="#E11D48"/>
      </svg>
    `,

    // 9. 일제강점기: 독립 태극기 & 3·1 만세운동
    "occupation": `
      <svg viewBox="0 0 48 48" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="8" width="36" height="25" rx="2" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.8"/>
        <g transform="translate(24, 20.5)">
          <path d="M0 -6A6 6 0 0 1 0 6A3 3 0 0 1 0 0A3 3 0 0 0 0 -6Z" fill="#DC2626"/>
          <path d="M0 6A6 6 0 0 1 0 -6A3 3 0 0 1 0 0A3 3 0 0 0 0 6Z" fill="#2563EB"/>
        </g>
        <line x1="11" y1="12" x2="15" y2="12" stroke="#0F172A" stroke-width="1.2"/>
        <line x1="11" y1="14" x2="15" y2="14" stroke="#0F172A" stroke-width="1.2"/>
        <line x1="11" y1="16" x2="15" y2="16" stroke="#0F172A" stroke-width="1.2"/>
        <line x1="33" y1="25" x2="37" y2="25" stroke="#0F172A" stroke-width="1.2" stroke-dasharray="1.5 1"/>
        <line x1="33" y1="27" x2="37" y2="27" stroke="#0F172A" stroke-width="1.2" stroke-dasharray="1.5 1"/>
        <line x1="33" y1="29" x2="37" y2="29" stroke="#0F172A" stroke-width="1.2" stroke-dasharray="1.5 1"/>
        <line x1="6" y1="6" x2="6" y2="42" stroke="#475569" stroke-width="2.2" stroke-linecap="round"/>
        <circle cx="6" cy="6" r="2" fill="#F59E0B" stroke="#B45309" stroke-width="1"/>
      </svg>
    `,

    // 10. 대한민국 현대사: 국회의사당 돔
    "contemporary": `
      <svg viewBox="0 0 48 48" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="domeGrad" x1="16" y1="8" x2="32" y2="22" gradientUnits="userSpaceOnUse">
            <stop stop-color="#48CAE4"/>
            <stop offset="0.6" stop-color="#0077B6"/>
            <stop offset="1" stop-color="#023E8A"/>
          </linearGradient>
        </defs>
        <path d="M14 20C14 13 18.5 8 24 8C29.5 8 34 13 34 20H14Z" fill="url(#domeGrad)" stroke="#03045E" stroke-width="1.6"/>
        <circle cx="24" cy="7" r="1.5" fill="#FFD166" stroke="#03045E" stroke-width="1"/>
        <rect x="12" y="20" width="24" height="3" rx="0.5" fill="#E2E8F0" stroke="#03045E" stroke-width="1.4"/>
        <rect x="10" y="23" width="28" height="15" fill="#FFFFFF" stroke="#03045E" stroke-width="1.6"/>
        <line x1="15" y1="23" x2="15" y2="38" stroke="#0077B6" stroke-width="1.8"/>
        <line x1="21" y1="23" x2="21" y2="38" stroke="#0077B6" stroke-width="1.8"/>
        <line x1="27" y1="23" x2="27" y2="38" stroke="#0077B6" stroke-width="1.8"/>
        <line x1="33" y1="23" x2="33" y2="38" stroke="#0077B6" stroke-width="1.8"/>
        <path d="M6 38H42V42H6V38Z" fill="#CBD5E1" stroke="#03045E" stroke-width="1.6"/>
      </svg>
    `,

    // 11. 시대 통합: 역사 연표와 나침반
    "integrated": `
      <svg viewBox="0 0 48 48" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12C14 10 20 13 24 15C28 13 34 10 40 12V36C34 34 28 37 24 39C20 37 14 34 8 36V12Z" fill="#FFFBEB" stroke="#78350F" stroke-width="1.8" stroke-linejoin="round"/>
        <line x1="24" y1="15" x2="24" y2="39" stroke="#78350F" stroke-width="1.8"/>
        <circle cx="24" cy="26" r="9" fill="#FFFFFF" stroke="#D97706" stroke-width="1.5"/>
        <polygon points="24,19 26,26 24,24 22,26" fill="#EF4444" stroke="#B91C1C" stroke-width="0.8"/>
        <polygon points="24,33 26,26 24,28 22,26" fill="#3B82F6" stroke="#1D4ED8" stroke-width="0.8"/>
        <circle cx="24" cy="26" r="1.5" fill="#F59E0B"/>
      </svg>
    `
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

  const UNIT_COLORS = {
    "prehistoric": "mint",
    "early-states": "yellow",
    "three-kingdoms": "coral",
    "north-south": "sky",
    "goryeo": "lavender",
    "joseon-early": "mint",
    "joseon-late": "yellow",
    "opening": "coral",
    "occupation": "sky",
    "contemporary": "lavender",
    "integrated": "mint"
  };

  function buildUnitGrid() {
    if (!els.unitGrid) return;
    els.unitGrid.textContent = "";

    DATA.units.forEach((u, idx) => {
      const color = UNIT_COLORS[u.id] || "mint";
      const iconSvg = ERA_ICONS[u.id] || "";
      const n = countBy((q) => q.unitId === u.id);
      if (n === 0) return;

      const card = document.createElement("button");
      card.type = "button";
      card.className = `unit-card ${color}`;
      card.dataset.value = u.id;
      card.setAttribute("aria-pressed", state.unit === u.id ? "true" : "false");

      const numStr = String(idx + 1).padStart(2, "0");

      card.innerHTML = `
        <div class="unit-card-head">
          <span class="unit-number">${numStr}</span>
          <span class="unit-icon" aria-hidden="true">${iconSvg}</span>
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
