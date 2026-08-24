# -*- coding: utf-8 -*-
"""낱말 가운데서 줄이 넘어가지 않게 하고, 문단을 양쪽맞춤으로 한다.

    python tools-keepall-justify.py

한글은 기본값이면 아무 데서나 끊긴다. "먹지 못했습 / 니다"처럼.
.page 에 word-break: keep-all 을 걸면 띄어쓰기에서만 넘어간다. 다만 낱말이
칸보다 길면 삐져나가므로 overflow-wrap: break-word 를 같이 둔다.

keep-all 을 넣으면 줄 끝이 들쭉날쭉해진다. 그래서 본문 문단에는
text-align: justify 를 걸어 양쪽을 맞춘다. 사용자가 직접 짚은 것이다.

명작동화 59권과 명작소설 42권이 이미 이렇게 되어 있다.
"""
import io, os, re

BOOKS = os.path.dirname(os.path.abspath(__file__))
KEEP = ("""    /* 한글은 기본값이면 낱말 가운데서도 줄이 넘어간다.
       '먹지 못했습 / 니다'처럼 끊기지 않도록 띄어쓰기에서만 넘긴다. */
    word-break: keep-all;
    /* 다만 한 낱말이 칸보다 길면 그때는 끊는다. 안 그러면 칸 밖으로 샌다. */
    overflow-wrap: break-word;
""")
# 양쪽맞춤을 걸 자리 — 죽 이어지는 글만. 대사 한 줄짜리도 같은 문단이라 함께 걸린다.
JUSTIFY_SEL = ['.spread-text p', '.page-story p', '.moral-box p',
               '.page-cover .story-page-right p']

n = 0
for slug in sorted(os.listdir(BOOKS)):
    p = os.path.join(BOOKS, slug, 'styles.css')
    if not os.path.isfile(p):
        continue
    s = io.open(p, encoding='utf-8').read()
    o = s

    # 1) .page 블록에 keep-all
    if 'word-break: keep-all' not in s:
        m = re.search(r'(\n\.page \{\n)((?:.*\n)*?)(\})', s)
        if m:
            s = s[:m.end(2)] + KEEP + s[m.end(2):]

    # 2) 본문 문단에 양쪽맞춤
    for sel in JUSTIFY_SEL:
        m = re.search(r'(\n' + re.escape(sel) + r' \{\n)((?:.*\n)*?)(\})', s)
        if not m or 'text-align: justify' in m.group(2):
            continue
        s = s[:m.end(2)] + '    text-align: justify;\n' + s[m.end(2):]

    if s != o:
        io.open(p, 'w', encoding='utf-8').write(s)
        n += 1
print(u'고친 파일 %d개' % n)
