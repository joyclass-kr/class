# -*- coding: utf-8 -*-
"""소설틀 책에 「읽고 나서」 쪽을 붙인다.

    python tools-add-afterword.py <slug> <글.json>

장 발장(world-novels/jean-valjean)이 원본이다. 장과 똑같이 재서 나누므로
글이 길든 짧든 알아서 펼침면 수가 정해진다.

글.json 모양:
    { "emoji": "👁️", "paras": ["...", "...", ...] }

하던 일:
  1. endPage() / kind:'end' 를 걷어 내고 그 자리에 읽고 나서를 넣는다.
     (end.png 는 없어지지 않는다. 읽고 나서의 그림으로 옮겨 간다.)
  2. AFTERWORD, AFTER_SEGS, AFTER_FOOT, paginateAfterword, afterSpreadPage 를 넣는다.
  3. TWO_PAGE_KINDS 에 'after' 를 더한다.
  4. styles.css 에 .after-home 을 더한다.

이미 붙어 있으면 글만 갈아 끼운다.
"""
import io, json, os, re, sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
BOOKS = os.path.dirname(os.path.abspath(__file__))

BLOCK = u'''
/* 읽고 나서 — 장과 같은 방식으로 쪽을 나눈다. 그림은 오른쪽 위에 얹힌다. */
const AFTERWORD = {
    title: '읽고 나서',
    emoji: '%(emoji)s',
    art: ['end.png'],
    paras: [
%(paras)s
    ]
};

const AFTER_SEGS = (() => {
    const segs = [];
    AFTERWORD.paras.forEach((html, paraIdx) => {
        splitSegments(html).forEach((piece, k) => {
            segs.push({ paraIdx, html: piece, start: k === 0 });
        });
    });
    return segs;
})();

const AFTER_FOOT = `<p class="after-home"><a class="home-btn" href="../../../../../">학습 허브로 돌아가기</a></p>`;

function paginateAfterword() {
    const segs = AFTER_SEGS;
    const arts = AFTERWORD.art || [];
    const { usable, headHeight, artHeight } = PROBE;
    const headHtml = `<h2>${AFTERWORD.title}</h2>`;
    const totalH = PROBE.measure(runHtml(segs, 0, segs.length));

    const underArt = Math.max(60, usable - artHeight);

    // 맨 끝에는 학습 허브로 가는 단추가 붙는다. 그 높이를 미리 빼 두지 않으면
    // 마지막 쪽만 넘친다.
    const footH = PROBE.measure(AFTER_FOOT);

    const capsOf = slots => {
        const caps = [];
        slots.forEach(kind => { caps.push(usable); caps.push(kind === 'img' ? underArt : usable); });
        caps[caps.length - 1] = Math.max(60, caps[caps.length - 1] - footH);
        return caps;
    };

    const minSpreads = Math.max(arts.length, 1);
    const maxSpreads = Math.max(minSpreads, Math.floor(segs.length / 2));
    let spreadCount = minSpreads;
    while (spreadCount < maxSpreads) {
        const caps = capsOf(slotPlan(arts.length, spreadCount - arts.length));
        if (caps.reduce((a, b) => a + b, 0) >= totalH + headHeight) break;
        spreadCount++;
    }

    let slots = slotPlan(arts.length, Math.max(0, spreadCount - arts.length));
    let caps = capsOf(slots);
    let ranges = fillPages(segs, caps, headHtml);
    for (let guard = 0; guard < 8; guard++) {
        const over = ranges.some(([a, b], n) =>
            PROBE.measure((n === 0 ? headHtml : '') + runHtml(segs, a, b)) > caps[n] + 0.25);
        if (!over || spreadCount >= maxSpreads) break;
        spreadCount++;
        slots = slotPlan(arts.length, Math.max(0, spreadCount - arts.length));
        caps = capsOf(slots);
        ranges = fillPages(segs, caps, headHtml);
    }

    const spreads = [];
    let pageIdx = 0;
    let artIdx = 0;
    slots.forEach((kind, s) => {
        const left = ranges[pageIdx++];
        const right = ranges[pageIdx++];
        spreads.push({
            kind: 'after', first: s === 0, last: s === slots.length - 1,
            art: kind === 'img' ? arts[artIdx++] : null, left, right
        });
    });
    return spreads;
}

function afterSpreadPage(spread) {
    const segs = AFTER_SEGS;
    const head = spread.first ? `<h2>${AFTERWORD.title}</h2>` : '';
    // 학습 허브로 돌아가는 길은 맨 끝에 한 번만 둔다.
    const foot = spread.last ? AFTER_FOOT : '';

    if (spread.art) {
        return `
            <div class="page page-story page-after">
                <div class="story-page-left">
                    ${head}
                    ${runHtml(segs, spread.left[0], spread.left[1])}
                </div>
                <div class="story-page-right story-page-right-image">
                    <div class="story-art-top">${artFrame(spread.art, AFTERWORD.emoji)}</div>
                    ${runHtml(segs, spread.right[0], spread.right[1])}
                    ${foot}
                </div>
            </div>`;
    }

    return `
        <div class="page page-story page-after">
            <div class="story-page-left">
                ${head}
                ${runHtml(segs, spread.left[0], spread.left[1])}
            </div>
            <div class="story-page-right story-page-right-text">
                ${runHtml(segs, spread.right[0], spread.right[1])}
                ${foot}
            </div>
        </div>`;
}
'''

CSS = u'''
/* 읽고 나서 — 장과 같은 모양으로 흐른다. 그림은 오른쪽 위에 얹힌다.
   학습 허브로 가는 길은 마지막 쪽 끝에 한 번만 둔다. */
.after-home {
    margin-top: 16px;
    text-align: center;
    text-indent: 0;
}

.after-home .home-btn { margin-top: 0; }
'''


def esc(s):
    return s.replace(u'\\', u'\\\\').replace(u'`', u'\\`').replace(u'${', u'\\${')


def main():
    slug, src = sys.argv[1], sys.argv[2]
    data = json.load(io.open(src, encoding='utf-8'))
    paras = u',\n'.join(u'        `%s`' % esc(p) for p in data['paras'])
    block = BLOCK % {'emoji': data['emoji'], 'paras': paras}

    app = os.path.join(BOOKS, slug, 'app.js')
    js = io.open(app, encoding='utf-8').read()
    before = js

    if 'const AFTERWORD' in js:
        # 글만 갈아 끼운다
        js = re.sub(r'\n/\* 읽고 나서 —.*?\n\}\n(?=\nconst TWO_PAGE_KINDS)',
                    block, js, count=1, flags=re.S)
    else:
        # endPage() 를 걷어 내고 그 자리에 넣는다
        js, n = re.subn(r'\nfunction endPage\(\) \{.*?\n\}\n(?=\nconst TWO_PAGE_KINDS)',
                        block, js, count=1, flags=re.S)
        if n != 1:
            sys.exit(u'endPage() 를 못 찾았다: ' + slug)
        js = js.replace("const TWO_PAGE_KINDS = new Set(['chapter', 'toc', 'cover']);",
                        "const TWO_PAGE_KINDS = new Set(['chapter', 'toc', 'cover', 'after']);")
        js = js.replace("        { kind: 'end' }\n", "        ...paginateAfterword()\n")
        js = js.replace("        case 'end': return endPage();",
                        "        case 'after': return afterSpreadPage(page);")

    for probe in ["const TWO_PAGE_KINDS = new Set(['chapter', 'toc', 'cover', 'after']);",
                  '...paginateAfterword()', "case 'after': return afterSpreadPage(page);",
                  'const AFTERWORD']:
        if probe not in js:
            sys.exit(u'옮기다 말았다 (%s): %s' % (slug, probe))
    if 'endPage' in js or "kind: 'end'" in js:
        sys.exit(u'끝쪽이 남아 있다: ' + slug)

    io.open(app, 'w', encoding='utf-8', newline='\n').write(js)

    css = os.path.join(BOOKS, slug, 'styles.css')
    c = io.open(css, encoding='utf-8').read()
    if '.after-home' not in c:
        io.open(css, 'w', encoding='utf-8', newline='\n').write(c.rstrip() + u'\n' + CSS)

    print(u'%-18s 문단 %d개 · %d자 (%s)'
          % (slug, len(data['paras']),
             sum(len(re.sub(r'<[^>]*>|\s', '', p)) for p in data['paras']),
             u'글 갈아 끼움' if 'const AFTERWORD' in before else u'새로 붙임'))


main()
