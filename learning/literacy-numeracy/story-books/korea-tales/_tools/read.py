# -*- coding: utf-8 -*-
"""한 책의 본문을 펼침면 단위로, 왼쪽·오른쪽을 이어서 보여 준다.

줄거리를 따라가며 읽으면 머릿속에서 메워 읽게 되어 앞뒤 모순이 안 보인다.
그래서 **문장에 번호를 매겨** 한 줄씩 끊어 보이게 한다.
"""
import io, re, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
Q = chr(34); B = chr(92)
STR = Q + '((?:[^' + Q + B + B + ']|' + B + B + '.)*)' + Q

b = sys.argv[1]
js = io.open(b + '/app.js', encoding='utf-8').read()
if 'function artFrame' not in js:
    sys.exit('소설틀')
head = js[:js.index('function artFrame')]
blocks = re.split('art:' + B + 's*' + Q + '([' + B + 'w' + B + '-]+)' + B + '.' + B + 'w+' + Q, head)
n = 0
for i in range(1, len(blocks), 2):
    n += 1
    print('\n[%d] %s' % (n, blocks[i]))
    body = blocks[i+1]
    k = 0
    for lab, pat in (('L', r'left:\s*\[(.*?)\]'), ('R', r'right:\s*\[(.*?)\]')):
        m = re.search(pat, body, re.S)
        if not m:
            continue
        for x in re.findall(STR, m.group(1)):
            k += 1
            print('  %s%-2d %s' % (lab, k, x.replace(B + Q, Q)))
