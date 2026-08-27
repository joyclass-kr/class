(() => {
    "use strict";
    window.COMPUTER_COMPACT_LESSON = (spec) => {
        const categories = spec.nodes.map((node, index) => [`k${index}`, node[0], node[1]]);
        const items = spec.nodes.flatMap((node, index) => node[3].map((label, itemIndex) => [
            `${spec.id}i${index}${itemIndex}`, label[0], label[1], `k${index}`
        ]));
        return window.COMPUTER_LESSON_FACTORY({
            id: spec.id,
            number: spec.number,
            domain: spec.domain,
            title: spec.title,
            english: spec.english,
            concept: spec.concept,
            nodes: spec.nodes.map((node) => node.slice(0, 3)),
            caption: spec.caption,
            example: spec.example,
            steps: spec.steps.map((step, index) => [`${index + 1}`, step]),
            compare: spec.compare,
            comparisons: spec.nodes.map((node) => [node[0], node[1], node[2]]),
            analogy: spec.analogy,
            activity: [spec.activity[0], spec.activity[1], categories, items, spec.activity[2]],
            questions: spec.questions
        });
    };
})();
