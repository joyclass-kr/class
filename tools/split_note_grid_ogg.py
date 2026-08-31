"""Split a fixed-interval A0-C8 render into compact Ogg Opus note files."""

from __future__ import annotations

import argparse
import subprocess
from pathlib import Path


NOTE_NAMES = ("c", "cs", "d", "ds", "e", "f", "fs", "g", "gs", "a", "as", "b")


def note_name(midi: int) -> str:
    return f"{NOTE_NAMES[midi % 12]}{midi // 12 - 1}"


def split(
    source: Path,
    destination: Path,
    first_index: int,
    last_index: int,
    output_first_midi: int | None = None,
    ffmpeg: str = "ffmpeg",
    interval: float = 10.0,
    grid_offset: float = 0.0,
    duration: float = 5.0,
    bitrate: str = "64k",
) -> None:
    if not 1 <= first_index <= last_index <= 88:
        raise ValueError("indices must satisfy 1 <= first <= last <= 88")
    destination.mkdir(parents=True, exist_ok=True)
    for source_index in range(first_index, last_index + 1):
        midi = (output_first_midi + source_index - first_index) if output_first_midi is not None else 20 + source_index
        output_index = midi - 20
        output = destination / f"{output_index:03d}_{note_name(midi)}.ogg"
        start = max(0.0, (source_index - 1) * interval + grid_offset)
        subprocess.run(
            [
                ffmpeg, "-nostdin", "-hide_banner", "-loglevel", "error",
                "-ss", f"{start:.3f}", "-i", str(source),
                "-t", f"{duration:.3f}", "-map_metadata", "-1",
                "-c:a", "libopus", "-b:a", bitrate, "-vbr", "on",
                "-compression_level", "10", "-application", "audio",
                "-ar", "48000", "-ac", "2", "-y", str(output),
            ],
            check=True,
        )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("destination", type=Path)
    parser.add_argument("--first-index", type=int, required=True)
    parser.add_argument("--last-index", type=int, required=True)
    parser.add_argument("--output-first-midi", type=int)
    parser.add_argument("--ffmpeg", default="ffmpeg")
    parser.add_argument("--interval", type=float, default=10.0)
    parser.add_argument("--grid-offset", type=float, default=0.0)
    parser.add_argument("--duration", type=float, default=5.0)
    parser.add_argument("--bitrate", default="64k")
    args = parser.parse_args()
    split(
        args.source, args.destination, args.first_index, args.last_index,
        args.output_first_midi, args.ffmpeg, args.interval, args.grid_offset,
        args.duration, args.bitrate,
    )


if __name__ == "__main__":
    main()
