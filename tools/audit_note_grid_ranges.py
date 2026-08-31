"""Report active note ranges in A0-C8 fixed-interval audio renders."""

from __future__ import annotations

import argparse
import math
import subprocess
import sys
from array import array
from pathlib import Path


NAMES = ("C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B")


def note(midi: int) -> str:
    return f"{NAMES[midi % 12]}{midi // 12 - 1}"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("sources", nargs="+", type=Path)
    parser.add_argument("--rate", type=int, default=4000)
    parser.add_argument("--interval", type=int, default=10)
    parser.add_argument("--window", type=int, default=5)
    parser.add_argument("--threshold", type=float, default=-55.0)
    args = parser.parse_args()
    for source in args.sources:
        if not source.is_file() or source.stat().st_size == 0:
            print(f"INCOMPLETE\t{source.name}")
            continue
        completed = subprocess.run(
            ["ffmpeg", "-nostdin", "-hide_banner", "-loglevel", "error", "-i", str(source),
             "-f", "f32le", "-ac", "1", "-ar", str(args.rate), "-"],
            check=True,
            stdout=subprocess.PIPE,
        )
        samples = array("f")
        samples.frombytes(completed.stdout)
        if sys.byteorder != "little":
            samples.byteswap()
        active = []
        for index, midi in enumerate(range(21, 109), start=1):
            start = (index - 1) * args.interval * args.rate
            end = min(len(samples), start + args.window * args.rate)
            peak = max((abs(value) for value in samples[start:end]), default=0.0)
            db = 20 * math.log10(max(peak, 1e-12))
            if db > args.threshold:
                active.append((index, midi, db))
        if not active:
            print(f"SILENT\t{source.name}")
            continue
        first, last = active[0], active[-1]
        expected = last[0] - first[0] + 1
        print(
            f"OK\t{source.name}\t{first[0]:03d}:{note(first[1])}\t{last[0]:03d}:{note(last[1])}"
            f"\tactive={len(active)}/{expected}\tpeak={max(item[2] for item in active):.1f}dB"
        )


if __name__ == "__main__":
    main()
