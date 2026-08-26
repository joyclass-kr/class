# -*- coding: utf-8 -*-
"""끝 쪽을 「읽고 나서」에 합친다. 세계명작 트랙과 같은 모양이 된다.

    python tools-merge-end.py

    전:  이야기 → 문제 → 읽고 나서(글만) → 끝(그림 + 다 읽었어요 + 단추)
    후:  이야기 → 문제 → 읽고 나서(오른쪽 위 그림 + 글 + 아래 단추)

끝 쪽에 있던 것 가운데 그림과 단추는 옮기고, 「○○ 이야기를 다 읽었어요!」 한 줄은
버린다. 「읽고 나서」를 여기까지 읽은 사람에게 다 읽었다고 알릴 까닭이 없다.

그림 이름은 책마다 다르다(png인 책과 webp인 책이 섞여 있다). endPage() 가 부르던
이름을 그대로 읽어 쓴다.
"""
import io, json, os, re, sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
BOOKS = os.path.dirname(os.path.abspath(__file__))

NEW_AFTER = '''function afterPage(spread, isFirst) {
    const head = isFirst ? `<h2>${AFTERWORD.title}</h2>` : '';
    // 그림은 오른쪽 칸 맨 위 모서리에 꽉 붙인다. 학습 허브로 가는 길은 그 칸 맨 아래에 둔다.
    const art = spread.art ? `<div class="after-art">${artFrame(spread.art, AFTERWORD.emoji)}</div>` : '';
    const foot = spread.last ? `<p class="after-home"><a class="home-btn" href="../../../../../">학습 허브로 돌아가기</a></p>` : '';
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
                ${foot}
            </div>
        </div>`;
}'''

CSS_ADD = '''
/* 그림은 오른쪽 칸 맨 위 모서리에 꽉 붙인다. 칸 안쪽 여백만큼 끌어낸다.
   높이는 고정한다 — 남는 자리를 다 먹게 두면 그림 비율이 칸에 끌려 다닌다. */
.after-col-image { justify-content: flex-start; }

.after-art {
    flex: 0 0 auto;
    aspect-ratio: 3 / 2;
    width: calc(100% + var(--after-pad-x) * 2);
    margin: calc(-1 * var(--after-pad-y)) calc(-1 * var(--after-pad-x)) clamp(8px, 1.8cqh, 18px);
    overflow: hidden;
}

.after-art .art-frame { width: 100%; height: 100%; border-radius: 0; }

.after-home { margin-top: auto; padding-top: 8px; text-align: center; text-indent: 0; }
.after-home .home-btn { margin-top: 0; }
'''


def one(slug):
    p = os.path.join(BOOKS, slug, 'app.js')
    raw = io.open(p, 'rb').read().decode('utf-8')
    crlf = '\r\n' in raw
    s = raw.replace('\r\n', '\n')

    m = re.search(r"function endPage\(\) \{.*?artFrame\('([^']+)'", s, re.S)
    if not m:
        return None
    art = m.group(1)

    # 읽고 나서에 그림과 「마지막 쪽」 표시를 되돌린다
    s = re.sub(r"(spreads: \[\n        \{\n)", r"\1            art: '%s',\n" % art, s, count=1)
    s = re.sub(r"\.\.\.AFTERWORD\.spreads\.map\(\(spread, i\) => \(\{ kind: 'after', spread, isFirst: i === 0 \}\)\),",
               "...AFTERWORD.spreads.map((spread, i) => ({ kind: 'after', spread, isFirst: i === 0, last: i === AFTERWORD.spreads.length - 1 })),",
               s, count=1)
    s = re.sub(r"case 'after':\n(\s*)return afterPage\(page\.spread, page\.isFirst\);",
               r"case 'after':\n\1return afterPage({ ...page.spread, last: page.last }, page.isFirst);", s, count=1)
    s = re.sub(r'function afterPage\(spread, isFirst\) \{.*?\n\}', NEW_AFTER, s, count=1, flags=re.S)

    # 끝 쪽을 걷어 낸다
    s = re.sub(r'\nfunction endPage\(\) \{.*?\n\}\n', '\n', s, count=1, flags=re.S)
    s = re.sub(r"\n *\{ kind: 'end' \}\n", '\n', s, count=1)
    s = re.sub(r",\n( *)\{ kind: 'end' \}", '', s, count=1)
    s = re.sub(r"\n *case 'end':\n *return endPage\(\);", '', s, count=1)

    for gone in ['endPage', "kind: 'end'", "case 'end'"]:
        if gone in s:
            sys.exit('%s 가 아직 남아 있다: %s' % (gone, slug))
    for need in ["art: '%s'" % art, 'after-home', 'after-art', 'page.last']:
        if need not in s:
            sys.exit('%s 를 못 넣었다: %s' % (need, slug))

    io.open(p, 'wb').write((s.replace('\n', '\r\n') if crlf else s).encode('utf-8'))

    c = os.path.join(BOOKS, slug, 'styles.css')
    craw = io.open(c, 'rb').read().decode('utf-8')
    ccrlf = '\r\n' in craw
    cs = craw.replace('\r\n', '\n')
    if '.after-art' not in cs:
        m2 = re.search(r'@media[^{]*\{', cs)
        cs = cs[:m2.start()] + CSS_ADD.strip() + '\n\n' + cs[m2.start():]
    io.open(c, 'wb').write((cs.replace('\n', '\r\n') if ccrlf else cs).encode('utf-8'))
    return art


def main():
    pic = json.load(io.open(os.path.join(BOOKS, '_books-pic.json'), encoding='utf-8'))
    n = 0
    for slug in pic:
        a = one(slug)
        if a:
            n += 1
    print('끝 쪽을 읽고 나서에 합친 책 %d권' % n)


main()
