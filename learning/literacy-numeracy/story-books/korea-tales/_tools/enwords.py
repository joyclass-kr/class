# -*- coding: utf-8 -*-
"""영어판 단어장을 검사한다.

  1. 변화형만 적고 기본형을 안 밝힌 낱말        held back a laugh → (hold back) 이 빠짐
  2. 예문이 본문에 실제로 없는 것               본문을 고치고 예문을 안 고친 경우
  3. 낱말이 하나도 없는 쪽                      표지·펼침면·읽고 나서
  4. 같은 낱말이 한 쪽에 두 번 나온 것

쓰는 법
    python _tools/enwords.py            영어판이 있는 책을 다 본다
    python _tools/enwords.py jopssal-han-tol
"""
import io, os, re, sys

BOOKS = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # _tools/ 위가 책 폴더

# 본문에 흔히 나오는 변화형. 이 꼴로 적혀 있는데 괄호가 없으면 기본형이 빠진 것이다.
FORMS = set(('held took drew shook made went ran sat stood swung drove snapped kicked tied '
             'untied scratched chased laughed turned reached called looked opened pulled '
             'carried handed sighed searched buried walked led wrapped tucked creased '
             'knocked bowed unfolded caught put began started gone eaten seen heard felt '
             'kept lost told brought found built spoke broke chose rose fell hid').split())


def strings_in(chunk):
    """그 덩어리 안의 큰따옴표 문자열을 모두 꺼낸다."""
    return [m.group(1) for m in re.finditer(r'"((?:[^"\\]|\\.)*)"', chunk)]


def block(src, key):
    """EN 안에서 key: [ ... ] 또는 key: { ... } 덩어리를 통째로 꺼낸다."""
    i = src.find('\n    %s: ' % key)
    if i < 0:
        return ''
    j = src.index(':', i) + 1
    while src[j] in ' \n':
        j += 1
    open_ch = src[j]
    close_ch = ']' if open_ch == '[' else '}'
    depth, k, in_str, esc = 0, j, False, False
    while k < len(src):
        c = src[k]
        if in_str:
            if esc:
                esc = False
            elif c == '\\':
                esc = True
            elif c == '"':
                in_str = False
        elif c == '"':
            in_str = True
        elif c == open_ch:
            depth += 1
        elif c == close_ch:
            depth -= 1
            if depth == 0:
                return src[j:k + 1]
        k += 1
    return ''


def check(book):
    p = os.path.join(BOOKS, book, 'app.js')
    if not os.path.isfile(p):
        return None
    src = io.open(p, encoding='utf-8').read()
    i = src.find('const EN = {')
    if i < 0:
        return None                      # 영어판이 아직 없는 책
    en = src[i:]

    words_src = block(en, 'words')
    if not words_src:
        return None

    # 본문 — 표지 소개글 · 각 장 · 읽고 나서. { t: "..." } 꼴도 함께 걷는다.
    body = ' '.join(strings_in(block(en, 'cover') + block(en, 'chapters') + block(en, 'afterword')))

    bad = []
    # 쪽마다 낱말 묶음을 갈라 본다
    groups = re.split(r'\n        "([A-Za-z0-9_.\-]+)": \[', words_src)
    keys = groups[1::2]
    bodies = groups[2::2]
    if not keys:
        bad.append(('읽지 못함', 'words 덩어리를 가르지 못했습니다'))
        return bad

    for key, chunk in zip(keys, bodies):
        items = re.findall(r'\{ w: "((?:[^"\\]|\\.)*)", k: "((?:[^"\\]|\\.)*)", s: "((?:[^"\\]|\\.)*)" \}', chunk)
        if not items:
            bad.append((key, '낱말이 하나도 없습니다'))
            continue
        seen = {}
        for w, k, s in items:
            # 1. 기본형 빠짐
            if '(' not in w:
                hits = [t for t in re.findall(r"[A-Za-z']+", w) if t.lower() in FORMS]
                if hits:
                    bad.append((key, '기본형 없음: %s  (%s)' % (w, ', '.join(hits))))
            # 2. 예문이 본문에 없음
            plain = s.replace('\\"', '"')
            if plain not in body.replace('\\"', '"'):
                bad.append((key, '예문이 본문에 없음: %s' % s))
            # 4. 같은 낱말 두 번
            if w in seen:
                bad.append((key, '같은 낱말이 두 번: %s' % w))
            seen[w] = 1
    return bad


def main():
    books = sys.argv[1:] or sorted(
        d for d in os.listdir(BOOKS)
        if os.path.isdir(os.path.join(BOOKS, d)) and not d.startswith('_')
    )
    total_books = 0
    total_bad = 0
    for b in books:
        bad = check(b)
        if bad is None:
            continue
        total_books += 1
        if bad:
            print('■ %s' % b)
            for key, msg in bad:
                print('   %-18s %s' % (key, msg))
            total_bad += len(bad)
    print()
    print('영어판 %d권 검사 · 걸린 곳 %d' % (total_books, total_bad))
    if total_books == 0:
        print('(영어판이 있는 책이 없습니다)')
    return 1 if total_bad else 0


if __name__ == '__main__':
    sys.exit(main())
