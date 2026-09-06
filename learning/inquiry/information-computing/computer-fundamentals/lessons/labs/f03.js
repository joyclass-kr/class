(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.f03 = (spec) => {
        const videoFrames = [
            { x: 12, y: 0, description: "공이 화면 왼쪽에서 움직이기 시작합니다." },
            { x: 26, y: -24, description: "다음 그림에서는 공이 오른쪽 위로 이동했습니다." },
            { x: 42, y: -38, description: "그림을 시간 순서대로 빠르게 보면 움직임으로 느껴집니다." },
            { x: 58, y: -30, description: "각 프레임은 서로 조금씩 다른 한 장의 그림입니다." },
            { x: 74, y: -10, description: "뒤의 프레임일수록 공이 화면 오른쪽에 있습니다." },
            { x: 86, y: 0, description: "마지막 그림까지 순서대로 이어져 하나의 영상이 됩니다." }
        ];
        const waveY = (ratio) => 105 - Math.sin(ratio * Math.PI * 4) * 43 - Math.sin(ratio * Math.PI * 10) * 11;
        const waveform = Array.from({ length: 145 }, (_, index) => {
            const ratio = index / 144;
            return `${(24 + ratio * 672).toFixed(1)},${waveY(ratio).toFixed(1)}`;
        }).join(" ");
        const sampleDots = (amount) => Array.from({ length: amount }, (_, index) => {
            const ratio = index / (amount - 1);
            return `<circle cx="${(24 + ratio * 672).toFixed(1)}" cy="${waveY(ratio).toFixed(1)}" r="${amount === 8 ? 7 : 5}"></circle>`;
        }).join("");
        return figure(spec, "visual-media-timeline-lab", `
            <section class="media-capture-lab" data-media-lab>
                <div class="media-concept-tabs" role="tablist" aria-label="소리와 영상, 화면 캡처 실험 선택">
                    <button type="button" role="tab" id="media-tab-video" aria-controls="media-panel-video" aria-selected="true" data-media-panel-choice="video">영상 프레임 <small>Video Frames</small></button>
                    <button type="button" role="tab" id="media-tab-audio" aria-controls="media-panel-audio" aria-selected="false" data-media-panel-choice="audio">소리 샘플링 <small>Audio Sampling</small></button>
                    <button type="button" role="tab" id="media-tab-capture" aria-controls="media-panel-capture" aria-selected="false" data-media-panel-choice="capture">화면 캡처 <small>Screen Capture</small></button>
                </div>
                <section class="media-concept-panel media-video-panel" id="media-panel-video" role="tabpanel" aria-labelledby="media-tab-video" data-media-panel="video">
                    <header><b>영상은 시간 순서대로 이어진 여러 장의 그림입니다.</b><small>A video is a sequence of frames shown over time.</small></header>
                    <div class="media-frame-workbench">
                        <div class="media-video-preview" data-video-preview style="--frame-x:12%;--frame-y:0px">
                            <span class="media-scene-sun"></span><span class="media-scene-ground"></span><i class="media-moving-ball"></i>
                            <p data-video-status>${videoFrames[0].description}</p>
                        </div>
                        <div class="media-frame-tools">
                            <button type="button" class="media-play-button" data-video-play aria-pressed="false"><span data-video-play-label>순서대로 재생</span><small>Play in Order</small></button>
                            <div class="media-filmstrip" aria-label="시간 순서대로 놓인 영상 프레임">
                                ${videoFrames.map((item, index) => `<button type="button" data-media-video-frame="${index}" data-frame-x="${item.x}%" data-frame-y="${item.y}px" data-frame-description="${item.description}" aria-pressed="${index === 0}" aria-label="${item.description}"><i style="--thumb-x:${item.x}%;--thumb-bottom:${12 - item.y * .28}px"></i></button>`).join("")}
                            </div>
                            <p>필름스트립의 그림을 누르면 그 순간을 자세히 볼 수 있습니다.</p>
                        </div>
                    </div>
                </section>
                <section class="media-concept-panel media-audio-panel" id="media-panel-audio" role="tabpanel" aria-labelledby="media-tab-audio" data-media-panel="audio" hidden>
                    <header><b>이어지는 소리를 정한 순간마다 측정해 숫자로 기록합니다.</b><small>Sampling measures a continuous sound at chosen moments.</small></header>
                    <div class="audio-wave-observer">
                        <svg viewBox="0 0 720 210" role="img" aria-labelledby="audio-wave-title audio-wave-description">
                            <title id="audio-wave-title">연속 파형과 소리 측정점</title>
                            <desc id="audio-wave-description">같은 연속 파형 위에 여덟 개 또는 스물네 개의 측정점을 표시합니다.</desc>
                            <line class="audio-zero-line" x1="24" y1="105" x2="696" y2="105"></line>
                            <polyline class="audio-continuous-wave" points="${waveform}"></polyline>
                            <g class="audio-sample-points" data-audio-points="8">${sampleDots(8)}</g>
                            <g class="audio-sample-points" data-audio-points="24" hidden>${sampleDots(24)}</g>
                        </svg>
                        <span class="audio-axis-label audio-axis-time">시간 <small>Time →</small></span>
                        <span class="audio-axis-label audio-axis-level">소리의 떨림 <small>Sound level</small></span>
                    </div>
                    <div class="audio-sampling-controls" role="group" aria-label="같은 소리를 측정할 횟수">
                        <button type="button" data-audio-sample-choice="8" aria-pressed="true">같은 구간을 8번 측정 <small>8 samples</small></button>
                        <button type="button" data-audio-sample-choice="24" aria-pressed="false">같은 구간을 24번 측정 <small>24 samples</small></button>
                    </div>
                    <p class="media-observation" data-audio-observation aria-live="polite">파형은 계속 이어지지만, 디지털 기록에는 파란 점 여덟 곳에서 잰 값이 들어갑니다.</p>
                </section>
                <section class="media-concept-panel media-capture-panel" id="media-panel-capture" role="tabpanel" aria-labelledby="media-tab-capture" data-media-panel="capture" hidden>
                    <header><b>스크린샷은 한 순간을, 화면 녹화는 여러 순간의 순서를 남깁니다.</b><small>A screenshot freezes one moment; a recording keeps moments in order.</small></header>
                    <div class="media-capture-workbench">
                        <div class="media-live-column">
                            <div class="media-live-screen" data-capture-screen style="--capture-x:12%">
                                <span class="media-scene-sun"></span><span class="media-scene-ground"></span><i class="media-moving-ball"></i>
                                <strong class="media-recording-indicator" data-recording-indicator hidden>● 녹화 중 <small>Recording</small></strong>
                                <output data-capture-moment>공이 화면 왼쪽에 있습니다.</output>
                            </div>
                            <div class="media-capture-actions">
                                <button type="button" data-capture-next>장면 움직이기 <small>Move Scene</small></button>
                                <button type="button" data-screenshot>스크린샷 찍기 <small>Take Screenshot</small></button>
                                <button type="button" data-record-toggle><span data-record-label>녹화 시작</span><small>Start Recording</small></button>
                            </div>
                        </div>
                        <div class="media-capture-results">
                            <section class="screenshot-result">
                                <h3>스크린샷 <small>Screenshot</small></h3>
                                <p data-screenshot-empty>버튼을 누른 한 순간만 이곳에 고정됩니다.</p>
                                <div class="captured-still" data-screenshot-result hidden><i></i><span>한 장의 화면</span></div>
                            </section>
                            <section class="recording-result">
                                <h3>화면 녹화 <small>Screen Recording</small></h3>
                                <p data-recording-empty>녹화를 시작하면 서로 다른 순간이 시간 순서대로 쌓입니다.</p>
                                <div data-recording-result hidden>
                                    <div class="recording-filmstrip" data-recording-strip aria-label="녹화한 장면을 시간 순서대로 표시"></div>
                                    <button type="button" data-recording-play hidden><span data-recording-play-label>녹화 재생</span><small>Play Recording</small></button>
                                </div>
                            </section>
                        </div>
                    </div>
                    <p class="media-observation" data-capture-observation aria-live="polite">장면을 움직인 뒤 스크린샷과 화면 녹화를 각각 시험해 보세요.</p>
                </section>
            </section>
        `);
    };

    function setupMediaLab() {
        const lab = document.querySelector("[data-media-lab]");
        if (!lab) return;
        const panelChoices = Array.from(lab.querySelectorAll("[data-media-panel-choice]"));
        const panels = Array.from(lab.querySelectorAll("[data-media-panel]"));
        const videoFrames = Array.from(lab.querySelectorAll("[data-media-video-frame]"));
        const videoPreview = lab.querySelector("[data-video-preview]");
        const videoStatus = lab.querySelector("[data-video-status]");
        const videoPlay = lab.querySelector("[data-video-play]");
        const videoPlayLabel = lab.querySelector("[data-video-play-label]");
        const audioChoices = Array.from(lab.querySelectorAll("[data-audio-sample-choice]"));
        const audioPointGroups = Array.from(lab.querySelectorAll("[data-audio-points]"));
        const audioObservation = lab.querySelector("[data-audio-observation]");
        const captureScreen = lab.querySelector("[data-capture-screen]");
        const captureMoment = lab.querySelector("[data-capture-moment]");
        const captureNext = lab.querySelector("[data-capture-next]");
        const screenshotButton = lab.querySelector("[data-screenshot]");
        const screenshotEmpty = lab.querySelector("[data-screenshot-empty]");
        const screenshotResult = lab.querySelector("[data-screenshot-result]");
        const recordButton = lab.querySelector("[data-record-toggle]");
        const recordLabel = lab.querySelector("[data-record-label]");
        const recordIndicator = lab.querySelector("[data-recording-indicator]");
        const recordEmpty = lab.querySelector("[data-recording-empty]");
        const recordResult = lab.querySelector("[data-recording-result]");
        const recordStrip = lab.querySelector("[data-recording-strip]");
        const recordPlayback = lab.querySelector("[data-recording-play]");
        const recordPlaybackLabel = lab.querySelector("[data-recording-play-label]");
        const captureObservation = lab.querySelector("[data-capture-observation]");
        const capturePositions = [12, 26, 42, 58, 74, 86, 70, 48, 28];
        const captureDescriptions = [
            "공이 화면 왼쪽에 있습니다.", "공이 오른쪽으로 움직이고 있습니다.", "공이 화면 가운데에 도착했습니다.",
            "공이 계속 오른쪽으로 이동합니다.", "공이 화면 오른쪽에 가까워졌습니다.", "공이 오른쪽 끝에 도착했습니다.",
            "공이 다시 왼쪽으로 움직입니다.", "공이 화면 가운데로 돌아왔습니다.", "공이 왼쪽으로 돌아가는 중입니다."
        ];
        let videoIndex = 0;
        let captureIndex = 0;
        let videoTimer = 0;
        let recordTimer = 0;
        let playbackTimer = 0;
        let recordedFrames = [];

        const stopVideo = () => {
            if (videoTimer) window.clearInterval(videoTimer);
            videoTimer = 0;
            videoPlay.setAttribute("aria-pressed", "false");
            videoPlayLabel.textContent = "순서대로 재생";
            videoPlay.querySelector("small").textContent = "Play in Order";
        };
        const showVideoFrame = (index) => {
            const frame = videoFrames[index];
            if (!frame) return;
            videoIndex = index;
            videoPreview.style.setProperty("--frame-x", frame.dataset.frameX);
            videoPreview.style.setProperty("--frame-y", frame.dataset.frameY);
            videoStatus.textContent = frame.dataset.frameDescription;
            videoFrames.forEach((item, itemIndex) => item.setAttribute("aria-pressed", String(itemIndex === index)));
        };
        const setAudioSamples = (amount) => {
            audioChoices.forEach((button) => button.setAttribute("aria-pressed", String(Number(button.dataset.audioSampleChoice) === amount)));
            audioPointGroups.forEach((group) => { group.hidden = Number(group.dataset.audioPoints) !== amount; });
            audioObservation.textContent = amount === 8
                ? "파형은 계속 이어지지만, 디지털 기록에는 파란 점 여덟 곳에서 잰 값이 들어갑니다."
                : "같은 소리를 더 자주 측정하면 파란 점이 파형의 굽은 모양을 더 촘촘하게 따라갑니다.";
        };
        const showCaptureFrame = (index, message = "") => {
            captureIndex = (index + capturePositions.length) % capturePositions.length;
            captureScreen.style.setProperty("--capture-x", `${capturePositions[captureIndex]}%`);
            captureMoment.textContent = message || captureDescriptions[captureIndex];
        };
        const stepCapture = () => showCaptureFrame(captureIndex + 1);
        const stopPlayback = () => {
            if (playbackTimer) window.clearInterval(playbackTimer);
            playbackTimer = 0;
            recordPlayback.setAttribute("aria-pressed", "false");
            recordPlaybackLabel.textContent = "녹화 재생";
            recordPlayback.querySelector("small").textContent = "Play Recording";
        };
        const addRecordedFrame = () => {
            const captured = { position: capturePositions[captureIndex], description: captureDescriptions[captureIndex] };
            recordedFrames.push(captured);
            const frame = document.createElement("i");
            frame.style.setProperty("--capture-x", `${captured.position}%`);
            frame.setAttribute("aria-label", captured.description);
            recordStrip.append(frame);
            if (recordedFrames.length > 12) {
                recordedFrames.shift();
                recordStrip.firstElementChild?.remove();
            }
        };
        const stopRecording = (announce = true) => {
            if (recordTimer) window.clearInterval(recordTimer);
            recordTimer = 0;
            lab.dataset.recording = "false";
            recordIndicator.hidden = true;
            captureNext.disabled = false;
            recordButton.setAttribute("aria-pressed", "false");
            recordLabel.textContent = "녹화 시작";
            recordButton.querySelector("small").textContent = "Start Recording";
            recordPlayback.hidden = recordedFrames.length < 2;
            if (announce && recordedFrames.length) captureObservation.textContent = "녹화가 끝났습니다. 저장된 장면을 재생하면 기록한 시간 순서대로 다시 움직입니다.";
        };
        const startRecording = () => {
            stopPlayback();
            recordedFrames = [];
            recordStrip.replaceChildren();
            recordEmpty.hidden = true;
            recordResult.hidden = false;
            recordPlayback.hidden = true;
            lab.dataset.recording = "true";
            recordIndicator.hidden = false;
            captureNext.disabled = true;
            recordButton.setAttribute("aria-pressed", "true");
            recordLabel.textContent = "녹화 끝내기";
            recordButton.querySelector("small").textContent = "Stop Recording";
            addRecordedFrame();
            captureObservation.textContent = "녹화하는 동안 서로 다른 순간이 왼쪽부터 시간 순서대로 저장됩니다.";
            recordTimer = window.setInterval(() => {
                stepCapture();
                addRecordedFrame();
            }, 650);
        };
        const showPanel = (name) => {
            if (name !== "video") stopVideo();
            if (name !== "capture") {
                stopRecording(false);
                stopPlayback();
            }
            panelChoices.forEach((button) => button.setAttribute("aria-selected", String(button.dataset.mediaPanelChoice === name)));
            panels.forEach((panel) => { panel.hidden = panel.dataset.mediaPanel !== name; });
        };

        panelChoices.forEach((button) => button.addEventListener("click", () => showPanel(button.dataset.mediaPanelChoice)));
        videoFrames.forEach((button, index) => button.addEventListener("click", () => {
            stopVideo();
            showVideoFrame(index);
        }));
        videoPlay.addEventListener("click", () => {
            if (videoTimer) {
                stopVideo();
                return;
            }
            if (videoIndex >= videoFrames.length - 1) showVideoFrame(0);
            videoPlay.setAttribute("aria-pressed", "true");
            videoPlayLabel.textContent = "재생 멈추기";
            videoPlay.querySelector("small").textContent = "Pause";
            videoTimer = window.setInterval(() => {
                if (videoIndex >= videoFrames.length - 1) {
                    stopVideo();
                    return;
                }
                showVideoFrame(videoIndex + 1);
            }, 560);
        });
        audioChoices.forEach((button) => button.addEventListener("click", () => setAudioSamples(Number(button.dataset.audioSampleChoice))));
        captureNext.addEventListener("click", () => {
            stopPlayback();
            stepCapture();
        });
        screenshotButton.addEventListener("click", () => {
            screenshotEmpty.hidden = true;
            screenshotResult.hidden = false;
            screenshotResult.style.setProperty("--capture-x", `${capturePositions[captureIndex]}%`);
            captureObservation.textContent = "스크린샷에는 버튼을 누른 순간의 화면 한 장만 고정되었습니다. 원래 화면은 계속 바뀔 수 있습니다.";
        });
        recordButton.addEventListener("click", () => {
            if (recordTimer) stopRecording();
            else startRecording();
        });
        recordPlayback.addEventListener("click", () => {
            if (playbackTimer) {
                stopPlayback();
                return;
            }
            if (recordedFrames.length < 2) return;
            let playbackIndex = 0;
            recordPlayback.setAttribute("aria-pressed", "true");
            recordPlaybackLabel.textContent = "재생 멈추기";
            recordPlayback.querySelector("small").textContent = "Pause";
            showCaptureFrame(capturePositions.indexOf(recordedFrames[0].position), "녹화한 장면을 시간 순서대로 재생합니다.");
            playbackTimer = window.setInterval(() => {
                playbackIndex += 1;
                if (playbackIndex >= recordedFrames.length) {
                    stopPlayback();
                    captureObservation.textContent = "재생이 끝났습니다. 화면 녹화에는 한 장뿐 아니라 장면이 바뀐 순서도 들어 있습니다.";
                    return;
                }
                showCaptureFrame(capturePositions.indexOf(recordedFrames[playbackIndex].position), "녹화한 장면을 시간 순서대로 재생합니다.");
            }, 560);
        });
        window.addEventListener("pagehide", () => {
            stopVideo();
            stopRecording(false);
            stopPlayback();
        }, { once: true });
        showVideoFrame(0);
        setAudioSamples(8);
        showCaptureFrame(0);
        showPanel("video");
    }

    window.COMPUTER_LAB_SETUPS.push(setupMediaLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("f03");
})();
