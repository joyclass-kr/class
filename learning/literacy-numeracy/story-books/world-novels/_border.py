# -*- coding: utf-8 -*-
"""그림 가장자리의 흰 테두리를 찾고, 시키면 잘라낸다.

    python _border.py          찾기만 한다
    python _border.py 자르기    찾은 것을 잘라낸다 (되돌리려면 git checkout)

가려내는 눈금은 「네 변 가운데 셋 이상이 한 가지 밝은 색으로 둘려 있고,
그 띠가 짧은 변의 10%보다 얇을 것」이다. 밝은 하늘이나 눈 덮인 들판은
한쪽 변에만 나타나므로 걸리지 않는다.
"""
import glob
import os
import sys

from PIL import Image, ImageChops

CUT = len(sys.argv) > 1 and sys.argv[1] in ("자르기", "cut")
ROOT = os.path.dirname(os.path.abspath(__file__))


def box(im, tol=20):
    """네 모서리 색을 차례로 바탕 삼아, 벗겨 낼 수 있는 띠를 찾는다."""
    w, h = im.size
    for corner in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
        bg = Image.new("RGB", im.size, im.getpixel(corner))
        d = ImageChops.difference(im, bg).convert("L").point(lambda v: 0 if v <= tol else 255)
        bb = d.getbbox()
        if not bb:
            continue
        left, top, right, bottom = bb
        cut = (top, h - bottom, left, w - right)
        if sum(1 for c in cut if c >= 3) >= 3 and max(cut) < min(w, h) * 0.1:
            return bb, cut
    return None, None


def frame_line(im):
    """손그림처럼 종이 여백이 고르지 않으면, 안쪽 검은 테두리선까지 잘라낸다."""
    w, h = im.size
    px = im.load()

    def median(line):
        v = sorted(sum(c) / 3 for c in line)
        return v[len(v) // 2]

    def walk(side):
        for k in range(min(w, h) // 6):
            if side == "top":
                line = [px[x, k] for x in range(w // 5, w * 4 // 5, 2)]
            elif side == "bot":
                line = [px[x, h - 1 - k] for x in range(w // 5, w * 4 // 5, 2)]
            elif side == "left":
                line = [px[k, y] for y in range(h // 5, h * 4 // 5, 2)]
            else:
                line = [px[w - 1 - k, y] for y in range(h // 5, h * 4 // 5, 2)]
            if median(line) < 150:
                return k
        return 0

    return walk("top"), walk("bot"), walk("left"), walk("right")


found = 0
for f in sorted(glob.glob(os.path.join(ROOT, "*", "images", "*.webp"))):
    im = Image.open(f).convert("RGB")
    w, h = im.size
    bb, cut = box(im)
    if not bb:
        continue
    found += 1
    name = os.path.relpath(f, ROOT).replace("\\", "/")
    print("%-44s 위%d 아래%d 왼%d 오%d" % (name, cut[0], cut[1], cut[2], cut[3]))
    if not CUT:
        continue
    t, b, l, r = frame_line(im)
    im2 = im.crop((l, t, w - r, h - b)) if min(t, b, l, r) >= 1 else im.crop(bb)
    im2.save(f, "WEBP", quality=92, method=6)
    print("    %dx%d → %dx%d" % (w, h, im2.size[0], im2.size[1]))

print()
print("테두리 있는 그림 %d장%s" % (found, " (잘라냄)" if CUT else ""))
