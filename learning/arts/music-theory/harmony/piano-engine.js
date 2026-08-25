(function () {
    "use strict";

    const SAMPLE_NOTES = [
        { midi: 36, file: "C2.ogg" }, { midi: 42, file: "Fs2.ogg" },
        { midi: 48, file: "C3.ogg" }, { midi: 54, file: "Fs3.ogg" },
        { midi: 60, file: "C4.ogg" }, { midi: 66, file: "Fs4.ogg" },
        { midi: 72, file: "C5.ogg" }, { midi: 78, file: "Fs5.ogg" },
        { midi: 84, file: "C6.ogg" }
    ];
    const state = {
        context: null,
        compressor: null,
        masterGain: null,
        reverb: null,
        reverbGain: null,
        samples: new Map(),
        loading: null
    };

    function ensureAudio() {
        if (!state.context) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) return null;
            const context = new AudioContextClass({ latencyHint: "interactive" });
            const lowShelf = context.createBiquadFilter();
            const presence = context.createBiquadFilter();
            const limiter = context.createDynamicsCompressor();
            state.context = context;
            state.compressor = context.createDynamicsCompressor();
            state.masterGain = context.createGain();
            state.reverb = context.createConvolver();
            state.reverbGain = context.createGain();

            state.masterGain.gain.value = 1.08;
            state.compressor.threshold.value = -18;
            state.compressor.knee.value = 14;
            state.compressor.ratio.value = 3.5;
            state.compressor.attack.value = .012;
            state.compressor.release.value = .22;
            lowShelf.type = "lowshelf";
            lowShelf.frequency.value = 190;
            lowShelf.gain.value = 3.5;
            presence.type = "peaking";
            presence.frequency.value = 2700;
            presence.Q.value = .75;
            presence.gain.value = 1.8;
            limiter.threshold.value = -3;
            limiter.knee.value = 1;
            limiter.ratio.value = 20;
            limiter.attack.value = .002;
            limiter.release.value = .1;
            state.reverbGain.gain.value = .1;

            const impulseLength = Math.floor(context.sampleRate * 1.7);
            const impulse = context.createBuffer(2, impulseLength, context.sampleRate);
            for (let channel = 0; channel < impulse.numberOfChannels; channel += 1) {
                const data = impulse.getChannelData(channel);
                for (let index = 0; index < impulseLength; index += 1) {
                    data[index] = (Math.random() * 2 - 1) * Math.pow(1 - index / impulseLength, 2.8);
                }
            }
            state.reverb.buffer = impulse;
            state.reverb.connect(state.reverbGain).connect(state.compressor);
            state.compressor.connect(lowShelf).connect(presence).connect(limiter).connect(state.masterGain).connect(context.destination);
        }
        if (state.context.state === "suspended") state.context.resume();
        return state.context;
    }

    function connectToMix(source, reverbAmount) {
        const context = ensureAudio();
        if (!context || !source) return;
        const dry = context.createGain();
        dry.gain.value = 1;
        source.connect(dry).connect(state.compressor);
        if (reverbAmount) {
            const send = context.createGain();
            send.gain.value = reverbAmount;
            source.connect(send).connect(state.reverb);
        }
    }

    function loadSamples() {
        const context = ensureAudio();
        if (!context) return Promise.reject(new Error("AudioContext unavailable"));
        if (state.samples.size === SAMPLE_NOTES.length) return Promise.resolve();
        if (state.loading) return state.loading;
        state.loading = Promise.all(SAMPLE_NOTES.map(function (sample) {
            return fetch("assets/piano/" + sample.file)
                .then(function (response) {
                    if (!response.ok) throw new Error("Piano sample load failed");
                    return response.arrayBuffer();
                })
                .then(function (data) { return context.decodeAudioData(data); })
                .then(function (buffer) { state.samples.set(sample.midi, buffer); });
        })).catch(function (error) {
            state.loading = null;
            throw error;
        });
        return state.loading;
    }

    function nearestSample(midi) {
        return SAMPLE_NOTES.reduce(function (nearest, sample) {
            return Math.abs(sample.midi - midi) < Math.abs(nearest.midi - midi) ? sample : nearest;
        }, SAMPLE_NOTES[0]);
    }

    function playLoadedMidi(midi, when, duration, volume, panAmount) {
        const context = ensureAudio();
        const sample = nearestSample(midi);
        const buffer = state.samples.get(sample.midi);
        if (!context || !buffer) return false;
        const start = Math.max(context.currentTime, when || context.currentTime);
        const hold = Math.max(1.35, (duration || .8) + .7);
        const release = .85;
        const output = context.createGain();
        const panner = typeof context.createStereoPanner === "function" ? context.createStereoPanner() : null;
        const source = context.createBufferSource();
        const peak = Math.min(.62, Math.max(.16, (volume || .09) * 5.6));
        source.buffer = buffer;
        source.playbackRate.value = Math.pow(2, (midi - sample.midi) / 12);
        output.gain.setValueAtTime(.0001, start);
        output.gain.exponentialRampToValueAtTime(peak, start + .004);
        output.gain.exponentialRampToValueAtTime(peak * .82, start + .18);
        output.gain.setValueAtTime(peak * .82, start + hold);
        output.gain.exponentialRampToValueAtTime(.0001, start + hold + release);
        source.connect(output);
        if (panner) {
            panner.pan.value = Math.max(-.35, Math.min(.35, panAmount || 0));
            output.connect(panner);
            connectToMix(panner, .12);
        } else {
            connectToMix(output, .12);
        }
        source.start(start, Math.min(.012, Math.max(0, buffer.duration - .01)));
        source.stop(start + Math.min(buffer.duration / source.playbackRate.value, hold + release + .1));
        return true;
    }

    function playSynthetic(midi, when, duration, volume) {
        const context = ensureAudio();
        if (!context) return;
        const start = Math.max(context.currentTime, when || context.currentTime);
        const frequency = 440 * Math.pow(2, (midi - 69) / 12);
        const length = duration || .8;
        const envelope = context.createGain();
        const filter = context.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = Math.min(6200, frequency * 16);
        envelope.gain.setValueAtTime(.0001, start);
        envelope.gain.exponentialRampToValueAtTime(volume || .09, start + .006);
        envelope.gain.exponentialRampToValueAtTime(.0001, start + length + .5);
        filter.connect(envelope);
        connectToMix(envelope, .12);
        [1, 2, 3, 4].forEach(function (ratio, index) {
            const oscillator = context.createOscillator();
            const gain = context.createGain();
            oscillator.type = "sine";
            oscillator.frequency.value = frequency * ratio;
            gain.gain.value = [1, .38, .2, .1][index];
            oscillator.connect(gain).connect(filter);
            oscillator.start(start);
            oscillator.stop(start + length + .55);
        });
    }

    function playMidi(midi, options) {
        const settings = options || {};
        const context = ensureAudio();
        if (!context) return Promise.reject(new Error("이 브라우저는 오디오를 지원하지 않습니다."));
        return loadSamples().then(function () {
            playLoadedMidi(midi, settings.when, settings.duration, settings.volume, settings.pan);
        }).catch(function () {
            playSynthetic(midi, settings.when, settings.duration, settings.volume);
        });
    }

    function playNotes(midis, options) {
        const settings = options || {};
        const context = ensureAudio();
        if (!context) return Promise.reject(new Error("이 브라우저는 오디오를 지원하지 않습니다."));
        return loadSamples().then(function () {
            const start = context.currentTime + (settings.delay || .04);
            const gap = settings.arpeggio || 0;
            midis.forEach(function (midi, index) {
                const pan = midis.length > 1 ? -0.18 + index * (.36 / Math.max(1, midis.length - 1)) : 0;
                playLoadedMidi(midi, start + index * gap, settings.duration || .9, settings.volume || .075, pan);
            });
        }).catch(function () {
            midis.forEach(function (midi, index) { playSynthetic(midi, context.currentTime + index * (settings.arpeggio || 0), settings.duration, settings.volume); });
        });
    }

    function playSequence(groups, beatSeconds) {
        const context = ensureAudio();
        if (!context) return Promise.reject(new Error("이 브라우저는 오디오를 지원하지 않습니다."));
        return loadSamples().then(function () {
            const start = context.currentTime + .05;
            groups.forEach(function (group, index) {
                group.forEach(function (midi, noteIndex) {
                    playLoadedMidi(midi, start + index * beatSeconds, Math.max(.45, beatSeconds * .82), .064, -0.16 + noteIndex * .16);
                });
            });
        }).catch(function () {
            groups.forEach(function (group, index) {
                group.forEach(function (midi) { playSynthetic(midi, context.currentTime + index * beatSeconds, beatSeconds * .8, .065); });
            });
        });
    }

    window.HarmonyPiano = { playMidi: playMidi, playNotes: playNotes, playSequence: playSequence, preload: loadSamples };
})();
