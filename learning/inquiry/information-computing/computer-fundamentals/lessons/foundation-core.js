(() => {
    "use strict";

    const modules = [
        ["A", "컴퓨터의 기본 원리", "Computer Principles"],
        ["B", "하드웨어와 기기", "Hardware and Devices"],
        ["C", "운영체제와 앱", "Operating Systems and Apps"],
        ["D", "포인터·터치·키보드", "Pointer, Touch, and Keyboard"],
        ["E", "파일과 저장 공간", "Files and Storage"],
        ["F", "화면과 디지털 미디어", "Displays and Digital Media"],
        ["G", "0과 1·데이터 크기", "Binary and Data Size"],
        ["H", "네트워크와 웹", "Networks and the Web"],
        ["I", "계정·보안·디지털 시민성", "Accounts, Security, and Digital Citizenship"],
        ["J", "알고리즘과 코딩 논리", "Algorithms and Coding Logic"]
    ].map(([code, title, english]) => ({ code, title, english }));

    const imageAsset = (name) => {
        const courseRoot = typeof document !== "undefined" && document.body?.dataset.courseRoot === "true";
        return `${courseRoot ? "assets" : "../assets"}/images/${name}`;
    };

    const relationshipVisual = (nodes, caption) => `
        <figure class="concept-relationship-figure">
            <div class="concept-relationship-board" style="--node-count:${nodes.length}">
                ${nodes.map((node, index) => `
                    <article>
                        <span class="relationship-index">${index + 1}</span>
                        <strong>${node[0]} <small>${node[1]}</small></strong>
                        <p>${node[2]}</p>
                        ${node[3]?.length ? `<ul class="concept-example-list">${node[3].map((example) => `<li><b>${example[0]}</b><small>${example[1]}</small></li>`).join("")}</ul>` : ""}
                    </article>
                `).join("")}
            </div>
            <figcaption>${caption}</figcaption>
        </figure>`;

    const normalizeStep = (step, index) => {
        if (Array.isArray(step) && step.length >= 3) return step;
        if (Array.isArray(step) && step.length === 2) {
            const numbered = /^\d+$/.test(String(step[0]));
            return [numbered ? `${index + 1}단계` : step[0], `Step ${index + 1}`, step[1]];
        }
        return [`${index + 1}단계`, `Step ${index + 1}`, String(step)];
    };

    const makeLesson = (spec) => ({
        id: spec.id,
        code: spec.id.toUpperCase(),
        number: spec.number,
        domain: spec.domain,
        title: spec.title,
        english: spec.english,
        conceptTitle: spec.concept,
        visual: relationshipVisual(spec.nodes, spec.caption),
        details: spec.details || spec.nodes.map((node) => [node[0], node[1], node[2]]),
        deviceComparison: spec.deviceComparison,
        workedExample: {
            title: spec.example[0],
            english: spec.example[1],
            intro: spec.example[2],
            steps: spec.steps.map(normalizeStep)
        },
        comparisons: {
            title: spec.compare[0],
            english: spec.compare[1],
            cards: spec.comparisons
        },
        analogy: {
            title: spec.analogy[0],
            english: spec.analogy[1],
            text: spec.analogy[2],
            limit: spec.analogy[3],
            teachback: spec.analogy[4]
        },
        activity: {
            type: "sort",
            title: spec.activity[0],
            instruction: spec.activity[1],
            categories: spec.activity[2].map((entry) => ({ id: entry[0], label: entry[1], english: entry[2] })),
            items: spec.activity[3].map((entry) => ({ id: entry[0], label: entry[1], english: entry[2], category: entry[3] })),
            success: spec.activity[4]
        },
        questions: spec.questions.map((entry) => ({
            text: entry[0],
            options: entry[1],
            answer: entry[2],
            concept: entry[3],
            explanation: entry[4]
        }))
    });

    window.COMPUTER_CORE_MODULES = modules;
    window.COMPUTER_IMAGE_ASSET = imageAsset;
    window.COMPUTER_LESSON_FACTORY = makeLesson;
    window.COMPUTER_FOUNDATION_LESSONS = [];
})();
