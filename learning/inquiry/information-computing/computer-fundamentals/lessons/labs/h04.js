(() => {
    "use strict";

    // 나머지 28개 그림 코드는 concept-labs가 모두 덮어써서 쓰이지 않았다. h04만 남긴다.

    const figure = (spec, className, body) => `
        <figure class="lesson-specific-figure visual-${spec.id} ${className}" aria-label="${spec.concept}">
            <div class="lesson-specific-board">${body}</div>
            <figcaption>${spec.caption}</figcaption>
        </figure>
    `;

    const object = (title, english, detail = "", className = "") => `
        <div class="visual-object ${className}">
            <strong>${title}<small>${english}</small></strong>
            ${detail ? `<span>${detail}</span>` : ""}
        </div>
    `;

    const flow = (steps, className = "") => `
        <div class="concept-sequence" data-concept-sequence>
            <ol class="visual-process ${className}">
                ${steps.map((step, index) => `
                    <li data-sequence-step tabindex="0" role="button" aria-pressed="false">
                        <span class="visual-step-number">${index + 1}</span>
                        <strong>${step[0]}<small>${step[1]}</small></strong>
                        ${step[2] ? `<p>${step[2]}</p>` : ""}
                    </li>
                `).join("")}
            </ol>
            <div class="sequence-controller">
                <p data-sequence-status aria-live="polite"></p>
                <button type="button" data-sequence-next>다음 단계 <small>Next Step</small></button>
            </div>
        </div>
    `;

    window.COMPUTER_LAB_RENDERERS.h04 = (spec, asset) => figure(spec, "visual-full-stack", `
            <section class="stack-transaction-lab" data-stack-lab data-stage="0" aria-label="온라인 문제에서 답을 제출한 뒤 점수가 돌아오는 실제 데이터 상태">
                <section class="stack-boundary device-boundary">
                    <h3>학생의 기기 <small>Student Device</small></h3>
                    <div class="stack-node frontend-node" data-stack-node="1,6">
                        <strong>문제 화면 <small>Frontend</small></strong>
                        <p>2 + 1은?</p>
                        <div class="stack-answer-choices" role="group" aria-label="제출할 답 선택">
                            <button type="button" data-stack-answer="2" aria-pressed="false">2</button>
                            <button type="button" data-stack-answer="3" aria-pressed="false">3</button>
                            <button type="button" data-stack-answer="4" aria-pressed="false">4</button>
                        </div>
                        <output class="frontend-score" data-stack-screen-score>아직 점수 없음</output>
                    </div>
                </section>
                <section class="stack-api-lane" aria-label="정해진 요청과 응답의 이동 통로">
                    <div class="stack-packet request-direction" data-stack-node="2">
                        <span>답 요청 봉투 <small>Request Data</small></span>
                        <b>POST /answers</b>
                        <code data-stack-request>{ answer: — }</code>
                    </div>
                    <div class="api-contract" data-stack-node="2,5"><b>API</b><span>주소·방법·데이터 이름·결과 모양의 약속</span></div>
                    <div class="stack-packet response-direction" data-stack-node="5">
                        <span>채점 결과 봉투 <small>Response Data</small></span>
                        <b>200 OK</b>
                        <code data-stack-response>{ score: — }</code>
                    </div>
                </section>
                <section class="stack-boundary server-boundary">
                    <h3>수업 서버 <small>Lesson Server</small></h3>
                    <div class="stack-node backend-node" data-stack-node="3">
                        <strong>채점 규칙 <small>Backend</small></strong>
                        <p>받은 답과 정답을 비교</p>
                        <code data-stack-comparison>— = 3 ?</code>
                        <output data-stack-verdict>처리 전</output>
                    </div>
                    <div class="database-exchange" data-stack-node="4"><span>정답 읽기 ↓</span><span>점수 쓰기 ↑</span></div>
                    <div class="stack-database" data-stack-node="4">
                        <strong>점수표 <small>Database</small></strong>
                        <table><thead><tr><th>학생</th><th>정답</th><th>점수</th></tr></thead><tbody><tr><td>학생 17</td><td>3</td><td data-stack-db-score>4</td></tr></tbody></table>
                    </div>
                </section>
                <div class="stack-state-evidence" aria-live="polite">
                    <span><b>고른 답</b><small>Selected Answer</small><em data-stack-selected>선택 전</em></span>
                    <span><b>서버 계산</b><small>Backend Result</small><em data-stack-result>처리 전</em></span>
                    <span><b>저장된 점수</b><small>Stored Score</small><em data-stack-stored>4점</em></span>
                    <span><b>화면 점수</b><small>Displayed Score</small><em data-stack-displayed>표시 전</em></span>
                </div>
                <div class="stack-lab-controller">
                    <button type="button" data-stack-start disabled>답 제출 <small>Submit Answer</small></button>
                    <p data-stack-status aria-live="polite">먼저 문제 화면에서 답 하나를 고르세요. 답은 아직 학생 기기 안에만 있습니다.</p>
                    <button type="button" data-stack-next disabled>다음 단계 <small>Next Step</small></button>
                </div>
            </section>
        `);
})();
