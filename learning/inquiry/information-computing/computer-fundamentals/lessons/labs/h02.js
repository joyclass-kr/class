(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.h02 = (spec, asset) => figure(spec, "visual-web-request-lab", `
        <section class="web-state-lab" data-request-lab data-request-stage="0">
            <header class="web-state-heading has-context">
                <div><h3>주소에서 페이지가 나타날 때까지 실행하기 <small>Web Request States</small></h3><p>한 번 누를 때마다 URL 읽기, DNS 조회, 요청, 응답, 화면 표시가 한 단계씩 실제로 바뀝니다.</p></div>
                ${compactContextImage(asset, "h02-browser-dns-server-journey-illustration-v1", "학생이 브라우저 주소창을 사용하자 요청이 DNS 장치를 거쳐 서버로 가고, 서버의 페이지 조각들이 브라우저 화면으로 돌아오는 흐름", "URL→DNS→서버→페이지", "URL → DNS → Server → Page")}
            </header>
            <div class="web-address-workbench">
                <label for="webRequestAddress">브라우저 주소창 <small>Address Bar · URL (Uniform Resource Locator)</small></label>
                <div class="web-address-input-row"><i class="address-lock-icon" aria-hidden="true"></i><input id="webRequestAddress" data-request-address value="https://animals.example/otter" autocomplete="off" spellcheck="false"></div>
                <div class="url-part-readout" aria-label="URL에서 읽은 세 부분">
                    <span><small>통신 방법</small><code data-url-part="protocol">읽기 전</code></span>
                    <span><small>도메인 이름</small><code data-url-part="domain">읽기 전</code></span>
                    <span><small>페이지 경로</small><code data-url-part="path">읽기 전</code></span>
                </div>
            </div>
            <div class="web-request-workspace">
                <section class="request-system-column" aria-label="DNS와 웹 서버의 상태">
                    <article class="dns-lookup-console" data-request-unit="dns">
                        <header><strong>DNS 이름 조회 <small>Domain Name System</small></strong><span data-dns-state>조회 전</span></header>
                        <dl><div><dt>묻는 이름</dt><dd><code data-dns-query>—</code></dd></div><div><dt>찾은 IP 주소<small>Internet Protocol Address</small></dt><dd><code data-dns-answer>—</code></dd></div></dl>
                    </article>
                    <div class="request-wire" data-request-wire><span>브라우저의 요청</span><i>↓</i></div>
                    <article class="web-server-console" data-request-unit="server">
                        <header><strong>웹 서버 <small>Web Server</small></strong><span data-server-state>요청 대기</span></header>
                        <div class="http-request-record"><b>받은 요청</b><code data-http-request>아직 요청 없음</code></div>
                        <div class="server-file-result"><b>찾은 자료</b><span data-server-file>—</span></div>
                    </article>
                </section>
                <section class="request-browser-window" data-request-unit="browser" aria-label="브라우저가 받은 응답과 표시 결과">
                    <header><span>브라우저 <small>Browser</small></span><b>— □ ×</b></header>
                    <div class="http-response-inbox">
                        <strong>서버 응답 <small>Response</small></strong>
                        <code data-http-response>아직 응답 없음</code>
                    </div>
                    <main data-request-screen>
                        <span class="browser-empty-page">페이지 표시 전</span>
                        <article class="browser-finished-page" data-finished-page hidden><small>animals.example</small><h4>수달은 어디에서 살까?</h4><p>수달은 강, 호수, 바닷가처럼 물과 가까운 곳에서 삽니다.</p></article>
                    </main>
                </section>
            </div>
            <div class="web-state-controls">
                <button type="button" class="web-request-action" data-request-action>주소 읽기 <small>Read the Address</small></button>
                <button type="button" data-request-reset>처음부터 <small>Reset</small></button>
            </div>
            <p class="lab-readout" data-request-status aria-live="polite">주소창의 URL을 읽기 전입니다. URL은 서버의 숫자 주소나 페이지 내용 그 자체가 아닙니다.</p>
        </section>
    `);

    function setupRequestLab() {
        const lab = document.querySelector("[data-request-lab]");
        if (!lab) return;
        const address = lab.querySelector("[data-request-address]");
        const action = lab.querySelector("[data-request-action]");
        const reset = lab.querySelector("[data-request-reset]");
        const status = lab.querySelector("[data-request-status]");
        const protocol = lab.querySelector('[data-url-part="protocol"]');
        const domain = lab.querySelector('[data-url-part="domain"]');
        const path = lab.querySelector('[data-url-part="path"]');
        const dnsState = lab.querySelector("[data-dns-state]");
        const dnsQuery = lab.querySelector("[data-dns-query]");
        const dnsAnswer = lab.querySelector("[data-dns-answer]");
        const serverState = lab.querySelector("[data-server-state]");
        const requestRecord = lab.querySelector("[data-http-request]");
        const serverFile = lab.querySelector("[data-server-file]");
        const responseRecord = lab.querySelector("[data-http-response]");
        const routeLabel = lab.querySelector("[data-request-wire] span");
        const emptyPage = lab.querySelector(".browser-empty-page");
        const finishedPage = lab.querySelector("[data-finished-page]");
        const actionLabels = [["주소 읽기", "Read the Address"], ["DNS 이름 조회", "Look Up the DNS Name"], ["서버 요청 보내기", "Send the Server Request"], ["응답 받기", "Receive the Response"], ["브라우저에 표시", "Display in the Browser"], ["페이지 표시 완료", "Page Display Complete"]];
        const messages = [
            "주소창의 URL을 읽기 전입니다. URL은 서버의 숫자 주소나 페이지 내용 그 자체가 아닙니다.",
            "URL에서 통신 방법·도메인 이름·페이지 경로를 나눴습니다. 아직 서버의 IP 주소는 찾지 않았습니다.",
            "DNS가 도메인 이름을 서버의 IP 주소와 연결했습니다. DNS가 페이지 내용을 보내거나 로그인 판단을 한 것은 아닙니다.",
            "브라우저가 찾은 IP 주소의 서버에 페이지 경로를 적은 요청을 보냈습니다. 응답은 아직 오지 않았습니다.",
            "서버가 요청한 자료를 찾아 200 OK 응답과 HTML 내용을 돌려줬습니다. 브라우저 화면에는 아직 그리지 않았습니다.",
            "브라우저가 응답의 HTML을 읽어 글과 화면 구조로 표시했습니다. URL·DNS·요청·응답·표시의 역할이 모두 이어졌습니다."
        ];
        let stage = 0;
        let parsedAddress = null;
        const show = () => {
            lab.dataset.requestStage = String(stage);
            const hasUrl = stage >= 1;
            const hasDns = stage >= 2;
            const hasRequest = stage >= 3;
            const hasResponse = stage >= 4;
            const hasDisplay = stage >= 5;
            protocol.textContent = hasUrl ? parsedAddress.protocol.replace(":", "") : "읽기 전";
            domain.textContent = hasUrl ? parsedAddress.hostname : "읽기 전";
            path.textContent = hasUrl ? parsedAddress.pathname || "/" : "읽기 전";
            dnsState.textContent = hasDns ? "조회 완료" : "조회 전";
            dnsQuery.textContent = hasDns ? parsedAddress.hostname : "—";
            dnsAnswer.textContent = hasDns ? "203.0.113.24" : "—";
            serverState.textContent = hasResponse ? "응답 보냄" : hasRequest ? "요청 받음" : "요청 대기";
            requestRecord.textContent = hasRequest ? `GET ${parsedAddress.pathname || "/"}\nHost: ${parsedAddress.hostname}` : "아직 요청 없음";
            serverFile.textContent = hasRequest ? "otter.html" : "—";
            responseRecord.textContent = hasResponse ? "HTTP/1.1 200 OK\nContent-Type: text/html" : "아직 응답 없음";
            routeLabel.textContent = hasResponse ? "서버의 응답 → 브라우저" : hasRequest ? "브라우저의 요청 → 서버" : "브라우저의 요청";
            emptyPage.hidden = hasDisplay;
            finishedPage.hidden = !hasDisplay;
            address.disabled = stage > 0;
            action.disabled = stage === 5;
            setBilingualButtonLabel(action, ...actionLabels[stage]);
            status.textContent = messages[stage];
        };
        action.addEventListener("click", () => {
            if (stage === 0) {
                try {
                    parsedAddress = new URL(address.value.trim());
                    if (!["http:", "https:"].includes(parsedAddress.protocol)
                        || parsedAddress.hostname !== "animals.example"
                        || parsedAddress.pathname !== "/otter") throw new Error("invalid lesson address");
                } catch (_) {
                    status.textContent = "이 실험에서는 https://animals.example/otter 주소를 사용합니다. 통신 방법·도메인 이름·페이지 경로를 확인해 다시 입력하세요.";
                    address.focus();
                    return;
                }
            }
            stage = Math.min(5, stage + 1);
            show();
        });
        reset.addEventListener("click", () => {
            stage = 0;
            parsedAddress = null;
            address.value = "https://animals.example/otter";
            show();
            address.focus();
        });
        show();
    }

    window.COMPUTER_LAB_SETUPS.push(setupRequestLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("h02");
})();
