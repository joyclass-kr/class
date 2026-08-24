(function () {
    "use strict";

    const core = window.InstrumentRoomCore;
    const PIANO_SAMPLES = [
        { midi: 36, file: "C2.ogg" }, { midi: 42, file: "Fs2.ogg" },
        { midi: 48, file: "C3.ogg" }, { midi: 54, file: "Fs3.ogg" },
        { midi: 60, file: "C4.ogg" }, { midi: 66, file: "Fs4.ogg" },
        { midi: 72, file: "C5.ogg" }, { midi: 78, file: "Fs5.ogg" },
        { midi: 84, file: "C6.ogg" }
    ];
    const COMPUTER_KEYS = [
        ["KeyA", 0, "A"], ["KeyW", 1, "W"], ["KeyS", 2, "S"], ["KeyE", 3, "E"],
        ["KeyD", 4, "D"], ["KeyF", 5, "F"], ["KeyT", 6, "T"], ["KeyG", 7, "G"],
        ["KeyY", 8, "Y"], ["KeyH", 9, "H"], ["KeyU", 10, "U"], ["KeyJ", 11, "J"], ["KeyK", 12, "K"]
    ];
    const DRUMS = [
        { id: "kick", name: "킥", family: "MEMBRANE", key: "A", code: "KeyA", color: "#8ef0c6" },
        { id: "snare", name: "스네어", family: "WIRE + SHELL", key: "S", code: "KeyS", color: "#ff9d66" },
        { id: "hat", name: "닫힌 하이햇", family: "METAL", key: "D", code: "KeyD", color: "#e5ff75" },
        { id: "openhat", name: "열린 하이햇", family: "METAL", key: "F", code: "KeyF", color: "#f7db80" },
        { id: "lowtom", name: "로우 탐", family: "MEMBRANE", key: "G", code: "KeyG", color: "#7bb7ff" },
        { id: "hightom", name: "하이 탐", family: "MEMBRANE", key: "H", code: "KeyH", color: "#9c91ff" },
        { id: "crash", name: "크래시", family: "METAL", key: "J", code: "KeyJ", color: "#ffcf5c" },
        { id: "ride", name: "라이드", family: "METAL", key: "K", code: "KeyK", color: "#f09cff" }
    ];
    const INSTRUMENT_COPY = {
        piano: { name: "그랜드 피아노", badge: "SAMPLED GRAND", family: "ACOUSTIC", model: "88 GRAND", description: "화성학 연습실과 같은 피아노예요. 건반을 누르고 스페이스바로 서스테인을 사용해 보세요." },
        bass: { name: "모델링 베이스", badge: "DIGITAL WAVEGUIDE", family: "ELECTRIC BASS", model: "4 STRING", description: "현의 길이와 감쇠, 피킹 위치를 실시간으로 계산해요. A–K 키로도 연주할 수 있어요." },
        guitar: { name: "모델링 기타", badge: "DIGITAL WAVEGUIDE", family: "ELECTRIC GUITAR", model: "6 STRING", description: "건반으로 단음을 연주하거나 코드패드로 스트로크하세요. WAV 음원을 사용하지 않아요." },
        drums: { name: "모델링 드럼", badge: "MODAL RESONATOR", family: "ACOUSTIC KIT", model: "8 PIECE", description: "막과 금속의 여러 공진 모드를 합성해요. 패드 또는 A–K 키로 바로 연주하세요." }
    };

    const state = {
        instrument: "piano",
        guitarMode: "keyboard",
        guitarChord: "C",
        articulation: "finger",
        keyboardOctave: 4,
        audioContext: null,
        masterGain: null,
        compressor: null,
        masterLowShelf: null,
        masterPresence: null,
        limiter: null,
        reverb: null,
        reverbGain: null,
        noiseBuffer: null,
        pianoSamples: new Map(),
        pianoLoading: null,
        pianoVoices: new Map(),
        sustain: false,
        sustainLatched: false,
        stringNode: null,
        stringLoading: null,
        stringUnavailable: false,
        workletModuleLoading: null,
        drumNode: null,
        drumLoading: null,
        drumUnavailable: false,
        stringPreGain: null,
        stringTone: null,
        stringBody: null,
        stringDrive: null,
        stringOutput: null,
        activeNotes: new Set(),
        pointerNotes: new Map(),
        pressedCodes: new Map(),
        visualEnergy: 0,
        visualPitch: 0,
        toastTimer: 0
    };
    const elements = {};

    function cacheElements() {
        [
            "audioButton", "modelBadge", "instrumentName", "instrumentDescription", "guitarModeSwitch", "instrumentVisual",
            "visualFamily", "visualModel", "stringCanvas", "pianoControls", "stringControls", "drumControls", "sustainButton",
            "articulationButtons", "toneSlider", "toneOutput", "muteSlider", "muteOutput", "pickSlider", "pickOutput",
            "driveSlider", "driveOutput", "drumResonanceSlider", "drumResonanceOutput", "drumToneSlider", "drumToneOutput",
            "inputHint", "noteReadout", "octaveControls", "octaveReadout", "octaveDown", "octaveUp", "keyboardViewport",
            "keyboard", "chordSurface", "chordPads", "drumPads", "toast"
        ].forEach(function (id) { elements[id] = document.getElementById(id); });
    }

    function showToast(message) {
        elements.toast.textContent = message;
        elements.toast.classList.add("show");
        window.clearTimeout(state.toastTimer);
        state.toastTimer = window.setTimeout(function () { elements.toast.classList.remove("show"); }, 1800);
    }

    function ensureAudio() {
        if (!state.audioContext) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) {
                showToast("이 브라우저에서는 소리를 만들 수 없어요.");
                return null;
            }
            const context = new AudioContextClass({ latencyHint: .003 });
            state.audioContext = context;
            state.masterGain = context.createGain();
            state.compressor = context.createDynamicsCompressor();
            state.masterLowShelf = context.createBiquadFilter();
            state.masterPresence = context.createBiquadFilter();
            state.limiter = context.createDynamicsCompressor();
            state.reverb = context.createConvolver();
            state.reverbGain = context.createGain();

            state.masterGain.gain.value = 1.08;
            state.compressor.threshold.value = -18;
            state.compressor.knee.value = 14;
            state.compressor.ratio.value = 3.5;
            state.compressor.attack.value = .012;
            state.compressor.release.value = .22;
            state.masterLowShelf.type = "lowshelf";
            state.masterLowShelf.frequency.value = 190;
            state.masterLowShelf.gain.value = 3.5;
            state.masterPresence.type = "peaking";
            state.masterPresence.frequency.value = 2700;
            state.masterPresence.Q.value = .75;
            state.masterPresence.gain.value = 1.8;
            state.limiter.threshold.value = -3;
            state.limiter.knee.value = 1;
            state.limiter.ratio.value = 20;
            state.limiter.attack.value = .002;
            state.limiter.release.value = .1;
            state.reverbGain.gain.value = .1;

            const impulseLength = Math.floor(context.sampleRate * 1.7);
            const impulse = context.createBuffer(2, impulseLength, context.sampleRate);
            for (let channel = 0; channel < 2; channel += 1) {
                const data = impulse.getChannelData(channel);
                for (let index = 0; index < data.length; index += 1) {
                    data[index] = (Math.random() * 2 - 1) * Math.pow(1 - index / data.length, 2.8);
                }
            }
            state.reverb.buffer = impulse;
            const noiseLength = Math.floor(context.sampleRate * 2.4);
            state.noiseBuffer = context.createBuffer(1, noiseLength, context.sampleRate);
            const noise = state.noiseBuffer.getChannelData(0);
            for (let index = 0; index < noise.length; index += 1) noise[index] = Math.random() * 2 - 1;

            state.reverb.connect(state.reverbGain).connect(state.compressor);
            state.compressor.connect(state.masterLowShelf).connect(state.masterPresence).connect(state.limiter).connect(state.masterGain).connect(context.destination);
        }
        if (state.audioContext.state === "suspended") state.audioContext.resume();
        elements.audioButton.classList.add("ready");
        return state.audioContext;
    }

    function connectToMix(source, reverbAmount) {
        if (!source || !state.audioContext) return;
        source.connect(state.compressor);
        if (reverbAmount) {
            const send = state.audioContext.createGain();
            send.gain.value = reverbAmount;
            source.connect(send).connect(state.reverb);
        }
    }

    function connectFastToMix(source, reverbAmount) {
        if (!source || !state.audioContext) return;
        source.connect(state.masterGain);
        if (reverbAmount) {
            const send = state.audioContext.createGain();
            send.gain.value = reverbAmount;
            source.connect(send).connect(state.reverb);
        }
    }

    function loadPianoSamples() {
        const context = ensureAudio();
        if (!context) return Promise.reject(new Error("AudioContext unavailable"));
        if (state.pianoSamples.size === PIANO_SAMPLES.length) return Promise.resolve(state.pianoSamples);
        if (state.pianoLoading) return state.pianoLoading;
        state.pianoLoading = Promise.all(PIANO_SAMPLES.map(function (sample) {
            return fetch("../music-studio/assets/piano/" + sample.file)
                .then(function (response) { if (!response.ok) throw new Error(sample.file); return response.arrayBuffer(); })
                .then(function (data) { return context.decodeAudioData(data); })
                .then(function (buffer) { state.pianoSamples.set(sample.midi, buffer); });
        })).then(function () { return state.pianoSamples; }).catch(function (error) {
            state.pianoLoading = null;
            throw error;
        });
        return state.pianoLoading;
    }

    function nearestPianoSample(midi) {
        return PIANO_SAMPLES.reduce(function (nearest, sample) {
            return Math.abs(sample.midi - midi) < Math.abs(nearest.midi - midi) ? sample : nearest;
        }, PIANO_SAMPLES[0]);
    }

    function releasePianoVoice(voice, quick) {
        if (!voice || voice.released || !state.audioContext) return;
        voice.released = true;
        const now = state.audioContext.currentTime;
        const release = quick ? .08 : .86;
        if (typeof voice.gain.gain.cancelAndHoldAtTime === "function") voice.gain.gain.cancelAndHoldAtTime(now);
        else voice.gain.gain.cancelScheduledValues(now);
        voice.gain.gain.setTargetAtTime(.0001, now, release / 5);
        window.setTimeout(function () { try { voice.source.stop(); } catch (error) {} }, Math.ceil(release * 1200));
    }

    function samplePianoNoteOn(midi, velocity) {
        const context = ensureAudio();
        const sample = nearestPianoSample(midi);
        const buffer = state.pianoSamples.get(sample.midi);
        if (!context || !buffer) return false;
        const existing = state.pianoVoices.get(midi);
        if (existing) releasePianoVoice(existing, true);
        const source = context.createBufferSource();
        const gain = context.createGain();
        const panner = typeof context.createStereoPanner === "function" ? context.createStereoPanner() : null;
        const peak = Math.min(.62, Math.max(.16, velocity * .58));
        const now = context.currentTime;
        source.buffer = buffer;
        source.playbackRate.value = Math.pow(2, (midi - sample.midi) / 12);
        gain.gain.setValueAtTime(.0001, now);
        gain.gain.exponentialRampToValueAtTime(peak, now + .004);
        gain.gain.exponentialRampToValueAtTime(peak * .82, now + .18);
        source.connect(gain);
        if (panner) {
            panner.pan.value = Math.max(-.32, Math.min(.32, (midi - 60) / 80));
            gain.connect(panner);
            connectToMix(panner, .12);
        } else connectToMix(gain, .12);
        const voice = { source, gain, released: false, held: false };
        state.pianoVoices.set(midi, voice);
        source.onended = function () { if (state.pianoVoices.get(midi) === voice) state.pianoVoices.delete(midi); };
        source.start(now, Math.min(.012, Math.max(0, buffer.duration - .01)));
        return true;
    }

    function fallbackPiano(midi, velocity) {
        const context = ensureAudio();
        if (!context) return;
        const now = context.currentTime;
        const output = context.createGain();
        const filter = context.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 4600;
        output.gain.setValueAtTime(Math.max(.04, velocity * .18), now);
        output.gain.exponentialRampToValueAtTime(.0001, now + 1.5);
        [1, 2.01, 3.98].forEach(function (ratio, index) {
            const oscillator = context.createOscillator();
            const partial = context.createGain();
            oscillator.type = index ? "sine" : "triangle";
            oscillator.frequency.value = core.midiToFrequency(midi) * ratio;
            partial.gain.value = [1, .22, .07][index];
            oscillator.connect(partial).connect(filter);
            oscillator.start(now);
            oscillator.stop(now + 1.55);
        });
        filter.connect(output);
        connectToMix(output, .08);
    }

    function pianoNoteOn(midi, velocity) {
        if (samplePianoNoteOn(midi, velocity)) return;
        fallbackPiano(midi, velocity);
        loadPianoSamples().catch(function () { showToast("피아노 음원을 불러오지 못했어요."); });
    }

    function pianoNoteOff(midi) {
        const voice = state.pianoVoices.get(midi);
        if (!voice) return;
        if (state.sustain) voice.held = true;
        else releasePianoVoice(voice, false);
    }

    function makeDriveCurve(amount) {
        const samples = 1024;
        const curve = new Float32Array(samples);
        const shape = 1 + amount * 18;
        for (let index = 0; index < samples; index += 1) {
            const x = index * 2 / (samples - 1) - 1;
            curve[index] = Math.tanh(x * shape) / Math.tanh(shape);
        }
        return curve;
    }

    function updateStringChain() {
        if (!state.stringNode) return;
        const context = state.audioContext;
        const tone = Number(elements.toneSlider.value) / 100;
        const drive = Number(elements.driveSlider.value) / 100;
        const bass = state.instrument === "bass";
        state.stringTone.frequency.setTargetAtTime(bass ? 700 + tone * 4300 : 1200 + tone * 7200, context.currentTime, .025);
        state.stringBody.frequency.setTargetAtTime(bass ? 145 : 235, context.currentTime, .025);
        state.stringBody.gain.setTargetAtTime(bass ? 4.2 : 3.1, context.currentTime, .025);
        state.stringPreGain.gain.setTargetAtTime(1 + drive * 1.8, context.currentTime, .025);
        state.stringDrive.curve = makeDriveCurve(drive);
        state.stringOutput.gain.setTargetAtTime(1 - drive * .22, context.currentTime, .025);
        state.stringNode.port.postMessage({ type: "model", model: bass ? "bass" : "guitar" });
    }

    function loadInstrumentWorklet() {
        const context = ensureAudio();
        if (!context) return Promise.reject(new Error("AudioContext unavailable"));
        if (!context.audioWorklet || typeof window.AudioWorkletNode !== "function") return Promise.reject(new Error("AudioWorklet unavailable"));
        if (!state.workletModuleLoading) {
            state.workletModuleLoading = context.audioWorklet.addModule("instrument-worklet-v2.js?v=20260824-fast-adsr");
        }
        return state.workletModuleLoading;
    }

    function ensureStringEngine() {
        const context = ensureAudio();
        if (!context) return Promise.reject(new Error("AudioContext unavailable"));
        if (state.stringNode) return Promise.resolve(state.stringNode);
        if (state.stringUnavailable) return Promise.resolve(null);
        if (state.stringLoading) return state.stringLoading;
        if (!context.audioWorklet || typeof window.AudioWorkletNode !== "function") {
            state.stringUnavailable = true;
            return Promise.resolve(null);
        }
        state.stringLoading = loadInstrumentWorklet().then(function () {
            state.stringNode = new AudioWorkletNode(context, "resonant-string-processor", { outputChannelCount: [2] });
            state.stringPreGain = context.createGain();
            state.stringTone = context.createBiquadFilter();
            state.stringBody = context.createBiquadFilter();
            state.stringDrive = context.createWaveShaper();
            state.stringOutput = context.createGain();
            state.stringTone.type = "lowpass";
            state.stringTone.Q.value = .58;
            state.stringBody.type = "peaking";
            state.stringBody.Q.value = 1.1;
            state.stringDrive.oversample = "2x";
            state.stringNode.connect(state.stringPreGain).connect(state.stringTone).connect(state.stringBody).connect(state.stringDrive).connect(state.stringOutput);
            connectFastToMix(state.stringOutput, state.instrument === "bass" ? .025 : .06);
            updateStringChain();
            return state.stringNode;
        }).catch(function () {
            state.stringUnavailable = true;
            state.stringLoading = null;
            return null;
        });
        return state.stringLoading;
    }

    function ensureDrumEngine() {
        const context = ensureAudio();
        if (!context) return Promise.reject(new Error("AudioContext unavailable"));
        if (state.drumNode) return Promise.resolve(state.drumNode);
        if (state.drumUnavailable) return Promise.resolve(null);
        if (state.drumLoading) return state.drumLoading;
        if (!context.audioWorklet || typeof window.AudioWorkletNode !== "function") {
            state.drumUnavailable = true;
            return Promise.resolve(null);
        }
        state.drumLoading = loadInstrumentWorklet().then(function () {
            state.drumNode = new AudioWorkletNode(context, "resonant-drum-processor", { outputChannelCount: [2] });
            connectFastToMix(state.drumNode, .045);
            return state.drumNode;
        }).catch(function () {
            state.drumUnavailable = true;
            state.drumLoading = null;
            return null;
        });
        return state.drumLoading;
    }

    function currentStringParams() {
        return {
            articulation: state.articulation,
            tone: Number(elements.toneSlider.value) / 100,
            mute: Number(elements.muteSlider.value) / 100,
            pickPosition: Number(elements.pickSlider.value) / 100
        };
    }

    function fallbackStringNote(midi, velocity, model, when) {
        const context = ensureAudio();
        if (!context) return;
        const start = Math.max(context.currentTime, when || 0);
        const output = context.createGain();
        const filter = context.createBiquadFilter();
        const oscillator = context.createOscillator();
        const overtone = context.createOscillator();
        oscillator.type = "sawtooth";
        overtone.type = "triangle";
        oscillator.frequency.value = core.midiToFrequency(midi);
        overtone.frequency.value = core.midiToFrequency(midi) * 2.005;
        filter.type = "lowpass";
        filter.frequency.value = model === "bass" ? 1900 : 3600;
        output.gain.setValueAtTime(.0001, start);
        output.gain.exponentialRampToValueAtTime(velocity * .24, start + .00012);
        output.gain.exponentialRampToValueAtTime(.0001, start + (model === "bass" ? 2.4 : 1.35));
        oscillator.connect(filter); overtone.connect(filter); filter.connect(output); connectToMix(output, .04);
        oscillator.start(start); overtone.start(start); oscillator.stop(start + 2.5); overtone.stop(start + 2.5);
    }

    function playImmediateStringExcitation(midi, velocity, model, when) {
        const context = ensureAudio();
        if (!context || !state.noiseBuffer) return;
        const start = Math.max(context.currentTime, when || context.currentTime);
        const source = createNoiseSource();
        const filter = context.createBiquadFilter();
        const gain = context.createGain();
        filter.type = "bandpass";
        filter.frequency.value = (model === "bass" ? 950 : 2100) + core.midiToFrequency(midi) * 2.2;
        filter.Q.value = model === "bass" ? .72 : 1.05;
        gain.gain.setValueAtTime(.0001, start);
        gain.gain.exponentialRampToValueAtTime(Math.max(.008, velocity * (model === "bass" ? .052 : .044)), start + .00012);
        gain.gain.exponentialRampToValueAtTime(.0001, start + (model === "bass" ? .016 : .012));
        source.connect(filter).connect(gain).connect(state.masterGain);
        source.start(start, Math.random() * Math.max(.01, state.noiseBuffer.duration - .04), .024);
    }

    function stringNoteOn(midi, velocity, when) {
        const model = state.instrument === "bass" ? "bass" : "guitar";
        const sendNote = function (node) {
            node.port.postMessage({
                type: "noteOn", note: midi, frequency: core.midiToFrequency(midi), velocity,
                model, params: currentStringParams(), time: when || state.audioContext.currentTime
            });
        };
        playImmediateStringExcitation(midi, velocity, model, when);
        if (state.stringNode) {
            sendNote(state.stringNode);
            return;
        }
        ensureStringEngine().then(function (node) {
            if (!node) {
                fallbackStringNote(midi, velocity, model, when);
                return;
            }
            if (!state.activeNotes.has(midi) && !when) return;
            sendNote(node);
        });
    }

    function stringNoteOff(midi) {
        if (state.stringNode) state.stringNode.port.postMessage({ type: "noteOff", note: midi });
    }

    function createNoiseSource() {
        const source = state.audioContext.createBufferSource();
        source.buffer = state.noiseBuffer;
        return source;
    }

    function modalTone(frequency, decay, level, velocity, start, sweep) {
        const context = state.audioContext;
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(frequency * (sweep || 1), start);
        oscillator.frequency.exponentialRampToValueAtTime(frequency, start + Math.min(.09, decay * .35));
        gain.gain.setValueAtTime(Math.max(.0001, level * velocity), start);
        gain.gain.exponentialRampToValueAtTime(.0001, start + decay);
        oscillator.connect(gain);
        connectToMix(gain, .025);
        oscillator.start(start);
        oscillator.stop(start + decay + .04);
    }

    function metalModes(base, decay, velocity, start) {
        [1, 1.342, 1.815, 2.487, 3.116, 4.23].forEach(function (ratio, index) {
            const oscillator = state.audioContext.createOscillator();
            const gain = state.audioContext.createGain();
            oscillator.type = index % 2 ? "square" : "triangle";
            oscillator.frequency.value = base * ratio;
            gain.gain.setValueAtTime(velocity * (.032 / (1 + index * .22)), start);
            gain.gain.exponentialRampToValueAtTime(.0001, start + decay * (1 + index * .05));
            oscillator.connect(gain);
            connectToMix(gain, decay > .5 ? .08 : .02);
            oscillator.start(start);
            oscillator.stop(start + decay * 1.3);
        });
    }

    function noiseBurst(decay, velocity, highpass, start, reverbAmount) {
        const context = state.audioContext;
        const source = createNoiseSource();
        const filter = context.createBiquadFilter();
        const gain = context.createGain();
        filter.type = "highpass";
        filter.frequency.value = highpass;
        gain.gain.setValueAtTime(Math.max(.0001, velocity * .22), start);
        gain.gain.exponentialRampToValueAtTime(.0001, start + decay);
        source.connect(filter).connect(gain);
        connectToMix(gain, reverbAmount || 0);
        source.start(start, 0, Math.min(decay + .05, state.noiseBuffer.duration));
    }

    function triggerDrum(id, velocity) {
        const context = ensureAudio();
        if (!context) return;
        const now = context.currentTime;
        const resonance = Number(elements.drumResonanceSlider.value) / 100;
        const tone = Number(elements.drumToneSlider.value) / 100;
        const scale = .65 + resonance * .75;
        if (id === "kick") {
            modalTone(48, .62 * scale, .82, velocity, now, 3.4);
            modalTone(79, .22 * scale, .19, velocity, now, 1.4);
        } else if (id === "snare") {
            modalTone(184, .28 * scale, .25, velocity, now, 1.15);
            modalTone(331, .19 * scale, .12, velocity, now, 1);
            noiseBurst(.24 * scale, velocity, 900 + tone * 900, now, .045);
        } else if (id === "hat" || id === "openhat") {
            const decay = (id === "hat" ? .11 : .72) * scale;
            metalModes(2950 + tone * 900, decay, velocity, now);
            noiseBurst(decay * .72, velocity * .65, 5200 + tone * 1800, now, id === "openhat" ? .05 : .01);
        } else if (id === "lowtom" || id === "hightom") {
            const base = id === "lowtom" ? 92 : 142;
            modalTone(base, .58 * scale, .58, velocity, now, 1.58);
            modalTone(base * 1.47, .31 * scale, .15, velocity, now, 1.12);
        } else {
            const crash = id === "crash";
            const decay = (crash ? 1.35 : 1.05) * scale;
            metalModes(crash ? 620 : 760, decay, velocity, now);
            noiseBurst(decay * .82, velocity * .48, 3300 + tone * 1200, now, .11);
            if (!crash) modalTone(2250, .55 * scale, .08, velocity, now, 1);
        }
        noteActivity(id, velocity);
    }

    function playImmediateDrumExcitation(id, velocity, when) {
        const context = ensureAudio();
        if (!context || !state.noiseBuffer) return;
        const start = Math.max(context.currentTime, when || context.currentTime);
        const source = createNoiseSource();
        const filter = context.createBiquadFilter();
        const gain = context.createGain();
        const low = id === "kick" || id === "lowtom" || id === "hightom";
        filter.type = low ? "lowpass" : "highpass";
        filter.frequency.value = low ? (id === "kick" ? 1250 : 1900) : 2400;
        gain.gain.setValueAtTime(.0001, start);
        gain.gain.exponentialRampToValueAtTime(Math.max(.01, velocity * (low ? .065 : .052)), start + .0001);
        gain.gain.exponentialRampToValueAtTime(.0001, start + (low ? .014 : .009));
        source.connect(filter).connect(gain).connect(state.masterGain);
        source.start(start, Math.random() * Math.max(.01, state.noiseBuffer.duration - .03), .02);
    }

    function triggerDrumV2(id, velocity) {
        const context = ensureAudio();
        if (!context) return;
        playImmediateDrumExcitation(id, velocity, context.currentTime);
        const resonance = Number(elements.drumResonanceSlider.value) / 100;
        const tone = Number(elements.drumToneSlider.value) / 100;
        if (state.drumNode) {
            state.drumNode.port.postMessage({ type: "hit", id, velocity, resonance, tone, time: context.currentTime });
            noteActivity(id, velocity);
            return;
        }
        ensureDrumEngine().then(function (node) {
            if (!node) {
                triggerDrum(id, velocity);
                return;
            }
            node.port.postMessage({ type: "hit", id, velocity, resonance, tone, time: context.currentTime });
        });
        noteActivity(id, velocity);
    }

    function setSustain(on, latched) {
        state.sustain = Boolean(on);
        if (typeof latched === "boolean") state.sustainLatched = latched;
        elements.sustainButton.classList.toggle("active", state.sustain);
        elements.sustainButton.setAttribute("aria-pressed", String(state.sustain));
        if (!state.sustain) {
            state.pianoVoices.forEach(function (voice) { if (voice.held) releasePianoVoice(voice, false); });
        }
    }

    function noteActivity(label, velocity, midi) {
        state.visualEnergy = Math.max(state.visualEnergy, velocity || .7);
        if (Number.isFinite(midi)) state.visualPitch = midi;
        elements.noteReadout.textContent = Number.isFinite(midi) ? core.noteLabel(midi) : String(label);
    }

    function noteOn(midi, velocity) {
        if (state.activeNotes.has(midi)) return;
        state.activeNotes.add(midi);
        const key = elements.keyboard.querySelector('[data-midi="' + midi + '"]');
        if (key) key.classList.add("active");
        if (state.instrument === "piano") pianoNoteOn(midi, velocity);
        else stringNoteOn(midi, velocity);
        noteActivity(core.noteLabel(midi), velocity, midi);
    }

    function noteOff(midi) {
        state.activeNotes.delete(midi);
        const key = elements.keyboard.querySelector('[data-midi="' + midi + '"]');
        if (key) key.classList.remove("active");
        if (state.instrument === "piano") pianoNoteOff(midi);
        else stringNoteOff(midi);
    }

    function allNotesOff() {
        Array.from(state.activeNotes).forEach(noteOff);
        state.activeNotes.clear();
        state.pointerNotes.clear();
        state.pressedCodes.clear();
        state.pianoVoices.forEach(function (voice) { releasePianoVoice(voice, true); });
        if (state.stringNode) state.stringNode.port.postMessage({ type: "allOff" });
        if (state.drumNode) state.drumNode.port.postMessage({ type: "allOff" });
        document.querySelectorAll(".key.active,.drum-pad.active").forEach(function (item) { item.classList.remove("active"); });
    }

    function pointerVelocity(event, key) {
        const rect = key.getBoundingClientRect();
        const relativeY = (event.clientY - rect.top) / Math.max(1, rect.height);
        return event.pressure > .05 ? Math.max(.38, event.pressure) : core.pointerVelocity(relativeY);
    }

    function movePointerToKey(event) {
        if (!state.pointerNotes.has(event.pointerId)) return;
        const hit = document.elementFromPoint(event.clientX, event.clientY);
        const key = hit && hit.closest ? hit.closest(".key") : null;
        if (!key || !elements.keyboard.contains(key)) return;
        const nextMidi = Number(key.dataset.midi);
        const previousMidi = state.pointerNotes.get(event.pointerId);
        if (nextMidi === previousMidi) return;
        noteOff(previousMidi);
        state.pointerNotes.set(event.pointerId, nextMidi);
        noteOn(nextMidi, pointerVelocity(event, key));
    }

    function releasePointer(event) {
        if (!state.pointerNotes.has(event.pointerId)) return;
        noteOff(state.pointerNotes.get(event.pointerId));
        state.pointerNotes.delete(event.pointerId);
    }

    function renderKeyboard() {
        const instrument = state.instrument === "guitar" ? "guitar" : state.instrument;
        const range = core.getInstrumentRange(instrument);
        const layout = core.keyboardLayout(range.start, range.end);
        const whiteWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--key-width")) || 48;
        const blackWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--black-width")) || 31;
        const shortcutByMidi = new Map(COMPUTER_KEYS.map(function (entry) { return [state.keyboardOctave * 12 + entry[1], entry[2]]; }));
        elements.keyboard.innerHTML = "";
        elements.keyboard.style.width = (layout.whiteCount * whiteWidth) + "px";
        layout.notes.forEach(function (note) {
            const key = document.createElement("button");
            key.type = "button";
            key.className = "key " + (note.black ? "black-key" : "white-key") + (note.midi % 12 === 0 ? " c-note" : "");
            key.dataset.midi = note.midi;
            key.dataset.shortcut = shortcutByMidi.get(note.midi) || "";
            key.setAttribute("aria-label", note.label);
            key.style.left = note.black ? ((note.whiteIndex + 1) * whiteWidth - blackWidth / 2) + "px" : (note.whiteIndex * whiteWidth) + "px";
            key.addEventListener("pointerdown", function (event) {
                event.preventDefault();
                key.setPointerCapture(event.pointerId);
                state.pointerNotes.set(event.pointerId, note.midi);
                noteOn(note.midi, pointerVelocity(event, key));
            });
            key.addEventListener("pointermove", movePointerToKey);
            key.addEventListener("pointerup", releasePointer);
            key.addEventListener("pointercancel", releasePointer);
            key.addEventListener("lostpointercapture", releasePointer);
            elements.keyboard.appendChild(key);
        });
        elements.octaveReadout.textContent = state.keyboardOctave;
        window.requestAnimationFrame(centerKeyboardOnComputerOctave);
    }

    function centerKeyboardOnComputerOctave() {
        const target = elements.keyboard.querySelector('[data-midi="' + (state.keyboardOctave * 12) + '"]');
        if (!target) return;
        const desired = target.offsetLeft - elements.keyboardViewport.clientWidth * .18;
        elements.keyboardViewport.scrollLeft = Math.max(0, desired);
    }

    function renderChordPads() {
        elements.chordPads.innerHTML = "";
        Object.keys(core.GUITAR_CHORDS).forEach(function (name) {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = name;
            button.classList.toggle("active", name === state.guitarChord);
            button.setAttribute("aria-pressed", String(name === state.guitarChord));
            button.addEventListener("pointerdown", function (event) {
                event.preventDefault();
                state.guitarChord = name;
                strum("down");
                renderChordPads();
            });
            elements.chordPads.appendChild(button);
        });
    }

    function strum(direction) {
        const context = ensureAudio();
        if (!context) return;
        const notes = core.getStrumOrder(core.getGuitarChord(state.guitarChord), direction);
        const start = context.currentTime;
        notes.forEach(function (midi, index) {
            const when = start + index * (direction === "down" ? .009 : .008);
            state.activeNotes.add(midi);
            stringNoteOn(midi, .7 + index * .035, when);
            window.setTimeout(function () { state.activeNotes.delete(midi); }, 1300 + index * 24);
        });
        noteActivity(state.guitarChord + " · " + (direction === "down" ? "다운" : "업"), .88, notes[0]);
    }

    function renderDrumPads() {
        elements.drumPads.innerHTML = "";
        DRUMS.forEach(function (drum) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "drum-pad";
            button.dataset.drum = drum.id;
            button.style.setProperty("--pad-color", drum.color);
            button.innerHTML = "<span>" + drum.family + "</span><b>" + drum.name + "</b><small>키보드 " + drum.key + "</small>";
            button.addEventListener("pointerdown", function (event) {
                event.preventDefault();
                button.classList.add("active");
                const rect = button.getBoundingClientRect();
                const velocity = event.pressure > .05 ? Math.max(.4, event.pressure) : core.pointerVelocity((event.clientY - rect.top) / rect.height);
                triggerDrumV2(drum.id, velocity);
            });
            ["pointerup", "pointercancel", "pointerleave"].forEach(function (type) { button.addEventListener(type, function () { button.classList.remove("active"); }); });
            elements.drumPads.appendChild(button);
        });
    }

    function renderArticulations() {
        const options = state.instrument === "bass"
            ? [["finger", "핑거"], ["pick", "피크"], ["slap", "슬랩"], ["mute", "뮤트"]]
            : [["pick", "피크"], ["finger", "핑거"], ["mute", "뮤트"], ["harmonic", "하모닉"]];
        if (!options.some(function (item) { return item[0] === state.articulation; })) state.articulation = options[0][0];
        elements.articulationButtons.innerHTML = "";
        options.forEach(function (option) {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = option[1];
            button.classList.toggle("active", option[0] === state.articulation);
            button.addEventListener("click", function () { state.articulation = option[0]; renderArticulations(); });
            elements.articulationButtons.appendChild(button);
        });
    }

    function updatePlaySurface() {
        const drums = state.instrument === "drums";
        const chords = state.instrument === "guitar" && state.guitarMode === "chords";
        elements.keyboardViewport.classList.toggle("hidden", drums || chords);
        elements.chordSurface.classList.toggle("hidden", !chords);
        elements.drumPads.classList.toggle("hidden", !drums);
        elements.drumPads.style.display = drums ? "grid" : "";
        elements.octaveControls.classList.toggle("hidden", drums || chords);
        elements.inputHint.textContent = drums ? "패드 또는 A–K 키로 연주" : chords ? "코드를 고른 뒤 스트로크" : "화면 건반 또는 A–K 키로 연주";
    }

    function selectInstrument(instrument) {
        allNotesOff();
        state.instrument = instrument;
        const copy = INSTRUMENT_COPY[instrument];
        elements.modelBadge.textContent = copy.badge;
        elements.instrumentName.textContent = copy.name;
        elements.instrumentDescription.textContent = copy.description;
        elements.visualFamily.textContent = copy.family;
        elements.visualModel.textContent = copy.model;
        document.querySelectorAll("[data-instrument]").forEach(function (button) {
            const active = button.dataset.instrument === instrument;
            button.classList.toggle("active", active);
            button.setAttribute("aria-selected", String(active));
        });
        elements.pianoControls.classList.toggle("hidden", instrument !== "piano");
        elements.stringControls.classList.toggle("hidden", instrument !== "bass" && instrument !== "guitar");
        elements.drumControls.classList.toggle("hidden", instrument !== "drums");
        elements.guitarModeSwitch.classList.toggle("hidden", instrument !== "guitar");
        if (instrument === "bass") {
            state.keyboardOctave = 2;
            state.articulation = "finger";
            elements.toneSlider.value = 58; elements.muteSlider.value = 8; elements.pickSlider.value = 34; elements.driveSlider.value = 6;
        } else if (instrument === "guitar") {
            state.keyboardOctave = 3;
            state.articulation = "pick";
            elements.toneSlider.value = 69; elements.muteSlider.value = 5; elements.pickSlider.value = 24; elements.driveSlider.value = 12;
        } else if (instrument === "piano") state.keyboardOctave = 4;
        renderArticulations();
        syncRangeOutputs();
        if (instrument !== "drums") renderKeyboard();
        updatePlaySurface();
        updateStringChain();
        if (instrument === "bass" || instrument === "guitar") ensureStringEngine();
        else if (instrument === "drums") ensureDrumEngine();
        elements.noteReadout.textContent = "준비됨";
    }

    function syncRangeOutputs() {
        elements.toneOutput.value = elements.toneSlider.value;
        elements.toneOutput.textContent = elements.toneSlider.value;
        elements.muteOutput.value = elements.muteSlider.value;
        elements.muteOutput.textContent = elements.muteSlider.value;
        elements.pickOutput.value = elements.pickSlider.value;
        elements.pickOutput.textContent = elements.pickSlider.value;
        elements.driveOutput.value = elements.driveSlider.value;
        elements.driveOutput.textContent = elements.driveSlider.value;
        elements.drumResonanceOutput.value = elements.drumResonanceSlider.value;
        elements.drumResonanceOutput.textContent = elements.drumResonanceSlider.value;
        elements.drumToneOutput.value = elements.drumToneSlider.value;
        elements.drumToneOutput.textContent = elements.drumToneSlider.value;
        updateStringChain();
    }

    function setGuitarMode(mode) {
        allNotesOff();
        state.guitarMode = mode;
        document.querySelectorAll("[data-guitar-mode]").forEach(function (button) {
            button.classList.toggle("active", button.dataset.guitarMode === mode);
        });
        updatePlaySurface();
    }

    function handleComputerKeyDown(event) {
        if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
        const tag = event.target && event.target.tagName;
        if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
        if (event.code === "Space" && state.instrument === "piano") {
            event.preventDefault();
            setSustain(true);
            return;
        }
        if (state.instrument === "drums") {
            const drum = DRUMS.find(function (item) { return item.code === event.code; });
            if (!drum) return;
            event.preventDefault();
            triggerDrumV2(drum.id, .82);
            const pad = elements.drumPads.querySelector('[data-drum="' + drum.id + '"]');
            if (pad) pad.classList.add("active");
            state.pressedCodes.set(event.code, drum.id);
            return;
        }
        if (state.instrument === "guitar" && state.guitarMode === "chords") return;
        const mapping = COMPUTER_KEYS.find(function (item) { return item[0] === event.code; });
        if (!mapping) return;
        event.preventDefault();
        const midi = state.keyboardOctave * 12 + mapping[1];
        state.pressedCodes.set(event.code, midi);
        noteOn(midi, .78);
    }

    function handleComputerKeyUp(event) {
        if (event.code === "Space" && state.instrument === "piano") {
            if (!state.sustainLatched) setSustain(false);
            return;
        }
        if (!state.pressedCodes.has(event.code)) return;
        const value = state.pressedCodes.get(event.code);
        state.pressedCodes.delete(event.code);
        if (state.instrument === "drums") {
            const pad = elements.drumPads.querySelector('[data-drum="' + value + '"]');
            if (pad) pad.classList.remove("active");
        } else noteOff(value);
    }

    function bindEvents() {
        elements.audioButton.addEventListener("click", function () {
            ensureAudio();
            elements.audioButton.textContent = "준비 중…";
            const tasks = [loadPianoSamples(), ensureStringEngine(), ensureDrumEngine()];
            Promise.all(tasks).then(function () {
                elements.audioButton.innerHTML = '<span aria-hidden="true">●</span> 소리 준비됨';
                elements.audioButton.classList.add("ready");
                showToast("소리가 준비됐어요.");
            }).catch(function () { elements.audioButton.textContent = "소리 다시 켜기"; });
        });
        document.querySelectorAll("[data-instrument]").forEach(function (button) {
            button.addEventListener("click", function () { selectInstrument(button.dataset.instrument); });
        });
        document.querySelectorAll("[data-guitar-mode]").forEach(function (button) {
            button.addEventListener("click", function () { setGuitarMode(button.dataset.guitarMode); });
        });
        document.querySelectorAll("[data-strum]").forEach(function (button) {
            button.addEventListener("pointerdown", function (event) { event.preventDefault(); strum(button.dataset.strum); });
        });
        elements.sustainButton.addEventListener("click", function () { setSustain(!state.sustain, !state.sustain); });
        [elements.toneSlider, elements.muteSlider, elements.pickSlider, elements.driveSlider, elements.drumResonanceSlider, elements.drumToneSlider]
            .forEach(function (slider) { slider.addEventListener("input", syncRangeOutputs); });
        elements.octaveDown.addEventListener("click", function () { state.keyboardOctave = Math.max(2, state.keyboardOctave - 1); renderKeyboard(); });
        elements.octaveUp.addEventListener("click", function () { state.keyboardOctave = Math.min(6, state.keyboardOctave + 1); renderKeyboard(); });
        document.addEventListener("keydown", handleComputerKeyDown);
        document.addEventListener("keyup", handleComputerKeyUp);
        window.addEventListener("blur", allNotesOff);
        document.addEventListener("visibilitychange", function () { if (document.hidden) allNotesOff(); });
        window.addEventListener("resize", function () { if (state.instrument !== "drums") renderKeyboard(); });
    }

    function animateVisual() {
        const canvas = elements.stringCanvas;
        const rect = canvas.getBoundingClientRect();
        const ratio = Math.min(2, window.devicePixelRatio || 1);
        const width = Math.max(1, Math.floor(rect.width * ratio));
        const height = Math.max(1, Math.floor(rect.height * ratio));
        if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, width, height);
        context.save();
        context.scale(ratio, ratio);
        const cssWidth = width / ratio;
        const cssHeight = height / ratio;
        const lines = state.instrument === "bass" ? 4 : state.instrument === "guitar" ? 6 : state.instrument === "drums" ? 3 : 9;
        const centerY = cssHeight / 2;
        for (let line = 0; line < lines; line += 1) {
            const y = centerY + (line - (lines - 1) / 2) * (state.instrument === "piano" ? 8 : 15);
            context.beginPath();
            for (let x = 0; x <= cssWidth; x += 8) {
                const envelope = Math.sin(Math.PI * x / cssWidth);
                const wave = Math.sin(x * (.045 + line * .004) + performance.now() * .018 + line) * state.visualEnergy * envelope * (5 + line * .35);
                if (x === 0) context.moveTo(x, y + wave); else context.lineTo(x, y + wave);
            }
            context.strokeStyle = line % 2 ? "rgba(229,255,117,.36)" : "rgba(142,240,198,.42)";
            context.lineWidth = line === 0 ? 1.5 : 1;
            context.stroke();
        }
        context.restore();
        state.visualEnergy *= .962;
        const meterBars = document.querySelectorAll(".signal-meter i");
        meterBars.forEach(function (bar, index) {
            const live = state.visualEnergy * 9 > index;
            bar.classList.toggle("live", live);
            bar.style.height = live ? (8 + index * 2) + "px" : "6px";
        });
        window.requestAnimationFrame(animateVisual);
    }

    function init() {
        cacheElements();
        renderChordPads();
        renderDrumPads();
        bindEvents();
        selectInstrument("piano");
        animateVisual();
    }

    document.addEventListener("DOMContentLoaded", init);
})();
