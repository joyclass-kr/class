# -*- coding: utf-8 -*-
"""정답이 늘 첫 번째 보기에 오는 문제를 고친다.

문항 순번에 따라 정답 자리를 정해진 차례로 흩는다. 규칙이 정해져 있으므로
생성기로 다시 찍어도 같은 결과가 나온다.
"""
import io, os, re, json, sys

SPREAD = [1, 2, 0, 2, 0, 1]
BOOKS = r'E:\webprojects\class\learning\academics\story-books\korea-tales'
LINE = re.compile(r'^(\s*)\{ q: (.*?), choices: (\[.*?\]), answer: (\d+) \}(,?)\s*$')


def respread(choices, answer, i):
    t = SPREAD[i % len(SPREAD)]
    correct = choices[answer]
    rest = [c for k, c in enumerate(choices) if k != answer]
    out = rest[:t] + [correct] + rest[t:]
    return out, out.index(correct)


def fix_text(src):
    out, i, inside, changed = [], 0, False, 0
    for line in src.split(u'\n'):
        if line.startswith(u'const QUIZ = ['):
            inside, i = True, 0
            out.append(line)
            continue
        if inside and line.startswith(u'];'):
            inside = False
            out.append(line)
            continue
        m = LINE.match(line) if inside else None
        if not m:
            out.append(line)
            continue
        indent, q, ch, ans, comma = m.groups()
        choices = json.loads(ch)
        new, na = respread(choices, int(ans), i)
        if new != choices:
            changed += 1
        out.append(u'%s{ q: %s, choices: [%s], answer: %d }%s'
                   % (indent, q, u', '.join(json.dumps(c, ensure_ascii=False) for c in new),
                      na, comma))
        i += 1
    return u'\n'.join(out), changed


if __name__ == '__main__':
    total = 0
    for slug in sorted(os.listdir(BOOKS)):
        p = os.path.join(BOOKS, slug, 'app.js')
        if not os.path.isfile(p):
            continue
        s = io.open(p, encoding='utf-8').read()
        new, n = fix_text(s)
        if n:
            io.open(p, 'w', encoding='utf-8').write(new)
            total += n
            print(u'%-24s %d문항' % (slug, n))
    print(u'-- 모두 %d문항 자리 옮김' % total)
