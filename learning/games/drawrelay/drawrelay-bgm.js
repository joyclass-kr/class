(() => {
  "use strict";

  const tracks = [
    "assets/sound/glass-pulse-01.ogg",
    "assets/sound/glass-pulse-02.ogg",
    "assets/sound/glass-pulse-03.ogg"
  ];
  const audio = document.getElementById("bgm");
  if (!audio || !tracks.length) return;

  let trackIndex = 0;
  audio.src = tracks[trackIndex];

  audio.addEventListener("ended", () => {
    trackIndex = (trackIndex + 1) % tracks.length;
    audio.src = tracks[trackIndex];
    audio.play().catch(() => {});
  });
})();
