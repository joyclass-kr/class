# -*- coding: utf-8 -*-
"""책 틀이 바뀌어 그림칸이 넓어졌다. 프롬프트 문서의 비율 안내를 고친다.

    python tools-fix-ratio-doc.py

옛 틀은 그림칸이 1.92:1이라 16:9 그림이 3.5%만 잘렸다. 확정 규격(4:3 책 +
그림칸 62.5%)에서는 칸이 2.14:1이 되어 16:9 그림은 위아래가 16%나 잘린다.
그래서 앞으로 만들 그림은 2:1로 부탁해야 한다. 명작동화 쪽은 이미 2:1이다.
"""
import io, os, re

BOOKS = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # _tools/ 위가 책 폴더

OLD_ROW = u'| 본문 그림 10장 (`01`~`10`) | 1.92 : 1 | **가로 16 : 세로 9** |'
OLD_NOTE = (u'제미나이는 가로 그림을 1376×768(16:9)로 내보냅니다. 칸이 1.92:1이라 '
            u'위아래가 3.5퍼센트쯤 잘리는데 눈에 띄지 않는 정도예요.')
NEW_NOTE = (u'그림칸은 **2.14 : 1**이라 아주 길쭉합니다. 제미나이가 기본으로 내보내는 '
            u'16:9는 위아래가 십육 퍼센트쯤 잘려 나가니, **가로 2 : 세로 1**로 만들어 '
            u'달라고 적어 주세요. 그러면 잘리는 것이 육 퍼센트로 줄어듭니다. '
            u'4:3으로 만들면 삼십 퍼센트가 넘게 잘리니 그것만은 꼭 피하세요.')

n = 0
for slug in sorted(os.listdir(BOOKS)):
    p = os.path.join(BOOKS, slug, 'IMAGE-PROMPTS.md')
    if not os.path.isfile(p):
        continue
    s = io.open(p, encoding='utf-8').read()
    o = s
    # 표의 비율 칸
    s = re.sub(r'\| 본문 그림 \d+장 \(`01`~`\d+`\) \| 1\.92 : 1 \| \*\*가로 16 : 세로 9\*\* \|',
               lambda m: m.group(0).replace(u'1.92 : 1', u'2.14 : 1')
                                   .replace(u'**가로 16 : 세로 9**', u'**가로 2 : 세로 1**'), s)
    s = s.replace(u'| 마지막 `end.png` | 1.76 : 1 | **가로 16 : 세로 9** |',
                  u'| 마지막 `end.png` | 2.14 : 1 | **가로 2 : 세로 1** |')
    s = s.replace(OLD_NOTE, NEW_NOTE)
    # 소제목
    s = s.replace(u'## 본문 열 장 (모두 가로 16:9)', u'## 본문 열 장 (모두 가로 2:1)')
    s = re.sub(r'## 본문 (\S+) 장 \(모두 가로 16:9\)', u'## 본문 \1 장 (모두 가로 2:1)', s)
    s = s.replace(u'## 마지막 — `end.png` (가로 16:9)', u'## 마지막 — `end.png` (가로 2:1)')
    if s != o:
        io.open(p, 'w', encoding='utf-8').write(s)
        n += 1
print(u'고친 프롬프트 문서 %d개' % n)
