(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.j02 = (spec) => figure(spec, "visual-control-path-lab", `
        <section class="control-path-lab" data-control-lab data-control-stage="ready" data-result="pending">
            <header class="control-lab-heading">
                <div><h3>로봇을 별과 같은 칸에 놓고 로봇을 누른다 <small>Place the Robot on the Star, Then Click It</small></h3><p>화살표는 위치만 바꿉니다. 로봇을 누르는 순간 프로그램이 조건을 검사하고 서로 다른 명령을 실행합니다.</p></div>
                <div class="control-scoreboard"><span>모은 별 <small>Collected</small></span><strong><b data-control-score>0</b> / 3</strong></div>
            </header>
            <div class="control-program-stage">
                <div class="control-world" data-control-world style="--robot-lane:0;--star-lane:2">
                    <div class="control-sky" aria-hidden="true"><span></span><span></span><span></span></div>
                    <div class="control-lanes" aria-hidden="true"><span>왼쪽 <small>Left</small></span><span>가운데 <small>Center</small></span><span>오른쪽 <small>Right</small></span></div>
                    <div class="control-star" data-control-star aria-label="모아야 할 별">
                        <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 5 61 37 95 38 68 58 77 91 50 72 23 91 32 58 5 38 39 37Z"/></svg>
                    </div>
                    <button type="button" class="control-robot" data-control-robot aria-label="로봇을 눌러 조건 검사">
                        <svg viewBox="0 0 120 140" aria-hidden="true"><path class="antenna" d="M60 10v18M48 10h24"/><rect class="head" x="20" y="28" width="80" height="58" rx="16"/><circle cx="43" cy="55" r="7"/><circle cx="77" cy="55" r="7"/><path class="mouth" d="M42 71h36"/><rect class="body" x="31" y="89" width="58" height="37" rx="10"/><path class="limb" d="M31 99 13 113M89 99l18 14M45 126v10M75 126v10"/></svg>
                        <span>로봇 누르기<small>Click Robot</small></span>
                    </button>
                    <div class="control-result-burst" data-control-burst aria-hidden="true"></div>
                </div>
                <div class="control-position-panel">
                    <div class="control-move-buttons" aria-label="로봇 위치 바꾸기">
                        <button type="button" data-control-move="-1">← <span>왼쪽</span><small>Move Left</small></button>
                        <button type="button" data-control-move="1"><span>오른쪽</span> →<small>Move Right</small></button>
                    </div>
                    <dl class="control-state-evidence">
                        <div><dt>로봇 칸 <small>Robot Lane</small></dt><dd data-control-robot-lane>왼쪽</dd></div>
                        <div><dt>별 칸 <small>Star Lane</small></dt><dd data-control-star-lane>오른쪽</dd></div>
                        <div><dt>조건 결과 <small>Condition</small></dt><dd data-control-condition>아직 검사 안 함</dd></div>
                    </dl>
                </div>
            </div>
            <ol class="program-flow" aria-label="로봇을 눌렀을 때 실행되는 프로그램 순서">
                <li data-flow-step="event"><b>1</b><span>로봇을 누름<small>Event</small></span><em>대기</em></li>
                <li data-flow-step="condition"><b>2</b><span>로봇 칸 = 별 칸?<small>Condition</small></span><em>대기</em></li>
                <li class="flow-branch" data-flow-step="branch"><b>3</b><span><i>참: 별 +1</i><i>거짓: 그대로</i><small>Branch</small></span><em>대기</em></li>
                <li data-flow-step="loop"><b>4</b><span>별이 남으면 새 위치로 반복<small>Loop</small></span><em>대기</em></li>
            </ol>
            <div class="control-observation">
                <p class="lab-readout" data-control-status aria-live="polite">현재 로봇은 왼쪽, 별은 오른쪽에 있습니다. 위치를 바꾸고 로봇을 눌러 보세요.</p>
                <ol class="loop-trace" data-loop-trace aria-label="프로그램 실행 기록"><li>실행 기록이 여기에 쌓입니다.</li></ol>
                <button type="button" data-control-reset>처음부터 <small>Reset</small></button>
                </div>
            </details>
        </section>
    `);

    function setupControlLab() {
        const lab = document.querySelector("[data-control-lab]");
        if (!lab) return;
        const world = lab.querySelector("[data-control-world]");
        const robot = lab.querySelector("[data-control-robot]");
        const moveButtons = Array.from(lab.querySelectorAll("[data-control-move]"));
        const scoreOutput = lab.querySelector("[data-control-score]");
        const robotLaneOutput = lab.querySelector("[data-control-robot-lane]");
        const starLaneOutput = lab.querySelector("[data-control-star-lane]");
        const conditionOutput = lab.querySelector("[data-control-condition]");
        const status = lab.querySelector("[data-control-status]");
        const resetButton = lab.querySelector("[data-control-reset]");
        const trace = lab.querySelector("[data-loop-trace]");
        const flowSteps = Array.from(lab.querySelectorAll("[data-flow-step]"));
        const laneNames = ["왼쪽", "가운데", "오른쪽"];
        const starSequence = [2, 0, 1];
        let robotLane = 0;
        let starIndex = 0;
        let score = 0;
        let runCount = 0;
        let running = false;
        let runToken = 0;

        const wait = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));
        const setFlow = (active, completed = []) => {
            flowSteps.forEach((item) => {
                const name = item.dataset.flowStep;
                const isComplete = completed.includes(name);
                item.classList.toggle("is-active", name === active);
                item.classList.toggle("is-complete", isComplete);
                item.querySelector("em").textContent = name === active ? "실행 중" : isComplete ? "완료" : "대기";
            });
        };
        const render = () => {
            const starLane = starSequence[Math.min(starIndex, starSequence.length - 1)];
            world.style.setProperty("--robot-lane", String(robotLane));
            world.style.setProperty("--star-lane", String(starLane));
            scoreOutput.textContent = String(score);
            robotLaneOutput.textContent = laneNames[robotLane];
            starLaneOutput.textContent = score >= 3 ? "모두 모음" : laneNames[starLane];
            const controlsLocked = running || score >= 3;
            robot.disabled = controlsLocked;
            moveButtons[0].disabled = controlsLocked || robotLane === 0;
            moveButtons[1].disabled = controlsLocked || robotLane === 2;
            lab.dataset.result = score >= 3 ? "finish" : "pending";
        };
        const addTrace = (message, state) => {
            if (!trace.firstElementChild?.dataset.traceState) trace.innerHTML = "";
            const item = document.createElement("li");
            item.dataset.traceState = state;
            item.textContent = message;
            trace.append(item);
            while (trace.children.length > 5) trace.firstElementChild.remove();
            trace.scrollTop = trace.scrollHeight;
        };
        const runCheck = async () => {
            if (running || score >= 3) return;
            running = true;
            const token = ++runToken;
            const runNumber = ++runCount;
            const starLane = starSequence[starIndex];
            lab.dataset.controlStage = "event";
            conditionOutput.textContent = "검사하는 중";
            status.textContent = "1. 로봇을 누른 클릭 이벤트가 발생했습니다.";
            setFlow("event");
            render();
            await wait(320);
            if (token !== runToken) return;
            lab.dataset.controlStage = "condition";
            status.textContent = `2. 로봇 칸 ${laneNames[robotLane]}과 별 칸 ${laneNames[starLane]}이 같은지 비교합니다.`;
            setFlow("condition", ["event"]);
            await wait(420);
            if (token !== runToken) return;
            const matched = robotLane === starLane;
            lab.dataset.controlStage = matched ? "yes" : "no";
            conditionOutput.textContent = matched ? "참 (같은 칸)" : "거짓 (다른 칸)";
            world.classList.toggle("is-success", matched);
            world.classList.toggle("is-miss", !matched);
            setFlow("branch", ["event", "condition"]);
            if (matched) {
                score += 1;
                addTrace(`${runNumber}번째 실행: 같은 칸 → 참 → 별 +1`, "finish");
                status.textContent = "3. 조건이 참이어서 별을 1개 더했습니다.";
            } else {
                addTrace(`${runNumber}번째 실행: 다른 칸 → 거짓 → 점수 그대로`, "retry");
                status.textContent = "3. 조건이 거짓이어서 점수는 그대로입니다. 위치를 바꾼 뒤 다시 로봇을 누르세요.";
            }
            render();
            await wait(520);
            if (token !== runToken) return;
            world.classList.remove("is-success", "is-miss");
            if (matched && score < 3) {
                lab.dataset.controlStage = "loop";
                setFlow("loop", ["event", "condition", "branch"]);
                starIndex += 1;
                status.textContent = `4. 별이 ${3 - score}개 남아 있으므로 새 별 위치로 반복합니다.`;
                render();
                await wait(420);
                if (token !== runToken) return;
            }
            if (score >= 3) {
                lab.dataset.controlStage = "finish";
                conditionOutput.textContent = "반복 종료";
                setFlow(null, ["event", "condition", "branch", "loop"]);
                addTrace("남은 별 0개 → 반복 종료", "finish");
                status.textContent = "별 3개를 모두 모아 반복이 끝났습니다. 같은 명령 묶음을 매번 다시 쓴 것이 아니라 조건이 참일 때 반복 실행했습니다.";
                running = false;
                render();
                resetButton.focus();
                return;
            }
            lab.dataset.controlStage = "ready";
            setFlow(null);
            running = false;
            render();
        };
        moveButtons.forEach((button) => button.addEventListener("click", () => {
            if (running || score >= 3) return;
            robotLane = Math.max(0, Math.min(2, robotLane + Number(button.dataset.controlMove)));
            conditionOutput.textContent = "아직 검사 안 함";
            lab.dataset.controlStage = "ready";
            setFlow(null);
            status.textContent = `로봇을 ${laneNames[robotLane]} 칸으로 옮겼습니다. 위치 이동만으로는 조건을 검사하지 않습니다. 로봇을 누르세요.`;
            render();
        }));
        robot.addEventListener("click", runCheck);
        resetButton.addEventListener("click", () => {
            runToken += 1;
            robotLane = 0;
            starIndex = 0;
            score = 0;
            runCount = 0;
            running = false;
            lab.dataset.controlStage = "ready";
            conditionOutput.textContent = "아직 검사 안 함";
            status.textContent = "현재 로봇은 왼쪽, 별은 오른쪽에 있습니다. 위치를 바꾸고 로봇을 눌러 보세요.";
            trace.innerHTML = "<li>실행 기록이 여기에 쌓입니다.</li>";
            world.classList.remove("is-success", "is-miss");
            setFlow(null);
            render();
            moveButtons[1].focus();
        });
        setFlow(null);
        render();
    }

    window.COMPUTER_LAB_SETUPS.push(setupControlLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("j02");
})();
