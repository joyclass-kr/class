(function () {
    "use strict";

    const DATA = window.PianoSkillsData;
    const SOURCE = window.PianoSourceCatalog;
    if (!DATA || !SOURCE) return;

    const elements = {};
    [
        "midiButton", "midiButtonLabel", "midiStatus", "scaleControls", "voicingControls", "referenceControls",
        "whiteKeyChoices", "exceptionKeyChoices", "blackKeyChoices", "scaleTypeChoices", "handChoices",
        "skillChoices", "referenceSelect", "previousChapterButton", "nextChapterButton", "chapterRange", "chapterTitle",
        "chapterSummary", "exerciseEyebrow", "exerciseTitle", "exerciseSummary", "scoreHeading", "pageControls",
        "scoreViewport", "scoreSurface", "scoreCaption", "previousPageButton", "nextPageButton", "pageIndicator",
        "lessonNotes", "lessonNotesTitle", "conceptList", "practiceList", "practiceDock", "tempo", "tempoOutput", "listenButton",
        "practiceButton", "metronomeButton", "resetButton", "feedback", "midiMonitor", "noteReadout", "miniKeyboard"
    ].forEach(function (id) { elements[id] = document.getElementById(id); });

    const SCALE_KEY_ORDER = ["C", "D", "E", "G", "A", "F", "B", "Db", "Eb", "Gb", "Ab", "Bb"];
    const SCALE_KEY_GROUPS = [
        { container:"whiteKeyChoices", ids:["C", "D", "E", "G", "A"] },
        { container:"exceptionKeyChoices", ids:["F", "B"] },
        { container:"blackKeyChoices", ids:["Db", "Eb", "Gb", "Ab", "Bb"] }
    ];
    const SCALE_KEY_BUTTON_LABELS = {
        C:"C", D:"D", E:"E", G:"G", A:"A", F:"F", B:"B",
        Db:"D♭ / C♯", Eb:"E♭", Gb:"G♭ / F♯", Ab:"A♭ / G♯", Bb:"B♭"
    };
    const SCALE_ROOT_NAMES = {
        Db:{ major:"D♭", minor:"C♯" },
        Gb:{ major:"G♭", minor:"F♯" },
        Ab:{ major:"A♭", minor:"G♯" }
    };
    const HAND_LABELS = { both:"Both Hands", right:"Right Hand", left:"Left Hand" };
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
        midiNotes: new Set(),
        virtualPointers: new Map(),
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

    function currentModule() {
        return DATA.voicingModules.find(function (module) {
            return module.skills.some(function (skill) { return Number(skill) === state.skillId; });
        }) || DATA.voicingModules[0];
    }

    function scaleRootLabel() {
        const names = SCALE_ROOT_NAMES[state.scaleKeyId];
        if (!names) return keyById(state.scaleKeyId).label;
        return state.scaleType === "major" ? names.major : names.minor;
    }

    function option(value, label) {
        const item = document.createElement("option");
        item.value = value;
        item.textContent = label;
        return item;
    }

    function choiceButton(value, label, dataName) {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "choice-button";
        item.dataset[dataName] = value;
        item.setAttribute("aria-pressed", "false");
        item.textContent = label;
        return item;
    }

    function populateSelectors() {
        SCALE_KEY_GROUPS.forEach(function (group) {
            group.ids.forEach(function (id) {
                elements[group.container].appendChild(choiceButton(id, SCALE_KEY_BUTTON_LABELS[id], "scaleKey"));
            });
        });
        Object.keys(DATA.scaleTypes).forEach(function (id) {
            elements.scaleTypeChoices.appendChild(choiceButton(id, DATA.scaleTypes[id].label, "scaleType"));
        });
        Object.keys(HAND_LABELS).forEach(function (id) {
            elements.handChoices.appendChild(choiceButton(id, HAND_LABELS[id], "hand"));
        });
        SOURCE.referenceSections.forEach(function (section) {
            elements.referenceSelect.appendChild(option(section.id, section.label));
        });
    }

    function renderScaleChoices() {
        document.querySelectorAll("[data-scale-key]").forEach(function (button) {
            const active = button.dataset.scaleKey === state.scaleKeyId;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", String(active));
        });
        document.querySelectorAll("[data-scale-type]").forEach(function (button) {
            const active = button.dataset.scaleType === state.scaleType;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", String(active));
        });
        document.querySelectorAll("[data-hand]").forEach(function (button) {
            const active = button.dataset.hand === state.hand;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", String(active));
        });
    }

    function renderVoicingChoices() {
        const module = currentModule();
        const first = Number(module.skills[0]);
        const last = Number(module.skills[module.skills.length - 1]);
        const moduleIndex = DATA.voicingModules.indexOf(module);
        elements.chapterRange.textContent = "Skill " + first + (first === last ? "" : "-" + last);
        elements.chapterTitle.textContent = module.title;
        elements.chapterSummary.textContent = module.summary;
        elements.previousChapterButton.disabled = moduleIndex === 0;
        elements.nextChapterButton.disabled = moduleIndex === DATA.voicingModules.length - 1;
        elements.skillChoices.replaceChildren();
        SOURCE.skills.filter(function (skill) { return skill.moduleId === module.id; }).forEach(function (skill) {
            const button = choiceButton(String(skill.id), "Skill " + skill.id + " · " + skill.title, "skillId");
            const active = skill.id === state.skillId;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", String(active));
            elements.skillChoices.appendChild(button);
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
        elements.pageControls.hidden = pages.length <= 1;
        window.PianoEngraving.render(elements.scoreSurface, state.scoreModel, state.sourcePageIndex, { tempo:state.tempo });
        if (state.mode === "scale") {
            elements.scoreCaption.textContent = "Ascending과 Descending을 같은 박으로 연결하고, 손바꿈에서 멈추지 않습니다.";
        } else if (state.mode === "voicing") {
            const page = pages[state.sourcePageIndex];
            const source = page && page.sourcePage ? "Source p." + page.sourcePage + " · " : "";
            elements.scoreCaption.textContent = source + "Left Hand와 Right Hand의 Voice Leading(성부 진행)을 먼저 확인하고, 각 Bar를 끊지 않고 연결합니다.";
        } else {
            elements.scoreCaption.textContent = "설명을 읽은 뒤 해당 단계의 연습에 적용합니다.";
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
            fillList(elements.conceptList, lesson.concepts);
            fillList(elements.practiceList, lesson.practice);
            elements.lessonNotesTitle.textContent = lesson.title + " · 기본 개념과 연습 방법";
            return;
        }
        if (state.mode === "voicing") {
            const skill = skillById(state.skillId);
            fillList(elements.conceptList, skill.concepts);
            fillList(elements.practiceList, skill.practice);
            elements.lessonNotesTitle.textContent = skill.moduleTitle + " · 챕터 설명과 연습 방법";
            return;
        }
        fillList(elements.conceptList, DATA.practicePrinciples.slice(0, 5));
        fillList(elements.practiceList, DATA.practicePrinciples.slice(5));
        elements.lessonNotesTitle.textContent = "교재의 기본 연습 원칙";
    }

    function renderHeading() {
        if (state.mode === "scale") {
            const type = DATA.scaleTypes[state.scaleType];
            const lesson = scaleLesson();
            const stage = lesson.id === "scale-white" ? "1. Common Fingering Keys"
                : lesson.id === "scale-exceptions" ? "1-1. Exception Fingering Keys"
                : "2. Black-key-start Keys";
            elements.exerciseEyebrow.textContent = stage;
            elements.exerciseTitle.textContent = scaleRootLabel() + " " + type.label;
            elements.exerciseSummary.textContent = lesson.summary;
            elements.scoreHeading.textContent = scaleRootLabel() + " " + type.label + " · " + HAND_LABELS[state.hand] + " · Two Octaves";
            return;
        }
        if (state.mode === "voicing") {
            const skill = skillById(state.skillId);
            elements.exerciseEyebrow.textContent = skill.moduleTitle + " · 교재 단계";
            elements.exerciseTitle.textContent = "Skill " + skill.id + " · " + skill.title;
            elements.exerciseSummary.textContent = skill.summary;
            elements.scoreHeading.textContent = "Skill " + skill.id + " · " + skill.title;
            return;
        }
        const section = referenceById(state.referenceId);
        elements.exerciseEyebrow.textContent = "교재 설명";
        elements.exerciseTitle.textContent = section.label;
        elements.exerciseSummary.textContent = "기본 개념과 연습 방법을 읽고 해당 단계에 적용합니다.";
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
        elements.lessonNotes.open = state.mode !== "reference";
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
        renderScaleChoices();
        renderVoicingChoices();
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
        if (page && page.audioEvents) {
            return page.audioEvents.map(function (event) {
                return { label:event.label, notes:event.notes };
            });
        }
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
        const page = state.scoreModel && state.scoreModel.pages[state.sourcePageIndex];
        const sourceEvents = state.mode === "voicing" && page && page.audioEvents ? page.audioEvents : null;
        const gap = state.mode === "scale" ? 30 / state.tempo : 60 / state.tempo;
        elements.listenButton.disabled = true;
        setFeedback(sourceEvents ? "원본의 Note Value와 Voice Leading으로 현재 악보를 재생합니다." : "현재 조판 악보의 음을 샘플 피아노로 재생합니다.");
        const playback = sourceEvents
            ? window.PianoSampler.playTimeline(sourceEvents, 60 / state.tempo)
            : window.PianoSampler.playSequence(groups.map(function (group) { return group.notes; }), gap);
        const playbackSeconds = sourceEvents
            ? Math.max.apply(Math, sourceEvents.map(function (event) { return event.at + event.beats; })) * 60 / state.tempo
            : groups.length * gap;
        playback
            .then(function () {
                window.setTimeout(function () { renderTransport(); }, Math.ceil(playbackSeconds * 1000));
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
        const start = 48;
        const end = 72;
        let whiteCount = 0;
        for (let midi = start; midi <= end; midi += 1) {
            if (!BLACK_PCS.has(midi % 12)) whiteCount += 1;
        }
        const whiteWidth = 100 / whiteCount;
        const blackWidth = whiteWidth * .64;
        let whiteIndex = 0;
        for (let midi = start; midi <= end; midi += 1) {
            const key = document.createElement("button");
            const black = BLACK_PCS.has(midi % 12);
            key.type = "button";
            key.className = "piano-key " + (black ? "black" : "white");
            key.dataset.midi = String(midi);
            key.setAttribute("aria-label", midiName(midi, "flat") + " 연주");
            key.title = midiName(midi, "flat");
            if (black) {
                key.style.left = (whiteIndex * whiteWidth - blackWidth / 2) + "%";
                key.style.width = blackWidth + "%";
            } else {
                key.style.left = (whiteIndex * whiteWidth) + "%";
                key.style.width = whiteWidth + "%";
                whiteIndex += 1;
            }
            key.addEventListener("pointerdown", handleVirtualKeyDown);
            key.addEventListener("pointerup", releaseVirtualKey);
            key.addEventListener("pointercancel", releaseVirtualKey);
            key.addEventListener("lostpointercapture", releaseVirtualKey);
            key.addEventListener("click", function (event) {
                if (event.detail !== 0) return;
                const sourceId = "keyboard-" + midi;
                activateVirtualNote(midi, sourceId);
                window.setTimeout(function () { releaseVirtualNote(sourceId); }, 180);
            });
            elements.miniKeyboard.appendChild(key);
        }
    }

    function virtualNoteIsHeld(midi) {
        return Array.from(state.virtualPointers.values()).includes(midi);
    }

    function activateVirtualNote(midi, sourceId) {
        if (state.virtualPointers.has(sourceId)) return;
        state.virtualPointers.set(sourceId, midi);
        state.activeNotes.add(midi);
        updateKeyboard();
        assessNote(midi);
        window.PianoSampler.playMidi(midi, { volume:.11 }).catch(function () {
            setFeedback("피아노 소리를 불러오지 못했습니다. 입력 판정은 계속 사용할 수 있습니다.", "error");
        });
    }

    function releaseVirtualNote(sourceId) {
        const midi = state.virtualPointers.get(sourceId);
        if (typeof midi !== "number") return;
        state.virtualPointers.delete(sourceId);
        if (!virtualNoteIsHeld(midi) && !state.midiNotes.has(midi)) state.activeNotes.delete(midi);
        updateKeyboard();
    }

    function handleVirtualKeyDown(event) {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        event.preventDefault();
        const key = event.currentTarget;
        const sourceId = "pointer-" + event.pointerId;
        activateVirtualNote(Number(key.dataset.midi), sourceId);
        if (typeof key.setPointerCapture === "function") key.setPointerCapture(event.pointerId);
    }

    function releaseVirtualKey(event) {
        releaseVirtualNote("pointer-" + event.pointerId);
    }

    function updateKeyboard() {
        elements.miniKeyboard.querySelectorAll(".piano-key").forEach(function (key) {
            key.classList.toggle("is-active", state.activeNotes.has(Number(key.dataset.midi)));
        });
        if (!state.activeNotes.size) {
            elements.noteReadout.textContent = "화면 건반을 누르거나 MIDI 건반을 연주하세요.";
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
            state.midiNotes.add(midi);
            state.activeNotes.add(midi);
            updateKeyboard();
            assessNote(midi);
            window.PianoSampler.playMidi(midi, { volume: Math.max(.045, velocity / 760) }).catch(function () {});
        } else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
            state.midiNotes.delete(midi);
            if (!virtualNoteIsHeld(midi)) state.activeNotes.delete(midi);
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
    elements.referenceSelect.value = state.referenceId;

    document.querySelectorAll(".mode-tab").forEach(function (button) {
        button.addEventListener("click", function () { changeMode(button.dataset.mode); });
    });
    elements.scaleControls.addEventListener("click", function (event) {
        const button = event.target.closest("button[data-scale-key], button[data-scale-type], button[data-hand]");
        if (!button) return;
        if (button.dataset.scaleKey) state.scaleKeyId = button.dataset.scaleKey;
        if (button.dataset.scaleType) state.scaleType = button.dataset.scaleType;
        if (button.dataset.hand) state.hand = button.dataset.hand;
        state.sourcePageIndex = 0;
        resetPractice();
        renderAll();
    });
    elements.skillChoices.addEventListener("click", function (event) {
        const button = event.target.closest("button[data-skill-id]");
        if (!button) return;
        state.skillId = Number(button.dataset.skillId);
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
    elements.previousChapterButton.addEventListener("click", function () {
        const index = DATA.voicingModules.indexOf(currentModule());
        if (index <= 0) return;
        state.skillId = Number(DATA.voicingModules[index - 1].skills[0]);
        state.tempo = skillById(state.skillId).tempo;
        state.sourcePageIndex = 0;
        resetPractice();
        renderAll();
    });
    elements.nextChapterButton.addEventListener("click", function () {
        const index = DATA.voicingModules.indexOf(currentModule());
        if (index >= DATA.voicingModules.length - 1) return;
        state.skillId = Number(DATA.voicingModules[index + 1].skills[0]);
        state.tempo = skillById(state.skillId).tempo;
        state.sourcePageIndex = 0;
        resetPractice();
        renderAll();
    });
    elements.previousPageButton.addEventListener("click", function () {
        state.sourcePageIndex -= 1;
        resetPractice();
        renderScore();
    });
    elements.nextPageButton.addEventListener("click", function () {
        state.sourcePageIndex += 1;
        resetPractice();
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
