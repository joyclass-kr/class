"""data/unit-overrides.json의 단원 바로잡기를 questions.json에 반영한다.

문항 번호로 기계적으로 붙은 단원에는 어긋난 것이 섞여 있다(19~24번이 조선 전기로
묶여 있지만 대동법·정조 문제가 들어 있는 식). 그림뿐인 문항이 많아 낱말로 고치는
장치가 거의 돌지 못해서 생긴 일이다. 해설을 보고 손으로 판정한 결과를 여기에 모아
두고, 자료를 다시 만들 때마다 이 파일을 덮어씌운다.

    python scripts/apply_unit_overrides.py
    python scripts/build_data.py
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OVERRIDES = ROOT / "data" / "unit-overrides.json"
QUESTIONS = ROOT / "data" / "questions.json"

UNIT_NAMES = {
    "prehistoric": "선사 시대와 고조선",
    "early-states": "여러 나라의 성장",
    "three-kingdoms": "삼국과 가야",
    "north-south": "남북국 시대",
    "goryeo-founding": "건국과 통치 체제",
    "goryeo-military": "문벌과 무신 정권",
    "goryeo-war": "거란·여진·몽골 항쟁",
    "goryeo-late": "원 간섭기와 고려 말",
    "goryeo-economy": "경제와 사회",
    "goryeo-culture": "문화와 사상",
    "goryeo": "고려 (갈래 미정)",
    "joseon-early": "조선 전기",
    "joseon-late": "조선 후기",
    "opening": "개항기와 대한제국",
    "occupation": "일제강점기",
    "contemporary": "대한민국 현대사",
    "integrated": "시대 통합",
}


def load_overrides() -> dict[tuple[int, int], str]:
    raw = json.loads(OVERRIDES.read_text(encoding="utf-8"))
    table: dict[tuple[int, int], str] = {}
    for exam, numbers in raw.items():
        if exam.startswith("_"):
            continue
        for number, unit_id in numbers.items():
            if unit_id not in UNIT_NAMES:
                raise SystemExit(f"모르는 단원 아이디: {unit_id} (제{exam}회 {number}번)")
            table[(int(exam), int(number))] = unit_id
    return table


def main() -> None:
    table = load_overrides()
    questions = json.loads(QUESTIONS.read_text(encoding="utf-8"))
    changed = 0
    unseen = set(table)

    for question in questions:
        key = (question["exam"], question["number"])
        unit_id = table.get(key)
        if unit_id is None:
            continue
        unseen.discard(key)
        if question["unitId"] == unit_id:
            continue
        question["unitId"] = unit_id
        question["unit"] = UNIT_NAMES[unit_id]
        changed += 1

    if unseen:
        raise SystemExit(f"자료에 없는 문항을 고치려 합니다: {sorted(unseen)}")

    QUESTIONS.write_text(
        json.dumps(questions, ensure_ascii=False, indent=1) + "\n", encoding="utf-8"
    )
    print(f"바로잡기 {len(table)}개 가운데 {changed}개를 반영했습니다.")

    counts: dict[str, int] = {}
    for question in questions:
        counts[question["unit"]] = counts.get(question["unit"], 0) + 1
    order = [UNIT_NAMES[key] for key in UNIT_NAMES]
    for name in order:
        if name in counts:
            print(f"  {counts[name]:4d}  {name}")


if __name__ == "__main__":
    main()
