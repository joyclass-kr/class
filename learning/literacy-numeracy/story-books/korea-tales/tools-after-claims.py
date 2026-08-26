# -*- coding: utf-8 -*-
"""표지 소개와 「읽고 나서」가 본문에 없는 것을 말하는지 62권을 대조한다.

    python tools-after-claims.py [slug ...]

이런 것들이 나왔다.

    해와 달  : 해설이 「오라비가 바꿔 준 대목」을 가리키는데 본문에 그 대목이 없었다
    팥죽 할멈 : 해설이 도우미로 「송곳」을 셌는데 이 책은 절구다
    혹부리   : 해설이 「비를 피하러」라는데 본문은 날이 저물어 들어간다
    구렁덩덩  : 해설이 「신부가 어긴 금기」라는데 이 책은 언니들이 태운다
    석탈해   : 해설이 「호공은 뒷날 신하가 됩니다」라는데 본문에 없다
    온달     : 표지만 「목숨을 잃은 곳」이라는데 본문에 죽는 대목이 없다

**본문을 열어 놓지 않고 해설을 쓰면 이렇게 된다.** 해설은 본문 뒤에 붙는 글이라
틀리면 아무도 안 본다. 그래서 기계로 훑는다.

낱말은 **앞 두 글자**로 줄여 견준다. 본문은 ~어요·~답니다, 해설은 ~습니다라
통째로 견주면 말투 차이가 다 걸린다.

기계가 「빠졌다」고 단정할 수는 없다. 해설은 본문에 없는 말로 풀어 쓰기도 하고,
다른 판본 이야기를 하기도 한다. **의심스러운 자리를 좁혀 주는 데까지만** 쓴다.
"""
import io, os, re, sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
BOOKS = os.path.dirname(os.path.abspath(__file__))
STR = r'"((?:[^"\\]|\\.)*)"'
BQ = r'`([^`]*)`'

# 이야기와 상관없이 흔히 쓰는 말, 그리고 어미 조각
STOP = set('''그것 그런 이런 저런 무엇 어느 여러 아주 정말 다시 처음 마지막 다만
그래 하나 이렇 그렇 저렇 아니 없습 있습 합니 됩니 입니 때문 것이 것은 것을 것입
보면 보십 대목 자리 이야 사람 우리 옛사 옛날 지금 오늘 여기 거기 부분 모두 한번
번도 동안 가운 만합 눈여 세어 판본 어쩔 알기 하겠 하고 해서 위해 뿐입 아닙 않습
않았 되었 그러 그리 여러분 세계 곳곳 나라 오래 조금 얼마 어디 누구 무슨 어떻
생각 까닭 마음 이름 말이 말을 말은 소리 사이 뒤에 앞에 안에 밖에'''.split())


def stems(t):
    t = re.sub(r'<[^>]*>', '', t)
    return set(w[:2] for w in re.findall(r'[가-힣]{3,}', t)) - STOP


def body_text(js):
    cut = js.index('function artFrame') if 'function artFrame' in js else len(js)
    return ' '.join(re.findall(STR, js[:cut]))


def cover_paras(js):
    m = re.search(r'function coverPage\(\).*?\n\}', js, re.S)
    if not m:
        return []
    return [x for x in re.findall(r'<p>([^<]{25,})</p>', m.group(0))]


def after_paras(js):
    m = re.search(r'const AFTERWORD = \{.*?\n\};', js, re.S)
    if not m:
        return []
    got = re.findall(STR, m.group(0)) + re.findall(BQ, m.group(0))
    return [x for x in got if len(x) > 20]


def main():
    slugs = sys.argv[1:] or sorted(
        d for d in os.listdir(BOOKS) if os.path.isfile(os.path.join(BOOKS, d, 'app.js')))
    rows = []
    for slug in slugs:
        js = io.open(os.path.join(BOOKS, slug, 'app.js'), encoding='utf-8').read()
        body = stems(body_text(js))
        for kind, paras in (('표지', cover_paras(js)), ('읽고나서', after_paras(js))):
            for p in paras:
                miss = sorted(stems(p) - body)
                if len(miss) >= 4:
                    rows.append((len(miss), slug, kind, p, miss))
    rows.sort(reverse=True)
    for n, slug, kind, p, miss in rows:
        print('%2d  %-22s [%s] %s' % (n, slug, kind, p[:66]))
        print('%-30s   없는 말: %s' % ('', ' · '.join(miss[:10])))
    print('--- 들여다볼 자리 %d군데 / 책 %d권' % (len(rows), len(slugs)))


main()
