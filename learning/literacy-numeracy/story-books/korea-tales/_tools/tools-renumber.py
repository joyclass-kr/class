# -*- coding: utf-8 -*-
"""책장의 권 번호를 두께 순서로 다시 매긴다.

사용자가 정한 원칙: 얇은 책부터 앞쪽. 아이가 1권부터 순서대로 읽으면
저절로 쉬운 것에서 어려운 것으로 간다.

두께 기준: 그림책 먼저, 그다음 소설.
같은 갈래 안에서는 펼침(장) 수를 먼저 보고, 같으면 글자 수로 가른다.
폴더 이름은 건드리지 않는다. 책장 카드의 차례와 번호만 바꾼다.
"""
import io, os, re

BOOKS = r'E:\webprojects\class\learning\inquiry\story-books\korea-tales'
CARD = re.compile(
    r'[ \t]*<a class="book-card" href="(.*?)/">\n'
    r'[ \t]*<span class="book-cover" data-title="(.*?)"><img src=".*?" alt="" loading="lazy"></span>\n'
    r'[ \t]*<span class="book-title"><b>\d+권</b>(.*?)</span>\n'
    r'[ \t]*</a>\n')


def measure(slug):
    s = io.open(os.path.join(BOOKS, slug, 'app.js'), encoding='utf-8').read()
    is_novel = u'paras: [' in s      # 소설 틀은 paras, 그림책 틀은 beats
    if is_novel:
        units = len(re.findall(r'\n        num: \d+,', s))
        chars = sum(len(t) for t in re.findall(r'`([^`]*)`', s))
    else:
        units = s.count(u'art: "')
        chars = sum(len(t) for t in re.findall(r'"((?:[^"\\]|\\.)*)"', s)
                    if len(t) > 12 and not t.endswith('.png') and not t.endswith('.webp'))
    return is_novel, units, chars


p = os.path.join(BOOKS, 'index.html')
html = io.open(p, encoding='utf-8').read()

cards = CARD.findall(html)
if len(cards) < 50:
    raise SystemExit(u'카드를 %d개만 찾았다' % len(cards))

rows = []
for slug, cover_title, title in cards:
    is_novel, units, chars = measure(slug)
    rows.append((slug, cover_title, title, is_novel, units, chars))

rows.sort(key=lambda r: (r[3], r[4], r[5]))

block = u''
for i, (slug, cover_title, title, is_novel, units, chars) in enumerate(rows, 1):
    block += (u'            <a class="book-card" href="%s/">\n'
              u'                <span class="book-cover" data-title="%s"><img src="%s/images/cover.webp" alt="" loading="lazy"></span>\n'
              u'                <span class="book-title"><b>%d권</b>%s</span>\n'
              u'            </a>\n') % (slug, cover_title, slug, i, title)

start = html.index(u'<div class="shelf">') + len(u'<div class="shelf">')
end = html.index(u'</div>', start)
io.open(p, 'w', encoding='utf-8').write(html[:start] + u'\n' + block + u'    ' + html[end:])

print(u'권 번호 %d권 다시 매김' % len(rows))
print(u'\n갈래별 구간')
prev = None
for i, r in enumerate(rows, 1):
    key = (u'소설' if r[3] else u'그림책', r[4])
    if key != prev:
        print(u'  %d권부터 — %s %d%s' % (i, key[0], key[1], u'장' if r[3] else u'펼침'))
        prev = key
print(u'\n처음 세 권: %s' % u', '.join(r[2] for r in rows[:3]))
print(u'마지막 세 권: %s' % u', '.join(r[2] for r in rows[-3:]))
