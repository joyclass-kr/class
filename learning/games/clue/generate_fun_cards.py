import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUTPUT_DIR = r"E:\webprojects\class\learning\games\clue\assets\images\cards"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 2x Supersampled resolution (1200 x 1800) -> Lanczos resize to (600 x 900)
W, H = 1200, 1800
FINAL_W, FINAL_H = 600, 900

FONT_PATH = "C:/Windows/Fonts/malgunbd.ttf"
FONT_REGULAR = "C:/Windows/Fonts/malgun.ttf"

def get_font(size, bold=True):
    path = FONT_PATH if bold else FONT_REGULAR
    try:
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

font_category = get_font(46, bold=True)
font_title = get_font(80, bold=True)
font_tagline = get_font(38, bold=True)
font_back_title = get_font(90, bold=True)
font_back_sub = get_font(44, bold=True)
font_comic_text = get_font(52, bold=True)

def draw_star(draw, cx, cy, r_outer, r_inner, num_points=5, fill=(255, 223, 0, 255), outline=(0, 0, 0, 255), width=3):
    points = []
    angle_step = math.pi / num_points
    for i in range(2 * num_points):
        r = r_outer if i % 2 == 0 else r_inner
        angle = i * angle_step - math.pi / 2
        x = cx + r * math.cos(angle)
        y = cy + r * math.sin(angle)
        points.append((x, y))
    draw.polygon(points, fill=fill, outline=outline, width=width)

def draw_comic_starburst(draw, cx, cy, radius, num_rays=20, color1=(255, 255, 255, 255), color2=(255, 235, 59, 255)):
    for i in range(num_rays):
        a1 = i * (2 * math.pi / num_rays)
        a2 = (i + 0.5) * (2 * math.pi / num_rays)
        
        p1 = (cx, cy)
        p2 = (cx + radius * 2 * math.cos(a1), cy + radius * 2 * math.sin(a1))
        p3 = (cx + radius * 2 * math.cos(a2), cy + radius * 2 * math.sin(a2))
        
        draw.polygon([p1, p2, p3], fill=color1 if i % 2 == 0 else color2)

def draw_sweat_drop(draw, x, y, size=35):
    draw.polygon([(x, y - size), (x - size//1.8, y + size//2), (x + size//1.8, y + size//2)], fill=(130, 210, 255, 255), outline=(20, 70, 150, 255), width=4)
    draw.ellipse([x - size//1.8, y, x + size//1.8, y + size], fill=(130, 210, 255, 255), outline=(20, 70, 150, 255), width=4)

def draw_sparkle(draw, cx, cy, radius, fill=(255, 255, 255, 240), outline=(0, 0, 0, 255)):
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
    draw.polygon(points, fill=fill, outline=outline, width=3)

def create_comic_card_base(category_type, title_text, tagline_text):
    if category_type == "suspect":
        badge_bg = (255, 60, 120, 255)       # Hot Pink
        badge_text = "용 의 자"
        card_bg = (255, 238, 244, 255)
        border_color = (245, 30, 95, 255)
        accent_color = (255, 90, 150, 255)
        burst_c1, burst_c2 = (255, 245, 248), (255, 185, 210)
    elif category_type == "weapon":
        badge_bg = (255, 130, 0, 255)       # Comic Orange
        badge_text = "무 기"
        card_bg = (255, 248, 225, 255)
        border_color = (255, 100, 0, 255)
        accent_color = (255, 170, 0, 255)
        burst_c1, burst_c2 = (255, 250, 225), (255, 215, 120)
    else:  # room
        badge_bg = (0, 180, 135, 255)        # Mint Teal
        badge_text = "장 소"
        card_bg = (232, 250, 245, 255)
        border_color = (0, 150, 110, 255)
        accent_color = (0, 205, 155, 255)
        burst_c1, burst_c2 = (242, 255, 250), (170, 240, 220)

    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    margin = 35
    radius = 55

    # Shadow & Base Card Container
    draw.rounded_rectangle([margin + 12, margin + 12, W - margin + 12, H - margin + 12], radius=radius, fill=(25, 25, 35, 90))
    draw.rounded_rectangle([margin, margin, W - margin, H - margin], radius=radius, fill=card_bg, outline=(20, 20, 30, 255), width=14)

    # Inner Border Line
    inner = margin + 22
    draw.rounded_rectangle([inner, inner, W - inner, H - inner], radius=radius - 12, outline=border_color, width=6)

    # Corner stars
    draw_star(draw, inner + 35, inner + 35, 24, 11, fill=(255, 225, 0, 255))
    draw_star(draw, W - inner - 35, inner + 35, 24, 11, fill=(255, 225, 0, 255))
    draw_star(draw, inner + 35, H - inner - 35, 24, 11, fill=(255, 225, 0, 255))
    draw_star(draw, W - inner - 35, H - inner - 35, 24, 11, fill=(255, 225, 0, 255))

    # Top Category Badge (Speech Bubble Style)
    badge_w, badge_h = 340, 84
    badge_x = (W - badge_w) // 2
    badge_y = margin + 35
    draw.rounded_rectangle([badge_x + 6, badge_y + 6, badge_x + badge_w + 6, badge_y + badge_h + 6], radius=42, fill=(20, 20, 30, 100))
    draw.rounded_rectangle([badge_x, badge_y, badge_x + badge_w, badge_y + badge_h], radius=42, fill=badge_bg, outline=(255, 255, 255, 255), width=6)
    draw.rounded_rectangle([badge_x, badge_y, badge_x + badge_w, badge_y + badge_h], radius=42, outline=(20, 20, 30, 255), width=5)

    bbox = font_category.getbbox(badge_text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((badge_x + (badge_w - tw) // 2, badge_y + (badge_h - th) // 2 - 6), badge_text, fill=(255, 255, 255, 255), font=font_category)

    # Title Banner with 3D Drop Shadow
    title_y = badge_y + badge_h + 30
    bbox = font_title.getbbox(title_text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (W - tw) // 2

    for offset in range(1, 10):
        draw.text((tx + offset, title_y + offset), title_text, fill=(20, 20, 30, 255), font=font_title)
    draw.text((tx, title_y), title_text, fill=(255, 255, 255, 255), font=font_title)
    draw.text((tx - 2, title_y - 2), title_text, fill=(35, 35, 45, 255), font=font_title)

    # Illustration Window
    frame_x1, frame_y1 = margin + 60, title_y + th + 45
    frame_x2, frame_y2 = W - margin - 60, H - margin - 180
    frame_w = frame_x2 - frame_x1
    frame_h = frame_y2 - frame_y1

    burst_img = Image.new("RGBA", (frame_w, frame_h))
    burst_draw = ImageDraw.Draw(burst_img)
    draw_comic_starburst(burst_draw, frame_w // 2, frame_h // 2, max(frame_w, frame_h), 22, burst_c1, burst_c2)

    mask = Image.new("L", (frame_w, frame_h), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([0, 0, frame_w, frame_h], radius=40, fill=255)

    img.paste(burst_img, (frame_x1, frame_y1), mask)

    draw.rounded_rectangle([frame_x1, frame_y1, frame_x2, frame_y2], radius=40, outline=(20, 20, 30, 255), width=12)
    draw.rounded_rectangle([frame_x1 + 10, frame_y1 + 10, frame_x2 - 10, frame_y2 - 10], radius=30, outline=(255, 255, 255, 220), width=5)

    # Bottom Tagline Pill
    tag_y = frame_y2 + 35
    tag_w, tag_h = W - (margin + 100) * 2, 78
    tag_x = (W - tag_w) // 2

    draw.rounded_rectangle([tag_x + 5, tag_y + 5, tag_x + tag_w + 5, tag_y + tag_h + 5], radius=39, fill=(20, 20, 30, 100))
    draw.rounded_rectangle([tag_x, tag_y, tag_x + tag_w, tag_y + tag_h], radius=39, fill=badge_bg, outline=(255, 255, 255, 255), width=5)
    draw.rounded_rectangle([tag_x, tag_y, tag_x + tag_w, tag_y + tag_h], radius=39, outline=(20, 20, 30, 255), width=4)

    bbox = font_tagline.getbbox(tagline_text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((tag_x + (tag_w - tw) // 2, tag_y + (tag_h - th) // 2 - 4), tagline_text, fill=(255, 255, 255, 255), font=font_tagline)

    return img, (frame_x1, frame_y1, frame_w, frame_h)

def save_card(img, filename):
    resized = img.resize((FINAL_W, FINAL_H), Image.Resampling.LANCZOS)
    path = os.path.join(OUTPUT_DIR, filename)
    resized.save(path, "PNG")
    print(f"Saved: {filename}")

# --- SPECIFIC CARD DRAWINGS ---

# 1. Countess (백작부인) - Smug/Mischievous Queen
def make_countess():
    img, (fx, fy, fw, fh) = create_comic_card_base("suspect", "백작부인", "화려하고 도도한 백작부인!", (255, 180, 200), (255, 100, 160))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Big Hair
    draw.ellipse([cx - 240, cy - 250, cx + 240, cy + 200], fill=(80, 40, 25), outline=(20, 20, 30), width=8)
    # Face
    draw.ellipse([cx - 160, cy - 180, cx + 160, cy + 120], fill=(255, 225, 210), outline=(20, 20, 30), width=8)
    # Cheeks
    draw.ellipse([cx - 140, cy + 10, cx - 70, cy + 60], fill=(255, 140, 160))
    draw.ellipse([cx + 70, cy + 10, cx + 140, cy + 60], fill=(255, 140, 160))
    # Funny Wink Eyes
    draw.arc([cx - 100, cy - 50, cx - 40, cy + 10], 180, 360, fill=(20, 20, 30), width=10) # Left eye wink
    draw.ellipse([cx + 40, cy - 50, cx + 100, cy + 10], fill=(20, 20, 30)) # Right eye big open
    draw.ellipse([cx + 55, cy - 40, cx + 75, cy - 20], fill=(255, 255, 255)) # Sparkle pupil
    # Mischievous Mouth
    draw.polygon([(cx - 30, cy + 40), (cx + 50, cy + 40), (cx + 10, cy + 85)], fill=(220, 30, 70), outline=(20, 20, 30), width=5)
    # Golden Crown Tilted
    crown = [(cx - 90, cy - 180), (cx - 40, cy - 270), (cx + 10, cy - 200), (cx + 70, cy - 280), (cx + 110, cy - 180)]
    draw.polygon(crown, fill=(255, 215, 0), outline=(20, 20, 30), width=7)
    draw_star(draw, cx + 70, cy - 280, 18, 8, fill=(230, 20, 50))
    # Royal Dress & Fan
    draw.polygon([(cx - 200, cy + 320), (cx - 110, cy + 110), (cx + 110, cy + 110), (cx + 200, cy + 320)], fill=(230, 40, 100), outline=(20, 20, 30), width=8)
    draw.chord([cx + 20, cy + 80, cx + 220, cy + 280], 180, 270, fill=(255, 215, 0), outline=(20, 20, 30), width=6)

    draw_sparkle(draw, fx + 80, fy + 80, 35)
    save_card(img, "countess.png")

# 2. Butler (집사장) - Sweating/Nervous Butler
def make_butler():
    img, (fx, fy, fw, fh) = create_comic_card_base("suspect", "집사장", "식은땀을 흘리는 삐까뻔쩍 집사장!", (180, 200, 220), (80, 110, 140))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Hair
    draw.ellipse([cx - 170, cy - 240, cx + 170, cy - 30], fill=(60, 70, 85), outline=(20, 20, 30), width=8)
    # Face
    draw.ellipse([cx - 150, cy - 170, cx + 150, cy + 130], fill=(255, 230, 215), outline=(20, 20, 30), width=8)
    # Sweat Drop!
    draw_sweat_drop(draw, cx + 120, cy - 100, size=40)
    # Funny Worried Eyes (Side-eye)
    draw.ellipse([cx - 90, cy - 40, cx - 20, cy + 30], fill=(255, 255, 255), outline=(20, 20, 30), width=6)
    draw.ellipse([cx + 20, cy - 40, cx + 90, cy + 30], fill=(255, 255, 255), outline=(20, 20, 30), width=6)
    draw.ellipse([cx - 45, cy - 20, cx - 25, cy], fill=(20, 20, 30))
    draw.ellipse([cx + 65, cy - 20, cx + 85, cy], fill=(20, 20, 30))
    # Wobbly Mouth
    draw.line([(cx - 40, cy + 70), (cx - 20, cy + 55), (cx, cy + 75), (cx + 20, cy + 60), (cx + 40, cy + 70)], fill=(20, 20, 30), width=7)
    # Tuxedo & Red Bow Tie
    draw.polygon([(cx - 200, cy + 320), (cx - 120, cy + 120), (cx + 120, cy + 120), (cx + 200, cy + 320)], fill=(30, 35, 45), outline=(20, 20, 30), width=8)
    draw.polygon([(cx - 50, cy + 120), (cx, cy + 150), (cx + 50, cy + 120), (cx + 50, cy + 180), (cx, cy + 150), (cx - 50, cy + 180)], fill=(220, 20, 40), outline=(20, 20, 30), width=6)
    # Shaking Silver Tray with Hot Tea
    draw.ellipse([cx - 200, cy + 190, cx + 20, cy + 250], fill=(220, 230, 240), outline=(20, 20, 30), width=7)
    draw.rectangle([cx - 130, cy + 140, cx - 60, cy + 200], fill=(255, 255, 255), outline=(20, 20, 30), width=6)

    save_card(img, "butler.png")

# 3. Gardener (정원사) - Cheerful Sprout Gardener
def make_gardener():
    img, (fx, fy, fw, fh) = create_comic_card_base("suspect", "정원사", "새싹이 뿅! 신난 정원사!", (160, 240, 160), (40, 160, 60))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Straw Hat with Sprout popping out
    draw.ellipse([cx - 250, cy - 210, cx + 250, cy - 100], fill=(240, 200, 90), outline=(20, 20, 30), width=8)
    draw.chord([cx - 160, cy - 300, cx + 160, cy - 130], 180, 360, fill=(220, 180, 70), outline=(20, 20, 30), width=8)
    # Sprout on hat!
    draw.ellipse([cx - 20, cy - 360, cx + 15, cy - 300], fill=(50, 205, 50), outline=(20, 20, 30), width=5)
    draw.ellipse([cx + 5, cy - 360, cx + 40, cy - 300], fill=(50, 205, 50), outline=(20, 20, 30), width=5)
    # Cheerful Face
    draw.ellipse([cx - 140, cy - 140, cx + 140, cy + 110], fill=(255, 225, 195), outline=(20, 20, 30), width=8)
    # Wide Happy Eyes & Smile
    draw.arc([cx - 90, cy - 40, cx - 30, cy + 20], 180, 360, fill=(20, 20, 30), width=9)
    draw.arc([cx + 30, cy - 40, cx + 90, cy + 20], 180, 360, fill=(20, 20, 30), width=9)
    draw.chord([cx - 60, cy + 10, cx + 60, cy + 80], 0, 180, fill=(220, 40, 50), outline=(20, 20, 30), width=6)
    # Overalls & Watering Can
    draw.polygon([(cx - 180, cy + 320), (cx - 110, cy + 100), (cx + 110, cy + 100), (cx + 180, cy + 320)], fill=(50, 130, 230), outline=(20, 20, 30), width=8)
    # Red Watering Can
    draw.rectangle([cx + 50, cy + 140, cx + 170, cy + 250], fill=(230, 50, 50), outline=(20, 20, 30), width=7)

    draw_sparkle(draw, fx + 80, fy + 80, 30)
    save_card(img, "gardener.png")

# 4. Physician (주치의) - Swirly Glasses Doctor
def make_physician():
    img, (fx, fy, fw, fh) = create_comic_card_base("suspect", "주치의", "뱅글뱅글 안경의 명탐정 의사!", (255, 235, 180), (240, 160, 50))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Hair & Head
    draw.ellipse([cx - 160, cy - 240, cx + 160, cy - 40], fill=(90, 60, 35), outline=(20, 20, 30), width=8)
    draw.ellipse([cx - 140, cy - 160, cx + 140, cy + 110], fill=(255, 225, 200), outline=(20, 20, 30), width=8)
    # Swirly Glasses (@_@)
    draw.ellipse([cx - 100, cy - 50, cx - 15, cy + 35], fill=(255, 255, 255), outline=(20, 20, 30), width=7)
    draw.ellipse([cx + 15, cy - 50, cx + 100, cy + 35], fill=(255, 255, 255), outline=(20, 20, 30), width=7)
    draw.line([(cx - 15, cy - 10), (cx + 15, cy - 10)], fill=(20, 20, 30), width=7)
    # Swirl lines
    draw.arc([cx - 80, cy - 30, cx - 35, cy + 15], 0, 270, fill=(20, 20, 30), width=6)
    draw.arc([cx + 35, cy - 30, cx + 80, cy + 15], 0, 270, fill=(20, 20, 30), width=6)
    # Broad Smile
    draw.arc([cx - 50, cy + 40, cx + 50, cy + 85], 0, 180, fill=(20, 20, 30), width=8)
    # Stethoscope & White Coat
    draw.polygon([(cx - 190, cy + 320), (cx - 110, cy + 100), (cx + 110, cy + 100), (cx + 190, cy + 320)], fill=(250, 250, 255), outline=(20, 20, 30), width=8)
    draw.arc([cx - 90, cy + 90, cx + 90, cy + 250], 0, 180, fill=(50, 60, 80), width=10)
    draw.ellipse([cx - 25, cy + 240, cx + 25, cy + 290], fill=(220, 220, 230), outline=(20, 20, 30), width=5)

    save_card(img, "physician.png")

# 5. Antiquarian (골동품상) - Monocle Treasure Collector
def make_antiquarian():
    img, (fx, fy, fw, fh) = create_comic_card_base("suspect", "골동품상", "보물 시계를 찾은 골동품상!", (170, 220, 255), (40, 120, 230))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Top Hat
    draw.ellipse([cx - 220, cy - 160, cx + 220, cy - 80], fill=(45, 45, 60), outline=(20, 20, 30), width=8)
    draw.rectangle([cx - 140, cy - 300, cx + 140, cy - 120], fill=(45, 45, 60), outline=(20, 20, 30), width=8)
    draw.rectangle([cx - 140, cy - 170, cx + 140, cy - 130], fill=(230, 170, 30))
    # Face & Monocle Glint
    draw.ellipse([cx - 140, cy - 130, cx + 140, cy + 110], fill=(255, 225, 200), outline=(20, 20, 30), width=8)
    draw.ellipse([cx + 20, cy - 30, cx + 90, cy + 40], outline=(255, 215, 0), width=9)
    draw.line([(cx + 55, cy + 40), (cx + 100, cy + 140)], fill=(255, 215, 0), width=6)
    draw.arc([cx - 50, cy + 30, cx + 50, cy + 80], 0, 180, fill=(20, 20, 30), width=8)
    # Holding Glowing Golden Pocket Watch
    draw.ellipse([cx - 170, cy + 130, cx - 60, cy + 240], fill=(255, 215, 0), outline=(20, 20, 30), width=7)
    draw_star(draw, cx - 115, cy + 185, 20, 9, fill=(255, 255, 255), outline=(20, 20, 30))

    save_card(img, "antiquarian.png")

# 6. Dancer (무희) - Energetic Sparkling Dancer
def make_dancer():
    img, (fx, fy, fw, fh) = create_comic_card_base("suspect", "무희", "무대를 사로잡는 화려한 무희!", (255, 190, 180), (240, 60, 70))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Hair & Flying Feather
    draw.ellipse([cx - 210, cy - 240, cx + 210, cy + 180], fill=(190, 30, 60), outline=(20, 20, 30), width=8)
    draw.polygon([(cx - 70, cy - 190), (cx - 130, cy - 330), (cx - 20, cy - 220)], fill=(255, 215, 0), outline=(20, 20, 30), width=6)
    # Face & Sparkle Wink
    draw.ellipse([cx - 140, cy - 160, cx + 140, cy + 110], fill=(255, 230, 215), outline=(20, 20, 30), width=8)
    draw_star(draw, cx - 65, cy - 15, 20, 9, fill=(255, 215, 0)) # Left eye sparkle star!
    draw.arc([cx + 30, cy - 35, cx + 90, cy - 5], 180, 360, fill=(20, 20, 30), width=8)
    draw.chord([cx - 45, cy + 20, cx + 45, cy + 75], 0, 180, fill=(230, 40, 70), outline=(20, 20, 30), width=6)

    draw_sparkle(draw, fx + 80, fy + 80, 35)
    draw_sparkle(draw, fx + fw - 80, fy + fh - 80, 30)
    save_card(img, "dancer.png")

# 7. Candlestick (촛대) - Smiling Flames Candlestick
def make_candlestick():
    img, (fx, fy, fw, fh) = create_comic_card_base("weapon", "촛대", "불꽃이 살아있는 황금 촛대!", (255, 240, 160), (255, 170, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Golden Candelabra
    draw.ellipse([cx - 160, cy + 220, cx + 160, cy + 270], fill=(255, 215, 0), outline=(20, 20, 30), width=7)
    draw.rectangle([cx - 25, cy - 40, cx + 25, cy + 240], fill=(255, 215, 0), outline=(20, 20, 30), width=7)
    draw.arc([cx - 180, cy - 60, cx + 180, cy + 120], 0, 180, fill=(255, 215, 0), width=28)
    draw.arc([cx - 180, cy - 60, cx + 180, cy + 120], 0, 180, fill=(20, 20, 30), width=7)

    # 3 Smiling Candle Flames!
    for x in [cx - 160, cx, cx + 160]:
        draw.rectangle([x - 20, cy - 140, x + 20, cy - 20], fill=(255, 250, 240), outline=(20, 20, 30), width=6)
        # Flame with cute face
        draw.ellipse([x - 30, cy - 230, x + 30, cy - 140], fill=(255, 70, 20), outline=(20, 20, 30), width=5)
        draw.ellipse([x - 18, cy - 210, x + 18, cy - 155], fill=(255, 220, 0))
        draw.ellipse([x - 10, cy - 195, x - 4, cy - 185], fill=(20, 20, 30))
        draw.ellipse([x + 4, cy - 195, x + 10, cy - 185], fill=(20, 20, 30))

    save_card(img, "candlestick.png")

# 8. Rope (밧줄) - Cute Knot Rope
def make_rope():
    img, (fx, fy, fw, fh) = create_comic_card_base("weapon", "밧줄", "돌돌 감긴 튼튼한 밧줄!", (255, 230, 180), (220, 120, 40))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Rope Loops
    for i in range(4):
        y = cy - 80 + i * 50
        draw.ellipse([cx - 180, y - 40, cx + 180, y + 40], outline=(20, 20, 30), width=32)
        draw.ellipse([cx - 170, y - 30, cx + 170, y + 30], outline=(230, 150, 50), width=20)
    # Top Ribbon Knot
    draw.ellipse([cx - 90, cy - 230, cx + 90, cy - 70], outline=(20, 20, 30), width=32)
    draw.ellipse([cx - 80, cy - 220, cx + 80, cy - 80], outline=(230, 150, 50), width=20)

    draw_sparkle(draw, cx + 140, cy - 180, 30)
    save_card(img, "rope.png")

# 9. Wrench (렌치) - Comic Impact Wrench
def make_wrench():
    img, (fx, fy, fw, fh) = create_comic_card_base("weapon", "렌치", "무엇이든 뚝딱! 강철 렌치!", (220, 245, 255), (0, 170, 210))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Steel Wrench Handle
    draw.line([(cx - 140, cy + 180), (cx + 100, cy - 140)], fill=(20, 20, 30), width=58)
    draw.line([(cx - 140, cy + 180), (cx + 100, cy - 140)], fill=(220, 230, 240), width=34)
    # Head
    draw.ellipse([cx + 50, cy - 210, cx + 170, cy - 90], fill=(180, 190, 205), outline=(20, 20, 30), width=8)
    draw.rectangle([cx + 110, cy - 190, cx + 190, cy - 110], fill=(0, 170, 210), outline=(20, 20, 30), width=6)

    # Action lines!
    draw.text((cx - 180, cy - 200), "짠!", fill=(0, 170, 210, 255), font=font_comic_text)
    draw_sparkle(draw, cx + 70, cy - 190, 35)
    save_card(img, "wrench.png")

# 10. Revolver (권총) - Pop Gun Revolver ("빵!")
def make_revolver():
    img, (fx, fy, fw, fh) = create_comic_card_base("weapon", "권총", "빵! 하고 튀어나오는 장난감 권총!", (245, 230, 255), (170, 60, 200))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Handle
    draw.polygon([(cx - 120, cy + 50), (cx - 190, cy + 220), (cx - 110, cy + 240), (cx - 50, cy + 90)], fill=(160, 70, 20), outline=(20, 20, 30), width=8)
    # Barrel
    draw.rectangle([cx - 70, cy - 50, cx + 170, cy + 30], fill=(210, 210, 230), outline=(20, 20, 30), width=8)
    draw.ellipse([cx - 90, cy - 60, cx - 10, cy + 40], fill=(170, 170, 190), outline=(20, 20, 30), width=8)
    # POP Flag ("빵!")
    draw.line([(cx + 170, cy - 10), (cx + 250, cy - 10)], fill=(20, 20, 30), width=8)
    draw.polygon([(cx + 250, cy - 70), (cx + 250, cy + 50), (cx + 160, cy - 10)], fill=(255, 215, 0), outline=(20, 20, 30), width=6)
    draw.text((cx + 180, cy - 45), "빵!", fill=(230, 20, 40), font=font_comic_text)

    save_card(img, "revolver.png")

# 11. Dagger (단검) - Shiny Star Dagger
def make_dagger():
    img, (fx, fy, fw, fh) = create_comic_card_base("weapon", "단검", "보석이 번쩍이는 멋진 단검!", (255, 230, 235), (230, 40, 50))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Blade
    draw.polygon([(cx, cy - 240), (cx - 45, cy + 40), (cx + 45, cy + 40)], fill=(230, 240, 250), outline=(20, 20, 30), width=8)
    draw.line([(cx, cy - 220), (cx, cy + 40)], fill=(255, 255, 255), width=8)
    # Hilt & Gem
    draw.rectangle([cx - 120, cy + 40, cx + 120, cy + 80], fill=(255, 215, 0), outline=(20, 20, 30), width=7)
    draw.rectangle([cx - 25, cy + 80, cx + 25, cy + 220], fill=(180, 30, 40), outline=(20, 20, 30), width=6)
    draw.polygon([(cx, cy + 45), (cx - 20, cy + 60), (cx, cy + 75), (cx + 20, cy + 60)], fill=(0, 200, 255), outline=(20, 20, 30), width=4)

    draw_sparkle(draw, cx + 40, cy - 180, 35)
    save_card(img, "dagger.png")

# 12. Leadpipe (납파이프) - Impact Leadpipe ("쾅!")
def make_leadpipe():
    img, (fx, fy, fw, fh) = create_comic_card_base("weapon", "납파이프", "쾅! 소리가 나는 철제 납파이프!", (235, 240, 245), (90, 110, 130))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    draw.line([(cx - 160, cy + 160), (cx + 140, cy - 140)], fill=(20, 20, 30), width=78)
    draw.line([(cx - 160, cy + 160), (cx + 140, cy - 140)], fill=(200, 215, 230), width=44)

    draw.text((cx - 180, cy - 180), "쾅!", fill=(220, 30, 40, 255), font=font_comic_text)
    draw_sparkle(draw, cx + 110, cy - 130, 30)
    save_card(img, "leadpipe.png")

# 13. Conservatory (온실)
def make_conservatory():
    img, (fx, fy, fw, fh) = create_comic_card_base("room", "온실", "알록달록 꽃이 가득한 온실!", (230, 250, 235), (40, 160, 70))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Glass Dome Frame
    draw.arc([cx - 200, cy - 220, cx + 200, cy + 180], 180, 360, fill=(20, 20, 30), width=12)
    draw.line([(cx - 200, cy - 20), (cx + 200, cy - 20)], fill=(20, 20, 30), width=8)
    draw.line([(cx, cy - 220), (cx, cy + 180)], fill=(20, 20, 30), width=8)
    # Blooming Flowers
    draw.ellipse([cx - 130, cy - 40, cx - 50, cy + 90], fill=(70, 190, 80), outline=(20, 20, 30), width=6)
    draw.ellipse([cx + 50, cy - 40, cx + 130, cy + 90], fill=(100, 210, 110), outline=(20, 20, 30), width=6)
    draw.ellipse([cx - 25, cy - 110, cx + 25, cy - 60], fill=(255, 60, 120), outline=(20, 20, 30), width=6)

    save_card(img, "conservatory.png")

# 14. Ballroom (무도회장)
def make_ballroom():
    img, (fx, fy, fw, fh) = create_comic_card_base("room", "무도회장", "반짝반짝 샹들리에 무도회장!", (245, 230, 255), (120, 30, 180))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Chandelier
    draw.line([(cx, fy + 40), (cx, cy - 100)], fill=(20, 20, 30), width=10)
    draw.arc([cx - 140, cy - 160, cx + 140, cy - 40], 0, 180, fill=(255, 215, 0), width=16)
    for x in [cx - 120, cx - 50, cx, cx + 50, cx + 120]:
        draw.ellipse([x - 14, cy - 70, x + 14, cy - 30], fill=(255, 255, 180), outline=(20, 20, 30), width=4)

    # Checkered Floor
    for i in range(5):
        for j in range(3):
            x = cx - 180 + i * 72
            y = cy + 60 + j * 60
            color = (255, 255, 255) if (i + j) % 2 == 0 else (140, 90, 180)
            draw.polygon([(x, y), (x + 72, y), (x + 52, y + 60), (x - 20, y + 60)], fill=color, outline=(20, 20, 30), width=4)

    save_card(img, "ballroom.png")

# 15. Kitchen (주방)
def make_kitchen():
    img, (fx, fy, fw, fh) = create_comic_card_base("room", "주방", "맛있는 냄새 솔솔~ 주방!", (255, 240, 220), (240, 90, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Soup Pot & Cake
    draw.rectangle([cx - 140, cy - 20, cx + 140, cy + 180], fill=(210, 220, 230), outline=(20, 20, 30), width=8)
    draw.ellipse([cx - 160, cy - 40, cx + 160, cy + 20], fill=(170, 180, 190), outline=(20, 20, 30), width=8)
    # Steam
    draw.arc([cx - 60, cy - 140, cx - 20, cy - 50], 90, 270, fill=(255, 255, 255), width=10)
    draw.arc([cx + 20, cy - 140, cx + 60, cy - 50], 270, 90, fill=(255, 255, 255), width=10)

    save_card(img, "kitchen.png")

# 16. Library (서재)
def make_library():
    img, (fx, fy, fw, fh) = create_comic_card_base("room", "서재", "비밀 책이 가득한 서재!", (240, 235, 230), (120, 80, 60))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    draw.rectangle([cx - 190, cy - 200, cx + 190, cy + 220], fill=(140, 100, 70), outline=(20, 20, 30), width=12)
    draw.line([(cx - 190, cy), (cx + 190, cy)], fill=(20, 20, 30), width=12)
    colors = [(230, 50, 50), (60, 180, 70), (40, 140, 240), (250, 190, 30)]
    for i, c in enumerate(colors):
        draw.rectangle([cx - 160 + i * 40, cy - 180, cx - 125 + i * 40, cy - 10], fill=c, outline=(20, 20, 30), width=5)

    save_card(img, "library.png")

# 17. Hall (현관홀)
def make_hall():
    img, (fx, fy, fw, fh) = create_comic_card_base("room", "현관홀", "웅장하고 넓은 현관홀!", (255, 248, 225), (255, 170, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    draw.rectangle([cx - 140, cy - 120, cx + 140, cy + 220], fill=(130, 85, 60), outline=(20, 20, 30), width=9)
    draw.chord([cx - 140, cy - 240, cx + 140, cy], 180, 360, fill=(130, 85, 60), outline=(20, 20, 30), width=9)
    draw.ellipse([cx + 60, cy + 30, cx + 90, cy + 60], fill=(255, 215, 0), outline=(20, 20, 30), width=5)

    save_card(img, "hall.png")

# 18. Diningroom (식당)
def make_diningroom():
    img, (fx, fy, fw, fh) = create_comic_card_base("room", "식당", "맛있는 만찬이 준비된 식당!", (255, 235, 238), (210, 40, 40))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    draw.rectangle([cx - 180, cy + 40, cx + 180, cy + 140], fill=(140, 100, 80), outline=(20, 20, 30), width=8)
    draw.chord([cx - 110, cy - 120, cx + 110, cy + 40], 180, 360, fill=(230, 230, 240), outline=(20, 20, 30), width=8)

    save_card(img, "diningroom.png")

# 19. Lounge (응접실)
def make_lounge():
    img, (fx, fy, fw, fh) = create_comic_card_base("room", "응접실", "따뜻한 벽난로 응접실!", (255, 225, 180), (230, 90, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    draw.rectangle([cx - 160, cy - 180, cx + 160, cy + 180], fill=(190, 80, 50), outline=(20, 20, 30), width=10)
    draw.polygon([(cx - 60, cy + 180), (cx, cy + 20), (cx + 60, cy + 180)], fill=(255, 70, 0))

    save_card(img, "lounge.png")

# 20. Study (집무실)
def make_study():
    img, (fx, fy, fw, fh) = create_comic_card_base("room", "집무실", "비밀 서류가 숨겨진 집무실!", (225, 245, 255), (0, 130, 200))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    draw.ellipse([cx - 140, cy - 180, cx + 20, cy - 20], fill=(40, 150, 250), outline=(20, 20, 30), width=8)
    draw.rectangle([cx - 180, cy + 40, cx + 180, cy + 180], fill=(130, 85, 50), outline=(20, 20, 30), width=8)

    save_card(img, "study.png")

# 21. Billiardroom (당구실)
def make_billiardroom():
    img, (fx, fy, fw, fh) = create_comic_card_base("room", "당구실", "신나는 당구대가 있는 당구실!", (210, 250, 230), (0, 160, 110))
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    draw.rectangle([cx - 190, cy - 100, cx + 190, cy + 180], fill=(130, 75, 30), outline=(20, 20, 30), width=12)
    draw.rectangle([cx - 160, cy - 70, cx + 160, cy + 150], fill=(16, 185, 129))
    draw.ellipse([cx - 25, cy + 35, cx + 25, cy + 85], fill=(30, 40, 60), outline=(20, 20, 30), width=5)

    save_card(img, "billiardroom.png")

# 22. Card Back (cardback.png)
def make_cardback():
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    margin = 35
    radius = 55

    # Dark Midnight Indigo Card Back
    draw.rounded_rectangle([margin + 12, margin + 12, W - margin + 12, H - margin + 12], radius=radius, fill=(10, 10, 25, 120))
    draw.rounded_rectangle([margin, margin, W - margin, H - margin], radius=radius, fill=(18, 22, 50, 255), outline=(20, 20, 30, 255), width=14)

    inner = margin + 25
    draw.rounded_rectangle([inner, inner, W - inner, H - inner], radius=radius - 12, outline=(255, 215, 0, 255), width=8)

    # Repeating Diamond Grid
    for x in range(inner + 50, W - inner - 40, 100):
        for y in range(inner + 50, H - inner - 40, 100):
            draw.polygon([(x, y - 22), (x + 22, y), (x, y + 22), (x - 22, y)], fill=(30, 36, 75, 255), outline=(255, 215, 0, 120), width=3)

    cx, cy = W // 2, H // 2
    # Gold Oval Frame
    draw.ellipse([cx - 270, cy - 330, cx + 270, cy + 330], fill=(28, 34, 75, 250), outline=(255, 215, 0, 255), width=12)

    # Detective Top Hat & Magnifying Glass
    draw.ellipse([cx - 150, cy - 80, cx + 150, cy - 20], fill=(255, 215, 0), outline=(20, 20, 30), width=6)
    draw.rectangle([cx - 90, cy - 220, cx + 90, cy - 60], fill=(255, 215, 0), outline=(20, 20, 30), width=6)
    draw.ellipse([cx - 110, cy - 30, cx + 110, cy + 190], fill=(255, 255, 255, 240), outline=(255, 215, 0, 255), width=16)

    # Question Mark (?)
    bbox = font_back_title.getbbox("?")
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((cx - tw // 2, cy + 80 - th // 2), "?", fill=(230, 30, 60, 255), font=font_back_title)

    # Logo Text
    back_title = "저택 추리"
    bbox = font_back_title.getbbox(back_title)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((cx - tw // 2, cy - 430), back_title, fill=(255, 215, 0, 255), font=font_back_title)

    save_card(img, "cardback.png")

def main():
    print("Generating 22 FUN COMIC Clue game cards...")
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
    print("All 22 FUN COMIC cards generated successfully!")

if __name__ == "__main__":
    main()
