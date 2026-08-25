(function (root, factory) {
    const api = factory();
    if (typeof module === "object" && module.exports) module.exports = api;
    if (root) root.InstrumentRoomCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
    "use strict";

    const NOTE_NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
    const RANGES = {
        piano: { start: 48, end: 84 },
        bass: { start: 28, end: 60 },
        guitar: { start: 40, end: 76 }
    };
    const GUITAR_CHORDS = {
        C: [48, 52, 55, 60, 64],
        Dm: [50, 57, 62, 65],
        Em: [40, 47, 52, 55, 59, 64],
        F: [41, 48, 53, 57, 60, 65],
        G: [43, 47, 50, 55, 59, 67],
        Am: [45, 52, 57, 60, 64],
        Bdim: [47, 53, 56, 62]
    };

    function midiToFrequency(midi) {
        return 440 * Math.pow(2, (Number(midi) - 69) / 12);
    }

    function noteLabel(midi) {
        const value = Number(midi);
        return NOTE_NAMES[((value % 12) + 12) % 12] + (Math.floor(value / 12) - 1);
    }

    function isBlackKey(midi) {
        return [1, 3, 6, 8, 10].includes(((Number(midi) % 12) + 12) % 12);
    }

    function keyboardLayout(start, end) {
        const notes = [];
        let whiteIndex = 0;
        for (let midi = start; midi <= end; midi += 1) {
            const black = isBlackKey(midi);
            notes.push({ midi, black, whiteIndex: black ? whiteIndex - 1 : whiteIndex, label: noteLabel(midi) });
            if (!black) whiteIndex += 1;
        }
        return { notes, whiteCount: whiteIndex };
    }

    function getInstrumentRange(instrument) {
        const range = RANGES[instrument] || RANGES.piano;
        return { start: range.start, end: range.end };
    }

    function getGuitarChord(name) {
        return (GUITAR_CHORDS[name] || GUITAR_CHORDS.C).slice();
    }

    function getStrumOrder(notes, direction) {
        const ordered = notes.slice().sort(function (a, b) { return a - b; });
        return direction === "up" ? ordered.reverse() : ordered;
    }

    function pointerVelocity(relativeY) {
        const y = Math.max(0, Math.min(1, Number(relativeY) || 0));
        return Math.max(.38, Math.min(1, .38 + y * .62));
    }

    return {
        NOTE_NAMES,
        GUITAR_CHORDS,
        midiToFrequency,
        noteLabel,
        isBlackKey,
        keyboardLayout,
        getInstrumentRange,
        getGuitarChord,
        getStrumOrder,
        pointerVelocity
    };
});
