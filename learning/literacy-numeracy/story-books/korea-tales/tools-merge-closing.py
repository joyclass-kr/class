# -*- coding: utf-8 -*-
"""동화틀 끝맺음 세 쪽을 둘로 합친다.

    python tools-merge-closing.py <닫는글.json>

전:  이야기 → 이야기를 다 읽고 → 문제 → 읽고 나서(그림) → 끝(그림)
후:  이야기 → 문제 → 읽고 나서(두 칸 다 글) → 끝(그림)

세 가지가 한꺼번에 풀린다.
  * 끝맺는 쪽이 셋에서 둘로 준다
  * 같은 `end` 그림이 두 번 나오던 것이 한 번이 된다
  * 「이야기를 다 읽고」가 예닐곱 할 비어 있던 것이 없어지고,
    그 자리를 「읽고 나서」가 넓게 쓴다 (그림이 빠져 글자리가 사 할쯤 는다)

닫는글.json 모양 — 교훈을 「읽고 나서」 말투(~습니다)로 옮겨 적은 것:
    { "<slug>": { "close": ["교훈 문단", "물음 문단"], "drop": 3 } }
      close : 오른쪽 칸 끝에 붙일 문단들
      drop  : 교훈과 겹쳐서 빼낼 문단 번호 (왼4·오른2를 0~5로 이어 센 자리, 없으면 -1)
"""
import io, json, os, re, sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
BOOKS = os.path.dirname(os.path.abspath(__file__))
STR = r'"((?:[^"\\]|\\.)*)"'


def esc(s):
    return s.replace('\\', '\\\\').replace('"', '\\"')


def one(slug, spec):
    p = os.path.join(BOOKS, slug, 'app.js')
    raw = io.open(p, 'rb').read().decode('utf-8')
    crlf = '\r\n' in raw
    s = raw.replace('\r\n', '\n')

    m = re.search(r'const AFTERWORD = \{.*?\n\};', s, re.S)
    if not m:
        sys.exit('읽고 나서가 없다: ' + slug)
    block = m.group(0)
    left = re.findall(STR, re.search(r'left: \[(.*?)\n            \],', block, re.S).group(1))
    right = re.findall(STR, re.search(r'right: \[(.*?)\n            \]', block, re.S).group(1))

    paras = left + right
    d = spec.get('drop', -1)
    if d >= 0:
        if d >= len(paras):
            sys.exit('뺄 문단 번호가 범위를 넘는다: %s %d' % (slug, d))
        paras.pop(d)
    paras += spec['close']

    # 글자 수로 반씩 가른다. 왼쪽이 조금 더 가져간다 (제목이 오른쪽에 없으므로).
    n = [len(re.sub(r'\s', '', x)) for x in paras]
    total = sum(n)
    cut, run = 1, n[0]
    while cut < len(paras) - 1 and run + n[cut] <= total * 0.52:
        run += n[cut]
        cut += 1
    L, R = paras[:cut], paras[cut:]

    new = ('const AFTERWORD = {\n'
           "    title: '읽고 나서',\n"
           "    emoji: '%s',\n"
           '    spreads: [\n'
           '        {\n'
           '            left: [\n%s\n            ],\n'
           '            right: [\n%s\n            ]\n'
           '        }\n'
           '    ]\n'
           '};') % (
        re.search(r"emoji: '([^']*)'", block).group(1),
        ',\n'.join('                "%s"' % esc(x) for x in L),
        ',\n'.join('                "%s"' % esc(x) for x in R))
    s = s.replace(block, new)

    # 그림을 걷어 낸다 — 두 칸 다 글이다
    s = re.sub(r'\n *// 그림은 오른쪽 위 모서리에.*?\n *const art = .*?;\n', '\n', s, flags=re.S)
    s = s.replace('<div class="after-col after-col-right${spread.art ? \' after-col-image\' : \'\'}">\n                ${art}\n',
                  '<div class="after-col after-col-right">\n')

    # 「이야기를 다 읽고」 쪽을 걷어 낸다 — 교훈은 읽고 나서로 옮겨 갔다
    s = re.sub(r'\n *\{ kind: \'reflection\'[^\n]*\n', '\n', s)
    s = re.sub(r"\n *case 'reflection':\n *return reflectionPage\(page\.chapter\);", '', s)
    s = re.sub(r'\nfunction reflectionPage\(chapter\) \{.*?\n\}\n', '\n', s, flags=re.S)

    for gone in ['reflection', 'after-art', 'after-col-image', 'spread.art']:
        if gone in s:
            sys.exit('%s 가 아직 남아 있다: %s' % (gone, slug))
    if "{ kind: 'end' }" not in s:
        sys.exit('끝 쪽이 사라졌다: ' + slug)

    io.open(p, 'wb').write((s.replace('\n', '\r\n') if crlf else s).encode('utf-8'))
    return len(L), len(R), sum(len(re.sub(r'\s', '', x)) for x in L), sum(len(re.sub(r'\s', '', x)) for x in R)


def main():
    spec = json.load(io.open(sys.argv[1], encoding='utf-8'))
    over = []
    for slug in sorted(spec):
        l, r, ln, rn = one(slug, spec[slug])
        flag = ''
        if ln > 285 or rn > 285:
            flag = '  ← 넘칠 수 있음'
            over.append(slug)
        print('%-24s 왼 %d문단 %3d자 · 오른 %d문단 %3d자%s' % (slug, l, ln, r, rn, flag))
    if over:
        print('넘칠 수 있는 책:', ' '.join(over))


main()
