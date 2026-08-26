(function () {
    "use strict";

    const DATA = window.PianoSkillsData;
    const SOURCE = window.PianoSourceCatalog;
    if (!DATA || !SOURCE) return;

    const elements = {};
    [
        "midiButton", "midiButtonLabel", "midiStatus", "scaleControls", "voicingControls", "referenceControls",
        "scaleKeySelect", "scaleTypeSelect", "handSelect", "skillSelect", "referenceSelect", "previousSkillButton",
        "nextSkillButton", "exerciseEyebrow", "exerciseTitle", "exerciseSummary", "sourceBadge", "scoreHeading",
        "scoreViewport", "scoreSurface", "scoreCaption", "previousPageButton", "nextPageButton", "pageIndicator",
        "lessonNotes", "conceptList", "practiceList", "practiceDock", "tempo", "tempoOutput", "listenButton",
        "practiceButton", "metronomeButton", "resetButton", "feedback", "midiMonitor", "noteReadout", "miniKeyboard"
    ].forEach(function (id) { elements[id] = document.getElementById(id); });

    const SCALE_KEY_ORDER = ["C", "D", "E", "G", "A", "F", "B", "Db", "Eb", "Gb", "Ab", "Bb"];
    const FLAT_NAMES = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
    const SHARP_NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
    const BLACK_PCS = new Set([1, 3, 6, 8, 10]);
    const state = {
        mode: "scale",
        scaleKeyId: "C",
        scaleType: "major",
        hand: "both",
        skillId: 1,
        referenceId: "intro",
        sourcePageIndex: 0,
        tempo: 60,
        practicing: false,
        targetIndex: 0,
        expectedGroups: [],
        collected: new Set(),
        activeNotes: new Set(),
        midiAccess: null,
        metronomeTimer: null,
        freeNoteCount: 0,
        scoreModel: null
    };

    const initialParams = new URLSearchParams(window.location.search);
    if (["scale", "voicing", "reference"].includes(initialParams.get("mode"))) state.mode = initialParams.get("mode");
    if (Number(initialParams.get("skill")) >= 1 && Number(initialParams.get("skill")) <= 123) {
        state.skillId = Number(initialParams.get("skill"));
    }
    if (SCALE_KEY_ORDER.includes(initialParams.get("key"))) state.scaleKeyId = initialParams.get("key");
    if (DATA.scaleTypes[initialParams.get("scale")]) state.scaleType = initialParams.get("scale");
    if (SOURCE.referenceSections.some(function (section) { return section.id === initialParams.get("section"); })) {
        state.referenceId = initialParams.get("section");
    }

    function keyById(id) {
        return DATA.keys.find(function (key) { return key.id === id; }) || DATA.keys[0];
    }

    function skillById(id) {
        return SOURCE.skills[id - 1];
    }

    function referenceById(id) {
        return SOURCE.referenceSections.find(function (section) { return section.id === id; }) || SOURCE.referenceSections[0];
    }

    function option(value, label) {
        const item = document.createElement("option");
        item.value = value;
        item.textContent = label;
        return item;
    }

    function populateSelectors() {
        SCALE_KEY_ORDER.forEach(function (id) {
            const key = keyById(id);
            elements.scaleKeySelect.appendChild(option(id, key.label));
        });
        Object.keys(DATA.scaleTypes).forEach(function (id) {
            elements.scaleTypeSelect.appendChild(option(id, DATA.scaleTypes[id].label));
        });
        DATA.voicingModules.forEach(function (module) {
            const group = document.createElement("optgroup");
            group.label = "Skill " + module.skills[0] + "–" + module.skills[module.skills.length - 1] + " · " + module.title;
            SOURCE.skills.filter(function (skill) { return skill.moduleId === module.id; }).forEach(function (skill) {
                group.appendChild(option(String(skill.id), "Skill " + skill.id + " · " + skill.title));
            });
            elements.skillSelect.appendChild(group);
        });
        SOURCE.referenceSections.forEach(function (section) {
            elements.referenceSelect.appendChild(option(section.id, section.label));
        });
    }

    function scaleLesson() {
        if (["F", "B"].includes(state.scaleKeyId)) return DATA.scaleLessons.find(function (lesson) { return lesson.id === "scale-exceptions"; });
        if (["Db", "Eb", "Gb", "Ab", "Bb"].includes(state.scaleKeyId)) return DATA.scaleLessons.find(function (lesson) { return lesson.id === "scale-black"; });
        return DATA.scaleLessons.find(function (lesson) { return lesson.id === "scale-white"; });
    }

    function renderScore() {
        state.scoreModel = window.PianoEngraving.build({
            mode:state.mode,
            keyId:state.scaleKeyId,
            scaleType:state.scaleType,
            hand:state.hand,
            skillId:state.skillId,
            referenceId:state.referenceId
        });
        const pages = state.scoreModel.pages;
        state.sourcePageIndex = Math.max(0, Math.min(state.sourcePageIndex, pages.length - 1));
        elements.pageIndicator.textContent = (state.sourcePageIndex + 1) + " / " + pages.length;
        elements.previousPageButton.disabled = state.sourcePageIndex === 0;
        elements.nextPageButton.disabled = state.sourcePageIndex >= pages.length - 1;
        elements.sourceBadge.textContent = "새 악보 " + (state.sourcePageIndex + 1) + "/" + pages.length;
        window.PianoEngraving.render(elements.scoreSurface, state.scoreModel, state.sourcePageIndex, { tempo:state.tempo });
        elements.scoreViewport.scrollTop = 0;
        elements.scoreViewport.scrollLeft = 0;
        if (state.mode === "scale") {
            elements.scoreCaption.textContent = "제공된 운지표의 음과 손가락 번호를 바탕으로 새로 조판한 양손 두 옥타브 악보입니다.";
        } else if (state.mode === "voicing") {
            elements.scoreCaption.textContent = "Jazz Piano Voicing Skills · Skill " + state.skillId + "의 성부와 진행을 새 SVG 악보로 조판했습니다.";
        } else {
            elements.scoreCaption.textContent = "교재의 기본 개념·연습 원칙·과정 순서를 읽기 쉬운 학습 카드로 다시 구성했습니다.";
        }
    }

    function fillList(element, items) {
        element.replaceChildren();
        items.forEach(function (text) {
            const item = document.createElement("li");
            item.textContent = text;
            element.appendChild(item);
        });
    }

    function renderNotes() {
        if (state.mode === "scale") {
            const lesson = scaleLesson();
            fillList(elements.conceptList, [
                "제공된 자료의 음과 운지를 대조해 오른손·왼손 두 보표의 두 옥타브 악보로 다시 조판했습니다."
            ].concat(lesson.concepts));
            fillList(elements.practiceList, [
                "먼저 한 손씩 손바꿈을 확인하고, 그다음 양손을 한 옥타브 간격으로 맞춥니다."
            ].concat(lesson.practice));
            return;
        }
        if (state.mode === "voicing") {
            const skill = skillById(state.skillId);
            fillList(elements.conceptList, skill.concepts);
            fillList(elements.practiceList, skill.practice);
            return;
        }
        fillList(elements.conceptList, DATA.practicePrinciples.slice(0, 5));
        fillList(elements.practiceList, DATA.practicePrinciples.slice(5));
    }

    function renderHeading() {
        if (state.mode === "scale") {
            const key = keyById(state.scaleKeyId);
            const type = DATA.scaleTypes[state.scaleType];
            elements.exerciseEyebrow.textContent = "SCALE · TWO OCTAVES";
            elements.exerciseTitle.textContent = key.label + " " + type.label;
            elements.exerciseSummary.textContent = "제공된 운지표를 대조해 새로 조판한 악보로 양손 두 옥타브를 연습합니다.";
            elements.scoreHeading.textContent = "새로 조판한 스케일 악보";
            return;
        }
        if (state.mode === "voicing") {
            const skill = skillById(state.skillId);
            elements.exerciseEyebrow.textContent = skill.moduleTitle.toUpperCase() + " · BOOK SKILL";
            elements.exerciseTitle.textContent = "Skill " + skill.id + " · " + skill.title;
            elements.exerciseSummary.textContent = skill.summary;
            elements.scoreHeading.textContent = "Skill " + skill.id + " 재조판 악보";
            return;
        }
        const section = referenceById(state.referenceId);
        elements.exerciseEyebrow.textContent = "BOOK NOTES · REBUILT";
        elements.exerciseTitle.textContent = section.label;
        elements.exerciseSummary.textContent = "교재의 기본 개념, 연습 방법, 적용 설명과 과정표를 학습용으로 다시 구성했습니다.";
        elements.scoreHeading.textContent = "교재 개념 정리";
    }

    function renderMode() {
        document.body.dataset.mode = state.mode;
        document.querySelectorAll(".mode-tab").forEach(function (button) {
            const active = button.dataset.mode === state.mode;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", String(active));
        });
        elements.scaleControls.hidden = state.mode !== "scale";
        elements.voicingControls.hidden = state.mode !== "voicing";
        elements.referenceControls.hidden = state.mode !== "reference";
        elements.practiceDock.hidden = state.mode === "reference";
        elements.midiMonitor.hidden = state.mode === "reference";
        elements.lessonNotes.open = false;
    }

    function renderTransport() {
        elements.tempo.value = String(state.tempo);
        elements.tempoOutput.value = String(state.tempo);
        const guided = currentScoreGroups().length > 0;
        elements.listenButton.disabled = !guided;
        elements.listenButton.title = guided ? "현재 악보 페이지를 피아노 샘플로 재생합니다." : "개념 페이지에서는 재생하지 않습니다.";
        elements.practiceButton.textContent = state.practicing ? "연습 끝내기" : "연습 시작";
    }

    function renderAll() {
        renderMode();
        renderHeading();
        renderScore();
        renderNotes();
        renderTransport();
    }

    function currentScoreGroups() {
        if (!state.scoreModel || state.mode === "reference") return [];
        if (state.mode === "scale") {
            const spelling = keyById(state.scaleKeyId).spelling;
            return state.scoreModel.audioGroups.map(function (notes, index) {
                return {
                    label:(index + 1) + "번째 · " + notes.map(function (note) { return midiName(note, spelling); }).join(" + "),
                    notes:notes
                };
            });
        }
        const page = state.scoreModel.pages[state.sourcePageIndex];
        if (!page || !page.groups) return [];
        return page.groups.map(function (group) {
            return {
                label:group.label,
                notes:group.left.concat(group.right).map(function (note) { return note.midi; })
            };
        });
    }

    function setFeedback(text, tone) {
        elements.feedback.textContent = text;
        elements.feedback.classList.toggle("is-success", tone === "success");
        elements.feedback.classList.toggle("is-error", tone === "error");
    }

    function midiName(midi, spelling) {
        const names = spelling === "flat" ? FLAT_NAMES : SHARP_NAMES;
        return names[((midi % 12) + 12) % 12] + (Math.floor(midi / 12) - 1);
    }

    function describeTarget() {
        const group = state.expectedGroups[state.targetIndex];
        if (!group) return "";
        return (state.targetIndex + 1) + " / " + state.expectedGroups.length + " · " + group.label;
    }

    function startPractice() {
        if (state.practicing) {
            state.practicing = false;
            state.collected.clear();
            renderTransport();
            setFeedback("연습을 끝냈습니다. 같은 Skill을 다시 누르면 처음부터 시작합니다.");
            return;
        }
        state.practicing = true;
        state.targetIndex = 0;
        state.freeNoteCount = 0;
        state.collected.clear();
        state.expectedGroups = currentScoreGroups();
        renderTransport();
        window.PianoSampler.preload().catch(function () {
            setFeedback("피아노 소리를 불러오지 못했습니다. MIDI 입력 표시는 계속 사용할 수 있습니다.", "error");
        });
        if (state.expectedGroups.length) {
            setFeedback("첫 목표 " + describeTarget() + " · MIDI 건반으로 표시된 음을 연주하세요.");
        } else {
            setFeedback("자유 연습 중 · 조판된 악보를 보며 연주하세요. 누른 음과 횟수만 기록합니다.");
        }
    }

    function resetPractice() {
        state.practicing = false;
        state.targetIndex = 0;
        state.freeNoteCount = 0;
        state.collected.clear();
        renderTransport();
        setFeedback("새 악보의 첫 마디부터 다시 준비하세요.");
    }

    function assessNote(midi) {
        if (!state.practicing) return;
        if (!state.expectedGroups.length) {
            state.freeNoteCount += 1;
            setFeedback("자유 연습 중 · 입력 " + state.freeNoteCount + "음 · 화면의 악보와 직접 대조하세요.");
            return;
        }
        const group = state.expectedGroups[state.targetIndex];
        if (group.notes.includes(midi)) {
            state.collected.add(midi);
            const complete = group.notes.every(function (note) { return state.collected.has(note); });
            if (!complete) {
                setFeedback(describeTarget() + " · " + state.collected.size + " / " + group.notes.length + "음");
                return;
            }
            state.targetIndex += 1;
            state.collected.clear();
            if (state.targetIndex >= state.expectedGroups.length) {
                state.practicing = false;
                renderTransport();
                setFeedback("완료했습니다. 현재 악보 페이지를 순서대로 연주했습니다.", "success");
            } else {
                setFeedback("좋아요. 다음 목표 " + describeTarget(), "success");
            }
            return;
        }
        const spelling = state.mode === "scale" ? keyById(state.scaleKeyId).spelling : "flat";
        setFeedback(midiName(midi, spelling) + "은 현재 목표에 없는 음입니다. 목표: " + group.label, "error");
    }

    function listen() {
        const groups = currentScoreGroups();
        if (!groups.length) return;
        const gap = state.mode === "scale" ? 30 / state.tempo : 60 / state.tempo;
        elements.listenButton.disabled = true;
        setFeedback("현재 조판 악보의 음을 샘플 피아노로 재생합니다.");
        window.PianoSampler.playSequence(groups.map(function (group) { return group.notes; }), gap)
            .then(function () {
                window.setTimeout(function () { renderTransport(); }, Math.ceil(groups.length * gap * 1000));
            })
            .catch(function () {
                renderTransport();
                setFeedback("피아노 샘플을 불러오지 못했습니다. 페이지를 서버에서 열었는지 확인해 주세요.", "error");
            });
    }

    function toggleMetronome() {
        if (state.metronomeTimer) {
            window.clearInterval(state.metronomeTimer);
            state.metronomeTimer = null;
            elements.metronomeButton.classList.remove("is-active");
            elements.metronomeButton.setAttribute("aria-pressed", "false");
            return;
        }
        const tick = new Audio("../../../../assets/sound/sfx/tick.ogg");
        tick.volume = .42;
        function playTick() {
            tick.currentTime = 0;
            tick.play().catch(function () {});
        }
        playTick();
        state.metronomeTimer = window.setInterval(playTick, 60000 / state.tempo);
        elements.metronomeButton.classList.add("is-active");
        elements.metronomeButton.setAttribute("aria-pressed", "true");
    }

    function restartMetronomeIfNeeded() {
        if (!state.metronomeTimer) return;
        window.clearInterval(state.metronomeTimer);
        state.metronomeTimer = null;
        elements.metronomeButton.classList.remove("is-active");
        elements.metronomeButton.setAttribute("aria-pressed", "false");
        toggleMetronome();
    }

    function buildMiniKeyboard() {
        const start = 36;
        const end = 84;
        let whiteCount = 0;
        for (let midi = start; midi <= end; midi += 1) {
            if (!BLACK_PCS.has(midi % 12)) whiteCount += 1;
        }
        const whiteWidth = 100 / whiteCount;
        const blackWidth = whiteWidth * .64;
        let whiteIndex = 0;
        for (let midi = start; midi <= end; midi += 1) {
            const key = document.createElement("span");
            const black = BLACK_PCS.has(midi % 12);
            key.className = "piano-key " + (black ? "black" : "white");
            key.dataset.midi = String(midi);
            if (black) {
                key.style.left = (whiteIndex * whiteWidth - blackWidth / 2) + "%";
                key.style.width = blackWidth + "%";
            } else {
                key.style.left = (whiteIndex * whiteWidth) + "%";
                key.style.width = whiteWidth + "%";
                whiteIndex += 1;
            }
            elements.miniKeyboard.appendChild(key);
        }
    }

    function updateKeyboard() {
        elements.miniKeyboard.querySelectorAll(".piano-key").forEach(function (key) {
            key.classList.toggle("is-active", state.activeNotes.has(Number(key.dataset.midi)));
        });
        if (!state.activeNotes.size) {
            elements.noteReadout.textContent = "건반을 누르면 음이 표시됩니다.";
            return;
        }
        const spelling = state.mode === "scale" ? keyById(state.scaleKeyId).spelling : "flat";
        elements.noteReadout.textContent = Array.from(state.activeNotes).sort(function (a,b) { return a-b; })
            .map(function (midi) { return midiName(midi, spelling); }).join(" · ");
    }

    function handleMidiMessage(event) {
        const command = event.data[0] & 0xf0;
        const midi = event.data[1];
        const velocity = event.data[2] || 0;
        if (command === 0x90 && velocity > 0) {
            state.activeNotes.add(midi);
            updateKeyboard();
            assessNote(midi);
            window.PianoSampler.playMidi(midi, { volume: Math.max(.045, velocity / 760) }).catch(function () {});
        } else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
            state.activeNotes.delete(midi);
            updateKeyboard();
        }
    }

    function bindMidiInputs() {
        if (!state.midiAccess) return;
        const inputs = Array.from(state.midiAccess.inputs.values());
        inputs.forEach(function (input) { input.onmidimessage = handleMidiMessage; });
        const connected = inputs.filter(function (input) { return input.state === "connected"; });
        elements.midiButton.classList.toggle("is-connected", connected.length > 0);
        elements.midiButtonLabel.textContent = connected.length ? "MIDI 연결됨" : "MIDI 연결";
        elements.midiStatus.textContent = connected.length
            ? connected.map(function (input) { return input.name || "MIDI 건반"; }).join(", ")
            : "연결된 MIDI 건반 없음";
    }

    function connectMidi() {
        if (!navigator.requestMIDIAccess) {
            elements.midiStatus.textContent = "이 브라우저는 Web MIDI를 지원하지 않습니다.";
            setFeedback("Chrome·Edge에서 USB MIDI 건반을 연결해 주세요. iPad 브라우저는 Web MIDI 지원이 제한될 수 있습니다.", "error");
            return;
        }
        navigator.requestMIDIAccess({ sysex:false }).then(function (access) {
            state.midiAccess = access;
            access.onstatechange = bindMidiInputs;
            bindMidiInputs();
            window.PianoSampler.preload().catch(function () {});
        }).catch(function () {
            elements.midiStatus.textContent = "MIDI 권한이 허용되지 않았습니다.";
            setFeedback("브라우저의 MIDI 기기 권한을 허용한 뒤 다시 눌러 주세요.", "error");
        });
    }

    function changeMode(mode) {
        state.mode = mode;
        state.sourcePageIndex = 0;
        resetPractice();
        if (mode === "scale") state.tempo = 60;
        if (mode === "voicing") state.tempo = skillById(state.skillId).tempo;
        renderAll();
    }

    populateSelectors();
    buildMiniKeyboard();
    if (state.mode === "voicing") state.tempo = skillById(state.skillId).tempo;
    elements.scaleKeySelect.value = state.scaleKeyId;
    elements.scaleTypeSelect.value = state.scaleType;
    elements.handSelect.value = state.hand;
    elements.skillSelect.value = String(state.skillId);
    elements.referenceSelect.value = state.referenceId;

    document.querySelectorAll(".mode-tab").forEach(function (button) {
        button.addEventListener("click", function () { changeMode(button.dataset.mode); });
    });
    elements.scaleKeySelect.addEventListener("change", function () {
        state.scaleKeyId = elements.scaleKeySelect.value;
        state.sourcePageIndex = 0;
        resetPractice();
        renderAll();
    });
    elements.scaleTypeSelect.addEventListener("change", function () {
        state.scaleType = elements.scaleTypeSelect.value;
        resetPractice();
        renderAll();
    });
    elements.handSelect.addEventListener("change", function () {
        state.hand = elements.handSelect.value;
        resetPractice();
        renderAll();
    });
    elements.skillSelect.addEventListener("change", function () {
        state.skillId = Number(elements.skillSelect.value);
        state.tempo = skillById(state.skillId).tempo;
        state.sourcePageIndex = 0;
        resetPractice();
        renderAll();
    });
    elements.referenceSelect.addEventListener("change", function () {
        state.referenceId = elements.referenceSelect.value;
        state.sourcePageIndex = 0;
        renderAll();
    });
    elements.previousSkillButton.addEventListener("click", function () {
        if (state.skillId <= 1) return;
        state.skillId -= 1;
        elements.skillSelect.value = String(state.skillId);
        state.tempo = skillById(state.skillId).tempo;
        state.sourcePageIndex = 0;
        resetPractice();
        renderAll();
    });
    elements.nextSkillButton.addEventListener("click", function () {
        if (state.skillId >= 123) return;
        state.skillId += 1;
        elements.skillSelect.value = String(state.skillId);
        state.tempo = skillById(state.skillId).tempo;
        state.sourcePageIndex = 0;
        resetPractice();
        renderAll();
    });
    elements.previousPageButton.addEventListener("click", function () {
        state.sourcePageIndex -= 1;
        renderScore();
    });
    elements.nextPageButton.addEventListener("click", function () {
        state.sourcePageIndex += 1;
        renderScore();
    });
    elements.tempo.addEventListener("input", function () {
        state.tempo = Number(elements.tempo.value);
        elements.tempoOutput.value = String(state.tempo);
        restartMetronomeIfNeeded();
    });
    elements.listenButton.addEventListener("click", listen);
    elements.practiceButton.addEventListener("click", startPractice);
    elements.metronomeButton.addEventListener("click", toggleMetronome);
    elements.resetButton.addEventListener("click", resetPractice);
    elements.midiButton.addEventListener("click", connectMidi);

    renderAll();
})();
