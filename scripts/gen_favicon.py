from PIL import Image, ImageDraw

S = 4  # supersample factor
SIZE = 512 * S
im = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
d = ImageDraw.Draw(im)

ORANGE = (238, 103, 14, 255)
NAVY = (24, 33, 56, 255)
YELLOW = (250, 193, 40, 255)
BLUE_L = (66, 121, 186, 255)
BLUE_D = (42, 90, 150, 255)

def s(v):
    return v * S

# background, full bleed square
d.rectangle([0, 0, SIZE, SIZE], fill=ORANGE)

cx, cy = s(256), s(300)
face_r = s(158)
stroke = s(11)

# face
d.ellipse([cx - face_r, cy - face_r, cx + face_r, cy + face_r],
          fill=YELLOW, outline=NAVY, width=stroke)

# eyes
eye_r = s(20)
for ex in (cx - s(62), cx + s(62)):
    ey = cy - s(28)
    d.ellipse([ex - eye_r, ey - eye_r, ex + eye_r, ey + eye_r], fill=NAVY)

# smile
mouth_box = [cx - s(96), cy - s(6), cx + s(96), cy + s(118)]
mouth_w = s(15)
d.arc(mouth_box, start=15, end=165, fill=NAVY, width=mouth_w)
# round the caps of the smile stroke
for ang, rad_off in ((15, 1), (165, 1)):
    import math
    a = math.radians(ang)
    rx = (mouth_box[2] - mouth_box[0]) / 2
    ry = (mouth_box[3] - mouth_box[1]) / 2
    mx = (mouth_box[0] + mouth_box[2]) / 2
    my = (mouth_box[1] + mouth_box[3]) / 2
    px = mx + rx * math.cos(a)
    py = my + ry * math.sin(a)
    r = mouth_w / 2
    d.ellipse([px - r, py - r, px + r, py + r], fill=NAVY)

# ---- graduation cap ----
band_top = cy - face_r - s(58)
band_bot = cy - face_r + s(46)
band_l = cx - s(120)
band_r = cx + s(120)
d.rounded_rectangle([band_l, band_top, band_r, band_bot], radius=s(26),
                     fill=BLUE_L, outline=NAVY, width=stroke)

dcx, dcy = cx, band_top - s(6)
dw, dh = s(190), s(72)
top = (dcx, dcy - dh)
right = (dcx + dw, dcy)
bottom = (dcx, dcy + dh)
left = (dcx - dw, dcy)

# two shaded halves for a subtle 3D fold
d.polygon([top, left, bottom], fill=BLUE_L)
d.polygon([top, right, bottom], fill=BLUE_D)
d.polygon([top, right, bottom, left], outline=NAVY, width=stroke)
d.line([left, right], fill=NAVY, width=s(4))

# button
btn_r = s(11)
d.ellipse([dcx - btn_r, dcy - btn_r, dcx + btn_r, dcy + btn_r], fill=NAVY)

# tassel cord: hugs the right slope of the cap, drapes down beside the band
cord = [(dcx, dcy), (dcx + s(74), dcy + s(17)), (dcx + s(124), dcy + s(72)),
        (dcx + s(124), dcy + s(112))]
cord_w = s(10)
d.line(cord, fill=YELLOW, width=cord_w, joint="curve")
r0 = cord_w / 2
d.ellipse([cord[0][0] - r0, cord[0][1] - r0, cord[0][0] + r0, cord[0][1] + r0], fill=YELLOW)
# tuft knot
knot = cord[-1]
kr = s(15)
d.ellipse([knot[0] - kr, knot[1] - kr, knot[0] + kr, knot[1] + kr], fill=YELLOW)

# downscale with high quality
import os
out_dir = r"C:\Users\A\AppData\Local\Temp\claude\E--webprojects-class\57dbcf68-1562-45e9-9e7e-25266c745e26\scratchpad"
os.makedirs(out_dir, exist_ok=True)
master = im.resize((512, 512), Image.LANCZOS)
master.save(os.path.join(out_dir, "favicon_preview.png"))
master.save(os.path.join(out_dir, "favicon_preview.ico"),
            sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
print("done")
