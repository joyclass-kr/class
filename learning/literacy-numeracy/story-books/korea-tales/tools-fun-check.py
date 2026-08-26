# -*- coding: utf-8 -*-
"""책마다 '재미난 대목'이 얼마나 있는지 어림잡아 잰다.

    python tools-fun-check.py

기계가 재미를 알 수는 없다. 다만 재미없는 글에는 공통된 자국이 있다 —
대사가 적고, 소리말이 없고, 인물이 아무 소리도 지르지 않는다.
그 세 가지를 세어 낮은 책부터 보여 준다. 판단은 사람이 한다.
"""
import io, os, re

BOOKS = os.path.dirname(os.path.abspath(__file__))

# 우리 옛이야기에서 자주 쓰는 소리말·흉내말
SOUND = u"""쿵 쾅 펄쩍 훌쩍 슬금 살금 덥석 우르르 뚝딱 팟 톡 툭 척 쑥 슥 홱 휙
푹 퍽 탁 딱 꽝 쨍 첨벙 풍덩 철퍽 후드득 주르륵 뚝뚝 방울 스르르 사르르 부스럭
바스락 와작 아그작 우물우물 오물오물 후루룩 꿀꺽 꼴깍 냠냠 쩝쩝 두근 쿵쾅
파르르 부들부들 덜덜 오들오들 벌벌 씩씩 헐레벌떡 타박타박 터덜터덜 성큼
어슬렁 기웃 갸웃 끄덕 절레절레 반짝 번쩍 어른어른 활활 이글 모락 뭉게
휘휘 빙글 데굴 뒹굴 폴짝 껑충 깡충 살랑 흔들 출렁 넘실 우당탕 와르르
드르렁 쌔근 킥킥 깔깔 껄껄 히죽 빙긋 싱글 방긋 엉엉 훌쩍 흑흑 딸꾹
어흥 음머 멍멍 야옹 꼬끼오 짹짹 까악 개굴 맴맴 윙윙""".split()


def score(slug):
    s = io.open(os.path.join(BOOKS, slug, 'app.js'), encoding='utf-8').read()
    if u'paras: [' in s:
        body = u' '.join(re.findall(r'`([^`]*)`', s))
        kind = u'소설'
    else:
        head = s[s.index('const CHAPTERS = ['):s.index('const PAGES')]
        body = u' '.join(t for t in re.findall(r'"((?:[^"\\]|\\.)*)"', head)
                         if len(t) > 4 and not t.endswith('.png') and not t.endswith('.webp'))
        kind = u'그림책'
    chars = max(1, len(body))
    per = 1000.0 / chars
    talk = (body.count(u'\\"') // 2) + body.count(u'"') // 2 + body.count(u'<br>')
    bang = body.count(u'!')
    snd = sum(body.count(w) for w in SOUND)
    return kind, chars, talk * per, bang * per, snd * per


rows = []
for slug in sorted(os.listdir(BOOKS)):
    if not os.path.isfile(os.path.join(BOOKS, slug, 'app.js')):
        continue
    kind, chars, talk, bang, snd = score(slug)
    rows.append((snd + bang, slug, kind, chars, talk, bang, snd))

rows.sort()
print(u'천 자마다 몇 번 나오는지 — 낮은 책부터')
print(u'%-24s %-6s %6s %6s %6s %6s' % (u'책', u'갈래', u'글자', u'대사', u'느낌표', u'소리말'))
for _, slug, kind, chars, talk, bang, snd in rows:
    print(u'%-24s %-6s %6d %6.1f %6.1f %6.1f' % (slug, kind, chars, talk, bang, snd))
