(() => {
  "use strict";

  const TRACK_INDEX_KEY = "classDrawrelayBgmTrackIndex";
  const tracks = [
    "assets/sound/glass-pulse-01.ogg",
    "assets/sound/glass-pulse-02.ogg",
    "assets/sound/glass-pulse-03.ogg"
  ];
  const audio = document.getElementById("bgm");
  if (!audio || !tracks.length) return;

  const savedIndex = Number(localStorage.getItem(TRACK_INDEX_KEY));
  let trackIndex = Number.isInteger(savedIndex) && savedIndex >= 0 && savedIndex < tracks.length
    ? savedIndex
    : 0;

  function selectTrack(index, shouldPlay = false) {
    trackIndex = (index + tracks.length) % tracks.length;
    localStorage.setItem(TRACK_INDEX_KEY, String(trackIndex));
    audio.src = tracks[trackIndex];
    if (shouldPlay) audio.play().catch(() => {});
  }

  selectTrack(trackIndex);
  audio.addEventListener("ended", () => selectTrack(trackIndex + 1, true));
})();
