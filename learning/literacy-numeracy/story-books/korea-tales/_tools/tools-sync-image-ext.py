# -*- coding: utf-8 -*-
"""app.js가 부르는 그림 파일 이름을 images/ 에 실제로 있는 것에 맞춘다.

    python tools-sync-image-ext.py [slug ...]

그림을 webp로 바꾼 책을 다시 찍으면 생성기가 .png로 되돌려 놓는다.
그러면 그림이 있는데도 안 보인다. 이 도구가 뒷정리를 한다.
"""
import io, os, re, sys

BOOKS = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # _tools/ 위가 책 폴더


def sync(slug):
    d = os.path.join(BOOKS, slug)
    imgs = os.path.join(d, 'images')
    if not os.path.isdir(imgs):
        return 0
    real = {}
    for f in os.listdir(imgs):
        stem, ext = os.path.splitext(f)
        real[stem] = ext
    p = os.path.join(d, 'app.js')
    s = io.open(p, encoding='utf-8').read()

    def swap(m):
        stem, ext = m.group(1), m.group(2)
        want = real.get(stem)
        return stem + (want if want else ext)

    s2 = re.sub(r'([a-z0-9\-]+)(\.png|\.webp)', swap, s)
    if s2 != s:
        io.open(p, 'w', encoding='utf-8').write(s2)
        return sum(1 for a, b in zip(re.findall(r'[a-z0-9\-]+\.(?:png|webp)', s),
                                     re.findall(r'[a-z0-9\-]+\.(?:png|webp)', s2)) if a != b)
    return 0


targets = sys.argv[1:] or [n for n in sorted(os.listdir(BOOKS))
                           if os.path.isfile(os.path.join(BOOKS, n, 'app.js'))]
total = 0
for slug in targets:
    n = sync(slug)
    if n:
        print(u'  %-24s %d군데' % (slug, n))
        total += n
print(u'맞춘 곳 %d군데' % total)
