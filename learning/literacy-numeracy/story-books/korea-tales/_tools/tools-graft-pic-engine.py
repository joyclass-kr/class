# -*- coding: utf-8 -*-
"""그림책 틀 책의 엔진을 한 벌로 맞춘다.

그림책 예순한 권은 글만 다르고 엔진은 같아야 한다. 그런데 표지 글이 코드 안에
박혀 있어서 영어판을 붙일 수가 없었다. 그래서 이 도구가 하는 일은 둘이다.

  1. 표지 글과 「진짜 역사」 쪽 글을 코드에서 뽑아 자료(COVER, HISTORY)로 옮긴다.
  2. 자료를 뺀 나머지를 `_tools/_pic-engine.js` 한 벌로 갈아 끼운다.

이렇게 해 두면 엔진을 고칠 때 `_pic-engine.js` 하나만 고치고 이 도구를 다시
돌리면 된다. `index.html` 과 `styles.css` 도 같은 까닭으로 한 벌로 맞춘다.

만들어지는 app.js 차례 — 자료가 먼저, 엔진이 뒤다:
    CHAPTERS · COVER · HISTORY(있는 책만) · EN(있는 책만) · QUIZ · AFTERWORD · 엔진

쓰는 법: python _tools/tools-graft-pic-engine.py [책이름 ...]   (안 적으면 전권)
        python _tools/tools-graft-pic-engine.py --check         (고치지 않고 확인만)
"""
import io, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
R = lambda p: io.open(p, encoding='utf-8').read()
W = lambda p, s: io.open(p, 'w', encoding='utf-8', newline='\n').write(s)
J = lambda t: json.dumps(t, ensure_ascii=False)

COVER_NOTE = '/* 표지 글 — 말에 따라 갈아 끼우려고 자료로 뺐다. */\n'
HISTORY_NOTE = '/* 「여기서부터는 진짜 역사」 쪽 — 건국 신화 책에만 있다. */\n'
AFTER_NOTE = ('/* 읽고 나서 — 세계명작 트랙과 같은 형식이다. 동화틀은 쪽을 재서 나누지 않으므로\n'
              '   펼침면마다 왼쪽·오른쪽 글을 손으로 나누어 둔다. */\n')


def block(s, start, end, name):
    """start 로 시작해 end 로 끝나는 덩이를 통째로 돌려준다."""
    i = s.find(start)
    assert i >= 0, '없다: ' + name
    j = s.find(end, i)
    assert j >= 0, '끝이 없다: ' + name
    return s[i:j + len(end)].rstrip('\n')


def tags(html, tag):
    return re.findall(r'<%s(?:\s[^>]*)?>(.*?)</%s>' % (tag, tag), html, re.S)


def parse_cover(s, book):
    """표지 함수에서 이모지·제목·머리글을 뽑는다."""
    fn = block(s, 'function coverPage() {', '\n}\n', book + ' coverPage')
    m = re.search(r"artFrame\('([^']+)',\s*'([^']*)'\)", fn)
    assert m, book + ' 표지 그림 자리를 못 찾음'
    art, emoji = m.group(1), m.group(2)
    right = fn[fn.index('story-page-right'):]
    title = tags(right, 'h1')
    assert len(title) == 1, book + ' 제목이 하나가 아님'
    intro = [t.strip() for t in tags(right, 'p')]
    assert 2 <= len(intro) <= 5, '%s 머리글 %d문단' % (book, len(intro))
    body = ['const COVER = {',
            '    emoji: %s,' % J(emoji),
            '    art: %s,' % J(art),
            '    title: %s,' % J(title[0].strip()),
            '    intro: [']
    body += ['        %s%s' % (J(t), ',' if i < len(intro) - 1 else '') for i, t in enumerate(intro)]
    body += ['    ]', '};']
    return '\n'.join(body)


def parse_history(s, book):
    """건국 신화 다섯 권의 「진짜 역사」 쪽 글을 뽑는다. 없으면 None."""
    if 'function historyPage()' not in s:
        return None
    fn = block(s, 'function historyPage()', '\n}\n', book + ' historyPage')
    if 'HS()' in fn:                       # 이미 자료로 옮긴 책
        if 'const HISTORY = {' not in s:
            return None
        return block(s, 'const HISTORY = {', '\n};\n', book + ' HISTORY')
    title = tags(fn, 'h2')[0].strip()
    note = re.search(r'<p class="history-note">(.*?)</p>', fn, re.S).group(1).strip()
    paras = [t.strip() for t in tags(fn[fn.index('history-body'):], 'p')]
    assert paras, book + ' 역사 쪽 글이 비었음'
    body = ['const HISTORY = {', '    title: %s,' % J(title), '    note: %s,' % J(note), '    paras: [']
    body += ['        %s%s' % (J(t), ',' if i < len(paras) - 1 else '') for i, t in enumerate(paras)]
    body += ['    ]', '};']
    return '\n'.join(body)


def graft(book, engine, index_tpl, styles, check=False):
    s = R(book + '/app.js')
    chapters = block(s, 'const CHAPTERS = [', '\n];\n', book + ' CHAPTERS')
    quiz = block(s, 'const QUIZ = [', '\n];\n', book + ' QUIZ')
    after = block(s, 'const AFTERWORD = {', '\n};\n', book + ' AFTERWORD')
    cover = (block(s, 'const COVER = {', '\n};\n', book + ' COVER')
             if 'const COVER = {' in s else parse_cover(s, book))
    history = parse_history(s, book)
    en = block(s, '/* 영어판', '\n};\n', book + ' EN') if 'const EN = {' in s else None

    parts = [COVER_NOTE + cover]
    parts.insert(0, chapters)
    if history:
        parts.append(HISTORY_NOTE + history)
    if en:
        parts.append(en)
    parts += [quiz, AFTER_NOTE + after, engine]
    out = '\n\n'.join(parts).rstrip('\n') + '\n'

    title = re.search(r'title: (".*?"),\n', cover).group(1)
    idx = index_tpl.replace('{{TITLE}}', json.loads(title))
    if check:
        same = (out == s and idx == R(book + '/index.html') and styles == R(book + '/styles.css'))
        return 'ok' if same else '다름'
    W(book + '/app.js', out)
    W(book + '/index.html', idx)
    W(book + '/styles.css', styles)
    return 'EN' if en else ('역사' if history else '·')


def main():
    os.chdir(os.path.dirname(HERE))
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    check = '--check' in sys.argv
    books = args or json.load(open('_books-pic.json'))
    engine = R(os.path.join(HERE, '_pic-engine.js')).rstrip('\n')
    index_tpl = R(os.path.join(HERE, '_pic-index.html'))
    styles = R(os.path.join(HERE, '_pic-styles.css'))
    bad = 0
    for b in books:
        try:
            r = graft(b, engine, index_tpl, styles, check)
        except AssertionError as e:
            r = '실패 ' + str(e)
        if r.startswith('실패') or r == '다름':
            bad += 1
            print('  %-24s %s' % (b, r))
    print('%d권 %s%s' % (len(books), '확인' if check else '갈아 끼움',
                         (' / 어긋난 책 %d권' % bad) if bad else ''))
    sys.exit(1 if bad else 0)


main()
