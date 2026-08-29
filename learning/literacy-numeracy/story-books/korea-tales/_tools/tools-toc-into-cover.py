# -*- coding: utf-8 -*-
"""그림책의 차례를 표지에 합친다.

    python tools-toc-into-cover.py [slug ...]

그림책은 장이 서넛뿐이라 차례가 펼침 하나를 통째로 쓰면 아홉 할이 빈 종이가 된다.
표지 오른쪽 칸은 아래쪽 600px쯤이 늘 비어 있으니 그 자리에 조촐하게 붙인다.

소설 틀은 장이 예닐곱이라 차례가 제 몫을 하므로 손대지 않는다.
"""
import io, os, re, sys

BOOKS = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # _tools/ 위가 책 폴더

COVER_TOC = u'''function coverToc() {
    const item = s => `
        <button type="button" data-goto="${s.num}">
            <span class="toc-num">${s.num}</span>
            <span>${s.title.replace(/^\\d+장 · /, '')}</span>
        </button>`;
    return `
        <nav class="cover-toc">
            <h2>차례</h2>
            ${CHAPTERS.map(item).join('')}
            <button type="button" data-goto-kind="quiz">
                <span class="toc-num">❓</span>
                <span>이야기 문제</span>
            </button>
        </nav>`;
}

'''

CSS = u'''
/* 그림책은 장이 서넛뿐이라 차례가 펼침 하나를 쓸 만큼이 못 된다.
   표지 오른쪽 아래 빈자리에 조촐하게 붙인다. */
.cover-toc {
    margin-top: clamp(18px, 3vw, 34px);
    padding-top: clamp(12px, 1.8vw, 18px);
    border-top: 1px solid rgba(92, 58, 34, 0.16);
    display: grid;
    gap: 6px;
}

.cover-toc h2 {
    margin: 0 0 4px;
    font-size: clamp(13px, 1.5vw, 15px);
    font-weight: 700;
    color: var(--muted);
    letter-spacing: 0.06em;
}

.cover-toc button {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 7px 11px;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(92, 58, 34, 0.14);
    border-radius: 9px;
    font: inherit;
    font-size: clamp(13px, 1.5vw, 14.5px);
    color: var(--ink);
    text-align: left;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
}

.cover-toc button:hover,
.cover-toc button:focus-visible {
    background: rgba(255, 255, 255, 0.9);
    border-color: rgba(92, 58, 34, 0.32);
}

.cover-toc .toc-num { flex: none; }
'''


def patch(slug):
    d = os.path.join(BOOKS, slug)
    p = os.path.join(d, 'app.js')
    s = io.open(p, encoding='utf-8').read()
    if u'paras: [' in s:
        return u'소설 틀 — 건너뜀'
    if u'function coverToc()' in s:
        return u'이미 되어 있음'

    # 1) 표지 오른쪽 칸 끝에 차례를 부른다.
    m = re.search(u'(<div class="story-page-right">\\n(?:.*?\\n)*?)(\\s*</div>\\n\\s*</div>`;\\n\\})',
                  s)
    if not m:
        return u'!! 표지 오른쪽 칸을 못 찾음'
    s = s[:m.end(1)] + u'                ${coverToc()}\n' + s[m.start(2):]

    # 2) coverToc() 를 표지 함수 앞에 끼운다.
    s = s.replace(u'function coverPage() {', COVER_TOC + u'function coverPage() {', 1)

    # 3) 차례 쪽을 없앤다.
    s = s.replace(u"    { kind: 'toc' },\n", u'')
    s = re.sub(u"        case 'toc':\n            return tocPage\\(\\);\n", u'', s)
    s = re.sub(u'function tocPage\\(\\) \\{.*?\\n\\}\\n\\n', u'', s, count=1, flags=re.S)
    s = s.replace(u"new Set(['spread', 'toc', 'cover'])", u"new Set(['spread', 'cover'])")

    # 4) ☰ 차례 단추는 표지로 보낸다.
    s = s.replace(u"    const idx = PAGES.findIndex(p => p.kind === 'toc');\n"
                  u"    if (idx >= 0) goTo(idx);",
                  u"    // 그림책은 차례가 표지에 붙어 있다.\n"
                  u"    const idx = PAGES.findIndex(p => p.kind === 'toc');\n"
                  u"    goTo(idx >= 0 ? idx : 0);")

    io.open(p, 'w', encoding='utf-8', newline='\n').write(s)

    # 5) 스타일을 더한다.
    c = os.path.join(d, 'styles.css')
    css = io.open(c, encoding='utf-8').read()
    if u'.cover-toc' not in css:
        io.open(c, 'w', encoding='utf-8', newline='\n').write(css.rstrip() + u'\n' + CSS)
    return u'합침'


targets = sys.argv[1:] or [n for n in sorted(os.listdir(BOOKS))
                           if os.path.isfile(os.path.join(BOOKS, n, 'app.js'))]
done = 0
for slug in targets:
    r = patch(slug)
    if r == u'합침':
        done += 1
    elif r.startswith(u'!!'):
        print(u'  %-24s %s' % (slug, r))
print(u'그림책 %d권의 차례를 표지에 합침' % done)
