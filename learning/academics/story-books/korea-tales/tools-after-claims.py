# -*- coding: utf-8 -*-
"""「읽고 나서」가 가리키는 장면이 본문에 정말 있는지 대조한다.

    python tools-after-claims.py [slug ...]

해와 달이 된 오누이에서 이런 것이 나왔다.

    읽고 나서 : "누이가 해가 되겠다고 하자 오라비가 바꿔 준 대목도 다시 보십시오."
    본문     : "오빠는 달이 되고 누이는 해가 되었답니다."   ← 바꿔 준 대목이 없다

해설이 본문에 없는 장면을 가리키고 있었다. 해설을 먼저 쓰고 본문을 줄이거나,
본문에 있을 줄 알고 해설을 쓰면 이렇게 된다.

**「대목」「다시 보」「보십시오」처럼 본문을 가리키는 말이 든 문단만** 본다.
그런 문단에서 두 글자 이상 되는 우리말 낱말을 뽑아 본문에 있는지 센다.
없는 낱말이 여럿이면 사람이 들여다볼 자리다.

기계가 「빠졌다」고 단정할 수는 없다. 해설은 본문에 없는 말로 풀어 쓰기도 한다.
그러니 **의심스러운 자리를 좁혀 주는 데까지만** 쓴다.
"""
import io, json, os, re, sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
BOOKS = os.path.dirname(os.path.abspath(__file__))
STR = r'"((?:[^"\\]|\\.)*)"'
POINTER = ('대목', '다시 보', '보십시오', '떠올려', '장을 다시', '마지막 쪽', '세어 보')
# 이야기와 상관없이 흔히 쓰는 말은 뺀다
STOP2 = set('''그것 그런 이런 저런 무엇 어느 여러 아주 정말 다시 처음 마지막
다만 그래 하나 이렇 그렇 저렇 아니 없습 있습 합니 됩니 입니 때문 것이 것은 것을
보면 보십 대목 자리 이야 사람 우리 옛사 옛날 지금 오늘 여기 거기 부분 모두
한번 번도 동안 가운 만합 눈여 세어 판본 어쩔 알기 하겠 하고 해서 위해'''.split())

STOP = set('''이야기 사람 사람들 우리 그것 무엇 까닭 자리 대목 마지막 처음 다시
번째 하나 여러 옛날 옛사람 이렇게 그렇게 지금 오늘 여기 거기 부분 이것
때문 것이 있는 없는 하는 되는 같은 모두 정말 아주 그런 이런 저런'''.split())


def words(t):
    """낱말을 **앞 두 글자**로 줄여 모은다.

    본문은 ~어요·~답니다, 해설은 ~습니다라 끝이 다르다. 통째로 견주면
    「감춘 / 감추었어요」, 「얻은 / 얻었지요」가 다 다른 말로 잡힌다.
    앞 두 글자만 보면 그런 헛것이 걸러진다."""
    t = re.sub(r'<[^>]*>', '', t)
    out = set()
    for w in re.findall(r'[가-힣]{3,}', t):
        if w in STOP:
            continue
        out.add(w[:2])
    return out - STOP2


def body_text(js):
    head = js[:js.index('function artFrame')] if 'function artFrame' in js else js
    return ' '.join(re.findall(STR, head))


def after_paras(js):
    m = re.search(r'const AFTERWORD = \{.*?\n\};', js, re.S)
    if not m:
        return []
    return [x for x in re.findall(STR, m.group(0)) if len(x) > 12]


def main():
    slugs = sys.argv[1:] or sorted(
        d for d in os.listdir(BOOKS) if os.path.isfile(os.path.join(BOOKS, d, 'app.js')))
    hits = 0
    for slug in slugs:
        js = io.open(os.path.join(BOOKS, slug, 'app.js'), encoding='utf-8').read()
        body = words(body_text(js))
        for p in after_paras(js):
            if not any(k in p for k in POINTER):
                continue
            miss = sorted(w for w in words(p) if w not in body
                          and not any(w in b or b in w for b in body))
            if len(miss) >= 3:
                hits += 1
                print('%-22s %s' % (slug, p[:78]))
                print('%-22s   본문에 없는 말: %s' % ('', ' · '.join(miss[:9])))
    print('--- 들여다볼 자리 %d군데 / 책 %d권' % (hits, len(slugs)))


main()
