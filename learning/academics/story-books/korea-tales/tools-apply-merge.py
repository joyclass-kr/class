# -*- coding: utf-8 -*-
"""정해 둔 대로 그림책 문단을 합친다.

    python apply_merge.py <결정파일.json>

결정 파일은 [["슬러그", 펼침번호, "left|right", [붙일 칸 번호들]], ...] 꼴.
칸 번호는 runs.py가 보여 준 번호를 그대로 쓴다. 한 쪽에 여러 묶음을 지정해도 되고,
번호가 큰 묶음부터 처리하므로 앞 묶음의 번호가 밀리지 않는다.

글자는 한 자도 바꾸지 않는다. 문단 사이 경계만 지운다.
"""
import io, json, os, re, sys
from collections import defaultdict

BOOKS = r'E:\webprojects\class\learning\academics\story-books\korea-tales'
SIDE = re.compile(r'((?:left|right): \[\n)(.*?)(\n                \])', re.S)
ITEM = re.compile(r'^(\s*)"((?:[^"\\]|\\.)*)"(,?)\s*$', re.M)


def apply_book(slug, jobs):
    p = os.path.join(BOOKS, slug, 'app.js')
    src = io.open(p, encoding='utf-8').read()
    start = src.index(u'const CHAPTERS = [')
    end = src.index(u'\n];', start) + 3
    body = src[start:end]

    want = defaultdict(list)          # (beat, side) -> [ [idx...], ... ]
    for beat, side, group in jobs:
        want[(beat, side)].append(sorted(group))

    beat = [0]
    done = [0]

    def fix(m):
        head, inner, tail = m.group(1), m.group(2), m.group(3)
        side = head.split(':')[0].strip()
        if side == 'left':
            beat[0] += 1
        key = (beat[0], side)
        if key not in want:
            return m.group(0)
        rows = ITEM.findall(inner)
        if not rows:
            return m.group(0)
        indent = rows[0][0]
        items = [r[1] for r in rows]
        for group in sorted(want[key], key=lambda g: -g[0]):
            if group[-1] >= len(items):
                raise SystemExit(u'%s %d번 %s: 칸 번호 %s가 범위 밖' % (slug, key[0], side, group))
            joined = u' '.join(items[i] for i in group)
            items[group[0]:group[-1] + 1] = [joined]
            done[0] += 1
        lines = [u'%s"%s"%s' % (indent, t, u',' if k < len(items) - 1 else u'')
                 for k, t in enumerate(items)]
        return head + u'\n'.join(lines) + tail

    body2 = SIDE.sub(fix, body)
    io.open(p, 'w', encoding='utf-8').write(src[:start] + body2 + src[end:])
    return done[0]


if __name__ == '__main__':
    decisions = json.load(io.open(sys.argv[1], encoding='utf-8'))
    by_book = defaultdict(list)
    for slug, beat, side, group in decisions:
        by_book[slug].append((beat, side, group))
    total = 0
    for slug in sorted(by_book):
        n = apply_book(slug, by_book[slug])
        total += n
        print(u'%-24s %d군데 합침' % (slug, n))
    print(u'-- 모두 %d군데' % total)
