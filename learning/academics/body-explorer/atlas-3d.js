(() => {
    "use strict";

    const map = document.getElementById("anatomyMap");
    const layer = map?.querySelector(".anatomy-layer");
    if (!map || !layer) return;

    const bodySvg = layer.querySelector("svg.body-model");
    const viewBoxByFocus = {
        body: "0 0 360 560",
        heart: "9 21 322 455",
        lung: "19 21 322 471"
    };

    const viewButtons = [...map.querySelectorAll("[data-atlas-view]")];
    const layerButtons = [...map.querySelectorAll("[data-atlas-layer]")];
    const cameraButtons = [...map.querySelectorAll("[data-atlas-camera]")];
    const hint = map.querySelector(".atlas-3d-hint");
    const feedback = document.getElementById("explorerFeedback");
    const feedbackTitle = document.getElementById("explorerFeedbackTitle");
    const feedbackText = document.getElementById("explorerFeedbackText");
    const state = { rotateX: -2, rotateY: 0, zoom: 1, dragging: false, moved: false, startX: 0, startY: 0, originX: 0, originY: 0 };
    const focusScale = { body: 1.03, heart: 1.02, lung: 1.03 };
    const anatomyNotes = {
        "body-return": { title: "대정맥 · VENA CAVA", text: "온몸을 돌고 산소가 적어진 혈액을 심장의 우심방으로 되돌려 보내는 가장 큰 정맥입니다." },
        "right-atrium": { title: "우심방 · RIGHT ATRIUM", text: "대정맥에서 돌아온 혈액을 가장 먼저 받아 우심실 쪽으로 보내는 심장의 방입니다." },
        "right-ventricle": { title: "우심실 · RIGHT VENTRICLE", text: "우심방에서 받은 산소가 적은 혈액을 폐동맥으로 밀어내 폐로 보냅니다." },
        tricuspid: { title: "삼첨판 · TRICUSPID VALVE", text: "우심방과 우심실 사이에서 열리고 닫히며 혈액이 뒤로 흐르는 것을 막습니다." },
        "pulmonary-artery": { title: "폐동맥 · PULMONARY ARTERY", text: "우심실에서 나온 산소가 적은 혈액을 폐로 운반합니다. 동맥이지만 산소가 적은 혈액이 흐릅니다." },
        alveoli: { title: "폐포 · ALVEOLI", text: "포도송이처럼 모인 작은 공기주머니입니다. 산소는 혈액으로, 이산화탄소는 폐포 안으로 이동합니다." },
        "pulmonary-vein": { title: "폐정맥 · PULMONARY VEIN", text: "폐에서 산소를 얻은 혈액을 좌심방으로 운반합니다. 정맥이지만 산소가 풍부한 혈액이 흐릅니다." },
        "left-atrium": { title: "좌심방 · LEFT ATRIUM", text: "폐정맥을 통해 돌아온 산소가 풍부한 혈액을 받아 좌심실로 보냅니다." },
        mitral: { title: "이첨판 · MITRAL VALVE", text: "좌심방과 좌심실 사이의 판막으로, 강하게 수축할 때도 혈액의 역류를 막습니다." },
        "left-ventricle": { title: "좌심실 · LEFT VENTRICLE", text: "두꺼운 근육으로 강하게 수축해 산소가 풍부한 혈액을 대동맥과 온몸으로 밀어냅니다." },
        aorta: { title: "대동맥 · AORTA", text: "좌심실에서 나온 혈액이 온몸으로 퍼져 나갈 때 가장 먼저 지나는 우리 몸의 가장 큰 동맥입니다." },
        "tissue-exchange": { title: "모세혈관 · CAPILLARY BED", text: "가느다란 벽을 사이에 두고 세포에 산소와 영양소를 주며 이산화탄소와 노폐물을 받아옵니다." }
    };
    const inspectableStructures = {
        "body-return": [".atlas-view-body .vena-cava-path", ".atlas-view-heart .heart-vena", ".atlas-view-heart .diagram-labels text"],
        "right-atrium": [".right-atrium-chamber"],
        "right-ventricle": [".right-ventricle-chamber"],
        tricuspid: [".tricuspid-valve", ".callout-valve"],
        "pulmonary-artery": [".heart-pulmonary-artery", ".lung-artery-large"],
        alveoli: [".alveoli-cluster"],
        "pulmonary-vein": [".heart-pulmonary-vein", ".lung-vein-large"],
        "left-atrium": [".left-atrium-chamber"],
        mitral: [".mitral-valve"],
        "left-ventricle": [".left-ventricle-chamber"],
        aorta: [".atlas-view-body .aorta-path", ".heart-aorta"],
        "tissue-exchange": [".tissue-capillary-path", ".capillary-beds"]
    };
    const inspectableElements = [];
    const registeredStructures = new Set();

    Object.entries(inspectableStructures).forEach(([target, selectors]) => {
        selectors.forEach((selector) => {
            layer.querySelectorAll(selector).forEach((element) => {
                if (registeredStructures.has(element)) return;
                registeredStructures.add(element);
                element.dataset.inspectTarget = target;
                element.setAttribute("tabindex", "0");
                element.setAttribute("role", "button");
                element.setAttribute("aria-label", `${anatomyNotes[target].title} 설명 보기`);
                inspectableElements.push(element);
            });
        });
    });
    map.dataset.layerSkin = "true";
    map.dataset.layerOrgans = "true";
    map.dataset.layerVessels = "true";
    map.classList.add("atlas-3d-ready");

    function applyCamera() {
        const focus = map.dataset.focus || "body";
        const scale = (focusScale[focus] || 1) * state.zoom;
        layer.style.setProperty("--atlas-rotate-x", `${state.rotateX}deg`);
        layer.style.setProperty("--atlas-rotate-y", `${state.rotateY}deg`);
        layer.style.setProperty("--atlas-scale", scale.toFixed(3));
        map.style.setProperty("--atlas-light-x", `${50 + state.rotateY * .9}%`);
        map.style.setProperty("--atlas-shadow-x", `${state.rotateY * -.45}px`);
        map.dataset.cameraMoved = String(Math.abs(state.rotateY) > 2 || Math.abs(state.rotateX + 2) > 2 || Math.abs(state.zoom - 1) > .02);
    }

    function syncViewButtons() {
        const focus = map.dataset.focus || "body";
        viewButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.atlasView === focus)));
        bodySvg?.setAttribute("viewBox", viewBoxByFocus[focus] || viewBoxByFocus.body);
        applyCamera();
    }

    function showExploreOverview() {
        if (!feedbackTitle || !feedbackText) return;
        const focus = map.dataset.focus || "body";
        const overview = {
            body: ["전신 순환계 기관 관찰", "피부와 혈관 레이어를 분리하고 대정맥·대동맥·모세혈관을 눌러 기능을 확인하세요."],
            heart: ["심장 내부 기관 관찰", "네 개의 방과 판막, 심장에 연결된 큰 혈관을 눌러 혈액이 한 방향으로 흐르는 원리를 살펴보세요."],
            lung: ["폐와 기체교환 관찰", "폐동맥·폐포·폐정맥을 눌러 산소와 이산화탄소가 이동하는 방향을 비교하세요."]
        }[focus];
        feedback.dataset.state = "explore";
        feedbackTitle.textContent = overview[0];
        feedbackText.textContent = overview[1];
    }

    function announce(message) {
        const announcer = document.getElementById("announcer");
        if (announcer) announcer.textContent = message;
    }

    function inspectStructure(target) {
        const note = anatomyNotes[target];
        if (!note || !feedbackTitle || !feedbackText || !feedback) return;
        map.querySelectorAll(".anatomy-hotspot").forEach((button) => {
            button.classList.toggle("is-inspected", button.dataset.target === target);
        });
        inspectableElements.forEach((element) => {
            element.classList.toggle("is-inspected", element.dataset.inspectTarget === target);
        });
        feedback.dataset.state = "explore";
        feedbackTitle.textContent = note.title;
        feedbackText.textContent = note.text;
        announce(note.title + ". " + note.text);
    }

    function resetCamera(announceChange = true) {
        state.rotateX = -2;
        state.rotateY = 0;
        state.zoom = 1;
        applyCamera();
        if (announceChange) announce("3D 해부 보기의 회전과 확대를 초기화했습니다.");
    }

    viewButtons.forEach((button) => {
        button.addEventListener("click", () => {
            map.dataset.focus = button.dataset.atlasView;
            syncViewButtons();
            showExploreOverview();
            announce(`${button.textContent.trim()} 해부 보기로 전환했습니다.`);
        });
    });

    layerButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const layerName = button.dataset.atlasLayer;
            const key = `layer${layerName[0].toUpperCase()}${layerName.slice(1)}`;
            const next = map.dataset[key] !== "false" ? "false" : "true";
            map.dataset[key] = next;
            button.setAttribute("aria-pressed", next);
            announce(`${button.textContent.trim()} 레이어를 ${next === "true" ? "표시" : "숨김"}했습니다.`);
        });
    });

    cameraButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const action = button.dataset.atlasCamera;
            if (action === "reset") {
                resetCamera();
                return;
            }
            state.zoom = Math.max(.82, Math.min(1.28, state.zoom + (action === "zoom-in" ? .08 : -.08)));
            applyCamera();
            announce(`해부 보기를 ${action === "zoom-in" ? "확대" : "축소"}했습니다.`);
        });
    });

    map.addEventListener("pointerdown", (event) => {
        if (event.target.closest("button, [data-inspect-target]")) {
            state.moved = false;
            return;
        }
        state.dragging = true;
        state.moved = false;
        state.startX = event.clientX;
        state.startY = event.clientY;
        state.originX = state.rotateX;
        state.originY = state.rotateY;
        map.classList.add("is-rotating");
        map.setPointerCapture?.(event.pointerId);
    });

    map.addEventListener("pointermove", (event) => {
        if (!state.dragging) return;
        const deltaX = event.clientX - state.startX;
        const deltaY = event.clientY - state.startY;
        if (Math.abs(deltaX) + Math.abs(deltaY) > 5) state.moved = true;
        state.rotateY = Math.max(-28, Math.min(28, state.originY + deltaX * .16));
        state.rotateX = Math.max(-14, Math.min(12, state.originX - deltaY * .12));
        applyCamera();
        if (state.moved) hint?.classList.add("is-used");
    });

    function stopRotation(event) {
        if (!state.dragging) return;
        state.dragging = false;
        map.classList.remove("is-rotating");
        map.releasePointerCapture?.(event.pointerId);
    }

    map.addEventListener("pointerup", stopRotation);
    map.addEventListener("pointercancel", stopRotation);

    map.addEventListener("click", (event) => {
        const source = event.target.closest("[data-inspect-target], .anatomy-hotspot");
        if (!source || state.moved) return;
        inspectStructure(source.dataset.inspectTarget || source.dataset.target);
    });

    map.addEventListener("keydown", (event) => {
        const source = event.target.closest("[data-inspect-target]");
        if (!source || (event.key !== "Enter" && event.key !== " ")) return;
        event.preventDefault();
        inspectStructure(source.dataset.inspectTarget);
    });

    map.addEventListener("wheel", (event) => {
        if (!event.ctrlKey && !event.metaKey) return;
        event.preventDefault();
        state.zoom = Math.max(.82, Math.min(1.28, state.zoom + (event.deltaY < 0 ? .05 : -.05)));
        applyCamera();
    }, { passive: false });

    new MutationObserver(syncViewButtons).observe(map, { attributes: true, attributeFilter: ["data-focus"] });
    syncViewButtons();
})();
