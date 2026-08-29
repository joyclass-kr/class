# -*- coding: utf-8 -*-
"""한 문항의 답이 다른 문항에 새어 나오는 곳을 찾는다.

    python tools-quizleak.py [slug ...]

문제들이 한 쪽에 나란히 놓이므로, 3번 물음에 "개울가"가 들어 있으면
4번 답이 "개울가"인 것을 읽지 않고도 안다. 그런 곳을 찾아 준다.

찾는 것 세 가지
  * 새어 나감 — 어떤 문항의 정답이 다른 문항의 물음에 그대로 들어 있다
  * 제 물음에 답 — 물음 안에 제 정답이 들어 있다
  * 보기끼리 겹침 — 한 문항의 정답이 다른 문항의 오답 보기로 또 나온다
"""
import io, os, re, sys

BOOKS = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # _tools/ 위가 책 폴더

# 조사·어미를 떼어 알맹이만 남긴다. 완벽하지 않아도 실마리로는 넉넉하다.
TAIL = re.compile(u'(을|를|이|가|은|는|에|에서|으로|로|와|과|도|만|의|께|한테|에게)$')
DROP = re.compile(u'(했다|한다|하다|되었다|된다|간다|갔다|왔다|온다|이다|였다|입니다|습니다)$')


def chunks(text):
    out = set()
    for w in re.split(u'[\\s,·]+', text):
        w = DROP.sub(u'', w)
        w = TAIL.sub(u'', w)
        if len(w) >= 2:
            out.add(w)
    return out


def quiz_of(slug):
    s = io.open(os.path.join(BOOKS, slug, 'app.js'), encoding='utf-8').read()
    i = s.index(u'const QUIZ = [')
    j = s.index(u'\n];', i)
    out = []
    for m in re.finditer(u'\\{ q: "((?:[^"\\\\]|\\\\.)*)", choices: \\[(.*?)\\], answer: (\\d)',
                         s[i:j]):
        ch = re.findall(u'"((?:[^"\\\\]|\\\\.)*)"', m.group(2))
        out.append((m.group(1), ch, int(m.group(3))))
    return out


def check(slug):
    qs = quiz_of(slug)
    stems = [q for q, _c, _a in qs]
    hits = []
    for a, (qa, cha, ansa) in enumerate(qs):
        ans = cha[ansa]
        wrong = u' '.join(c for k, c in enumerate(cha) if k != ansa)
        # 답을 가려 주는 말만 남긴다. 오답에도 있는 말은 실마리가 못 된다.
        parts = {p for p in chunks(ans) if p not in wrong}
        # 여기저기 물음에 두루 나오는 말은 등장인물 이름 따위다.
        parts = {p for p in parts if sum(1 for t in stems if p in t) < 2}
        # 답의 몸통이 통째로 옮겨 갔을 때만 새어 나간 것으로 친다.
        parts = {p for p in parts if len(p) >= len(ans.replace(u' ', u'')) * 0.6}
        if not parts:
            continue
        for p in parts:
            if p in qa:
                hits.append((u'제 물음에 답', a + 1, None, p, ans))
        for b, (qb, chb, ansb) in enumerate(qs):
            if a == b:
                continue
            for p in parts:
                if p in qb:
                    hits.append((u'새어 나감', a + 1, b + 1, p, ans))
                    break
            if ans in chb and chb.index(ans) != ansb:
                hits.append((u'보기끼리 겹침', a + 1, b + 1, ans, ans))
    # 같은 짝이 여러 번 잡히는 것을 줄인다.
    seen, out = set(), []
    for h in hits:
        k = (h[0], h[1], h[2])
        if k in seen:
            continue
        seen.add(k)
        out.append(h)
    return qs, out


targets = sys.argv[1:] or [n for n in sorted(os.listdir(BOOKS))
                           if os.path.isfile(os.path.join(BOOKS, n, 'app.js'))]
total = 0
for slug in targets:
    qs, hits = check(slug)
    if not hits:
        continue
    total += len(hits)
    print(u'\n══ %s' % slug)
    for kind, a, b, part, ans in hits:
        if b:
            print(u'  [%s] %d번 답 "%s" 이 %d번에 들어 있다 (걸린 말: %s)'
                  % (kind, a, ans, b, part))
            print(u'      %d번 물음: %s' % (b, qs[b - 1][0]))
        else:
            print(u'  [%s] %d번 물음 안에 제 답 "%s" 이 들어 있다' % (kind, a, ans))
            print(u'      물음: %s' % qs[a - 1][0])
print(u'\n모두 %d군데' % total)
