"""Compare a rendered source segment with a web sample after decoding both to PCM."""

from __future__ import annotations

import argparse
import subprocess
from pathlib import Path

import numpy as np


def decode(path: Path, ffmpeg: str, start: float, duration: float, rate: int) -> np.ndarray:
    command = [ffmpeg, "-nostdin", "-hide_banner", "-loglevel", "error"]
    if start:
        command.extend(["-ss", f"{start:.6f}"])
    command.extend([
        "-i", str(path), "-t", f"{duration:.6f}", "-map_metadata", "-1",
        "-ac", "2", "-ar", str(rate), "-f", "f32le", "-",
    ])
    raw = subprocess.check_output(command)
    return np.frombuffer(raw, dtype=np.float32).reshape(-1, 2)


def mono(values: np.ndarray) -> np.ndarray:
    return np.mean(values, axis=1, dtype=np.float64).astype(np.float32)



def align(reference: np.ndarray, candidate: np.ndarray, lag: int) -> tuple[np.ndarray, np.ndarray]:
    if lag > 0:
        reference = reference[lag:]
    elif lag < 0:
        candidate = candidate[-lag:]
    length = min(reference.size, candidate.size)
    return reference[:length], candidate[:length]


def compare(reference: np.ndarray, candidate: np.ndarray) -> dict[str, float]:
    ref = mono(reference)
    test = mono(candidate)
    # FFmpeg honors MP3 timestamps and Opus pre-skip, so both decodes already begin
    # on the requested sample. Pitched-waveform peak searches can pick a wrong cycle.
    lag = 0
    ref, test = align(ref, test, lag)
    ref = ref.astype(np.float64)
    test = test.astype(np.float64)
    ref -= np.mean(ref)
    test -= np.mean(test)
    scale = float(np.dot(ref, test) / max(np.dot(test, test), 1e-20))
    fitted = test * scale
    error = ref - fitted
    correlation = float(np.dot(ref, test) / np.sqrt(max(np.dot(ref, ref) * np.dot(test, test), 1e-20)))
    snr = float(10 * np.log10(max(np.mean(ref * ref), 1e-20) / max(np.mean(error * error), 1e-20)))
    return {"lag": float(lag), "scale": scale, "correlation": correlation, "snr": snr}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("sample", type=Path)
    parser.add_argument("--source-start", type=float, default=0.0)
    parser.add_argument("--duration", type=float, default=5.0)
    parser.add_argument("--rate", type=int, default=48000)
    parser.add_argument("--max-lag-ms", type=float, default=80.0)
    parser.add_argument("--ffmpeg", default="ffmpeg")
    args = parser.parse_args()
    reference = decode(args.source, args.ffmpeg, args.source_start, args.duration, args.rate)
    candidate = decode(args.sample, args.ffmpeg, 0.0, args.duration, args.rate)
    result = compare(reference, candidate)
    print(
        f"lag_ms={result['lag'] * 1000 / args.rate:.3f} "
        f"scale={result['scale']:.6f} correlation={result['correlation']:.8f} "
        f"snr_db={result['snr']:.3f}"
    )


if __name__ == "__main__":
    main()
