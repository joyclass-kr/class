(() => {
  "use strict";
  const tracks = [
    "assets/audio/keyboard-afternoon-01.ogg",
    "assets/audio/keyboard-afternoon-02.ogg",
    "assets/audio/breath-on-keys-01.ogg",
    "assets/audio/breath-on-keys-02.ogg"
  ];
  const audio = document.getElementById("bgm");
  if (!audio) return;
  const storageKey = "classTypingBgmTrackIndex";
  const saved = Number(localStorage.getItem(storageKey));
  let index = Number.isInteger(saved) && saved >= 0 && saved < tracks.length ? saved : 0;
  function selectTrack(nextIndex, shouldPlay = false) {
    index = (nextIndex + tracks.length) % tracks.length;
    localStorage.setItem(storageKey, String(index));
    audio.src = tracks[index];
    audio.load();
    if (shouldPlay) audio.play().catch(() => {});
  }
  selectTrack(index);
  audio.addEventListener("ended", () => selectTrack(index + 1, true));
})();
