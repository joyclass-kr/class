# -*- coding: utf-8 -*-
import io, os, re, sys, difflib

BOOKS = sorted(d for d in os.listdir('.') if os.path.isdir(d) and os.path.exists(d + '/app.js'))
if len(sys.argv) > 1:
    BOOKS = sys.argv[1:]

STR = re.compile(r'"((?:[^"\\]|\\.)*)"' + r"|`([^`]*)`")

def sents(t):
    t = re.sub(r'<[^>]+>', ' ', t)
    t = t.replace('\\"', '"')
    return [x.strip() for x in re.split(r'(?<=[.!?…])\s+', t) if len(x.strip()) >= 10]

def _run(a,c):
    m=difflib.SequenceMatcher(None,a,c).find_longest_match(0,len(a),0,len(c))
    return a[m.a:m.a+m.size]

tot = 0
for b in BOOKS:
    src = io.open(b + '/app.js', encoding='utf-8').read()
    hits = []
    for m in re.finditer(r'(left|right|paras)\s*:\s*\[(.*?)\n\s*\]', src, re.S):
        paras = [(x[0] or x[1]) for x in STR.findall(m.group(2))]
        pool = []
        for i, p in enumerate(paras):
            for s in sents(p):
                pool.append((i, s))
        for i in range(len(pool)):
            for j in range(i + 1, len(pool)):
                if pool[j][0] - pool[i][0] > 2:
                    break
                a, c = pool[i][1], pool[j][1]
                r = difflib.SequenceMatcher(None, a, c).ratio()
                if r >= 0.60 or len(_run(a,c)) >= 12:
                    hits.append((r, a, c))
    if hits:
        tot += len(hits)
        print('\n### ' + b + '  (' + str(len(hits)) + ')')
        for r, a, c in hits:
            print('  %.2f  %s\n        %s' % (r, a, c))
print('\n=== %d' % tot)
