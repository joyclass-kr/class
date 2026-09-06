(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.h01 = (spec, asset) => figure(spec, "visual-network-journey", `
        <section class="network-path-lab" data-network-journey data-network-step="0">
            <header class="network-path-heading has-context">
                <div><h3>요청 패킷의 길을 직접 시험하기 <small>Network Path Test</small></h3><p>연결을 끄거나 켠 뒤 패킷을 한 단계씩 보내, 어느 연결 지점에서 멈추는지 확인하세요.</p></div>
                ${compactContextImage(asset, "h01-device-router-internet-illustration-v1", "교실의 태블릿·노트북·휴대전화가 무선 공유기에 연결되고, 공유기에서 건물 밖 통신망을 지나 원격 서버실로 이어지는 빛의 경로", "기기→공유기→인터넷→서버", "Device → Router → Internet → Server")}
            </header>
            <div class="network-path-scene" aria-label="내 기기에서 서버까지 이어지는 네트워크 경로">
                <article class="network-endpoint device-endpoint" data-network-node="device">
                    <span class="network-node-number">1</span><strong>내 기기 <small>Device</small></strong>
                    <p>수업 사이트 요청을 작은 패킷으로 준비합니다.</p>
                    <span class="network-packet" data-network-packet>요청 패킷</span>
                </article>
                <button type="button" class="network-link-switch wifi-link" data-network-link="wifi" aria-pressed="true">
                    <span>Wi-Fi 연결</span><b data-network-link-state>켜짐</b><small>기기 ↔ 공유기</small>
                </button>
                <article class="network-endpoint router-endpoint" data-network-node="router">
                    <span class="network-node-number">2</span><strong>Wi-Fi 공유기 <small>Router</small></strong>
                    <p>목적지를 보고 인터넷 쪽 길로 전달합니다.</p>
                </article>
                <button type="button" class="network-link-switch internet-link" data-network-link="internet" aria-pressed="true">
                    <span>인터넷 회선</span><b data-network-link-state>켜짐</b><small>공유기 ↔ 인터넷</small>
                </button>
                <article class="network-endpoint internet-endpoint" data-network-node="internet">
                    <span class="network-node-number">3</span><strong>인터넷 <small>Internet</small></strong>
                    <p>이어진 여러 네트워크가 서버까지 길을 만듭니다.</p>
                </article>
                <button type="button" class="network-link-switch server-link" data-network-link="server" aria-pressed="true">
                    <span>서버 연결</span><b data-network-link-state>켜짐</b><small>인터넷 ↔ 서버</small>
                </button>
                <article class="network-endpoint server-endpoint" data-network-node="server">
                    <span class="network-node-number">4</span><strong>수업 서버 <small>Server</small></strong>
                    <p>도착한 요청을 읽고 필요한 페이지를 찾습니다.</p>
                </article>
            </div>
            <div class="network-path-controls">
                <button type="button" class="network-send-action" data-network-send>패킷 한 단계 보내기 <small>Send Packet One Step</small></button>
                <button type="button" data-network-reset>모두 켜고 처음부터 <small>Reset All Links</small></button>
            </div>
            <p class="lab-readout" data-network-status aria-live="polite">패킷은 내 기기에 있습니다. 연결 하나를 끄거나 그대로 첫 단계를 보내 보세요.</p>
        </section>
    `);

    function setupNetworkJourney() {
        const lab = document.querySelector("[data-network-journey]");
        if (!lab) return;
        const status = lab.querySelector("[data-network-status]");
        const send = lab.querySelector("[data-network-send]");
        const packet = lab.querySelector("[data-network-packet]");
        const reset = lab.querySelector("[data-network-reset]");
        const nodeNames = ["device", "router", "internet", "server"];
        const linkNames = ["wifi", "internet", "server"];
        const nodes = nodeNames.map((name) => lab.querySelector(`[data-network-node="${name}"]`));
        const links = linkNames.map((name) => lab.querySelector(`[data-network-link="${name}"]`));
        const arrivalMessages = [
            "패킷은 내 기기에 있습니다. 연결 하나를 끄거나 그대로 첫 단계를 보내 보세요.",
            "Wi-Fi 연결을 지나 공유기에 도착했습니다. 공유기는 인터넷 쪽 다음 길을 고릅니다.",
            "인터넷 회선을 지나 연결된 네트워크에 도착했습니다. 이제 목적지 서버 연결을 확인합니다.",
            "요청 패킷이 수업 서버에 도착했습니다. Wi-Fi 표시만으로 전체 경로를 판단할 수 없다는 것을 확인했습니다."
        ];
        const stoppedMessages = {
            wifi: "기기에서 멈췄습니다. Wi-Fi 연결이 꺼져 있어 공유기까지 갈 수 없습니다.",
            internet: "공유기에서 멈췄습니다. 기기와 공유기는 연결됐지만 공유기 밖 인터넷 회선이 꺼져 있습니다.",
            server: "인터넷 구간에서 멈췄습니다. 공유기 밖까지 왔지만 목적지 서버로 이어지는 연결이 꺼져 있습니다."
        };
        let step = 0;
        let stoppedAt = "";
        const show = () => {
            lab.dataset.networkStep = String(step);
            lab.dataset.networkStopped = stoppedAt;
            nodes.forEach((node, index) => {
                node.classList.toggle("is-current", index === step);
                node.classList.toggle("is-passed", index < step);
            });
            links.forEach((link, index) => {
                const enabled = link.getAttribute("aria-pressed") === "true";
                link.classList.toggle("is-broken", !enabled);
                link.classList.toggle("is-passed", enabled && index < step);
                link.querySelector("[data-network-link-state]").textContent = enabled ? "켜짐" : "꺼짐";
            });
            nodes[step].append(packet);
            send.disabled = step === nodeNames.length - 1;
            const sendLabel = step === nodeNames.length - 1
                ? ["서버 도착 완료", "Arrived at the Server"]
                : stoppedAt
                    ? ["연결을 켠 뒤 다시 보내기", "Reconnect and Send Again"]
                    : ["패킷 한 단계 보내기", "Send Packet One Step"];
            setBilingualButtonLabel(send, ...sendLabel);
            status.textContent = stoppedAt ? stoppedMessages[stoppedAt] : arrivalMessages[step];
        };
        links.forEach((link) => link.addEventListener("click", () => {
            const enabled = link.getAttribute("aria-pressed") !== "true";
            link.setAttribute("aria-pressed", String(enabled));
            step = 0;
            stoppedAt = "";
            show();
            status.textContent = `${link.querySelector("span").textContent}을 ${enabled ? "켰습니다" : "껐습니다"}. 새 연결 상태를 시험하도록 패킷을 내 기기로 돌렸습니다.`;
        }));
        send.addEventListener("click", () => {
            if (step >= linkNames.length) return;
            const requiredLink = links[step];
            if (requiredLink.getAttribute("aria-pressed") !== "true") {
                stoppedAt = linkNames[step];
                show();
                return;
            }
            stoppedAt = "";
            step += 1;
            show();
        });
        reset.addEventListener("click", () => {
            links.forEach((link) => link.setAttribute("aria-pressed", "true"));
            step = 0;
            stoppedAt = "";
            show();
            send.focus();
        });
        show();
    }

    window.COMPUTER_LAB_SETUPS.push(setupNetworkJourney);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("h01");
})();
