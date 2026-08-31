"""Split a 10-second-grid A0-C8 render into 88 compact Ogg Opus files."""

from __future__ import annotations

import argparse
import subprocess
from pathlib import Path


NOTE_NAMES = ("c", "cs", "d", "ds", "e", "f", "fs", "g", "gs", "a", "as", "b")


def note_name(midi: int) -> str:
    return f"{NOTE_NAMES[midi % 12]}{midi // 12 - 1}"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("destination", type=Path)
    parser.add_argument("--ffmpeg", default="ffmpeg")
    parser.add_argument("--interval", type=float, default=10.0)
    parser.add_argument("--duration", type=float, default=5.0)
    parser.add_argument("--bitrate", default="64k")
    args = parser.parse_args()

    args.destination.mkdir(parents=True, exist_ok=True)
    for index, midi in enumerate(range(21, 109), start=1):
        output = args.destination / f"{index:03d}_{note_name(midi)}.ogg"
        subprocess.run(
            [
                args.ffmpeg,
                "-nostdin",
                "-hide_banner",
                "-loglevel",
                "error",
                "-ss",
                f"{(index - 1) * args.interval:.3f}",
                "-i",
                str(args.source),
                "-t",
                f"{args.duration:.3f}",
                "-map_metadata",
                "-1",
                "-c:a",
                "libopus",
                "-b:a",
                args.bitrate,
                "-vbr",
                "on",
                "-compression_level",
                "10",
                "-application",
                "audio",
                "-ar",
                "48000",
                "-ac",
                "2",
                "-y",
                str(output),
            ],
            check=True,
        )


if __name__ == "__main__":
    main()
