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
    ("tk-unify", "삼국 통일 전쟁"),
    ("tk-goguryeo", "고구려"),
    ("tk-baekje", "백제"),
    ("tk-silla", "신라와 가야"),
    ("three-kingdoms", "삼국과 가야 (갈래 미정)"),
    ("ns-balhae", "발해"),
    ("ns-late", "신라 말과 후삼국"),
    ("ns-unified", "통일 신라"),
    ("north-south", "남북국 시대 (갈래 미정)"),
    ("goryeo-founding", "건국과 통치 체제"),
    ("goryeo-military", "문벌과 무신 정권"),
    ("goryeo-war", "거란·여진·몽골 항쟁"),
    ("goryeo-late", "원 간섭기와 고려 말"),
    ("goryeo-economy", "경제와 사회"),
    ("goryeo-culture", "문화와 사상"),
    ("goryeo", "고려 (갈래 미정)"),
    ("je-culture", "조선 전기의 문화"),
    ("je-war", "대외 관계와 임진왜란"),
    ("je-sarim", "사림과 사화"),
    ("je-founding", "건국과 통치 체제"),
    ("joseon-early", "조선 전기 (갈래 미정)"),
    ("jl-sedo", "세도 정치와 농민 봉기"),
    ("jl-tangpyeong", "탕평과 개혁"),
    ("jl-economy", "수취 제도와 경제"),
    ("jl-silhak", "실학과 서민 문화"),
    ("jl-war", "양 난과 붕당 정치"),
    ("joseon-late", "조선 후기 (갈래 미정)"),
    ("opening-daewongun", "흥선 대원군과 통상 수교 거부"),
    ("opening-reform", "개항과 개화 정책"),
    ("opening-donghak", "동학 농민 운동과 갑오개혁"),
    ("opening-empire", "대한 제국과 독립 협회"),
    ("opening-loss", "국권 피탈과 애국 계몽"),
    ("opening", "개항기와 대한제국 (갈래 미정)"),
    ("occupation-rule", "일제의 식민 통치"),
    ("occupation-samil", "3·1 운동과 임시 정부"),
    ("occupation-domestic", "국내 민족 운동"),
    ("occupation-army", "무장 독립 전쟁"),
    ("occupation-uiyeol", "의열 투쟁"),
    ("occupation-culture", "민족 문화와 국외 동포"),
    ("occupation", "일제강점기 (갈래 미정)"),
    ("contemporary-founding", "광복과 정부 수립"),
    ("contemporary-war", "6·25 전쟁"),
    ("contemporary-democracy", "민주주의의 발전"),
    ("contemporary-economy", "경제 성장과 사회 변화"),
    ("contemporary-unification", "통일 노력과 북한"),
    ("contemporary", "대한민국 현대사 (갈래 미정)"),
    ("it-custom", "세시 풍속과 놀이"),
    ("it-region", "지역의 역사"),
    ("it-theme", "시대를 가로지르는 주제"),
    ("integrated", "시대 통합 (갈래 미정)"),
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

    # 해설은 회차별로 나눈다. 한 회차를 푸는 아이가 650개를 다 받지 않도록.
    # 화면은 고른 회차의 파일만 받아 window.HANGUKSA_EXPLANATIONS에 채워 넣는다.
    by_exam: dict[str, dict] = {}
    for question_id, note in explanations.items():
        by_exam.setdefault(question_id.split("-")[0], {})[question_id] = note

    exam_dir = DATA_DIR / "explanations"
    exam_dir.mkdir(exist_ok=True)
    for stale in exam_dir.glob("*.js"):
        stale.unlink()
    for exam, notes in sorted(by_exam.items()):
        (exam_dir / f"{exam}.js").write_text(
            "// scripts/build_data.py가 data/explanations.json에서 만든다. 손으로 고치지 않는다.\n"
            "window.HANGUKSA_EXPLANATIONS = Object.assign(window.HANGUKSA_EXPLANATIONS || {}, "
            + json.dumps(notes, ensure_ascii=False, indent=1)
            + ");\n",
            encoding="utf-8",
        )

    old_bundle = DATA_DIR / "explanations.js"
    if old_bundle.exists():
        old_bundle.unlink()

    print(f"문항 {len(slim)}개, 회차 {exams}")
    print(f"해설 {len(explanations)}개를 회차 {len(by_exam)}개로 나눔, 아직 없는 문항 {len(missing)}개")


if __name__ == "__main__":
    main()
