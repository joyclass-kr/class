# -*- coding: utf-8 -*-
"""동화틀 책에 「읽고 나서」 펼침면을 붙인다.

    python tools-add-after-pic.py <글.json>

세계명작 방이 굳힌 형식을 그대로 따른다 (world-tales/wolf-seven-kids가 본).
소설틀과 갈리는 데가 둘이다.

  1. **끝 쪽을 없애지 않는다.** 학습 허브 단추가 끝 쪽에 그대로 있으므로
     소설틀의 AFTER_FOOT / footH 셈이 여기에는 없다.
  2. 쪽을 재서 나누지 않는다. 왼쪽·오른쪽 글을 손으로 나누어 둔다.

차례: 표지 → 이야기 → 이야기를 다 읽고 → 이야기 문제 → **읽고 나서** → 끝

글.json 모양 (책 여러 권을 한 번에):
    { "<slug>": { "emoji": "🐸", "left": [...], "right": [...] }, ... }

문단 수는 묶지 않는다. 넘치는지는 _after-pic.html로 재서 맞춘다.
"""
import io, json, os, re, sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
BOOKS = os.path.dirname(os.path.abspath(__file__))

BLOCK = u'''
/* 읽고 나서 — 세계명작 트랙과 같은 형식이다. 동화틀은 쪽을 재서 나누지 않으므로
   펼침면마다 왼쪽·오른쪽 글을 손으로 나누어 둔다. */
const AFTERWORD = {
    title: '읽고 나서',
    emoji: '%(emoji)s',
    spreads: [
        {
            art: 'end.webp',
            left: [
%(left)s
            ],
            right: [
%(right)s
            ]
        }
    ]
};

function afterPage(spread, isFirst) {
    const head = isFirst ? `<h2>${AFTERWORD.title}</h2>` : '';
    // 그림은 오른쪽 위 모서리에 꽉 붙인다. 글은 그 아래로 이어진다.
    const art = spread.art ? `<div class="after-art">${artFrame(spread.art, AFTERWORD.emoji)}</div>` : '';
    const col = (ps) => ps.map(t => `<p>${t}</p>`).join('');
    return `
        <div class="page page-after">
            <div class="after-col after-col-left">
                ${head}
                ${col(spread.left)}
            </div>
            <div class="after-col after-col-right${spread.art ? ' after-col-image' : ''}">
                ${art}
                ${col(spread.right)}
            </div>
        </div>`;
}
'''


def esc(s):
    return s.replace(u'\\', u'\\\\').replace(u'"', u'\\"')


def one(slug, data, css_main, css_portrait):
    app = os.path.join(BOOKS, slug, 'app.js')
    raw = io.open(app, 'rb').read().decode('utf-8')
    crlf = '\r\n' in raw
    js = raw.replace('\r\n', '\n')

    if "kind: 'spread'" not in js:
        sys.exit(u'동화틀이 아니다: ' + slug)

    body = BLOCK % {
        'emoji': data['emoji'],
        'left': u',\n'.join(u'                "%s"' % esc(p) for p in data['left']),
        'right': u',\n'.join(u'                "%s"' % esc(p) for p in data['right']),
    }

    if 'const AFTERWORD' in js:
        js = re.sub(r'\n/\* 읽고 나서 —.*?\n\}\n(?=\nconst PAGES)', body, js, count=1, flags=re.S)
    else:
        js, n = re.subn(r'(?=\nconst PAGES = \[)', body, js, count=1)
        if n != 1:
            sys.exit(u'PAGES를 못 찾았다: ' + slug)
        # 문제 쪽 뒤, 끝 쪽 앞에 끼운다
        js, n = re.subn(r"(\{ kind: 'quiz' \},\n)(\s*)(\{ kind: 'end' \})",
                        r"\1\2...AFTERWORD.spreads.map((spread, i) => ({ kind: 'after', spread, isFirst: i === 0 })),\n\2\3",
                        js, count=1)
        if n != 1:
            sys.exit(u'문제 쪽과 끝 쪽 사이를 못 찾았다: ' + slug)
        js, n = re.subn(r"const TWO_PAGE_KINDS = new Set\(\[([^\]]*)\]\);",
                        lambda m: "const TWO_PAGE_KINDS = new Set([%s, 'after']);" % m.group(1),
                        js, count=1)
        if n != 1:
            sys.exit(u'TWO_PAGE_KINDS를 못 찾았다: ' + slug)
        js, n = re.subn(r"(\n(\s*)case 'quiz':)",
                        r"\n\2case 'after':\n\2    return afterPage(page.spread, page.isFirst);\1",
                        js, count=1)
        if n != 1:
            sys.exit(u"case 'quiz'를 못 찾았다: " + slug)

    for probe in ['const AFTERWORD', "kind: 'after'", "case 'after':", "'after']"]:
        if probe not in js:
            sys.exit(u'옮기다 말았다 (%s): %s' % (slug, probe))
    if "{ kind: 'end' }" not in js:
        sys.exit(u'끝 쪽이 사라졌다: ' + slug)

    io.open(app, 'wb').write((js.replace('\n', '\r\n') if crlf else js).encode('utf-8'))

    cssp = os.path.join(BOOKS, slug, 'styles.css')
    craw = io.open(cssp, 'rb').read().decode('utf-8')
    ccrlf = '\r\n' in craw
    c = craw.replace('\r\n', '\n')
    if '.page-after' not in c:
        # 본 규칙은 세로 화면 쿼리보다 **앞**에 놓아야 한다.
        # 뒤에 놓으면 쿼리 안의 덮어쓰기가 도로 깔려 세로에서 먹지 않는다.
        m = re.search(r'@media[^{]*\{', c)
        if not m:
            sys.exit(u'미디어 쿼리가 없다: ' + slug)
        c = c[:m.start()] + css_main.rstrip() + u'\n\n' + c[m.start():]

        # 세로 조각은 그 쿼리 **안**, 닫는 괄호 바로 앞에 넣는다.
        # 괄호를 세어 찾는다. 파일 맨 끝의 `}`가 쿼리 것이라는 보장이 없다.
        m = re.search(r'@media[^{]*\{', c)
        depth, i = 0, m.end() - 1
        while i < len(c):
            if c[i] == '{':
                depth += 1
            elif c[i] == '}':
                depth -= 1
                if depth == 0:
                    break
            i += 1
        if depth != 0:
            sys.exit(u'미디어 쿼리 닫는 괄호를 못 찾았다: ' + slug)
        c = c[:i] + u'\n' + css_portrait.rstrip() + u'\n' + c[i:]
    io.open(cssp, 'wb').write((c.replace('\n', '\r\n') if ccrlf else c).encode('utf-8'))

    n = sum(len(re.sub(r'<[^>]*>|\s', '', p)) for p in data['left'] + data['right'])
    return len(data['left']), len(data['right']), n


def main():
    here = os.path.dirname(os.path.abspath(sys.argv[0]))
    css_main = io.open(os.path.join(here, '_after-pic.css'), encoding='utf-8').read()
    css_portrait = io.open(os.path.join(here, '_after-pic-portrait.css'), encoding='utf-8').read()
    books = json.load(io.open(sys.argv[1], encoding='utf-8'))
    for slug in sorted(books):
        if slug.startswith('_'):
            continue
        l, r, n = one(slug, books[slug], css_main, css_portrait)
        print(u'%-24s 왼%d 오른%d · %d자' % (slug, l, r, n))


main()
