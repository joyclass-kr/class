"use strict";

const assert = require("node:assert/strict");

global.sampleRate = 48000;
global.currentTime = 0;
global.currentFrame = 0;
global.AudioWorkletProcessor = class {
    constructor() { this.port = { onmessage: null }; }
};
const processors = new Map();
global.registerProcessor = function (name, Processor) { processors.set(name, Processor); };

require("../learning/arts/instrument-room/instrument-worklet-v2.js");

function render(processor, seconds) {
    const blockSize = 128;
    const blocks = Math.ceil(seconds * sampleRate / blockSize);
    const rendered = new Float32Array(blocks * blockSize);
    for (let block = 0; block < blocks; block += 1) {
        const left = new Float32Array(blockSize);
        const right = new Float32Array(blockSize);
        processor.process([], [[left, right]]);
        rendered.set(left, block * blockSize);
        global.currentFrame += blockSize;
        global.currentTime = global.currentFrame / sampleRate;
    }
    return rendered;
}

function peakAndRms(signal, start) {
    let peak = 0;
    let square = 0;
    let count = 0;
    for (let index = start || 0; index < signal.length; index += 1) {
        const value = signal[index];
        assert.ok(Number.isFinite(value));
        peak = Math.max(peak, Math.abs(value));
        square += value * value;
        count += 1;
    }
    return { peak, rms: Math.sqrt(square / Math.max(1, count)) };
}

const StringProcessor = processors.get("resonant-string-processor");
const DrumProcessor = processors.get("resonant-drum-processor");
assert.equal(typeof StringProcessor, "function");
assert.equal(typeof DrumProcessor, "function");

const bass = new StringProcessor();
bass.port.onmessage({ data: {
    type: "noteOn", note: 28, frequency: 41.2034, velocity: .82, model: "bass", time: 0,
    params: { articulation: "finger", tone: .58, mute: .08, pickPosition: .34 }
} });
const bassAudio = render(bass, 1.4);
const bassStart = peakAndRms(bassAudio.subarray(0, sampleRate * .18));
const bassFirstMillisecond = peakAndRms(bassAudio.subarray(0, Math.ceil(sampleRate * .001)));
assert.ok(bassFirstMillisecond.peak > .01);
const bassTail = peakAndRms(bassAudio.subarray(sampleRate * .75));
assert.ok(bassStart.peak > .06 && bassStart.peak < 1);
assert.ok(bassStart.rms > .008);
assert.ok(bassTail.rms > .0002);
assert.ok(bassTail.rms < bassStart.rms);

global.currentTime = 0;
global.currentFrame = 0;
const drums = new DrumProcessor();
drums.port.onmessage({ data: { type: "hit", id: "kick", velocity: .86, resonance: .58, tone: .62, time: 0 } });
const kickAudio = render(drums, 1.6);
const kickStart = peakAndRms(kickAudio.subarray(0, sampleRate * .16));
const kickTail = peakAndRms(kickAudio.subarray(sampleRate * 1.2));
assert.ok(kickStart.peak > .08 && kickStart.peak < 1);
const kickFirstMillisecond = peakAndRms(kickAudio.subarray(0, Math.ceil(sampleRate * .001)));
assert.ok(kickFirstMillisecond.peak > .01);
assert.ok(kickStart.rms > .008);
assert.ok(kickTail.rms < kickStart.rms * .3);

console.log("instrument-room-audio-unit: ok");
