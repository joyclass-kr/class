"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");

const html = fs.readFileSync("learning/arts/instrument-room/index.html", "utf8");
const css = fs.readFileSync("learning/arts/instrument-room/styles.css", "utf8");
const app = fs.readFileSync("learning/arts/instrument-room/app.js", "utf8");
const worklet = fs.readFileSync("learning/arts/instrument-room/instrument-worklet-v2.js", "utf8");

["keyboard", "guitar", "bass", "drums", "strings", "woodwind", "brass", "percussion", "korean"].forEach((family) => {
    assert.match(html, new RegExp(`data-family=["']${family}["']`));
});
["audioButton", "keyboard", "chordPads", "drumPads", "sustainButton", "stringCanvas"].forEach((id) => {
    assert.match(html, new RegExp(`id=["']${id}["']`));
});

assert.match(html, /코드패드/);
assert.match(html, /건반/);
assert.doesNotMatch(html, /프렛보드|합주|멀티플레이/);
assert.match(html, /\.\.\/music-studio\/assets\/piano\/C4\.ogg/);
assert.match(app, /latencyHint: \.003/);
assert.match(app, /PIANO_SAMPLES/);
assert.match(app, /source\.start\(now, Math\.min\(\.012/);
assert.match(app, /AudioWorkletNode/);
assert.match(app, /DIGITAL WAVEGUIDE/);
assert.match(app, /function triggerDrum/);
assert.match(app, /function strum/);
assert.match(app, /function connectFastToMix/);
assert.match(app, /function playImmediateStringExcitation/);
assert.match(app, /function playImmediateDrumExcitation/);
assert.match(app, /button\.addEventListener\("pointerdown", function \(event\) \{[\s\S]*?state\.guitarChord = name;/);
assert.doesNotMatch(app, /const start = context\.currentTime \+ \.012/);
assert.match(app, /if \(state\.stringNode\) \{[\s\S]*?sendNote\(state\.stringNode\)/);
assert.match(app, /tag === "INPUT" && event\.target\.type !== "range"/);
assert.match(html, /app\.js\?v=20260831-sampled-grand/);
assert.match(app, /instrument-worklet-v2\.js\?v=20260825-drum-map/);
assert.match(app, /start \+ \.00012/);
assert.match(worklet, /sampleRate \* \.00012/);
assert.match(worklet, /sampleRate \* \.0001/);
assert.match(worklet, /class ModalStringVoice/);
assert.match(worklet, /class ModalDrumVoice/);
assert.match(worklet, /registerProcessor\("resonant-string-processor"/);
assert.match(worklet, /registerProcessor\("resonant-drum-processor"/);
assert.match(worklet, /pluckShape/);
assert.match(worklet, /pickupShape/);
assert.match(app, /GRAND_SAMPLE_STEP = 3/);
assert.match(app, /GRAND_SAMPLE_CACHE_LIMIT = 16/);
assert.match(app, /function loadConcertGrandSample/);
assert.match(app, /state\.family === "keyboard"/);
assert.match(app, /\(state\.keyboardOctave \+ 1\) \* 12/);
assert.match(css, /--key-width: 48px/);
assert.match(css, /min-height: 44px/);
assert.match(css, /@media \(orientation: portrait\)/);
assert.match(css, /prefers-reduced-motion/);

console.log("instrument-room-contract: ok");
