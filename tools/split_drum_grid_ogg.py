"""Extract the playable GM drum-pad hits from a fixed five-second grid."""

from __future__ import annotations

import argparse
import subprocess
from pathlib import Path


# Every source track was rendered from the same user-provided AD2 MIDI file.
# These are its 30 MIDI notes in playback order, not an ascending GM grid:
# 36, 38, 41, 42, 44, 45, 46, 48, 49, 50, 51, 52, 53, 54, 55,
# 56, 57, 58, 59, 60, 61, 62, 63, 65, 69, 72, 75, 77, 79, 81.
# Slot choices below follow XLN Audio's official Addictive Drums 2 keymap.
PAD_SLOTS = {
    "kick": 1,       # 36 Kick
    "snare": 2,      # 38 Snare Open Hit
    "ghost": 2,      # derived quietly from Snare Open Hit
    "rimshot": 3,    # 41 Snare Shallow Rimshot
    "sidestick": 4,  # 42 Snare SideStick
    "rimclick": 5,   # 44 Snare RimClick
    "pedalhat": 8,   # 48 HiHat Pedal Closed
    "hat": 9,        # 49 HiHat Closed 1 Tip
    "openhat": 17,   # 57 HiHat Open D
    "lowtom": 24,    # 65 Tom 4 Open Hit
    "midtom": 25,    # 69 Tom 2 Open Hit
    "hightom": 26,   # 72 Tom 1 Rimshot
    "crash": 28,     # 77 Cymbal 1 Hit
    "ride": 20,      # 60 Ride 1 Tip
    "ridebell": 21,  # 61 Ride 1 Bell
}


def split(source: Path, destination: Path, ffmpeg: str, interval: float, offset: float, duration: float, bitrate: str) -> None:
    destination.mkdir(parents=True, exist_ok=True)
    for pad, slot in PAD_SLOTS.items():
        start = max(0.0, (slot - 1) * interval + offset)
        pad_duration = min(duration, 1.2) if pad == "ghost" else duration
        filters = ["-af", "volume=-12dB,afade=t=out:st=0.28:d=0.72"] if pad == "ghost" else []
        subprocess.run(
            [
                ffmpeg, "-nostdin", "-hide_banner", "-loglevel", "error",
                "-ss", f"{start:.3f}", "-i", str(source), "-t", f"{pad_duration:.3f}",
                *filters,
                "-map_metadata", "-1", "-c:a", "libopus", "-b:a", bitrate,
                "-vbr", "on", "-compression_level", "10", "-application", "audio",
                "-ar", "48000", "-ac", "2", "-y", str(destination / f"{pad}.ogg"),
            ],
            check=True,
        )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("destination", type=Path)
    parser.add_argument("--ffmpeg", default="ffmpeg")
    parser.add_argument("--interval", type=float, default=5.0)
    parser.add_argument("--offset", type=float, default=0.02)
    parser.add_argument("--duration", type=float, default=4.75)
    parser.add_argument("--bitrate", default="48k")
    args = parser.parse_args()
    split(args.source, args.destination, args.ffmpeg, args.interval, args.offset, args.duration, args.bitrate)


if __name__ == "__main__":
    main()
