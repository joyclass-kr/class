# -*- coding: utf-8 -*-
"""문단을 빼면서 이어 주는 말이 붕 뜬 데를 찾는다.

「그리고」「그래서」「그런데」「그러니」로 시작하는 문단은 앞 문단에 기댄다.
앞 문단이 빠지면 그 말이 가리킬 곳이 없어진다.
"""
import io, json, re, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
STR = r'"((?:[^"\\]|\\.)*)"'
CONN = ('그리고', '그래서', '그런데', '그러니', '그러자', '그것도', '여기서', '그 뒤', '반면')

for slug in json.load(io.open('_books-pic.json', encoding='utf-8')):
    s = io.open(slug + '/app.js', encoding='utf-8').read()
    b = re.search(r'const AFTERWORD = \{.*?\n\};', s, re.S).group(0)
    ps = re.findall(STR, b)
    for i, p in enumerate(ps):
        if i == 0:
            continue
        if p.startswith(CONN):
            print('%-24s [%d] %s' % (slug, i, p[:56]))
            print('%-24s  앞: %s' % ('', ps[i - 1][:56]))
