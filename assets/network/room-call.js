(() => {
    "use strict";

    const ICE_SERVERS = [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        // STUN alone fails whenever either side is behind a NAT that blocks direct
        // UDP hole-punching (common on school/home networks) — this free public relay
        // is the standard zero-signup TURN fallback for exactly that case.
        {
            urls: [
                "turn:openrelay.metered.ca:80",
                "turn:openrelay.metered.ca:443",
                "turn:openrelay.metered.ca:443?transport=tcp"
            ],
            username: "openrelayproject",
            credential: "openrelayproject"
        }
    ];

    function el(tag, cls) {
        const e = document.createElement(tag);
        if (cls) e.className = cls;
        return e;
    }

    function injectStyle() {
        if (document.getElementById("room-call-style")) return;
        const style = el("style");
        style.id = "room-call-style";
        style.textContent = `
            .room-call-bar{position:fixed;right:14px;bottom:14px;z-index:80;display:flex;flex-direction:column;align-items:flex-end;gap:8px;font-family:inherit}
            .room-call-bar.hidden{display:none}
            .room-call-tiles{display:flex;flex-direction:row-reverse;gap:6px;flex-wrap:wrap;justify-content:flex-end;max-width:min(84vw,520px)}
            .room-call-tile{position:relative;width:104px;height:78px;background:#14181f;border:1px solid rgba(255,255,255,.16);overflow:hidden;flex:none}
            .room-call-tile video{width:100%;height:100%;object-fit:cover;display:block}
            .room-call-tile--novideo video{visibility:hidden}
            .room-call-tile__label{position:absolute;left:0;right:0;bottom:0;padding:2px 5px;font-size:10px;color:#e9edf3;background:linear-gradient(transparent,rgba(0,0,0,.72));white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
            .room-call-tile__avatar{position:absolute;inset:0;display:none;align-items:center;justify-content:center;font-size:26px;color:#7c8798}
            .room-call-tile--novideo .room-call-tile__avatar{display:flex}
            .room-call-tile--offline{opacity:.4}
            .room-call-controls{display:flex;gap:8px;padding:7px;background:rgba(10,13,18,.86);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(2px)}
            .room-call-btn{position:relative;width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,255,255,.22);background:#2a323f;color:#eef2f7;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}
            .room-call-btn:hover{background:#333d4d}
            .room-call-btn.off{background:#4a2320;border-color:#7a3630}
            .room-call-btn.off::after{content:"";position:absolute;width:140%;height:2px;background:#f0847c;transform:rotate(-45deg);border-radius:2px}
            .room-call-status{max-width:220px;text-align:right;font-size:11px;color:#c7d0dc;background:rgba(10,13,18,.8);padding:3px 8px;border:1px solid rgba(255,255,255,.1)}
            .room-call-status:empty{display:none}
        `;
        document.head.appendChild(style);
    }

    class RoomCall {
        constructor(lobby, options = {}) {
            this.lobby = lobby;
            this.options = options;
            this.peers = new Map();
            this.localAudioTrack = null;
            this.localVideoTrack = null;
            this.micOn = false;
            this.camOn = false;
            this.supported = typeof RTCPeerConnection === "function"
                && !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
            if (!this.supported) return;
            injectStyle();
            this._buildUi();
            this._wireLobby();
        }

        _buildUi() {
            const bar = el("div", "room-call-bar hidden");
            const tiles = el("div", "room-call-tiles");
            const localTile = this._makeTile(this.options.getPlayerName?.() || "나", true);
            tiles.appendChild(localTile.root);
            const controls = el("div", "room-call-controls");
            const micBtn = el("button", "room-call-btn off");
            micBtn.type = "button";
            micBtn.title = "마이크 켜기/끄기";
            micBtn.textContent = "🎤";
            micBtn.addEventListener("click", () => this.toggleMic());
            const camBtn = el("button", "room-call-btn off");
            camBtn.type = "button";
            camBtn.title = "카메라 켜기/끄기";
            camBtn.textContent = "📷";
            camBtn.addEventListener("click", () => this.toggleCam());
            controls.appendChild(micBtn);
            controls.appendChild(camBtn);
            const status = el("div", "room-call-status");
            bar.appendChild(status);
            bar.appendChild(tiles);
            bar.appendChild(controls);
            document.body.appendChild(bar);
            this.ui = { bar, tiles, micBtn, camBtn, status, localTile };
        }

        _makeTile(label, isLocal) {
            const root = el("div", "room-call-tile room-call-tile--novideo");
            const video = document.createElement("video");
            video.autoplay = true;
            video.playsInline = true;
            if (isLocal) video.muted = true;
            const avatar = el("div", "room-call-tile__avatar");
            avatar.textContent = "🙂";
            const labelEl = el("div", "room-call-tile__label");
            labelEl.textContent = label;
            root.appendChild(video);
            root.appendChild(avatar);
            root.appendChild(labelEl);
            return { root, video, labelEl };
        }

        _wireLobby() {
            const lobby = this.lobby;
            const prevStateChange = lobby.options.onStateChange;
            lobby.options.onStateChange = snapshot => {
                prevStateChange?.(snapshot);
                this._syncPeers(snapshot);
            };
            const prevSignal = lobby.options.onRtcSignal;
            lobby.options.onRtcSignal = (senderId, data) => {
                prevSignal?.(senderId, data);
                this._handleSignal(senderId, data);
            };
            const prevAbort = lobby.options.onAbort;
            lobby.options.onAbort = info => {
                this.teardown();
                prevAbort?.(info);
            };
            const prevDestroy = lobby.destroy.bind(lobby);
            lobby.destroy = () => {
                this.teardown();
                prevDestroy();
            };
        }

        _syncPeers(snapshot) {
            // Only run the call once a match is actually underway — offering it in the
            // pre-game waiting room doesn't scale and isn't needed before players commit.
            const active = !!snapshot.started;
            this.ui.bar.classList.toggle("hidden", !active);
            if (!active) {
                if (this.peers.size || this.micOn || this.camOn) this.teardown();
                return;
            }
            const myId = String(snapshot.myId ?? "");
            const ids = Object.keys(snapshot.players || {}).map(String).filter(id => id !== myId);
            for (const id of [...this.peers.keys()]) {
                if (!ids.includes(id)) this._closePeer(id);
            }
            for (const id of ids) {
                if (this.peers.has(id)) continue;
                const label = snapshot.players[id]?.name || "참가자";
                this._openPeer(id, myId < id, label);
            }
        }

        _openPeer(peerId, initiator, label) {
            let pc;
            try {
                pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
            } catch (_) {
                return;
            }
            const audioTransceiver = pc.addTransceiver("audio", { direction: "sendrecv" });
            const videoTransceiver = pc.addTransceiver("video", { direction: "sendrecv" });
            if (this.localAudioTrack) audioTransceiver.sender.replaceTrack(this.localAudioTrack).catch(() => {});
            if (this.localVideoTrack) videoTransceiver.sender.replaceTrack(this.localVideoTrack).catch(() => {});

            const tile = this._makeTile(label, false);
            this.ui.tiles.appendChild(tile.root);
            const stream = new MediaStream();
            const peer = { pc, audioTransceiver, videoTransceiver, tile, stream };
            this.peers.set(peerId, peer);

            pc.ontrack = event => {
                stream.addTrack(event.track);
                tile.video.srcObject = stream;
                // A receive transceiver's track exists as soon as SDP negotiates, but stays
                // muted (no frames) until the peer actually turns its camera on — only that
                // signals real video, not mere track presence.
                const updateVideoVisibility = () => {
                    const hasLiveVideo = stream.getVideoTracks().some(t => t.readyState === "live" && !t.muted);
                    tile.root.classList.toggle("room-call-tile--novideo", !hasLiveVideo);
                };
                event.track.addEventListener("mute", updateVideoVisibility);
                event.track.addEventListener("unmute", updateVideoVisibility);
                event.track.addEventListener("ended", updateVideoVisibility);
                updateVideoVisibility();
            };
            pc.onicecandidate = event => {
                if (event.candidate) this.lobby.sendSignal(peerId, { kind: "ice", candidate: event.candidate });
            };
            pc.onconnectionstatechange = () => {
                tile.root.classList.toggle("room-call-tile--offline", ["failed", "closed", "disconnected"].includes(pc.connectionState));
            };
            if (initiator) {
                pc.onnegotiationneeded = async () => {
                    try {
                        await pc.setLocalDescription(await pc.createOffer());
                        this.lobby.sendSignal(peerId, { kind: "offer", sdp: pc.localDescription });
                    } catch (_) {}
                };
            }
        }

        _closePeer(peerId) {
            const peer = this.peers.get(peerId);
            if (!peer) return;
            try { peer.pc.close(); } catch (_) {}
            peer.tile.root.remove();
            this.peers.delete(peerId);
        }

        async _handleSignal(senderId, data) {
            if (!data || !data.kind) return;
            let peer = this.peers.get(senderId);
            if (!peer && data.kind === "offer") {
                this._openPeer(senderId, false, this.lobby.snapshot().players[senderId]?.name || "참가자");
                peer = this.peers.get(senderId);
            }
            if (!peer) return;
            const { pc } = peer;
            try {
                if (data.kind === "offer") {
                    await pc.setRemoteDescription(data.sdp);
                    await pc.setLocalDescription(await pc.createAnswer());
                    this.lobby.sendSignal(senderId, { kind: "answer", sdp: pc.localDescription });
                } else if (data.kind === "answer") {
                    await pc.setRemoteDescription(data.sdp);
                } else if (data.kind === "ice") {
                    await pc.addIceCandidate(data.candidate);
                }
            } catch (_) {}
        }

        async toggleMic() {
            if (!this.micOn) {
                if (!this.localAudioTrack) {
                    try {
                        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                        this.localAudioTrack = stream.getAudioTracks()[0];
                    } catch (_) {
                        this._setStatus("마이크 권한이 필요합니다.");
                        return;
                    }
                }
                this.localAudioTrack.enabled = true;
                this.micOn = true;
                for (const peer of this.peers.values()) peer.audioTransceiver.sender.replaceTrack(this.localAudioTrack).catch(() => {});
            } else {
                this.localAudioTrack.enabled = false;
                this.micOn = false;
            }
            this._setStatus("");
            this._updateButtons();
        }

        async toggleCam() {
            if (!this.camOn) {
                let stream;
                try {
                    stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } });
                } catch (_) {
                    this._setStatus("카메라 권한이 필요합니다.");
                    return;
                }
                this.localVideoTrack = stream.getVideoTracks()[0];
                this.camOn = true;
                for (const peer of this.peers.values()) peer.videoTransceiver.sender.replaceTrack(this.localVideoTrack).catch(() => {});
                this.ui.localTile.video.srcObject = new MediaStream([this.localVideoTrack]);
                this.ui.localTile.root.classList.remove("room-call-tile--novideo");
            } else {
                this.localVideoTrack?.stop();
                this.localVideoTrack = null;
                this.camOn = false;
                for (const peer of this.peers.values()) peer.videoTransceiver.sender.replaceTrack(null).catch(() => {});
                this.ui.localTile.video.srcObject = null;
                this.ui.localTile.root.classList.add("room-call-tile--novideo");
            }
            this._setStatus("");
            this._updateButtons();
        }

        _updateButtons() {
            this.ui.micBtn.classList.toggle("off", !this.micOn);
            this.ui.camBtn.classList.toggle("off", !this.camOn);
        }

        _setStatus(text) {
            this.ui.status.textContent = text;
        }

        teardown() {
            for (const id of [...this.peers.keys()]) this._closePeer(id);
            this.localAudioTrack?.stop();
            this.localVideoTrack?.stop();
            this.localAudioTrack = null;
            this.localVideoTrack = null;
            this.micOn = false;
            this.camOn = false;
            this.ui?.bar.classList.add("hidden");
        }
    }

    window.RoomCall = Object.freeze({
        attach: (lobby, options) => new RoomCall(lobby, options || {})
    });
})();
