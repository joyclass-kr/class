"""해설 조각 JSON을 data/explanations.json에 합치고 화면용 JS를 다시 만든다.

사용: python scripts/merge_explanations.py 조각1.json [조각2.json ...]
조각은 {"77-1": {"answerReason": ..., "keyPoint": ..., "wrongReason": ...}} 꼴이다.
"""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / "data" / "explanations.json"
REQUIRED = ("answerReason", "keyPoint", "wrongReason")


def main(paths: list[str]) -> None:
    merged = json.loads(TARGET.read_text(encoding="utf-8"))
    question_ids = {q["id"] for q in json.loads((ROOT / "data" / "questions.json").read_text(encoding="utf-8"))}
    added = 0
    for path in paths:
        chunk = json.loads(Path(path).read_text(encoding="utf-8"))
        for qid, note in chunk.items():
            if qid not in question_ids:
                raise SystemExit(f"없는 문항 번호: {qid}")
            missing = [key for key in REQUIRED if not note.get(key)]
            if missing:
                raise SystemExit(f"{qid}에 빠진 칸: {missing}")
            if qid not in merged:
                added += 1
            merged[qid] = {key: note[key] for key in REQUIRED}

    def order(qid: str) -> tuple[int, int]:
        exam, number = qid.split("-")
        return (-int(exam), int(number))

    merged = dict(sorted(merged.items(), key=lambda item: order(item[0])))
    TARGET.write_text(json.dumps(merged, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"새로 {added}개, 모두 {len(merged)}개 / 문항 {len(question_ids)}개")
    subprocess.run([sys.executable, str(ROOT / "scripts" / "build_data.py")], check=True)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    main(sys.argv[1:])
