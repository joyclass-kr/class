"use strict";

const TWO_PI = Math.PI * 2;

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function seededRandom(seed) {
    let value = seed >>> 0;
    return function () {
        value = (1664525 * value + 1013904223) >>> 0;
        return value / 4294967296;
    };
}

class ModalStringVoice {
    constructor(message) {
        this.note = message.note;
        this.model = message.model === "guitar" ? "guitar" : "bass";
        this.velocity = clamp(Number(message.velocity) || .7, .05, 1);
        this.params = message.params || {};
        this.released = false;
        this.releaseGain = 1;
        this.age = 0;
        this.attackSamples = Math.max(1, Math.round(sampleRate * .00012));
        this.transientLevel = this.getTransientLevel();
        this.transientDecay = Math.exp(-1 / (sampleRate * this.getTransientTime()));
        this.noisePrevious = 0;
        this.random = seededRandom((message.note + 37) * 2246822519);
        this.modes = this.buildModes(Number(message.frequency));
    }

    get articulation() {
        return String(this.params.articulation || (this.model === "bass" ? "finger" : "pick"));
    }

    getTransientLevel() {
        if (this.articulation === "slap") return .21 * this.velocity;
        if (this.articulation === "pick") return .075 * this.velocity;
        if (this.articulation === "mute") return .045 * this.velocity;
        return .026 * this.velocity;
    }

    getTransientTime() {
        if (this.articulation === "slap") return .022;
        if (this.articulation === "pick") return .012;
        return .008;
    }

    buildModes(fundamental) {
        const bass = this.model === "bass";
        const maxModes = bass ? 34 : 38;
        const pluckPosition = .055 + clamp(Number(this.params.pickPosition) || .3, .02, .96) * (bass ? .39 : .34);
        const pickupPosition = bass ? .165 : .112;
        const tone = clamp(Number(this.params.tone) || .62, .05, 1);
        const mute = clamp(Number(this.params.mute) || 0, 0, 1);
        const inharmonicity = (bass ? .000018 : .000052) * (1 + Math.max(0, this.note - (bass ? 28 : 40)) * .012);
        const baseT60 = bass
            ? clamp(5.2 - Math.max(0, this.note - 28) * .065, 2.25, 5.2)
            : clamp(3.65 - Math.max(0, this.note - 40) * .048, 1.45, 3.65);
        const softness = this.articulation === "pick" ? .018 : this.articulation === "slap" ? .008 : this.articulation === "mute" ? .072 : .047;
        const modes = [];
        let energy = 0;
        for (let partial = 1; partial <= maxModes; partial += 1) {
            const frequency = fundamental * partial * Math.sqrt(1 + inharmonicity * partial * partial);
            if (frequency > sampleRate * .445) break;
            const pluckShape = Math.sin(Math.PI * partial * pluckPosition);
            const pickupShape = Math.sin(Math.PI * partial * pickupPosition);
            let amplitude = pluckShape * pickupShape / Math.pow(partial, .92);
            amplitude *= Math.exp(-partial * softness * (1.25 - tone * .65));
            if (this.articulation === "harmonic") amplitude *= partial % 2 === 0 ? 1.65 : .055;
            if (this.articulation === "slap") amplitude *= 1 + .18 * Math.sin(partial * 1.7);
            const partialT60 = baseT60 / (1 + Math.pow(partial - 1, 1.18) * (bass ? .048 : .064));
            const articulationLoss = this.articulation === "mute" ? .19 : this.articulation === "slap" ? .72 : 1;
            const t60 = Math.max(.045, partialT60 * articulationLoss * (1 - mute * .76));
            const omega = TWO_PI * frequency / sampleRate;
            const phase = (this.random() - .5) * .035;
            modes.push({
                coefficient: 2 * Math.cos(omega),
                current: Math.cos(phase),
                previous: Math.cos(phase - omega),
                amplitude,
                decay: Math.pow(.001, 1 / (t60 * sampleRate))
            });
            energy += amplitude * amplitude;
        }
        const normalization = this.velocity * (bass ? .54 : .42) / Math.max(.16, Math.sqrt(energy));
        modes.forEach((mode) => { mode.amplitude *= normalization; });
        return modes;
    }

    next() {
        let sum = 0;
        for (let index = 0; index < this.modes.length; index += 1) {
            const mode = this.modes[index];
            const next = mode.coefficient * mode.current - mode.previous;
            mode.previous = mode.current;
            mode.current = next;
            mode.amplitude *= mode.decay;
            sum += next * mode.amplitude;
        }
        const noise = this.random() * 2 - 1;
        const pickClick = (noise - this.noisePrevious) * this.transientLevel;
        this.noisePrevious = noise;
        this.transientLevel *= this.transientDecay;
        const attack = Math.min(1, this.age / this.attackSamples);
        this.age += 1;
        if (this.released) this.releaseGain *= this.model === "bass" ? .9989 : .9974;
        return (sum * attack + pickClick) * this.releaseGain;
    }

    get finished() {
        if (this.releaseGain < .0007) return true;
        if (this.age > sampleRate * 14) return true;
        return this.modes.length === 0 || (this.age > sampleRate * .4 && Math.abs(this.modes[0].amplitude) < .000015);
    }
}

class ResonantStringProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.voices = [];
        this.scheduled = [];
        this.port.onmessage = (event) => this.handleMessage(event.data || {});
    }

    handleMessage(message) {
        if (message.type === "noteOn") {
            this.scheduled.push(message);
            this.scheduled.sort((a, b) => (a.time || 0) - (b.time || 0));
        } else if (message.type === "noteOff") {
            this.voices.forEach((voice) => { if (voice.note === message.note) voice.released = true; });
        } else if (message.type === "allOff") {
            this.voices.forEach((voice) => { voice.released = true; });
            this.scheduled.length = 0;
        }
    }

    startVoice(message) {
        this.voices = this.voices.filter((voice) => voice.note !== message.note);
        this.voices.push(new ModalStringVoice(message));
        const limit = message.model === "bass" ? 8 : 16;
        if (this.voices.length > limit) this.voices.splice(0, this.voices.length - limit);
    }

    process(inputs, outputs) {
        const output = outputs[0];
        if (!output || !output[0]) return true;
        const left = output[0];
        const right = output[1] || left;
        for (let frame = 0; frame < left.length; frame += 1) {
            const time = currentTime + frame / sampleRate;
            while (this.scheduled.length && (this.scheduled[0].time || 0) <= time + .0001) this.startVoice(this.scheduled.shift());
            let sample = 0;
            for (let index = 0; index < this.voices.length; index += 1) sample += this.voices[index].next();
            sample = Math.tanh(sample * 1.12) * .74;
            left[frame] = sample;
            right[frame] = sample;
        }
        this.voices = this.voices.filter((voice) => !voice.finished);
        return true;
    }
}

const DRUM_MODELS = {
    kick: { family: "membrane", base: 48, ratios: [1, 1.59, 2.14, 2.30, 2.65, 2.92, 3.16], levels: [1, .28, .17, .12, .08, .055, .035], decays: [1.15, .62, .42, .35, .28, .23, .18], sweep: .34, noise: .012 },
    snare: { family: "snare", base: 182, ratios: [1, 1.36, 1.83, 2.31, 2.74, 3.42, 4.18], levels: [.42, .28, .19, .13, .1, .07, .04], decays: [.52, .39, .31, .25, .21, .17, .13], noise: .48 },
    lowtom: { family: "membrane", base: 91, ratios: [1, 1.50, 1.98, 2.42, 2.79, 3.23, 3.61], levels: [1, .35, .2, .13, .09, .06, .035], decays: [.92, .58, .43, .34, .27, .22, .18], sweep: .13, noise: .018 },
    hightom: { family: "membrane", base: 139, ratios: [1, 1.48, 1.96, 2.39, 2.76, 3.19, 3.58], levels: [1, .34, .19, .13, .085, .055, .035], decays: [.72, .47, .36, .29, .23, .19, .15], sweep: .1, noise: .02 }
};

class ModalDrumVoice {
    constructor(message) {
        this.id = message.id;
        this.velocity = clamp(Number(message.velocity) || .75, .05, 1);
        this.resonance = clamp(Number(message.resonance) || .58, .15, 1);
        this.tone = clamp(Number(message.tone) || .62, .1, 1);
        this.age = 0;
        this.random = seededRandom((this.id.length + 11) * 3266489917 + Math.floor(currentFrame));
        this.noiseState = 0;
        this.noisePrevious = 0;
        this.modes = this.buildModes();
        this.noiseEnvelope = this.getNoiseLevel();
        this.noiseDecay = Math.pow(.001, 1 / (this.getNoiseT60() * sampleRate));
    }

    buildModes() {
        const model = DRUM_MODELS[this.id];
        if (model) {
            return model.ratios.map((ratio, index) => ({
                phase: this.random() * TWO_PI,
                frequency: model.base * ratio * (.92 + this.tone * .16),
                level: model.levels[index] * this.velocity * .58,
                decay: Math.pow(.001, 1 / (model.decays[index] * (.55 + this.resonance * .9) * sampleRate)),
                sweep: (model.sweep || 0) / (1 + index * .35)
            }));
        }
        const open = this.id === "openhat";
        const crash = this.id === "crash";
        const ride = this.id === "ride";
        const count = crash ? 28 : ride ? 24 : open ? 18 : 14;
        const base = crash ? 270 : ride ? 410 : 820;
        const duration = crash ? 2.7 : ride ? 2.2 : open ? 1.05 : .24;
        const modes = [];
        for (let index = 0; index < count; index += 1) {
            const spread = index + 1 + this.random() * (1.4 + index * .18);
            const frequency = base * Math.pow(spread, .78) * (.82 + this.tone * .34);
            if (frequency > sampleRate * .44) continue;
            modes.push({
                phase: this.random() * TWO_PI,
                frequency,
                level: this.velocity * (.09 / Math.pow(index + 1, .42)) * (this.random() * .45 + .7),
                decay: Math.pow(.001, 1 / (duration * (.72 + this.random() * .55) * (.55 + this.resonance * .8) * sampleRate)),
                sweep: 0
            });
        }
        return modes;
    }

    getNoiseLevel() {
        if (this.id === "snare") return .34 * this.velocity;
        if (this.id === "crash") return .1 * this.velocity;
        if (this.id === "ride") return .055 * this.velocity;
        if (this.id === "hat" || this.id === "openhat") return .13 * this.velocity;
        return .018 * this.velocity;
    }

    getNoiseT60() {
        if (this.id === "snare") return .34 * (.55 + this.resonance);
        if (this.id === "crash") return 1.4 * (.55 + this.resonance);
        if (this.id === "ride") return 1.05 * (.55 + this.resonance);
        if (this.id === "openhat") return .7 * (.55 + this.resonance);
        if (this.id === "hat") return .11;
        return .045;
    }

    next() {
        let sum = 0;
        const time = this.age / sampleRate;
        for (let index = 0; index < this.modes.length; index += 1) {
            const mode = this.modes[index];
            const glide = 1 + mode.sweep * Math.exp(-time * 28);
            mode.phase += TWO_PI * mode.frequency * glide / sampleRate;
            if (mode.phase > TWO_PI) mode.phase -= TWO_PI;
            sum += Math.sin(mode.phase) * mode.level;
            mode.level *= mode.decay;
        }
        const rawNoise = this.random() * 2 - 1;
        const highpass = rawNoise - this.noisePrevious + .78 * this.noiseState;
        this.noisePrevious = rawNoise;
        this.noiseState = highpass;
        const noise = highpass * this.noiseEnvelope;
        this.noiseEnvelope *= this.noiseDecay;
        this.age += 1;
        const attack = Math.min(1, this.age / Math.max(1, sampleRate * .0001));
        return (sum + noise) * attack;
    }

    get finished() {
        return this.age > sampleRate * 5 || (this.age > sampleRate * .08 && Math.abs(this.modes[0] ? this.modes[0].level : 0) < .00001 && this.noiseEnvelope < .00001);
    }
}

class ResonantDrumProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.voices = [];
        this.scheduled = [];
        this.port.onmessage = (event) => {
            const message = event.data || {};
            if (message.type === "hit") {
                this.scheduled.push(message);
                this.scheduled.sort((a, b) => (a.time || 0) - (b.time || 0));
            } else if (message.type === "allOff") this.voices.length = 0;
        };
    }

    process(inputs, outputs) {
        const output = outputs[0];
        if (!output || !output[0]) return true;
        const left = output[0];
        const right = output[1] || left;
        for (let frame = 0; frame < left.length; frame += 1) {
            const time = currentTime + frame / sampleRate;
            while (this.scheduled.length && (this.scheduled[0].time || 0) <= time + .0001) this.voices.push(new ModalDrumVoice(this.scheduled.shift()));
            let sample = 0;
            for (let index = 0; index < this.voices.length; index += 1) sample += this.voices[index].next();
            sample = Math.tanh(sample * 1.08) * .72;
            left[frame] = sample;
            right[frame] = sample;
        }
        this.voices = this.voices.filter((voice) => !voice.finished);
        if (this.voices.length > 24) this.voices.splice(0, this.voices.length - 24);
        return true;
    }
}

registerProcessor("resonant-string-processor", ResonantStringProcessor);
registerProcessor("resonant-drum-processor", ResonantDrumProcessor);
