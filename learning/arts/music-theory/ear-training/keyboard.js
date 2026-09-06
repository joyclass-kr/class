(function () {
    "use strict";

    const BLACK_OFFSETS = { 1: true, 3: true, 6: true, 8: true, 10: true };
    const WHITE_INDEX = { 0: 0, 2: 1, 4: 2, 5: 3, 7: 4, 9: 5, 11: 6 };
    /* 검은건반은 왼쪽 흰건반 기준으로 얼마나 밀려 붙는지 */
    const BLACK_SHIFT = { 1: 0, 3: 1, 6: 3, 8: 4, 10: 5 };

    function build(container, lowMidi, highMidi, onPress) {
        container.innerHTML = "";
        container.classList.add("keyboard");

        const whites = [];
        const blacks = [];
        for (let midi = lowMidi; midi <= highMidi; midi += 1) {
            const semitone = ((midi % 12) + 12) % 12;
            if (BLACK_OFFSETS[semitone]) blacks.push(midi);
            else whites.push(midi);
        }

        const whiteRow = document.createElement("div");
        whiteRow.className = "keyboard-whites";
        const keys = new Map();

        whites.forEach(midi => {
            const key = document.createElement("button");
            key.type = "button";
            key.className = "key key-white";
            key.dataset.midi = String(midi);
            key.setAttribute("aria-label", noteLabel(midi));
            key.append(markLayer());
            whiteRow.append(key);
            keys.set(midi, key);
        });
        container.append(whiteRow);

        const whiteCount = whites.length;
        blacks.forEach(midi => {
            const semitone = ((midi % 12) + 12) % 12;
            const octaveStart = midi - semitone;
            const whitesBefore = whites.filter(white => white < octaveStart).length + BLACK_SHIFT[semitone];
            const key = document.createElement("button");
            key.type = "button";
            key.className = "key key-black";
            key.dataset.midi = String(midi);
            key.setAttribute("aria-label", noteLabel(midi));
            key.style.left = ((whitesBefore + 1) / whiteCount * 100) + "%";
            key.style.width = (100 / whiteCount * 0.6) + "%";
            key.style.transform = "translateX(-50%)";
            key.append(markLayer());
            whiteRow.append(key);
            keys.set(midi, key);
        });

        container.addEventListener("click", event => {
            const key = event.target.closest(".key");
            if (!key || key.disabled) return;
            onPress(Number(key.dataset.midi));
        });

        return {
            element: container,
            keys: keys,
            clearMarks: function () {
                keys.forEach(key => {
                    key.classList.remove("is-given", "is-right", "is-wrong", "is-typed");
                    key.querySelector(".key-mark").textContent = "";
                });
            },
            mark: function (midi, kind, text) {
                const key = keys.get(midi);
                if (!key) return;
                key.classList.add("is-" + kind);
                key.querySelector(".key-mark").textContent = text || "";
            },
            centerOn: function (midi) {
                const key = keys.get(midi);
                if (!key) return;
                const target = key.offsetLeft + key.offsetWidth / 2 - container.clientWidth / 2;
                container.scrollLeft = Math.max(0, target);
            },
            setEnabled: function (enabled) {
                keys.forEach(key => { key.disabled = !enabled; });
            }
        };
    }

    function markLayer() {
        const mark = document.createElement("span");
        mark.className = "key-mark";
        return mark;
    }

    function noteLabel(midi) {
        const names = ["도", "도♯", "레", "레♯", "미", "파", "파♯", "솔", "솔♯", "라", "라♯", "시"];
        const semitone = ((midi % 12) + 12) % 12;
        return names[semitone] + " " + (Math.floor(midi / 12) - 1) + "옥타브";
    }

    window.Keyboard = { build: build };
})();
