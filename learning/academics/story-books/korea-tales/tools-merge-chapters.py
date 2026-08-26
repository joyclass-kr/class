# -*- coding: utf-8 -*-
"""소설 설정 파일의 장을 묶어 더 긴 장으로 다시 짠다.

    python merge_chapters.py <설정파일.py> <그림장수>

장이 짧으면 그림 쪽이 강제로 늘려 놓은 빈자리 비율이 커진다. 이웃한 장을 묶어
장당 글을 늘리면 같은 빈자리가 희석된다. 글은 한 글자도 건드리지 않고 경계만 옮긴다.

병합 계획(PLANS)은 아래에 책마다 적어 둔다. 각 항목은 (새 제목, 이모지, [묶을 옛 장 번호]).
"""
import io, re, sys, importlib.util

PLANS = {
    'tokkijeon': [
        (u'용왕의 병', u'🐉', [1, 2]),
        (u'누가 뭍에 오르겠느냐', u'🐢', [3, 4]),
        (u'화상 한 장 들고 뭍으로', u'🖌️', [5, 6]),
        (u'벼슬을 준다는 말', u'✨', [7, 8]),
        (u'수궁에서 생긴 일', u'🏰', [9, 10]),
        (u'뭍에 닿은 뒤', u'🌅', [11, 12]),
    ],
    'onggojipjeon': [
        (u'옹당촌 옹고집', u'🏯', [1, 2]),
        (u'문전박대와 취암사의 밤', u'🪵', [3, 4]),
        (u'또 하나의 옹고집', u'👥', [5, 6]),
        (u'쫓겨나 빌어먹다', u'🚪', [7, 8]),
        (u'눈 위의 노승', u'❄️', [9, 10]),
        (u'짚으로 돌아가다', u'🌾', [11, 12]),
    ],
    'heungbujeon': [
        (u'쫓겨난 아우', u'🏚️', [1, 2]),
        (u'처마 밑의 제비', u'🪹', [3, 4]),
        (u'박을 타다', u'🪚', [5, 6]),
        (u'놀부의 제비', u'👀', [7, 8]),
        (u'열두 통의 박', u'😱', [9, 10]),
        (u'다시 심은 박씨', u'🌿', [11, 12]),
    ],
    'kongjwi-patjwi': [
        (u'새어머니와 검은 소', u'🐂', [1, 2]),
        (u'밑 빠진 독과 참새 떼', u'🐸', [3, 4]),
        (u'잃어버린 꽃신', u'👟', [5, 6]),
        (u'감사 댁과 연못', u'💧', [7, 8]),
        (u'붉은 연꽃', u'🪷', [9, 10]),
        (u'연못을 치다', u'⚖️', [11, 12]),
    ],
    'simcheongjeon': [
        (u'젖동냥으로 기른 딸', u'👶', [1, 2]),
        (u'공양미 삼백 석', u'🌾', [3, 4]),
        (u'뱃사람들과 거짓말', u'⛵', [5, 6]),
        (u'인당수', u'🌊', [7, 8]),
        (u'물 아래, 그리고 연꽃', u'🪷', [9, 10]),
        (u'맹인 잔치', u'👑', [11, 12]),
        (u'눈을 뜨다', u'👁️', [13, 14]),
    ],
    'honggildongjeon': [
        (u'아버지를 아버지라 부르지 못하고', u'🌙', [1, 2]),
        (u'집을 떠나던 밤', u'🚪', [3, 4]),
        (u'활빈당', u'🏳️', [5, 6]),
        (u'여덟 명의 길동', u'🎭', [7, 8]),
        (u'하루짜리 병조 판서', u'📜', [9, 10]),
        (u'율도국', u'🏝️', [11, 12]),
        (u'이름을 부르는 나라', u'🌅', [13, 14]),
    ],
}

CHUNK = re.compile(
    r'num: (\d+),\s*\n\s*title: "(.*?)",\s*\n\s*emoji: "(.*?)",\s*\n'
    r'\s*art: \[.*?\],\s*\n\s*paras: \[\n(.*?)\n        \]', re.S)


def load_cfg(path):
    spec = importlib.util.spec_from_file_location('cfg', path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def build_js(groups, art_count):
    out = [u'const CHAPTERS = [']
    for n, (title, emoji, paras) in enumerate(groups, 1):
        arts = u', '.join(u'"story-%02d-%s.webp"' % (n, chr(ord('a') + k))
                          for k in range(art_count))
        out.append(u'    {')
        out.append(u'        num: %d,' % n)
        out.append(u'        title: "%s",' % title)
        out.append(u'        emoji: "%s",' % emoji)
        out.append(u'        art: [%s],' % arts)
        out.append(u'        paras: [')
        out.append(paras)
        out.append(u'        ]')
        out.append(u'    }%s' % (u',' if n < len(groups) else u''))
    out.append(u'];')
    return u'\n'.join(out) + u'\n'


def main(path, art_count):
    cfg = load_cfg(path)
    plan = PLANS[cfg.SLUG]
    found = {int(m.group(1)): m.group(4) for m in CHUNK.finditer(cfg.CHAPTERS_JS)}
    if not found:
        raise SystemExit(u'장을 하나도 못 읽었다')

    groups = []
    used = []
    for title, emoji, nums in plan:
        parts = []
        for k in nums:
            if k not in found:
                raise SystemExit(u'%d장이 없다' % k)
            parts.append(found[k])
            used.append(k)
        groups.append((title, emoji, u',\n'.join(parts)))

    missing = sorted(set(found) - set(used))
    if missing:
        raise SystemExit(u'계획에서 빠진 장: %s' % missing)

    src = io.open(path, encoding='utf-8').read()
    head = src[:src.index(u"CHAPTERS_JS = u'''")] + u"CHAPTERS_JS = u'''"
    io.open(path, 'w', encoding='utf-8').write(
        head + build_js(groups, art_count) + u"'''\n")

    print(u'%s: %d장 -> %d장, 장당 그림 %d장 (총 %d장 + 표지 + 끝그림)'
          % (cfg.SLUG, len(found), len(groups), art_count, len(groups) * art_count))


if __name__ == '__main__':
    main(sys.argv[1], int(sys.argv[2]))
