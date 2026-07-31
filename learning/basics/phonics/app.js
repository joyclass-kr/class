(() => {
  "use strict";
  const data = window.PHONICS_CURRICULUM;
  const $ = (id) => document.getElementById(id);
  const storeKey = "phonicsSeedProgressV3";
  let current = null;
  let dictationIndex = 0;
  let quizState = [];
  let activePhonemeAudio = null;

  const emptyState = () => ({ done: [], scores: {}, stars: 0, streak: 0, lastStudyDate: "", lastLesson: "" });
  const loadState = () => {
    try { return { ...emptyState(), ...(JSON.parse(localStorage.getItem(storeKey)) || {}) }; }
    catch { return emptyState(); }
  };
  const saveState = (value) => localStorage.setItem(storeKey, JSON.stringify(value));
  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  const today = () => new Date().toISOString().slice(0, 10);
  const dayGap = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);
  const stageFor = (lesson) => data.stages.find((stage) => stage.id === lesson.stageId);
  const lessonIndex = () => data.lessons.findIndex((lesson) => lesson.id === current?.id);
  const currentTarget = () => current.dictation[dictationIndex % current.dictation.length];

  function speak(text, rate = 0.72) {
    if (!("speechSynthesis" in window)) return showToast("이 브라우저에서는 소리 듣기를 지원하지 않아요.");
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = rate;
    utterance.pitch = 1.02;
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices.find((voice) => voice.lang === "en-US") || voices.find((voice) => voice.lang.startsWith("en")) || null;
    speechSynthesis.speak(utterance);
  }

  function phonemeFile(sound) {
    const fileName = sound.replaceAll("_", "-").replace(/^-/, "end-");
    return `assets/sounds/phonemes/${fileName}.wav`;
  }

  function playPhoneme(sound, onEnded) {
    window.speechSynthesis?.cancel?.();
    if (activePhonemeAudio) {
      activePhonemeAudio.pause();
      activePhonemeAudio.currentTime = 0;
    }
    const audio = new Audio(phonemeFile(sound));
    activePhonemeAudio = audio;
    audio.addEventListener("ended", () => {
      if (activePhonemeAudio === audio) activePhonemeAudio = null;
      onEnded?.();
    }, { once: true });
    audio.play().catch(() => showToast("음가 파일을 재생하지 못했습니다."));
  }

  function playPhonemeSequence(sounds, index = 0) {
    if (!sounds[index]) return;
    playPhoneme(sounds[index], () => playPhonemeSequence(sounds, index + 1));
  }

  function showToast(message) {
    const toast = $("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function renderDashboard() {
    const saved = loadState();
    const total = data.lessons.length;
    const completed = saved.done.length;
    const percent = Math.round((completed / total) * 100);
    $("progressText").textContent = `${completed} / ${total} 차시`;
    $("progressPercent").textContent = `${percent}%`;
    $("progressBar").style.width = `${percent}%`;
    $("masteryCount").textContent = completed;
    $("streakCount").textContent = `${saved.streak}일`;
    $("starsCount").textContent = saved.stars;
    $("progressTitle").textContent = completed === total ? `전체 ${total}차시 완료` : completed ? `${completed}차시 완료 · ${total - completed}차시 남음` : "완료한 차시가 없습니다.";
    $("progressKicker").textContent = "학습 진도";

    $("stageList").innerHTML = data.stages.map((stage) => {
      const lessons = data.lessons.filter((lesson) => lesson.stageId === stage.id);
      const doneCount = lessons.filter((lesson) => saved.done.includes(lesson.id)).length;
      const stagePercent = Math.round(doneCount / lessons.length * 100);
      return `<article class="stage-card ${stage.color}">
        <div class="stage-summary"><span class="stage-number">${String(stage.order).padStart(2, "0")}</span><div><p>STAGE ${stage.order}</p><h3>${escapeHtml(stage.title)}</h3><span>${escapeHtml(stage.subtitle)}</span></div><div class="stage-score"><b>${doneCount}/${lessons.length}</b><span>완료</span></div></div>
        <div class="mini-progress"><i style="width:${stagePercent}%"></i></div>
        <div class="lesson-list">${lessons.map((lesson) => `<button type="button" data-lesson="${lesson.id}" class="${saved.done.includes(lesson.id) ? "done" : ""}"><span>${saved.done.includes(lesson.id) ? "✓" : lesson.stageOrder}</span><div><small>${lesson.focus.length ? "새 소리" : "복습"}</small><b>${escapeHtml(lesson.title)}</b></div><em>${saved.scores[lesson.id] ? `${saved.scores[lesson.id]}/3` : "열기 →"}</em></button>`).join("")}</div>
      </article>`;
    }).join("");
    $("stageList").querySelectorAll("[data-lesson]").forEach((button) => button.addEventListener("click", () => openLesson(button.dataset.lesson)));
  }

  function renderWordCards() {
    $("wordCards").innerHTML = current.words.map((word) => {
      const item = data.wordBank[word];
      return `<button type="button" class="word-card" data-word="${word}" aria-label="${word} 소리 듣기"><span class="word-scene">${item.scene}</span><span class="word-copy"><b>${word}</b><strong>${item.korean}</strong><small>${item.hint}</small></span><span class="card-speaker">🔊</span></button>`;
    }).join("");
    $("wordCards").querySelectorAll("button").forEach((button) => button.addEventListener("click", () => speak(button.dataset.word)));
  }

  function renderBlend() {
    $("blendArea").innerHTML = current.blend.map((item, index) => `<div class="blend-row"><div class="chips">${item.parts.map((part) => `<span>${escapeHtml(part)}</span>`).join("")}</div><button type="button" data-blend="${index}" aria-label="소리 합치기">→</button><b class="blend-answer" aria-live="polite">?</b></div>`).join("");
    $("blendArea").querySelectorAll("[data-blend]").forEach((button) => button.addEventListener("click", () => {
      const item = current.blend[Number(button.dataset.blend)];
      button.parentElement.querySelector(".blend-answer").textContent = item.answer;
      button.parentElement.classList.add("revealed");
      speak(item.answer);
    }));
  }

  function renderDictation() {
    const word = currentTarget();
    const item = data.wordBank[word];
    $("dictationScene").innerHTML = `<span>${item.scene}</span><div><b>${item.korean}</b><small>${dictationIndex + 1} / ${current.dictation.length}</small></div>`;
    $("answer").value = "";
    $("feedback").textContent = "";
    $("feedback").className = "feedback";
  }

  function distractorsFor(answer, count = 2) {
    const pool = current.words.filter((word) => word !== answer);
    const all = [...pool, ...data.lessons.flatMap((lesson) => lesson.words)].filter((word, index, arr) => word !== answer && arr.indexOf(word) === index);
    return all.sort((a, b) => Math.abs(a.length - answer.length) - Math.abs(b.length - answer.length)).slice(0, count);
  }

  function buildQuiz() {
    const targets = current.words.slice(0, 3);
    while (targets.length < 3) targets.push(current.words[targets.length % current.words.length]);
    quizState = targets.map((answer, index) => ({
      answer,
      type: index === 0 ? "picture" : index === 1 ? "sound" : "meaning",
      options: [answer, ...distractorsFor(answer)].sort(() => Math.random() - 0.5),
      selected: "",
      correct: false
    }));
    renderQuiz();
  }

  function renderQuiz() {
    const labels = { picture: "그림에 맞는 단어는?", sound: "소리를 듣고 고르세요.", meaning: "뜻에 맞는 단어는?" };
    const area = $("quizArea");
    area.replaceChildren();
    quizState.forEach((question, index) => {
      const item = data.wordBank[question.answer];
      const card = document.createElement("section");
      card.className = `quiz-question ${question.selected ? question.correct ? "correct" : "wrong" : ""}`;
      card.dataset.quizQuestion = String(index);

      const heading = document.createElement("h3");
      const number = document.createElement("span");
      number.textContent = String(index + 1);
      heading.append(number, document.createTextNode(labels[question.type]));
      card.append(heading);

      if (question.type === "picture") {
        const picture = document.createElement("span");
        picture.className = "quiz-picture";
        picture.textContent = item.scene;
        card.append(picture);
      } else if (question.type === "sound") {
        const listen = document.createElement("button");
        listen.className = "quiz-listen";
        listen.type = "button";
        listen.textContent = "🔊 소리 듣기";
        listen.addEventListener("click", () => speak(question.answer));
        card.append(listen);
      } else {
        const meaning = document.createElement("span");
        const hint = document.createElement("small");
        meaning.className = "quiz-meaning";
        meaning.textContent = item.korean;
        hint.textContent = item.hint;
        meaning.append(hint);
        card.append(meaning);
      }

      const options = document.createElement("div");
      options.className = "quiz-options";
      question.options.forEach((option) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = option;
        button.disabled = Boolean(question.selected);
        button.className = question.selected === option ? "selected" : "";
        button.addEventListener("click", () => answerQuiz(index, option));
        options.append(button);
      });
      card.append(options);

      if (question.selected) {
        const result = document.createElement("p");
        result.textContent = question.correct ? "정답" : `정답: ${question.answer}`;
        card.append(result);
      }
      area.append(card);
    });
    updateQuizSummary();
  }

  function answerQuiz(index, option) {
    if (quizState[index].selected) return;
    quizState[index].selected = option;
    quizState[index].correct = option === quizState[index].answer;
    if (quizState[index].correct) speak(quizState[index].answer, 0.85);
    renderQuiz();
  }

  function updateQuizSummary() {
    const answered = quizState.filter((item) => item.selected).length;
    const score = quizState.filter((item) => item.correct).length;
    $("lessonProgressBar").style.width = `${Math.min(100, 18 + answered * 27)}%`;
    if (answered < 3) {
      $("quizSummary").textContent = `${answered} / 3 문제를 풀었어요.`;
      $("complete").disabled = true;
      $("complete").textContent = `${3 - answered}문제를 더 풀어 주세요`;
    } else {
      $("quizSummary").textContent = `평가 결과: ${score} / 3`;
      $("complete").disabled = false;
      $("complete").textContent = "차시 완료 처리";
    }
  }

  function openLesson(id) {
    current = data.lessons.find((lesson) => lesson.id === id);
    if (!current) return;
    dictationIndex = 0;
    const stage = stageFor(current);
    const stageLessons = data.lessons.filter((lesson) => lesson.stageId === current.stageId);
    $("dashboard").hidden = true;
    $("study").hidden = false;
    $("lessonStage").textContent = `STAGE ${stage.order} · ${stage.title}`;
    $("lessonLabel").textContent = `${current.stageOrder}차시 · ${current.title}`;
    $("lessonEyebrow").textContent = current.focus.length ? "TODAY'S SOUND" : "REVIEW DAY";
    $("focusTitle").textContent = current.focus.length ? `${current.focus.join(" · ")} 소리` : "단계 복습";
    $("lessonNote").textContent = current.note;
    const letters = current.focus.length ? current.focus : current.review;
    $("soundLetters").innerHTML = letters.map((letter) => `<button type="button" data-letter="${escapeHtml(letter)}">${escapeHtml(letter)}</button>`).join("");
    $("soundLetters").querySelectorAll("button").forEach((button) => button.addEventListener("click", () => playPhoneme(button.dataset.letter)));
    renderWordCards();
    renderBlend();
    renderDictation();
    $("sentence").textContent = current.sentence;
    $("lessonProgressBar").style.width = "12%";
    buildQuiz();
    const index = lessonIndex();
    $("previousLesson").disabled = index === 0;
    $("nextLesson").disabled = index === data.lessons.length - 1;
    const saved = loadState();
    saved.lastLesson = current.id;
    saveState(saved);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeStudy() {
    window.speechSynthesis?.cancel?.();
    $("study").hidden = true;
    $("dashboard").hidden = false;
    renderDashboard();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function completeLesson() {
    const saved = loadState();
    const score = quizState.filter((item) => item.correct).length;
    const isNew = !saved.done.includes(current.id);
    if (isNew) saved.done.push(current.id);
    saved.scores[current.id] = Math.max(saved.scores[current.id] || 0, score);
    if (isNew) saved.stars += score;
    const currentDay = today();
    if (saved.lastStudyDate !== currentDay) {
      saved.streak = saved.lastStudyDate && dayGap(saved.lastStudyDate, currentDay) === 1 ? saved.streak + 1 : 1;
      saved.lastStudyDate = currentDay;
    }
    const next = data.lessons[lessonIndex() + 1];
    saved.lastLesson = next?.id || current.id;
    saveState(saved);
    showToast(`완료 처리됨 · 평가 ${score}/3`);
    if (next) setTimeout(() => openLesson(next.id), 900);
    else setTimeout(closeStudy, 900);
  }

  $("hearFocus").addEventListener("click", () => playPhonemeSequence(current.focus.length ? current.focus : current.review));
  $("hearWord").addEventListener("click", () => speak(currentTarget()));
  $("hearSentence").addEventListener("click", () => speak(current.sentence, 0.65));
  $("check").addEventListener("click", () => {
    const correct = currentTarget();
    const answer = $("answer").value.trim().toLowerCase();
    const feedback = $("feedback");
    if (answer === correct) {
      feedback.textContent = `맞아요! ${correct} ✓`;
      feedback.className = "feedback good";
      speak(correct);
      if (dictationIndex < current.dictation.length - 1) setTimeout(() => { dictationIndex += 1; renderDictation(); speak(currentTarget()); }, 1100);
    } else {
      feedback.textContent = answer ? `한 번 더! 첫 소리는 “${correct[0]}”예요.` : "들은 단어를 먼저 써 주세요.";
      feedback.className = "feedback bad";
    }
  });
  $("answer").addEventListener("keydown", (event) => { if (event.key === "Enter") $("check").click(); });
  $("complete").addEventListener("click", completeLesson);
  $("back").addEventListener("click", closeStudy);
  $("closeLesson").addEventListener("click", closeStudy);
  $("previousLesson").addEventListener("click", () => openLesson(data.lessons[lessonIndex() - 1]?.id));
  $("nextLesson").addEventListener("click", () => openLesson(data.lessons[lessonIndex() + 1]?.id));
  $("reset").addEventListener("click", () => $("resetDialog").showModal());
  $("confirmReset").addEventListener("click", () => { localStorage.removeItem(storeKey); closeStudy(); showToast("진도를 처음으로 돌렸어요."); });

  renderDashboard();
})();
