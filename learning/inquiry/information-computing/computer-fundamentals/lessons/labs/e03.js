(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.e03 = (spec) => figure(spec, "visual-file-operation-lab", `
        <section class="file-operation-lab" data-file-operation-lab data-operation="start">
            <div class="file-manager-ui">
                <div class="window-chrome"><b>파일 <small>Files</small></b><span>—　□　×</span></div>
                <div class="file-toolbar" role="group" aria-label="비교할 파일 명령">
                    <button type="button" data-file-operation="start" aria-pressed="true">처음 상태 <small>Reset</small></button>
                    <button type="button" data-file-operation="save" aria-pressed="false">저장 <small>Save</small></button>
                    <button type="button" data-file-operation="save-as" aria-pressed="false">다른 이름으로 저장 <small>Save As</small></button>
                    <button type="button" data-file-operation="copy" aria-pressed="false">복사 <small>Copy</small></button>
                    <button type="button" data-file-operation="move" aria-pressed="false">이동 <small>Move</small></button>
                    <button type="button" data-file-operation="delete" aria-pressed="false">삭제 <small>Delete</small></button>
                </div>
                <div class="operation-file-workspace">
                    <aside class="file-effect-ledger" aria-live="polite">
                        <h3>명령 뒤 무엇이 바뀌었나? <small>What Changed?</small></h3>
                        <dl>
                            <div><dt>파일 ID</dt><dd data-file-effect="identity">A</dd></div>
                            <div><dt>파일 수</dt><dd data-file-effect="count">1 → 1</dd></div>
                            <div><dt>이름</dt><dd data-file-effect="name">그대로</dd></div>
                            <div><dt>위치</dt><dd data-file-effect="location">문서</dd></div>
                            <div><dt>내용</dt><dd data-file-effect="content">내용 1</dd></div>
                        </dl>
                    </aside>
                    <main>
                        <section class="operation-folder" data-file-folder="documents"><h4>문서 <small>Documents</small></h4><div data-file-list="documents"></div></section>
                        <section class="operation-folder" data-file-folder="homework"><h4>과제 <small>Homework</small></h4><div data-file-list="homework"></div></section>
                        <section class="operation-folder is-trash" data-file-folder="trash"><h4>휴지통 <small>Trash</small></h4><div data-file-list="trash"></div></section>
                    </main>
                </div>
            </div>
            <p class="lab-readout" data-file-operation-status><b>처음 상태:</b> 문서 폴더에 파일 A 한 개가 있습니다. 각 명령을 눌러 같은 시작점에서 결과를 비교하세요.</p>
        </section>
    `);

    function setupFileOperationLab() {
        const lab = document.querySelector("[data-file-operation-lab]");
        if (!lab) return;
        const status = lab.querySelector("[data-file-operation-status]");
        const states = {
            start: {
                files: [{ id: "A", name: "보고서_원본.docx", folder: "documents", version: "내용 1" }],
                effects: ["A", "1 → 1", "그대로", "문서", "내용 1"],
                message: "<b>처음 상태:</b> 문서 폴더에 파일 A 한 개가 있습니다. 각 명령은 이 상태에서 시작합니다."
            },
            save: {
                files: [{ id: "A", name: "보고서_원본.docx", folder: "documents", version: "내용 2", changed: true }],
                effects: ["A 그대로", "1 → 1", "그대로", "문서 그대로", "내용 1 → 내용 2"],
                message: "<b>저장 Save:</b> 같은 파일 A의 내용을 고쳐 씁니다. 이름·개수·위치는 바뀌지 않습니다."
            },
            "save-as": {
                files: [{ id: "A", name: "보고서_원본.docx", folder: "documents", version: "내용 1" }, { id: "B", name: "보고서_편집본.docx", folder: "documents", version: "내용 2", changed: true }],
                effects: ["A + 새 B", "1 → 2", "새 이름 추가", "둘 다 문서", "A는 1 · B는 2"],
                message: "<b>다른 이름으로 저장 Save As:</b> 원본 A는 남고, 새 이름과 새 ID를 가진 편집본 B가 생깁니다."
            },
            copy: {
                files: [{ id: "A", name: "보고서_원본.docx", folder: "documents", version: "내용 1" }, { id: "C", name: "보고서_원본 - 복사본.docx", folder: "documents", version: "내용 1" }],
                effects: ["A + 새 C", "1 → 2", "복사본 이름", "둘 다 문서", "두 파일 내용 같음"],
                message: "<b>복사 Copy:</b> 원본 A와 같은 내용을 가진 별도 파일 C가 생깁니다. 이후 두 파일은 각각 고칠 수 있습니다."
            },
            move: {
                files: [{ id: "A", name: "보고서_원본.docx", folder: "homework", version: "내용 1" }],
                effects: ["A 그대로", "1 → 1", "그대로", "문서 → 과제", "그대로"],
                message: "<b>이동 Move:</b> 파일 A가 과제 폴더로 자리를 옮깁니다. 새 파일은 생기지 않습니다."
            },
            delete: {
                files: [{ id: "A", name: "보고서_원본.docx", folder: "trash", version: "내용 1", trashed: true }],
                effects: ["A 그대로", "1 → 1", "그대로", "문서 → 휴지통", "그대로"],
                message: "<b>삭제 Delete:</b> 이 예에서는 파일 A가 휴지통으로 이동합니다. 휴지통을 비우기 전에는 복원할 수 있습니다."
            }
        };
        const folderNames = { documents: "문서", homework: "과제", trash: "휴지통" };
        const render = (operation) => {
            const state = states[operation];
            lab.dataset.operation = operation;
            lab.querySelectorAll("[data-file-list]").forEach((list) => { list.replaceChildren(); });
            state.files.forEach((file) => {
                const item = document.createElement("div");
                item.className = `operation-file${file.changed ? " is-changed" : ""}${file.trashed ? " is-trashed" : ""}`;
                item.innerHTML = `<i>DOCX</i><span><b>${file.name}</b><small>파일 ${file.id} · ${file.version}</small></span>`;
                item.setAttribute("aria-label", `${file.name}, 파일 ${file.id}, ${file.version}, ${folderNames[file.folder]} 폴더`);
                lab.querySelector(`[data-file-list="${file.folder}"]`).append(item);
            });
            ["identity", "count", "name", "location", "content"].forEach((key, index) => {
                lab.querySelector(`[data-file-effect="${key}"]`).textContent = state.effects[index];
            });
            lab.querySelectorAll("[data-file-operation]").forEach((item) => item.setAttribute("aria-pressed", String(item.dataset.fileOperation === operation)));
            status.innerHTML = state.message;
        };
        lab.querySelectorAll("[data-file-operation]").forEach((button) => button.addEventListener("click", () => render(button.dataset.fileOperation)));
        render("start");
    }

    window.COMPUTER_LAB_SETUPS.push(setupFileOperationLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("e03");
})();
