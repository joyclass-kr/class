#!/usr/bin/env python3
"""Recover only missing Korea travel-map photos and merge them into the manifest.

Unlike the full collector, this recovery pass walks multiple DuckDuckGo results
per precise query. A failed download never prevents trying the next candidate.
"""

from __future__ import annotations

import json
import logging
import sys
import time
from pathlib import Path
from urllib.parse import urlparse

sys.path.insert(0, str(Path(__file__).resolve().parent))
import collect_travel_images as base


MAX_RESULTS_PER_QUERY = 30
MAX_DOWNLOAD_ATTEMPTS = 12
BLOCKED_HOSTS = {
    "instagram.com", "www.instagram.com", "lookaside.instagram.com",
    "facebook.com", "www.facebook.com", "youtube.com", "www.youtube.com",
}
RECOVERY_LOG = base.ROOT / "scratch" / "travel-image-recovery.json"


def read_manifest() -> dict[str, dict]:
    if not base.MANIFEST_PATH.exists():
        return {}
    text = base.MANIFEST_PATH.read_text(encoding="utf-8")
    prefix = "window.KOREA_TRAVEL_IMAGES = "
    if not text.startswith(prefix):
        raise ValueError("Unexpected image manifest format")
    return json.loads(text[len(prefix):].rstrip().removesuffix(";"))


def ddg_candidates(place: dict):
    name = place["name"]
    region = place.get("region", "")
    seen = set()
    queries = (f'"{name}" 전경 대표 사진', f'"{name}" 관광지')
    for query in queries:
        token = base.ddg_token(query)
        data = base.api_json("https://duckduckgo.com/i.js", {
            "l": "kr-kr", "o": "json", "q": query, "vqd": token,
            "f": ",,,", "p": "1",
        })
        for item in data.get("results", [])[:MAX_RESULTS_PER_QUERY]:
            title = str(item.get("title", ""))
            source = str(item.get("source", ""))
            page_url = str(item.get("url", ""))
            image_url = str(item.get("image", ""))
            host = urlparse(image_url).hostname or ""
            if not image_url or image_url in seen or host in BLOCKED_HOSTS:
                continue
            seen.add(image_url)
            if base.reject_visual_text(title, image_url):
                continue
            if not base.is_relevant(name, title, source, page_url, region):
                continue
            yield base.Candidate(
                image_url=image_url,
                page_url=page_url,
                file_page_url=page_url,
                author=source or "Source website",
                license_name="Source website; verify reuse rights",
                license_url=page_url,
                source="duckduckgo",
                evidence=f"DuckDuckGo recovery: {query} | {title}",
            )


def record_for(place: dict, candidate: base.Candidate, stats: tuple[int, int, int]) -> dict:
    byte_count, width, height = stats
    return {
        "src": f"images/{place['id']}.webp?v={base.IMAGE_VERSION}",
        "pageUrl": candidate.page_url,
        "filePageUrl": candidate.file_page_url,
        "author": candidate.author,
        "license": candidate.license_name,
        "licenseUrl": candidate.license_url,
        "source": candidate.source,
        "evidence": candidate.evidence,
        "downloadBytes": byte_count,
        "width": width,
        "height": height,
    }


def recover(place: dict):
    errors = []
    output = base.IMAGE_DIR / f"{place['id']}.webp"
    try:
        wiki = base.wikipedia_candidate(place)
        if wiki:
            stats = base.download_and_validate(wiki, output)
            return record_for(place, wiki, stats), errors
    except Exception as error:
        errors.append(f"wikimedia: {type(error).__name__}: {error}")

    attempts = 0
    try:
        for candidate in ddg_candidates(place):
            attempts += 1
            if attempts > MAX_DOWNLOAD_ATTEMPTS:
                break
            try:
                stats = base.download_and_validate(candidate, output)
                return record_for(place, candidate, stats), errors
            except Exception as error:
                errors.append(f"candidate {attempts}: {type(error).__name__}: {error}")
    except Exception as error:
        errors.append(f"duckduckgo search: {type(error).__name__}: {error}")
    return None, errors


def main() -> int:
    records = read_manifest()
    places = base.load_places()
    missing = [place for place in places if place["id"] not in records]
    report = []
    logging.info("Recovering %d missing destinations", len(missing))
    for index, place in enumerate(missing, 1):
        record, errors = recover(place)
        if record:
            records[place["id"]] = record
            logging.info("[%d/%d] OK %s (%s)", index, len(missing), place["name"], record["source"])
            status = "recovered"
        else:
            logging.error("[%d/%d] FAIL %s", index, len(missing), place["name"])
            status = "failed"
        report.append({"id": place["id"], "name": place["name"], "status": status, "errors": errors})
        base.write_manifest(records)
        RECOVERY_LOG.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
        time.sleep(1.25)
    logging.info("Recovery finished: %d total images", len(records))
    return 0


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    raise SystemExit(main())
