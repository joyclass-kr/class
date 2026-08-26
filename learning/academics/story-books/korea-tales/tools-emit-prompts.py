# -*- coding: utf-8 -*-
"""그림 프롬프트 문서를 찍어 낸다.

    python emit_prompts.py <설정파일.py>

설정 파일이 갖출 것:
    SLUG, TITLE, KIND('novel' | 'picture'), STYLE, CAST,
    COVER  = (한글 설명, 영문 프롬프트)
    IMAGES = [(파일명, 한글 설명, 영문 프롬프트), ...]
    END    = (한글 설명, 영문 프롬프트)
"""
import io, os, sys, importlib.util

BOOKS = r'E:\webprojects\class\learning\academics\story-books\korea-tales'

HEAD_NOVEL = u"""# 제미나이 그림 프롬프트 — {title}

**소설 틀**이에요. 그림이 있는 펼침면은 오른쪽 쪽 **위쪽**에 그림이 가로로 꽉 차게 들어가고,
그 아래 남는 자리를 글이 채웁니다. 그림이 쪽을 통째로 먹지 않아요.

{chapters}장이고 장마다 그림이 {per}장씩, 여기에 표지와 마지막 장을 더해 모두 **{total}장**입니다.

프롬프트를 제미나이에 그대로 넣어 만든 뒤, 파일명을 정확히 맞춰 `images/` 폴더에 넣으면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

## 비율

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 {body}장 | 1.33 : 1 | **가로 4 : 세로 3** |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** (세로로 긴 그림) |
| 마지막 `end.webp` | 1.33 : 1 | **가로 4 : 세로 3** |

표지 칸은 책을 펼쳤을 때 왼쪽 반쪽을 통째로 채우는 세로 칸이에요. 가로 그림을 넣으면 양옆이 절반 가까이 잘려 나갑니다.
"""

HEAD_PICTURE = u"""# 제미나이 그림 프롬프트 — {title}

파랑새·삼년 고개와 같은 **그림책 틀**이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고,
아래쪽 띠에 글이 좌우로 나뉘어 들어갑니다.

이야기는 **{body}개의 펼침**이고, 여기에 표지와 마지막 장을 더해 그림은 모두 **{total}장**입니다.

프롬프트를 제미나이에 그대로 넣어 만든 뒤, 파일명을 정확히 맞춰 `images/` 폴더에 넣으면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

## 비율이 그림마다 다릅니다 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 {body}장 | 1.92 : 1 | **가로 16 : 세로 9** |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** (세로로 긴 그림) |
| 마지막 `end.webp` | 1.76 : 1 | **가로 16 : 세로 9** |

제미나이는 가로 그림을 1376×768(16:9)로 내보냅니다. 칸이 1.92:1이라 위아래가 3.5퍼센트쯤 잘리는데
눈에 띄지 않는 정도예요. 4:3으로 만들면 위아래가 삼십 퍼센트쯤 잘려나가니 그것만 피하세요.
인물을 가운데에 몰지 말고 좌우로 나눠 배치하면 훨씬 자연스럽습니다.
"""


def build(cfg):
    body = len(cfg.IMAGES)
    total = body + 2
    if cfg.KIND == 'novel':
        chapters = len(set(n.split('-')[1] for n, _, _ in cfg.IMAGES))
        head = HEAD_NOVEL.format(title=cfg.TITLE, chapters=chapters,
                                 per=body // chapters, total=total, body=body)
        ratio_body, ratio_end = u'가로 4:3', u'가로 4:3'
    else:
        head = HEAD_PICTURE.format(title=cfg.TITLE, body=body, total=total)
        ratio_body, ratio_end = u'가로 16:9', u'가로 16:9'

    out = [head]
    out.append(u'\n## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 쓰세요)\n\n```\n%s\n```\n'
               % cfg.STYLE.strip())
    out.append(u'\n## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)\n\n```\n%s\n```\n'
               % cfg.CAST.strip())
    out.append(u'\n---\n')

    ko, en = cfg.COVER
    out.append(u'\n## 표지 — `cover.webp` (세로 2:3)\n\n%s\n\n```\n%s\n```\n' % (ko, en.strip()))

    out.append(u'\n## 본문 %d장 (모두 %s)\n' % (body, ratio_body))
    for name, ko, en in cfg.IMAGES:
        out.append(u'\n### `%s` — %s\n\n```\n%s\n```\n' % (name, ko, en.strip()))

    ko, en = cfg.END
    out.append(u'\n---\n\n## 마지막 장 — `end.webp` (%s)\n\n%s\n\n```\n%s\n```\n'
               % (ratio_end, ko, en.strip()))

    p = os.path.join(BOOKS, cfg.SLUG, 'IMAGE-PROMPTS.md')
    io.open(p, 'w', encoding='utf-8').write(u''.join(out))
    print(u'  %-20s %s — 그림 %d장' % (cfg.SLUG, cfg.TITLE, total))


def load(path):
    spec = importlib.util.spec_from_file_location('cfg', path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


if __name__ == '__main__':
    for a in sys.argv[1:]:
        build(load(a))
