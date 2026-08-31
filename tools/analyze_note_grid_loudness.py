"""Measure active-window RMS for fixed-interval multisample source renders."""

from __future__ import annotations

import argparse
import math
import statistics
import subprocess
import sys
from array import array
from pathlib import Path


def db(value: float) -> float:
    return 20 * math.log10(max(value, 1e-12))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("sources", nargs="+", type=Path)
    parser.add_argument("--rate", type=int, default=4000)
    parser.add_argument("--interval", type=int, default=10)
    parser.add_argument("--window", type=float, default=4.5)
    parser.add_argument("--active-peak", type=float, default=-55.0)
    parser.add_argument("--gate", type=float, default=-62.0)
    parser.add_argument("--target", type=float, default=-23.0)
    args = parser.parse_args()
    gate = 10 ** (args.gate / 20)
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
        note_rms = []
        peaks = []
        for index in range(88):
            start = index * args.interval * args.rate
            end = min(len(samples), start + int(args.window * args.rate))
            window = samples[start:end]
            peak = max((abs(value) for value in window), default=0.0)
            if db(peak) <= args.active_peak:
                continue
            gated = [value for value in window if abs(value) >= gate]
            if not gated:
                continue
            rms = math.sqrt(sum(value * value for value in gated) / len(gated))
            note_rms.append(db(rms))
            peaks.append(db(peak))
        if not note_rms:
            print(f"SILENT\t{source.name}")
            continue
        median_rms = statistics.median(note_rms)
        recommended = max(-9.0, min(9.0, args.target - median_rms))
        print(
            f"OK\t{source.name}\tnotes={len(note_rms)}\tmedianRMS={median_rms:.2f}dB"
            f"\tpeak={max(peaks):.2f}dB\tgainDb={recommended:+.2f}"
        )


if __name__ == "__main__":
    main()
