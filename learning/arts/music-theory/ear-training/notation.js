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
    const ZOOM = 1.15;
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

    /*
     * 임시표는 유니코드 올림표·내림표 글리프를 재서 앉힌다. 겹올림표는 어느 글꼴에서나
     * 나오지 않는 글리프여서 X 모양을 그대로 그린다.
     */
    function accidentalNode(accidental, right, y) {
        const group = make("g", { class: "sheet-ink" });
        if (accidental === 2) {
            const cross = make("g", { transform: "translate(" + (right - 5) + "," + y + ")" });
            cross.append(make("line", { x1: -4, y1: -4, x2: 4, y2: 4, "stroke-width": 2.2 }));
            cross.append(make("line", { x1: -4, y1: 4, x2: 4, y2: -4, "stroke-width": 2.2 }));
            group.append(cross);
            return group;
        }
        const sharp = accidental > 0;
        const char = sharp ? SHARP_GLYPH : FLAT_GLYPH;
        const box = glyphBox(char, 0.2, 0.95);
        if (!box) return group;
        const height = sharp ? SHARP_H : FLAT_H;
        const step = box.width * (height / box.height) + 1;
        const times = Math.abs(accidental);
        for (let mark = 0; mark < times; mark += 1) {
            /* 내림표는 배가 아래쪽에 있어 가운데를 조금 올려 잡는다. */
            group.append(glyphNode(char, box, right - mark * step, y - (sharp ? 0 : STEP_Y * 0.7), height));
        }
        return group;
    }

    function ledgerLines(letterAbs) {
        const lines = [];
        for (let position = E4_ABS - 2; position >= letterAbs; position -= 2) lines.push(position);
        for (let position = F5_ABS + 2; position <= letterAbs; position += 2) lines.push(position);
        return lines;
    }

    /*
     * 조표만 그린 작은 악보. 임시표가 어느 줄과 칸에 붙는지가 조표의 뜻이므로
     * 오선과 자리표를 함께 두고, 대신 임시표를 촘촘히 붙여 자리를 아낀다.
     * 되돌려 주는 width는 오선 눈금으로 잰 길이다.
     */
    const SIG_START = 40;
    const SIG_STEP = 7.5;

    function keySignatureGroup(count, sharp) {
        const seats = sharp ? SHARP_SEATS : FLAT_SEATS;
        const width = SIG_START + Math.max(count, 1) * SIG_STEP + 5;
        const group = make("g", {});

        const staff = make("g", { class: "sheet-staff" });
        for (let line = 0; line < 5; line += 1) {
            const y = TOP_LINE_Y + line * STEP_Y * 2;
            staff.append(make("line", { x1: 3, y1: y, x2: width, y2: y }));
        }
        group.append(staff);

        const clef = clefNode(6);
        if (clef) group.append(clef);

        const ink = make("g", { class: "sheet-ink" });
        for (let mark = 0; mark < count; mark += 1) {
            ink.append(accidentalNode(sharp ? 1 : -1, SIG_START + (mark + 1) * SIG_STEP, yFor(seats[mark])));
        }
        group.append(ink);

        return { node: group, width: width, top: CLEF_TOP, bottom: CLEF_BOTTOM };
    }

    /*
     * columns: [{ notes: [spelling, ...] } | null]  — null이면 아직 모르는 음(?)으로 그린다.
     * marks: 열 번호별 색 이름 ("right" | "wrong")
     */
    /*
     * 자리표는 유니코드 음악 기호(U+1D11E)를 쓴다. 다만 글꼴마다 글리프가 차지하는
     * 자리와 크기가 달라서 그냥 찍으면 오선에 맞지 않는다. 그래서 한 번 재 두고,
     * 잰 테두리를 "위 줄 한 칸 위에서 아래 줄 두 칸 아래까지"에 맞춰 앉힌다.
     * 자리표의 생김새는 어느 글꼴이나 같은 규격이므로, 이 띠에 맞추면 소용돌이가
     * 저절로 G선에 온다.
     */
    const CLEF_GLYPH = "\uD834\uDD1E";
    const SHARP_GLYPH = "\u266F";
    const FLAT_GLYPH = "\u266D";
    const CLEF_TOP = TOP_LINE_Y - STEP_Y * 2;        /* 위 줄에서 한 칸 위 */
    const CLEF_BOTTOM = BOTTOM_LINE_Y + STEP_Y * 4;  /* 아래 줄에서 두 칸 아래 */
    const PROBE_SIZE = 100;

    const boxCache = {};

    /*
     * 글리프 테두리를 한 번만 재서 기억해 둔다. ratio는 그 글리프가 가질 만한
     * 가로/세로 비율의 범위다. 글꼴에 글리프가 없으면 네모(.notdef)가 나오는데,
     * 비율이 어긋나므로 여기서 걸러 낸다.
     */
    function glyphBox(char, low, high) {
        if (boxCache[char] !== undefined) return boxCache[char];
        boxCache[char] = null;
        const probe = make("svg", {
            width: 1, height: 1,
            style: "position:absolute;left:-9999px;top:0;overflow:visible"
        });
        const text = make("text", { class: "sheet-glyph", x: 0, y: 0, "font-size": PROBE_SIZE });
        text.textContent = char;
        probe.append(text);
        document.body.append(probe);
        let box = null;
        try { box = text.getBBox(); } catch (error) { box = null; }
        probe.remove();
        if (box && box.height > 0 && box.width > 0) {
            const ratio = box.width / box.height;
            if (ratio > low && ratio < high) boxCache[char] = box;
        }
        return boxCache[char];
    }

    /*
     * 글리프를 오선 좌표에 앉힌다. right는 글리프의 오른쪽 끝, middle은 가운데 높이,
     * height는 글리프 테두리의 높이다.
     */
    function glyphNode(char, box, right, middle, height) {
        const scale = height / box.height;
        const node = make("text", {
            class: "sheet-glyph",
            x: 0, y: 0,
            "font-size": PROBE_SIZE * scale,
            transform: "translate(" + (right - (box.x + box.width) * scale) + ","
                + (middle - (box.y + box.height / 2) * scale) + ")"
        });
        node.textContent = char;
        return node;
    }

    function clefNode(x) {
        const box = glyphBox(CLEF_GLYPH, 0.2, 0.62);
        if (!box) return null;
        const scale = (CLEF_BOTTOM - CLEF_TOP) / box.height;
        const node = make("text", {
            class: "sheet-clef",
            x: 0, y: 0,
            "font-size": PROBE_SIZE * scale,
            transform: "translate(" + (x - box.x * scale) + "," + (CLEF_TOP - box.y * scale) + ")"
        });
        node.textContent = CLEF_GLYPH;
        return node;
    }

    /* 올림표는 두 칸, 내림표는 두 칸 반을 차지한다. */
    const SHARP_H = STEP_Y * 4;
    const FLAT_H = STEP_Y * 5;

    /* 높은음자리표에서 조표가 붙는 자리. 붙는 차례대로 적은 음자리 번호다. */
    const SHARP_SEATS = [38, 35, 39, 36, 33, 37, 34];
    const FLAT_SEATS = [34, 37, 33, 36, 32, 35, 31];

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
        /* 악보는 어느 화면에서나 같은 크기여야 하므로 눈금 배율을 하나로 못 박는다. */
        const zoom = settings.zoom || ZOOM;
        /* 칸 수가 적어도 오선 길이는 같게 둔다. 짧은 오선이 넓은 자리에 떠 보이지 않게. */
        const width = Math.max(
            settings.minWidth || 0,
            COLUMN_X + Math.max(1, columns.length) * COLUMN_GAP + 16
        );

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

        const clef = clefNode(14);
        if (clef) svg.append(clef);

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
                    group.append(accidentalNode(note.accidental, x + shift - HEAD_RX - 3, y));
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
        keySignatureGroup: keySignatureGroup,
        LETTER_NAMES: LETTER_NAMES,
        LETTER_SEMIS: LETTER_SEMIS
    };
})();
