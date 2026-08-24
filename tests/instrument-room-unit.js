"use strict";

const assert = require("node:assert/strict");
const core = require("../learning/arts/instrument-room/instrument-core.js");

assert.ok(Math.abs(core.midiToFrequency(69) - 440) < .0001);
assert.equal(core.noteLabel(60), "도4");
assert.equal(core.isBlackKey(61), true);
assert.equal(core.isBlackKey(60), false);

const pianoLayout = core.keyboardLayout(48, 84);
assert.equal(pianoLayout.notes.length, 37);
assert.equal(pianoLayout.whiteCount, 22);
assert.equal(pianoLayout.notes.filter((note) => note.black).length, 15);

assert.deepEqual(core.getInstrumentRange("bass"), { start: 28, end: 60 });
assert.deepEqual(core.getGuitarChord("C"), [48, 52, 55, 60, 64]);
assert.deepEqual(core.getStrumOrder([48, 52, 55], "down"), [48, 52, 55]);
assert.deepEqual(core.getStrumOrder([48, 52, 55], "up"), [55, 52, 48]);
assert.equal(core.pointerVelocity(0), .38);
assert.equal(core.pointerVelocity(1), 1);

const mutableChord = core.getGuitarChord("Am");
mutableChord[0] = 1;
assert.equal(core.getGuitarChord("Am")[0], 45);

console.log("instrument-room-unit: ok");
