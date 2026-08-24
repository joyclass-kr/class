# -*- coding: utf-8 -*-
"""전래동화 62권 글씨를 명작동화·명작소설과 같은 값으로 맞춘다.

    python tools-align-font.py

2026-08-25에 옆방이 본문을 한 단 낮췄다. 한 줄에 21~24자밖에 안 들어가
"아이가 태어났 / 습니다"처럼 낱말이 잘려 넘어갔기 때문이다. 줄이 짧으면
눈이 계속 되돌아와야 해서 오히려 읽기 힘들다.

명작동화 59권과 명작소설 42권이 이미 옮겼고 전래동화 62권만 남았다.
어느 책을 펴도 글씨가 같아야 한다는 것이 사용자가 못 박은 규칙이다.
"""
import io, os

BOOKS = os.path.dirname(os.path.abspath(__file__))

# (바꿀 것, 바꿀 값) — 명작동화 styles.css에서 그대로 가져온 값이다
RULES = [
    # 본문. 소설틀은 .page-story p, 동화틀은 .spread-text p
    ('clamp(15px, 2.605cqh, 27px)', 'clamp(14px, 2.315cqh, 24px)'),
    # 표지 소개글 — 본문과 같은 크기로
    ('clamp(13.5px, 2.243cqh, 23px)', 'clamp(14px, 2.315cqh, 24px)'),
]
# 장 제목 배지는 반대로 키운다. 그림이 복잡하면 제목이 묻힌다.
BADGE_OLD = 'clamp(11px, 1.881cqh, 20px)'
BADGE_NEW = 'clamp(13px, 2.605cqh, 27px)'

n = 0
for slug in sorted(os.listdir(BOOKS)):
    p = os.path.join(BOOKS, slug, 'styles.css')
    if not os.path.isfile(p):
        continue
    s = io.open(p, encoding='utf-8').read()
    o = s
    for a, b in RULES:
        s = s.replace(a, b)
    # 배지는 그 블록 안에서만 바꾼다
    i = s.find('.spread-chapter-badge')
    if i >= 0:
        j = s.find('}', i)
        s = s[:i] + s[i:j].replace(BADGE_OLD, BADGE_NEW) + s[j:]
    if s != o:
        io.open(p, 'w', encoding='utf-8').write(s)
        n += 1
print(u'맞춘 파일 %d개' % n)
