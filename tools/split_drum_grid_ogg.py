"""Extract the playable GM drum-pad hits from a fixed five-second grid."""

from __future__ import annotations

import argparse
import subprocess
from pathlib import Path


# Source tracks contain ascending GM drum notes 35–64. Keep only the parts
# exposed by the instrument-room pads; the one-based value is the grid slot.
PAD_SLOTS = {
    "kick": 1,
    "sidestick": 3,
    "snare": 4,
    "ghost": 4,
    "clap": 5,
    "rimshot": 6,
    "hat": 8,
    "pedalhat": 10,
    "openhat": 12,
    "hightom": 16,
    "midtom": 14,
    "lowtom": 11,
    "subtom": 7,
    "crash": 15,
    "ride": 17,
    "ridebell": 19,
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
