# -*- coding: utf-8 -*-
"""책장 카드 제목이 깨진 것을 고친다.

유니코드 escape로 카드를 만들다 글자를 잘못 적었다.
각 책의 index.html에 있는 <title>을 정답으로 삼아 카드 제목을 맞춘다.
"""
import io, os, re

BOOKS = r'E:\webprojects\class\learning\inquiry\story-books\korea-tales'
p = os.path.join(BOOKS, 'index.html')
s = io.open(p, encoding='utf-8').read()

CARD = re.compile(
    r'(<a class="book-card" href="(.*?)/">\s*\n\s*<span class="book-cover" data-title=")(.*?)'
    r'("><img src=".*?" alt="" loading="lazy"></span>\s*\n\s*<span class="book-title"><b>\d+권</b>)(.*?)(</span>)')

fixed = []


def repl(m):
    slug = m.group(2)
    real = re.search(r'<title>(.*?)</title>',
                     io.open(os.path.join(BOOKS, slug, 'index.html'),
                             encoding='utf-8').read()).group(1)
    if m.group(3) != real or m.group(5) != real:
        fixed.append(u'%s: %s -> %s' % (slug, m.group(5), real))
    return m.group(1) + real + m.group(4) + real + m.group(6)


s2 = CARD.sub(repl, s)
io.open(p, 'w', encoding='utf-8').write(s2)

if fixed:
    for f in fixed:
        print(f)
else:
    print(u'고칠 것 없음')
