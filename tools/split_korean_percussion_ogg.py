"""Split Native Instruments East Asia Korean percussion note grids into Ogg hits."""

from __future__ import annotations

import argparse
import subprocess
from pathlib import Path


INSTRUMENTS: dict[str, tuple[str, tuple[str, ...]]] = {
    "janggu-samul": (
        "janggu(samul).mp3",
        (
            "low-open", "low-open-var", "low-edge", "low-soft", "low-ghost",
            "low-bounce", "high-rim", "high-rim-var", "high-center",
            "high-mallet", "high-flam", "high-bounce", "compound",
        ),
    ),
    "janggu-sanjo": (
        "janggu(sanjo).mp3",
        (
            "low-open", "low-open-var", "low-muted", "low-soft", "low-ghost",
            "low-flam", "high-rim", "high-center", "high-edge",
            "high-edge-mute", "high-flam-rim", "high-flam-edge",
            "low-high-open", "low-high-ornament", "low-high-bounce",
        ),
    ),
    "buk-samul": (
        "buk(samul).mp3",
        (
            "main", "main-var-1", "main-var-2", "main-var-3", "ghost",
            "edge-1", "edge-1-var", "edge-2", "edge-2-var", "edge-3",
            "edge-3-var", "accent", "muted", "muted-var", "soft",
            "soft-var", "damp", "side", "side-var",
        ),
    ),
    "buk-sori": (
        "buk(sori).mp3",
        (
            "main-lh", "main-rh", "main-lh-var", "main-rh-var", "ghost",
            "edge-1-lh", "edge-1-rh", "edge-2-lh", "edge-2-rh",
            "edge-3-lh", "edge-3-rh", "accent", "muted-lh", "muted-rh",
            "soft-lh", "soft-rh", "damp", "rim", "rim-var", "compound-1",
            "compound-2",
        ),
    ),
    "jing": (
        "jing.mp3",
        ("open", "open-damp-slow", "mute", "open-damp-fast", "ghost", "muted"),
    ),
    "kkwaenggwari": (
        "kkwaenggwari.mp3",
        (
            "open", "open-damp-slow", "damp", "open-damp-fast", "ghost",
            "muted", "edge-1", "edge-2", "bounce",
        ),
    ),
    "sogo": (
        "sogo.mp3",
        (
            "main", "main-var-1", "main-var-2", "main-var-3", "ghost",
            "edge-1", "edge-1-var", "edge-2", "edge-2-var", "edge-3",
            "edge-3-var", "accent", "muted", "muted-var", "soft",
            "soft-var", "damp",
        ),
    ),
}


def split_source(
    source: Path,
    destination: Path,
    names: tuple[str, ...],
    ffmpeg: str,
    interval: float,
    offset: float,
    duration: float,
    bitrate: str,
) -> None:
    destination.mkdir(parents=True, exist_ok=True)
    # The user's percussion grid starts at MIDI 57; East Asia solo hits start
    # at MIDI 60, so the first playable hit is the fourth ten-second slot.
    for index, name in enumerate(names):
        slot = index + 4
        start = (slot - 1) * interval + offset
        subprocess.run(
            [
                ffmpeg,
                "-nostdin",
                "-hide_banner",
                "-loglevel",
                "error",
                "-ss",
                f"{start:.3f}",
                "-i",
                str(source),
                "-t",
                f"{duration:.3f}",
                "-map_metadata",
                "-1",
                "-c:a",
                "libopus",
                "-b:a",
                bitrate,
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
                str(destination / f"{name}.ogg"),
            ],
            check=True,
        )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source_root", type=Path)
    parser.add_argument("destination_root", type=Path)
    parser.add_argument("--ffmpeg", default="ffmpeg")
    parser.add_argument("--interval", type=float, default=10.0)
    parser.add_argument("--offset", type=float, default=0.025)
    parser.add_argument("--duration", type=float, default=9.75)
    parser.add_argument("--bitrate", default="48k")
    args = parser.parse_args()

    for instrument, (source_name, names) in INSTRUMENTS.items():
        split_source(
            args.source_root / source_name,
            args.destination_root / instrument,
            names,
            args.ffmpeg,
            args.interval,
            args.offset,
            args.duration,
            args.bitrate,
        )
        print(f"{instrument}: {len(names)} hits")


if __name__ == "__main__":
    main()
