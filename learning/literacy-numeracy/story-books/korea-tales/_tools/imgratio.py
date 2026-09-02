# -*- coding: utf-8 -*-
"""그림 파일의 실제 가로세로 비율을 잰다.

주문서에는 본문 그림을 가로 2:1로 그려 달라고 적어 두었다.
그림칸이 2.14:1이라 2:1이면 6%만 잘리는데, 16:9로 오면 16%가 잘려 나간다.
정말 2:1로 왔는지 파일에서 직접 잰다.

쓰는 법
    python _tools/imgratio.py            62권 전부
    python _tools/imgratio.py tokkijeon
"""
import io
import os
import struct
import sys

BOOKS = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def webp_size(path):
    """webp 파일에서 가로세로를 꺼낸다. VP8 / VP8L / VP8X 세 가지."""
    with open(path, 'rb') as f:
        head = f.read(32)
    if head[:4] != b'RIFF' or head[8:12] != b'WEBP':
        return None
    tag = head[12:16]
    if tag == b'VP8X':
        w = head[24] | (head[25] << 8) | (head[26] << 16)
        h = head[27] | (head[28] << 8) | (head[29] << 16)
        return w + 1, h + 1
    if tag == b'VP8 ':
        # 20~22 바이트가 sync code 9d 01 2a, 그 뒤 2바이트씩
        if head[23:26] != b'\x9d\x01\x2a':
            return None
        w, h = struct.unpack('<HH', head[26:30])
        return w & 0x3fff, h & 0x3fff
    if tag == b'VP8L':
        if head[20] != 0x2f:
            return None
        b = struct.unpack('<I', head[21:25])[0]
        return (b & 0x3fff) + 1, ((b >> 14) & 0x3fff) + 1
    return None


def main():
    names = sys.argv[1:] or sorted(
        d for d in os.listdir(BOOKS)
        if os.path.isdir(os.path.join(BOOKS, d)) and not d.startswith('_')
    )
    tally = {}
    bad = []
    total = 0
    for book in names:
        d = os.path.join(BOOKS, book, 'images')
        if not os.path.isdir(d):
            continue
        for f in sorted(os.listdir(d)):
            if not f.lower().endswith('.webp'):
                continue
            size = webp_size(os.path.join(d, f))
            if size is None:
                bad.append('%s/%s 읽지 못함' % (book, f))
                continue
            w, h = size
            total += 1
            r = round(w / float(h), 2)
            key = '%dx%d (%.2f:1)' % (w, h, r)
            tally.setdefault(key, []).append('%s/%s' % (book, f))

    print('그림 %d장' % total)
    print('')
    for key in sorted(tally, key=lambda k: -len(tally[k])):
        files = tally[key]
        print('%-22s %4d장   %s%s' % (key, len(files), files[0],
                                      '' if len(files) == 1 else ' …'))
    for line in bad:
        print('  ' + line)
    return 0


if __name__ == '__main__':
    sys.exit(main())
