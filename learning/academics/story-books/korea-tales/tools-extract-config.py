# -*- coding: utf-8 -*-
"""이미 만들어진 그림책 app.js에서 설정 파일을 되뽑는다.

    python tools-extract-config.py <slug> [<나갈 파일>]

생성기가 생기기 전에 만든 책들은 설정 파일이 없다. 본문을 고치려면
app.js를 직접 건드려야 하는데 그러다 따옴표를 깨뜨리기 쉽다.
이 도구로 설정을 되뽑아 두면 그 뒤로는 build_book.py로 고쳐 찍을 수 있다.
"""
import io, os, re, sys

BOOKS = os.path.dirname(os.path.abspath(__file__))


def extract(slug, out=None):
    d = os.path.join(BOOKS, slug)
    js = io.open(os.path.join(d, 'app.js'), encoding='utf-8').read()
    html = io.open(os.path.join(d, 'index.html'), encoding='utf-8').read()

    title = re.search(u'<title>(.*?)</title>', html).group(1)
    cover = js[js.index(u'function coverPage()'):js.index(u'function tocPage(')]
    intro = re.findall(u'<p>(.*?)</p>', cover, re.S)
    emoji = re.search(u"artFrame\\('cover\\.png', '(.*?)'\\)", cover).group(1)

    quiz = []
    for m in re.finditer(u'\\{ q: "((?:[^"\\\\]|\\\\.)*)", choices: \\[(.*?)\\], answer: (\\d)', js):
        ch = re.findall(u'"((?:[^"\\\\]|\\\\.)*)"', m.group(2))
        quiz.append((m.group(1), ch, int(m.group(3))))

    c0 = js.index(u'const CHAPTERS = [')
    end = u'\n];'
    chapters = js[c0:js.index(end + u'\n', c0) + len(end)]

    def q(s):
        return u"u'" + s.replace(u'\\', u'\\\\').replace(u"'", u"\\'") + u"'"

    lines = [u'# -*- coding: utf-8 -*-',
             u"SLUG = '%s'" % slug,
             u'TITLE = %s' % q(title),
             u'EMOJI = %s' % q(emoji),
             u'',
             u'INTRO = [']
    for p in intro:
        lines.append(u'    %s,' % q(p.strip()))
    lines += [u']', u'', u'QUIZ = [']
    for qq, ch, a in quiz:
        lines.append(u'    {\'q\': %s,' % q(qq))
        lines.append(u'     \'choices\': [%s], \'answer\': %d},'
                     % (u', '.join(q(c) for c in ch), a))
    # 날 문자열로 내보낸다. 보통 문자열이면 파이썬이 본문 속 \" 의 역슬래시를
    # 먹어 버려, 다시 찍었을 때 자바스크립트 따옴표가 깨진다.
    lines += [u']', u'', u"CHAPTERS_JS = r'''%s\n'''" % chapters, u'']

    path = out or os.path.join(BOOKS, 'config-%s.py' % slug)
    io.open(path, 'w', encoding='utf-8').write(u'\n'.join(lines))
    print(u'%s -> %s (펼침 %d, 문항 %d)'
          % (slug, os.path.basename(path), chapters.count(u'art: "'), len(quiz)))


if __name__ == '__main__':
    extract(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None)
