# -*- coding: utf-8 -*-
# 한 책 안에서 서로 너무 닮은 그림을 찾는다 (거의 같은 그림을 두 펼침에 쓴 것)
import os, subprocess, sys, struct

def gray8(path):
    # ffmpeg 로 8x8 회색조 raw 를 뽑는다
    out = subprocess.run(
        ['ffmpeg', '-v', 'error', '-i', path, '-vf', 'scale=16:16,format=gray',
         '-f', 'rawvideo', '-'], capture_output=True).stdout
    return list(out[:256]) if len(out) >= 256 else None

books = sorted(d for d in os.listdir('.') if os.path.isdir(d) and os.path.exists(d + '/app.js'))
if len(sys.argv) > 1:
    books = sys.argv[1:]
hits = 0
for b in books:
    d = b + '/images'
    if not os.path.isdir(d):
        continue
    names = sorted(n for n in os.listdir(d) if n.endswith('.webp'))
    sigs = {}
    for n in names:
        g = gray8(d + '/' + n)
        if g:
            sigs[n] = g
    ns = list(sigs)
    for i in range(len(ns)):
        for j in range(i + 1, len(ns)):
            a, c = sigs[ns[i]], sigs[ns[j]]
            diff = sum(abs(x - y) for x, y in zip(a, c)) / len(a)
            if diff < 6:          # 평균 밝기 차 6 미만이면 거의 같은 그림
                print('%-24s %-18s %-18s  차이 %.1f' % (b, ns[i], ns[j], diff))
                hits += 1
print('=== 닮은 짝 %d' % hits)
