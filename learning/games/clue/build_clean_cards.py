import os
import math
from PIL import Image, ImageDraw, ImageFont

OUTPUT_DIR = r"E:\webprojects\class\learning\games\clue\assets\images\cards"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Card dimensions (supersampled 2x resolution: 1200 x 1600 -> resized to 600 x 800)
W, H = 1200, 1600
FINAL_W, FINAL_H = 600, 800

FONT_PATH = "C:/Windows/Fonts/malgunbd.ttf"
FONT_REGULAR = "C:/Windows/Fonts/malgun.ttf"

def get_font(size, bold=True):
    path = FONT_PATH if bold else FONT_REGULAR
    try:
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

font_category = get_font(44, bold=True)
font_title = get_font(76, bold=True)
font_tagline = get_font(36, bold=True)
font_back_title = get_font(84, bold=True)
font_back_sub = get_font(42, bold=True)

def create_gradient(w, h, color1, color2, direction="vertical"):
    img = Image.new("RGBA", (w, h))
    draw = ImageDraw.Draw(img)
    r1, g1, b1 = color1[:3]
    r2, g2, b2 = color2[:3]
    a1 = color1[3] if len(color1) > 3 else 255
    a2 = color2[3] if len(color2) > 3 else 255

    steps = h if direction == "vertical" else w
    for i in range(steps):
        ratio = i / float(steps - 1)
        r = int(r1 + (r2 - r1) * ratio)
        g = int(g1 + (g2 - g1) * ratio)
        b = int(b1 + (b2 - b1) * ratio)
        a = int(a1 + (a2 - a1) * ratio)
        if direction == "vertical":
            draw.line([(0, i), (w, i)], fill=(r, g, b, a))
        else:
            draw.line([(i, 0), (i, h)], fill=(r, g, b, a))
    return img

def draw_star(draw, cx, cy, r_outer, r_inner, num_points=5, fill=(255, 223, 0, 255), outline=None, width=1):
    points = []
    angle_step = math.pi / num_points
    for i in range(2 * num_points):
        r = r_outer if i % 2 == 0 else r_inner
        angle = i * angle_step - math.pi / 2
        x = cx + r * math.cos(angle)
        y = cy + r * math.sin(angle)
        points.append((x, y))
    draw.polygon(points, fill=fill, outline=outline, width=width)

def draw_sparkle(draw, cx, cy, radius, fill=(255, 255, 255, 230)):
    points = [
        (cx, cy - radius),
        (cx + radius * 0.25, cy - radius * 0.25),
        (cx + radius, cy),
        (cx + radius * 0.25, cy + radius * 0.25),
        (cx, cy + radius),
        (cx - radius * 0.25, cy + radius * 0.25),
        (cx - radius, cy),
        (cx - radius * 0.25, cy - radius * 0.25),
    ]
    draw.polygon(points, fill=fill)

def create_base_card(category_type, title_text, tagline_text, bg_color1, bg_color2):
    if category_type == "suspect":
        badge_bg = (233, 30, 99, 255)       # Magenta/Pink
        badge_text = "용 의 자"
        border_color = (255, 105, 180, 255)
        outer_theme = (255, 242, 246, 255)
        accent_color = (255, 64, 129, 255)
    elif category_type == "weapon":
        badge_bg = (255, 140, 0, 255)       # Orange / Amber
        badge_text = "무 기"
        border_color = (255, 184, 0, 255)
        outer_theme = (255, 248, 225, 255)
        accent_color = (255, 152, 0, 255)
    else:  # room
        badge_bg = (0, 150, 136, 255)        # Teal / Green
        badge_text = "장 소"
        border_color = (0, 206, 150, 255)
        outer_theme = (224, 247, 244, 255)
        accent_color = (0, 150, 136, 255)

    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    margin = 30
    radius = 45

    card_rect = [margin, margin, W - margin, H - margin]
    draw.rounded_rectangle(card_rect, radius=radius, fill=outer_theme, outline=border_color, width=12)

    inner_margin = margin + 18
    draw.rounded_rectangle([inner_margin, inner_margin, W - inner_margin, H - inner_margin],
                           radius=radius - 10, outline=accent_color, width=4)

    draw_star(draw, inner_margin + 25, inner_margin + 25, 18, 8, fill=(255, 215, 0, 255))
    draw_star(draw, W - inner_margin - 25, inner_margin + 25, 18, 8, fill=(255, 215, 0, 255))
    draw_star(draw, inner_margin + 25, H - inner_margin - 25, 18, 8, fill=(255, 215, 0, 255))
    draw_star(draw, W - inner_margin - 25, H - inner_margin - 25, 18, 8, fill=(255, 215, 0, 255))

    # Badge
    badge_w, badge_h = 300, 74
    badge_x = (W - badge_w) // 2
    badge_y = margin + 30
    draw.rounded_rectangle([badge_x, badge_y, badge_x + badge_w, badge_y + badge_h],
                           radius=37, fill=badge_bg, outline=(255, 255, 255, 255), width=6)

    bbox = font_category.getbbox(badge_text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((badge_x + (badge_w - tw) // 2, badge_y + (badge_h - th) // 2 - 4),
              badge_text, fill=(255, 255, 255, 255), font=font_category)

    # Title Box
    title_y = badge_y + badge_h + 24
    bbox = font_title.getbbox(title_text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (W - tw) // 2

    for dx, dy in [(-4,-4), (4,-4), (-4,4), (4,4), (0,5)]:
        draw.text((tx + dx, title_y + dy), title_text, fill=(30, 30, 50, 200), font=font_title)
    draw.text((tx, title_y), title_text, fill=(40, 44, 52, 255), font=font_title)

    draw.polygon([(tx - 40, title_y + th//2), (tx - 25, title_y + th//2 - 15), (tx - 10, title_y + th//2), (tx - 25, title_y + th//2 + 15)], fill=accent_color)
    draw.polygon([(tx + tw + 10, title_y + th//2), (tx + tw + 25, title_y + th//2 - 15), (tx + tw + 40, title_y + th//2), (tx + tw + 25, title_y + th//2 + 15)], fill=accent_color)

    # Main Frame
    frame_x1, frame_y1 = margin + 50, title_y + th + 35
    frame_x2, frame_y2 = W - margin - 50, H - margin - 150
    frame_w = frame_x2 - frame_x1
    frame_h = frame_y2 - frame_y1

    grad_img = create_gradient(frame_w, frame_h, bg_color1, bg_color2, direction="vertical")

    mask = Image.new("L", (frame_w, frame_h), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([0, 0, frame_w, frame_h], radius=32, fill=255)

    img.paste(grad_img, (frame_x1, frame_y1), mask)

    draw.rounded_rectangle([frame_x1, frame_y1, frame_x2, frame_y2], radius=32, outline=border_color, width=10)
    draw.rounded_rectangle([frame_x1 + 8, frame_y1 + 8, frame_x2 - 8, frame_y2 - 8], radius=24, outline=(255, 255, 255, 200), width=4)

    # Bottom Tagline
    tag_y = frame_y2 + 30
    tag_w, tag_h = W - (margin + 100) * 2, 70
    tag_x = (W - tag_w) // 2
    draw.rounded_rectangle([tag_x, tag_y, tag_x + tag_w, tag_y + tag_h], radius=35, fill=badge_bg, outline=(255, 255, 255, 255), width=4)

    bbox = font_tagline.getbbox(tagline_text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((tag_x + (tag_w - tw) // 2, tag_y + (tag_h - th) // 2 - 4),
              tagline_text, fill=(255, 255, 255, 255), font=font_tagline)

    return img, (frame_x1, frame_y1, frame_w, frame_h)

def save_card(img, filename):
    resized = img.resize((FINAL_W, FINAL_H), Image.Resampling.LANCZOS)
    path = os.path.join(OUTPUT_DIR, filename)
    resized.save(path, "PNG")
    print(f"Generated clean card: {filename}")

# --- 10 CARDS GENERATION ---

# 1. Dancer (무희)
def make_dancer():
    img, (fx, fy, fw, fh) = create_base_card("suspect", "무희", "무대를 사로잡는 무희", (255, 160, 122), (220, 20, 60))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Hair & Feather Headband
    draw.ellipse([cx - 180, cy - 230, cx + 180, cy + 140], fill=(180, 40, 60))
    draw.polygon([(cx - 70, cy - 180), (cx - 110, cy - 290), (cx - 20, cy - 200)], fill=(255, 215, 0))
    # Face
    draw.ellipse([cx - 130, cy - 150, cx + 130, cy + 90], fill=(255, 225, 210))
    draw.ellipse([cx - 100, cy + 10, cx - 50, cy + 45], fill=(255, 140, 160, 180))
    draw.ellipse([cx + 50, cy + 10, cx + 100, cy + 45], fill=(255, 140, 160, 180))
    draw.arc([cx - 65, cy - 25, cx - 25, cy - 5], 180, 360, fill=(50, 20, 30), width=6) # Wink
    draw.ellipse([cx + 30, cy - 30, cx + 65, cy + 5], fill=(50, 20, 30))
    draw.arc([cx - 35, cy + 20, cx + 35, cy + 60], 0, 180, fill=(220, 20, 60), width=6)
    # Dress & Ribbons
    draw.polygon([(cx - 170, cy + 280), (cx - 80, cy + 80), (cx + 80, cy + 80), (cx + 170, cy + 280)], fill=(255, 69, 0))

    draw_sparkle(draw, fx + 70, fy + 70, 28)
    draw_sparkle(draw, fx + fw - 70, fy + 80, 28)
    save_card(img, "dancer.png")

# 2. Candlestick (촛대)
def make_candlestick():
    img, (fx, fy, fw, fh) = create_base_card("weapon", "촛대", "어둠을 밝히는 황금 촛대", (255, 235, 150), (255, 160, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Base & Arms
    draw.ellipse([cx - 140, cy + 190, cx + 140, cy + 240], fill=(218, 165, 32), outline=(160, 110, 10), width=5)
    draw.rectangle([cx - 22, cy - 30, cx + 22, cy + 210], fill=(255, 215, 0), outline=(218, 165, 32), width=4)
    draw.arc([cx - 160, cy - 50, cx + 160, cy + 100], 0, 180, fill=(255, 215, 0), width=22)
    # 3 Candles with cute flames
    for x in [cx - 140, cx, cx + 140]:
        draw.rectangle([x - 18, cy - 120, x + 18, cy - 10], fill=(255, 250, 240), outline=(220, 210, 190), width=4)
        draw.ellipse([x - 22, cy - 190, x + 22, cy - 120], fill=(255, 69, 0))
        draw.ellipse([x - 12, cy - 175, x + 12, cy - 130], fill=(255, 215, 0))
        draw_sparkle(draw, x, cy - 200, 18, fill=(255, 255, 200, 230))

    save_card(img, "candlestick.png")

# 3. Rope (밧줄)
def make_rope():
    img, (fx, fy, fw, fh) = create_base_card("weapon", "밧줄", "튼튼하게 감긴 밧줄", (255, 224, 178), (216, 112, 147))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    for i in range(4):
        y = cy - 70 + i * 45
        draw.ellipse([cx - 160, y - 35, cx + 160, y + 35], outline=(180, 100, 40), width=28)
        draw.ellipse([cx - 150, y - 25, cx + 150, y + 25], outline=(220, 150, 80), width=16)
    # Knot Loop
    draw.ellipse([cx - 80, cy - 200, cx + 80, cy - 50], outline=(180, 100, 40), width=28)
    draw.ellipse([cx - 70, cy - 190, cx + 70, cy - 60], outline=(220, 150, 80), width=16)

    draw_sparkle(draw, fx + 80, fy + 80, 24)
    save_card(img, "rope.png")

# 4. Kitchen (주방)
def make_kitchen():
    img, (fx, fy, fw, fh) = create_base_card("room", "주방", "맛있는 냄새가 나는 주방", (255, 243, 224), (230, 81, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    draw.rectangle([cx - 130, cy - 20, cx + 130, cy + 170], fill=(200, 210, 220), outline=(120, 130, 140), width=6)
    draw.ellipse([cx - 150, cy - 40, cx + 150, cy + 20], fill=(160, 170, 180), outline=(100, 110, 120), width=6)
    draw.arc([cx - 50, cy - 130, cx - 15, cy - 50], 90, 270, fill=(255, 255, 255), width=8)
    draw.arc([cx + 15, cy - 130, cx + 50, cy - 50], 270, 90, fill=(255, 255, 255), width=8)
    draw.ellipse([cx - 90, cy - 220, cx + 90, cy - 110], fill=(255, 255, 255))
    draw.rectangle([cx - 60, cy - 140, cx + 60, cy - 100], fill=(255, 255, 255), outline=(200, 200, 200), width=4)

    draw_sparkle(draw, fx + 70, fy + 70, 24)
    save_card(img, "kitchen.png")

# 5. Hall (현관홀)
def make_hall():
    img, (fx, fy, fw, fh) = create_base_card("room", "현관홀", "웅장한 입구 현관홀", (255, 248, 225), (255, 179, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    draw.rectangle([cx - 130, cy - 110, cx + 130, cy + 190], fill=(121, 85, 72), outline=(62, 39, 35), width=8)
    draw.chord([cx - 130, cy - 220, cx + 130, cy], 180, 360, fill=(121, 85, 72), outline=(62, 39, 35), width=8)
    draw.ellipse([cx + 50, cy + 20, cx + 80, cy + 50], fill=(255, 215, 0))
    draw.polygon([(cx - 80, cy + 190), (cx + 80, cy + 190), (cx + 150, cy + 240), (cx - 150, cy + 240)], fill=(211, 47, 47))

    draw_sparkle(draw, fx + fw - 70, fy + 70, 24)
    save_card(img, "hall.png")

# 6. Diningroom (식당)
def make_diningroom():
    img, (fx, fy, fw, fh) = create_base_card("room", "식당", "맛있는 만찬이 준비된 식당", (255, 235, 238), (198, 40, 40))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    draw.rectangle([cx - 160, cy + 30, cx + 160, cy + 120], fill=(141, 110, 99), outline=(93, 64, 55), width=6)
    draw.rectangle([cx - 140, cy + 120, cx - 100, cy + 220], fill=(93, 64, 55))
    draw.rectangle([cx + 100, cy + 120, cx + 140, cy + 220], fill=(93, 64, 55))
    draw.chord([cx - 100, cy - 110, cx + 100, cy + 30], 180, 360, fill=(220, 220, 230), outline=(150, 150, 160), width=6)
    draw.ellipse([cx - 20, cy - 135, cx + 20, cy - 105], fill=(255, 215, 0))

    draw_sparkle(draw, fx + 70, fy + 70, 24)
    save_card(img, "diningroom.png")

# 7. Lounge (응접실)
def make_lounge():
    img, (fx, fy, fw, fh) = create_base_card("room", "응접실", "벽난로가 따뜻한 응접실", (255, 224, 178), (230, 81, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    draw.rectangle([cx - 150, cy - 160, cx + 150, cy + 160], fill=(180, 80, 50), outline=(110, 40, 20), width=8)
    draw.rectangle([cx - 90, cy - 50, cx + 90, cy + 160], fill=(40, 30, 30))
    draw.polygon([(cx - 55, cy + 160), (cx, cy + 20), (cx + 55, cy + 160)], fill=(255, 69, 0))
    draw.polygon([(cx - 30, cy + 160), (cx, cy + 60), (cx + 30, cy + 160)], fill=(255, 215, 0))

    draw_sparkle(draw, fx + fw - 70, fy + 70, 24)
    save_card(img, "lounge.png")

# 8. Study (집무실)
def make_study():
    img, (fx, fy, fw, fh) = create_base_card("room", "집무실", "비밀 서류가 숨겨진 집무실", (224, 242, 254), (3, 105, 161))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    draw.ellipse([cx - 130, cy - 160, cx + 20, cy - 10], fill=(30, 144, 255), outline=(0, 102, 204), width=6)
    draw.arc([cx - 130, cy - 160, cx + 20, cy - 10], 30, 150, fill=(46, 204, 113), width=16)
    draw.rectangle([cx - 160, cy + 40, cx + 160, cy + 170], fill=(120, 80, 50), outline=(70, 40, 20), width=6)
    draw.line([(cx + 50, cy + 40), (cx + 110, cy - 90)], fill=(255, 255, 255), width=8)

    draw_sparkle(draw, fx + 70, fy + 70, 24)
    save_card(img, "study.png")

# 9. Billiardroom (당구실)
def make_billiardroom():
    img, (fx, fy, fw, fh) = create_base_card("room", "당구실", "신나는 당구대가 있는 당구실", (209, 250, 229), (5, 150, 105))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    draw.rectangle([cx - 175, cy - 90, cx + 175, cy + 160], fill=(120, 70, 30), outline=(70, 40, 15), width=12)
    draw.rectangle([cx - 145, cy - 60, cx + 145, cy + 130], fill=(16, 185, 129))
    draw.ellipse([cx - 50, cy - 15, cx, cy + 30], fill=(255, 215, 0)) # Yellow 1
    draw.ellipse([cx + 10, cy - 15, cx + 60, cy + 30], fill=(239, 68, 68)) # Red 3
    draw.ellipse([cx - 20, cy + 35, cx + 30, cy + 80], fill=(30, 41, 59)) # Black 8
    draw.line([(cx - 180, cy - 140), (cx + 180, cy + 180)], fill=(217, 119, 6), width=8)
    draw.line([(cx + 180, cy - 140), (cx - 180, cy + 180)], fill=(217, 119, 6), width=8)

    draw_sparkle(draw, fx + fw - 70, fy + 70, 24)
    save_card(img, "billiardroom.png")

# 10. Card Back (cardback.png)
def make_cardback():
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    margin = 30
    radius = 45

    bg_grad = create_gradient(W, H, (15, 23, 42), (30, 27, 75), direction="vertical")

    mask = Image.new("L", (W, H), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([margin, margin, W - margin, H - margin], radius=radius, fill=255)

    img.paste(bg_grad, (0, 0), mask)

    draw.rounded_rectangle([margin, margin, W - margin, H - margin], radius=radius, outline=(255, 215, 0, 255), width=12)
    inner = margin + 22
    draw.rounded_rectangle([inner, inner, W - inner, H - inner], radius=radius - 10, outline=(218, 165, 32, 255), width=5)

    for x in range(inner + 40, W - inner - 40, 90):
        for y in range(inner + 40, H - inner - 40, 90):
            draw.polygon([(x, y - 18), (x + 18, y), (x, y + 18), (x - 18, y)], outline=(255, 215, 0, 60), width=2)

    cx, cy = W // 2, H // 2
    draw.ellipse([cx - 240, cy - 290, cx + 240, cy + 290], fill=(24, 30, 65, 240), outline=(255, 215, 0, 255), width=9)
    draw.ellipse([cx - 220, cy - 270, cx + 220, cy + 270], outline=(255, 255, 255, 120), width=4)

    draw.ellipse([cx - 130, cy - 70, cx + 130, cy - 15], fill=(255, 215, 0))
    draw.rectangle([cx - 80, cy - 190, cx + 80, cy - 50], fill=(255, 215, 0))

    draw.ellipse([cx - 95, cy - 25, cx + 95, cy + 160], outline=(255, 255, 255), width=12)
    draw.line([(cx + 70, cy + 135), (cx + 150, cy + 215)], fill=(255, 215, 0), width=20)

    bbox = font_back_title.getbbox("?")
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((cx - tw // 2, cy + 70 - th // 2), "?", fill=(255, 215, 0, 255), font=font_back_title)

    back_title = "저택 추리"
    bbox = font_back_title.getbbox(back_title)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((cx - tw // 2, cy - 380), back_title, fill=(255, 215, 0, 255), font=font_back_title)

    back_sub = "CLUE MYSTERY"
    bbox = font_back_sub.getbbox(back_sub)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((cx - tw // 2, cy + 350), back_sub, fill=(200, 220, 255, 220), font=font_back_sub)

    draw_star(draw, inner + 35, inner + 35, 20, 9, fill=(255, 215, 0, 255))
    draw_star(draw, W - inner - 35, inner + 35, 20, 9, fill=(255, 215, 0, 255))
    draw_star(draw, inner + 35, H - inner - 35, 20, 9, fill=(255, 215, 0, 255))
    draw_star(draw, W - inner - 35, H - inner - 35, 20, 9, fill=(255, 215, 0, 255))

    save_card(img, "cardback.png")

def main():
    print("Generating 10 cards cleanly...")
    make_dancer()
    make_candlestick()
    make_rope()
    make_kitchen()
    make_hall()
    make_diningroom()
    make_lounge()
    make_study()
    make_billiardroom()
    make_cardback()
    print("All 10 cards generated successfully and cleanly!")

if __name__ == "__main__":
    main()
