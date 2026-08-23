# -*- coding: utf-8 -*-
"""전래동화 소설 일곱 권을 새 소설 엔진으로 옮긴다.

    python tools-upgrade-novel-engine.py [slug ...]

옛 엔진은 그림이 오른쪽 쪽을 통째로 먹었다. 그래서 그림 한 장마다 글 한 쪽이
사라지고, 남은 글이 모자라 반쯤 빈 쪽이 생겼다. 장 발장 쪽 엔진은 그림을
쪽 위쪽에 가로로 얹고 그 아래를 글로 채운다. 쪽이 버려지지 않는다.

본문·표지·문제·끝쪽은 그대로 두고 엔진만 갈아 끼운다.
"""
import io, os, re, shutil, sys

BOOKS = os.path.dirname(os.path.abspath(__file__))
DONOR = os.path.join(os.path.dirname(BOOKS), 'world-novels', 'jean-valjean')


def slice_between(s, start, end):
    i = s.index(start)
    j = s.index(end, i + len(start))
    return s[i:j]


def upgrade(slug):
    dst = os.path.join(BOOKS, slug)
    old = io.open(os.path.join(dst, 'app.js'), encoding='utf-8').read()
    new = io.open(os.path.join(DONOR, 'app.js'), encoding='utf-8').read()

    title = re.search(u'const BOOK_TITLE = "(.*?)";', old).group(1)

    # 책마다 다른 네 덩이를 옛 파일에서 떼어 낸다.
    chapters = slice_between(old, u'const CHAPTERS = [', u'function makeProbe')
    cover = slice_between(old, u'function coverPage() {', u'function tocPage(')
    quiz = slice_between(old, u'const QUIZ = [', u'\n];\n') + u'\n];\n'
    end_blk = slice_between(old, u'function endPage()', u'\n}\n')
    end_emoji = re.search(u"artFrame\\('end\\.png', '(.*?)'\\)", end_blk).group(1)
    end_line = re.search(u'<h2>(.*?)</h2>', end_blk).group(1)

    # 새 엔진에 갈아 끼운다.
    new = re.sub(u'const BOOK_TITLE = ".*?";',
                 u'const BOOK_TITLE = "%s";' % title, new, count=1)
    new = new.replace(slice_between(new, u'const CHAPTERS = [', u'function makeProbe'),
                      chapters, 1)
    new = new.replace(slice_between(new, u'function coverPage() {', u'function tocPage('),
                      cover, 1)
    new = new.replace(slice_between(new, u'const QUIZ = [', u'\n];\n') + u'\n];\n',
                      quiz, 1)

    # 끝쪽은 endPage 안에서만 바꾼다.
    i = new.index(u'function endPage()')
    head, tail = new[:i], new[i:]
    mark = u"artFrame('end.png', '"
    a = tail.index(mark) + len(mark)
    tail = tail[:a] + end_emoji + tail[tail.index(u"'", a):]
    tail = re.sub(u'<h2>.*?</h2>', u'<h2>%s</h2>' % end_line, tail, count=1)
    new = head + tail

    io.open(os.path.join(dst, 'app.js'), 'w', encoding='utf-8').write(new)
    shutil.copy(os.path.join(DONOR, 'styles.css'), os.path.join(dst, 'styles.css'))

    arts = len(re.findall(u'\\.(?:png|webp)"', chapters))
    print(u'  %-18s %s — %d장, 그림 %d장'
          % (slug, title, chapters.count(u'num:'), arts))


def all_novels():
    out = []
    for name in sorted(os.listdir(BOOKS)):
        p = os.path.join(BOOKS, name, 'app.js')
        if os.path.isfile(p) and u'paras: [' in io.open(p, encoding='utf-8').read():
            out.append(name)
    return out


if __name__ == '__main__':
    targets = sys.argv[1:] or all_novels()
    print(u'새 엔진: %s' % os.path.basename(DONOR))
    for slug in targets:
        upgrade(slug)
