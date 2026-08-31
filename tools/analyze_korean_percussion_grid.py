"""Detect and optionally extract active hits from fixed 10-second percussion grids."""

from __future__ import annotations

import argparse
import json
import math
import subprocess
from array import array
from pathlib import Path


def decode_mono(source: Path, ffmpeg: str, rate: int) -> array:
    result = subprocess.run(
        [
            ffmpeg,
            "-nostdin",
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            str(source),
            "-map_metadata",
            "-1",
            "-ac",
            "1",
            "-ar",
            str(rate),
            "-f",
            "f32le",
            "-",
        ],
        check=True,
        stdout=subprocess.PIPE,
    )
    samples = array("f")
    samples.frombytes(result.stdout)
    return samples


def analyze(source: Path, ffmpeg: str, rate: int, interval: float, window: float, threshold_db: float) -> list[dict[str, float | int]]:
    samples = decode_mono(source, ffmpeg, rate)
    slot_count = math.ceil(len(samples) / (rate * interval))
    threshold = 10 ** (threshold_db / 20)
    active: list[dict[str, float | int]] = []
    for slot in range(slot_count):
        start = int(slot * interval * rate)
        end = min(len(samples), start + int(window * rate))
        values = samples[start:end]
        if not values:
            continue
        peak = max(abs(value) for value in values)
        if peak < threshold:
            continue
        rms = math.sqrt(sum(value * value for value in values) / len(values))
        onset_index = next((index for index, value in enumerate(values) if abs(value) >= threshold), 0)
        active.append(
            {
                "slot": slot + 1,
                "start": round(slot * interval, 3),
                "onset": round(slot * interval + onset_index / rate, 3),
                "peak_db": round(20 * math.log10(max(peak, 1e-9)), 2),
                "rms_db": round(20 * math.log10(max(rms, 1e-9)), 2),
            }
        )
    return active


def extract(source: Path, destination: Path, active: list[dict[str, float | int]], ffmpeg: str, duration: float) -> None:
    destination.mkdir(parents=True, exist_ok=True)
    for item in active:
        slot = int(item["slot"])
        output = destination / f"slot-{slot:02d}.ogg"
        subprocess.run(
            [
                ffmpeg,
                "-nostdin",
                "-hide_banner",
                "-loglevel",
                "error",
                "-ss",
                f'{float(item["start"]):.3f}',
                "-i",
                str(source),
                "-t",
                f"{duration:.3f}",
                "-map_metadata",
                "-1",
                "-c:a",
                "libopus",
                "-b:a",
                "64k",
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


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("sources", nargs="+", type=Path)
    parser.add_argument("--ffmpeg", default="ffmpeg")
    parser.add_argument("--rate", type=int, default=8000)
    parser.add_argument("--interval", type=float, default=10.0)
    parser.add_argument("--window", type=float, default=5.0)
    parser.add_argument("--threshold-db", type=float, default=-48.0)
    parser.add_argument("--extract-root", type=Path)
    parser.add_argument("--json-out", type=Path)
    args = parser.parse_args()

    report: dict[str, list[dict[str, float | int]]] = {}
    for source in args.sources:
        active = analyze(source, args.ffmpeg, args.rate, args.interval, args.window, args.threshold_db)
        report[source.name] = active
        if args.extract_root:
            extract(source, args.extract_root / source.stem, active, args.ffmpeg, args.window)

    output = json.dumps(report, ensure_ascii=False, indent=2)
    if args.json_out:
        args.json_out.parent.mkdir(parents=True, exist_ok=True)
        args.json_out.write_text(output + "\n", encoding="utf-8")
    print(output)


if __name__ == "__main__":
    main()
