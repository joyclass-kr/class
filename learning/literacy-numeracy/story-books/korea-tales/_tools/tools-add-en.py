# -*- coding: utf-8 -*-
"""그림책 한 권에 영어판(EN)을 붙인다.

영어 원고는 따로 쓴 파일에 담아 두고 이 도구로 끼워 넣는다. 끼우기 전에
우리말 원고와 짝이 맞는지 먼저 본다 — 장 수·펼침 수·그림 파일 이름·문항 수가
어긋나면 붙이지 않는다. 이것을 안 보면 영어 쪽만 한 펼침 모자라는 책이 생긴다.

쓰는 법: python _tools/tools-add-en.py <책이름> <영어원고.js>
        python _tools/tools-add-en.py --check <책이름>     (이미 붙은 것만 검사)
"""
import io, json, os, re, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
R = lambda p: io.open(p, encoding='utf-8').read()
W = lambda p, s: io.open(p, 'w', encoding='utf-8', newline='\n').write(s)

EN_NOTE = ('/* 영어판 — 줄 단위 번역이 아니라 영어로 다시 썼다.\n'
           '   읽기를 앞세운다. 줄임말을 쓰고, 옛 관용구는 쉬운 말로 바꾼다.\n'
           '   왼쪽·오른쪽 나눔은 영어 길이에 맞춰 따로 잡았다. */\n')


def block(s, start, end):
    i = s.find(start)
    if i < 0:
        return None
    j = s.find(end, i)
    return s[i:j + len(end)].rstrip('\n')


def read_js(src, name):
    """app.js 조각을 node 로 읽어 자료로 돌려준다."""
    fd, path = tempfile.mkstemp(suffix='.mjs', text=True)
    os.close(fd)
    W(path, src + '\nprocess.stdout.write(JSON.stringify(%s));\n' % name)
    try:
        out = subprocess.run(['node', path], capture_output=True, text=True, encoding='utf-8')
        if out.returncode:
            raise SystemExit('%s 를 읽지 못했다:\n%s' % (name, out.stderr.strip()[:800]))
        return json.loads(out.stdout)
    finally:
        os.unlink(path)


def compare(ko_ch, ko_quiz, en):
    """우리말과 영어가 같은 뼈대인지 본다. 어긋난 것을 모두 모아 돌려준다."""
    bad = []
    if len(en.get('chapters', [])) != len(ko_ch):
        bad.append('장 수 %d ↔ %d' % (len(ko_ch), len(en.get('chapters', []))))
    for i, (k, e) in enumerate(zip(ko_ch, en.get('chapters', [])), 1):
        if len(k['beats']) != len(e.get('beats', [])):
            bad.append('%d장 펼침 %d ↔ %d' % (i, len(k['beats']), len(e.get('beats', []))))
            continue
        for j, (kb, eb) in enumerate(zip(k['beats'], e['beats']), 1):
            if kb['art'] != eb.get('art'):
                bad.append('%d장 %d펼침 그림 %s ↔ %s' % (i, j, kb['art'], eb.get('art')))
            if kb.get('emoji') != eb.get('emoji'):
                bad.append('%d장 %d펼침 이모지 다름' % (i, j))
            for side in ('left', 'right'):
                if not eb.get(side):
                    bad.append('%d장 %d펼침 %s 쪽이 비었다' % (i, j, side))
    eq = en.get('quiz', [])
    if len(eq) != len(ko_quiz):
        bad.append('문항 수 %d ↔ %d' % (len(ko_quiz), len(eq)))
    for i, (k, e) in enumerate(zip(ko_quiz, eq), 1):
        if len(k['choices']) != len(e.get('choices', [])):
            bad.append('%d번 보기 수 다름' % i)
        if k['answer'] != e.get('answer'):
            bad.append('%d번 정답 자리 %d ↔ %s' % (i, k['answer'], e.get('answer')))
        if bool(k.get('wide')) != bool(e.get('wide')):
            bad.append('%d번 wide 다름' % i)
    # 단어장 열쇠는 그림 파일 이름이어야 뜬다
    arts = [b['art'] for c in ko_ch for b in c['beats']]
    for key in en.get('words', {}):
        if key not in arts and key not in ('cover', 'after'):
            bad.append('단어장 열쇠 「%s」 는 어느 쪽도 아니다' % key)
    return bad


def main():
    os.chdir(os.path.dirname(HERE))
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    check = '--check' in sys.argv
    book = args[0]
    app = R(book + '/app.js')
    ko_ch = read_js(block(app, 'const CHAPTERS = [', '\n];\n'), 'CHAPTERS')
    ko_quiz = read_js(block(app, 'const QUIZ = [', '\n];\n'), 'QUIZ')

    if check:
        en_src = block(app, 'const EN = {', '\n};\n')
        if not en_src:
            raise SystemExit('%s: 영어판이 없다' % book)
    else:
        en_src = R(args[1]).strip()
        assert en_src.startswith('const EN = {'), '영어 원고는 const EN = { 로 시작해야 한다'

    en = read_js(en_src, 'EN')
    bad = compare(ko_ch, ko_quiz, en)
    if bad:
        print('%s — 우리말과 어긋난 곳 %d' % (book, len(bad)))
        for b in bad:
            print('   ' + b)
        sys.exit(1)

    words = sum(len(v) for v in en.get('words', {}).values())
    story = sum(len((p if isinstance(p, str) else p['t']).split())
                for c in en['chapters'] for b in c['beats'] for p in b['left'] + b['right'])
    if not check:
        old = block(app, '/* 영어판', '\n};\n') or block(app, 'const EN = {', '\n};\n')
        new = EN_NOTE + en_src
        if old:
            app = app.replace(old, new)
        else:
            anchor = '\nconst QUIZ = [' if '\nconst QUIZ = [' in app else None
            assert anchor, '%s: QUIZ 자리를 못 찾음' % book
            app = app.replace(anchor, '\n' + new + '\n' + anchor, 1)
        W(book + '/app.js', app)
    print('%s  이야기 %d낱말 · 단어장 %d개 · 문항 %d개%s'
          % (book, story, words, len(en['quiz']), '' if check else '  붙임'))


main()
