(function () {
    "use strict";

    const samples = [
        [36, "C2.ogg"], [42, "Fs2.ogg"], [48, "C3.ogg"], [54, "Fs3.ogg"],
        [60, "C4.ogg"], [66, "Fs4.ogg"], [72, "C5.ogg"], [78, "Fs5.ogg"], [84, "C6.ogg"]
    ];
    let context;
    let output;
    let mixInput;
    let loading;
    const buffers = new Map();

    function audioContext() {
        if (!context) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) throw new Error("이 브라우저는 오디오 재생을 지원하지 않습니다.");
            context = new AudioContextClass({ latencyHint: "interactive" });
            const compressor = context.createDynamicsCompressor();
            output = context.createGain();
            output.gain.value = .78;
            compressor.threshold.value = -10;
            compressor.ratio.value = 8;
            compressor.attack.value = .003;
            compressor.release.value = .16;
            compressor.connect(output).connect(context.destination);
            mixInput = compressor;
        }
        if (context.state === "suspended") context.resume();
        return context;
    }

    function preload() {
        const ctx = audioContext();
        if (buffers.size === samples.length) return Promise.resolve();
        if (loading) return loading;
        loading = Promise.all(samples.map(function (sample) {
            return fetch("assets/piano/" + sample[1])
                .then(function (response) {
                    if (!response.ok) throw new Error("피아노 샘플을 불러오지 못했습니다.");
                    return response.arrayBuffer();
                })
                .then(function (data) { return ctx.decodeAudioData(data); })
                .then(function (buffer) { buffers.set(sample[0], buffer); });
        })).catch(function (error) {
            loading = null;
            throw error;
        });
        return loading;
    }

    function nearest(midi) {
        return samples.reduce(function (best, sample) {
            return Math.abs(sample[0] - midi) < Math.abs(best[0] - midi) ? sample : best;
        }, samples[0]);
    }

    function playLoaded(midi, when, duration, volume) {
        const ctx = audioContext();
        const base = nearest(midi);
        const buffer = buffers.get(base[0]);
        if (!buffer) throw new Error("피아노 샘플이 아직 준비되지 않았습니다.");
        const start = Math.max(ctx.currentTime, when || ctx.currentTime);
        const hold = Math.max(.16, duration || .7);
        const gain = ctx.createGain();
        const source = ctx.createBufferSource();
        const peak = Math.min(.18, Math.max(.025, volume || .1));
        source.buffer = buffer;
        source.playbackRate.value = Math.pow(2, (midi - base[0]) / 12);
        gain.gain.setValueAtTime(.0001, start);
        gain.gain.exponentialRampToValueAtTime(peak, start + .004);
        gain.gain.exponentialRampToValueAtTime(peak * .62, start + Math.min(.18, hold * .5));
        gain.gain.setValueAtTime(peak * .62, start + hold);
        gain.gain.exponentialRampToValueAtTime(.0001, start + hold + .28);
        source.connect(gain).connect(mixInput);
        source.start(start, .006);
        source.stop(start + hold + .31);
    }

    function playMidi(midi, options) {
        const settings = options || {};
        return preload().then(function () {
            playLoaded(midi, null, settings.duration || .72, settings.volume || .11);
        });
    }

    function playSequence(groups, beatSeconds) {
        return preload().then(function () {
            const ctx = audioContext();
            const start = ctx.currentTime + .06;
            groups.forEach(function (group, index) {
                const size = Math.max(1, group.length);
                const volume = Math.min(.13, .22 / Math.sqrt(size));
                group.forEach(function (midi) {
                    playLoaded(midi, start + index * beatSeconds, Math.max(.24, beatSeconds * .78), volume);
                });
            });
        });
    }

    window.PianoSampler = { preload: preload, playMidi: playMidi, playSequence: playSequence };
})();
