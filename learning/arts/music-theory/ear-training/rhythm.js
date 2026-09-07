(function () {
    "use strict";

    const SVG_NS = "http://www.w3.org/2000/svg";

    /*
     * 리듬 한 마디는 사건의 줄이다. v는 음표 값, rest면 쉼표다.
     * beats는 4분음표 하나를 1로 센 길이.
     */
    const PER_BEAT = 12;

    const VALUES = {
        w: { cells: 48, hollow: true, stem: false, flags: 0, rest: "w" },
        h: { cells: 24, hollow: true, stem: true, flags: 0, rest: "h" },
        hd: { cells: 36, hollow: true, stem: true, flags: 0, dot: true, rest: "h" },
        q: { cells: 12, hollow: false, stem: true, flags: 0, rest: "q" },
        qd: { cells: 18, hollow: false, stem: true, flags: 0, dot: true, rest: "q" },
        e: { cells: 6, hollow: false, stem: true, flags: 1, rest: "e" },
        ed: { cells: 9, hollow: false, stem: true, flags: 1, dot: true, rest: "e" },
        s: { cells: 3, hollow: false, stem: true, flags: 2, rest: "s" },
        te: { cells: 4, hollow: false, stem: true, flags: 1, rest: "e", triplet: true }
    };

    Object.keys(VALUES).forEach(name => { VALUES[name].beats = VALUES[name].cells / PER_BEAT; });

    const BEAT_W = 54;
    const LEFT = 44;
    const LINE_Y = 62;
    const STEM_TOP = 24;
    const HEAD_RX = 6.4;
    const HEAD_RY = 4.6;

    function make(tag, attrs, text) {
        const node = document.createElementNS(SVG_NS, tag);
        Object.keys(attrs || {}).forEach(key => node.setAttribute(key, attrs[key]));
        if (text !== undefined) node.textContent = text;
        return node;
    }

    /*
     * 쉼표도 글꼴 글리프로 그리면 컴퓨터에 깔린 글꼴에 따라 크기와 자리가 달라진다.
     * 온쉼표는 줄에 매달고 2분쉼표는 줄 위에 얹는다. 4분쉼표는 굽은 획, 8분·16분쉼표는
     * 기운 획에 동그란 머리를 붙인다.
     */
    function restNode(kind, x) {
        const group = make("g", { class: "rhythm-rest", transform: "translate(" + x + "," + LINE_Y + ")" });
        if (kind === "w") {
            group.append(make("rect", { x: -8, y: 0, width: 16, height: 7 }));
        } else if (kind === "h") {
            group.append(make("rect", { x: -8, y: -7, width: 16, height: 7 }));
        } else if (kind === "q") {
            group.append(make("path", { d: "M-4,-11 C-1,-8 3,-6 4,-3 C5,0 0,1 -1,4 C-2,7 1,9 4,11" }));
        } else {
            const twoHeads = kind === "s";
            group.append(make("path", { d: twoHeads ? "M0,-10 L4,9" : "M0,-7 L4,8" }));
            group.append(make("circle", { cx: -3, cy: twoHeads ? -9 : -6, r: 2.7 }));
            if (twoHeads) group.append(make("circle", { cx: -1, cy: -1, r: 2.7 }));
        }
        return group;
    }

    /* 마디의 길이를 칸으로 센다. */
    function barCells(bar) {
        return bar.reduce((sum, event) => sum + VALUES[event.v].cells, 0);
    }

    function barBeats(bar) {
        return barCells(bar) / PER_BEAT;
    }

    /* 치는 자리만 남긴다. 한 박을 열두 칸으로 센 자리 번호. */
    function onsets(bar) {
        const list = [];
        let position = 0;
        bar.forEach(event => {
            if (!event.rest) list.push(position);
            position += VALUES[event.v].cells;
        });
        return list;
    }

    function sameOnsets(a, b) {
        const one = onsets(a);
        const two = onsets(b);
        return one.length === two.length && one.every((value, index) => value === two[index]);
    }

    /*
     * 대(beam)로 이을 무리를 찾는다. 같은 박 안에 있고 꼬리가 있는 음표만 잇는다.
     * 쉼표나 박이 바뀌면 무리가 끊긴다.
     */
    function beamGroups(bar) {
        const groups = [];
        let current = null;
        let position = 0;
        bar.forEach((event, index) => {
            const value = VALUES[event.v];
            const beat = Math.floor(position / PER_BEAT);
            const beamable = !event.rest && value.flags > 0;
            if (beamable && current && current.beat === beat) current.items.push(index);
            else if (beamable) {
                current = { beat: beat, items: [index] };
                groups.push(current);
            } else current = null;
            position += value.cells;
        });
        return groups.filter(group => group.items.length > 1);
    }


    /* 칸 수로 잰 길이를 음표 하나로 적을 수 있는지 표 */
    const CELL_VALUE = { 3: "s", 6: "e", 9: "ed", 12: "q", 18: "qd", 24: "h", 36: "hd", 48: "w" };

    /*
     * 치는 자리만 정해 놓고, "다음 칠 자리까지 이어진다"는 규칙으로 음표를 정한다.
     * 이렇게 하면 한 가지 리듬이 한 가지 악보로만 적힌다.
     */
    function fromOnsets(cells, barCells) {
        const sorted = cells.slice().sort((a, b) => a - b);
        const bar = [];
        if (!sorted.length) return [{ v: "w", rest: true }];
        if (sorted[0] > 0) {
            const gap = sorted[0];
            if (!CELL_VALUE[gap]) return null;
            bar.push({ v: CELL_VALUE[gap], rest: true });
        }
        for (let index = 0; index < sorted.length; index += 1) {
            const next = index + 1 < sorted.length ? sorted[index + 1] : barCells;
            const gap = next - sorted[index];
            if (!CELL_VALUE[gap]) return null;
            bar.push({ v: CELL_VALUE[gap] });
        }
        return bar;
    }

    /* 한 박을 채우는 조각들. cells는 16분음표 한 칸을 1로 센 길이. */
    const BEAT_PATTERNS = {
        quarter: [{ v: "q" }],
        triplet: [{ v: "te" }, { v: "te" }, { v: "te" }],
        tripletHead: [{ v: "te" }, { v: "te" }, { v: "te", rest: true }],
        rest: [{ v: "q", rest: true }],
        eighths: [{ v: "e" }, { v: "e" }],
        eighthRest: [{ v: "e" }, { v: "e", rest: true }],
        offEighth: [{ v: "e", rest: true }, { v: "e" }],
        sixteenths: [{ v: "s" }, { v: "s" }, { v: "s" }, { v: "s" }],
        twoThenOne: [{ v: "s" }, { v: "s" }, { v: "e" }],
        oneThenTwo: [{ v: "e" }, { v: "s" }, { v: "s" }],
        dottedPair: [{ v: "ed" }, { v: "s" }]
    };

    const LONG_VALUES = { h: 2, hd: 3, w: 4 };

    function pickOne(list) {
        return list[Math.floor(Math.random() * list.length)];
    }

    /*
     * 마디 하나를 만든다. beats는 마디의 박 수, names는 쓸 수 있는 조각 이름,
     * longs는 쓸 수 있는 긴 음표다.
     */
    function makeBar(beats, names, longs) {
        const bar = [];
        let left = beats;
        let guard = 0;
        while (left > 0 && guard < 40) {
            guard += 1;
            const canLong = (longs || []).filter(name => LONG_VALUES[name] <= left);
            if (canLong.length && Math.random() < .22) {
                const name = pickOne(canLong);
                bar.push({ v: name });
                left -= LONG_VALUES[name];
                continue;
            }
            pickOne(names).forEach(event => bar.push({ v: event.v, rest: event.rest }));
            left -= 1;
        }
        /* 첫 박이 쉼표로만 시작하면 다시 만든다. */
        if (!bar.length || bar.every(event => event.rest)) return makeBar(beats, names, longs);
        return bar;
    }

    /* 칸으로 답하는 문제는 악보를 한 가지로 정리해 둔다. */
    function canonical(bar, barCells) {
        return fromOnsets(onsets(bar), barCells) || bar;
    }

    function render(bar, options) {
        const settings = options || {};
        const beats = barBeats(bar);
        const width = LEFT + beats * BEAT_W + 26;
        const svg = make("svg", {
            class: "rhythm",
            style: "width:" + Math.round(width * (settings.zoom || 1.6)) + "px",
            viewBox: "0 8 " + width + " 78",
            role: "img",
            "aria-label": settings.label || "리듬 한 마디"
        });

        svg.append(make("line", { class: "rhythm-line", x1: 10, y1: LINE_Y, x2: width - 10, y2: LINE_Y }));
        svg.append(make("line", { class: "rhythm-bar", x1: 10, y1: LINE_Y - 16, x2: 10, y2: LINE_Y + 16 }));
        svg.append(make("line", { class: "rhythm-bar is-end", x1: width - 11, y1: LINE_Y - 16, x2: width - 11, y2: LINE_Y + 16 }));

        if (settings.meter) {
            const parts = settings.meter.split("/");
            svg.append(make("text", { class: "rhythm-meter", x: 26, y: LINE_Y - 3 }, parts[0]));
            svg.append(make("text", { class: "rhythm-meter", x: 26, y: LINE_Y + 17 }, parts[1]));
        }

        const xs = [];
        let position = 0;
        bar.forEach(event => {
            xs.push(LEFT + position * BEAT_W + BEAT_W * VALUES[event.v].beats / 2);
            position += VALUES[event.v].beats;
        });

        const beamed = new Set();
        beamGroups(bar).forEach(group => group.items.forEach(index => beamed.add(index)));

        const ink = make("g", { class: "rhythm-ink" + (settings.mark ? " is-" + settings.mark : "") });
        svg.append(ink);

        bar.forEach((event, index) => {
            const value = VALUES[event.v];
            const x = xs[index];
            if (event.rest) {
                ink.append(restNode(value.rest, x));
                if (value.dot) ink.append(make("circle", { class: "rhythm-dot", cx: x + 12, cy: LINE_Y - 4, r: 1.9 }));
                return;
            }
            ink.append(make("ellipse", {
                class: "rhythm-head" + (value.hollow ? " is-hollow" : ""),
                cx: x, cy: LINE_Y, rx: HEAD_RX, ry: HEAD_RY,
                transform: "rotate(-16 " + x + " " + LINE_Y + ")"
            }));
            if (value.stem) {
                ink.append(make("line", {
                    class: "rhythm-stem",
                    x1: x + HEAD_RX - .6, y1: LINE_Y - 2, x2: x + HEAD_RX - .6, y2: STEM_TOP
                }));
            }
            if (value.dot) ink.append(make("circle", { class: "rhythm-dot", cx: x + 12, cy: LINE_Y - 4, r: 1.9 }));
            /* 무리에 들지 못한 꼬리는 하나씩 그린다. */
            if (value.flags > 0 && !beamed.has(index)) {
                for (let flag = 0; flag < value.flags; flag += 1) {
                    const y = STEM_TOP + flag * 7;
                    ink.append(make("path", {
                        class: "rhythm-flag",
                        d: "M" + (x + HEAD_RX - .6) + "," + y + " c 7,3 9,8 6,14"
                    }));
                }
            }
        });

        beamGroups(bar).forEach(group => {
            const stemX = index => xs[index] + HEAD_RX - .6;
            if (group.items.every(index => VALUES[bar[index].v].triplet)) {
                const middle = (stemX(group.items[0]) + stemX(group.items[group.items.length - 1])) / 2;
                ink.append(make("text", { class: "rhythm-triplet", x: middle, y: STEM_TOP - 5 }, "3"));
            }
            const flagsOf = index => VALUES[bar[index].v].flags;
            const depth = Math.max.apply(null, group.items.map(flagsOf));
            for (let level = 0; level < depth; level += 1) {
                const y = STEM_TOP + level * 7;
                /* 둘째 대부터는 그 대를 가진 음표끼리만 잇는다. */
                let run = [];
                const flush = () => {
                    if (!run.length) return;
                    const from = stemX(run[0]);
                    /* 혼자 남으면 짧은 토막으로 그린다. */
                    const to = run.length > 1 ? stemX(run[run.length - 1]) : from + 9;
                    ink.append(make("line", { class: "rhythm-beam", x1: from, y1: y, x2: to, y2: y }));
                    run = [];
                };
                group.items.forEach(index => {
                    if (flagsOf(index) > level) run.push(index);
                    else flush();
                });
                flush();
            }
        });

        return svg;
    }

    window.RhythmNotation = {
        VALUES: VALUES,
        BEAT_PATTERNS: BEAT_PATTERNS,
        render: render,
        onsets: onsets,
        barCells: barCells,
        PER_BEAT: PER_BEAT,
        sameOnsets: sameOnsets,
        barBeats: barBeats,
        makeBar: makeBar,
        fromOnsets: fromOnsets,
        canonical: canonical
    };
})();
