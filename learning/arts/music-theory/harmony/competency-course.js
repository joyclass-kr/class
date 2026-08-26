"use strict";

(function () {
  const curriculum = window.PracticalHarmonyCurriculum;
  if (!curriculum) return;

  const STORAGE_KEY = "musicTheoryPracticalHarmonyCompetenciesV1";
  const NOTE_NAMES = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
  const LETTER_STEPS = { C:0, D:1, E:2, F:3, G:4, A:5, B:6 };
  const els = {};
  const state = {
    completed: loadCompleted(),
    currentId: null,
    questionIndex: 0,
    firstTryCorrect: 0,
    attempts: 0,
    labPassed: false,
    evidencePassed: false,
    selectedMidis: new Set()
  };

  const SCORE_SETS = {
    "symbol-anatomy": [["C",["C4","E4","G4"]],["Cm",["C4","Eb4","G4"]],["C7",["C4","E4","G4","Bb4"]],["Cmaj7",["C4","E4","G4","B4"]]],
    "symbol-contrast": [["Csus4",["C4","F4","G4"]],["Cadd9",["C4","D4","E4","G4"]]],
    "triad-stack": [["D",["D4","F#4","A4"]],["Dm",["D4","F4","A4"]]],
    "triad-transpose": [["E♭",["Eb4","G4","Bb4"]],["F♯m",["F#4","A4","C#5"]]],
    "quality-pairs": [["장 4+3",["C4","E4","G4"]],["단 3+4",["C4","Eb4","G4"]],["감 3+3",["C4","Eb4","Gb4"]],["증 4+4",["C4","E4","G#4"]]],
    "quality-motion": [["Cdim",["C4","Eb4","Gb4"]],["C",["C4","E4","G4"]],["Caug",["C4","E4","G#4"]],["Fm",["C4","F4","Ab4"]]],
    "inversion-score": [["C",["C4","E4","G4"]],["C/E",["E4","G4","C5"]],["C/G",["G4","C5","E5"]]],
    "bass-line": [["C",["C3","E4","G4"]],["G/B",["B2","D4","G4"]],["Am",["A2","C4","E4"]]],
    "voice-compare": [["큰 도약",["C4","E4","G4"]],["G 근음위치",["G4","B4","D5"]],["최소 이동",["B3","D4","G4"]]],
    "voice-path": [["C",["C4","E4","G4"]],["G/B",["B3","D4","G4"]],["Am",["C4","E4","A4"]],["F",["C4","F4","A4"]]],
    "key-scale": [["C 장음계",["C4","D4","E4","F4","G4","A4","B4","C5"]],["G 장음계",["G3","A3","B3","C4","D4","E4","F#4","G4"]]],
    "leading-tone": [["C조 7→1",["B4","C5"]],["G조 7→1",["F#4","G4"]]],
    "diatonic-map": [["I",["C4","E4","G4"]],["ii",["D4","F4","A4"]],["iii",["E4","G4","B4"]],["IV",["F4","A4","C5"]],["V",["G4","B4","D5"]],["vi",["A4","C5","E5"]],["vii°",["B4","D5","F5"]]],
    "roman-transfer": [["C: I–IV–V–I",["C4","F4","G4","C5"]],["G: I–IV–V–I",["G3","C4","D4","G4"]]],
    "function-flow": [["T",["C4","E4","G4"]],["PD",["C4","F4","A4"]],["D",["B3","D4","G4"]],["T",["C4","E4","G4"]]],
    "function-options": [["I",["C4","E4","G4"]],["vi",["C4","E4","A4"]],["ii",["D4","F4","A4"]],["IV",["C4","F4","A4"]],["V",["B3","D4","G4"]]],
    "cadence-compare": [["정격 V–I",["B3","D4","G4"]],["I",["C4","E4","G4"]],["변격 IV–I",["C4","F4","A4"]],["I",["C4","E4","G4"]]],
    "cadence-voices": [["G7",["G3","B3","F4"]],["강한 I",["C3","C4","E4"]],["약한 I6",["E3","C4","G4"]]],
    "deceptive-cadence": [["V",["B3","D4","G4"]],["vi",["C4","E4","A4"]]],
    "loop-leadsheet": [["C",["C4","E4","G4"]],["G/B",["B3","D4","G4"]],["Am",["C4","E4","A4"]],["F",["C4","F4","A4"]]],
    "practice-layers": [["베이스",["C3","G2","A2","F2"]],["가까운 윗성부",["C4","B3","C4","C4"]],["코드 완성",["E4","D4","E4","F4"]]],
    "seventh-family": [["Cmaj7",["C4","E4","G4","B4"]],["Dm7",["D4","F4","A4","C5"]],["G7",["G3","B3","D4","F4"]],["Bm7♭5",["B3","D4","F4","A4"]]],
    "diminished-sevenths": [["Bm7♭5",["B3","D4","F4","A4"]],["Bdim7",["B3","D4","F4","Ab4"]]],
    "guide-tone": [["G7: 3·7",["B3","F4"]],["Cmaj7: 3·7",["E4","B4"]]],
    "two-five-one-guides": [["Dm7",["F4","C5"]],["G7",["F4","B4"]],["Cmaj7",["E4","B4"]]],
    "sus-add": [["C",["C4","E4","G4"]],["Csus4",["C4","F4","G4"]],["Cadd9",["C4","D4","E4","G4"]]],
    "tension-map": [["Cmaj7",["C4","E4","G4","B4"]],["Cmaj9",["C4","E4","G4","B4","D5"]],["G13",["G3","B3","F4","E5"]]],
    "transpose-map": [["C: I–V–vi–IV",["C4","G4","A4","F4"]],["G: I–V–vi–IV",["G3","D4","E4","C4"]]],
    "transpose-melody": [["C조 E–D–C",["E4","D4","C4"]],["G조 B–A–G",["B4","A4","G4"]]],
    "harmonic-rhythm": [["C 유지",["C4","D4","E4"]],["G→C",["B3","D4","C4"]]],
    "rhythm-density": [["느린 변화",["C4","C4","F4","G4"]],["종지 전 가속",["C4","F4","D4","G4","C5"]]],
    "melody-candidates": [["E는 C의 3음",["C4","E4","G4"]],["E는 Am의 5음",["A3","C4","E4"]],["E는 Em의 근음",["E4","G4","B4"]]],
    "harmonize-options": [["단순 C–G–C",["E4","D4","C4"]],["확장 Am–Dm–G–C",["E4","D4","B3","C4"]]],
    "melody-register": [["반주",["C3","E3","G3"]],["멜로디",["E4","D4","C4"]]],
    "secondary-dominant": [["D7 (V/V)",["D4","F#4","A4","C5"]],["G",["D4","G4","B4"]]],
    "secondary-chain": [["A7→Dm",["C#4","G4","D5"]],["E7→Am",["G#3","D4","A4"]]],
    "borrowed-compare": [["IV",["F4","A4","C5"]],["iv",["F4","Ab4","C5"]]],
    "borrowed-resolution": [["Fm",["F4","Ab4","C5"]],["C",["E4","G4","C5"]]],
    "lead-sheet": [["C",["E4"]],["G/B",["D4"]],["Am",["C4"]],["F",["B3"]],["C",["C4"]]],
    "arrangement-layers": [["베이스",["C3","B2","A2","F2","C3"]],["보이싱",["E4","D4","E4","F4","E4"]],["멜로디",["E5","D5","C5","B4","C5"]]],
    "revision-loop": [["초안",["C4","G4","A4","F4"]],["가까운 연결",["C4","B3","C4","C4"]]]
  };

  function byId(id) { return document.getElementById(id); }
  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;", "'":"&#39;" }[char];
    });
  }
  function loadCompleted() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return new Set(Array.isArray(value) ? value.filter(function (id) { return curriculum.skills[id]; }) : []);
    } catch (error) { return new Set(); }
  }
  function saveCompleted() { localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(state.completed))); }
  function allSkillIds() { return curriculum.strands.flatMap(function (strand) { return strand.skills; }); }
  function getStrand(id) { return curriculum.strands.find(function (strand) { return strand.skills.includes(id); }); }
  function prereqsMet(id) { return curriculum.skills[id].prereqs.every(function (prereq) { return state.completed.has(prereq); }); }
  function recommendedId() {
    return allSkillIds().find(function (id) { return !state.completed.has(id) && prereqsMet(id); }) ||
      allSkillIds().find(function (id) { return !state.completed.has(id); }) || "LEAD_SHEET_PROJECT";
  }
  function playGroups(groups) {
    if (!window.HarmonyPiano || !groups || !groups.length) return;
    const normalized = Array.isArray(groups[0]) ? groups : [groups];
    if (normalized.length === 1) window.HarmonyPiano.playNotes(normalized[0], { duration:.9, arpeggio:.018 });
    else window.HarmonyPiano.playSequence(normalized, .58);
  }
  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function () { els.toast.classList.remove("show"); }, 2200);
  }

  function noteParts(note) {
    const match = /^([A-G])([#b]?)(-?\d)$/.exec(note);
    if (!match) return { y:90, accidental:"", label:note };
    const octave = Number(match[3]);
    const step = octave * 7 + LETTER_STEPS[match[1]];
    const c4 = 4 * 7;
    const staffY = Math.max(44, Math.min(124, 124 - (step - c4) * 5));
    return { y:staffY, accidental:match[2] === "#" ? "♯" : match[2] === "b" ? "♭" : "", label:note };
  }
  function staffSvg(items, title) {
    const width = 520;
    const margin = 46;
    const gap = Math.max(50, (width - margin * 2) / Math.max(1, items.length));
    const staff = [64,74,84,94,104].map(function (y) { return '<line x1="22" y1="'+y+'" x2="502" y2="'+y+'"/>'; }).join("");
    const events = items.map(function (item, index) {
      const x = margin + gap * index + gap / 2;
      const notes = item[1];
      const noteShapes = notes.map(function (note) {
        const part = noteParts(note);
        const ledger = (part.y >= 114 ? '<line class="ledger" x1="'+(x-13)+'" y1="'+part.y+'" x2="'+(x+13)+'" y2="'+part.y+'"/>' : "") +
          (part.y <= 54 ? '<line class="ledger" x1="'+(x-13)+'" y1="'+part.y+'" x2="'+(x+13)+'" y2="'+part.y+'"/>' : "");
        return ledger + (part.accidental ? '<text class="accidental" x="'+(x-17)+'" y="'+(part.y+5)+'">'+part.accidental+'</text>' : "") +
          '<ellipse class="note-head" cx="'+x+'" cy="'+part.y+'" rx="7" ry="5" transform="rotate(-18 '+x+' '+part.y+')"/>';
      }).join("");
      return noteShapes + '<text class="chord-label" x="'+x+'" y="28" text-anchor="middle">'+escapeHtml(item[0])+'</text>';
    }).join("");
    return '<div class="score-frame"><p class="score-title">'+escapeHtml(title || "악보로 확인")+'</p><svg class="score-svg" viewBox="0 0 '+width+' 150" role="img" aria-label="'+escapeHtml(title || "화음 악보")+'"><rect width="520" height="150" rx="8" fill="#fffdf7"/><g class="staff-lines">'+staff+'</g><text class="music-glyph clef" x="26" y="105">𝄞</text>'+events+'</svg></div>';
  }
  function formulaVisual(key) {
    const formulas = {
      "quality-pairs":[["장3화음","4 + 3"],["단3화음","3 + 4"],["감3화음","3 + 3"],["증3화음","4 + 4"]],
      "seventh-family":[["maj7","장3화음 + 장7도"],["m7","단3화음 + 단7도"],["7","장3화음 + 단7도"],["m7♭5","감3화음 + 단7도"]],
      "sus-add":[["sus2","3음을 2음으로 교체"],["sus4","3음을 4음으로 교체"],["add9","3화음에 9음 추가"],["6","3화음에 6음 추가"]]
    };
    const rows = formulas[key];
    if (!rows) return "";
    return '<div class="chord-formula-grid">'+rows.map(function (row) { return '<div class="formula-card"><strong>'+row[0]+'</strong><b>'+row[1]+'</b></div>'; }).join("")+'</div>';
  }
  function renderVisual(key) {
    const score = SCORE_SETS[key];
    const formula = formulaVisual(key);
    if (!score) return '<div class="concept-map"><div class="concept-row"><strong>보기</strong><span>악보와 소리를 함께 비교하세요.</span></div></div>';
    const title = key === "lead-sheet" ? "리드시트의 코드와 멜로디" : "오선에서 음의 배치 비교";
    return (formula ? formula : "") + staffSvg(score, title);
  }

  function renderDashboard() {
    const nextId = recommendedId();
    const next = curriculum.skills[nextId];
    const strand = getStrand(nextId);
    const missing = next.prereqs.filter(function (id) { return !state.completed.has(id); });
    els.progressText.textContent = state.completed.size ? "숙달한 역량 " + state.completed.size + "개" : "아직 기록된 숙달 역량이 없습니다";
    els.continueCard.innerHTML = '<div class="continue-copy"><span class="continue-label">'+(missing.length ? "선수 역량부터 확인" : "지금 추천하는 다음 행동")+'</span><h2>'+escapeHtml(next.title)+'</h2><p>'+escapeHtml(next.summary)+'</p><div class="continue-meta"><span class="learning-chip">'+escapeHtml(strand.title)+'</span>'+next.tags.map(function (tag) { return '<span class="learning-chip">'+escapeHtml(tag)+'</span>'; }).join("")+'</div>'+prereqMarkup(next)+'</div><button class="continue-button" type="button" data-open-skill="'+nextId+'">학습 시작</button>';
    els.unitList.innerHTML = curriculum.strands.map(function (group) {
      const active = group.skills.includes(nextId);
      const readyCount = group.skills.filter(prereqsMet).length;
      return '<details class="unit-block skill-strand" '+(active ? "open" : "")+'><summary><span class="strand-mark" aria-hidden="true">'+strandIcon(group.id)+'</span><span class="unit-summary-copy"><strong>'+escapeHtml(group.title)+'</strong><small>'+escapeHtml(group.description)+'</small></span><span class="unit-count">준비된 역량 '+readyCount+'개</span></summary><div class="lesson-list">'+group.skills.map(skillButtonMarkup).join("")+'</div></details>';
    }).join("");
  }
  function strandIcon(id) {
    return { "chord-language":"C△", voicing:"↘", "tonal-map":"Ⅰ", progression:"→", application:"♪" }[id] || "♪";
  }
  function prereqMarkup(skill) {
    if (!skill.prereqs.length) return '<p class="prereq-line"><strong>시작 조건</strong> 바로 시작할 수 있습니다.</p>';
    return '<p class="prereq-line"><strong>먼저 익힐 역량</strong> '+skill.prereqs.map(function (id) { return '<span class="prereq-chip '+(state.completed.has(id) ? "done" : "")+'">'+escapeHtml(curriculum.skills[id].title)+'</span>'; }).join(" ")+'</p>';
  }
  function skillButtonMarkup(id) {
    const skill = curriculum.skills[id];
    const complete = state.completed.has(id);
    const ready = prereqsMet(id);
    return '<button class="lesson-button skill-button '+(complete ? "completed" : ready ? "ready" : "needs-prereq")+'" type="button" data-open-skill="'+id+'"><span class="skill-id" aria-hidden="true">'+strandIcon(getStrand(id).id)+'</span><span class="lesson-copy"><strong>'+escapeHtml(skill.title)+'</strong><small>'+escapeHtml(skill.summary)+'</small>'+(!ready && !complete ? '<span class="prereq-note">선수 역량을 먼저 추천합니다</span>' : "")+'</span><span class="skill-status">'+(complete ? "✓ 숙달" : ready ? "시작" : "미리보기")+'</span></button>';
  }

  function openSkill(id) {
    const skill = curriculum.skills[id];
    if (!skill) return;
    state.currentId = id;
    state.questionIndex = 0;
    state.firstTryCorrect = 0;
    state.attempts = 0;
    state.labPassed = state.completed.has(id);
    state.evidencePassed = state.completed.has(id);
    state.selectedMidis = new Set();
    const strand = getStrand(id);
    els.currentLesson.textContent = strand.title + " · " + (state.completed.has(id) ? "숙달 기록 있음" : prereqsMet(id) ? "수행 중" : "선수 역량 미완료");
    els.lessonUnit.textContent = strand.title;
    els.lessonTitle.textContent = skill.title;
    els.lessonEnglish.textContent = skill.english;
    els.lessonOutcome.innerHTML = '<strong>수행 목표</strong> '+escapeHtml(skill.outcome)+prereqMarkup(skill);
    els.lessonSections.innerHTML = skill.sections.map(function (section) {
      const audio = section.audioOptions && section.audioOptions.length ? '<div class="section-audio" aria-label="비교 청음">'+section.audioOptions.map(function (option, index) { return '<button type="button" data-section-audio="'+index+'">♪ '+escapeHtml(option.label)+'</button>'; }).join("")+'</div>' : "";
      return '<section class="lesson-section"><div class="section-copy"><span class="section-label">'+escapeHtml(section.label)+'</span><h2>'+escapeHtml(section.title)+'</h2>'+section.body.map(function (paragraph) { return '<p>'+escapeHtml(paragraph)+'</p>'; }).join("")+'<p class="section-takeaway"><strong>연주 판단</strong> '+escapeHtml(section.takeaway)+'</p>'+audio+'</div><div class="visual-board">'+renderVisual(section.visual)+'</div></section>';
    }).join("");
    Array.from(els.lessonSections.querySelectorAll(".lesson-section")).forEach(function (sectionEl, sectionIndex) {
      sectionEl.querySelectorAll("[data-section-audio]").forEach(function (button) {
        button.addEventListener("click", function () { playGroups(skill.sections[sectionIndex].audioOptions[Number(button.dataset.sectionAudio)].groups); });
      });
    });
    els.termList.innerHTML = skill.terms.map(function (term) { return '<div class="term-item"><strong>'+escapeHtml(term[0])+'</strong><span>'+escapeHtml(term[1])+'</span></div>'; }).join("");
    renderLab(skill);
    renderQuestion();
    els.practicePanel.open = false;
    els.dashboard.hidden = true;
    els.study.hidden = false;
    window.scrollTo({ top:0, behavior:"smooth" });
  }

  function labHeader(lab) {
    return '<div class="lab-heading"><div><span class="lab-kicker">직접 만드는 수행 과제</span><h2 id="constructionTitle">'+escapeHtml(lab.title)+'</h2><p>'+escapeHtml(lab.instruction)+'</p></div>'+(lab.reference ? '<button class="lab-reference" type="button" data-lab-reference>♪ 기준 소리</button>' : "")+'</div>';
  }
  function renderLab(skill) {
    const lab = skill.lab;
    els.constructionLab.className = "construction-lab lab-" + lab.type;
    if (lab.type === "keyboard") renderKeyboardLab(lab);
    else if (lab.type === "aural") renderAuralLab(lab);
    else renderProgressionLab(lab);
  }
  function renderKeyboardLab(lab) {
    els.constructionLab.innerHTML = labHeader(Object.assign({}, lab, { reference:true })) + '<div id="labPiano" class="piano lab-piano" aria-label="구성 실습 건반"></div><div class="lab-readout"><strong>선택한 음</strong><span id="labSelection">아직 선택한 음이 없습니다.</span></div><div class="lab-actions"><button class="lab-check" type="button" id="labCheck">구성 확인</button><button class="lab-reset" type="button" id="labReset">선택 지우기</button></div><p id="labFeedback" class="lab-feedback" aria-live="polite">악보와 소리를 참고한 뒤 직접 건반을 선택하세요.</p>';
    buildPiano(byId("labPiano"), 48, 72, function (midi, button) {
      if (state.selectedMidis.has(midi)) { state.selectedMidis.delete(midi); button.classList.remove("selected"); }
      else { state.selectedMidis.add(midi); button.classList.add("selected"); window.HarmonyPiano.playMidi(midi, { duration:.55 }); }
      byId("labSelection").textContent = state.selectedMidis.size ? Array.from(state.selectedMidis).sort(function (a,b) { return a-b; }).map(midiName).join(" · ") : "아직 선택한 음이 없습니다.";
    });
    byId("labCheck").addEventListener("click", function () {
      const selected = Array.from(state.selectedMidis).sort(function (a,b) { return a-b; });
      const target = lab.mode === "exact" ? (lab.targetMidis || []).slice().sort(function (a,b) { return a-b; }) : (lab.targetPcs || []).slice().sort(function (a,b) { return a-b; });
      const actual = lab.mode === "exact" ? selected : Array.from(new Set(selected.map(function (midi) { return midi % 12; }))).sort(function (a,b) { return a-b; });
      const correct = actual.length === target.length && actual.every(function (value, index) { return value === target[index]; });
      setLabFeedback(correct, correct ? lab.success : lab.hint);
    });
    byId("labReset").addEventListener("click", function () {
      state.selectedMidis.clear();
      byId("labPiano").querySelectorAll(".selected").forEach(function (button) { button.classList.remove("selected"); });
      byId("labSelection").textContent = "아직 선택한 음이 없습니다.";
      byId("labFeedback").textContent = "선택을 지웠습니다. 다시 구성해 보세요.";
      byId("labFeedback").className = "lab-feedback";
    });
    byId("constructionLab").querySelector("[data-lab-reference]").addEventListener("click", function () { playGroups([lab.reference]); });
  }
  function renderAuralLab(lab) {
    els.constructionLab.innerHTML = labHeader(lab) + '<div class="aural-console"><button class="lab-reference aural-play" type="button" id="auralPlay">♪ 문제 다시 듣기</button><div class="aural-choices">'+lab.choices.map(function (choice) { return '<button type="button" data-aural-choice="'+escapeHtml(choice)+'">'+escapeHtml(choice)+'</button>'; }).join("")+'</div><p id="labFeedback" class="lab-feedback" aria-live="polite">소리를 두 번 이상 비교해도 괜찮습니다.</p></div>';
    byId("auralPlay").addEventListener("click", function () { playGroups(lab.groups); });
    els.constructionLab.querySelectorAll("[data-aural-choice]").forEach(function (button) {
      button.addEventListener("click", function () {
        const correct = button.dataset.auralChoice === lab.answer;
        if (correct) els.constructionLab.querySelectorAll("[data-aural-choice]").forEach(function (item) { item.disabled = true; });
        setLabFeedback(correct, correct ? lab.success : lab.hint);
      });
    });
  }
  function renderProgressionLab(lab) {
    const selects = Array.from({ length:lab.slots }, function (_, index) { return '<label><span>'+(index+1)+'마디</span><select class="progression-slot" aria-label="'+(index+1)+'마디 코드"><option value="">코드 선택</option>'+lab.options.map(function (option) { return '<option>'+escapeHtml(option)+'</option>'; }).join("")+'</select></label>'; }).join("");
    els.constructionLab.innerHTML = labHeader(lab) + '<div class="progression-builder">'+selects+'</div><div class="lab-actions"><button class="lab-reference" type="button" id="progressionPlay">♪ 내 진행 듣기</button><button class="lab-check" type="button" id="progressionCheck">진행 확인</button></div><p id="labFeedback" class="lab-feedback" aria-live="polite">코드 관계를 고른 뒤 실제 소리로 연결을 확인하세요.</p>';
    function values() { return Array.from(els.constructionLab.querySelectorAll(".progression-slot")).map(function (select) { return select.value; }); }
    byId("progressionPlay").addEventListener("click", function () {
      const chosen = values();
      if (chosen.some(function (value) { return !value; })) { setLabFeedback(false, "모든 마디의 코드를 먼저 선택하세요."); return; }
      playGroups(chosen.map(function (name) { return lab.audioMap[name]; }));
    });
    byId("progressionCheck").addEventListener("click", function () {
      const chosen = values();
      const correct = lab.accepted.some(function (answer) { return answer.every(function (value, index) { return value === chosen[index]; }); });
      setLabFeedback(correct, correct ? lab.success : lab.hint);
    });
  }
  function setLabFeedback(correct, message) {
    const feedback = byId("labFeedback");
    feedback.textContent = message;
    feedback.className = "lab-feedback " + (correct ? "success" : "error");
    if (correct) {
      state.labPassed = true;
      maybeCompleteSkill();
    }
  }

  function renderQuestion() {
    const skill = curriculum.skills[state.currentId];
    const question = skill.evidence[state.questionIndex];
    els.roundCounter.textContent = "근거 " + (state.questionIndex + 1) + " / " + skill.evidence.length;
    els.scoreText.textContent = "첫 시도 정답 " + state.firstTryCorrect + "개";
    els.questionKind.textContent = question.kind;
    els.questionPrompt.textContent = question.prompt;
    els.listenButton.hidden = !question.audioGroups;
    els.questionVisual.innerHTML = question.visual ? '<div class="visual-board">'+renderVisual(question.visual)+'</div>' : "";
    els.answerChoices.innerHTML = question.choices.map(function (choice) { return '<button class="answer-choice" type="button" data-answer="'+escapeHtml(choice)+'">'+escapeHtml(choice)+'</button>'; }).join("");
    els.feedback.textContent = "정답을 고른 뒤 설명을 확인하세요.";
    els.feedback.className = "feedback";
    els.nextButton.hidden = true;
    els.nextButton.onclick = null;
    state.attempts = 0;
    els.answerChoices.querySelectorAll("[data-answer]").forEach(function (button) {
      button.addEventListener("click", function () { answerQuestion(button, question); });
    });
    els.listenButton.onclick = function () { playGroups(question.audioGroups); };
  }
  function answerQuestion(button, question) {
    state.attempts += 1;
    if (button.dataset.answer !== question.answer) {
      button.classList.add("wrong");
      button.disabled = true;
      els.feedback.textContent = "다시 생각해 보세요. " + question.explain;
      els.feedback.className = "feedback error";
      return;
    }
    if (state.attempts === 1) state.firstTryCorrect += 1;
    els.answerChoices.querySelectorAll("[data-answer]").forEach(function (choice) { choice.disabled = true; });
    button.classList.add("correct");
    els.feedback.textContent = "맞았습니다. " + question.explain;
    els.feedback.className = "feedback success";
    els.scoreText.textContent = "첫 시도 정답 " + state.firstTryCorrect + "개";
    els.nextButton.textContent = state.questionIndex === curriculum.skills[state.currentId].evidence.length - 1 ? "수행 결과 확인" : "다음 근거";
    els.nextButton.hidden = false;
  }
  function nextQuestion() {
    const skill = curriculum.skills[state.currentId];
    if (state.questionIndex < skill.evidence.length - 1) {
      state.questionIndex += 1;
      renderQuestion();
      return;
    }
    state.evidencePassed = true;
    if (!state.labPassed) {
      els.feedback.textContent = "근거 문제는 확인했습니다. 위의 직접 구성 수행까지 성공하면 이 역량이 숙달됩니다.";
      els.feedback.className = "feedback pending";
      els.nextButton.textContent = "직접 구성 수행으로 이동";
      els.nextButton.onclick = function () { els.constructionLab.scrollIntoView({ behavior:"smooth", block:"start" }); };
      return;
    }
    maybeCompleteSkill();
  }
  function maybeCompleteSkill() {
    if (!state.labPassed || !state.evidencePassed) return;
    const wasNew = !state.completed.has(state.currentId);
    state.completed.add(state.currentId);
    saveCompleted();
    if (wasNew) showToast("역량 숙달 기록을 저장했습니다.");
    if (els.feedback) {
      els.feedback.textContent = "직접 구성과 판단 근거를 모두 확인했습니다. 이 역량을 숙달로 기록했습니다.";
      els.feedback.className = "feedback success";
    }
    els.nextButton.hidden = false;
    els.nextButton.textContent = "추천 다음 역량 보기";
    els.nextButton.onclick = function () { showDashboard(); };
  }

  function midiName(midi) { return NOTE_NAMES[midi % 12] + (Math.floor(midi / 12) - 1); }
  function buildPiano(container, fromMidi, toMidi, onPress) {
    const whitePitchClasses = new Set([0,2,4,5,7,9,11]);
    const notes = [];
    for (let midi = fromMidi; midi <= toMidi; midi += 1) notes.push(midi);
    const whites = notes.filter(function (midi) { return whitePitchClasses.has(midi % 12); });
    container.innerHTML = "";
    whites.forEach(function (midi) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "piano-key white";
      button.dataset.midi = midi;
      button.setAttribute("aria-label", midiName(midi));
      button.innerHTML = '<span>'+midiName(midi)+'</span>';
      button.addEventListener("click", function () { onPress(midi, button); });
      container.appendChild(button);
    });
    notes.filter(function (midi) { return !whitePitchClasses.has(midi % 12); }).forEach(function (midi) {
      const priorWhites = notes.filter(function (value) { return value < midi && whitePitchClasses.has(value % 12); }).length;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "piano-key black";
      button.dataset.midi = midi;
      button.style.left = (priorWhites / whites.length * 100) + "%";
      button.setAttribute("aria-label", midiName(midi));
      button.innerHTML = '<span>'+midiName(midi)+'</span>';
      button.addEventListener("click", function () { onPress(midi, button); });
      container.appendChild(button);
    });
  }
  function renderFreePiano() {
    buildPiano(els.piano, 48, 72, function (midi, button) {
      button.classList.add("active");
      window.setTimeout(function () { button.classList.remove("active"); }, 180);
      if (window.HarmonyPiano) window.HarmonyPiano.playMidi(midi, { duration:.7 });
    });
  }
  function showDashboard() {
    els.study.hidden = true;
    els.dashboard.hidden = false;
    renderDashboard();
    window.scrollTo({ top:0, behavior:"smooth" });
  }
  function resetProgress() {
    if (!window.confirm("이 브라우저에 저장된 실용화성학 숙달 기록을 지울까요?")) return;
    state.completed.clear();
    saveCompleted();
    renderDashboard();
    showToast("숙달 기록을 초기화했습니다.");
  }
  function bindEvents() {
    document.addEventListener("click", function (event) {
      const button = event.target.closest("[data-open-skill]");
      if (button) openSkill(button.dataset.openSkill);
    });
    els.backToCourse.addEventListener("click", showDashboard);
    els.resetProgress.addEventListener("click", resetProgress);
    els.nextButton.addEventListener("click", nextQuestion);
  }
  function init() {
    ["dashboard","study","progressText","resetProgress","continueCard","unitList","backToCourse","currentLesson","lessonUnit","lessonTitle","lessonEnglish","lessonOutcome","lessonSections","constructionLab","termList","practicePanel","roundCounter","scoreText","questionKind","questionPrompt","listenButton","questionVisual","answerChoices","feedback","nextButton","piano","toast"].forEach(function (id) { els[id] = byId(id); });
    renderDashboard();
    renderFreePiano();
    bindEvents();
    if (window.HarmonyPiano) window.setTimeout(function () { window.HarmonyPiano.preload(); }, 1200);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
