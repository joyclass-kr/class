/**
 * 2022 개정 교육과정 인체 생체역학·생리학 시뮬레이션 공통 엔진 코어
 * High-performance 60fps Loop, Touch Physics, Web Audio Synthesizer, Quiz Engine
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.SimEngine = factory();
    }
})(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    // ------------------------------------------------------------------------
    // Web Audio Synthesizer for Biomechanical Feedback
    // ------------------------------------------------------------------------
    var audioCtx = null;
    function getAudioContext() {
        if (!audioCtx) {
            var AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                audioCtx = new AudioContextClass();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    var SoundFX = {
        playHeartbeat: function (pitch) {
            try {
                var ctx = getAudioContext();
                if (!ctx) return;
                var now = ctx.currentTime;
                pitch = pitch || 1.0;

                // Lub (AV valve closure)
                var osc1 = ctx.createOscillator();
                var gain1 = ctx.createGain();
                osc1.type = 'sine';
                osc1.frequency.setValueAtTime(65 * pitch, now);
                osc1.frequency.exponentialRampToValueAtTime(30 * pitch, now + 0.12);
                gain1.gain.setValueAtTime(0.3, now);
                gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
                osc1.connect(gain1);
                gain1.connect(ctx.destination);
                osc1.start(now);
                osc1.stop(now + 0.13);

                // Dub (Semilunar valve closure)
                var osc2 = ctx.createOscillator();
                var gain2 = ctx.createGain();
                osc2.type = 'sine';
                osc2.frequency.setValueAtTime(95 * pitch, now + 0.15);
                osc2.frequency.exponentialRampToValueAtTime(45 * pitch, now + 0.25);
                gain2.gain.setValueAtTime(0.22, now + 0.15);
                gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
                osc2.connect(gain2);
                gain2.connect(ctx.destination);
                osc2.start(now + 0.15);
                osc2.stop(now + 0.26);
            } catch (e) {
                // Ignore audio errors on muted/restricted environments
            }
        },

        playBreath: function (isInhale) {
            try {
                var ctx = getAudioContext();
                if (!ctx) return;
                var now = ctx.currentTime;
                var bufferSize = ctx.sampleRate * 0.4;
                var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                var data = buffer.getChannelData(0);
                for (var i = 0; i < bufferSize; i++) {
                    data[i] = (Math.random() * 2 - 1) * 0.08;
                }
                var noise = ctx.createBufferSource();
                noise.buffer = buffer;

                var filter = ctx.createBiquadFilter();
                filter.type = 'bandpass';
                filter.frequency.setValueAtTime(isInhale ? 450 : 320, now);
                filter.Q.setValueAtTime(2.0, now);

                var gain = ctx.createGain();
                gain.gain.setValueAtTime(0.001, now);
                gain.gain.linearRampToValueAtTime(0.18, now + 0.15);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

                noise.connect(filter);
                filter.connect(gain);
                gain.connect(ctx.destination);
                noise.start(now);
                noise.stop(now + 0.41);
            } catch (e) {}
        },

        playClick: function () {
            try {
                var ctx = getAudioContext();
                if (!ctx) return;
                var now = ctx.currentTime;
                var osc = ctx.createOscillator();
                var gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);
                gain.gain.setValueAtTime(0.12, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.045);
            } catch (e) {}
        },

        playCorrect: function () {
            try {
                var ctx = getAudioContext();
                if (!ctx) return;
                var now = ctx.currentTime;
                [523.25, 659.25, 783.99, 1046.50].forEach(function (freq, idx) {
                    var osc = ctx.createOscillator();
                    var gain = ctx.createGain();
                    var startTime = now + idx * 0.07;
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, startTime);
                    gain.gain.setValueAtTime(0.15, startTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(startTime);
                    osc.stop(startTime + 0.26);
                });
            } catch (e) {}
        }
    };

    // ------------------------------------------------------------------------
    // HiDPI Canvas Manager
    // ------------------------------------------------------------------------
    function setupCanvas(canvas) {
        var ctx = canvas.getContext('2d');
        var dpr = window.devicePixelRatio || 1;
        var rect = canvas.getBoundingClientRect();
        
        var width = rect.width || canvas.clientWidth || 800;
        var height = rect.height || canvas.clientHeight || 600;

        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);

        return {
            ctx: ctx,
            width: width,
            height: height,
            dpr: dpr
        };
    }

    // ------------------------------------------------------------------------
    // Touch & Pointer Gesture Binder
    // ------------------------------------------------------------------------
    function bindDrag(element, onStart, onMove, onEnd) {
        var isDragging = false;
        var startX = 0, startY = 0;

        function getCoords(e) {
            if (e.touches && e.touches.length > 0) {
                var rect = element.getBoundingClientRect();
                return {
                    x: e.touches[0].clientX - rect.left,
                    y: e.touches[0].clientY - rect.top,
                    clientX: e.touches[0].clientX,
                    clientY: e.touches[0].clientY
                };
            }
            var rect = element.getBoundingClientRect();
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                clientX: e.clientX,
                clientY: e.clientY
            };
        }

        function handleStart(e) {
            isDragging = true;
            var pos = getCoords(e);
            startX = pos.x;
            startY = pos.y;
            if (onStart) onStart(pos, e);
        }

        function handleMove(e) {
            if (!isDragging) return;
            var pos = getCoords(e);
            if (onMove) onMove(pos, { dx: pos.x - startX, dy: pos.y - startY }, e);
        }

        function handleEnd(e) {
            if (!isDragging) return;
            isDragging = false;
            if (onEnd) onEnd(e);
        }

        element.addEventListener('mousedown', handleStart);
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleEnd);

        element.addEventListener('touchstart', function(e) {
            if (e.cancelable) e.preventDefault();
            handleStart(e);
        }, { passive: false });

        window.addEventListener('touchmove', function(e) {
            if (isDragging && e.cancelable) e.preventDefault();
            handleMove(e);
        }, { passive: false });

        window.addEventListener('touchend', handleEnd);
        window.addEventListener('touchcancel', handleEnd);
    }

    // ------------------------------------------------------------------------
    // Exam Quiz Component Helper
    // ------------------------------------------------------------------------
    function renderQuiz(containerEl, quizData, onAnswerCallback) {
        if (!containerEl || !quizData) return;
        
        var html = '<div class="sim-quiz-container">' +
            '<div class="sim-quiz-question">' + quizData.question + '</div>' +
            '<div class="sim-quiz-options">';
            
        quizData.options.forEach(function (opt, idx) {
            html += '<button class="sim-quiz-opt-btn" data-opt-idx="' + idx + '">' + (idx + 1) + '. ' + opt + '</button>';
        });
        
        html += '</div><div class="sim-quiz-explanation" style="display:none;"></div></div>';
        containerEl.innerHTML = html;

        var optBtns = containerEl.querySelectorAll('.sim-quiz-opt-btn');
        var expEl = containerEl.querySelector('.sim-quiz-explanation');

        optBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var selectedIdx = parseInt(btn.dataset.optIdx, 10);
                var isCorrect = (selectedIdx === quizData.answer);
                
                optBtns.forEach(function (b, bIdx) {
                    b.disabled = true;
                    if (bIdx === quizData.answer) {
                        b.classList.add('correct');
                    } else if (bIdx === selectedIdx && !isCorrect) {
                        b.classList.add('wrong');
                    }
                });

                expEl.style.display = 'block';
                expEl.innerHTML = '<strong>' + (isCorrect ? '✅ 정답입니다!' : '❌ 오답입니다.') + '</strong> ' + quizData.explanation;
                
                if (isCorrect) {
                    SoundFX.playCorrect();
                } else {
                    SoundFX.playClick();
                }

                if (onAnswerCallback) onAnswerCallback(isCorrect, selectedIdx);
            });
        });
    }

    return {
        SoundFX: SoundFX,
        setupCanvas: setupCanvas,
        bindDrag: bindDrag,
        renderQuiz: renderQuiz
    };
});
