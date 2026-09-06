(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.e04 = (spec) => figure(spec, "visual-reference-lab", `
        <section class="reference-workbench" data-reference-lab data-reference="shortcut">
            <nav aria-label="비교할 화면 표시">
                <button type="button" data-reference-choice="icon" aria-pressed="false">아이콘 <small>Icon</small></button>
                <button type="button" data-reference-choice="shortcut" aria-pressed="true">바로가기 <small>Shortcut</small></button>
                <button type="button" data-reference-choice="bookmark" aria-pressed="false">북마크·즐겨찾기 <small>Bookmark / Favorite</small></button>
            </nav>
            <section class="reference-platform-guide" aria-label="기기별 빠른 접근 기능 비교">
                <header><b>같은 목적, 다른 화면 이름 <small>Same Goal, Different Device Features</small></b><span>자주 쓰는 대상을 빨리 여는 기능은 기기마다 위치와 이름이 다릅니다.</span></header>
                <div>
                    <article><strong>Windows PC</strong><span>파일·폴더 바로가기, 작업 표시줄 고정</span><small>Shortcut · Pin to Taskbar</small></article>
                    <article><strong>Chromebook</strong><span>앱을 선반에 고정, 파일 앱에서 위치 열기</span><small>Pin to Shelf · Files</small></article>
                    <article><strong>iPad</strong><span>앱을 Dock·홈 화면에 두고 파일 위치를 즐겨찾기</span><small>Dock · Home Screen · Files Favorite</small></article>
                    <article><strong>웹페이지 <small>Web Page</small></strong><span>Chrome·Safari 북마크 또는 홈 화면 웹 아이콘</span><small>Bookmark · Add to Home Screen</small></article>
                </div>
            </section>
            <div class="reference-scenes">
                <div class="desktop-scene">
                    <span class="desktop-file" data-original-file><i data-file-icon>PDF</i><b>과학보고서.pdf</b><em data-file-path>문서/과학보고서.pdf</em></span>
                    <button type="button" class="desktop-shortcut" data-reference-marker="shortcut"><i>PDF<em>↗</em></i><b>보고서 바로가기</b></button>
                    <span class="reference-path-label" data-shortcut-path>대상: 문서/과학보고서.pdf</span>
                    <small>파일 화면 <em>File Screen</em></small>
                </div>
                <div class="browser-scene">
                    <div class="browser-bar"><span>☆</span><b data-page-url>https://science.example/report</b></div>
                    <button type="button" class="bookmark-row" data-reference-marker="bookmark">★ 과학 보고서 웹페이지 <small>Science Report Webpage</small></button>
                    <span class="reference-path-label" data-bookmark-url>저장 주소: https://science.example/report</span>
                    <small>브라우저 <em>Browser</em></small>
                </div>
                <svg class="reference-lines" viewBox="0 0 1000 310" aria-hidden="true">
                    <path class="shortcut-line" d="M245 168 C360 70 470 70 565 135"/>
                    <path class="bookmark-line" d="M760 105 C760 55 845 48 915 78"/>
                </svg>
            </div>
            <div class="reference-state-board" aria-live="polite">
                <span><small>원본 파일</small><b data-file-state>남아 있음</b></span>
                <span><small>바로가기</small><b data-shortcut-state>연결됨</b></span>
                <span><small>웹페이지</small><b data-page-state>서버에 있음</b></span>
                <span><small>북마크</small><b data-bookmark-state>주소 저장됨</b></span>
            </div>
            <div class="reference-actions">
                <button type="button" data-reference-action="open">바로가기로 열기 <small>Open the Shortcut</small></button>
                <button type="button" data-reference-action="change">원본 위치 바꾸기 <small>Move the Original</small></button>
                <button type="button" data-reference-action="delete">바로가기 삭제 <small>Delete the Shortcut</small></button>
                <button type="button" data-reference-action="reset">처음 상태 <small>Reset</small></button>
            </div>
            <p class="lab-readout" data-reference-status><b>바로가기</b>에는 원본 파일의 경로가 기록되어 있습니다. 열기·이동·삭제를 직접 실행해 원본과 연결의 상태를 비교하세요.</p>
        </section>
    `);

    function setupReferenceLab() {
        const lab = document.querySelector("[data-reference-lab]");
        if (!lab) return;
        const status = lab.querySelector("[data-reference-status]");
        const originalFile = lab.querySelector("[data-original-file]");
        const shortcut = lab.querySelector(".desktop-shortcut");
        const bookmark = lab.querySelector(".bookmark-row");
        const fileIcon = lab.querySelector("[data-file-icon]");
        const filePath = lab.querySelector("[data-file-path]");
        const shortcutPath = lab.querySelector("[data-shortcut-path]");
        const pageUrl = lab.querySelector("[data-page-url]");
        const bookmarkUrl = lab.querySelector("[data-bookmark-url]");
        const stateOutputs = {
            file: lab.querySelector("[data-file-state]"),
            shortcut: lab.querySelector("[data-shortcut-state]"),
            page: lab.querySelector("[data-page-state]"),
            bookmark: lab.querySelector("[data-bookmark-state]")
        };
        const actions = Object.fromEntries(Array.from(lab.querySelectorAll("[data-reference-action]")).map((button) => [button.dataset.referenceAction, button]));
        const initial = () => ({
            iconAlternate: false,
            filePath: "문서/과학보고서.pdf",
            shortcutPath: "문서/과학보고서.pdf",
            shortcutExists: true,
            pageUrl: "https://science.example/report",
            bookmarkUrl: "https://science.example/report",
            bookmarkExists: true
        });
        let state = initial();
        let choice = "shortcut";
        const labels = {
            icon: [["아이콘이 표시하는 항목 확인", "Inspect the Icon's Target"], ["아이콘 모양 바꾸기", "Change the Icon"], ["", ""]],
            shortcut: [["바로가기로 열기", "Open the Shortcut"], ["원본을 완료 폴더로 이동", "Move the Original"], ["바로가기 삭제", "Delete the Shortcut"]],
            bookmark: [["북마크로 열기", "Open the Bookmark"], ["웹페이지 주소 변경", "Change the Page Address"], ["북마크 삭제", "Delete the Bookmark"]]
        };
        const defaultMessages = {
            icon: "<b>아이콘</b>은 항목을 화면에서 알아보게 하는 표시입니다. 모양을 바꿔도 파일 이름·경로·내용은 그대로인지 확인하세요.",
            shortcut: "<b>바로가기</b>에는 원본 파일의 경로가 기록되어 있습니다. 열기·이동·삭제를 실행해 원본과 연결의 상태를 비교하세요.",
            bookmark: "<b>북마크·즐겨찾기</b>에는 웹 주소(URL)가 기록됩니다. 북마크와 서버의 웹페이지가 서로 다른 항목임을 확인하세요."
        };
        const render = (message = "") => {
            lab.dataset.reference = choice;
            const shortcutConnected = state.shortcutExists && state.shortcutPath === state.filePath;
            const bookmarkConnected = state.bookmarkExists && state.bookmarkUrl === state.pageUrl;
            lab.dataset.referenceConnection = choice === "shortcut"
                ? shortcutConnected ? "connected" : state.shortcutExists ? "broken" : "deleted"
                : choice === "bookmark"
                    ? bookmarkConnected ? "connected" : state.bookmarkExists ? "broken" : "deleted"
                    : "icon";
            lab.querySelectorAll("[data-reference-choice]").forEach((item) => item.setAttribute("aria-pressed", String(item.dataset.referenceChoice === choice)));
            fileIcon.textContent = state.iconAlternate ? "문서" : "PDF";
            originalFile.classList.toggle("has-alternate-icon", state.iconAlternate);
            filePath.textContent = state.filePath;
            shortcutPath.textContent = "저장 경로: " + state.shortcutPath;
            pageUrl.textContent = state.pageUrl;
            bookmarkUrl.textContent = "저장 주소: " + state.bookmarkUrl;
            shortcut.hidden = !state.shortcutExists;
            bookmark.hidden = !state.bookmarkExists;
            stateOutputs.file.textContent = "남아 있음";
            stateOutputs.shortcut.textContent = !state.shortcutExists ? "삭제됨" : shortcutConnected ? "연결됨" : "끊어진 경로";
            stateOutputs.page.textContent = "서버에 있음";
            stateOutputs.bookmark.textContent = !state.bookmarkExists ? "삭제됨" : bookmarkConnected ? "주소 연결됨" : "예전 주소";
            setBilingualButtonLabel(actions.open, ...labels[choice][0]);
            setBilingualButtonLabel(actions.change, ...labels[choice][1]);
            setBilingualButtonLabel(actions.delete, ...labels[choice][2]);
            actions.delete.hidden = choice === "icon";
            status.innerHTML = message || defaultMessages[choice];
        };
        const select = (nextChoice) => {
            choice = nextChoice;
            render();
        };
        lab.querySelectorAll("[data-reference-choice]").forEach((button) => button.addEventListener("click", () => select(button.dataset.referenceChoice)));
        lab.querySelectorAll("[data-reference-marker]").forEach((button) => button.addEventListener("click", () => select(button.dataset.referenceMarker)));
        actions.open.addEventListener("click", () => {
            if (choice === "icon") {
                render("<b>같은 파일을 확인했습니다.</b>　아이콘 모양과 관계없이 이름은 과학보고서.pdf이고 경로는 " + state.filePath + "입니다.");
                return;
            }
            if (choice === "shortcut") {
                if (!state.shortcutExists) render("<b>열 연결이 없습니다.</b>　바로가기는 삭제되었지만 원본 파일은 " + state.filePath + "에 남아 있습니다.");
                else if (state.shortcutPath !== state.filePath) render("<b>대상을 찾지 못했습니다.</b>　바로가기에 저장된 경로와 원본의 현재 경로가 다릅니다.");
                else render("<b>원본 파일을 열었습니다.</b>　바로가기가 저장 경로를 따라 " + state.filePath + "의 파일을 찾았습니다.");
                return;
            }
            if (!state.bookmarkExists) render("<b>열 주소가 없습니다.</b>　북마크는 삭제되었지만 웹페이지는 서버의 " + state.pageUrl + "에 있습니다.");
            else if (state.bookmarkUrl !== state.pageUrl) render("<b>예전 주소로는 열리지 않습니다.</b>　북마크의 저장 주소와 서버의 현재 주소가 다릅니다.");
            else render("<b>웹페이지를 요청했습니다.</b>　브라우저가 북마크의 URL을 이용해 서버에서 페이지를 받습니다.");
        });
        actions.change.addEventListener("click", () => {
            if (choice === "icon") {
                state.iconAlternate = !state.iconAlternate;
                render("<b>표시 모양만 바뀌었습니다.</b>　파일 이름·경로·내용은 바뀌지 않았습니다.");
                return;
            }
            if (choice === "shortcut") {
                state.filePath = "문서/완료/과학보고서.pdf";
                render("<b>원본을 새 폴더로 옮겼습니다.</b>　바로가기는 예전 경로를 계속 기억해 연결이 끊어졌습니다.");
                return;
            }
            state.pageUrl = "https://science.example/report-v2";
            render("<b>서버의 페이지 주소가 바뀌었습니다.</b>　북마크에는 예전 URL이 남아 있어 새 주소로 고쳐야 합니다.");
        });
        actions.delete.addEventListener("click", () => {
            if (choice === "shortcut") {
                state.shortcutExists = false;
                render("<b>바로가기만 삭제했습니다.</b>　원본 파일의 데이터와 현재 경로는 그대로 남아 있습니다.");
                return;
            }
            state.bookmarkExists = false;
            render("<b>북마크만 삭제했습니다.</b>　서버의 웹페이지는 지워지지 않고 현재 URL에 남아 있습니다.");
        });
        actions.reset.addEventListener("click", () => {
            state = initial();
            render("<b>처음 상태로 되돌렸습니다.</b>　연결과 대상이 다시 같은 경로·주소를 가리킵니다.");
        });
        select("shortcut");
    }

    window.COMPUTER_LAB_SETUPS.push(setupReferenceLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("e04");
})();
