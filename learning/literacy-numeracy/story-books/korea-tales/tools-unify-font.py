# -*- coding: utf-8 -*-
"""전래동화 글씨 크기를 세계명작 트랙과 같은 식으로 바꾼다.

    python tools-unify-font.py [--frame] [slug ...]

세계명작은 글씨를 창 너비(vw)가 아니라 책 높이(cqh)에 매어 두어서,
화면이 커지면 책과 함께 글씨도 커진다. 전래동화는 18px에서 멈춰 있어
1920x1080에서 25.3px 대 18px로 벌어졌다.

규칙은 세계명작 styles.css에서 역산했다.
    clamp(A, N vw, B)  ->  clamp(A, B*0.14472 cqh, B*1.5)
B*0.14472 는 책 높이 691px(=1366x768)에서 정확히 B가 되는 값이다.
그래서 작은 화면에서는 한 픽셀도 안 달라지고 큰 화면에서만 커진다.

--frame 을 주면 그림 칸과 책 비율까지 세계명작에 맞춘다.
글씨만 키우면 글 칸이 모자라 넘치기 때문이다.
"""
import io, os, re, sys

BOOKS = os.path.dirname(os.path.abspath(__file__))
args = sys.argv[1:]
FRAME = '--frame' in args
slugs = [a for a in args if not a.startswith('--')]


def conv(m):
    lo, cap = m.group(1), float(m.group(3))
    new_cap = cap * 1.5
    cq = cap * 0.14472
    cap_s = ('%g' % round(new_cap, 1))
    return 'clamp(%s, %gcqh, %spx)' % (lo, round(cq, 3), cap_s)


def patch(path):
    s = io.open(path, encoding='utf-8').read()
    o = s
    s = re.sub(r'clamp\((\d+(?:\.\d+)?px), (\d+(?:\.\d+)?)vw, (\d+(?:\.\d+)?)px\)', conv, s)
    s = s.replace('container-type: inline-size;', 'container-type: size;')
    if FRAME:
        s = s.replace('width: min(1300px, 92vw, calc(90vh * 4 / 3));\n    aspect-ratio: 4 / 3;',
                      'width: min(1300px, 92vw, calc(90vh * 5 / 4));\n    aspect-ratio: 5 / 4;')
        s = s.replace('.spread-art {\n    flex: 1 1 70%;',
                      '.spread-art {\n    flex: 0 0 auto;\n    aspect-ratio: 2 / 1;')
        s = s.replace('.spread-text {\n    flex: 1 1 30%;', '.spread-text {\n    flex: 1 1 auto;')
        s = s.replace('.spread-art { flex-basis: 55%; }', '.spread-art { flex: 1 1 55%; aspect-ratio: auto; }')
        s = s.replace('.spread-text { flex-basis: 45%; }', '.spread-text { flex: 1 1 45%; }')
    if s != o:
        io.open(path, 'w', encoding='utf-8').write(s)
        return True
    return False


targets = slugs or [n for n in sorted(os.listdir(BOOKS))
                    if os.path.isfile(os.path.join(BOOKS, n, 'styles.css'))]
n = 0
for slug in targets:
    p = os.path.join(BOOKS, slug, 'styles.css')
    if os.path.isfile(p) and patch(p):
        n += 1
print(u'고친 파일 %d개 (frame=%s)' % (n, FRAME))
