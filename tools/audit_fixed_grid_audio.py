"""Audit fixed-interval chromatic multisample renders without creating files."""

from __future__ import annotations

import argparse
import array
import math
import subprocess
from pathlib import Path

import numpy as np


def decode(source: Path, ffmpeg: str, rate: int) -> array.array:
    raw = subprocess.check_output(
        [
            ffmpeg,
            "-nostdin",
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            str(source),
            "-af",
            "pan=mono|c0=c0",
            "-ac",
            "1",
            "-ar",
            str(rate),
            "-f",
            "f32le",
            "-",
        ]
    )
    samples = array.array("f")
    samples.frombytes(raw)
    return samples


def rms_db(samples: array.array) -> float:
    if not samples:
        return -120.0
    energy = sum(float(value) * float(value) for value in samples) / len(samples)
    return 20 * math.log10(max(1e-12, math.sqrt(energy)))


def estimate_midi(samples: array.array, rate: int) -> float | None:
    values = np.asarray(samples, dtype=np.float32)
    if values.size < rate // 4:
        return None
    peak = float(np.max(np.abs(values)))
    if peak < 1e-5:
        return None
    values = values - float(np.mean(values))
    values *= np.hanning(values.size)
    fft_size = 1 << (values.size - 1).bit_length()
    magnitudes = np.abs(np.fft.rfft(values, fft_size))
    frequencies = np.fft.rfftfreq(fft_size, 1 / rate)
    candidates = np.where((frequencies >= 35) & (frequencies <= 1800))[0]
    if not candidates.size:
        return None
    log_spectrum = np.log1p(magnitudes)
    scores = np.zeros(candidates.size, dtype=np.float64)
    for harmonic in range(1, 7):
        bins = candidates * harmonic
        valid = bins < log_spectrum.size
        scores[valid] += log_spectrum[bins[valid]] / math.sqrt(harmonic)
    frequency = float(frequencies[candidates[int(np.argmax(scores))]])
    return 69 + 12 * math.log2(frequency / 440)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("--ffmpeg", default="ffmpeg")
    parser.add_argument("--interval", type=float, default=10.0)
    parser.add_argument("--window", type=float, default=5.0)
    parser.add_argument("--rate", type=int, default=4000)
    parser.add_argument("--active-db", type=float, default=-70.0)
    parser.add_argument("--pitch", action="store_true")
    args = parser.parse_args()

    samples = decode(args.source, args.ffmpeg, args.rate)
    interval_samples = round(args.interval * args.rate)
    window_samples = round(args.window * args.rate)
    segment_count = math.ceil(len(samples) / interval_samples)
    levels: list[float] = []
    for index in range(segment_count):
        start = index * interval_samples
        levels.append(rms_db(samples[start : start + window_samples]))

    active = [index + 1 for index, level in enumerate(levels) if level >= args.active_db]
    print(f"file={args.source.name} segments={segment_count} active={len(active)}")
    if active:
        print(f"active-index={active[0]}..{active[-1]}")
    print("levels=" + " ".join(f"{index + 1}:{level:.1f}" for index, level in enumerate(levels)))
    if args.pitch:
        estimates = []
        for index in active:
            start = (index - 1) * interval_samples
            midi = estimate_midi(samples[start : start + window_samples], args.rate)
            if midi is not None:
                estimates.append(f"{index}:{midi:.1f}")
        print("pitch-midi=" + " ".join(estimates))


if __name__ == "__main__":
    main()
