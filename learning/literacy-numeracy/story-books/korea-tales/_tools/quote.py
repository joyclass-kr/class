# -*- coding: utf-8 -*-
# 큰따옴표 안에 서술 문장이 들어간 곳을 찾는다
import io, os, re

MARK = ['기색', '목소리가', '얼굴이', '손이', '눈이', '표정', '말했습니다', '물었습니다',
        '했습니다', '보았습니다', '없었습니다', '있었습니다', '되었습니다', '주었습니다']
END = re.compile(r'(습니다|었어요|았어요|지요|답니다|였어요|해요)\.\s')

n = 0
for b in sorted(os.listdir('.')):
    f = b + '/app.js'
    if not os.path.isfile(f):
        continue
    src = io.open(f, encoding='utf-8').read().replace('\\"', '\x01')
    # 문자열 리터럴 안의 \" ... \" 짝
    for m in re.finditer(r'\x01([^\x01]{6,})\x01', src):
        q = m.group(1)
        if not END.search(q):
            continue
        # 마지막 문장이 아니라 중간에 서술이 끼어 있는가
        parts = [p for p in re.split(r'(?<=[.!?…])\s+', q) if p.strip()]
        if len(parts) < 2:
            continue
        for p in parts[:-1] + parts[1:]:
            if any(w in p for w in MARK) and p.endswith('습니다.'):
                print('%s\n    %s' % (b, q[:110]))
                n += 1
                break
print('=== %d' % n)
