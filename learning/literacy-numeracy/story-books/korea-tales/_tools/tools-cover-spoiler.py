# -*- coding: utf-8 -*-
"""표지 소개가 결말이나 교훈을 미리 말해 버리는지 62권을 훑는다.

    python tools-cover-spoiler.py [slug ...]

표지는 책을 펴기 **전에** 읽는 글이다. 거기서 끝을 알려 주면 읽을 맛이 없다.
그늘을 산 사람 표지에 이렇게 적혀 있었다.

    "…대개 욕심 많은 쪽이 스스로 판 함정에 빠지는 결말이랍니다."

세 가지를 본다.

1. **교훈과 겹치는가** — 교훈은 다 읽은 뒤에 나오는 말이다. 표지에 미리 있으면 안 된다.
2. **마지막 펼침면 글과 겹치는가** — 끝 장면을 표지가 먼저 말한 것이다.
3. **끝을 알리는 말투가 있는가** — 「결말」 「마지막에」 「끝내」 「결국」 같은 말.

1번과 2번은 두 글자씩 끊어 견주고, 3번은 낱말로 찾는다.
기계는 의심스러운 자리를 좁혀 줄 뿐이니 마지막은 눈으로 본다.
"""
import io, os, re, sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
BOOKS = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # _tools/ 위가 책 폴더
STR = r'"((?:[^"\\]|\\.)*)"'
TELL = ('결말', '마지막에', '끝내', '결국', '끝에는', '끝이 납', '끝난답', '되고 만')
MIN_MORAL = 0.30
MIN_LAST = 0.28


def only(t):
    return re.sub(r'[^가-힣]', '', re.sub(r'<[^>]*>', '', t))


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


def moral(js):
    m = re.search(r'moral:\s*' + STR, js)
    return m.group(1) if m else ''


def last_scene(js):
    """마지막 펼침면 두 개의 글."""
    cut = js.index('function artFrame') if 'function artFrame' in js else len(js)
    head = js[:cut]
    blocks = re.findall(r'art: "[^"]+".*?right: \[(.*?)\]\s*\}', head, re.S)
    return ' '.join(' '.join(re.findall(STR, b)) for b in blocks[-2:])


def main():
    slugs = sys.argv[1:] or sorted(
        d for d in os.listdir(BOOKS) if os.path.isfile(os.path.join(BOOKS, d, 'app.js')))
    hits = 0
    for slug in slugs:
        js = io.open(os.path.join(BOOKS, slug, 'app.js'), encoding='utf-8').read()
        mo, last = moral(js), last_scene(js)
        for c in cover(js):
            why = []
            if mo and ratio(c, mo) >= MIN_MORAL:
                why.append('교훈과 %d%%' % round(ratio(c, mo) * 100))
            if last and ratio(c, last) >= MIN_LAST:
                why.append('끝장면과 %d%%' % round(ratio(c, last) * 100))
            found = [w for w in TELL if w in c]
            if found:
                why.append('끝을 알리는 말: ' + ' '.join(found))
            if why:
                hits += 1
                print('%-22s %s' % (slug, ' · '.join(why)))
                print('   %s' % c[:96])
    print('--- 들여다볼 표지 %d군데 / 책 %d권' % (hits, len(slugs)))


main()
