# -*- coding: utf-8 -*-
"""그림책에서 '서술 한 문장' 문단이 3개 이상 연달아 끊긴 자리를 뽑는다.

    python runs.py            → 전체 요약
    python runs.py <슬러그>    → 그 책의 자리를 자세히

대사("...")와 속마음('...')은 한 줄이 맞으므로 건드리지 않는다.
소리말 같은 아주 짧은 것도 그대로 둔다.
"""
import io, os, re, sys, json

BOOKS = r'E:\webprojects\class\learning\academics\story-books\korea-tales'
def _is_novel(slug):
    # 소설 틀은 paras, 그림책 틀은 beats를 쓴다. 목록을 손으로 적지 않는다.
    try:
        return u'paras: [' in io.open(os.path.join(BOOKS, slug, 'app.js'),
                                     encoding='utf-8').read()
    except IOError:
        return False


class _Novels(object):
    def __contains__(self, slug):
        return _is_novel(slug)


NOVELS = _Novels()
SENT = re.compile(u'[.!?]|\u2026')
SIDE = re.compile(r'(left|right): \[\n(.*?)\n                \]', re.S)
ITEM = re.compile(r'^\s*"((?:[^"\\]|\\.)*)",?\s*$', re.M)


def is_narration(t):
    return not (t.startswith(u'"') or t.startswith(u"'"))


def one_sentence(t):
    return len(SENT.findall(t)) == 1


def book_runs(slug):
    p = os.path.join(BOOKS, slug, 'app.js')
    s = io.open(p, encoding='utf-8').read()
    m = re.search(r'const CHAPTERS = \[[\s\S]*?\n\];', s)
    if not m:
        return []
    body = m.group(0)
    out = []
    beat = 0
    for sm in SIDE.finditer(body):
        side = sm.group(1)
        if side == 'left':
            beat += 1
        items = [x.replace('\\"', '"') for x in ITEM.findall(sm.group(2))]
        run = []
        for i, t in enumerate(items):
            if is_narration(t) and one_sentence(t):
                run.append((i, t))
            else:
                if len(run) >= 3:
                    out.append({'beat': beat, 'side': side, 'items': items, 'run': run})
                run = []
        if len(run) >= 3:
            out.append({'beat': beat, 'side': side, 'items': items, 'run': run})
    return out


def slugs():
    r = []
    for d in sorted(os.listdir(BOOKS)):
        if d in NOVELS:
            continue
        if os.path.isfile(os.path.join(BOOKS, d, 'app.js')):
            r.append(d)
    return r


if __name__ == '__main__':
    if len(sys.argv) > 1:
        slug = sys.argv[1]
        for r in book_runs(slug):
            print(u'--- %s %d번 %s쪽 ---' % (slug, r['beat'], u'왼' if r['side'] == 'left' else u'오'))
            for i, t in enumerate(r['items']):
                mark = u' >' if any(k == i for k, _ in r['run']) else u'  '
                print(u'%s[%d] %s' % (mark, i, t))
            print()
    else:
        tot = 0
        for slug in slugs():
            r = book_runs(slug)
            if r:
                n = sum(len(x['run']) for x in r)
                tot += len(r)
                print(u'%-24s %2d자리 %3d문단' % (slug, len(r), n))
        print(u'-- 모두 %d자리' % tot)
