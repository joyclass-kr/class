# -*- coding: utf-8 -*-
"""책마다 그림이 몇 장 필요하고 몇 장이 와 있는지 센다.

    python tools-image-status.py

app.js가 실제로 부르는 파일 이름을 기준으로 센다. png든 webp든 이름만 같으면
있는 것으로 친다 (webp로 바꾼 뒤에도 그대로 통하도록).
"""
import io, os, re, sys

# 윈도 콘솔은 cp949라 —, · 같은 글자에서 죽는다. utf-8로 바꿔 둔다.
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

BOOKS = os.path.dirname(os.path.abspath(__file__))
rows, need_all, have_all = [], 0, 0

for slug in sorted(os.listdir(BOOKS)):
    app = os.path.join(BOOKS, slug, 'app.js')
    if not os.path.isfile(app):
        continue
    js = io.open(app, encoding='utf-8').read()
    need = set(re.findall(r'"([a-z0-9\-]+\.(?:png|webp))"', js)) | {'cover.webp', 'end.webp'}
    d = os.path.join(BOOKS, slug, 'images')
    stems = {os.path.splitext(f)[0] for f in os.listdir(d)} if os.path.isdir(d) else set()
    miss = sorted(n for n in need if os.path.splitext(n)[0] not in stems)
    need_all += len(need)
    have_all += len(need) - len(miss)
    rows.append((len(miss), slug, len(need), miss))

rows.sort()
part = [r for r in rows if 0 < r[0] < r[2]]
none = [r for r in rows if r[0] == r[2]]
done = [r for r in rows if r[0] == 0]

print(u'그림 다 있는 책 %d권' % len(done))
if part:
    print(u'\n일부만 있는 책 %d권' % len(part))
    for m, slug, n, miss in part:
        print(u'  %-22s %d/%d — 빠짐: %s' % (slug, n - m, n, u', '.join(miss)))
if none:
    print(u'\n한 장도 없는 책 %d권 (그림 %d장)' % (len(none), sum(r[2] for r in none)))
    for _, slug, n, _m in none:
        print(u'  %-22s %d장' % (slug, n))
print(u'\n합계: %d장 가운데 %d장 있음, %d장 필요' % (need_all, have_all, need_all - have_all))
