(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.i02 = (spec, asset) => figure(spec, "visual-evidence-lab", `
        <section class="evidence-lab" data-evidence-lab>
            <header class="evidence-lab-heading">
                <div><h3>메시지 원문에서 위험 근거 세 곳을 직접 찾는다 <small>Inspect the Message Itself</small></h3><p>이름이나 느낌이 아니라 실제 주소, 요구하는 정보, 재촉하는 표현을 원문에서 눌러 검사 기록에 담으세요.</p></div>
                ${compactContextImage(asset, "i02-suspicious-message-evidence-illustration-v1", "학생이 의심스러운 메시지의 주소와 정보 요구를 확대해 확인하는 장면", "주소와 요구 정보 대조", "Compare the Address and Request")}
            </header>
            <div class="message-app">
                <header><span>받은 메시지</span><button type="button" data-evidence-choice="time" data-evidence-correct="false" aria-pressed="false">오늘 10:18 <small>Received Time</small></button></header>
                <div class="official-address-card"><span>학교가 알려 준 공식 주소</span><code>https://portal.school.kr</code><small>Official School Portal</small></div>
                <div class="sender-row">
                    <i>?</i><button type="button" data-evidence-choice="name" data-evidence-correct="false" aria-pressed="false"><strong>학교 포털 지원팀</strong><span>notice@school-help.example</span><small>Visible Sender Name</small></button>
                </div>
                <div class="message-body">
                    <button type="button" class="message-urgency" data-evidence-choice="urgency" data-evidence-correct="true" aria-pressed="false">10분 안에 계정을 확인하세요 <small>Urgency</small></button>
                    <button type="button" class="message-secret-request" data-evidence-choice="secret" data-evidence-correct="true" aria-pressed="false">계정을 계속 쓰려면 비밀번호와 등록 기기에 온 인증번호를 입력하세요. <small>Password and Verification Code Request</small></button>
                    <button type="button" class="suspicious-cta" data-evidence-choice="link" data-evidence-correct="true" aria-pressed="false">https://school.kr.login-help.example/login <small>Link Address</small></button>
                </div>
            </div>
            <aside class="evidence-notebook">
                <h3>주소 확대와 검사 기록 <small>Address Magnifier and Evidence Record</small></h3>
                <div class="address-magnifier" aria-label="공식 주소와 의심 주소의 실제 소유 부분 비교">
                    <div><span>공식 주소 <small>Official</small></span><code><i>portal.</i><b data-address-segment="owner">school.kr</b></code></div>
                    <div><span>메시지 링크 <small>Message Link</small></span><code><i>school.kr.</i><b data-address-segment="owner">login-help.example</b><em>/login</em></code></div>
                    <p>앞쪽의 <code>school.kr</code>이 아니라 주소 끝의 <b>login-help.example</b>이 실제 소유 부분입니다.</p>
                </div>
                <ol class="evidence-records" aria-label="메시지에서 선택한 세 근거">
                    <li data-evidence-record="0"><b>1</b><span>선택 안 함</span></li>
                    <li data-evidence-record="1"><b>2</b><span>선택 안 함</span></li>
                    <li data-evidence-record="2"><b>3</b><span>선택 안 함</span></li>
                </ol>
                <div class="evidence-actions"><button type="button" data-evidence-check disabled>근거 확인 <small>Check Evidence</small></button><button type="button" data-evidence-reset>다시 고르기 <small>Choose Again</small></button></div>
                <p data-evidence-status role="status" aria-live="polite">메시지 안에서 근거 세 곳을 누르세요. 세 곳을 모두 고른 뒤에만 전체 판단을 확인할 수 있습니다.</p>
            </aside>
            <details class="citizenship-extension" data-citizenship-details>
                <summary>개인정보·저작권·디지털 발자국·기기 건강 <small>Privacy, Copyright, Digital Footprint, and Device Health</small></summary>
                <div class="citizenship-check" data-citizenship-check>
                <div class="citizenship-tabs" role="group" aria-label="직접 확인할 디지털 생활 원리">
                    <button type="button" data-citizenship-choice="privacy" aria-pressed="true">개인정보 <small>Privacy</small></button>
                    <button type="button" data-citizenship-choice="copyright" aria-pressed="false">저작권·라이선스 <small>Copyright & License</small></button>
                    <button type="button" data-citizenship-choice="footprint" aria-pressed="false">디지털 발자국 <small>Digital Footprint</small></button>
                    <button type="button" data-citizenship-choice="wellbeing" aria-pressed="false">기기 건강 <small>Digital Well-being</small></button>
                </div>
                <div class="citizenship-task-stage">
                    <section data-citizenship-panel="privacy">
                        <div class="privacy-post-card"><strong>사진 게시물에 포함된 정보</strong><span>이름: 민준</span><span>학교 운동장 사진</span><span>촬영 위치</span></div>
                        <div class="citizenship-action-row" role="group" aria-label="게시물 공개 범위">
                            <button type="button" data-privacy-audience="public" aria-pressed="false">누구나 <small>Public</small></button>
                            <button type="button" data-privacy-audience="class" aria-pressed="true">우리 학급 <small>Class</small></button>
                            <button type="button" data-privacy-audience="private" aria-pressed="false">나만 보기 <small>Private</small></button>
                        </div>
                        <div class="citizenship-result" data-privacy-result role="status" aria-live="polite"><b>우리 학급 24명</b><span>이름·사진·촬영 위치를 볼 수 있습니다.</span></div>
                    </section>
                    <section data-citizenship-panel="copyright" hidden>
                        <div class="license-card"><strong>수달 사진 <small>Otter Photo</small></strong><code>CC BY-NC 4.0</code><span>만든 사람 표시 필요 · 상업적 이용 금지 <small>Attribution Required · NonCommercial</small></span></div>
                        <div class="copyright-controls">
                            <label><input type="checkbox" data-license-credit> 만든 사람과 출처 표시 <small>Credit Creator and Source</small></label>
                            <label>사용 목적 <small>Purpose of Use</small><select data-license-purpose><option value="class">학교 발표 자료 · School Presentation</option><option value="sale">판매할 포스터 · Poster for Sale</option></select></label>
                        </div>
                        <div class="citizenship-result" data-license-result role="status" aria-live="polite"><b>조건 확인 전</b><span>사용 계획과 라이선스 조건을 서로 비교하세요.</span></div>
                    </section>
                    <section data-citizenship-panel="footprint" hidden>
                        <div class="footprint-copies">
                            <span data-footprint-copy="original">내 게시물 <b>없음</b></span>
                            <span data-footprint-copy="friend">친구의 복사본 <b>없음</b></span>
                            <span data-footprint-copy="log">서비스 기록 <b>없음</b></span>
                        </div>
                        <div class="citizenship-action-row"><button type="button" data-footprint-action="post">게시 <small>Post</small></button><button type="button" data-footprint-action="copy" disabled>친구가 복사 <small>Friend Copies</small></button><button type="button" data-footprint-action="delete" disabled>내 게시물 삭제 <small>Delete My Post</small></button><button type="button" data-footprint-action="reset">초기화 <small>Reset</small></button></div>
                        <div class="citizenship-result" data-footprint-result role="status" aria-live="polite"><b>게시 전</b><span>게시·복사·삭제를 차례로 눌러 남는 기록을 관찰하세요.</span></div>
                    </section>
                    <section data-citizenship-panel="wellbeing" hidden>
                        <label class="distance-control">눈과 화면 사이 거리 <small>Eye–Screen Distance</small><input type="range" min="15" max="70" value="35" data-screen-distance><output data-distance-output>35 cm</output></label>
                        <div class="wellbeing-cycle"><button type="button" data-rest-action="study">25분 학습 기록 <small>Study 25 Minutes</small></button><button type="button" data-rest-action="rest">5분 눈 휴식 기록 <small>Rest Eyes 5 Minutes</small></button><span>학습 <b data-study-count>0</b>회 · 휴식 <b data-rest-count>0</b>회</span></div>
                        <div class="citizenship-result" data-wellbeing-result role="status" aria-live="polite"><b>35 cm</b><span>화면이 매우 가깝지는 않지만 자세와 글자 크기도 함께 살펴야 합니다.</span></div>
                    </section>
                </div>
                <p data-citizenship-status role="status" aria-live="polite"><b>개인정보 Privacy:</b> 공개 범위를 바꾸면 같은 게시물을 볼 수 있는 사람이 달라집니다.</p>
            </div>
        </section>
    `);

    function setupEvidenceLab() {
        const lab = document.querySelector("[data-evidence-lab]");
        if (!lab) return;
        const status = lab.querySelector("[data-evidence-status]");
        const evidenceChoices = [...lab.querySelectorAll("[data-evidence-choice]")];
        const evidenceRecords = [...lab.querySelectorAll("[data-evidence-record]")];
        const evidenceCheck = lab.querySelector("[data-evidence-check]");
        const evidenceReset = lab.querySelector("[data-evidence-reset]");
        const evidenceLabels = {
            link: "실제 링크 주소가 login-help.example 아래임",
            secret: "비밀번호와 일회용 인증번호를 함께 요구함",
            urgency: "10분 제한으로 확인을 재촉함",
            name: "보이는 이름에 학교 포털이 적혀 있음",
            time: "오전 10시 18분에 받음"
        };
        let evidenceSolved = false;
        const updateEvidence = () => {
            const selected = evidenceChoices.filter((button) => button.getAttribute("aria-pressed") === "true");
            evidenceCheck.disabled = selected.length !== 3;
            evidenceRecords.forEach((record, index) => {
                const choice = selected[index];
                record.classList.toggle("is-filled", Boolean(choice));
                record.querySelector("span").textContent = choice ? evidenceLabels[choice.dataset.evidenceChoice] : "선택 안 함";
            });
            status.textContent = selected.length === 0
                ? "메시지 안에서 근거 세 곳을 누르세요. 세 곳을 모두 고른 뒤에만 전체 판단을 확인할 수 있습니다."
                : selected.length < 3
                    ? "3개 중 " + selected.length + "개를 골랐습니다. 세 근거를 함께 골라야 확인할 수 있습니다."
                    : selected.length === 3
                        ? "세 곳을 골랐습니다. 검사 기록이 모두 위험을 직접 뒷받침하는지 확인하세요."
                        : selected.length + "개를 골랐습니다. 정확히 3개가 되도록 선택을 줄이세요.";
        };
        evidenceChoices.forEach((button) => button.addEventListener("click", () => {
            if (evidenceSolved) return;
            const pressed = button.getAttribute("aria-pressed") === "true";
            button.setAttribute("aria-pressed", String(!pressed));
            evidenceChoices.forEach((item) => item.classList.remove("is-found", "is-wrong"));
            updateEvidence();
        }));
        evidenceCheck.addEventListener("click", () => {
            const selected = evidenceChoices.filter((button) => button.getAttribute("aria-pressed") === "true");
            const correct = selected.length === 3 && selected.every((button) => button.dataset.evidenceCorrect === "true");
            if (correct) {
                evidenceSolved = true;
                selected.forEach((button) => button.classList.add("is-found"));
                evidenceChoices.forEach((button) => { button.disabled = true; });
                status.textContent = "세 근거가 서로 맞물립니다. 링크를 열지 말고 공식 주소를 직접 입력하거나 선생님에게 다른 방법으로 확인하세요.";
                evidenceCheck.disabled = true;
                return;
            }
            evidenceChoices.forEach((button) => button.classList.remove("is-wrong"));
            status.textContent = "고른 세 곳 중 하나 이상은 위험을 직접 뒷받침하지 못합니다. 개별 정답 표시는 하지 않습니다. 실제 주소·요구 정보·재촉 표현을 다시 대조하세요.";
        });
        evidenceReset.addEventListener("click", () => {
            evidenceSolved = false;
            evidenceChoices.forEach((button) => {
                button.disabled = false;
                button.setAttribute("aria-pressed", "false");
                button.classList.remove("is-found", "is-wrong");
            });
            updateEvidence();
            evidenceChoices[0].focus();
        });
        updateEvidence();
        const citizenshipStatus = lab.querySelector("[data-citizenship-status]");
        const citizenshipMessages = {
            privacy: "<b>개인정보 Privacy:</b> 공개 범위를 바꾸면 같은 게시물을 볼 수 있는 사람이 달라집니다.",
            copyright: "<b>저작권·라이선스 Copyright & License:</b> 사용 목적과 표시 방법이 작품의 이용 조건에 맞는지 비교합니다.",
            footprint: "<b>디지털 발자국 Digital Footprint:</b> 내 게시물을 지워도 다른 사람이 만든 복사본과 서비스 기록은 별개의 상태입니다.",
            wellbeing: "<b>디지털 기기 건강 Digital Well-being:</b> 거리 한 가지가 아니라 글자 크기·자세·학습과 휴식의 리듬을 함께 조절합니다."
        };
        lab.querySelectorAll("[data-citizenship-choice]").forEach((button) => button.addEventListener("click", () => {
            const choice = button.dataset.citizenshipChoice;
            lab.querySelectorAll("[data-citizenship-choice]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
            lab.querySelectorAll("[data-citizenship-panel]").forEach((panel) => { panel.hidden = panel.dataset.citizenshipPanel !== choice; });
            citizenshipStatus.innerHTML = citizenshipMessages[choice];
        }));
        const privacyResult = lab.querySelector("[data-privacy-result]");
        const audiences = {
            public: ["인터넷을 보는 사람", "이름·사진·촬영 위치가 계정 밖의 사람에게도 보일 수 있습니다."],
            class: ["우리 학급 24명", "이름·사진·촬영 위치를 볼 수 있습니다."],
            private: ["이 계정의 사용자", "다른 계정에는 게시물이 표시되지 않습니다."]
        };
        lab.querySelectorAll("[data-privacy-audience]").forEach((button) => button.addEventListener("click", () => {
            const choice = button.dataset.privacyAudience;
            lab.querySelectorAll("[data-privacy-audience]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
            privacyResult.innerHTML = "<b>" + audiences[choice][0] + "</b><span>" + audiences[choice][1] + "</span>";
        }));
        const credit = lab.querySelector("[data-license-credit]");
        const purpose = lab.querySelector("[data-license-purpose]");
        const licenseResult = lab.querySelector("[data-license-result]");
        const updateLicense = () => {
            if (!credit.checked) {
                licenseResult.innerHTML = "<b>BY 조건 부족</b><span>CC BY-NC는 만든 사람과 출처를 표시해야 합니다.</span>";
                licenseResult.dataset.state = "blocked";
                return;
            }
            if (purpose.value === "sale") {
                licenseResult.innerHTML = "<b>NC 조건과 충돌</b><span>NC는 상업적 이용을 허용하지 않으므로 판매용 포스터에는 사용할 수 없습니다.</span>";
                licenseResult.dataset.state = "blocked";
                return;
            }
            licenseResult.innerHTML = "<b>조건 충족</b><span>출처를 표시한 학교 발표 자료는 BY와 NC 조건에 맞습니다.</span>";
            licenseResult.dataset.state = "allowed";
        };
        credit.addEventListener("change", updateLicense);
        purpose.addEventListener("change", updateLicense);
        const footprintResult = lab.querySelector("[data-footprint-result]");
        const footprintButtons = Object.fromEntries(Array.from(lab.querySelectorAll("[data-footprint-action]")).map((button) => [button.dataset.footprintAction, button]));
        const footprintCopies = Object.fromEntries(Array.from(lab.querySelectorAll("[data-footprint-copy]")).map((item) => [item.dataset.footprintCopy, item]));
        let footprint = { original: false, friend: false, log: false };
        const renderFootprint = (message = "게시·복사·삭제를 차례로 눌러 남는 기록을 관찰하세요.") => {
            Object.entries(footprintCopies).forEach(([key, item]) => {
                item.classList.toggle("is-present", footprint[key]);
                item.querySelector("b").textContent = footprint[key] ? "남아 있음" : "없음";
            });
            footprintButtons.copy.disabled = !footprint.original || footprint.friend;
            footprintButtons.delete.disabled = !footprint.original;
            const remaining = [footprint.friend && "친구의 복사본", footprint.log && "서비스 기록"].filter(Boolean);
            footprintResult.innerHTML = "<b>" + (footprint.original ? "내 게시물 표시 중" : "내 게시물 없음") + "</b><span>" + message + (remaining.length ? " 현재 남은 것: " + remaining.join(", ") + "." : "") + "</span>";
        };
        footprintButtons.post.addEventListener("click", () => {
            footprint.original = true;
            footprint.log = true;
            renderFootprint(footprint.friend
                ? "다시 게시해도 친구 기기에 있던 이전 복사본은 사라지지 않습니다."
                : "게시 순간 서비스 기록이 함께 생겼습니다.");
        });
        footprintButtons.copy.addEventListener("click", () => {
            footprint.friend = true;
            renderFootprint("친구의 기기에 별도 복사본이 생겼습니다.");
        });
        footprintButtons.delete.addEventListener("click", () => {
            footprint.original = false;
            renderFootprint("내 화면의 게시물은 지워졌지만 다른 저장 위치는 함께 지워지지 않았습니다.");
        });
        footprintButtons.reset.addEventListener("click", () => {
            footprint = { original: false, friend: false, log: false };
            renderFootprint();
        });
        renderFootprint();
        const distance = lab.querySelector("[data-screen-distance]");
        const distanceOutput = lab.querySelector("[data-distance-output]");
        const wellbeingResult = lab.querySelector("[data-wellbeing-result]");
        let studyCount = 0;
        let restCount = 0;
        let waitingForRest = false;
        const updateDistance = () => {
            const centimeters = Number(distance.value);
            distanceOutput.textContent = centimeters + " cm";
            const note = centimeters < 30
                ? "화면이 매우 가깝습니다. 글자를 키우고 기기를 조금 멀리 놓아 보세요."
                : centimeters > 60
                    ? "화면이 멉니다. 몸을 숙이지 않도록 글자 크기와 기기 위치를 조절하세요."
                    : "일반적인 작업 거리 범위에 있지만 자세와 글자 크기도 함께 살펴야 합니다.";
            wellbeingResult.innerHTML = "<b>" + centimeters + " cm</b><span>" + note + "</span>";
        };
        distance.addEventListener("input", updateDistance);
        lab.querySelectorAll("[data-rest-action]").forEach((button) => button.addEventListener("click", () => {
            if (button.dataset.restAction === "study") {
                if (waitingForRest) {
                    wellbeingResult.innerHTML = "<b>먼저 눈 휴식이 필요함</b><span>이미 25분 학습을 기록했습니다. 다음 학습을 더하기 전에 5분 동안 화면에서 눈을 떼세요.</span>";
                    return;
                }
                studyCount += 1;
                waitingForRest = true;
            } else {
                if (!waitingForRest) {
                    wellbeingResult.innerHTML = "<b>학습 기록이 먼저 필요함</b><span>이 기록표에서는 25분 학습 뒤의 5분 눈 휴식을 한 묶음으로 확인합니다.</span>";
                    return;
                }
                restCount += 1;
                waitingForRest = false;
            }
            lab.querySelector("[data-study-count]").textContent = String(studyCount);
            lab.querySelector("[data-rest-count]").textContent = String(restCount);
            wellbeingResult.innerHTML = waitingForRest
                ? "<b>휴식 기록이 부족함</b><span>25분 학습 뒤에는 화면에서 눈을 떼고 먼 곳을 보는 5분 휴식을 기록해 보세요.</span>"
                : "<b>학습·휴식 한 묶음 기록</b><span>시간표와 몸 상태에 맞게 학습과 눈 휴식을 번갈아 배치했습니다.</span>";
        }));
        updateDistance();
    }

    window.COMPUTER_LAB_SETUPS.push(setupEvidenceLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("i02");
})();
