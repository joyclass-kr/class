# -*- coding: utf-8 -*-
"""표지 소개와 「읽고 나서」가 같은 말을 되풀이하는지 잰다.

    python tools-cover-after-dup.py [slug ...]

「읽고 나서」를 62권에 붙일 때 **표지를 열어 놓지 않고 썼다.** 그래서 같은 사실을
두 번 적은 데가 많다. 읽는 사람은 표지에서 한 번, 끝에서 또 한 번 같은 말을 듣는다.

    봉이 김선달 표지 : 대동강은 평양을 가로지르는 큰 강이에요.
    봉이 김선달 해설 : 대동강은 평양을 가로지르는 큰 강입니다.

앞의 겹침 검사(tools-after-claims.py)와 달리 이것은 **기계가 확실히 잴 수 있다.**
두 글이 같은 말인지 보는 것이라 말투 차이만 걷어 내면 된다.

재는 법은 둘이다.
  * 가장 긴 같은 토막 — 글자 하나 다르면 끊기지만 통째 베낀 것은 확실히 잡는다
  * 두 글자씩 끊어 견준 겹침 비율 — 어순이 달라도 잡힌다
"""
import io, os, re, sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
BOOKS = os.path.dirname(os.path.abspath(__file__))
STR = r'"((?:[^"\\]|\\.)*)"'
BQ = r'`([^`]*)`'
MIN_RUN = 10
MIN_RATIO = 0.40


def only(t):
    return re.sub(r'[^가-힣]', '', re.sub(r'<[^>]*>', '', t))


def run(a, b):
    a, b = only(a), only(b)
    best, prev = 0, [0] * (len(b) + 1)
    for i in range(1, len(a) + 1):
        cur = [0] * (len(b) + 1)
        for j in range(1, len(b) + 1):
            if a[i - 1] == b[j - 1]:
                cur[j] = prev[j - 1] + 1
                best = max(best, cur[j])
        prev = cur
    return best


def ratio(a, b):
    def g(t):
        t = only(t)
        return set(t[i:i + 2] for i in range(len(t) - 1))
    ga, gb = g(a), g(b)
    if not ga or not gb:
        return 0.0
    return len(ga & gb) / min(len(ga), len(gb))


def cover(js):
    m = re.search(r'function coverPage\(\).*?\n\}', js, re.S)
    return re.findall(r'<p>([^<]{20,})</p>', m.group(0)) if m else []


def after(js):
    m = re.search(r'const AFTERWORD = \{.*?\n\};', js, re.S)
    if not m:
        return []
    got = re.findall(STR, m.group(0)) + re.findall(BQ, m.group(0))
    return [x for x in got if len(x) > 20]


def main():
    slugs = sys.argv[1:] or sorted(
        d for d in os.listdir(BOOKS) if os.path.isfile(os.path.join(BOOKS, d, 'app.js')))
    hits = 0
    books = set()
    for slug in slugs:
        js = io.open(os.path.join(BOOKS, slug, 'app.js'), encoding='utf-8').read()
        for c in cover(js):
            for a in after(js):
                r, q = run(c, a), ratio(c, a)
                if r >= MIN_RUN or q >= MIN_RATIO:
                    hits += 1
                    books.add(slug)
                    print('%-22s 토막%2d자 · 겹침%2d%%' % (slug, r, round(q * 100)))
                    print('   표지: %s' % c[:74])
                    print('   해설: %s' % a[:74])
    print('--- 겹친 자리 %d군데 / %d권 (책 %d권 훑음)' % (hits, len(books), len(slugs)))


main()
