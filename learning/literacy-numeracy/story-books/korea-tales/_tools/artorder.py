# -*- coding: utf-8 -*-
"""그림이 제자리에 붙었는지 본다 (62권).

소설틀은 쪽을 재어 나누므로 그림이 제 장면보다 앞설 수 있다.
그건 브라우저로 여는 _anchor-check.html 이 본다.

동화틀은 펼침면 하나가 곧 한 장면이고, 그림과 글이 손으로 묶여 있다.
그래서 「그림이 장면보다 앞선다」는 일이 쪽나눔 때문에 생길 수는 없다.
대신 손으로 잘못 묶을 수는 있으므로, 기계로 볼 수 있는 것만 본다.

  1. 그림이 이야기 차례대로 붙었는가      파일 이름의 번호가 거꾸로 가면 바뀐 것이다
  2. 없는 그림을 가리키는가              images/ 에 파일이 없다
  3. 안 쓰는 그림이 남아 있는가          폴더에는 있는데 아무도 안 쓴다
  4. 같은 그림을 두 번 쓰는가

쓰는 법
    python _tools/artorder.py
    python _tools/artorder.py tokkijeon
"""
import io
import os
import re
import sys

BOOKS = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP = {'cover.webp', 'end.webp'}          # 표지와 끝쪽 그림은 차례를 안 따진다


FILE_RE = r'''['"]([^'"]+\.(?:webp|png|jpg))['"]'''


def korean_part(src):
    """영어판(const EN)은 같은 그림을 다시 벌여 놓는다. 우리말 쪽만 본다."""
    i = src.find('const EN = {')
    return src if i < 0 else src[:i]


def arts_in_order(src):
    """본문에 나오는 차례 그대로 그림 파일 이름을 모은다."""
    out = []
    # 동화틀: art: "01-depart.webp"      소설틀: art: ["story-01-a.webp", ...]
    # 읽고 나서는 art: ['end.webp'] 처럼 작은따옴표를 쓰기도 한다.
    for m in re.finditer(r'''art:\s*(\[[^\]]*\]|['"][^'"]*['"])''', src):
        out += re.findall(FILE_RE, m.group(1))
    return out


def numbers(name):
    return [int(x) for x in re.findall(r'\d+', name)]


def check(book):
    d = os.path.join(BOOKS, book)
    p = os.path.join(d, 'app.js')
    if not os.path.isfile(p):
        return None
    whole = io.open(p, encoding='utf-8').read()
    src = korean_part(whole)
    used = arts_in_order(src)
    if not used:
        return None
    # 표지 그림은 artFrame('cover.webp', …) 처럼 곧바로 불린다. 따로 걷는다.
    named = set(re.findall(FILE_RE, whole))
    bad = []

    # 1. 차례
    seq = [a for a in used if a not in SKIP]
    prev = None
    for a in seq:
        n = numbers(a)
        if prev is not None and n and prev and n < prev:
            bad.append('차례가 거꾸로: %s 가 앞 그림보다 번호가 작다' % a)
        if n:
            prev = n

    # 2. 없는 그림
    imgdir = os.path.join(d, 'images')
    have = set(os.listdir(imgdir)) if os.path.isdir(imgdir) else set()
    for a in sorted(named):
        if a not in have:
            bad.append('파일 없음: images/%s' % a)

    # 3. 안 쓰는 그림
    for f in sorted(have):
        if f.lower().endswith(('.webp', '.png', '.jpg')) and f not in named:
            bad.append('안 쓰는 그림: images/%s' % f)

    # 4. 두 번 쓰는 그림
    seen = {}
    for a in used:
        if a in seen:
            bad.append('같은 그림을 두 번: %s' % a)
        seen[a] = 1

    return {'book': book, 'arts': len(used), 'bad': bad,
            'kind': '소설틀' if 'artAt:' in src else '동화틀'}


def main():
    names = sys.argv[1:] or sorted(
        x for x in os.listdir(BOOKS)
        if os.path.isdir(os.path.join(BOOKS, x)) and not x.startswith('_')
    )
    books = 0
    arts = 0
    bad = 0
    for name in names:
        r = check(name)
        if r is None:
            continue
        books += 1
        arts += r['arts']
        if r['bad']:
            bad += len(r['bad'])
            print('# %s (%s) 그림 %d장' % (r['book'], r['kind'], r['arts']))
            for line in r['bad']:
                print('    %s' % line)
    print('')
    print('%d권 · 그림 %d장 · 걸린 곳 %d' % (books, arts, bad))
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main())
