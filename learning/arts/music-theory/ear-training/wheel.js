(function () {
    "use strict";

    const SVG_NS = "http://www.w3.org/2000/svg";

    /* 오도권을 시계 방향으로 늘어놓는다. */
    const KEYS = [
        { major: "C", minor: "Am", signature: "0", tonic: 0, letter: 0, acc: 0 },
        { major: "G", minor: "Em", signature: "♯1", tonic: 7, letter: 4, acc: 0 },
        { major: "D", minor: "Bm", signature: "♯2", tonic: 2, letter: 1, acc: 0 },
        { major: "A", minor: "F♯m", signature: "♯3", tonic: 9, letter: 5, acc: 0 },
        { major: "E", minor: "C♯m", signature: "♯4", tonic: 4, letter: 2, acc: 0 },
        { major: "B", minor: "G♯m", signature: "♯5", tonic: 11, letter: 6, acc: 0 },
        {
            major: "F♯", minor: "D♯m", signature: "♯6", tonic: 6, letter: 3, acc: 1,
            alt: "G♭", altMinor: "E♭m", altSignature: "♭6", altLetter: 4, altAcc: -1
        },
        { major: "D♭", minor: "B♭m", signature: "♭5", tonic: 1, letter: 1, acc: -1 },
        { major: "A♭", minor: "Fm", signature: "♭4", tonic: 8, letter: 5, acc: -1 },
        { major: "E♭", minor: "Cm", signature: "♭3", tonic: 3, letter: 2, acc: -1 },
        { major: "B♭", minor: "Gm", signature: "♭2", tonic: 10, letter: 6, acc: -1 },
        { major: "F", minor: "Dm", signature: "♭1", tonic: 5, letter: 3, acc: 0 }
    ];

    /*
     * 으뜸조에서 오도권으로 이어진 일곱 자리가 그 조의 화음이 된다.
     * 반시계 한 자리가 IV, 제자리가 I, 시계로 다섯 자리가 V·ii·vi·iii·vii°.
     */
    const FUNCTIONS = [
        { step: -1, roman: "IV", ko: "버금딸림", quality: "maj", degree: 3 },
        { step: 0, roman: "I", ko: "으뜸", quality: "maj", degree: 0 },
        { step: 1, roman: "V", ko: "딸림", quality: "maj", degree: 4 },
        { step: 2, roman: "ii", ko: "", quality: "min", degree: 1 },
        { step: 3, roman: "vi", ko: "", quality: "min", degree: 5 },
        { step: 4, roman: "iii", ko: "", quality: "min", degree: 2 },
        { step: 5, roman: "vii°", ko: "", quality: "dim", degree: 6 }
    ];

    /*
     * 같은 으뜸음에 조표만 한 자리씩 옮기면 선법이 바뀐다.
     * 시계로 갈수록 밝고(리디아), 반시계로 갈수록 어둡다(로크리아).
     */
    const MODES = [
        { step: 1, name: "Lydian", steps: [0, 2, 4, 6, 7, 9, 11, 12] },
        { step: 0, name: "Ionian", steps: [0, 2, 4, 5, 7, 9, 11, 12] },
        { step: -1, name: "Mixolydian", steps: [0, 2, 4, 5, 7, 9, 10, 12] },
        { step: -2, name: "Dorian", steps: [0, 2, 3, 5, 7, 9, 10, 12] },
        { step: -3, name: "Aeolian", steps: [0, 2, 3, 5, 7, 8, 10, 12] },
        { step: -4, name: "Phrygian", steps: [0, 1, 3, 5, 7, 8, 10, 12] },
        { step: -5, name: "Locrian", steps: [0, 1, 3, 5, 6, 8, 10, 12] }
    ];

    const R_MODE_OUT = 208;
    const R_MODE_IN = 178;
    const R_FUNC_OUT = 178;
    const R_FUNC_IN = 142;
    const R_MAJ_OUT = 142;
    const R_MAJ_IN = 100;
    const R_MIN_OUT = 100;
    const R_MIN_IN = 64;
    const SECTOR = 30;

    function make(tag, attrs, text) {
        const node = document.createElementNS(SVG_NS, tag);
        Object.keys(attrs || {}).forEach(key => node.setAttribute(key, attrs[key]));
        if (text !== undefined) node.textContent = text;
        return node;
    }

    function point(radius, degrees) {
        const radians = (degrees - 90) * Math.PI / 180;
        return [radius * Math.cos(radians), radius * Math.sin(radians)];
    }

    function sectorPath(rIn, rOut, from, to) {
        const [x1, y1] = point(rOut, from);
        const [x2, y2] = point(rOut, to);
        const [x3, y3] = point(rIn, to);
        const [x4, y4] = point(rIn, from);
        return "M" + x1 + "," + y1
            + "A" + rOut + "," + rOut + " 0 0 1 " + x2 + "," + y2
            + "L" + x3 + "," + y3
            + "A" + rIn + "," + rIn + " 0 0 0 " + x4 + "," + y4
            + "Z";
    }

    const SPIN_MS = 480;
    const slowMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function create(container, options) {
        const settings = options || {};
        let index = 0;
        let flat = false;
        let turn = 0;
        let spin = 0;
        let settle = 0;

        const svg = make("svg", {
            class: "wheel",
            viewBox: "-216 -216 432 432",
            role: "group",
            "aria-label": "오도권 원판"
        });

        /* 바깥 고정 고리: 선법 */
        const modeLayer = make("g", { class: "wheel-modes" });
        svg.append(modeLayer);
        MODES.forEach(mode => {
            const center = mode.step * SECTOR;
            const cell = make("path", {
                class: "wheel-mode-cell" + (mode.step === 0 ? " is-home" : ""),
                d: sectorPath(R_MODE_IN, R_MODE_OUT, center - SECTOR / 2, center + SECTOR / 2)
            });
            cell.dataset.mode = mode.name;
            modeLayer.append(cell);
            const [x, y] = point((R_MODE_IN + R_MODE_OUT) / 2, center);
            modeLayer.append(make("text", { class: "wheel-mode-name", x: x, y: y }, mode.name));
        });

        /* 고정 고리: 화음 기능 */
        const funcLayer = make("g", { class: "wheel-func" });
        svg.append(funcLayer);
        FUNCTIONS.forEach(fn => {
            const center = fn.step * SECTOR;
            const cell = make("path", {
                class: "wheel-func-cell is-" + fn.quality,
                d: sectorPath(R_FUNC_IN, R_FUNC_OUT, center - SECTOR / 2, center + SECTOR / 2)
            });
            cell.dataset.degree = String(fn.degree);
            funcLayer.append(cell);

            const [rx, ry] = point((R_FUNC_IN + R_FUNC_OUT) / 2, center);
            funcLayer.append(make("text", { class: "wheel-roman", x: rx, y: ry }, fn.roman));
        });

        /* 도는 원판 */
        const disc = make("g", { class: "wheel-disc" });
        svg.append(disc);
        const majorCells = [];
        const majorTexts = [];
        const signTexts = [];
        const minorTexts = [];

        KEYS.forEach((key, position) => {
            const center = position * SECTOR;
            const major = make("path", {
                class: "wheel-cell wheel-cell-major",
                d: sectorPath(R_MAJ_IN, R_MAJ_OUT, center - SECTOR / 2, center + SECTOR / 2)
            });
            major.dataset.position = String(position);
            disc.append(major);
            majorCells.push(major);

            const minor = make("path", {
                class: "wheel-cell wheel-cell-minor",
                d: sectorPath(R_MIN_IN, R_MIN_OUT, center - SECTOR / 2, center + SECTOR / 2)
            });
            minor.dataset.position = String(position);
            disc.append(minor);

            majorTexts.push(make("text", { class: "wheel-major-name" }));
            signTexts.push(make("text", { class: "wheel-sign" }));
            minorTexts.push(make("text", { class: "wheel-minor-name" }));
        });
        majorTexts.concat(signTexts, minorTexts).forEach(node => disc.append(node));

        /* 가운데 */
        const hub = make("g", { class: "wheel-hub" });
        svg.append(hub);
        hub.append(make("circle", { class: "wheel-hub-face", cx: 0, cy: 0, r: R_MIN_IN }));
        const hubMajor = make("text", { class: "wheel-hub-major", x: 0, y: -10 });
        const hubMinor = make("text", { class: "wheel-hub-minor", x: 0, y: 12 });
        const hubSign = make("text", { class: "wheel-hub-sign", x: 0, y: 32 });
        hub.append(hubMajor, hubMinor, hubSign);

        container.innerHTML = "";
        container.append(svg);

        function keyAt(position) {
            const key = KEYS[((position % 12) + 12) % 12];
            if (!flat || !key.alt) {
                return {
                    major: key.major, minor: key.minor, signature: key.signature,
                    tonic: key.tonic, letter: key.letter, acc: key.acc
                };
            }
            return {
                major: key.alt, minor: key.altMinor, signature: key.altSignature,
                tonic: key.tonic, letter: key.altLetter, acc: key.altAcc
            };
        }

        /* 원판을 돌린 만큼만 다시 그린다. 글자는 되돌려 돌려 늘 바로 세워 둔다. */
        function applyTurn(value) {
            disc.setAttribute("transform", "rotate(" + value + ")");
            const upright = " rotate(" + (-value) + ")";
            KEYS.forEach((key, position) => {
                const center = position * SECTOR;
                const [mx, my] = point((R_MAJ_IN + R_MAJ_OUT) / 2 + 9, center);
                majorTexts[position].setAttribute("transform", "translate(" + mx + "," + my + ")" + upright);
                const [sx, sy] = point((R_MAJ_IN + R_MAJ_OUT) / 2 - 14, center);
                signTexts[position].setAttribute("transform", "translate(" + sx + "," + sy + ")" + upright);
                const [nx, ny] = point((R_MIN_IN + R_MIN_OUT) / 2, center);
                minorTexts[position].setAttribute("transform", "translate(" + nx + "," + ny + ")" + upright);
            });
        }

        /* 글자와 가운데 표시를 다시 적는다. */
        function relabel() {
            KEYS.forEach((key, position) => {
                const shown = keyAt(position);
                majorTexts[position].textContent = shown.major;
                signTexts[position].textContent = shown.signature;
                minorTexts[position].textContent = shown.minor;
                majorCells[position].classList.toggle("is-tonic", position === index);
            });
            const home = keyAt(index);
            hubMajor.textContent = home.major + " 장조";
            hubMinor.textContent = home.minor.replace("m", "") + " 단조";
            hubSign.textContent = home.signature === "0" ? "♯♭ 없음" : "조표 " + home.signature;
            if (settings.onChange) settings.onChange(chords(), home);
        }

        function spinTo(target) {
            window.cancelAnimationFrame(spin);
            window.clearTimeout(settle);
            if (slowMotion || document.visibilityState === "hidden") {
                turn = target;
                applyTurn(turn);
                return;
            }
            /* 다른 탭으로 넘어가 애니메이션이 멈춰도 제자리에 앉도록 한다. */
            settle = window.setTimeout(() => {
                window.cancelAnimationFrame(spin);
                turn = target;
                applyTurn(turn);
            }, SPIN_MS + 120);
            const from = turn;
            const delta = target - from;
            const started = window.performance.now();
            const frame = now => {
                const ratio = Math.min(1, (now - started) / SPIN_MS);
                const eased = 1 - Math.pow(1 - ratio, 3);
                turn = from + delta * eased;
                applyTurn(turn);
                if (ratio < 1) spin = window.requestAnimationFrame(frame);
                else { window.clearTimeout(settle); turn = target; applyTurn(turn); }
            };
            spin = window.requestAnimationFrame(frame);
        }

        /* 반 바퀴가 넘게 돌지 않도록 가까운 쪽으로 돌린다. */
        function nearestAngle(position) {
            let target = -position * SECTOR;
            while (target - turn > 180) target -= 360;
            while (target - turn < -180) target += 360;
            return target;
        }

        function select(position, animate) {
            index = ((position % 12) + 12) % 12;
            relabel();
            const target = nearestAngle(index);
            if (animate === false) { turn = target; applyTurn(turn); }
            else spinTo(target);
        }

        function layout() {
            relabel();
            applyTurn(turn);
        }

        function chords() {
            return FUNCTIONS.slice()
                .sort((a, b) => a.degree - b.degree)
                .map(fn => ({
                    roman: fn.roman,
                    quality: fn.quality,
                    role: fn.ko,
                    degree: fn.degree
                }));
        }

        /* 손으로 잡아 돌리기 */
        let drag = null;
        let spunAt = 0;

        function pointerAngle(event) {
            const box = svg.getBoundingClientRect();
            const dx = event.clientX - (box.left + box.width / 2);
            const dy = event.clientY - (box.top + box.height / 2);
            return Math.atan2(dy, dx) * 180 / Math.PI;
        }

        disc.addEventListener("pointerdown", event => {
            window.cancelAnimationFrame(spin);
            drag = { from: pointerAngle(event), turn: turn, moved: 0 };
            disc.classList.add("is-dragging");
            disc.setPointerCapture(event.pointerId);
        });

        disc.addEventListener("pointermove", event => {
            if (!drag) return;
            let delta = pointerAngle(event) - drag.from;
            while (delta > 180) delta -= 360;
            while (delta < -180) delta += 360;
            drag.moved = Math.max(drag.moved, Math.abs(delta));
            turn = drag.turn + delta;
            applyTurn(turn);
        });

        function endDrag(event) {
            if (!drag) return;
            const spun = drag.moved;
            drag = null;
            disc.classList.remove("is-dragging");
            if (disc.hasPointerCapture(event.pointerId)) disc.releasePointerCapture(event.pointerId);
            const landed = Math.round(-turn / SECTOR);
            index = ((landed % 12) + 12) % 12;
            relabel();
            spinTo(-landed * SECTOR);
            /* 돌리고 손을 뗄 때 따라 나오는 클릭 하나만 걸러 낸다. */
            spunAt = spun > 6 ? window.performance.now() : 0;
        }

        disc.addEventListener("pointerup", endDrag);
        disc.addEventListener("pointercancel", endDrag);

        svg.addEventListener("click", event => {
            if (spunAt && window.performance.now() - spunAt < 300) return;
            const cell = event.target.closest(".wheel-cell");
            if (cell) {
                select(Number(cell.dataset.position));
                return;
            }
            const funcCell = event.target.closest(".wheel-func-cell");
            if (funcCell && settings.onPlayChord) {
                settings.onPlayChord(chords().find(chord => chord.degree === Number(funcCell.dataset.degree)));
                return;
            }
            const modeCell = event.target.closest(".wheel-mode-cell");
            if (modeCell && settings.onPlayMode) {
                const mode = MODES.find(entry => entry.name === modeCell.dataset.mode);
                settings.onPlayMode(mode, keyAt(index));
            }
        });

        layout();

        return {
            step: function (delta) {
                select(index + delta);
            },
            toggleFlat: function () {
                flat = !flat;
                layout();
                return flat;
            },
            chords: chords,
            home: function () { return keyAt(index); }
        };
    }

    window.Wheel = { create: create, KEYS: KEYS, FUNCTIONS: FUNCTIONS, MODES: MODES };
})();
