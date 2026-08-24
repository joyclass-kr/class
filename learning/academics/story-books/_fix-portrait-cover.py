# -*- coding: utf-8 -*-
"""세로 화면에서 표지 오른쪽 칸이 넘치는 것을 고친다.

    python _fix-portrait-cover.py korea-tales world-novels world-tales

세로에서는 책이 좁아 표지 소개글이 한 줄에 스물몇 자밖에 안 들어간다.
그래서 글이 길어지는데, 소설틀은 표지가 두 칸으로 남아 있어 폭이 절반이라
더 심했다(최대 572px 넘침). 동화틀은 이미 쌓여 있지만 그림칸과 여백이
자리를 많이 써서 최대 141px 모자랐다.
"""
import io, os, re, sys

ROOT = os.path.dirname(os.path.abspath(__file__))

PIC_ADD = """    /* 세로에서는 소개글이 길어진다. 그림칸을 조금 줄이고 표지 여백을
       좁혀 글자리를 넓힌다. */
    .page-cover { grid-template-rows: 26% 74%; }
    .page-cover .story-page-right { padding: clamp(12px, 2.6cqh, 27px) clamp(14px, 3.4cqh, 36px); }
    .cover-toc { margin-top: clamp(6px, 1.3cqh, 14px); padding-top: clamp(5px, 1cqh, 10px); }
"""

NOVEL_ADD = """    /* 소설틀 표지도 세로에서는 위아래로 쌓는다. 두 칸으로 두면 글줄이
       절반 폭이라 소개글이 갑절로 길어져 넘친다. */
    .page-cover { grid-template-columns: 1fr; grid-template-rows: 30% 70%; }
    .page-cover .story-page-left { border-right: none; border-bottom: 1px solid rgba(92, 58, 34, 0.22); }
    .page-cover .story-page-right { padding: clamp(12px, 2.6cqh, 27px) clamp(14px, 3.4cqh, 36px); }
"""


def patch(path):
    s = io.open(path, encoding='utf-8').read()
    if 'grid-template-rows: 26% 74%' in s or '.page-cover .story-page-left { border-right: none' in s:
        return None
    pic = '.spread-art {' in s
    m = re.search(r'@media \(max-width: 820px\), \(orientation: portrait\) and \(max-width: 1100px\) \{\n', s)
    if not m:
        return 'skip'
    add = PIC_ADD if pic else NOVEL_ADD
    s = s[:m.end()] + add + s[m.end():]
    io.open(path, 'w', encoding='utf-8').write(s)
    return 'pic' if pic else 'novel'


tot = {}
for track in sys.argv[1:]:
    d = os.path.join(ROOT, track)
    for slug in sorted(os.listdir(d)):
        p = os.path.join(d, slug, 'styles.css')
        if os.path.isfile(p):
            r = patch(p)
            if r:
                tot[track + ' ' + r] = tot.get(track + ' ' + r, 0) + 1
for k in sorted(tot):
    print(u'%s: %d권' % (k, tot[k]))
