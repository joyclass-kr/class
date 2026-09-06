(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.j03 = (spec, asset) => figure(spec, "visual-debug-lab", `
        <section class="debug-lab" data-debug-lab data-debug-stage="start">
            <header class="debug-lab-heading">
                ${compactContextImage(asset, "j03-photo-path-debug-illustration-v2", "같은 고양이 사진으로 오류를 다시 만들고, 잘못 적힌 폴더 이름을 고친 뒤 사진이 열리는지 다시 시험하는 과정", "오류 재현 → 경로 수정 → 재시험", "Reproduce → Fix Path → Retest")}
                <div>
                    <span>디버깅 절차 <small>Debugging Workflow</small></span>
                    <h3>같은 입력으로 오류를 다시 만든 뒤 원인 하나만 고친다</h3>
                    <p><code>cat.webp</code>는 그대로 두고 프로그램의 기본 폴더만 비교합니다. 고친 뒤에는 같은 사진, 다른 사진, 없는 사진을 차례로 시험합니다.</p>
                </div>
            </header>
            <div class="mini-photo-app">
                <header><b>파일 경로 검사기 <small>File Path Tester</small></b><button type="button" data-debug-run>실행 <small>Run</small></button></header>
                <main>
                    <section class="debug-file-and-preview" aria-label="실제 저장 폴더와 프로그램 출력">
                        <div class="debug-file-browser">
                            <header><b>실제 저장 폴더 <small>Actual Storage Folder</small></b><code>/pictures/</code><span>2개 파일</span></header>
                            <div class="debug-file-list">
                                <div><img src="${asset("j03-cat-file.webp")}" width="512" height="512" alt="실제 저장 폴더에 있는 주황색 고양이 사진"><span><b>cat.webp</b><small>Image File</small></span></div>
                                <div><img src="${asset("j03-dog-file.webp")}" width="512" height="512" alt="실제 저장 폴더에 있는 갈색 강아지 사진"><span><b>dog.webp</b><small>Image File</small></span></div>
                            </div>
                        </div>
                        <div class="photo-output" data-debug-output data-preview-state="waiting"><div class="debug-output-message"><i aria-hidden="true">▶</i><b>실행 전</b><span>실행하면 프로그램이 찾은 사진이나 오류가 이곳에 나타납니다.</span></div></div>
                    </section>
                    <div class="tiny-program">
                        <p class="debug-fixed-input"><b>선택한 사진 <small>Selected Input</small></b><code data-debug-selected-name>cat.webp</code></p>
                        <label>프로그램에 적힌 기본 폴더 <small>Base Folder in the Program</small><input data-debug-code value="/picture/" spellcheck="false" aria-describedby="debug-real-path"></label>
                        <p class="actual-path-note" id="debug-real-path">파일 앱에서 확인한 실제 폴더 <small>Actual Folder in the File App</small> <code>/pictures/</code></p>
                        <span>사진 입력은 <code>cat.webp</code>로 그대로 두고, 프로그램이 앞에 붙이는 폴더 이름의 한 글자를 고치세요.</span>
                    </div>
                </main>
                <footer data-debug-log aria-live="polite">아직 실행하지 않았습니다.</footer>
            </div>
            <aside class="debug-regression" data-debug-regression aria-label="수정 뒤 다른 입력 시험">
                <h4>나머지 입력 두 개 시험하기 <small>Regression Test</small></h4>
                <p>고양이 사진 재시험이 통과하면 다른 파일과 없는 파일이 활성화됩니다. 수정이 한 사례에만 맞춘 것은 아닌지 확인하세요.</p>
                <div class="debug-case-buttons">
                    <button type="button" data-debug-case="cat" data-debug-src="${asset("j03-cat-file.webp")}" data-debug-alt="주황색 고양이 사진" disabled><img src="${asset("j03-cat-file.webp")}" width="512" height="512" alt=""><span><b>cat.webp</b><small>Same-input Retest</small></span></button>
                    <button type="button" data-debug-case="dog" data-debug-src="${asset("j03-dog-file.webp")}" data-debug-alt="갈색 강아지 사진" disabled><img src="${asset("j03-dog-file.webp")}" width="512" height="512" alt=""><span><b>dog.webp</b><small>Existing File</small></span></button>
                    <button type="button" data-debug-case="missing" disabled><i class="debug-missing-thumbnail" aria-hidden="true"><svg viewBox="0 0 56 64"><path d="M8 3h27l13 13v45H8Z"/><path d="M35 3v14h13"/><path d="m18 32 20 20m0-20L18 52"/></svg></i><span><b>bird.webp</b><small>Missing File</small></span></button>
                </div>
                <ul class="debug-case-results" aria-live="polite">
                    <li data-debug-case-result="cat">cat.webp: 같은 입력 재시험 전</li>
                    <li data-debug-case-result="dog">dog.webp: 아직 시험하지 않음</li>
                    <li data-debug-case-result="missing">bird.webp: 아직 시험하지 않음</li>
                </ul>
            </aside>
            <ol class="debug-data-trace" aria-label="입력 처리 출력 저장 흐름">
                <li data-debug-flow="input"><b>입력 <small>Input</small></b><span>선택한 사진 cat.webp</span></li>
                <li data-debug-flow="storage"><b>저장 <small>Storage</small></b><span>파일 앱의 실제 경로</span></li>
                <li data-debug-flow="processing"><b>처리 <small>Processing</small></b><span>두 경로가 같은지 검사</span></li>
                <li data-debug-flow="output"><b>출력 <small>Output</small></b><span>사진 또는 오류 안내</span></li>
            </ol>
            <ol class="debug-observation">
                <li data-debug-step="reproduce"><b>1</b><span>오류 다시 만들기 <small>Reproduce</small></span></li>
                <li data-debug-step="observe"><b>2</b><span>두 경로 비교하기 <small>Observe</small></span></li>
                <li data-debug-step="fix"><b>3</b><span>원인 하나 고치기 <small>Fix</small></span></li>
                <li data-debug-step="retest"><b>4</b><span>같은 입력 재시험 <small>Retest</small></span></li>
                <li data-debug-step="regression"><b>5</b><span>다른 입력 시험 <small>Regression Test</small></span></li>
            </ol>
        </section>
    `);

    function setupDebugLab() {
        const lab = document.querySelector("[data-debug-lab]");
        if (!lab) return;
        const output = lab.querySelector("[data-debug-output]");
        const code = lab.querySelector("[data-debug-code]");
        const log = lab.querySelector("[data-debug-log]");
        const run = lab.querySelector("[data-debug-run]");
        const caseButtons = [...lab.querySelectorAll("[data-debug-case]")];
        const selectedName = lab.querySelector("[data-debug-selected-name]");
        const flowCells = Object.fromEntries([...lab.querySelectorAll("[data-debug-flow]")].map((item) => [item.dataset.debugFlow, item.querySelector("span")]));
        const testedCases = new Set();
        let reproduced = false;
        let exactFixTried = false;
        const selectInput = (caseName) => {
            selectedName.textContent = (caseName === "missing" ? "bird" : caseName) + ".webp";
            caseButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.debugCase === caseName)));
        };
        const showOutputMessage = (title, detail, state = "message") => {
            const message = document.createElement("div");
            message.className = "debug-output-message";
            const icon = document.createElement("i");
            icon.setAttribute("aria-hidden", "true");
            icon.textContent = state === "error" || state === "missing" ? "!" : "▶";
            const heading = document.createElement("b");
            heading.textContent = title;
            const copy = document.createElement("span");
            copy.textContent = detail;
            message.append(icon, heading, copy);
            output.dataset.previewState = state;
            output.replaceChildren(message);
        };
        const showPhotoPreview = (name) => {
            const sourceButton = caseButtons.find((button) => button.dataset.debugCase === name);
            if (!sourceButton?.dataset.debugSrc) return;
            const preview = document.createElement("figure");
            preview.className = "debug-photo-preview";
            const image = document.createElement("img");
            image.src = sourceButton.dataset.debugSrc;
            image.width = 512;
            image.height = 512;
            image.alt = sourceButton.dataset.debugAlt + " 미리보기";
            const caption = document.createElement("figcaption");
            const filename = document.createElement("b");
            filename.textContent = name + ".webp";
            const path = document.createElement("code");
            path.textContent = "/pictures/" + name + ".webp";
            caption.append(filename, path);
            preview.append(image, caption);
            output.dataset.previewState = "image";
            output.replaceChildren(preview);
        };
        const markStep = (name, complete) => {
            const step = lab.querySelector('[data-debug-step="' + name + '"]');
            if (step) step.classList.toggle("is-complete", complete);
        };
        const showDataFlow = (input, stored, processing, result) => {
            flowCells.input.textContent = input;
            flowCells.storage.textContent = stored;
            flowCells.processing.textContent = processing;
            flowCells.output.textContent = result;
        };
        const unlockRegression = () => {
            caseButtons.forEach((button) => { button.disabled = button.dataset.debugCase === "cat"; });
        };
        run.addEventListener("click", () => {
            selectInput("cat");
            const baseFolder = code.value.trim();
            const normalizedBaseFolder = baseFolder.endsWith("/") ? baseFolder : baseFolder + "/";
            const requestedPath = normalizedBaseFolder + "cat.webp";
            if (baseFolder === "/picture/" && !reproduced) {
                lab.dataset.debugStage = "error";
                reproduced = true;
                markStep("reproduce", true);
                markStep("observe", true);
                markStep("fix", false);
                markStep("retest", false);
                markStep("regression", false);
                log.textContent = "오류 재현: 같은 사진 cat.webp를 골랐지만 프로그램이 " + requestedPath + "를 찾아 멈췄습니다. 실제 폴더와 비교하세요.";
                showOutputMessage("사진을 불러오지 못했습니다.", "요청한 " + requestedPath + "에 파일이 없습니다.", "error");
                showDataFlow("선택한 사진 cat.webp", "실제 파일 /pictures/cat.webp", "기본 폴더와 파일 이름 조합 → " + requestedPath, "파일 없음 오류 표시");
                return;
            }
            if (normalizedBaseFolder !== "/pictures/") {
                lab.dataset.debugStage = "error";
                markStep("fix", false);
                markStep("retest", false);
                markStep("regression", false);
                log.textContent = reproduced
                    ? "아직 실제 폴더 /pictures/와 다릅니다. 기본 폴더의 철자를 다시 비교하세요."
                    : "처음 사례를 바꾸지 마세요. 기본 폴더를 /picture/로 되돌려 cat.webp 오류부터 재현하세요.";
                showOutputMessage("경로가 일치하지 않습니다.", "프로그램은 " + requestedPath + "를 찾지만 실제 파일은 /pictures/cat.webp에 있습니다.", "error");
                showDataFlow("선택한 사진 cat.webp", "실제 파일 /pictures/cat.webp", "기본 폴더와 파일 이름 조합 → " + requestedPath, "재현 조건 또는 폴더 이름 확인 필요");
                return;
            }
            if (!reproduced) {
                lab.dataset.debugStage = "start";
                log.textContent = "먼저 처음의 기본 폴더 /picture/와 같은 사진 cat.webp로 실행해 오류를 재현하고 기록하세요.";
                showOutputMessage("재현 기록이 없습니다.", "기본 폴더를 /picture/로 되돌린 뒤 같은 cat.webp로 먼저 실행하세요.", "message");
                showDataFlow("선택한 사진 cat.webp", "실제 파일 /pictures/cat.webp", "수정 전에 같은 조건을 재현했는지 확인", "재현 단계로 돌아가기");
                return;
            }
            exactFixTried = true;
            lab.dataset.debugStage = "retested";
            markStep("fix", true);
            markStep("retest", true);
            testedCases.add("cat");
            const catResult = lab.querySelector('[data-debug-case-result="cat"]');
            catResult.classList.add("is-pass");
            catResult.textContent = "cat.webp: 같은 입력 재시험 통과";
            const catButton = lab.querySelector('[data-debug-case="cat"]');
            catButton.classList.add("is-tested");
            log.textContent = "같은 입력 재시험 통과: cat.webp는 그대로 두고 기본 폴더만 고쳐 /pictures/cat.webp를 읽었습니다. 이제 다른 입력도 시험하세요.";
            showPhotoPreview("cat");
            showDataFlow("선택한 사진 cat.webp", "실제 파일 /pictures/cat.webp", "기본 폴더 /pictures/ + 파일 이름 → 경로 일치", "cat.webp 사진 표시");
            unlockRegression();
        });
        code.addEventListener("input", () => {
            const baseFolder = code.value.trim();
            const normalizedBaseFolder = baseFolder.endsWith("/") ? baseFolder : baseFolder + "/";
            const exact = normalizedBaseFolder === "/pictures/";
            const requestedPath = normalizedBaseFolder + "cat.webp";
            lab.dataset.debugStage = exact ? "fix-ready" : (reproduced ? "editing" : "start");
            markStep("fix", exact);
            markStep("retest", false);
            markStep("regression", false);
            caseButtons.forEach((button) => { button.disabled = true; });
            caseButtons.forEach((button) => button.classList.remove("is-tested"));
            selectInput("cat");
            exactFixTried = false;
            testedCases.clear();
            lab.querySelectorAll("[data-debug-case-result]").forEach((item) => {
                item.classList.remove("is-pass");
                const labels = { cat: "cat.webp: 같은 입력 재시험 전", dog: "dog.webp: 아직 시험하지 않음", missing: "bird.webp: 아직 시험하지 않음" };
                item.textContent = labels[item.dataset.debugCaseResult];
            });
            log.textContent = exact
                ? "실제 폴더와 같아졌습니다. cat.webp 입력은 그대로 둔 채 다시 실행해 수정 전후를 비교하세요."
                : "기본 폴더를 편집했습니다. 실제 폴더와 아직 다릅니다. 철자를 다시 비교하세요.";
            showOutputMessage(exact ? "수정 내용을 실행하기 전입니다." : "경로를 편집하는 중입니다.", exact ? "실행을 눌러 /pictures/cat.webp가 열리는지 확인하세요." : "프로그램 경로와 실제 폴더 /pictures/를 한 글자씩 비교하세요.", exact ? "ready" : "message");
            showDataFlow("선택한 사진 cat.webp", "실제 파일 /pictures/cat.webp", exact ? "요청 경로 " + requestedPath + " · 실행 필요" : "요청 경로 " + requestedPath + " · 아직 다름", "아직 재시험하지 않음");
        });
        caseButtons.forEach((button) => button.addEventListener("click", () => {
            if (!exactFixTried || button.dataset.debugCase === "cat") return;
            const name = button.dataset.debugCase;
            const result = lab.querySelector('[data-debug-case-result="' + name + '"]');
            testedCases.add(name);
            result.classList.add("is-pass");
            button.classList.add("is-tested");
            selectInput(name);
            if (name === "missing") {
                result.textContent = "bird.webp: 없음 오류를 예상대로 처리함";
                showOutputMessage("bird.webp를 찾지 못했습니다.", "/pictures/ 폴더에는 cat.webp와 dog.webp만 있습니다. 없는 파일을 오류로 처리했습니다.", "missing");
                showDataFlow("선택한 사진 bird.webp", "실제 파일 없음", "기본 폴더 + 파일 이름 → 존재 여부: 아니요", "파일 없음 오류 표시");
            } else {
                result.textContent = name + ".webp: 사진 표시 통과";
                showPhotoPreview(name);
                showDataFlow("선택한 사진 " + name + ".webp", "실제 파일 /pictures/" + name + ".webp", "기본 폴더 + 파일 이름 → 존재 여부: 예", (name === "dog" ? "강아지" : "고양이") + " 사진 표시");
            }
            button.disabled = true;
            if (testedCases.size === caseButtons.length) {
                lab.dataset.debugStage = "success";
                markStep("regression", true);
                log.textContent = "검증 완료: 같은 입력 재시험, 다른 파일, 없는 파일에서 예상한 결과가 나왔습니다.";
            } else {
                log.textContent = "전체 시험 " + testedCases.size + "/3 통과. 남은 입력도 시험하세요.";
            }
        }));
        selectInput("cat");
        showDataFlow("선택한 사진 cat.webp", "실제 파일 /pictures/cat.webp", "기본 폴더 /picture/ + 파일 이름 → 실행 전", "아직 결과 없음");
    }

    window.COMPUTER_LAB_SETUPS.push(setupDebugLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("j03");
})();
