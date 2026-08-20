import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Output directory
OUTPUT_DIR = r"E:\webprojects\class\learning\games\clue\assets\images\cards"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Card dimensions (Supersampled 2x resolution: 1200 x 1800 -> downsampled to 600 x 900)
W, H = 1200, 1800
FINAL_W, FINAL_H = 600, 900

# Fonts
FONT_PATH = "C:/Windows/Fonts/malgunbd.ttf"
FONT_REGULAR = "C:/Windows/Fonts/malgun.ttf"

def get_font(size, bold=True):
    path = FONT_PATH if bold else FONT_REGULAR
    try:
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

font_category = get_font(44, bold=True)
font_title = get_font(72, bold=True)
font_tagline = get_font(36, bold=True)
font_back_title = get_font(80, bold=True)
font_back_sub = get_font(40, bold=True)

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

    margin = 35
    radius = 50

    card_rect = [margin, margin, W - margin, H - margin]
    draw.rounded_rectangle(card_rect, radius=radius, fill=outer_theme, outline=border_color, width=12)

    inner_margin = margin + 20
    draw.rounded_rectangle([inner_margin, inner_margin, W - inner_margin, H - inner_margin],
                           radius=radius - 12, outline=accent_color, width=4)

    draw_star(draw, inner_margin + 25, inner_margin + 25, 18, 8, fill=(255, 215, 0, 255))
    draw_star(draw, W - inner_margin - 25, inner_margin + 25, 18, 8, fill=(255, 215, 0, 255))
    draw_star(draw, inner_margin + 25, H - inner_margin - 25, 18, 8, fill=(255, 215, 0, 255))
    draw_star(draw, W - inner_margin - 25, H - inner_margin - 25, 18, 8, fill=(255, 215, 0, 255))

    # Badge
    badge_w, badge_h = 320, 80
    badge_x = (W - badge_w) // 2
    badge_y = margin + 35
    draw.rounded_rectangle([badge_x, badge_y, badge_x + badge_w, badge_y + badge_h],
                           radius=40, fill=badge_bg, outline=(255, 255, 255, 255), width=6)
    
    bbox = font_category.getbbox(badge_text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((badge_x + (badge_w - tw) // 2, badge_y + (badge_h - th) // 2 - 6),
              badge_text, fill=(255, 255, 255, 255), font=font_category)

    # Title Box
    title_y = badge_y + badge_h + 30
    bbox = font_title.getbbox(title_text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (W - tw) // 2

    for dx, dy in [(-4,-4), (4,-4), (-4,4), (4,4), (0,5)]:
        draw.text((tx + dx, title_y + dy), title_text, fill=(30, 30, 50, 200), font=font_title)
    draw.text((tx, title_y), title_text, fill=(40, 44, 52, 255), font=font_title)

    draw.polygon([(tx - 40, title_y + th//2), (tx - 25, title_y + th//2 - 15), (tx - 10, title_y + th//2), (tx - 25, title_y + th//2 + 15)], fill=accent_color)
    draw.polygon([(tx + tw + 10, title_y + th//2), (tx + tw + 25, title_y + th//2 - 15), (tx + tw + 40, title_y + th//2), (tx + tw + 25, title_y + th//2 + 15)], fill=accent_color)

    # Main Frame
    frame_x1, frame_y1 = margin + 60, title_y + th + 45
    frame_x2, frame_y2 = W - margin - 60, H - margin - 180
    frame_w = frame_x2 - frame_x1
    frame_h = frame_y2 - frame_y1

    grad_img = create_gradient(frame_w, frame_h, bg_color1, bg_color2, direction="vertical")
    
    mask = Image.new("L", (frame_w, frame_h), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([0, 0, frame_w, frame_h], radius=36, fill=255)
    
    img.paste(grad_img, (frame_x1, frame_y1), mask)

    draw.rounded_rectangle([frame_x1, frame_y1, frame_x2, frame_y2], radius=36, outline=border_color, width=10)
    draw.rounded_rectangle([frame_x1 + 8, frame_y1 + 8, frame_x2 - 8, frame_y2 - 8], radius=28, outline=(255, 255, 255, 200), width=4)

    # Bottom Tagline
    tag_y = frame_y2 + 35
    tag_w, tag_h = W - (margin + 120) * 2, 76
    tag_x = (W - tag_w) // 2
    draw.rounded_rectangle([tag_x, tag_y, tag_x + tag_w, tag_y + tag_h], radius=38, fill=badge_bg, outline=(255, 255, 255, 255), width=4)
    
    bbox = font_tagline.getbbox(tagline_text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((tag_x + (tag_w - tw) // 2, tag_y + (tag_h - th) // 2 - 4),
              tagline_text, fill=(255, 255, 255, 255), font=font_tagline)

    return img, (frame_x1, frame_y1, frame_w, frame_h)

def save_card(img, filename):
    resized = img.resize((FINAL_W, FINAL_H), Image.Resampling.LANCZOS)
    path = os.path.join(OUTPUT_DIR, filename)
    resized.save(path, "PNG")
    print(f"Saved: {filename}")

# --- SPECIFIC CARD DRAWINGS ---

# 1. Countess (백작부인)
def make_countess():
    img, (fx, fy, fw, fh) = create_base_card("suspect", "백작부인", "화려한 왕관의 백작부인", (255, 182, 193), (255, 105, 180))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Hair
    draw.ellipse([cx - 220, cy - 250, cx + 220, cy + 180], fill=(90, 50, 30))
    # Face
    draw.ellipse([cx - 150, cy - 180, cx + 150, cy + 120], fill=(255, 224, 205))
    # Cheek blush
    draw.ellipse([cx - 120, cy + 10, cx - 60, cy + 50], fill=(255, 150, 160, 180))
    draw.ellipse([cx + 60, cy + 10, cx + 120, cy + 50], fill=(255, 150, 160, 180))
    # Eyes & Smile
    draw.ellipse([cx - 80, cy - 40, cx - 40, cy], fill=(50, 30, 20))
    draw.ellipse([cx + 40, cy - 40, cx + 80, cy], fill=(50, 30, 20))
    draw.arc([cx - 40, cy + 20, cx + 40, cy + 70], 0, 180, fill=(200, 50, 80), width=6)
    # Tiara/Crown
    crown_pts = [(cx - 120, cy - 170), (cx - 70, cy - 260), (cx, cy - 180), (cx + 70, cy - 260), (cx + 120, cy - 170)]
    draw.polygon(crown_pts, fill=(255, 215, 0), outline=(218, 165, 32), width=5)
    draw_star(draw, cx, cy - 230, 20, 10, fill=(220, 20, 60))
    # Dress & Fan
    draw.polygon([(cx - 180, cy + 320), (cx - 100, cy + 110), (cx + 100, cy + 110), (cx + 180, cy + 320)], fill=(220, 20, 60))
    draw.chord([cx + 30, cy + 100, cx + 220, cy + 280], 180, 270, fill=(255, 215, 0), outline=(255, 105, 180), width=4)

    draw_sparkle(draw, fx + 80, fy + 80, 30)
    draw_sparkle(draw, fx + fw - 80, fy + fh - 80, 25)
    save_card(img, "countess.png")

# 2. Butler (집사장)
def make_butler():
    img, (fx, fy, fw, fh) = create_base_card("suspect", "집사장", "단정하고 정중한 집사장", (100, 130, 160), (40, 60, 90))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Hair
    draw.ellipse([cx - 160, cy - 240, cx + 160, cy - 40], fill=(70, 80, 95))
    # Face
    draw.ellipse([cx - 140, cy - 170, cx + 140, cy + 120], fill=(255, 228, 210))
    # Eyes & Moustache
    draw.ellipse([cx - 75, cy - 30, cx - 45, cy], fill=(30, 40, 50))
    draw.ellipse([cx + 45, cy - 30, cx + 75, cy], fill=(30, 40, 50))
    draw.chord([cx - 70, cy + 10, cx, cy + 40], 180, 360, fill=(50, 50, 60))
    draw.chord([cx, cy + 10, cx + 70, cy + 40], 180, 360, fill=(50, 50, 60))
    # Tuxedo & Bow tie
    draw.polygon([(cx - 190, cy + 320), (cx - 110, cy + 110), (cx + 110, cy + 110), (cx + 190, cy + 320)], fill=(30, 35, 45))
    draw.polygon([(cx - 40, cy + 110), (cx, cy + 140), (cx + 40, cy + 110), (cx + 40, cy + 160), (cx, cy + 140), (cx - 40, cy + 160)], fill=(220, 20, 60))
    # Silver tray with tea cup
    draw.ellipse([cx - 180, cy + 180, cx + 20, cy + 240], fill=(210, 220, 230), outline=(150, 160, 170), width=5)
    draw.rectangle([cx - 110, cy + 140, cx - 50, cy + 190], fill=(255, 255, 255))
    draw.arc([cx - 130, cy + 100, cx - 30, cy + 140], 0, 180, fill=(255, 200, 100), width=4)

    draw_sparkle(draw, fx + fw - 90, fy + 90, 25)
    save_card(img, "butler.png")

# 3. Gardener (정원사)
def make_gardener():
    img, (fx, fy, fw, fh) = create_base_card("suspect", "정원사", "식물을 사랑하는 정원사", (144, 238, 144), (34, 139, 34))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Straw hat
    draw.ellipse([cx - 240, cy - 210, cx + 240, cy - 110], fill=(238, 207, 110), outline=(180, 140, 60), width=6)
    draw.chord([cx - 150, cy - 300, cx + 150, cy - 140], 180, 360, fill=(218, 185, 90))
    # Face & Smile
    draw.ellipse([cx - 130, cy - 150, cx + 130, cy + 100], fill=(255, 220, 190))
    draw.ellipse([cx - 70, cy - 30, cx - 40, cy + 10], fill=(60, 40, 20))
    draw.ellipse([cx + 40, cy - 30, cx + 70, cy + 10], fill=(60, 40, 20))
    draw.arc([cx - 40, cy + 15, cx + 40, cy + 65], 0, 180, fill=(180, 50, 40), width=6)
    # Overalls & Plant pot
    draw.polygon([(cx - 170, cy + 320), (cx - 100, cy + 90), (cx + 100, cy + 90), (cx + 170, cy + 320)], fill=(60, 120, 210))
    # Potted plant
    draw.polygon([(cx + 40, cy + 170), (cx + 140, cy + 170), (cx + 120, cy + 270), (cx + 60, cy + 270)], fill=(205, 92, 92))
    draw.ellipse([cx + 70, cy + 90, cx + 110, cy + 170], fill=(50, 205, 50))
    draw.ellipse([cx + 50, cy + 110, cx + 90, cy + 170], fill=(34, 139, 34))

    draw_sparkle(draw, fx + 80, fy + 80, 30)
    save_card(img, "gardener.png")

# 4. Physician (주치의)
def make_physician():
    img, (fx, fy, fw, fh) = create_base_card("suspect", "주치의", "다정한 친절 주치의", (255, 228, 181), (238, 154, 73))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Hair & Glasses
    draw.ellipse([cx - 150, cy - 240, cx + 150, cy - 50], fill=(80, 50, 30))
    draw.ellipse([cx - 130, cy - 160, cx + 130, cy + 100], fill=(255, 224, 200))
    draw.ellipse([cx - 85, cy - 40, cx - 15, cy + 30], outline=(60, 60, 80), width=6)
    draw.ellipse([cx + 15, cy - 40, cx + 85, cy + 30], outline=(60, 60, 80), width=6)
    draw.line([(cx - 15, cy - 5), (cx + 15, cy - 5)], fill=(60, 60, 80), width=6)
    draw.arc([cx - 35, cy + 25, cx + 35, cy + 65], 0, 180, fill=(200, 60, 60), width=6)
    # White coat & Stethoscope
    draw.polygon([(cx - 180, cy + 320), (cx - 100, cy + 90), (cx + 100, cy + 90), (cx + 180, cy + 320)], fill=(245, 245, 255), outline=(200, 200, 220), width=4)
    draw.arc([cx - 80, cy + 80, cx + 80, cy + 240], 0, 180, fill=(50, 50, 70), width=8)
    draw.ellipse([cx - 20, cy + 230, cx + 20, cy + 270], fill=(200, 200, 210), outline=(100, 100, 120), width=4)

    draw_sparkle(draw, fx + fw - 80, fy + 80, 30)
    save_card(img, "physician.png")

# 5. Antiquarian (골동품상)
def make_antiquarian():
    img, (fx, fy, fw, fh) = create_base_card("suspect", "골동품상", "보물을 찾아서! 골동품상", (135, 206, 250), (30, 144, 255))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Top Hat
    draw.ellipse([cx - 210, cy - 170, cx + 210, cy - 90], fill=(40, 40, 55))
    draw.rectangle([cx - 130, cy - 300, cx + 130, cy - 130], fill=(40, 40, 55))
    draw.rectangle([cx - 130, cy - 170, cx + 130, cy - 140], fill=(220, 160, 40))
    # Face & Monocle
    draw.ellipse([cx - 130, cy - 140, cx + 130, cy + 100], fill=(255, 220, 195))
    draw.ellipse([cx + 15, cy - 40, cx + 75, cy + 20], outline=(255, 215, 0), width=6)
    draw.line([(cx + 45, cy + 20), (cx + 90, cy + 120)], fill=(255, 215, 0), width=4)
    draw.arc([cx - 40, cy + 25, cx + 40, cy + 70], 0, 180, fill=(180, 60, 30), width=6)
    # Vest & Antique Watch
    draw.polygon([(cx - 170, cy + 320), (cx - 100, cy + 90), (cx + 100, cy + 90), (cx + 170, cy + 320)], fill=(120, 70, 30))
    draw.ellipse([cx - 160, cy + 140, cx - 60, cy + 240], fill=(255, 215, 0), outline=(218, 165, 32), width=5)
    draw.line([(cx - 110, cy + 190), (cx - 110, cy + 160)], fill=(50, 40, 20), width=5)
    draw.line([(cx - 110, cy + 190), (cx - 85, cy + 190)], fill=(50, 40, 20), width=5)

    draw_sparkle(draw, fx + 80, fy + 80, 30)
    save_card(img, "antiquarian.png")

# 6. Dancer (무희)
def make_dancer():
    img, (fx, fy, fw, fh) = create_base_card("suspect", "무희", "무대를 사로잡는 무희", (255, 160, 122), (220, 20, 60))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Hair & Feather
    draw.ellipse([cx - 200, cy - 250, cx + 200, cy + 160], fill=(180, 40, 60))
    draw.polygon([(cx - 80, cy - 200), (cx - 120, cy - 320), (cx - 30, cy - 220)], fill=(255, 215, 0))
    # Face
    draw.ellipse([cx - 140, cy - 170, cx + 140, cy + 100], fill=(255, 225, 210))
    draw.ellipse([cx - 110, cy, cx - 60, cy + 40], fill=(255, 140, 160, 180))
    draw.ellipse([cx + 60, cy, cx + 110, cy + 40], fill=(255, 140, 160, 180))
    draw.arc([cx - 70, cy - 30, cx - 30, cy - 10], 180, 360, fill=(50, 20, 30), width=5)
    draw.arc([cx + 30, cy - 30, cx + 70, cy - 10], 180, 360, fill=(50, 20, 30), width=5)
    draw.arc([cx - 40, cy + 20, cx + 40, cy + 65], 0, 180, fill=(220, 20, 60), width=6)
    # Dress & Ribbons
    draw.polygon([(cx - 190, cy + 320), (cx - 90, cy + 90), (cx + 90, cy + 90), (cx + 190, cy + 320)], fill=(255, 69, 0))
    
    draw_sparkle(draw, fx + 80, fy + 80, 30)
    draw_sparkle(draw, fx + fw - 80, fy + 90, 30)
    save_card(img, "dancer.png")

# 7. Candlestick (촛대)
def make_candlestick():
    img, (fx, fy, fw, fh) = create_base_card("weapon", "촛대", "어둠을 밝히는 황금 촛대", (255, 235, 150), (255, 160, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Base & Arms
    draw.ellipse([cx - 150, cy + 220, cx + 150, cy + 270], fill=(218, 165, 32), outline=(160, 110, 10), width=5)
    draw.rectangle([cx - 25, cy - 40, cx + 25, cy + 240], fill=(255, 215, 0), outline=(218, 165, 32), width=4)
    draw.arc([cx - 180, cy - 60, cx + 180, cy + 120], 0, 180, fill=(255, 215, 0), width=24)
    # 3 Candles
    for x in [cx - 160, cx, cx + 160]:
        draw.rectangle([x - 20, cy - 140, x + 20, cy - 20], fill=(255, 250, 240), outline=(220, 210, 190), width=4)
        # Flames
        draw.ellipse([x - 25, cy - 220, x + 25, cy - 140], fill=(255, 69, 0))
        draw.ellipse([x - 14, cy - 200, x + 14, cy - 150], fill=(255, 215, 0))
        draw_sparkle(draw, x, cy - 230, 20, fill=(255, 255, 200, 230))

    save_card(img, "candlestick.png")

# 8. Rope (밧줄)
def make_rope():
    img, (fx, fy, fw, fh) = create_base_card("weapon", "밧줄", "튼튼하게 감긴 밧줄", (255, 224, 178), (216, 112, 147))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Coiled rope loops
    for i in range(4):
        y = cy - 80 + i * 50
        draw.ellipse([cx - 180, y - 40, cx + 180, y + 40], outline=(180, 100, 40), width=32)
        draw.ellipse([cx - 170, y - 30, cx + 170, y + 30], outline=(220, 150, 80), width=18)
    # Knot Loop
    draw.ellipse([cx - 90, cy - 220, cx + 90, cy - 60], outline=(180, 100, 40), width=32)
    draw.ellipse([cx - 80, cy - 210, cx + 80, cy - 70], outline=(220, 150, 80), width=18)

    draw_sparkle(draw, fx + 90, fy + 90, 25)
    save_card(img, "rope.png")

# 9. Wrench (렌치)
def make_wrench():
    img, (fx, fy, fw, fh) = create_base_card("weapon", "렌치", "무엇이든 고치는 렌치", (224, 247, 250), (0, 172, 193))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Angled handle
    draw.line([(cx - 140, cy + 180), (cx + 100, cy - 140)], fill=(180, 190, 200), width=50)
    draw.line([(cx - 140, cy + 180), (cx + 100, cy - 140)], fill=(230, 240, 250), width=26)
    # Head 1
    draw.ellipse([cx + 50, cy - 210, cx + 170, cy - 90], fill=(160, 170, 180), outline=(100, 110, 120), width=6)
    draw.rectangle([cx + 110, cy - 190, cx + 190, cy - 110], fill=(0, 172, 193))
    # Head 2
    draw.ellipse([cx - 190, cy + 110, cx - 70, cy + 230], fill=(160, 170, 180), outline=(100, 110, 120), width=6)
    draw.rectangle([cx - 210, cy + 130, cx - 130, cy + 210], fill=(0, 172, 193))

    draw_sparkle(draw, cx + 70, cy - 190, 30)
    save_card(img, "wrench.png")

# 10. Revolver (권총)
def make_revolver():
    img, (fx, fy, fw, fh) = create_base_card("weapon", "권총", "장난감이 넘치는 장난감 권총", (243, 229, 245), (171, 71, 188))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Handle
    draw.polygon([(cx - 120, cy + 50), (cx - 190, cy + 220), (cx - 110, cy + 240), (cx - 50, cy + 90)], fill=(140, 70, 20), outline=(90, 40, 10), width=6)
    # Barrel & Cylinder
    draw.rectangle([cx - 70, cy - 50, cx + 170, cy + 30], fill=(200, 200, 220), outline=(100, 100, 120), width=6)
    draw.ellipse([cx - 90, cy - 60, cx - 10, cy + 40], fill=(160, 160, 180), outline=(90, 90, 110), width=6)
    # Cork POP Flag
    draw.line([(cx + 170, cy - 10), (cx + 250, cy - 10)], fill=(200, 50, 50), width=6)
    draw.polygon([(cx + 250, cy - 60), (cx + 250, cy + 40), (cx + 170, cy - 10)], fill=(255, 215, 0))

    draw_sparkle(draw, cx + 220, cy - 80, 30)
    save_card(img, "revolver.png")

# 11. Dagger (단검)
def make_dagger():
    img, (fx, fy, fw, fh) = create_base_card("weapon", "단검", "보석 장식 단검", (255, 235, 238), (229, 57, 53))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Blade
    draw.polygon([(cx, cy - 240), (cx - 45, cy + 40), (cx + 45, cy + 40)], fill=(220, 230, 240), outline=(140, 150, 170), width=5)
    draw.line([(cx, cy - 220), (cx, cy + 40)], fill=(255, 255, 255), width=6)
    # Guard & Hilt
    draw.rectangle([cx - 120, cy + 40, cx + 120, cy + 80], fill=(255, 215, 0), outline=(180, 140, 0), width=5)
    draw.rectangle([cx - 25, cy + 80, cx + 25, cy + 220], fill=(160, 40, 40), outline=(100, 20, 20), width=4)
    # Gem
    draw.polygon([(cx, cy + 45), (cx - 20, cy + 60), (cx, cy + 75), (cx + 20, cy + 60)], fill=(0, 200, 255))

    draw_sparkle(draw, cx + 20, cy - 200, 30)
    save_card(img, "dagger.png")

# 12. Leadpipe (납파이프)
def make_leadpipe():
    img, (fx, fy, fw, fh) = create_base_card("weapon", "납파이프", "묵직한 철제 납파이프", (236, 239, 241), (84, 110, 122))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Pipe body
    draw.line([(cx - 160, cy + 160), (cx + 140, cy - 140)], fill=(140, 155, 170), width=70)
    draw.line([(cx - 160, cy + 160), (cx + 140, cy - 140)], fill=(210, 225, 240), width=30)
    # Rims
    draw.ellipse([cx + 110, cy - 180, cx + 170, cy - 110], fill=(120, 135, 150), outline=(70, 80, 95), width=6)
    draw.ellipse([cx - 190, cy + 120, cx - 130, cy + 190], fill=(120, 135, 150), outline=(70, 80, 95), width=6)

    draw_sparkle(draw, cx + 110, cy - 130, 25)
    save_card(img, "leadpipe.png")

# 13. Conservatory (온실)
def make_conservatory():
    img, (fx, fy, fw, fh) = create_base_card("room", "온실", "꽃과 나무가 가득한 온실", (232, 245, 233), (46, 125, 50))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Glass Dome
    draw.arc([cx - 200, cy - 220, cx + 200, cy + 180], 180, 360, fill=(255, 255, 255), width=10)
    draw.line([(cx - 200, cy - 20), (cx + 200, cy - 20)], fill=(255, 255, 255), width=6)
    draw.line([(cx, cy - 220), (cx, cy + 180)], fill=(255, 255, 255), width=6)
    # Flowers & Plants
    draw.polygon([(cx - 140, cy + 80), (cx - 40, cy + 80), (cx - 60, cy + 220), (cx - 120, cy + 220)], fill=(210, 105, 30))
    draw.polygon([(cx + 40, cy + 80), (cx + 140, cy + 80), (cx + 120, cy + 220), (cx + 60, cy + 220)], fill=(210, 105, 30))
    draw.ellipse([cx - 130, cy - 40, cx - 50, cy + 90], fill=(76, 175, 80))
    draw.ellipse([cx + 50, cy - 40, cx + 130, cy + 90], fill=(129, 199, 132))
    # Pink Flower
    draw.ellipse([cx - 20, cy - 100, cx + 20, cy - 60], fill=(255, 64, 129))
    draw_star(draw, cx, cy - 80, 12, 6, fill=(255, 235, 59))

    save_card(img, "conservatory.png")

# 14. Ballroom (무도회장)
def make_ballroom():
    img, (fx, fy, fw, fh) = create_base_card("room", "무도회장", "샹들리에가 빛나는 무도회장", (243, 229, 245), (106, 27, 154))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Chandelier
    draw.line([(cx, fy + 40), (cx, cy - 100)], fill=(255, 215, 0), width=8)
    draw.arc([cx - 140, cy - 160, cx + 140, cy - 40], 0, 180, fill=(255, 215, 0), width=12)
    for x in [cx - 120, cx - 50, cx, cx + 50, cx + 120]:
        draw.ellipse([x - 12, cy - 70, x + 12, cy - 30], fill=(255, 255, 200))
        draw_sparkle(draw, x, cy - 80, 14)

    # Checkered Floor
    for i in range(5):
        for j in range(3):
            x = cx - 180 + i * 72
            y = cy + 60 + j * 60
            color = (255, 255, 255) if (i + j) % 2 == 0 else (120, 80, 160)
            draw.polygon([(x, y), (x + 72, y), (x + 52, y + 60), (x - 20, y + 60)], fill=color)

    save_card(img, "ballroom.png")

# 15. Kitchen (주방)
def make_kitchen():
    img, (fx, fy, fw, fh) = create_base_card("room", "주방", "맛있는 냄새가 나는 주방", (255, 243, 224), (230, 81, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Cooking Pot
    draw.rectangle([cx - 140, cy - 20, cx + 140, cy + 180], fill=(200, 210, 220), outline=(120, 130, 140), width=6)
    draw.ellipse([cx - 160, cy - 40, cx + 160, cy + 20], fill=(160, 170, 180), outline=(100, 110, 120), width=6)
    # Steam
    draw.arc([cx - 60, cy - 140, cx - 20, cy - 50], 90, 270, fill=(255, 255, 255), width=8)
    draw.arc([cx + 20, cy - 140, cx + 60, cy - 50], 270, 90, fill=(255, 255, 255), width=8)
    # Chef Hat
    draw.ellipse([cx - 100, cy - 240, cx + 100, cy - 120], fill=(255, 255, 255))
    draw.rectangle([cx - 70, cy - 150, cx + 70, cy - 110], fill=(255, 255, 255), outline=(200, 200, 200), width=4)

    save_card(img, "kitchen.png")

# 16. Library (서재)
def make_library():
    img, (fx, fy, fw, fh) = create_base_card("room", "서재", "지식이 가득한 서재", (239, 235, 233), (109, 76, 65))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Bookshelf
    draw.rectangle([cx - 190, cy - 200, cx + 190, cy + 220], fill=(141, 110, 99), outline=(93, 64, 55), width=10)
    draw.line([(cx - 190, cy), (cx + 190, cy)], fill=(93, 64, 55), width=10)
    # Books
    colors = [(229, 57, 53), (67, 160, 71), (30, 136, 229), (251, 192, 45), (142, 36, 170)]
    for i, c in enumerate(colors):
        draw.rectangle([cx - 160 + i * 32, cy - 180, cx - 132 + i * 32, cy - 10], fill=c)
        draw.rectangle([cx - 20 + i * 32, cy + 20, cx + 8 + i * 32, cy + 210], fill=c)

    save_card(img, "library.png")

# 17. Hall (현관홀)
def make_hall():
    img, (fx, fy, fw, fh) = create_base_card("room", "현관홀", "웅장한 입구 현관홀", (255, 248, 225), (255, 179, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Arched Door
    draw.rectangle([cx - 140, cy - 120, cx + 140, cy + 220], fill=(121, 85, 72), outline=(62, 39, 35), width=8)
    draw.chord([cx - 140, cy - 240, cx + 140, cy], 180, 360, fill=(121, 85, 72), outline=(62, 39, 35), width=8)
    draw.ellipse([cx + 60, cy + 30, cx + 90, cy + 60], fill=(255, 215, 0))
    # Red Carpet
    draw.polygon([(cx - 90, cy + 220), (cx + 90, cy + 220), (cx + 160, cy + 270), (cx - 160, cy + 270)], fill=(211, 47, 47))

    save_card(img, "hall.png")

# 18. Diningroom (식당)
def make_diningroom():
    img, (fx, fy, fw, fh) = create_base_card("room", "식당", "맛있는 만찬이 준비된 식당", (255, 235, 238), (198, 40, 40))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Table
    draw.rectangle([cx - 180, cy + 40, cx + 180, cy + 140], fill=(141, 110, 99), outline=(93, 64, 55), width=6)
    draw.rectangle([cx - 160, cy + 140, cx - 120, cy + 250], fill=(93, 64, 55))
    draw.rectangle([cx + 120, cy + 140, cx + 160, cy + 250], fill=(93, 64, 55))
    # Plate Cover (Cloche)
    draw.chord([cx - 110, cy - 120, cx + 110, cy + 40], 180, 360, fill=(220, 220, 230), outline=(150, 150, 160), width=6)
    draw.ellipse([cx - 25, cy - 145, cx + 25, cy - 115], fill=(255, 215, 0))

    save_card(img, "diningroom.png")

# 19. Lounge (응접실)
def make_lounge():
    img, (fx, fy, fw, fh) = create_base_card("room", "응접실", "벽난로가 따뜻한 응접실", (255, 224, 178), (230, 81, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Fireplace
    draw.rectangle([cx - 160, cy - 180, cx + 160, cy + 180], fill=(180, 80, 50), outline=(110, 40, 20), width=8)
    draw.rectangle([cx - 100, cy - 60, cx + 100, cy + 180], fill=(40, 30, 30))
    # Fire
    draw.polygon([(cx - 60, cy + 180), (cx, cy + 20), (cx + 60, cy + 180)], fill=(255, 69, 0))
    draw.polygon([(cx - 35, cy + 180), (cx, cy + 70), (cx + 35, cy + 180)], fill=(255, 215, 0))

    save_card(img, "lounge.png")

# 20. Study (집무실)
def make_study():
    img, (fx, fy, fw, fh) = create_base_card("room", "집무실", "비밀 서류가 숨겨진 집무실", (224, 242, 254), (3, 105, 161))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Globe
    draw.ellipse([cx - 140, cy - 180, cx + 20, cy - 20], fill=(30, 144, 255), outline=(0, 102, 204), width=6)
    draw.arc([cx - 140, cy - 180, cx + 20, cy - 20], 30, 150, fill=(46, 204, 113), width=18)
    draw.line([(cx - 60, cy - 20), (cx - 60, cy + 40)], fill=(255, 215, 0), width=8)
    # Desk & Feather Quill
    draw.rectangle([cx - 180, cy + 40, cx + 180, cy + 180], fill=(120, 80, 50), outline=(70, 40, 20), width=6)
    draw.line([(cx + 60, cy + 40), (cx + 120, cy - 100)], fill=(255, 255, 255), width=8)

    save_card(img, "study.png")

# 21. Billiardroom (당구실)
def make_billiardroom():
    img, (fx, fy, fw, fh) = create_base_card("room", "당구실", "신나는 당구대가 있는 당구실", (209, 250, 229), (5, 150, 105))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Billiard Table Frame & Felt
    draw.rectangle([cx - 190, cy - 100, cx + 190, cy + 180], fill=(120, 70, 30), outline=(70, 40, 15), width=12)
    draw.rectangle([cx - 160, cy - 70, cx + 160, cy + 150], fill=(16, 185, 129))
    # Balls (1, 3, 8)
    draw.ellipse([cx - 60, cy - 20, cx - 10, cy + 30], fill=(255, 215, 0)) # Yellow 1
    draw.ellipse([cx + 10, cy - 20, cx + 60, cy + 30], fill=(239, 68, 68)) # Red 3
    draw.ellipse([cx - 25, cy + 35, cx + 25, cy + 85], fill=(30, 41, 59)) # Black 8
    # Cues
    draw.line([(cx - 200, cy - 150), (cx + 200, cy + 200)], fill=(217, 119, 6), width=8)
    draw.line([(cx + 200, cy - 150), (cx - 200, cy + 200)], fill=(217, 119, 6), width=8)

    save_card(img, "billiardroom.png")

# 22. Card Back (cardback.png)
def make_cardback():
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    margin = 35
    radius = 50

    # Background gradient: Midnight indigo
    bg_grad = create_gradient(W, H, (15, 23, 42), (30, 27, 75), direction="vertical")
    
    mask = Image.new("L", (W, H), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([margin, margin, W - margin, H - margin], radius=radius, fill=255)
    
    img.paste(bg_grad, (0, 0), mask)

    # Borders
    draw.rounded_rectangle([margin, margin, W - margin, H - margin], radius=radius, outline=(255, 215, 0, 255), width=14)
    inner = margin + 25
    draw.rounded_rectangle([inner, inner, W - inner, H - inner], radius=radius - 12, outline=(218, 165, 32, 255), width=6)

    # Repeating Diamond pattern
    for x in range(inner + 40, W - inner - 40, 100):
        for y in range(inner + 40, H - inner - 40, 100):
            draw.polygon([(x, y - 20), (x + 20, y), (x, y + 20), (x - 20, y)], outline=(255, 215, 0, 60), width=2)

    # Central Oval Crest
    cx, cy = W // 2, H // 2
    draw.ellipse([cx - 260, cy - 320, cx + 260, cy + 320], fill=(24, 30, 65, 240), outline=(255, 215, 0, 255), width=10)
    draw.ellipse([cx - 240, cy - 300, cx + 240, cy + 300], outline=(255, 255, 255, 120), width=4)

    # Top Hat & Bow tie
    draw.ellipse([cx - 150, cy - 80, cx + 150, cy - 20], fill=(255, 215, 0))
    draw.rectangle([cx - 90, cy - 220, cx + 90, cy - 60], fill=(255, 215, 0))
    draw.polygon([(cx - 60, cy + 180), (cx, cy + 200), (cx + 60, cy + 180), (cx + 60, cy + 230), (cx, cy + 200), (cx - 60, cy + 230)], fill=(255, 215, 0))

    # Magnifying Glass with Question Mark
    draw.ellipse([cx - 110, cy - 30, cx + 110, cy + 190], outline=(255, 255, 255), width=14)
    draw.line([(cx + 80, cy + 160), (cx + 170, cy + 250)], fill=(255, 215, 0), width=22)

    # Question Mark text
    bbox = font_back_title.getbbox("?")
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((cx - tw // 2, cy + 80 - th // 2), "?", fill=(255, 215, 0, 255), font=font_back_title)

    # Title & Subtitle text on back
    back_title = "저택 추리"
    bbox = font_back_title.getbbox(back_title)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((cx - tw // 2, cy - 420), back_title, fill=(255, 215, 0, 255), font=font_back_title)

    back_sub = "CLUE MYSTERY"
    bbox = font_back_sub.getbbox(back_sub)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((cx - tw // 2, cy + 400), back_sub, fill=(200, 220, 255, 220), font=font_back_sub)

    # Corner stars
    draw_star(draw, inner + 40, inner + 40, 22, 10, fill=(255, 215, 0, 255))
    draw_star(draw, W - inner - 40, inner + 40, 22, 10, fill=(255, 215, 0, 255))
    draw_star(draw, inner + 40, H - inner - 40, 22, 10, fill=(255, 215, 0, 255))
    draw_star(draw, W - inner - 40, H - inner - 40, 22, 10, fill=(255, 215, 0, 255))

    save_card(img, "cardback.png")

# Run all generator functions
def main():
    print("Generating 22 Clue game cards...")
    make_countess()
    make_butler()
    make_gardener()
    make_physician()
    make_antiquarian()
    make_dancer()

    make_candlestick()
    make_rope()
    make_wrench()
    make_revolver()
    make_dagger()
    make_leadpipe()

    make_conservatory()
    make_ballroom()
    make_kitchen()
    make_library()
    make_hall()
    make_diningroom()
    make_lounge()
    make_study()
    make_billiardroom()

    make_cardback()
    print("All 22 cards generated successfully!")

if __name__ == "__main__":
    main()
