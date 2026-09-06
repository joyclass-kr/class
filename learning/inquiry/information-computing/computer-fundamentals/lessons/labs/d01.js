(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.d01 = (spec) => figure(spec, "visual-pointer-lab", `
        <section class="pointer-operating-lab" data-pointer-lab data-pointer-state="point" data-file-location="desktop">
            <header class="pointer-lab-heading">
                <div><h3>한 화면에서 가리키기·클릭·글자 입력·드래그를 구분한다 <small>Point, Click, Type, and Drag in One Screen</small></h3><p>아래는 그림이 아니라 실제로 반응하는 작은 바탕화면입니다. 파일을 선택하고, 문장에 글자를 넣고, 파일을 폴더로 끌어 보세요.</p></div>
                <button type="button" data-pointer-reset>처음부터 <small>Reset</small></button>
            </header>
            <div class="pointer-demo-shell">
                <div class="pointer-app-bar"><strong>연습용 바탕화면 <small>Practice Desktop</small></strong><span data-pointer-clock>10:24</span></div>
                <div class="pointer-desktop" data-pointer-surface>
                    <div class="screen-pointer" data-screen-pointer aria-hidden="true"><svg viewBox="0 0 42 56"><path d="M4 3 35 31 21 34 29 50 20 54 12 38 4 48Z"/></svg><span>포인터 <small>Pointer</small></span></div>
                    <button type="button" class="pointer-file" data-pointer-file aria-pressed="false">
                        <svg viewBox="0 0 90 100" aria-hidden="true"><path d="M15 5h39l21 21v69H15Z"/><path d="M54 5v23h21"/><rect x="27" y="45" width="36" height="5"/><rect x="27" y="58" width="29" height="5"/></svg>
                        <span><b>관찰.txt</b><small>Text File</small></span>
                    </button>
                    <button type="button" class="pointer-folder" data-pointer-folder aria-label="과제 폴더">
                        <svg viewBox="0 0 120 90" aria-hidden="true"><path d="M6 20h43l10 12h55v51H6Z"/><path d="M6 32h108"/></svg>
                        <span><b>과제 폴더</b><small>Assignment Folder · <em data-folder-count>0개</em></small></span>
                        <i data-folder-file hidden>관찰.txt</i>
                    </button>
                    <label class="pointer-text-editor">
                        <span>메모 <small>Text Editor</small></span>
                        <input type="text" value="오늘 관찰한 것은 " data-pointer-input aria-label="텍스트 커서를 확인할 메모 입력 칸">
                        <em>입력 칸을 누르면 깜박이는 선이 다음 글자 위치를 표시합니다.</em>
                    </label>
                    <div class="pointer-drop-label" aria-hidden="true">파일을 이 폴더에 놓기 <small>Drop the File Here</small></div>
                </div>
                <footer data-pointer-status role="status" aria-live="polite">화면 위에서 마우스·트랙패드를 움직이면 포인터가 위치를 가리킵니다. 아직 파일은 선택되지 않았습니다.</footer>
            </div>
            <dl class="pointer-state-ledger" aria-label="현재 입력과 화면 상태">
                <div><dt>화면 표시 <small>Screen Indicator</small></dt><dd data-pointer-kind>화살표 포인터</dd></div>
                <div><dt>누름 상태 <small>Press State</small></dt><dd data-pointer-press>누르지 않음</dd></div>
                <div><dt>입력 초점 <small>Input Focus</small></dt><dd data-pointer-focus>없음</dd></div>
                <div><dt>파일 위치 <small>File Location</small></dt><dd data-pointer-location>바탕화면</dd></div>
            </dl>
            <ol class="pointer-action-trace" aria-label="파일을 드래그 앤 드롭하는 실제 동작">
                <li data-pointer-step="point"><b>1</b><span>파일을 가리킨다<small>Point</small></span></li>
                <li data-pointer-step="press"><b>2</b><span>파일을 누른 채 잡는다<small>Press and Hold</small></span></li>
                <li data-pointer-step="drag"><b>3</b><span>누른 채 폴더까지 움직인다<small>Drag</small></span></li>
                <li data-pointer-step="drop"><b>4</b><span>폴더 위에서 놓는다<small>Drop</small></span></li>
            </ol>
        </section>
    `);

    function setupPointerLab() {
        const lab = document.querySelector("[data-pointer-lab]");
        if (!lab) return;
        const surface = lab.querySelector("[data-pointer-surface]");
        const screenPointer = lab.querySelector("[data-screen-pointer]");
        const file = lab.querySelector("[data-pointer-file]");
        const folder = lab.querySelector("[data-pointer-folder]");
        const folderFile = lab.querySelector("[data-folder-file]");
        const folderCount = lab.querySelector("[data-folder-count]");
        const input = lab.querySelector("[data-pointer-input]");
        const status = lab.querySelector("[data-pointer-status]");
        const kind = lab.querySelector("[data-pointer-kind]");
        const press = lab.querySelector("[data-pointer-press]");
        const focus = lab.querySelector("[data-pointer-focus]");
        const location = lab.querySelector("[data-pointer-location]");
        const resetButton = lab.querySelector("[data-pointer-reset]");
        const steps = Array.from(lab.querySelectorAll("[data-pointer-step]"));
        let selected = false;
        let moved = false;
        let dragging = false;
        let dragStarted = false;
        let suppressClick = false;
        let startX = 0;
        let startY = 0;

        const showPointer = (clientX, clientY) => {
            const rect = surface.getBoundingClientRect();
            const x = Math.max(8, Math.min(rect.width - 48, clientX - rect.left));
            const y = Math.max(8, Math.min(rect.height - 70, clientY - rect.top));
            screenPointer.style.left = `${x}px`;
            screenPointer.style.top = `${y}px`;
        };
        const markSteps = (state) => {
            const order = ["point", "press", "drag", "drop"];
            const currentIndex = order.indexOf(state);
            steps.forEach((item, index) => {
                item.classList.toggle("is-current", index === currentIndex && state !== "drop");
                item.classList.toggle("is-complete", state === "drop" || index < currentIndex);
            });
        };
        const render = () => {
            lab.dataset.fileLocation = moved ? "folder" : "desktop";
            file.hidden = moved;
            folderFile.hidden = !moved;
            folderCount.textContent = moved ? "1개" : "0개";
            file.setAttribute("aria-pressed", String(selected && !moved));
            file.classList.toggle("is-selected", selected && !moved);
            folder.classList.toggle("has-file", moved);
            location.textContent = moved ? "과제 폴더" : "바탕화면";
        };
        const selectFile = () => {
            if (moved) return;
            selected = true;
            lab.dataset.pointerState = "click";
            kind.textContent = "화살표 포인터";
            press.textContent = "짧게 눌렀다 놓음";
            focus.textContent = "관찰.txt 선택";
            status.textContent = "클릭으로 관찰.txt를 선택했습니다. 테두리만 바뀌었고 파일 위치는 아직 바뀌지 않았습니다.";
            markSteps("point");
            render();
        };
        const moveFile = () => {
            if (moved) return;
            selected = false;
            moved = true;
            dragging = false;
            dragStarted = false;
            file.style.transform = "";
            lab.dataset.pointerState = "drop";
            kind.textContent = "드롭 위치 표시";
            press.textContent = "폴더 위에서 놓음";
            focus.textContent = "과제 폴더";
            status.textContent = "폴더 위에서 놓는 순간 관찰.txt의 위치가 바탕화면에서 과제 폴더로 바뀌었습니다. 이것이 드래그 앤 드롭의 결과입니다.";
            markSteps("drop");
            render();
        };
        surface.addEventListener("pointermove", (event) => showPointer(event.clientX, event.clientY));
        file.addEventListener("pointerenter", () => {
            if (moved || dragging) return;
            lab.dataset.pointerState = "point";
            kind.textContent = "화살표 포인터";
            press.textContent = "누르지 않음";
            status.textContent = "포인터가 관찰.txt의 화면 위치를 가리킵니다. 가리키기만 해서는 파일이 선택되거나 이동하지 않습니다.";
            markSteps("point");
        });
        file.addEventListener("pointerdown", (event) => {
            if (moved || event.button > 0) return;
            dragging = true;
            dragStarted = false;
            startX = event.clientX;
            startY = event.clientY;
            file.setPointerCapture?.(event.pointerId);
            lab.dataset.pointerState = "press";
            press.textContent = "누른 채 유지";
            focus.textContent = "관찰.txt를 잡음";
            status.textContent = "파일을 누른 채 잡았습니다. 아직 놓지 않았으므로 저장 위치는 바탕화면 그대로입니다.";
            markSteps("press");
        });
        file.addEventListener("pointermove", (event) => {
            if (!dragging) return;
            const dx = event.clientX - startX;
            const dy = event.clientY - startY;
            if (Math.hypot(dx, dy) < 7 && !dragStarted) return;
            dragStarted = true;
            suppressClick = true;
            event.preventDefault();
            file.style.transform = `translate(${dx}px, ${dy}px) scale(.96)`;
            lab.dataset.pointerState = "drag";
            press.textContent = "누른 채 이동 중";
            kind.textContent = "파일과 함께 이동하는 포인터";
            status.textContent = "누른 상태를 유지한 채 파일을 움직이고 있습니다. 폴더가 강조되면 그 위에서 놓으세요.";
            const folderRect = folder.getBoundingClientRect();
            const overFolder = event.clientX >= folderRect.left && event.clientX <= folderRect.right && event.clientY >= folderRect.top && event.clientY <= folderRect.bottom;
            folder.classList.toggle("is-drop-target", overFolder);
            markSteps("drag");
        });
        const finishPointer = (event) => {
            if (!dragging) return;
            dragging = false;
            folder.classList.remove("is-drop-target");
            const folderRect = folder.getBoundingClientRect();
            const dropped = dragStarted && event.clientX >= folderRect.left && event.clientX <= folderRect.right && event.clientY >= folderRect.top && event.clientY <= folderRect.bottom;
            if (dropped) moveFile();
            else if (dragStarted) {
                file.style.transform = "";
                lab.dataset.pointerState = "click";
                press.textContent = "놓음";
                status.textContent = "폴더 밖에서 놓아 파일이 원래 자리로 돌아왔습니다. 드롭 위치가 결과를 결정합니다.";
                markSteps("drag");
            } else selectFile();
            window.setTimeout(() => { suppressClick = false; }, 0);
        };
        file.addEventListener("pointerup", finishPointer);
        file.addEventListener("pointercancel", finishPointer);
        file.addEventListener("click", () => {
            if (suppressClick || dragging) return;
            selectFile();
        });
        folder.addEventListener("click", () => {
            if (selected && !moved) {
                moveFile();
                status.textContent = "선택한 관찰.txt에 ‘과제 폴더로 이동’ 명령을 실행했습니다. 키보드에서는 드래그 대신 선택 후 이동 명령을 사용할 수 있습니다.";
                return;
            }
            focus.textContent = "과제 폴더";
            status.textContent = moved ? "과제 폴더 안에 관찰.txt가 있습니다." : "과제 폴더를 열었습니다. 이동할 파일을 먼저 선택하거나 끌어 놓으세요.";
        });
        input.addEventListener("focus", () => {
            lab.dataset.pointerState = "caret";
            kind.textContent = "깜박이는 텍스트 커서";
            press.textContent = "입력 칸 클릭 완료";
            focus.textContent = "메모 입력 칸";
            status.textContent = "입력 칸 안의 깜박이는 선은 텍스트 커서입니다. 화살표 포인터와 달리 다음 글자가 들어갈 문장 속 자리를 표시합니다.";
            markSteps("");
        });
        input.addEventListener("input", () => {
            status.textContent = `텍스트 커서 위치에 글자가 입력되었습니다. 현재 메모는 ${input.value.length}글자입니다.`;
        });
        resetButton.addEventListener("click", () => {
            selected = false;
            moved = false;
            dragging = false;
            dragStarted = false;
            file.style.transform = "";
            input.value = "오늘 관찰한 것은 ";
            lab.dataset.pointerState = "point";
            kind.textContent = "화살표 포인터";
            press.textContent = "누르지 않음";
            focus.textContent = "없음";
            status.textContent = "화면 위에서 마우스·트랙패드를 움직이면 포인터가 위치를 가리킵니다. 아직 파일은 선택되지 않았습니다.";
            screenPointer.style.left = "34%";
            screenPointer.style.top = "31%";
            markSteps("point");
            render();
        });
        screenPointer.style.left = "34%";
        screenPointer.style.top = "31%";
        markSteps("point");
        render();
    }

    window.COMPUTER_LAB_SETUPS.push(setupPointerLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("d01");
})();
