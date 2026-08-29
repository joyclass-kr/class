# -*- coding: utf-8 -*-
import io, re, sys

STR = re.compile(r'"((?:[^"\\]|\\.)*)"' + r"|`([^`]*)`")
src = io.open(sys.argv[1] + '/app.js', encoding='utf-8').read()
lo = int(sys.argv[2]) if len(sys.argv) > 2 else 1
hi = int(sys.argv[3]) if len(sys.argv) > 3 else 99

for m in re.finditer(r'num:\s*(\d+),\s*\n\s*title:\s*"([^"]*)"(.*?)paras:\s*\[(.*?)\n\s*\]', src, re.S):
    n = int(m.group(1))
    if n < lo or n > hi:
        continue
    print('\n===== %d장 · %s' % (n, m.group(2)))
    paras = [(x[0] or x[1]) for x in STR.findall(m.group(4))]
    for i, p in enumerate(paras, 1):
        p = p.replace('\\"', '"')
        p = re.sub(r'<span class="gloss">\((.*?)\)</span>', r'[\1]', p)
        for k, line in enumerate(p.split('<br>')):
            print(('  %-3s %s' % (str(i) if k == 0 else '', line)))
