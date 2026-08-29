# -*- coding: utf-8 -*-
"""「읽고 나서」가 한 펼침면에 안 들어가면 두 펼침면으로 나눈다.

    python tools-split-after.py

소설틀이 이미 이렇게 한다. `paginateAfterword()` 가 재어 보고 안 들어가면
`spreadCount` 를 늘린다. 소설틀 「읽고 나서」는 그래서 3~4 펼침면이다.
동화틀은 잴 수가 없으므로(PROBE 가 없다) 글자와 문단으로 어림해 같은 일을 한다.

    한 칸 값     C = 485
    첫 칸        C - 50   (제목이 들어간다)
    마지막 칸    C - 300  (그림과 학습 허브 단추가 들어간다)

    한 펼침면 = (C-50) + (C-300) = 620
    두 펼침면 = (C-50) + C + C + (C-300) = 1590

620은 실제로 재어 잡았다. 값 579는 통과하고 704는 21px 넘쳤다.

그림과 단추는 **마지막 펼침면** 오른쪽 칸에 붙는다. 제목은 첫 펼침면 왼쪽 칸에만 붙는다.
"""
import io, json, os, re, sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
BOOKS = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # _tools/ 위가 책 폴더
STR = r'"((?:[^"\\]|\\.)*)"'
PARA_COST = 45
COL = 620          # 세로에서 「읽고 나서」 글씨를 2cqh 로 줄인 뒤 다시 잰 값
HEAD_COST = 50
ART_COST = 300
CAP1 = (COL - HEAD_COST) + (COL - ART_COST)


def esc(s):
    return s.replace('\\', '\\\\').replace('"', '\\"')


def cost(ps):
    return sum(len(re.sub(r'\s', '', p)) for p in ps) + len(ps) * PARA_COST


def split(paras, caps):
    """칸 값에 **비례해** 고르게 나눈다.

    앞 칸부터 그득 채우면 안 된다. 첫 칸만 꽉 차고 뒤 칸이 텅 빈다.
    칸마다 받을 몫을 미리 정해 두고 그 몫에 가장 가깝게 끊는다.
    """
    n, k = len(paras), len(caps)
    total = cost(paras)
    share = [total * c / sum(caps) for c in caps]
    cuts = [0] * (k + 1)
    cuts[k] = n
    i = 0
    for c in range(k - 1):
        want = share[c]
        run = 0
        # 남은 칸마다 적어도 문단 하나씩은 남겨 둔다
        limit = n - (k - 1 - c)
        while i < limit:
            nxt = cost([paras[i]])
            # 넣어서 몫을 넘기더라도, 안 넣는 쪽보다 몫에 가까우면 넣는다
            if run and abs(run + nxt - want) > abs(run - want):
                break
            run += nxt
            i += 1
        cuts[c + 1] = max(i, cuts[c] + 1)
        i = cuts[c + 1]
    return [paras[cuts[c]:cuts[c + 1]] for c in range(k)]


def one(slug):
    p = os.path.join(BOOKS, slug, 'app.js')
    raw = io.open(p, 'rb').read().decode('utf-8')
    crlf = '\r\n' in raw
    s = raw.replace('\r\n', '\n')
    block = re.search(r'const AFTERWORD = \{.*?\n\};', s, re.S).group(0)
    art = re.search(r"art: '([^']+)'", block).group(1)
    emoji = re.search(r"emoji: '([^']*)'", block).group(1)
    paras = re.findall(STR, block)
    paras = [x for x in paras if len(x) > 12]

    total = cost(paras)
    two = total > CAP1
    caps = ([COL - HEAD_COST, COL, COL, COL - ART_COST] if two
            else [COL - HEAD_COST, COL - ART_COST])
    cols = split(paras, caps)

    def col(ps):
        return ',\n'.join('                "%s"' % esc(x) for x in ps)

    if two:
        spreads = ('        {\n            left: [\n%s\n            ],\n            right: [\n%s\n            ]\n        },\n'
                   '        {\n            art: \'%s\',\n            left: [\n%s\n            ],\n            right: [\n%s\n            ]\n        }\n'
                   % (col(cols[0]), col(cols[1]), art, col(cols[2]), col(cols[3])))
    else:
        spreads = ('        {\n            art: \'%s\',\n            left: [\n%s\n            ],\n            right: [\n%s\n            ]\n        }\n'
                   % (art, col(cols[0]), col(cols[1])))

    new = ("const AFTERWORD = {\n    title: '읽고 나서',\n    emoji: '%s',\n    spreads: [\n%s    ]\n};"
           % (emoji, spreads))
    s = s.replace(block, new)
    io.open(p, 'wb').write((s.replace('\n', '\r\n') if crlf else s).encode('utf-8'))
    return two, total, [cost(c) for c in cols]


def main():
    pic = json.load(io.open(os.path.join(BOOKS, '_books-pic.json'), encoding='utf-8'))
    two = 0
    for slug in pic:
        t, total, cs = one(slug)
        two += t
        if t:
            print('%-24s 값%4d → 두 펼침면 %s' % (slug, total, cs))
    print('--- 한 펼침면 %d권 · 두 펼침면 %d권 (한계 값%d)' % (len(pic) - two, two, CAP1))


main()
