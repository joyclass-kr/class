(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.c03 = (spec, asset) => figure(spec, "visual-program-process", `
        <section class="concept-lab-split">
            <section class="program-process-lab" data-program-lab data-program-state="stopped">
                <div class="program-state-board">
                    <section class="program-storage"><h3>저장 장치 <small>Storage</small></h3><div class="program-file"><i></i><b>그림 앱</b><small>Drawing App · 저장된 명령과 자료</small></div></section>
                    <span class="state-arrow"><b>실행 요청</b><i aria-hidden="true">→</i></span>
                    <section class="process-memory"><h3>실행 중인 프로세스 <small>Running Process</small></h3><div data-process-token hidden><i></i><b>그림 앱 프로세스</b><small data-process-copy>CPU 시간·RAM 공간 사용</small></div><em data-process-empty>실행 중인 프로세스 없음</em></section>
                    <span class="state-arrow"><b>화면 표시</b><i aria-hidden="true">→</i></span>
                    <section class="window-display"><h3>창 <small>Window</small></h3><div class="window-stack" data-window-stack></div><em data-window-empty>열린 창 없음</em></section>
                </div>
                <div class="program-actions" role="group" aria-label="프로그램 실행 상태 바꾸기">
                    <button type="button" data-program-action="run">프로그램 실행 <small>Run</small></button>
                    <button type="button" data-program-action="new" disabled>새 창 <small>New Window</small></button>
                    <button type="button" data-program-action="background" disabled>창 숨기기 <small>Keep in Background</small></button>
                    <button type="button" data-program-action="end" disabled>프로세스 끝내기 <small>End Process</small></button>
                </div>
                <p class="lab-readout" data-program-status aria-live="polite"><b>저장된 그림 앱:</b> 앱의 명령과 자료는 저장 장치에 있지만, 운영체제가 시작한 프로세스와 그 프로세스가 보여 주는 창은 아직 없습니다.</p>
                <p class="model-note">프로세스는 RAM 자체가 아니라 운영체제가 관리하는 실행 상태입니다. 이 실험의 그림 앱은 한 프로세스가 CPU 시간과 RAM 공간을 사용하며 여러 창을 관리하는 모형이고, 실제 앱은 여러 프로세스를 사용하기도 합니다.</p>
            </section>
            ${contextImage(asset, "c03-program-process-window-illustration-v1", "저장된 앱 아이콘에서 실행 중인 작업이 시작되고 여러 창과 탭으로 나타나는 장면")}
        </section>
    `);

    function setupProgramProcessLab() {
        const lab = document.querySelector("[data-program-lab]");
        if (!lab) return;
        const process = lab.querySelector("[data-process-token]");
        const processEmpty = lab.querySelector("[data-process-empty]");
        const processCopy = lab.querySelector("[data-process-copy]");
        const stack = lab.querySelector("[data-window-stack]");
        const windowEmpty = lab.querySelector("[data-window-empty]");
        const status = lab.querySelector("[data-program-status]");
        const buttons = Object.fromEntries(Array.from(lab.querySelectorAll("[data-program-action]")).map((button) => [button.dataset.programAction, button]));
        let running = false;
        let windowCount = 0;
        let hidden = false;
        const render = () => {
            process.hidden = !running;
            processEmpty.hidden = running;
            processCopy.textContent = hidden ? "CPU 시간·RAM 공간을 쓰며 백그라운드 실행" : "CPU 시간·RAM 공간 사용";
            stack.replaceChildren();
            if (running && !hidden) {
                for (let index = 0; index < windowCount; index += 1) {
                    const windowCard = document.createElement("div");
                    windowCard.className = "program-window-card";
                    windowCard.innerHTML = "<span>— □ ×</span><b>그림 " + (index + 1) + "</b><i></i>";
                    stack.append(windowCard);
                }
            }
            windowEmpty.hidden = running && !hidden && windowCount > 0;
            windowEmpty.textContent = hidden ? "창은 숨겨졌지만 프로세스는 실행 중" : "열린 창 없음";
            buttons.run.disabled = running;
            buttons.new.disabled = !running;
            buttons.background.disabled = !running;
            buttons.end.disabled = !running;
            buttons.background.innerHTML = hidden ? "창 다시 보이기 <small>Show Windows</small>" : "창 숨기기 <small>Keep in Background</small>";
            lab.dataset.programState = running ? (hidden ? "background" : "running") : "stopped";
        };
        buttons.run.addEventListener("click", () => {
            running = true; windowCount = 1; hidden = false; render();
            status.innerHTML = "<b>실행:</b> 운영체제가 저장 장치에서 그림 앱의 필요한 명령과 자료를 RAM에 읽고 프로세스를 시작했습니다. 프로세스는 CPU 시간과 RAM 공간을 사용하며 첫 창을 표시합니다.";
        });
        buttons.new.addEventListener("click", () => {
            hidden = false; windowCount += 1; render();
            status.innerHTML = "<b>새 창:</b> 이 모형에서는 같은 그림 앱 프로세스가 창을 " + windowCount + "개 관리합니다. 창과 프로세스의 수가 반드시 같은 것은 아닙니다.";
        });
        buttons.background.addEventListener("click", () => {
            hidden = !hidden; render();
            status.innerHTML = hidden
                ? "<b>백그라운드:</b> 창은 보이지 않지만 그림 앱 프로세스는 CPU 시간과 RAM 공간을 사용하며 계속 실행 중입니다."
                : "<b>창 다시 표시:</b> 실행 중이던 같은 프로세스가 창을 다시 화면에 나타냈습니다.";
        });
        buttons.end.addEventListener("click", () => {
            running = false; windowCount = 0; hidden = false; render();
            status.innerHTML = "<b>프로세스 종료:</b> 운영체제가 실행을 끝내고 프로세스가 쓰던 RAM 공간과 창을 정리했습니다. 저장 장치의 그림 앱 파일은 남아 다시 실행할 수 있습니다.";
        });
        render();
    }

    window.COMPUTER_LAB_SETUPS.push(setupProgramProcessLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("c03");
})();
