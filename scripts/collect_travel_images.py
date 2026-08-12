#!/usr/bin/env python3
"""Rebuild Korea travel-map photos with strict source and relevance checks.

Source order:
1. Korean Wikipedia page image / Wikimedia Commons API
2. DuckDuckGo image search using precise Korean queries

Only verified images larger than 10 KiB are written. Failed destinations are
left without an image and recorded in the JSON error log.
"""

from __future__ import annotations

import argparse
import concurrent.futures
import io
import json
import logging
import re
import subprocess
import tempfile
import threading
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any
from urllib.parse import quote

import requests
from PIL import Image, ImageOps, UnidentifiedImageError


ROOT = Path(__file__).resolve().parents[1]
MAP_DIR = ROOT / "learning" / "academics" / "korea-travel-map"
IMAGE_DIR = MAP_DIR / "images"
MANIFEST_PATH = MAP_DIR / "image-manifest.js"
ERROR_LOG_PATH = ROOT / "scratch" / "travel-image-collection-errors.json"
DATA_FILES = [
    "places.js", "more-places.js", "manual-places.js", "supplement-places.js",
    "value-places.js", "value-places-extra.js", "regional-value-places.js",
    "regional-fun-places.js",
]
MIN_BYTES = 10 * 1024
MIN_WIDTH = 480
MIN_HEIGHT = 270
USER_AGENT = "KoreaTravelLearningMapImageCollector/2.0 (educational site; contact via repository)"
TIMEOUT = (10, 35)
WORKERS = 6
IMAGE_VERSION = "20260812-2"
STOP_WORDS = {"국립", "시립", "도립", "공립", "재단", "대한민국", "한국", "관광지", "전경", "대표", "사진"}
REJECT_WORDS = {"로고", "logo", "아이콘", "icon", "지도", "map", "포스터", "poster", "캐릭터", "symbol"}
_thread_local = threading.local()
_wiki_semaphore = threading.Semaphore(6)


@dataclass(frozen=True)
class Candidate:
    image_url: str
    page_url: str
    file_page_url: str
    author: str
    license_name: str
    license_url: str
    source: str
    evidence: str


def session() -> requests.Session:
    if not hasattr(_thread_local, "session"):
        value = requests.Session()
        value.headers.update({"User-Agent": USER_AGENT, "Accept-Language": "ko,en;q=0.8"})
        _thread_local.session = value
    return _thread_local.session


def normalize(value: str) -> str:
    return re.sub(r"[^0-9a-z가-힣]", "", value.casefold())


def meaningful_tokens(name: str) -> list[str]:
    tokens = re.findall(r"[0-9A-Za-z가-힣]+", name.casefold())
    useful = [token for token in tokens if token not in STOP_WORDS and len(token) >= 2]
    return useful or [normalize(name)]


def is_relevant(name: str, *texts: str) -> bool:
    haystack = normalize(" ".join(texts))
    exact = normalize(name)
    if exact and exact in haystack:
        return True
    tokens = meaningful_tokens(name)
    return bool(tokens) and sum(token in haystack for token in tokens) / len(tokens) >= 0.75


def reject_visual_text(*texts: str) -> bool:
    combined = " ".join(texts).casefold()
    return any(word in combined for word in REJECT_WORDS)


def _api_json_with_retries(url: str, params: dict[str, Any]) -> dict[str, Any]:
    for attempt in range(1):
        request_timeout = (5, 12) if "wikipedia.org" in url or "wikimedia.org" in url else TIMEOUT
        response = session().get(url, params=params, timeout=request_timeout)
        if response.status_code not in {429, 500, 502, 503, 504}:
            response.raise_for_status()
            return response.json()
        if attempt == 0:
            response.raise_for_status()
        retry_after = response.headers.get("retry-after")
        delay = float(retry_after) if retry_after and retry_after.isdigit() else 1.5 * (2 ** attempt)
        time.sleep(delay)
    raise RuntimeError("API retry loop exhausted")


def api_json(url: str, params: dict[str, Any]) -> dict[str, Any]:
    if "wikipedia.org" in url or "wikimedia.org" in url:
        with _wiki_semaphore:
            return _api_json_with_retries(url, params)
    return _api_json_with_retries(url, params)


def load_places() -> list[dict[str, Any]]:
    script = """
const fs = require('fs'); const vm = require('vm');
const root = process.argv[1]; const files = JSON.parse(process.argv[2]);
const context = { window: {} }; vm.createContext(context);
for (const file of files) vm.runInContext(fs.readFileSync(root + '/' + file, 'utf8'), context, { filename: file });
process.stdout.write(JSON.stringify(context.window.KOREA_TRAVEL_PLACES || []));
"""
    result = subprocess.run(
        ["node", "-e", script, str(MAP_DIR), json.dumps(DATA_FILES)],
        check=True, capture_output=True, text=True, encoding="utf-8",
    )
    places = json.loads(result.stdout)
    unique: dict[str, dict[str, Any]] = {}
    for place in places:
        if place.get("id") and place.get("name"):
            unique[place["id"]] = place
    return list(unique.values())


def commons_metadata(title: str, page_url: str, evidence: str) -> Candidate | None:
    data = api_json("https://commons.wikimedia.org/w/api.php", {
        "action": "query", "format": "json", "prop": "imageinfo", "titles": title,
        "iiprop": "url|size|mime|extmetadata", "iiurlwidth": 1600,
    })
    page = next(iter(data.get("query", {}).get("pages", {}).values()), {})
    info = (page.get("imageinfo") or [None])[0]
    if not info or not str(info.get("mime", "")).startswith("image/"):
        return None
    metadata = info.get("extmetadata") or {}
    get_value = lambda key: re.sub(r"<[^>]+>", "", str((metadata.get(key) or {}).get("value", ""))).strip()
    return Candidate(
        image_url=info.get("thumburl") or info.get("url", ""),
        page_url=page_url,
        file_page_url=info.get("descriptionurl") or f"https://commons.wikimedia.org/wiki/{quote(title.replace(' ', '_'))}",
        author=get_value("Artist") or "Wikimedia Commons contributor",
        license_name=get_value("LicenseShortName") or "Wikimedia Commons",
        license_url=get_value("LicenseUrl"),
        source="wikimedia",
        evidence=evidence,
    )


def wikipedia_candidate(place: dict[str, Any]) -> Candidate | None:
    name = place["name"]
    exact_titles = list(dict.fromkeys(filter(None, [place.get("wikiTitle"), name])))
    direct = api_json("https://ko.wikipedia.org/w/api.php", {
        "action": "query", "format": "json", "titles": "|".join(exact_titles),
        "prop": "pageimages|info", "piprop": "name", "inprop": "url", "redirects": 1,
    })
    direct_pages = list(direct.get("query", {}).get("pages", {}).values())
    direct_pages.sort(key=lambda page: normalize(page.get("title", "")) != normalize(name))
    for page in direct_pages:
        title = page.get("title", "")
        image_name = page.get("pageimage", "")
        if page.get("missing") is not None or not image_name:
            continue
        if not is_relevant(name, title) or reject_visual_text(image_name):
            continue
        candidate = commons_metadata(f"File:{image_name}", page.get("fullurl", ""), f"Wikipedia exact title: {title}")
        if candidate:
            return candidate

    return None


def commons_search_candidate(place: dict[str, Any]) -> Candidate | None:
    name = place["name"]
    region = place.get("region", "")
    for query in (f'"{name}" 전경', f'"{name}" 관광지'):
        data = api_json("https://commons.wikimedia.org/w/api.php", {
            "action": "query", "format": "json", "generator": "search",
            "gsrsearch": query, "gsrnamespace": 6, "gsrlimit": 12,
            "prop": "imageinfo", "iiprop": "url|size|mime|extmetadata", "iiurlwidth": 1600,
        })
        pages = list(data.get("query", {}).get("pages", {}).values())
        for page in sorted(pages, key=lambda value: value.get("index", 999)):
            title = page.get("title", "")
            info = (page.get("imageinfo") or [None])[0]
            if not info or reject_visual_text(title):
                continue
            metadata = info.get("extmetadata") or {}
            description = " ".join(str((metadata.get(key) or {}).get("value", "")) for key in ("ImageDescription", "ObjectName", "Categories"))
            if not is_relevant(name, title, description, region):
                continue
            candidate = commons_metadata(title, f"https://commons.wikimedia.org/wiki/{quote(title.replace(' ', '_'))}", f"Commons search: {query}")
            if candidate:
                return candidate
    return None


def ddg_token(query: str) -> str:
    response = session().get("https://duckduckgo.com/", params={"q": query}, timeout=TIMEOUT)
    response.raise_for_status()
    match = re.search(r"vqd=['\"]?([\d-]+)", response.text)
    if not match:
        match = re.search(r"vqd=([\d-]+)&", response.text)
    if not match:
        raise RuntimeError("DuckDuckGo vqd token not found")
    return match.group(1)


def duckduckgo_candidate(place: dict[str, Any]) -> Candidate | None:
    name = place["name"]
    region = place.get("region", "")
    for query in (f'"{name}" 전경 대표 사진', f'"{name}" 관광지'):
        token = ddg_token(query)
        data = api_json("https://duckduckgo.com/i.js", {
            "l": "kr-kr", "o": "json", "q": query, "vqd": token, "f": ",,,", "p": "1",
        })
        for item in data.get("results", []):
            title = str(item.get("title", ""))
            source = str(item.get("source", ""))
            page_url = str(item.get("url", ""))
            image_url = str(item.get("image", ""))
            if not image_url or reject_visual_text(title, image_url):
                continue
            if not is_relevant(name, title, source, page_url, region):
                continue
            return Candidate(
                image_url=image_url, page_url=page_url, file_page_url=page_url,
                author=source or "Source website", license_name="Source website; verify reuse rights",
                license_url=page_url, source="duckduckgo", evidence=f"DuckDuckGo: {query} | {title}",
            )
    return None


def download_and_validate(candidate: Candidate, output_path: Path) -> tuple[int, int, int]:
    response = session().get(candidate.image_url, timeout=TIMEOUT, stream=True)
    response.raise_for_status()
    content_type = response.headers.get("content-type", "").casefold()
    if content_type and "image" not in content_type and "application/octet-stream" not in content_type:
        raise ValueError(f"non-image content type: {content_type}")
    payload = response.content
    if len(payload) <= MIN_BYTES:
        raise ValueError(f"image too small: {len(payload)} bytes")
    try:
        with Image.open(io.BytesIO(payload)) as image:
            image.load()
            image = ImageOps.exif_transpose(image)
            width, height = image.size
            if width < MIN_WIDTH or height < MIN_HEIGHT:
                raise ValueError(f"resolution too small: {width}x{height}")
            if image.mode not in ("RGB", "RGBA"):
                image = image.convert("RGB")
            elif image.mode == "RGBA":
                background = Image.new("RGB", image.size, "white")
                background.paste(image, mask=image.getchannel("A"))
                image = background
            image.thumbnail((1600, 1000), Image.Resampling.LANCZOS)
            with tempfile.NamedTemporaryFile(dir=output_path.parent, suffix=".webp", delete=False) as temp:
                temp_path = Path(temp.name)
            try:
                image.save(temp_path, "WEBP", quality=84, method=6)
                if temp_path.stat().st_size <= MIN_BYTES:
                    raise ValueError(f"encoded image too small: {temp_path.stat().st_size} bytes")
                temp_path.replace(output_path)
            finally:
                temp_path.unlink(missing_ok=True)
    except UnidentifiedImageError as error:
        raise ValueError("download is not a decodable image") from error
    return len(payload), width, height


def collect_one(place: dict[str, Any]) -> tuple[str, dict[str, Any] | None, dict[str, Any] | None]:
    errors: list[str] = []
    for finder in (wikipedia_candidate, duckduckgo_candidate):
        try:
            candidate = finder(place)
            if not candidate:
                errors.append(f"{finder.__name__}: no relevant candidate")
                continue
            output_path = IMAGE_DIR / f"{place['id']}.webp"
            byte_count, width, height = download_and_validate(candidate, output_path)
            record = {
                "src": f"images/{place['id']}.webp?v={IMAGE_VERSION}", "pageUrl": candidate.page_url,
                "filePageUrl": candidate.file_page_url, "author": candidate.author,
                "license": candidate.license_name, "licenseUrl": candidate.license_url,
                "source": candidate.source, "evidence": candidate.evidence,
                "downloadBytes": byte_count, "width": width, "height": height,
            }
            return place["id"], record, None
        except Exception as error:  # keep batch running and log each failed source
            errors.append(f"{finder.__name__}: {type(error).__name__}: {error}")
    return place["id"], None, {"id": place["id"], "name": place["name"], "errors": errors}


def write_manifest(records: dict[str, dict[str, Any]]) -> None:
    ordered = {key: records[key] for key in sorted(records)}
    text = "window.KOREA_TRAVEL_IMAGES = " + json.dumps(ordered, ensure_ascii=False, indent=2) + ";\n"
    MANIFEST_PATH.write_text(text, encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--keep-existing", action="store_true", help="do not delete currently managed WebP images")
    parser.add_argument("--limit", type=int, default=0, help="process only the first N places (for testing)")
    parser.add_argument("--workers", type=int, default=WORKERS)
    args = parser.parse_args()

    places = load_places()
    if args.limit:
        places = places[:args.limit]
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    ERROR_LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    if not args.keep_existing:
        managed_ids = {place["id"] for place in places}
        targets = [path for path in IMAGE_DIR.glob("*.webp") if path.stem in managed_ids]
        for path in targets:
            path.unlink()
        logging.warning("Deleted %d managed images before rebuilding", len(targets))

    records: dict[str, dict[str, Any]] = {}
    failures: list[dict[str, Any]] = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=max(1, args.workers)) as pool:
        future_map = {pool.submit(collect_one, place): place for place in places}
        for index, future in enumerate(concurrent.futures.as_completed(future_map), 1):
            place = future_map[future]
            try:
                place_id, record, failure = future.result()
            except Exception as error:
                place_id, record = place["id"], None
                failure = {"id": place_id, "name": place["name"], "errors": [f"worker: {type(error).__name__}: {error}"]}
            if record:
                records[place_id] = record
                logging.info("[%d/%d] OK %s (%s)", index, len(places), place["name"], record["source"])
            else:
                failures.append(failure or {"id": place_id, "name": place["name"], "errors": ["unknown failure"]})
                logging.error("[%d/%d] FAIL %s", index, len(places), place["name"])
            if index % 20 == 0:
                write_manifest(records)
                ERROR_LOG_PATH.write_text(json.dumps(failures, ensure_ascii=False, indent=2), encoding="utf-8")

    write_manifest(records)
    ERROR_LOG_PATH.write_text(json.dumps(failures, ensure_ascii=False, indent=2), encoding="utf-8")
    logging.info("Finished: %d images, %d failures", len(records), len(failures))
    return 0 if records else 1


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    raise SystemExit(main())
