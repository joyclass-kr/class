"""KanjiVG에 없는 글자의 필순을, 있는 부품 글자의 획을 옮겨 붙여 만든다.

硏처럼 우리가 쓰는 자형이 KanjiVG(일본 자형)·makemeahanzi(중국 자형)에 없을 때 쓴다.
획의 모양과 순서는 부품 글자의 것을 그대로 가져오고, 자리와 크기만 옮긴다.
"""
import io
import json
import os
import re
import sys
from xml.etree import ElementTree as ET

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KVG = os.path.join(ROOT, 'tmp/kanjivg/kanji')

NUMBER = re.compile(r'-?\d*\.?\d+')
COMMAND = re.compile(r'([MmLlHhVvCcSsQqTtAaZz])')


def strokes_of(character):
    code = f'{ord(character):05x}'
    root = ET.parse(os.path.join(KVG, f'{code}.svg')).getroot()
    group = next(e for e in root.iter()
                 if e.tag.endswith('g') and e.get('id') == f'kvg:StrokePaths_{code}')
    return [e.get('d') for e in group.iter() if e.tag.endswith('path') and e.get('d')]


# 명령마다 좌표쌍이 몇 개씩 묶이는지 (C는 조절점 둘 + 끝점 하나)
ARITY = {'M': 1, 'L': 1, 'T': 1, 'C': 3, 'S': 2, 'Q': 2}


def points(path):
    """획이 실제로 지나는 점(끝점)만 훑는다. 조절점은 셈에 넣지 않는다."""
    tokens = [t for t in COMMAND.split(path) if t.strip()]
    x = y = 0.0
    command = 'M'
    for token in tokens:
        if COMMAND.fullmatch(token):
            command = token
            continue
        letter = command.upper()
        if letter == 'Z':
            continue
        size = ARITY.get(letter, 1)
        values = [float(v) for v in NUMBER.findall(token)]
        for start in range(0, len(values) - 1, size * 2):
            group = values[start:start + size * 2]
            if len(group) < size * 2:
                break
            dx, dy = group[-2], group[-1]      # 마지막 쌍이 끝점
            if command.isupper():
                x, y = dx, dy
            else:
                x, y = x + dx, y + dy
            yield x, y


def box(paths):
    xs, ys = [], []
    for path in paths:
        for x, y in points(path):
            xs.append(x)
            ys.append(y)
    return min(xs), min(ys), max(xs), max(ys)


def transform(path, scale_x, scale_y, shift_x, shift_y):
    out = []
    tokens = [t for t in COMMAND.split(path) if t.strip()]
    command = 'M'
    for token in tokens:
        if COMMAND.fullmatch(token):
            command = token
            out.append(token)
            continue
        values = [float(v) for v in NUMBER.findall(token)]
        moved = []
        for i in range(0, len(values) - 1, 2):
            x, y = values[i], values[i + 1]
            if command.isupper():          # 절대 좌표는 늘이고 옮긴다
                moved += [x * scale_x + shift_x, y * scale_y + shift_y]
            else:                          # 상대 좌표는 늘이기만 한다
                moved += [x * scale_x, y * scale_y]
        out.append(','.join(f'{v:.2f}' for v in moved))
    return ''.join(out)


def place(paths, target):
    """부품 획을 target 상자(x0, y0, x1, y1) 안에 맞춘다."""
    x0, y0, x1, y1 = box(paths)
    tx0, ty0, tx1, ty1 = target
    scale_x = (tx1 - tx0) / (x1 - x0)
    scale_y = (ty1 - ty0) / (y1 - y0)
    return [transform(p, scale_x, scale_y, tx0 - x0 * scale_x, ty0 - y0 * scale_y) for p in paths]


def compose_yeon():
    """硏 = 石(研의 왼쪽 부수 획을 그대로) + 幵(KanjiVG 글자를 오른쪽에 앉힘)."""
    stone = strokes_of('研')[:5]
    right_of_research = strokes_of('研')[5:]
    target = box(right_of_research)
    gyeon = place(strokes_of('幵'), target)
    return stone + gyeon


def main():
    strokes_path = os.path.join(ROOT, 'scripts/hanja-strokes.json')
    strokes = json.load(io.open(strokes_path, encoding='utf-8'))
    strokes['硏'] = compose_yeon()
    with io.open(strokes_path, 'w', encoding='utf-8') as stream:
        json.dump(strokes, stream, ensure_ascii=False, indent=2)
        stream.write('\n')
    print(f"硏 필순 {len(strokes['硏'])}획을 石(研)과 幵에서 옮겨 붙였습니다. 전체 {len(strokes)}자")


if __name__ == '__main__':
    main()
