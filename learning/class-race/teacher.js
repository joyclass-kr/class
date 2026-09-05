(() => {
    "use strict";

    const GAME_ID = "quizrace";
    const registry = window.ClassRaceApps;

    const elements = {
        setupPanel: document.getElementById("setupPanel"),
        racePanel: document.getElementById("racePanel"),
        appGrid: document.getElementById("appGrid"),
        randomCount: document.getElementById("randomCount"),
        lessonSelect: document.getElementById("lessonSelect"),
        rangeSummary: document.getElementById("rangeSummary"),
        roomCode: document.getElementById("roomCode"),
        raceRoomCode: document.getElementById("raceRoomCode"),
        raceSubject: document.getElementById("raceSubject"),
        lobbyStudentCount: document.getElementById("lobbyStudentCount"),
        questionCountLabel: document.getElementById("questionCountLabel"),
        teacherStartButton: document.getElementById("teacherStartButton"),
        teacherNotice: document.getElementById("teacherNotice"),
        raceNotice: document.getElementById("raceNotice"),
        racePhaseBadge: document.getElementById("racePhaseBadge"),
        raceTotalCount: document.getElementById("raceTotalCount"),
        raceFinishedCount: document.getElementById("raceFinishedCount"),
        racePlayingCount: document.getElementById("racePlayingCount"),
        rankingList: document.getElementById("teacherRankingList"),
        emptyRanking: document.getElementById("emptyRanking"),
        resetRaceButton: document.getElementById("resetRaceButton")
    };

    const state = {
        appId: "",
        bank: null,
        loading: false,
        race: null
    };

    let lobby = null;

    function rangeMode() {
        return document.querySelector('input[name="rangeMode"]:checked')?.value || "random";
    }

    // 지금 고른 앱·범위로 실제로 낼 문제 묶음을 만든다. 서버에는 이 묶음이 통째로 간다.
    function buildBundle() {
        if (!state.bank) return null;
        const app = registry.get(state.appId);
        const allIds = [...state.bank.questions.keys()];
        let ids = [];
        let rangeTitle = "";
        if (rangeMode() === "lesson") {
            const lesson = state.bank.lessons.find((entry) => entry.id === elements.lessonSelect.value);
            if (!lesson) return null;
            ids = registry.shuffle(lesson.ids);
            rangeTitle = lesson.title;
        } else {
            const count = Number(elements.randomCount.value) || 10;
            ids = registry.shuffle(allIds).slice(0, count);
            rangeTitle = `전체 무작위 ${ids.length}문제`;
        }
        const questions = ids.map((id) => state.bank.questions.get(id)).filter(Boolean);
        return { appId: app.id, appTitle: app.title, rangeTitle, questions };
    }

    function updateRangeSummary() {
        const lessonMode = rangeMode() === "lesson";
        elements.lessonSelect.disabled = !lessonMode || !state.bank;
        elements.randomCount.disabled = lessonMode;
        if (!state.bank) {
            elements.rangeSummary.textContent = state.loading ? "문제를 불러오는 중입니다." : "앱을 고르면 문제 수가 여기에 나옵니다.";
            elements.questionCountLabel.textContent = "-";
            syncStartButton();
            return;
        }
        const app = registry.get(state.appId);
        const total = state.bank.questions.size;
        if (lessonMode) {
            const lesson = state.bank.lessons.find((entry) => entry.id === elements.lessonSelect.value);
            const count = lesson ? lesson.ids.length : 0;
            elements.rangeSummary.textContent = lesson
                ? `${app.title} · ${lesson.title} · ${count}문제 (${lesson.note})`
                : `${app.title} · 차시를 고르세요.`;
            elements.questionCountLabel.textContent = `${count}문제`;
        } else {
            const count = Math.min(Number(elements.randomCount.value) || 10, total);
            elements.rangeSummary.textContent = `${app.title} · 전체 ${total}문제 중 무작위 ${count}문제`;
            elements.questionCountLabel.textContent = `${count}문제`;
        }
        syncStartButton();
    }

    function renderLessonOptions() {
        elements.lessonSelect.replaceChildren();
        if (!state.bank || !state.bank.lessons.length) {
            const option = document.createElement("option");
            option.value = "";
            option.textContent = "이 앱은 차시가 없어요";
            elements.lessonSelect.append(option);
            return;
        }
        state.bank.lessons.forEach((lesson, index) => {
            const option = document.createElement("option");
            option.value = lesson.id;
            option.textContent = `${index + 1}. ${lesson.title} (${lesson.ids.length}문제)`;
            elements.lessonSelect.append(option);
        });
    }

    function renderAppGrid() {
        elements.appGrid.replaceChildren(...registry.list().map((app) => {
            const button = document.createElement("button");
            const title = document.createElement("strong");
            const subject = document.createElement("small");
            button.type = "button";
            button.className = "app-card";
            button.dataset.appId = app.id;
            button.classList.toggle("is-selected", app.id === state.appId);
            button.setAttribute("aria-pressed", String(app.id === state.appId));
            title.textContent = app.title;
            subject.textContent = app.subject;
            button.append(title, subject);
            button.addEventListener("click", () => selectApp(app.id));
            return button;
        }));
    }

    async function selectApp(appId) {
        if (state.loading) return;
        state.appId = appId;
        state.bank = null;
        state.loading = true;
        renderAppGrid();
        updateRangeSummary();
        try {
            state.bank = await registry.load(appId);
            elements.teacherNotice.textContent = "";
        } catch (error) {
            elements.teacherNotice.textContent = error.message || "문제를 불러오지 못했습니다.";
        } finally {
            state.loading = false;
        }
        renderLessonOptions();
        updateRangeSummary();
    }

    function formatElapsed(milliseconds) {
        const totalTenths = Math.max(0, Math.round(Number(milliseconds || 0) / 100));
        const minutes = Math.floor(totalTenths / 600);
        const seconds = ((totalTenths % 600) / 10).toFixed(1);
        return minutes > 0 ? `${minutes}분 ${seconds.padStart(4, "0")}초` : `${seconds}초`;
    }

    function studentCountFromSnapshot(snapshot) {
        return Math.max(0, Object.keys(snapshot?.players || {}).length - 1);
    }

    function currentStudentCount() {
        return state.race?.phase === "lobby"
            ? state.race.participants.length
            : studentCountFromSnapshot(lobby?.snapshot());
    }

    function syncStartButton() {
        const count = currentStudentCount();
        const ready = Boolean(state.bank) && (rangeMode() !== "lesson" || Boolean(elements.lessonSelect.value));
        elements.teacherStartButton.disabled = count < 1 || !ready || state.race?.phase === "running";
        elements.teacherStartButton.textContent = count < 1
            ? "학생 참가 대기"
            : !state.bank
                ? "앱을 먼저 고르세요"
                : `전원 시작 · ${count}명`;
    }

    function syncLobby(snapshot) {
        elements.lobbyStudentCount.textContent = `${currentStudentCount()}명`;
        elements.raceRoomCode.textContent = snapshot?.roomCode || elements.roomCode.textContent || "----";
        syncStartButton();
    }

    function startCompetition() {
        const bundle = buildBundle();
        if (!bundle || bundle.questions.length < 1) {
            elements.teacherNotice.textContent = "출제 문항을 만들지 못했습니다. 앱과 범위를 다시 고르세요.";
            return;
        }
        if (currentStudentCount() < 1) {
            elements.teacherNotice.textContent = "학생이 한 명 이상 참가해야 합니다.";
            return;
        }
        elements.teacherStartButton.disabled = true;
        elements.teacherStartButton.textContent = "시작하는 중...";
        elements.teacherNotice.textContent = "";
        lobby.sendServer({ type: "QUIZRACE_ACTION", action: "START", ...bundle });
    }

    function resetCompetition() {
        const message = state.race?.phase === "running"
            ? "진행 중인 순위와 결과를 지우고 새 순위전을 준비할까요?"
            : "현재 순위와 결과를 지우고 새 순위전을 준비할까요?";
        if (!window.confirm(message)) return;
        lobby.sendServer({ type: "QUIZRACE_ACTION", action: "RESET" });
    }

    function renderRanking(race) {
        const participants = Array.isArray(race.participants) ? race.participants : [];
        const rankings = Array.isArray(race.rankings) ? race.rankings : [];
        const playingCount = Math.max(0, participants.length - rankings.length);
        const total = Number(race.questionCount) || 0;

        elements.raceSubject.textContent = `${race.appTitle || ""} · ${race.rangeTitle || ""} · ${total}문제`;
        elements.raceTotalCount.textContent = `${participants.length}명`;
        elements.raceFinishedCount.textContent = `${rankings.length}명`;
        elements.racePlayingCount.textContent = `${playingCount}명`;
        elements.racePhaseBadge.textContent = race.phase === "ended" ? "최종 순위" : "진행 중";
        elements.racePhaseBadge.classList.toggle("ended", race.phase === "ended");
        elements.rankingList.replaceChildren();

        const makeRow = (rankText, nameText, scoreText, timeText, playing) => {
            const row = document.createElement("li");
            const rank = document.createElement("span");
            const name = document.createElement("span");
            const score = document.createElement("span");
            const time = document.createElement("span");
            row.className = "ranking-row";
            row.classList.toggle("is-playing", playing);
            rank.className = "rank-number";
            rank.textContent = rankText;
            name.className = "rank-name";
            name.textContent = nameText;
            score.className = "rank-score";
            score.textContent = scoreText;
            time.className = "rank-time";
            time.textContent = timeText;
            row.append(rank, name, score, time);
            return row;
        };

        rankings.forEach((entry) => {
            elements.rankingList.append(makeRow(`${entry.rank}위`, entry.name, `${entry.score}/${total}점`, formatElapsed(entry.elapsedMs), false));
        });
        const finishedIds = new Set(rankings.map((entry) => String(entry.id)));
        participants
            .filter((participant) => !finishedIds.has(String(participant.id)))
            .forEach((participant) => {
                elements.rankingList.append(makeRow("—", participant.name, "풀이 중", "완료 대기", true));
            });

        elements.emptyRanking.classList.toggle("hidden", participants.length > 0);
        elements.raceNotice.textContent = race.phase === "ended"
            ? `${participants.length}명 모두 완료했습니다.`
            : `${rankings.length}명 완료 · ${playingCount}명 풀이 중`;
    }

    function handleServerMessage(message, snapshot) {
        if (message.type === "QUIZRACE_ERROR") {
            const target = state.race?.phase === "running" || state.race?.phase === "ended"
                ? elements.raceNotice
                : elements.teacherNotice;
            target.textContent = message.message || "순위전 요청을 처리하지 못했습니다.";
            syncLobby(snapshot);
            return;
        }
        if (message.type !== "QUIZRACE_STATE" || !message.state) return;

        state.race = message.state;
        syncLobby(snapshot);
        if (message.state.phase === "lobby") {
            elements.racePanel.classList.add("hidden");
            elements.setupPanel.classList.remove("hidden");
            elements.teacherNotice.textContent = "";
            return;
        }
        elements.setupPanel.classList.add("hidden");
        elements.racePanel.classList.remove("hidden");
        renderRanking(message.state);
    }

    function initialize() {
        renderAppGrid();
        updateRangeSummary();

        if (!window.ClassroomMultiplayerLobby || !window.ClassroomNetwork) {
            elements.teacherNotice.textContent = "학급 서버를 불러오지 못했습니다. 잠시 후 다시 시도하세요.";
            return;
        }

        lobby = window.ClassroomMultiplayerLobby.create({
            gameId: GAME_ID,
            getPlayerName: () => "교사",
            initialMode: "host",
            minPlayers: 2,
            maxPlayers: 61,
            ids: { startButton: "teacherStartButtonUnused" },
            onStateChange: syncLobby,
            onServerMessage: handleServerMessage,
            onPlayerLeftDuringGame: () => {},
            onNotice: (message) => { elements.teacherNotice.textContent = message; },
            onAbort: ({ message }) => { elements.teacherNotice.textContent = message || "학급 연결이 종료되었습니다."; },
            getLobbyPresentation: ({ count }) => {
                const students = Math.max(0, count - 1);
                return {
                    canStart: false,
                    startText: "교사 전용 시작",
                    guideText: students > 0 ? `현재 ${students}명 참가` : "학생 참가를 기다리는 중입니다."
                };
            }
        }).mount();
    }

    document.querySelectorAll('input[name="rangeMode"]').forEach((input) => input.addEventListener("change", updateRangeSummary));
    elements.randomCount.addEventListener("change", updateRangeSummary);
    elements.lessonSelect.addEventListener("change", updateRangeSummary);
    elements.teacherStartButton.addEventListener("click", startCompetition);
    elements.resetRaceButton.addEventListener("click", resetCompetition);

    // 공용 뒤로가기 단추(assets/site-back-navigation.js)가 눌리면 먼저 물어본다.
    // 순위전이 진행 중일 때는 사이트 밖으로 나가지 않고 방금 상태로 새로고침한다.
    window.addEventListener("sitebackrequest", (event) => {
        if (elements.racePanel.classList.contains("hidden")) return;
        event.preventDefault();
        location.reload();
    });

    initialize();
})();
