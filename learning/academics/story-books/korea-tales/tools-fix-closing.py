# -*- coding: utf-8 -*-
"""합친 「읽고 나서」의 두 가지를 바로잡는다.

    python tools-fix-closing.py [--dry]

**하나, 물음 차례.** 합칠 때 교훈을 맨 뒤에 붙였더니 이렇게 되었다.

    … 내 물음? → 교훈 → 책 물음?

물음 사이에 서술이 끼었다. 교훈을 앞으로 보내 물음 둘을 붙인다.

    … 교훈 → 내 물음? → 책 물음?

**둘, 놓친 겹침.** 두 글자씩 끊어 견주는 방식은 짧은 겹침을 못 잡는다.
은혜 갚은 까치가 26%로 나왔는데 실제로는 이랬다.

    읽고 나서 : … 그날 밤 목숨을 건진 것은 선비였습니다.
    교훈      : … 그날 밤 목숨을 구한 것은 선비였습니다.

그래서 **가장 긴 같은 토막**도 함께 본다. 열두 자가 넘게 겹치면 잡는다.
글자 하나 다른 것(건진/구한)은 토막이 끊기므로, 토막을 이어 붙여 세는 대신
양쪽에서 가장 긴 것 하나만 본다. 그것으로 충분히 잡힌다.
"""
import io, json, os, re, sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
BOOKS = os.path.dirname(os.path.abspath(__file__))
STR = r'"((?:[^"\\]|\\.)*)"'
DRY = '--dry' in sys.argv
MIN_RUN = 12


def esc(s):
    return s.replace('\\', '\\\\').replace('"', '\\"')


def bigram_ratio(a, b):
    """두 글자씩 끊어 견준 겹침 비율."""
    def g(t):
        t = re.sub(r'[^가-힣]', '', t)
        return set(t[i:i + 2] for i in range(len(t) - 1))
    ga, gb = g(a), g(b)
    if not ga or not gb:
        return 0.0
    return len(ga & gb) / min(len(ga), len(gb))


def longest_run(a, b):
    """두 글에서 가장 긴 같은 토막의 길이."""
    a = re.sub(r'[^가-힣]', '', a)
    b = re.sub(r'[^가-힣]', '', b)
    best = 0
    prev = [0] * (len(b) + 1)
    for i in range(1, len(a) + 1):
        cur = [0] * (len(b) + 1)
        for j in range(1, len(b) + 1):
            if a[i - 1] == b[j - 1]:
                cur[j] = prev[j - 1] + 1
                if cur[j] > best:
                    best = cur[j]
        prev = cur
    return best


def one(slug):
    p = os.path.join(BOOKS, slug, 'app.js')
    raw = io.open(p, 'rb').read().decode('utf-8')
    crlf = '\r\n' in raw
    s = raw.replace('\r\n', '\n')
    m = re.search(r'const AFTERWORD = \{.*?\n\};', s, re.S)
    if not m:
        return None
    block = m.group(0)
    left = re.findall(STR, re.search(r'left: \[(.*?)\n            \],', block, re.S).group(1))
    right = re.findall(STR, re.search(r'right: \[(.*?)\n            \]', block, re.S).group(1))
    paras = left + right
    note = []

    # 1. 물음 차례 — 교훈(뒤에서 둘째)을 내 물음(뒤에서 셋째) 앞으로 보낸다
    if len(paras) >= 3 and paras[-3].rstrip().endswith('?') and not paras[-2].rstrip().endswith('?'):
        paras[-3], paras[-2] = paras[-2], paras[-3]
        note.append('물음 차례 바로잡음')

    # 2. 놓친 겹침 — 교훈과 긴 토막이 같은 문단을 뺀다
    # 잣대를 둘 쓴다. 긴 토막 하나만 봐도 걸리는 것, 그리고
    # 토막은 짧지만 두 글자 겹침이 높은 것(글자 하나 달라 토막이 끊긴 경우).
    # 교훈은 「맨 끝에서 물음이 아닌 마지막 문단」이다.
    # 자리로 세면(-2 든 -3 이든) 물음 차례가 안 바뀐 책에서 어긋난다.
    mi = max((i for i, t in enumerate(paras) if not t.rstrip().endswith('?')), default=-1)
    moral = paras[mi] if mi >= 0 else ''
    for i in range(mi):
        r = longest_run(paras[i], moral)
        b = bigram_ratio(paras[i], moral)
        if r >= MIN_RUN or (r >= 8 and b >= 0.25):
            note.append('겹친 문단 뺌(토막 %d자·겹침 %d%%): %s' % (r, round(b * 100), paras[i][:30]))
            paras.pop(i)
            break

    if not note:
        return None
    if DRY:
        return note

    new = re.sub(r'left: \[(.*?)\n            \],',
                 'left: [\n%s\n            ],' % ',\n'.join('                "%s"' % esc(x) for x in paras),
                 block, count=1, flags=re.S)
    new = re.sub(r'right: \[(.*?)\n            \]',
                 'right: [\n            ]', new, count=1, flags=re.S)
    s = s.replace(block, new)
    io.open(p, 'wb').write((s.replace('\n', '\r\n') if crlf else s).encode('utf-8'))
    return note


def main():
    pic = json.load(io.open(os.path.join(BOOKS, '_books-pic.json'), encoding='utf-8'))
    n = 0
    for slug in pic:
        note = one(slug)
        if note:
            n += 1
            print('%-24s %s' % (slug, ' · '.join(note)))
    print('--- 손본 책 %d권%s' % (n, ' (미리보기)' if DRY else ''))
    if not DRY:
        print('※ 글이 한쪽으로 몰렸다. tools-rebalance-after.py 로 다시 가를 것.')


main()
