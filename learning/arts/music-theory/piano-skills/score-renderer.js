(function () {
    "use strict";

    const NS = "http://www.w3.org/2000/svg";
    const SHARP_NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
    const FLAT_NAMES = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
    const LETTER_INDEX = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 };
    const PAGE_SIZE = { scale: 8, voicing: 4 };

    function svgElement(name, attributes, text) {
        const node = document.createElementNS(NS, name);
        Object.entries(attributes || {}).forEach(([key, value]) => node.setAttribute(key, String(value)));
        if (text !== undefined) node.textContent = text;
        return node;
    }

    function append(parent, name, attributes, text) {
        const node = svgElement(name, attributes, text);
        parent.appendChild(node);
        return node;
    }

    function noteParts(midi, key) {
        const names = key?.spelling === "flat" ? FLAT_NAMES : SHARP_NAMES;
        const name = names[((midi % 12) + 12) % 12];
        return {
            name,
            letter: name[0],
            accidental: name.slice(1),
            octave: Math.floor(midi / 12) - 1
        };
    }

    function staffY(midi, clef, staffTop, spacing, key) {
        const part = noteParts(midi, key);
        const value = part.octave * 7 + LETTER_INDEX[part.letter];
        const bottomLine = clef === "treble" ? 4 * 7 + LETTER_INDEX.E : 2 * 7 + LETTER_INDEX.G;
        return staffTop + spacing * 4 - (value - bottomLine) * spacing / 2;
    }

    function drawStaff(group, top, x1, x2, spacing) {
        for (let line = 0; line < 5; line += 1) {
            append(group, "line", {
                x1, y1: top + line * spacing, x2, y2: top + line * spacing,
                stroke: "#3c4744", "stroke-width": 1.35
            });
        }
    }

    function drawLedgerLines(group, x, y, staffTop, spacing) {
        const staffBottom = staffTop + spacing * 4;
        if (y < staffTop - spacing / 2) {
            for (let lineY = staffTop - spacing; lineY >= y - 2; lineY -= spacing) {
                append(group, "line", { x1: x - 12, y1: lineY, x2: x + 12, y2: lineY, stroke: "#27312f", "stroke-width": 1.25 });
            }
        }
        if (y > staffBottom + spacing / 2) {
            for (let lineY = staffBottom + spacing; lineY <= y + 2; lineY += spacing) {
                append(group, "line", { x1: x - 12, y1: lineY, x2: x + 12, y2: lineY, stroke: "#27312f", "stroke-width": 1.25 });
            }
        }
    }

    function noteColor(status) {
        if (status === "current") return "#d58b21";
        if (status === "done") return "#2b8568";
        return "#17201e";
    }

    function drawNote(group, options) {
        const { x, y, midi, key, clef, staffTop, spacing, status, whole, stemUp } = options;
        const part = noteParts(midi, key);
        drawLedgerLines(group, x, y, staffTop, spacing);
        if (part.accidental) {
            append(group, "text", {
                x: x - 18, y: y + 5, fill: noteColor(status),
                "font-family": "Georgia, 'Times New Roman', serif", "font-size": 19,
                "font-weight": 700, "text-anchor": "middle"
            }, part.accidental);
        }
        append(group, "ellipse", {
            cx: x, cy: y, rx: 8.5, ry: 5.6,
            fill: whole ? "#f7f5ef" : noteColor(status),
            stroke: noteColor(status), "stroke-width": whole ? 2.3 : 1.2,
            transform: "rotate(-14 " + x + " " + y + ")"
        });
        if (!whole) {
            const up = stemUp !== false;
            append(group, "line", {
                x1: up ? x + 8 : x - 8, y1: y,
                x2: up ? x + 8 : x - 8, y2: up ? y - 34 : y + 34,
                stroke: noteColor(status), "stroke-width": 1.7
            });
        }
    }

    function drawClef(group, clef, x, staffTop) {
        append(group, "text", {
            x, y: staffTop + (clef === "treble" ? 54 : 47),
            fill: "#17201e", "font-family": "'Noto Music', 'Bravura Text', 'Times New Roman', serif",
            "font-size": clef === "treble" ? 70 : 58, "text-anchor": "middle"
        }, clef === "treble" ? "𝄞" : "𝄢");
    }

    function drawPageMarkers(group, start, end, total, width, y) {
        append(group, "text", {
            x: width - 24, y, fill: "#66736f", "font-size": 12,
            "font-family": "Inter, sans-serif", "text-anchor": "end"
        }, (start + 1) + "–" + end + " / " + total);
    }

    function statusFor(index, currentIndex) {
        if (index < currentIndex) return "done";
        if (index === currentIndex) return "current";
        return "upcoming";
    }

    function renderScale(svg, exercise, key, page, currentIndex) {
        const width = 920;
        const height = 232;
        const staffTop = 83;
        const spacing = 14;
        const pageSize = PAGE_SIZE.scale;
        const start = page * pageSize;
        const items = exercise.groups.slice(start, start + pageSize);
        const rightHand = exercise.hand !== "left";
        const clef = rightHand ? "treble" : "bass";
        const group = append(svg, "g");
        svg.setAttribute("viewBox", "0 0 " + width + " " + height);
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

        append(group, "text", { x: 24, y: 28, fill: "#46534f", "font-size": 13, "font-family": "Inter, sans-serif", "font-weight": 750 },
            rightHand ? "오른손 · 손가락 번호는 음표 위" : "왼손 · 손가락 번호는 음표 아래");
        drawStaff(group, staffTop, 45, width - 20, spacing);
        drawClef(group, clef, 73, staffTop);
        append(group, "line", { x1: 45, y1: staffTop, x2: 45, y2: staffTop + spacing * 4, stroke: "#27312f", "stroke-width": 1.4 });
        append(group, "line", { x1: width - 20, y1: staffTop, x2: width - 20, y2: staffTop + spacing * 4, stroke: "#27312f", "stroke-width": 2.2 });

        const usableStart = 132;
        const usableEnd = width - 55;
        const step = items.length > 1 ? (usableEnd - usableStart) / (items.length - 1) : 0;
        items.forEach((item, localIndex) => {
            const globalIndex = start + localIndex;
            const status = statusFor(globalIndex, currentIndex);
            const x = items.length === 1 ? (usableStart + usableEnd) / 2 : usableStart + localIndex * step;
            const y = staffY(item.notes[0], clef, staffTop, spacing, key);
            if (status === "current") {
                append(group, "rect", { x: x - 31, y: 46, width: 62, height: 125, rx: 10, fill: "#fff0cf", "fill-opacity": .72 });
            }
            drawNote(group, { x, y, midi: item.notes[0], key, clef, staffTop, spacing, status, whole: false, stemUp: y > staffTop + spacing * 2 });
            const finger = exercise.fingers[globalIndex];
            if (finger) {
                append(group, "text", {
                    x, y: rightHand ? Math.min(y - 43, 65) : Math.max(y + 48, 170),
                    fill: status === "current" ? "#b96f0b" : "#35524a",
                    "font-size": 15, "font-family": "Inter, sans-serif", "font-weight": 900,
                    "text-anchor": "middle"
                }, finger);
            }
            append(group, "text", {
                x, y: 205, fill: "#5c6965", "font-size": 11,
                "font-family": "Inter, sans-serif", "font-weight": 700, "text-anchor": "middle"
            }, item.label);
        });
        drawPageMarkers(group, start, Math.min(start + items.length, exercise.groups.length), exercise.groups.length, width, 224);
    }

    function splitHands(item) {
        if (Array.isArray(item.left) || Array.isArray(item.right)) {
            return { left: item.left || [], right: item.right || [] };
        }
        const notes = [...item.notes].sort((a, b) => a - b);
        if (notes.length >= 5) {
            const split = Number.isInteger(item.split) ? item.split : Math.floor(notes.length / 2);
            return { left: notes.slice(0, split), right: notes.slice(split) };
        }
        if (Math.max(...notes) <= 67) return { left: notes, right: [] };
        if (Math.min(...notes) >= 60) return { left: [], right: notes };
        return { left: notes.filter((note) => note < 60), right: notes.filter((note) => note >= 60) };
    }

    function collisionOffsets(notes, clef, staffTop, spacing, key) {
        const ordered = [...notes].sort((a, b) => staffY(b, clef, staffTop, spacing, key) - staffY(a, clef, staffTop, spacing, key));
        const offsets = new Map();
        ordered.forEach((midi, index) => {
            const y = staffY(midi, clef, staffTop, spacing, key);
            const previous = index ? staffY(ordered[index - 1], clef, staffTop, spacing, key) : null;
            offsets.set(midi, previous !== null && Math.abs(previous - y) < spacing * .7 ? 10 : 0);
        });
        return offsets;
    }

    function drawChordNotes(group, notes, clef, x, staffTop, spacing, key, status) {
        const offsets = collisionOffsets(notes, clef, staffTop, spacing, key);
        notes.forEach((midi) => {
            const noteX = x + (offsets.get(midi) || 0);
            const y = staffY(midi, clef, staffTop, spacing, key);
            drawNote(group, { x: noteX, y, midi, key, clef, staffTop, spacing, status, whole: true });
        });
    }

    function renderVoicing(svg, exercise, key, page, currentIndex) {
        const width = 920;
        const height = 330;
        const trebleTop = 78;
        const bassTop = 213;
        const spacing = 13;
        const pageSize = PAGE_SIZE.voicing;
        const start = page * pageSize;
        const items = exercise.groups.slice(start, start + pageSize);
        const group = append(svg, "g");
        svg.setAttribute("viewBox", "0 0 " + width + " " + height);
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

        drawStaff(group, trebleTop, 48, width - 20, spacing);
        drawStaff(group, bassTop, 48, width - 20, spacing);
        drawClef(group, "treble", 75, trebleTop);
        drawClef(group, "bass", 75, bassTop);
        append(group, "path", {
            d: "M45 78 C29 95 31 136 43 145 C31 158 29 247 45 265",
            fill: "none", stroke: "#27312f", "stroke-width": 2.2
        });
        append(group, "line", { x1: 48, y1: trebleTop, x2: 48, y2: bassTop + spacing * 4, stroke: "#27312f", "stroke-width": 1.5 });
        append(group, "line", { x1: width - 20, y1: trebleTop, x2: width - 20, y2: bassTop + spacing * 4, stroke: "#27312f", "stroke-width": 2.2 });

        const usableStart = 156;
        const usableEnd = width - 92;
        const cell = items.length ? (usableEnd - usableStart) / Math.max(1, items.length - 1) : 0;
        items.forEach((item, localIndex) => {
            const globalIndex = start + localIndex;
            const status = statusFor(globalIndex, currentIndex);
            const x = items.length === 1 ? (usableStart + usableEnd) / 2 : usableStart + localIndex * cell;
            const hands = splitHands(item);
            if (status === "current") {
                const columnWidth = Math.min(150, Math.max(96, cell * .78 || 140));
                append(group, "rect", { x: x - columnWidth / 2, y: 14, width: columnWidth, height: 294, rx: 12, fill: "#fff0cf", "fill-opacity": .72 });
            }
            if (localIndex > 0) {
                const lineX = x - cell / 2;
                append(group, "line", { x1: lineX, y1: trebleTop, x2: lineX, y2: bassTop + spacing * 4, stroke: "#b7bfbc", "stroke-width": 1 });
            }
            append(group, "text", {
                x, y: 47, fill: status === "current" ? "#a96106" : "#24312e",
                "font-size": 17, "font-family": "Inter, sans-serif", "font-weight": 850,
                "text-anchor": "middle"
            }, item.label);
            drawChordNotes(group, hands.right, "treble", x, trebleTop, spacing, key, status);
            drawChordNotes(group, hands.left, "bass", x, bassTop, spacing, key, status);
            append(group, "text", {
                x, y: 318, fill: "#64716d", "font-size": 11,
                "font-family": "Inter, sans-serif", "font-weight": 750, "text-anchor": "middle"
            }, "마디 " + (globalIndex + 1));
        });
        drawPageMarkers(group, start, Math.min(start + items.length, exercise.groups.length), exercise.groups.length, width, 327);
    }

    function render(svg, options) {
        const { mode, exercise, key, currentIndex = 0 } = options;
        const pageSize = PAGE_SIZE[mode] || PAGE_SIZE.voicing;
        const pageCount = Math.max(1, Math.ceil(exercise.groups.length / pageSize));
        const page = Math.max(0, Math.min(options.page || 0, pageCount - 1));
        svg.replaceChildren();
        svg.setAttribute("class", mode === "scale" ? "score-svg is-scale" : "score-svg is-voicing");
        if (mode === "scale") renderScale(svg, exercise, key, page, currentIndex);
        else renderVoicing(svg, exercise, key, page, currentIndex);
        return { page, pageCount, pageSize };
    }

    function pageForIndex(mode, index) {
        return Math.floor(Math.max(0, index) / (PAGE_SIZE[mode] || PAGE_SIZE.voicing));
    }

    window.PianoScoreRenderer = { render, pageForIndex, pageSize: PAGE_SIZE };
})();
