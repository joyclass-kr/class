# -*- coding: utf-8 -*-
import io, os, re, hashlib

miss = extra = 0
seen = {}
dups = []
tot = 0
for b in sorted(os.listdir('.')):
    f = b + '/app.js'
    if not os.path.isfile(f):
        continue
    src = io.open(f, encoding='utf-8').read()
    refs = set(re.findall(r'["\'`]([\w\-/]+\.webp)["\'`]', src))
    d = b + '/images'
    have = set(os.listdir(d)) if os.path.isdir(d) else set()
    tot += len(have)
    for r in sorted(refs):
        if os.path.basename(r) not in have:
            print('없는 그림 %s -> %s' % (b, r)); miss += 1
    for h in sorted(have):
        if h not in {os.path.basename(x) for x in refs}:
            print('안 쓰는 그림 %s/%s' % (b, h)); extra += 1
        p = d + '/' + h
        k = hashlib.md5(io.open(p, 'rb').read()).hexdigest()
        if k in seen:
            dups.append((seen[k], b + '/' + h))
        else:
            seen[k] = b + '/' + h
for a, c in dups:
    print('같은 그림 두 곳  %s == %s' % (a, c))
print('=== 그림 %d장 · 없는 것 %d · 안 쓰는 것 %d · 겹친 것 %d' % (tot, miss, extra, len(dups)))
