# -*- coding: utf-8 -*-
"""그림을 한 장에 모아 붙인다. 글씨가 박혔는지, 테두리가 있는지 한눈에 보려고 만들었다.

    python _sheet.py                     새로 들어온 그림 스무 장
    python _sheet.py fifteen             한 책 전부
    python _sheet.py fifteen 6           한 책을 여섯 장씩 끊어서

그림에 박힌 글씨는 대개 큼직해서 이만한 크기로도 바로 보인다.
자동으로 걸러내는 방법을 써 봤지만 수채화의 잔붓질을 글씨로 잘못 보아 그만두었다.
"""
import glob
import os
import sys

from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.environ.get("TEMP", ROOT)
COLS, CW, CH, PAD = 3, 620, 480, 20

arg = sys.argv[1] if len(sys.argv) > 1 else None
per = int(sys.argv[2]) if len(sys.argv) > 2 else 12

if arg and os.path.isdir(os.path.join(ROOT, arg)):
    files = sorted(glob.glob(os.path.join(ROOT, arg, "images", "*.webp")))
    tag = arg
else:
    files = sorted(glob.glob(os.path.join(ROOT, "*", "images", "*.webp")),
                   key=os.path.getmtime, reverse=True)[:int(arg or 20)]
    files.reverse()
    tag = "new"

if not files:
    print("그림이 없다")
    raise SystemExit

for page in range((len(files) + per - 1) // per):
    part = files[page * per:(page + 1) * per]
    rows = (len(part) + COLS - 1) // COLS
    sheet = Image.new("RGB", (COLS * (CW + PAD) + PAD, rows * (CH + PAD) + PAD), (250, 248, 244))
    d = ImageDraw.Draw(sheet)
    for i, f in enumerate(part):
        im = Image.open(f).convert("RGB")
        im.thumbnail((CW, CH - 18))
        x = PAD + (i % COLS) * (CW + PAD)
        y = PAD + (i // COLS) * (CH + PAD)
        sheet.paste(im, (x, y + 18))
        name = os.path.relpath(f, ROOT).replace("\\", "/").replace("/images/", " ")
        d.text((x + 2, y + 3), name, fill=(40, 30, 20))
    out = os.path.join(OUT, "sheet-%s-%d.png" % (tag, page + 1))
    sheet.save(out)
    print("%s  (%d장)" % (out, len(part)))
