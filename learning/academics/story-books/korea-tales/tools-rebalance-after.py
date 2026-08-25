# -*- coding: utf-8 -*-
"""동화틀 「읽고 나서」 두 칸을 고르게 다시 가른다.

    python tools-rebalance-after.py [slug ...]      (없으면 동화틀 전권)

글자 수로만 가르면 안 된다. **문단 하나마다 줄이 하나씩 더 든다.**
문단이 끝나면 그 줄의 남은 자리가 버려지고, 문단 사이 여백도 붙기 때문이다.
그래서 칸 높이를 이렇게 어림한다.

    값 = 글자수 + 문단수 × 45

45는 한 줄에 들어가는 글자 수(28자)와 문단 사이 여백을 합쳐 잡은 것이다.
"""
import io, json, os, re, sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
BOOKS = os.path.dirname(os.path.abspath(__file__))
STR = r'"((?:[^"\\]|\\.)*)"'
PARA_COST = 45


def esc(s):
    return s.replace('\\', '\\\\').replace('"', '\\"')


def cost(ps):
    return sum(len(re.sub(r'\s', '', p)) for p in ps) + len(ps) * PARA_COST


def one(slug):
    p = os.path.join(BOOKS, slug, 'app.js')
    raw = io.open(p, 'rb').read().decode('utf-8')
    crlf = '\r\n' in raw
    s = raw.replace('\r\n', '\n')
    m = re.search(r'const AFTERWORD = \{.*?\n\};', s, re.S)
    if not m:
        return None
    block = m.group(0)
    left = re.findall(STR, re.search(r'left: \[(.*?)\n            \],', block, re.S).group(1))
    right = re.findall(STR, re.search(r'right: \[(.*?)\n            \]', block, re.S).group(1))
    paras = left + right

    # 자를 자리를 하나씩 다 넣어 보고 두 칸 차이가 가장 작은 데를 고른다.
    # 제목이 왼쪽에만 있으므로 왼쪽에 제목 한 줄 값을 얹어 셈한다.
    best = min(range(1, len(paras)),
               key=lambda k: abs((cost(paras[:k]) + 50) - cost(paras[k:])))
    L, R = paras[:best], paras[best:]

    new = block
    new = re.sub(r'left: \[(.*?)\n            \],',
                 'left: [\n%s\n            ],' % ',\n'.join('                "%s"' % esc(x) for x in L),
                 new, count=1, flags=re.S)
    new = re.sub(r'right: \[(.*?)\n            \]',
                 'right: [\n%s\n            ]' % ',\n'.join('                "%s"' % esc(x) for x in R),
                 new, count=1, flags=re.S)
    s = s.replace(block, new)
    io.open(p, 'wb').write((s.replace('\n', '\r\n') if crlf else s).encode('utf-8'))
    return len(L), cost(L) + 50, len(R), cost(R)


def main():
    slugs = sys.argv[1:] or json.load(io.open(os.path.join(BOOKS, '_books-pic.json'), encoding='utf-8'))
    worst = 0
    for slug in slugs:
        r = one(slug)
        if not r:
            continue
        l, lc, rr, rc = r
        gap = abs(lc - rc)
        worst = max(worst, gap)
        print('%-24s 왼 %d문단(%3d) · 오른 %d문단(%3d) · 차이 %d' % (slug, l, lc, rr, rc, gap))
    print('--- 가장 기운 칸 차이 %d' % worst)


main()
