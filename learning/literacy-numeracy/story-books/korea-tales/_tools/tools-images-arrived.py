# -*- coding: utf-8 -*-
"""그림이 도착했을 때 한 번만 돌리면 되는 도구.

    python tools-images-arrived.py [slug ...]

하는 일 세 가지
1. 이름만 webp인 것을 진짜 webp로 바꾼다 (품질 82)
2. app.js가 부르는 파일 이름을 실제로 있는 확장자에 맞춘다
3. 그림 비율이 틀에서 벗어난 것을 일러 준다

그림을 저장하는 쪽이 png와 webp를 같은 JPEG 내용으로 둘 다 써 내기 때문에,
새 그림이 올 때마다 이름만 webp인 가짜가 하나씩 는다. 판별은 첫 네 바이트로
한다 — 진짜 webp는 RIFF(52494646), JPEG는 ffd8ffe0으로 시작한다.
"""
import io, os, re, struct, subprocess, sys

# 윈도 콘솔이 cp949라 줄표(—) 같은 글자에서 죽는다. 나가는 글을 utf-8로 돌려 둔다.
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

BOOKS = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # _tools/ 위가 책 폴더
FFMPEG = (r'C:\Users\A\AppData\Local\Microsoft\WinGet\Packages'
          r'\Gyan.FFmpeg.Shared_Microsoft.Winget.Source_8wekyb3d8bbwe'
          r'\ffmpeg-8.1.2-full_build-shared\bin\ffmpeg.exe')

# 틀이 요구하는 비율. 벗어나면 object-fit이 잘라 낸다.
# 동화틀과 소설틀은 그림칸 모양이 다르다. 재서 확인한 값이다.
#   동화틀 펼침면 그림칸  471x220 = 2.14:1   (.spread-art, flex 62.5%)
#   소설틀 쪽 위 그림칸   471x353 = 1.33:1   (.story-art-top)
# 소설틀 그림에 동화틀 값을 대면 멀쩡한 그림 열아홉 장이 잘못됐다고 나온다.
WANT = {'cover': (0.667, 0.10), 'end': (1.78, 0.18)}
# 동화틀 그림은 대부분 1.79:1(16:9)로 나와 있다. 2.14:1 틀에서 위아래가 16% 잘리지만,
# 잘라 놓고 보니 하늘과 앞쪽 땅만 줄어들 뿐 얼굴도 구도도 멀쩡해서 그대로 두기로 했다
# (2026-08-24). 그래서 허용 폭을 0.40으로 넓혀 둔다. 이보다 더 벗어나면 진짜 문제다.
SPREAD_PIC = (2.14, 0.40)     # 동화틀
SPREAD_NOVEL = (1.33, 0.12)   # 소설틀


def is_real_webp(p):
    with open(p, 'rb') as f:
        return f.read(4) == b'RIFF'


def size_of(p):
    """webp/jpeg/png의 가로세로를 읽는다."""
    with open(p, 'rb') as f:
        d = f.read(32)
    if d[:4] == b'RIFF' and d[8:12] == b'WEBP':
        if d[12:16] == b'VP8X':
            w = int.from_bytes(d[24:27], 'little') + 1
            h = int.from_bytes(d[27:30], 'little') + 1
            return w, h
        if d[12:16] == b'VP8 ':
            w = struct.unpack('<H', d[26:28])[0] & 0x3fff
            h = struct.unpack('<H', d[28:30])[0] & 0x3fff
            return w, h
        if d[12:16] == b'VP8L':
            b = int.from_bytes(d[21:25], 'little')
            return (b & 0x3fff) + 1, ((b >> 14) & 0x3fff) + 1
    if d[:2] == b'\xff\xd8':
        with open(p, 'rb') as f:
            f.read(2)
            while True:
                m = f.read(2)
                if len(m) < 2 or m[0] != 0xff:
                    return None
                ln = struct.unpack('>H', f.read(2))[0]
                if m[1] in (0xc0, 0xc1, 0xc2):
                    f.read(1)
                    h, w = struct.unpack('>HH', f.read(4))
                    return w, h
                f.seek(ln - 2, 1)
    return None


targets = sys.argv[1:] or sorted(n for n in os.listdir(BOOKS)
                                 if os.path.isdir(os.path.join(BOOKS, n, 'images')))
conv = saved = 0
ratio_warn = []
for slug in targets:
    d = os.path.join(BOOKS, slug, 'images')
    if not os.path.isdir(d):
        continue
    names = sorted(os.listdir(d))
    for name in names:
        p = os.path.join(d, name)
        if name.endswith('.webp') and not is_real_webp(p):
            before = os.path.getsize(p)
            tmp = p + '.t.webp'
            r = subprocess.run([FFMPEG, '-y', '-loglevel', 'error', '-i', p,
                                '-c:v', 'libwebp', '-quality', '82', tmp])
            if r.returncode == 0 and os.path.exists(tmp):
                os.replace(tmp, p)
                conv += 1
                saved += before - os.path.getsize(p)
        if name.endswith('.webp'):
            wh = size_of(p)
            if wh and wh[1]:
                stem = os.path.splitext(name)[0]
                # 소설틀 책은 그림 이름이 story-로 시작한다. 그 책은 표지 말고
                # 마지막 쪽까지 그림칸이 1.33:1이라, end에도 소설틀 값을 써야 한다.
                novel = any(f.startswith('story-') for f in names)
                base = SPREAD_NOVEL if novel else SPREAD_PIC
                if stem == 'cover':
                    want, tol = WANT['cover']
                elif stem == 'end':
                    want, tol = base if novel else WANT['end']
                else:
                    want, tol = base
                got = wh[0] / float(wh[1])
                if abs(got - want) > tol:
                    ratio_warn.append(u'%s/%s %dx%d = %.2f:1 (바라는 %.2f:1)'
                                      % (slug, name, wh[0], wh[1], got, want))

print(u'진짜 webp로 바꾼 그림 %d장, %.1fMB 줄임' % (conv, saved / 1024.0 / 1024))
if ratio_warn:
    print(u'\n비율이 틀에서 벗어난 그림 %d장 — object-fit이 잘라 냅니다' % len(ratio_warn))
    for w in ratio_warn[:20]:
        print(u'  ' + w)
print()
subprocess.run([sys.executable, os.path.join(BOOKS, 'tools-sync-image-ext.py')] + targets)
