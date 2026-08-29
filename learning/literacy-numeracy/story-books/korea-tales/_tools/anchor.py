# -*- coding: utf-8 -*-
import io, os, re

STR = re.compile(r'"((?:[^"\\]|\\.)*)"' + r"|`([^`]*)`")
bad = 0
for b in sorted(os.listdir('.')):
    f = b + '/app.js'
    if not os.path.isfile(f):
        continue
    src = io.open(f, encoding='utf-8').read()
    if "kind: 'chapter'" not in src and 'kind: "chapter"' not in src:
        continue
    for m in re.finditer(r'num:\s*(\d+),(.*?)paras:\s*\[(.*?)\n\s*\]', src, re.S):
        am = re.search(r'artAt:\s*\[(.*?)\]', m.group(2), re.S)
        if not am:
            continue
        anchors = [(x[0] or x[1]) for x in STR.findall(am.group(1))]
        body = m.group(3)
        for a in anchors:
            if a and a not in body:
                bad += 1
                print('%s %s장  닻 없음: %s' % (b, m.group(1), a))
print('=== 못 찾은 닻 %d' % bad)
