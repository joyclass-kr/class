(() => {
  "use strict";
  const state = {
    items: [],
    track: "ko",
    set: [],
    index: 0,
    score: 0,
    answered: false,
    hadWrong: false,
    deckHistory: null,
    deckStorageKey: ""
  };
  const LEVELS = Object.freeze([
    { level: 1, skillFocus: "사실 확인과 직접 적용" },
    { level: 2, skillFocus: "추론과 인과 관계" },
    { level: 3, skillFocus: "정보 종합과 조건 판단" },
    { level: 4, skillFocus: "근거 적용과 범위 평가" }
  ]);
  const $ = (id) => document.getElementById(id);
  const node = (tag, className, text) => { const el = document.createElement(tag); if (className) el.className = className; if (text !== undefined) el.textContent = text; return el; };
  const shuffle = (items) => {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
    }
    return result;
  };

  function show(view) {
    $("dashboardView").hidden = view !== "dashboard";
    $("questionView").hidden = view !== "question";
    $("resultView").hidden = view !== "result";
  }

  // 급 목록은 서버가 실제로 보낸 문항에서 뽑는다. 급 수를 바꿔도 여기를
  // 고칠 필요가 없고, 문항이 없는 급이 빈 칸으로 남지도 않는다.
  function renderLevels() {
    const list = $("levelList"); list.replaceChildren();
    const items = state.items.filter((item) => item.track === state.track);
    LEVELS.forEach(({ level, skillFocus }) => {
      const group = items.filter((item) => item.targetLevel === level);
      const labelled = group.find((item) => item.skillFocus) || {};
      const card = node("button", "level-card", ""); card.type = "button";
      card.append(node("strong", "level-code", `${state.track === "en" ? "E" : "K"}${level}`));
      card.append(node("span", "level-focus", labelled.skillFocus || skillFocus));
      if (group.length) card.append(node("span", "level-count", `${group.length}문항`));
      card.addEventListener("click", () => startSet(level)); list.append(card);
    });
  }

  // v3: 급 체계가 8단계에서 4단계로 바뀌어 예전 진행 기록은 맞지 않는다.
  function deckStorageKey(level) {
    return `reading-self-study-deck-v3:${state.track}:${level}`;
  }

  function loadDeckHistory(key) {
    try {
      return JSON.parse(window.localStorage.getItem(key) || "null");
    } catch (_) {
      return null;
    }
  }

  function saveDeckHistory() {
    if (!state.deckStorageKey || !state.deckHistory) return;
    try {
      window.localStorage.setItem(state.deckStorageKey, JSON.stringify(state.deckHistory));
    } catch (_) {
      // Practice still works when storage is unavailable.
    }
  }

  // The dashboard only ever holds the lightweight per-item summary (track/
  // level/skillFocus), not full passages -- so opening a level fetches that
  // one deck's items on demand instead of shipping all ~900 items up front.
  async function startSet(level) {
    const list = $("levelList");
    list.classList.add("is-loading");
    let candidates;
    try {
      const response = await fetch(`/api/reading/self-study?track=${state.track}&level=${level}`);
      if (!response.ok) throw new Error();
      candidates = (await response.json()).items || [];
    } catch (_) {
      list.classList.remove("is-loading");
      list.replaceChildren(node("p", "empty-pilots", "문제를 불러오지 못했습니다."));
      return;
    }
    list.classList.remove("is-loading");
    state.deckStorageKey = deckStorageKey(level);
    const drawn = window.ReadingQuestionDeck.draw(candidates, 5, loadDeckHistory(state.deckStorageKey));
    state.set = drawn.items;
    state.deckHistory = drawn.history;
    saveDeckHistory();
    state.index = 0; state.score = 0; renderQuestion(); show("question"); window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderQuestion() {
    const item = state.set[state.index]; state.answered = false; state.hadWrong = false;
    const levelCode = `${item.track === "en" ? "E" : "K"}${item.targetLevel}`;
    $("questionLevel").textContent = levelCode;
    $("questionProgress").textContent = `${state.index + 1} / ${state.set.length}`;
    $("questionTopic").textContent = item.topicTitle;
    $("progressFill").style.width = `${((state.index + 1) / state.set.length) * 100}%`;
    $("studentPassage").textContent = item.passageText; $("studentPrompt").textContent = item.promptText;
    $("feedback").hidden = true; $("answerStatus").textContent = "";
    const choices = $("studentChoices"); choices.replaceChildren();
    shuffle(item.choices.map((choice, originalIndex) => ({ choice, originalIndex }))).forEach(({ choice, originalIndex }, index) => {
      const button = node("button", "student-choice", ""); button.type = "button";
      button.dataset.choiceIndex = String(originalIndex);
      button.append(node("span", "choice-number", String(index + 1)), node("span", "", choice));
      button.addEventListener("click", () => choose(originalIndex, button)); choices.append(button);
    });
    $("nextButton").disabled = true; $("nextButton").textContent = "정답 확인";
  }

  function choose(index, selected) {
    if (state.answered) return;
    [...$("studentChoices").children].forEach((button) => button.classList.remove("selected"));
    selected.classList.add("selected"); $("nextButton").disabled = false; $("nextButton").onclick = () => check(index);
  }

  function check(index) {
    if (state.answered) return next();
    const item = state.set[state.index]; const correct = index === item.correctIndex;
    if (!correct) {
      state.hadWrong = true;
      const selected = [...$("studentChoices").children].find((button) => Number(button.dataset.choiceIndex) === index);
      if (selected) { selected.classList.add("wrong"); selected.disabled = true; }
      $("answerStatus").textContent = "다시 생각하고 다른 답을 골라보세요.";
      $("nextButton").disabled = true;
      return;
    }
    state.answered = true;
    if (!state.hadWrong) state.score += 1;
    state.deckHistory = window.ReadingQuestionDeck.recordAnswer(state.deckHistory, item.id, !state.hadWrong);
    saveDeckHistory();
    [...$("studentChoices").children].forEach((button) => { const choiceIndex = Number(button.dataset.choiceIndex); button.disabled = true; if (choiceIndex === item.correctIndex) button.classList.add("correct"); else if (choiceIndex === index) button.classList.add("wrong"); });
    const feedback = $("feedback"); feedback.className = "feedback is-correct"; feedback.textContent = `정답 · ${item.explanation}`; feedback.hidden = false;
    $("nextButton").textContent = state.index === state.set.length - 1 ? "결과 보기" : "다음 문제";
  }

  function next() { if (state.index + 1 < state.set.length) { state.index += 1; renderQuestion(); } else { $("resultTitle").textContent = `${state.score} / ${state.set.length}`; $("resultCopy").textContent = `정답 ${state.score}개 · 오답 ${state.set.length - state.score}개`; show("result"); } }

  async function start() {
    // Render the useful controls before waiting for a cold server or network.
    // The summary request only enriches the cards with live item counts.
    renderLevels();
    try {
      const response = await fetch("/api/reading/self-study");
      if (!response.ok) throw new Error();
      state.items = (await response.json()).items || [];
      renderLevels();
    } catch (_) {
      // Level buttons remain usable and fetch their deck on demand.
    }
  }
  document.querySelectorAll(".tab").forEach((tab) => tab.addEventListener("click", () => { state.track = tab.dataset.track; document.querySelectorAll(".tab").forEach((button) => button.classList.toggle("active", button === tab)); renderLevels(); }));
  $("backButton").addEventListener("click", () => show("dashboard")); $("restartButton").addEventListener("click", () => show("dashboard")); $("nextButton").addEventListener("click", () => {});
  start();
})();
