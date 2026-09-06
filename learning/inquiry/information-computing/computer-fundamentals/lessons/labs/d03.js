(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.d03 = (spec, asset) => figure(spec, "visual-clipboard-workbench", `
        <section class="concept-lab-split">
            <section class="clipboard-workbench" data-clipboard-lab>
                <div class="clipboard-documents">
                    <label>원문 <small>Source Document</small><textarea data-clipboard-source rows="4">고양이와 강아지가 공원에서 달립니다.</textarea></label>
                    <div class="clipboard-shelf"><b>클립보드 <small>Clipboard</small></b><output data-clipboard-value>비어 있음</output><span>복사·잘라내기한 내용의 임시 사본</span></div>
                    <label>붙여넣을 문서 <small>Destination Document</small><textarea data-clipboard-target rows="4">관찰한 동물: </textarea></label>
                </div>
                <div class="selection-presets" role="group" aria-label="원문에서 선택할 말"><span>선택 <small>Select</small></span><button type="button" data-select-text="고양이">고양이 <small>Cat</small></button><button type="button" data-select-text="강아지">강아지 <small>Dog</small></button><button type="button" data-select-text="공원">공원 <small>Park</small></button></div>
                <div class="clipboard-actions" role="group" aria-label="클립보드 명령">
                    <button type="button" data-clipboard-action="copy">복사 <small>Ctrl/Cmd+C</small></button>
                    <button type="button" data-clipboard-action="cut">잘라내기 <small>Ctrl/Cmd+X</small></button>
                    <button type="button" data-clipboard-action="paste">붙여넣기 <small>Ctrl/Cmd+V</small></button>
                    <button type="button" data-clipboard-action="reset">처음 상태 <small>Reset</small></button>
                </div>
                <p class="lab-readout" data-clipboard-status aria-live="polite"><b>선택:</b> 원문에서 직접 드래그하거나 말 단추를 누른 뒤 복사·잘라내기를 실행하세요. 붙여넣기는 아래 문서의 커서 위치에 들어갑니다.</p>
            </section>
            ${contextImage(asset, "d03-keyboard-clipboard-flow-illustration-v1", "노트북 문서에서 복사한 내용이 임시 클립보드를 거쳐 태블릿 문서의 커서 위치에 붙여넣어지는 장면")}
        </section>
    `);

    function setupClipboardLab() {
        const lab = document.querySelector("[data-clipboard-lab]");
        if (!lab) return;
        const source = lab.querySelector("[data-clipboard-source]");
        const target = lab.querySelector("[data-clipboard-target]");
        const clipboardOutput = lab.querySelector("[data-clipboard-value]");
        const status = lab.querySelector("[data-clipboard-status]");
        const initialSource = source.value;
        const initialTarget = target.value;
        let clipboard = "";
        const editorName = (editor) => editor === source ? "원문" : "붙여넣을 문서";
        const selectedText = (editor) => editor.value.slice(editor.selectionStart, editor.selectionEnd);
        const copy = (editor, cut) => {
            const selected = selectedText(editor);
            if (!selected) {
                status.innerHTML = "<b>선택이 필요합니다:</b> 복사하거나 잘라낼 글자를 먼저 드래그하거나 선택 단추로 고르세요.";
                return;
            }
            clipboard = selected;
            clipboardOutput.textContent = selected;
            if (cut) {
                const start = editor.selectionStart;
                editor.setRangeText("", editor.selectionStart, editor.selectionEnd, "start");
                editor.setSelectionRange(start, start);
                status.innerHTML = "<b>잘라내기:</b> " + editorName(editor) + "에서 선택한 ‘" + selected + "’를 없애고 그 사본을 클립보드에 임시로 두었습니다.";
            } else {
                status.innerHTML = "<b>복사:</b> " + editorName(editor) + "은 그대로 두고 선택한 ‘" + selected + "’의 사본을 클립보드에 임시로 두었습니다.";
            }
        };
        const paste = (editor) => {
            if (!clipboard) {
                status.innerHTML = "<b>클립보드가 비어 있습니다:</b> 먼저 원문을 선택해 복사하거나 잘라내세요.";
                return;
            }
            editor.focus();
            const start = editor.selectionStart;
            editor.setRangeText(clipboard, editor.selectionStart, editor.selectionEnd, "end");
            status.innerHTML = "<b>붙여넣기:</b> 클립보드의 ‘" + clipboard + "’ 사본을 " + editorName(editor) + "의 " + (start + 1) + "번째 위치부터 넣었습니다. 클립보드 내용은 남아 다시 붙여넣을 수 있습니다.";
        };
        const reset = () => {
            source.value = initialSource;
            target.value = initialTarget;
            target.setSelectionRange(target.value.length, target.value.length);
            clipboard = "";
            clipboardOutput.textContent = "비어 있음";
            status.innerHTML = "<b>선택:</b> 원문에서 직접 드래그하거나 말 단추를 누른 뒤 복사·잘라내기를 실행하세요. 붙여넣기는 아래 문서의 커서 위치에 들어갑니다.";
        };
        lab.querySelectorAll("[data-select-text]").forEach((button) => button.addEventListener("click", () => {
            const text = button.dataset.selectText;
            const start = source.value.indexOf(text);
            if (start < 0) {
                status.innerHTML = "<b>현재 원문에 없음:</b> 잘라낸 말은 처음 상태로 돌리기 전까지 다시 선택할 수 없습니다.";
                return;
            }
            source.focus();
            source.setSelectionRange(start, start + text.length);
            status.innerHTML = "<b>‘" + text + "’ 선택:</b> 선택 범위만 복사하거나 잘라낼 수 있습니다.";
        }));
        lab.querySelectorAll("[data-clipboard-action]").forEach((button) => button.addEventListener("click", () => {
            const action = button.dataset.clipboardAction;
            if (action === "copy") copy(source, false);
            if (action === "cut") copy(source, true);
            if (action === "paste") paste(target);
            if (action === "reset") reset();
        }));
        lab.addEventListener("keydown", (event) => {
            if (!(event.ctrlKey || event.metaKey)) return;
            const editor = event.target;
            if (editor !== source && editor !== target) return;
            const key = event.key.toLowerCase();
            if (!["c", "x", "v"].includes(key)) return;
            event.preventDefault();
            if (key === "c") copy(editor, false);
            if (key === "x") copy(editor, true);
            if (key === "v") paste(editor);
        });
        reset();
    }

    window.COMPUTER_LAB_SETUPS.push(setupClipboardLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("d03");
})();
