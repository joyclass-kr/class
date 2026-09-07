(function () {
    "use strict";

    /* 음이름 자리: C를 0으로 두고 letter 0~6, octave는 과학적 옥타브 표기(C4 = 가온도). */
    const LETTER_SEMIS = [0, 2, 4, 5, 7, 9, 11];
    const LETTER_NAMES = ["C", "D", "E", "F", "G", "A", "B"];

    function spell(letterAbs, accidental) {
        const octave = Math.floor(letterAbs / 7);
        const letter = letterAbs - octave * 7;
        return {
            letterAbs: letterAbs,
            letter: letter,
            octave: octave,
            accidental: accidental,
            midi: (octave + 1) * 12 + LETTER_SEMIS[letter] + accidental
        };
    }

    /* 자연음(제자리음)으로 적는다. */
    function natural(letterAbs) {
        return spell(letterAbs, 0);
    }

    /* 기준음에서 도수와 반음 수로 다음 음을 적는다. 올림표·내림표는 계산해서 붙인다. */
    function step(from, letterSteps, semis) {
        const targetAbs = from.letterAbs + letterSteps;
        const base = natural(targetAbs);
        return spell(targetAbs, from.midi + semis - base.midi);
    }

    function name(note) {
        const marks = { "-2": "♭♭", "-1": "♭", "0": "", "1": "♯", "2": "＃＃" };
        return LETTER_NAMES[note.letter] + (marks[String(note.accidental)] || "") + note.octave;
    }

    /* 오선 그리기 ------------------------------------------------------ */

    const SVG_NS = "http://www.w3.org/2000/svg";
    const STEP_Y = 5;          /* 한 음자리(줄→칸) 높이 */
    const TOP_LINE_Y = 18;     /* 다섯째 줄 F5 */
    const BOTTOM_LINE_Y = TOP_LINE_Y + STEP_Y * 8;
    const E4_ABS = 4 * 7 + 2;  /* 높은음자리표 첫째 줄 E4 */
    const F5_ABS = 5 * 7 + 3;
    const COLUMN_X = 62;
    const COLUMN_GAP = 36;

    function make(tag, attrs) {
        const node = document.createElementNS(SVG_NS, tag);
        Object.keys(attrs || {}).forEach(key => node.setAttribute(key, attrs[key]));
        return node;
    }

    function yFor(letterAbs) {
        return BOTTOM_LINE_Y - (letterAbs - E4_ABS) * STEP_Y;
    }

    function accidentalNode(accidental, x, y) {
        const group = make("g", { transform: "translate(" + x + "," + y + ")", class: "sheet-ink" });
        if (accidental === 1) {
            group.append(make("line", { x1: -3.2, y1: -7.5, x2: -3.2, y2: 6.5, "stroke-width": 1.5 }));
            group.append(make("line", { x1: 1.6, y1: -8.5, x2: 1.6, y2: 5.5, "stroke-width": 1.5 }));
            group.append(make("line", { x1: -6, y1: -1.6, x2: 4.4, y2: -3.4, "stroke-width": 2.4 }));
            group.append(make("line", { x1: -6, y1: 3.4, x2: 4.4, y2: 1.6, "stroke-width": 2.4 }));
        } else if (accidental === -1) {
            group.append(make("line", { x1: -2.6, y1: -11, x2: -2.6, y2: 5, "stroke-width": 1.5 }));
            group.append(make("path", { d: "M-2.6,-1.6 C 2.4,-4.6 6,-0.4 2.6,2.8 C 1,4.3 -1.2,5 -2.6,5", "stroke-width": 1.5, fill: "none" }));
        } else if (accidental === 2) {
            group.append(make("line", { x1: -4, y1: -4, x2: 4, y2: 4, "stroke-width": 2.2 }));
            group.append(make("line", { x1: -4, y1: 4, x2: 4, y2: -4, "stroke-width": 2.2 }));
        } else if (accidental === -2) {
            [-7.5, -1.5].forEach(offset => {
                group.append(make("line", { x1: offset, y1: -11, x2: offset, y2: 5, "stroke-width": 1.5 }));
                group.append(make("path", { d: "M" + offset + ",-1.6 C " + (offset + 5) + ",-4.6 " + (offset + 8.6) + ",-0.4 " + (offset + 5.2) + ",2.8 C " + (offset + 3.6) + ",4.3 " + (offset + 1.4) + ",5 " + offset + ",5", "stroke-width": 1.5, fill: "none" }));
            });
        }
        return group;
    }

    function accidentalWidth(accidental) {
        if (accidental === 0) return 0;
        if (accidental === -2) return 20;
        return 13;
    }

    function ledgerLines(letterAbs) {
        const lines = [];
        for (let position = E4_ABS - 2; position >= letterAbs; position -= 2) lines.push(position);
        for (let position = F5_ABS + 2; position <= letterAbs; position += 2) lines.push(position);
        return lines;
    }

    /*
     * columns: [{ notes: [spelling, ...] } | null]  — null이면 아직 모르는 음(?)으로 그린다.
     * marks: 열 번호별 색 이름 ("right" | "wrong")
     */
    /*
     * 자리표는 글꼴 글리프로 그리면 컴퓨터에 깔린 글꼴에 따라 크기와 자리가 달라진다.
     * 윈도우 기본 글꼴은 음악 조판용이 아니어서 오선에 맞지 않으므로 직접 그린다.
     * 아래 좌표는 한 칸(줄과 줄 사이)을 10으로 두고, 소용돌이 가운데를 0으로 잡은 것이다.
     */
    const G_LINE_ABS = 4 * 7 + 4;   /* 높은음자리표가 가리키는 G4 */
    const CLEF_PATH = "M-4,26 C1,29 8,27 9,21 C10,13 10,5 9,-2"
        + " C8,-12 9,-24 10,-33 C11,-40 5,-44 1,-40"
        + " C-3,-36 -3,-28 2,-22 C6,-14 15,-10 18,-3"
        + " C22,5 17,13 8,13 C-1,13 -7,6 -6,-1"
        + " C-5,-8 4,-11 9,-5 C13,0 11,6 6,5";

    /* 위아래로 자리표가 먹는 띠 */
    const CLEF_TOP = 3;
    const CLEF_BOTTOM = 79;

    function clefNode(x) {
        const y = yFor(G_LINE_ABS);
        const group = make("g", { class: "sheet-clef", transform: "translate(" + x + "," + y + ")" });
        group.append(make("path", { d: CLEF_PATH }));
        return group;
    }

    /*
     * 온음표는 단순한 동그라미가 아니다. 가운데 구멍이 비스듬히 뚫려 있어서
     * 왼쪽 위와 오른쪽 아래가 두껍고 양 끝이 얇다. 타원 둘을 한 길로 묶고
     * evenodd로 채워 구멍을 낸다.
     */
    function ellipseRing(cx, cy, rx, ry, deg) {
        const rad = deg * Math.PI / 180;
        const dx = rx * Math.cos(rad);
        const dy = rx * Math.sin(rad);
        const from = (cx - dx) + "," + (cy - dy);
        const to = (cx + dx) + "," + (cy + dy);
        return "M" + from + " A" + rx + "," + ry + " " + deg + " 1 1 " + to
            + " A" + rx + "," + ry + " " + deg + " 1 1 " + from + "Z";
    }

    const HEAD_RX = 7.2;
    const HEAD_RY = 4.7;

    function wholeHead(cx, cy) {
        return make("path", {
            class: "sheet-head",
            "fill-rule": "evenodd",
            d: ellipseRing(cx, cy, HEAD_RX, HEAD_RY, -6) + ellipseRing(cx, cy, 4.5, 1.9, 36)
        });
    }

    function render(columns, options) {
        const settings = options || {};
        const zoom = settings.zoom || 1.9;
        const width = COLUMN_X + Math.max(1, columns.length) * COLUMN_GAP + 16;

        /*
         * 위아래 여백을 음표가 닿는 데까지만 남긴다. 임시표는 음표머리보다 위로 더
         * 올라가므로 위쪽을 조금 더 준다. 눈금은 그대로여서 음표 크기는 변하지 않는다.
         */
        let top = CLEF_TOP;
        let bottom = CLEF_BOTTOM;
        columns.forEach(column => {
            if (!column) return;
            column.notes.forEach(note => {
                const y = yFor(note.letterAbs);
                top = Math.min(top, y - 13);
                bottom = Math.max(bottom, y + 8);
            });
        });

        const svg = make("svg", {
            class: "sheet",
            /* 칸 수가 달라도 음표 크기가 같아 보이도록 폭을 눈금으로 못 박는다. */
            style: "width:" + Math.round(width * zoom) + "px",
            viewBox: "0 " + top + " " + width + " " + (bottom - top),
            role: "img",
            "aria-label": settings.label || "악보"
        });

        const staff = make("g", { class: "sheet-staff" });
        for (let line = 0; line < 5; line += 1) {
            const y = TOP_LINE_Y + line * STEP_Y * 2;
            staff.append(make("line", { x1: 10, y1: y, x2: width - 10, y2: y }));
        }
        svg.append(staff);

        svg.append(clefNode(18));

        columns.forEach((column, index) => {
            const x = COLUMN_X + index * COLUMN_GAP;
            if (!column) {
                const unknown = make("text", { class: "sheet-unknown", x: x, y: TOP_LINE_Y + STEP_Y * 4 + 10 });
                unknown.textContent = "?";
                svg.append(unknown);
                return;
            }
            const group = make("g", {
                class: "sheet-ink sheet-column" + (column.mark ? " is-" + column.mark : ""),
                "data-column": index
            });
            const sorted = column.notes.slice().sort((a, b) => a.letterAbs - b.letterAbs);
            const drawnLedgers = new Set();
            let shift = 0;
            sorted.forEach((note, noteIndex) => {
                const y = yFor(note.letterAbs);
                ledgerLines(note.letterAbs).forEach(position => {
                    if (drawnLedgers.has(position)) return;
                    drawnLedgers.add(position);
                    group.append(make("line", { class: "sheet-ledger", x1: x - 11, y1: yFor(position), x2: x + 11, y2: yFor(position) }));
                });
                /* 바로 아래 음과 2도로 붙으면 음표머리를 옆으로 비킨다. */
                const previous = sorted[noteIndex - 1];
                shift = previous && note.letterAbs - previous.letterAbs === 1 && shift === 0 ? 15 : 0;
                group.append(wholeHead(x + shift, y));
                if (note.accidental !== 0) {
                    group.append(accidentalNode(note.accidental, x + shift - accidentalWidth(note.accidental) - 4, y));
                }
            });
            svg.append(group);
        });

        return svg;
    }

    window.Notation = {
        natural: natural,
        spell: spell,
        step: step,
        name: name,
        render: render,
        LETTER_NAMES: LETTER_NAMES,
        LETTER_SEMIS: LETTER_SEMIS
    };
})();
