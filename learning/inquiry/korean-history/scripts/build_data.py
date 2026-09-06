"""data/questions.json과 data/explanations.json을 화면이 읽는 JS 파일로 바꾼다.

가져오기(import_official_basic.py)가 questions.json을 쓰고, 해설은 손으로 explanations.json에 적는다.
화면은 file:// 로도 열려야 해서 JSON을 fetch하지 않고 <script>로 싣는다.
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"

UNITS = [
    ("prehistoric", "선사 시대와 고조선"),
    ("early-states", "여러 나라의 성장"),
    ("three-kingdoms", "삼국과 가야"),
    ("north-south", "남북국 시대"),
    ("goryeo-founding", "건국과 통치 체제"),
    ("goryeo-military", "문벌과 무신 정권"),
    ("goryeo-war", "거란·여진·몽골 항쟁"),
    ("goryeo-late", "원 간섭기와 고려 말"),
    ("goryeo-economy", "경제와 사회"),
    ("goryeo-culture", "문화와 사상"),
    ("goryeo", "고려 (갈래 미정)"),
    ("joseon-early", "조선 전기"),
    ("joseon-late", "조선 후기"),
    ("opening", "개항기와 대한제국"),
    ("occupation", "일제강점기"),
    ("contemporary", "대한민국 현대사"),
    ("integrated", "시대 통합"),
]

# 화면에 필요한 열만 싣는다. text·source는 만드는 사람이 보는 자료로 JSON에만 남긴다.
SCREEN_KEYS = ("id", "exam", "number", "answer", "points", "unitId", "topic", "image")


def main() -> None:
    questions = json.loads((DATA_DIR / "questions.json").read_text(encoding="utf-8"))
    explanations = json.loads((DATA_DIR / "explanations.json").read_text(encoding="utf-8"))

    exams = sorted({q["exam"] for q in questions}, reverse=True)
    slim = []
    for q in sorted(questions, key=lambda q: (-q["exam"], q["number"])):
        row = {key: q[key] for key in SCREEN_KEYS}
        row["image"] = row["image"].lstrip("/")
        slim.append(row)

    payload = {
        "units": [{"id": unit_id, "name": name} for unit_id, name in UNITS],
        "exams": exams,
        "questions": slim,
    }
    (DATA_DIR / "questions.js").write_text(
        "// scripts/build_data.py가 data/questions.json에서 만든다. 손으로 고치지 않는다.\n"
        "window.HANGUKSA = " + json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + ";\n",
        encoding="utf-8",
    )

    missing = [q["id"] for q in questions if q["id"] not in explanations]
    (DATA_DIR / "explanations.js").write_text(
        "// scripts/build_data.py가 data/explanations.json에서 만든다. 손으로 고치지 않는다.\n"
        "window.HANGUKSA_EXPLANATIONS = " + json.dumps(explanations, ensure_ascii=False, indent=1) + ";\n",
        encoding="utf-8",
    )
    print(f"문항 {len(slim)}개, 회차 {exams}")
    print(f"해설 {len(explanations)}개, 아직 없는 문항 {len(missing)}개")


if __name__ == "__main__":
    main()
