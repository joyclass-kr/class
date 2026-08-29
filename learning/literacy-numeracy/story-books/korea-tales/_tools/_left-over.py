# -*- coding: utf-8 -*-
"""아직 남은 겹침을 훑는다. 교훈뿐 아니라 문단끼리도 본다."""
import io, json, re, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
STR = r'"((?:[^"\\]|\\.)*)"'


def run(a, b):
    a = re.sub(r'[^가-힣]', '', a)
    b = re.sub(r'[^가-힣]', '', b)
    best, prev = 0, [0] * (len(b) + 1)
    for i in range(1, len(a) + 1):
        cur = [0] * (len(b) + 1)
        for j in range(1, len(b) + 1):
            if a[i - 1] == b[j - 1]:
                cur[j] = prev[j - 1] + 1
                best = max(best, cur[j])
        prev = cur
    return best


rows = []
for slug in json.load(io.open('_books-pic.json', encoding='utf-8')):
    s = io.open(slug + '/app.js', encoding='utf-8').read()
    b = re.search(r'const AFTERWORD = \{.*?\n\};', s, re.S).group(0)
    ps = re.findall(STR, b)
    for i in range(len(ps)):
        for j in range(i + 1, len(ps)):
            r = run(ps[i], ps[j])
            if r >= 7:
                rows.append((r, slug, ps[i], ps[j]))
rows.sort(reverse=True)
for r, slug, a, b in rows:
    print('%2d자  %s' % (r, slug))
    print('      A: %s' % a[:78])
    print('      B: %s' % b[:78])
print('--- 겹침 남은 자리 %d군데 / %d권' % (len(rows), len(set(x[1] for x in rows))))
