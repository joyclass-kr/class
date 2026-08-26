(() => {
    "use strict";

    const flowCards = [
        { id: "storage", label: "사진 데이터를 파일로 기록한다", english: "Write a Photo File" },
        { id: "input", label: "이미지 센서가 들어온 빛을 측정한다", english: "Measure Incoming Light" },
        { id: "output", label: "디스플레이의 픽셀로 사진을 보여 준다", english: "Show Pixels on the Display" },
        { id: "processing", label: "처리 장치가 밝기와 색을 계산한다", english: "Calculate Brightness and Color" }
    ];
    const roleLabels = { input: "입력", processing: "처리", output: "출력", storage: "저장" };
    const roleEnglish = { input: "Input", processing: "Processing", output: "Output", storage: "Storage" };
    let selectedFlow = {};
    let activeCard = null;
    let dragState = null;
    let suppressClickUntil = 0;

    const stages = {
        activity: document.getElementById("stageActivity"),
        concept: document.getElementById("stageConcept"),
        quiz: document.getElementById("stageQuiz"),
        result: document.getElementById("stageResult")
    };
    const stepStatus = document.getElementById("stepStatus");
    const roleMap = document.getElementById("roleMap");
    const flowBank = document.getElementById("flowBank");
    const flowFeedback = document.getElementById("flowFeedback");
    const checkFlow = document.getElementById("checkFlow");
    const startQuiz = document.getElementById("startQuiz");

    function showStage(name, status) {
        Object.entries(stages).forEach(([key, element]) => {
            const active = key === name;
            element.hidden = !active;
            element.classList.toggle("is-active", active);
        });
        stepStatus.textContent = status;
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function clearFlowFeedback() {
        flowFeedback.textContent = activeCard ? "선택한 동작을 놓을 역할 칸을 누르세요." : "";
        flowFeedback.className = "feedback";
        startQuiz.hidden = true;
        checkFlow.hidden = false;
    }

    function findAssignedRole(itemId) {
        return Object.keys(selectedFlow).find((role) => selectedFlow[role] === itemId) || null;
    }

    function placeCard(itemId, targetRole) {
        const originRole = findAssignedRole(itemId);
        const displacedItem = selectedFlow[targetRole];
        if (originRole === targetRole) return;
        if (originRole) delete selectedFlow[originRole];
        selectedFlow[targetRole] = itemId;
        if (displacedItem && originRole) selectedFlow[originRole] = displacedItem;
        activeCard = null;
        clearFlowFeedback();
        renderFlow();
    }

    function setDropTarget(x, y) {
        roleMap.querySelectorAll(".role-slot").forEach((slot) => slot.classList.remove("is-drop-target"));
        const pointedElement = document.elementFromPoint(x, y);
        const target = pointedElement ? pointedElement.closest(".role-slot") : null;
        if (target && roleMap.contains(target)) {
            target.classList.add("is-drop-target");
            return target;
        }
        return null;
    }

    function beginPointerDrag(event, itemId, sourceElement) {
        if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
        dragState = {
            pointerId: event.pointerId,
            itemId,
            sourceElement,
            startX: event.clientX,
            startY: event.clientY,
            dragging: false,
            ghost: null
        };
        sourceElement.setPointerCapture?.(event.pointerId);
    }

    function movePointerDrag(event) {
        if (!dragState || event.pointerId !== dragState.pointerId) return;
        const distance = Math.hypot(event.clientX - dragState.startX, event.clientY - dragState.startY);
        if (!dragState.dragging && distance < 7) return;
        event.preventDefault();
        if (!dragState.dragging) {
            const item = flowCards.find((card) => card.id === dragState.itemId);
            const ghost = document.createElement("div");
            ghost.className = "drag-ghost";
            ghost.setAttribute("aria-hidden", "true");
            ghost.innerHTML = `${item.label}<small>${item.english}</small>`;
            document.body.append(ghost);
            dragState.ghost = ghost;
            dragState.dragging = true;
            dragState.sourceElement.classList.add("is-dragging");
        }
        dragState.ghost.style.left = `${event.clientX}px`;
        dragState.ghost.style.top = `${event.clientY}px`;
        setDropTarget(event.clientX, event.clientY);
    }

    function endPointerDrag(event) {
        if (!dragState || event.pointerId !== dragState.pointerId) return;
        const finishedDrag = dragState;
        dragState = null;
        try {
            finishedDrag.sourceElement.releasePointerCapture?.(event.pointerId);
        } catch (_) {
            // 포인터 캡처가 먼저 해제된 환경에서도 정리를 계속한다.
        }
        if (!finishedDrag.dragging) return;
        event.preventDefault();
        const target = event.type === "pointercancel" ? null : setDropTarget(event.clientX, event.clientY);
        finishedDrag.ghost?.remove();
        finishedDrag.sourceElement.classList.remove("is-dragging");
        roleMap.querySelectorAll(".role-slot").forEach((slot) => slot.classList.remove("is-drop-target"));
        suppressClickUntil = performance.now() + 300;
        if (target) placeCard(finishedDrag.itemId, target.dataset.role);
    }

    document.addEventListener("pointermove", movePointerDrag, { passive: false });
    document.addEventListener("pointerup", endPointerDrag);
    document.addEventListener("pointercancel", endPointerDrag);

    function renderFlow() {
        roleMap.querySelectorAll(".role-slot").forEach((slot) => {
            const role = slot.dataset.role;
            const itemId = selectedFlow[role];
            const item = flowCards.find((card) => card.id === itemId);
            const title = `<span>${roleLabels[role]} <small>${roleEnglish[role]}</small></span>`;
            slot.innerHTML = item ? `${title}<em>${item.label}</em>` : `${title}<em>동작 카드를 놓으세요</em>`;
            slot.classList.toggle("has-card", Boolean(item));
            slot.setAttribute("aria-label", item ? `${roleLabels[role]} 역할: ${item.label}. 다른 칸으로 드래그하거나 눌러서 다시 선택할 수 있습니다.` : `${roleLabels[role]} 역할. 동작 카드를 놓으세요.`);
        });

        flowBank.replaceChildren();
        flowCards.forEach((item) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "flow-card";
            const assigned = Object.values(selectedFlow).includes(item.id);
            button.disabled = assigned;
            button.classList.toggle("is-selected", activeCard === item.id);
            button.setAttribute("aria-pressed", String(activeCard === item.id));
            button.innerHTML = `${item.label}<small>${item.english}</small>`;
            button.addEventListener("pointerdown", (event) => beginPointerDrag(event, item.id, button));
            button.addEventListener("click", () => {
                if (performance.now() < suppressClickUntil) return;
                activeCard = activeCard === item.id ? null : item.id;
                clearFlowFeedback();
                renderFlow();
            });
            flowBank.append(button);
        });
        checkFlow.disabled = Object.keys(selectedFlow).length !== flowCards.length;
    }

    roleMap.addEventListener("click", (event) => {
        if (performance.now() < suppressClickUntil) return;
        const slot = event.target.closest(".role-slot");
        if (!slot) return;
        const role = slot.dataset.role;
        if (activeCard) {
            placeCard(activeCard, role);
            return;
        }
        if (selectedFlow[role]) {
            activeCard = selectedFlow[role];
            delete selectedFlow[role];
        }
        clearFlowFeedback();
        renderFlow();
    });

    roleMap.addEventListener("pointerdown", (event) => {
        const slot = event.target.closest(".role-slot.has-card");
        if (!slot) return;
        beginPointerDrag(event, selectedFlow[slot.dataset.role], slot);
    });

    document.getElementById("resetFlow").addEventListener("click", () => {
        selectedFlow = {};
        activeCard = null;
        clearFlowFeedback();
        renderFlow();
    });

    document.getElementById("continueToActivity").addEventListener("click", () => {
        showStage("concept", "활동 2 / 3");
    });

    checkFlow.addEventListener("click", () => {
        const wrongRoles = Object.keys(roleLabels).filter((role) => selectedFlow[role] !== role);
        if (wrongRoles.length === 0) {
            flowFeedback.textContent = "처리된 사진 데이터는 화면 출력과 파일 저장의 두 갈래로 사용됩니다.";
            flowFeedback.className = "feedback is-correct";
            checkFlow.hidden = true;
            startQuiz.hidden = false;
            startQuiz.focus();
            return;
        }
        flowFeedback.textContent = `${wrongRoles.map((role) => roleLabels[role]).join("·")} 역할에 놓인 동작의 장치와 결과를 다시 비교하세요.`;
        flowFeedback.className = "feedback is-wrong";
    });

    startQuiz.addEventListener("click", () => {
        resetQuiz();
        showStage("quiz", "활동 3 / 3");
    });
    const questions = [
        {
            text: "그림 앱이 포인터 좌표 (120, 85)를 받아 어느 픽셀에 선을 그릴지 계산했습니다. 이때 앱이 수행한 역할은 무엇입니까?",
            options: ["좌표를 입력 장치로 전달한다", "좌표를 계산해 색칠할 픽셀을 정한다", "완성된 그림을 파일로 기록한다", "그림을 종이에 인쇄한다"],
            answer: 1,
            concept: "처리",
            explanation: "좌표를 이용해 어떤 픽셀을 바꿀지 계산하는 일은 처리(Processing)에 해당합니다."
        },
        {
            text: "마이크로 발표를 녹음하자 화면에 소리 파형이 나타났습니다. 전원을 껐다 켠 뒤에도 녹음을 다시 들으려면 어떤 단계가 더 필요합니까?",
            options: ["파형의 색을 바꾼다", "녹음 데이터를 파일로 기록한다", "마이크 음량을 화면에 표시한다", "스피커로 소리를 한 번 재생한다"],
            answer: 1,
            concept: "저장",
            explanation: "전원을 꺼도 남기려면 데이터를 저장 장치에 파일로 기록해야 합니다."
        },
        {
            text: "프린터가 PDF 문서를 종이에 인쇄했고 컴퓨터의 원본 PDF 파일은 그대로 남아 있습니다. 이 과정에서 프린터가 맡은 역할은 무엇입니까?",
            options: ["문서 데이터를 입력한다", "문서 내용을 계산한다", "처리 결과를 종이로 출력한다", "원본 파일을 다른 형식으로 저장한다"],
            answer: 2,
            concept: "출력",
            explanation: "프린터는 컴퓨터가 처리한 결과를 종이라는 형태로 내보내는 출력 장치입니다."
        },
        {
            text: "태블릿에서 사진 미리보기가 화면에 나타나는 동시에 사진 파일도 저장되었습니다. 이 과정의 관계를 가장 정확하게 설명한 것은 무엇입니까?",
            options: ["화면이 사진을 보여 준 뒤 그 빛을 저장 장치가 다시 받아 기록한다", "센서 입력을 처리한 사진 데이터가 화면 출력과 파일 저장에 각각 사용된다", "저장 장치가 빛을 측정하고 화면이 사진 데이터를 계산한다", "카메라 렌즈가 완성된 파일을 화면과 저장 장치에 직접 보낸다"],
            answer: 1,
            concept: "전체 흐름",
            explanation: "센서의 입력을 처리해 만든 사진 데이터가 화면 표시와 파일 기록이라는 서로 다른 결과에 사용됩니다."
        },
        {
            text: "키보드 입력과 계산은 가능하고 파일도 저장되지만 화면과 스피커가 모두 연결되지 않은 컴퓨터가 있습니다. 직접 확인하기 어려운 것은 무엇입니까?",
            options: ["키보드가 보낸 명령", "CPU가 수행한 계산", "저장 장치에 기록된 데이터", "사람에게 보여 주거나 들려줄 처리 결과"],
            answer: 3,
            concept: "출력",
            explanation: "출력 장치가 없으면 처리는 이루어져도 사람이 화면이나 소리로 결과를 직접 확인하기 어렵습니다."
        }
    ];

    let questionIndex = 0;
    let selectedOption = -1;
    let score = 0;
    let results = [];
    const quizCount = document.getElementById("quizCount");
    const questionText = document.getElementById("questionText");
    const questionOptions = document.getElementById("questionOptions");
    const quizFeedback = document.getElementById("quizFeedback");
    const submitAnswer = document.getElementById("submitAnswer");
    const nextQuestion = document.getElementById("nextQuestion");

    function resetQuiz() {
        questionIndex = 0;
        selectedOption = -1;
        score = 0;
        results = [];
        renderQuestion();
    }

    function renderQuestion() {
        const question = questions[questionIndex];
        selectedOption = -1;
        quizCount.textContent = `문제 ${questionIndex + 1} / ${questions.length}`;
        questionText.textContent = question.text;
        questionOptions.replaceChildren();
        question.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "option-button";
            button.textContent = `${index + 1}. ${option}`;
            button.setAttribute("aria-pressed", "false");
            button.addEventListener("click", () => {
                if (submitAnswer.hidden) return;
                selectedOption = index;
                [...questionOptions.children].forEach((item, itemIndex) => item.setAttribute("aria-pressed", String(itemIndex === index)));
                submitAnswer.disabled = false;
            });
            questionOptions.append(button);
        });
        quizFeedback.textContent = "";
        quizFeedback.className = "feedback quiz-feedback";
        submitAnswer.hidden = false;
        submitAnswer.disabled = true;
        nextQuestion.hidden = true;
    }

    submitAnswer.addEventListener("click", () => {
        const question = questions[questionIndex];
        const correct = selectedOption === question.answer;
        if (correct) score += 1;
        results.push({ correct, concept: question.concept, explanation: question.explanation });
        [...questionOptions.children].forEach((button, index) => {
            button.disabled = true;
            if (index === question.answer) button.classList.add("is-answer");
            if (index === selectedOption && !correct) button.classList.add("is-selected-wrong");
        });
        quizFeedback.textContent = question.explanation;
        quizFeedback.className = `feedback quiz-feedback ${correct ? "is-correct" : "is-wrong"}`;
        submitAnswer.hidden = true;
        nextQuestion.hidden = false;
        nextQuestion.textContent = questionIndex === questions.length - 1 ? "결과 확인" : "다음 문제";
        nextQuestion.focus();
    });

    nextQuestion.addEventListener("click", () => {
        questionIndex += 1;
        if (questionIndex < questions.length) {
            renderQuestion();
            return;
        }
        showResult();
    });

    function showResult() {
        document.getElementById("scoreNumber").textContent = String(score);
        const passed = score >= 4;
        document.getElementById("resultMessage").textContent = passed
            ? "입력·처리·출력·저장의 관계를 상황에 적용했습니다."
            : "틀린 문제의 설명을 확인한 뒤 같은 개념을 다시 적용해 보세요.";
        const reviewList = document.getElementById("reviewList");
        reviewList.replaceChildren();
        results.filter((result) => !result.correct).forEach((result) => {
            const item = document.createElement("div");
            item.className = "review-item";
            item.innerHTML = `<strong>${result.concept}</strong><br>${result.explanation}`;
            reviewList.append(item);
        });
        if (passed) {
            try {
                localStorage.setItem("computer-literacy:a01", JSON.stringify({ completed: true, score, updatedAt: new Date().toISOString() }));
            } catch (_) {
                // 학습 진행 저장이 차단되어도 현재 활동은 계속 동작한다.
            }
        }
        showStage("result", "차시 완료");
    }

    document.getElementById("retryQuiz").addEventListener("click", () => {
        resetQuiz();
        showStage("quiz", "활동 3 / 3");
    });

    const courseDialog = document.getElementById("courseDialog");
    function openCourse() {
        if (typeof courseDialog.showModal === "function") courseDialog.showModal();
        else courseDialog.setAttribute("open", "");
    }
    document.getElementById("openCourse").addEventListener("click", openCourse);
    document.getElementById("showCourse").addEventListener("click", openCourse);
    document.getElementById("closeCourse").addEventListener("click", () => courseDialog.close());
    courseDialog.addEventListener("click", (event) => {
        if (event.target === courseDialog) courseDialog.close();
    });

    renderFlow();
})();