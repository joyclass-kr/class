#!/usr/bin/env python3
"""Audit the exact selected source for EXIF orientation and repair only matches."""

from __future__ import annotations

import io
import json
import logging
import sys
import time
from pathlib import Path

from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent))
import collect_travel_images as base
import recover_missing_travel_images as recovery


OUTPUT = base.ROOT / "scratch" / "travel-image-orientation-audit.json"


def read_manifest() -> dict[str, dict]:
    text = base.MANIFEST_PATH.read_text(encoding="utf-8")
    return json.loads(text.removeprefix("window.KOREA_TRAVEL_IMAGES = ").rstrip().removesuffix(";"))


def matching_candidate(place: dict, record: dict):
    expected = record.get("evidence", "")
    if expected.startswith("Wikipedia exact title:"):
        candidate = base.wikipedia_candidate(place)
        return candidate if candidate and candidate.evidence == expected else None
    if expected.startswith("DuckDuckGo recovery:"):
        for candidate in recovery.ddg_candidates(place):
            if candidate.evidence == expected:
                return candidate
        return None
    candidate = base.duckduckgo_candidate(place)
    return candidate if candidate and candidate.evidence == expected else None


def main() -> int:
    records = read_manifest()
    places = {place["id"]: place for place in base.load_places()}
    report = {"checked": [], "corrected": [], "unmatched": [], "failures": []}
    for index, (place_id, record) in enumerate(records.items(), 1):
        place = places[place_id]
        try:
            candidate = matching_candidate(place, record)
            if not candidate:
                report["unmatched"].append({"id": place_id, "name": place["name"]})
                continue
            response = base.session().get(candidate.image_url, timeout=base.TIMEOUT)
            response.raise_for_status()
            with Image.open(io.BytesIO(response.content)) as image:
                orientation = image.getexif().get(274, 1)
                raw_size = image.size
            entry = {"id": place_id, "name": place["name"], "orientation": orientation, "rawSize": raw_size}
            report["checked"].append(entry)
            if orientation in range(2, 9):
                byte_count, width, height = base.download_and_validate(candidate, base.IMAGE_DIR / f"{place_id}.webp")
                record["downloadBytes"] = byte_count
                record["width"] = width
                record["height"] = height
                report["corrected"].append(entry | {"correctedSize": [width, height]})
                base.write_manifest(records)
                logging.info("[%d/%d] corrected %s (EXIF %s)", index, len(records), place["name"], orientation)
            elif index % 20 == 0:
                logging.info("[%d/%d] audited", index, len(records))
        except Exception as error:
            report["failures"].append({"id": place_id, "name": place["name"], "error": f"{type(error).__name__}: {error}"})
        OUTPUT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
        time.sleep(0.45)
    base.write_manifest(records)
    logging.info("Finished: checked=%d corrected=%d unmatched=%d failures=%d", *(len(report[key]) for key in ("checked", "corrected", "unmatched", "failures")))
    return 0


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    raise SystemExit(main())
