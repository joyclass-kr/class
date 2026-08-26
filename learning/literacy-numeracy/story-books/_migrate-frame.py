# -*- coding: utf-8 -*-
"""전래동화 62권과 명작소설 42권을 확정 책 틀 규격으로 옮긴다.

    python _migrate-frame.py korea-tales world-novels

규격은 world-tales 59권에 이미 적용된 것이고, 기억 [[book-frame-spec]]에 적혀 있다.
- 책 높이를 100dvh-46px로 잡아 크롬북에 딱 맞춘다 (90vh는 46px이 삐져나갔다)
- 글씨를 창 너비(vw)가 아니라 책 높이(cqh)에 매어 어느 책이든 같게 한다
- 그림칸은 flex-basis로 잡는다 (aspect-ratio는 flex-basis에 밀려 안 먹힌다)
"""
import io, os, re, sys

ROOT = os.path.dirname(os.path.abspath(__file__))


def cq(m):
    lo, n, cap = m.group(1), float(m.group(2)), float(m.group(3))
    seen = min(cap, n * 13.66)          # 1366px 화면에서 보이던 크기
    return 'clamp(%s, %gcqh, %dpx)' % (lo, round(seen / 691 * 100, 3),
                                       int(round(seen / 691 * 1040)))


PORTRAIT_PIC = """@media (max-width: 820px), (orientation: portrait) and (max-width: 1100px) {
    .book { width: min(900px, 96vw, calc((100dvh - 46px) * 3 / 4)); aspect-ratio: 3 / 4; }
    .nav-prev { left: 6px; }
    .nav-next { right: 6px; }
    .page-cover { grid-template-columns: 1fr; grid-template-rows: 30% 70%; }
    .page-toc { grid-template-columns: 1fr; grid-template-rows: 1fr 1fr; }
    .page-toc .story-page-left { border-right: none; border-bottom: 1px solid rgba(92, 58, 34, 0.22); }
    /* 세로 화면은 한 쪽만 보이므로 두 칸을 나란히 두면 글줄이 너무 짧아진다.
       위아래로 쌓고, 그림을 줄여 글자리를 넓힌다. */
    .spread-art { flex: 0 0 35%; aspect-ratio: auto; }
    .spread-text { flex: 1 1 62%; display: flex; flex-direction: column; }
    .spread-text-left, .spread-text-right { flex: 0 1 auto; }
    .spread-text-left { border-right: none; border-bottom: 1px solid rgba(92, 58, 34, 0.22); }
}"""


def patch(path):
    s = io.open(path, encoding='utf-8').read()
    o = s
    pic = '.spread-art {' in s

    # 1. 책 바깥 여백 — 책 밖으로 나가는 것이 46px가 되도록
    s = s.replace('    padding: 20px;\n', '    padding: 10px;\n', 1)
    s = s.replace('    gap: 14px;\n', '    gap: 8px;\n', 1)

    # 2. 책 크기 — 크롬북에서 스크롤이 안 생기게
    s = s.replace('width: min(1300px, 92vw, calc(90vh * 4 / 3));',
                  'width: min(1300px, 96vw, calc((100dvh - 46px) * 4 / 3));')

    # 3. cqh 기준 상자
    if 'container-type' in s:
        s = s.replace('container-type: inline-size;', 'container-type: size;')
    else:
        s = re.sub(r'(\.book \{\n(?:.*\n)*?)(\})',
                   lambda m: m.group(1) + '    container-type: size;\n' + m.group(2), s, count=1)

    # 4. 글씨·여백을 책 높이 기준으로
    s = re.sub(r'clamp\((\d+(?:\.\d+)?px), (\d+(?:\.\d+)?)vw, (\d+(?:\.\d+)?)px\)', cq, s)

    if pic:
        # 5. 그림 62.5 / 글 37.5
        s = s.replace('.spread-art {\n    position: relative;\n    flex: 1 1 70%;',
                      '.spread-art {\n    position: relative;\n'
                      '    /* 그림 62.5% / 글 37.5%. flex-basis로 잡아야 한다.\n'
                      '       aspect-ratio로 적으면 flex-basis에 밀려 안 먹힌다. */\n'
                      '    flex: 0 0 62.5%;')
        s = s.replace('.spread-text {\n    flex: 1 1 30%;', '.spread-text {\n    flex: 1 1 auto;')
        s = s.replace('    padding: clamp(8px, 1.3cqw, 26px);',
                      '    padding: clamp(6px, 1.0cqw, 14px) clamp(10px, 2cqw, 28px);')
        s = re.sub(r'(\.spread-text p \{\n    margin: 0 0 )6px;', r'\g<1>4px;', s)
        # 6. 세로 화면
        s = re.sub(r'@media \(max-width: 820px\) \{\n(?:.*\n)*?\}', PORTRAIT_PIC, s, count=1)
    else:
        s = s.replace('@media (max-width: 820px) {\n    .book { width: min(560px, 92vw, calc(90vh * 3 / 4)); aspect-ratio: 3 / 4; }',
                      '@media (max-width: 820px), (orientation: portrait) and (max-width: 1100px) {\n'
                      '    .book { width: min(900px, 96vw, calc((100dvh - 46px) * 3 / 4)); aspect-ratio: 3 / 4; }')
        s = s.replace('    gap: 10px;\n    padding: 10px 14px;',
                      '    gap: clamp(6px, 1.16cqh, 12px);\n    padding: clamp(6px, 1.16cqh, 12px) 14px;')

    if s != o:
        io.open(path, 'w', encoding='utf-8').write(s)
        return 'pic' if pic else 'novel'
    return None


tot = {'pic': 0, 'novel': 0}
for track in sys.argv[1:]:
    d = os.path.join(ROOT, track)
    for slug in sorted(os.listdir(d)):
        p = os.path.join(d, slug, 'styles.css')
        if os.path.isfile(p):
            r = patch(p)
            if r:
                tot[r] += 1
print(u'동화틀 %d권, 소설틀 %d권 옮김' % (tot['pic'], tot['novel']))
