import os
import math
from PIL import Image, ImageDraw, ImageFont

OUTPUT_DIR = r"E:\webprojects\class\learning\games\clue\assets\images\cards"
os.makedirs(OUTPUT_DIR, exist_ok=True)

W, H = 600, 800
FONT_PATH = "C:/Windows/Fonts/malgunbd.ttf"

def get_font(size):
    try:
        return ImageFont.truetype(FONT_PATH, size)
    except:
        return ImageFont.load_default()

def draw_star(draw, cx, cy, r_outer, r_inner, num_points=5, fill=(255, 225, 0, 255), outline=(20, 15, 45, 255), width=2):
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

def create_card_base(title_text):
    img = Image.new("RGBA", (W, H), (24, 18, 52, 255))
    draw = ImageDraw.Draw(img)

    # Outer Frame & Borders
    draw.rectangle([0, 0, W, H], outline=(45, 30, 95, 255), width=16)
    draw.rectangle([8, 8, W - 8, H - 8], outline=(255, 215, 0, 255), width=4)
    draw.rectangle([14, 14, W - 14, H - 14], outline=(80, 50, 140, 255), width=3)

    # Four Corner Stars
    draw_star(draw, 40, 40, 20, 9, fill=(255, 225, 0, 255))
    draw_star(draw, W - 40, 40, 20, 9, fill=(255, 225, 0, 255))
    draw_star(draw, 40, H - 40, 20, 9, fill=(255, 225, 0, 255))
    draw_star(draw, W - 40, H - 40, 20, 9, fill=(255, 225, 0, 255))

    # Background Stars
    star_positions = [(90, 100), (510, 110), (70, 720), (530, 710), (140, 760), (460, 750), (60, 200), (540, 210)]
    for sx, sy in star_positions:
        draw_star(draw, sx, sy, 8, 4, fill=(255, 255, 255, 200), outline=None)

    # 3D Bubble Title Text
    font_size = int(W * 0.15) if len(title_text) <= 2 else int(W * 0.12)
    font = get_font(font_size)

    bbox = font.getbbox(title_text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (W - tw) // 2
    ty = 55

    for offset in range(1, 8):
        draw.text((tx + offset, ty + offset), title_text, fill=(15, 10, 30, 255), font=font)

    for dx in range(-10, 11):
        for dy in range(-10, 11):
            if dx*dx + dy*dy <= 100:
                draw.text((tx + dx, ty + dy), title_text, fill=(255, 255, 255, 255), font=font)

    for dx in range(-13, 14):
        for dy in range(-13, 14):
            if 100 < dx*dx + dy*dy <= 169:
                draw.text((tx + dx, ty + dy), title_text, fill=(25, 15, 45, 255), font=font)

    colors = [(60, 200, 255), (255, 220, 0), (255, 110, 180), (255, 150, 0)]
    curr_x = tx
    for i, char in enumerate(title_text):
        c_color = colors[i % len(colors)]
        draw.text((curr_x, ty), char, fill=c_color, font=font)
        c_bbox = font.getbbox(char)
        curr_x += (c_bbox[2] - c_bbox[0])

    draw_star(draw, tx - 28, ty + th // 2, 14, 6, fill=(255, 255, 255), outline=(20, 20, 30))
    draw_star(draw, tx + tw + 28, ty + th // 2, 14, 6, fill=(255, 255, 255), outline=(20, 20, 30))

    # Inner Illustration Frame
    win_rect = [50, 160, W - 50, H - 60]
    draw.rounded_rectangle(win_rect, radius=24, fill=(35, 25, 75, 255), outline=(255, 215, 0, 255), width=4)

    return img, (win_rect[0] + 10, win_rect[1] + 10, win_rect[2] - win_rect[0] - 20, win_rect[3] - win_rect[1] - 20)

def save_card(img, filename):
    path = os.path.join(OUTPUT_DIR, filename)
    img.save(path, "PNG")
    print(f"Generated card: {filename}")

# --- 10 CARDS GENERATION ---

# 1. Dancer (무희)
def make_dancer():
    img, (fx, fy, fw, fh) = create_card_base("무희")
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    # Hair & Feather
    draw.ellipse([cx - 160, cy - 210, cx + 160, cy + 160], fill=(190, 40, 70), outline=(20, 20, 30), width=5)
    draw.polygon([(cx - 50, cy - 170), (cx - 100, cy - 280), (cx - 10, cy - 190)], fill=(255, 215, 0), outline=(20, 20, 30), width=4)

    # Face
    draw.ellipse([cx - 120, cy - 140, cx + 120, cy + 80], fill=(255, 225, 210), outline=(20, 20, 30), width=5)
    draw.ellipse([cx - 95, cy + 10, cx - 45, cy + 45], fill=(255, 140, 160, 180))
    draw.ellipse([cx + 45, cy + 10, cx + 95, cy + 45], fill=(255, 140, 160, 180))
    draw.arc([cx - 60, cy - 25, cx - 20, cy - 5], 180, 360, fill=(20, 20, 30), width=6) # Wink
    draw.ellipse([cx + 25, cy - 25, cx + 60, cy + 5], fill=(20, 20, 30))
    draw.arc([cx - 35, cy + 20, cx + 35, cy + 60], 0, 180, fill=(220, 20, 60), width=6)

    # Dress
    draw.polygon([(cx - 160, cy + 270), (cx - 70, cy + 70), (cx + 70, cy + 70), (cx + 160, cy + 270)], fill=(230, 40, 70), outline=(20, 20, 30), width=5)

    draw_sparkle(draw, fx + 60, fy + 60, 24)
    draw_sparkle(draw, fx + fw - 60, fy + 70, 24)
    save_card(img, "dancer.png")

# 2. Candlestick (촛대)
def make_candlestick():
    img, (fx, fy, fw, fh) = create_card_base("촛대")
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    draw.ellipse([cx - 140, cy + 170, cx + 140, cy + 220], fill=(255, 215, 0), outline=(20, 20, 30), width=5)
    draw.rectangle([cx - 22, cy - 40, cx + 22, cy + 190], fill=(255, 215, 0), outline=(20, 20, 30), width=5)
    draw.arc([cx - 160, cy - 60, cx + 160, cy + 90], 0, 180, fill=(255, 215, 0), width=20)
    for x in [cx - 140, cx, cx + 140]:
        draw.rectangle([x - 18, cy - 120, x + 18, cy - 10], fill=(255, 250, 240), outline=(20, 20, 30), width=4)
        draw.ellipse([x - 24, cy - 190, x + 24, cy - 120], fill=(255, 70, 20), outline=(20, 20, 30), width=4)
        draw.ellipse([x - 12, cy - 170, x + 12, cy - 130], fill=(255, 220, 0))
        draw_sparkle(draw, x, cy - 200, 18)

    save_card(img, "candlestick.png")

# 3. Rope (밧줄)
def make_rope():
    img, (fx, fy, fw, fh) = create_card_base("밧줄")
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    for i in range(4):
        y = cy - 70 + i * 45
        draw.ellipse([cx - 160, y - 35, cx + 160, y + 35], outline=(20, 20, 30), width=28)
        draw.ellipse([cx - 150, y - 25, cx + 150, y + 25], outline=(230, 150, 50), width=16)

    draw.ellipse([cx - 80, cy - 200, cx + 80, cy - 50], outline=(20, 20, 30), width=28)
    draw.ellipse([cx - 70, cy - 190, cx + 70, cy - 60], outline=(230, 150, 50), width=16)

    draw_sparkle(draw, fx + 70, fy + 70, 24)
    save_card(img, "rope.png")

# 4. Kitchen (주방)
def make_kitchen():
    img, (fx, fy, fw, fh) = create_card_base("주방")
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    draw.rectangle([cx - 140, cy - 20, cx + 140, cy + 170], fill=(210, 225, 240), outline=(255, 215, 0), width=6)
    draw.ellipse([cx - 160, cy - 40, cx + 160, cy + 20], fill=(170, 185, 200), outline=(255, 215, 0), width=6)
    draw.arc([cx - 50, cy - 130, cx - 15, cy - 50], 90, 270, fill=(255, 255, 255), width=8)
    draw.arc([cx + 15, cy - 130, cx + 50, cy - 50], 270, 90, fill=(255, 255, 255), width=8)

    save_card(img, "kitchen.png")

# 5. Hall (현관홀)
def make_hall():
    img, (fx, fy, fw, fh) = create_card_base("현관홀")
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    draw.rectangle([cx - 130, cy - 100, cx + 130, cy + 190], fill=(120, 80, 50), outline=(255, 215, 0), width=6)
    draw.chord([cx - 130, cy - 220, cx + 130, cy + 20], 180, 360, fill=(120, 80, 50), outline=(255, 215, 0), width=6)
    draw.ellipse([cx + 50, cy + 20, cx + 80, cy + 50], fill=(255, 215, 0), outline=(20, 20, 30), width=4)
    draw.polygon([(cx - 80, cy + 190), (cx + 80, cy + 190), (cx + 160, cy + 250), (cx - 160, cy + 250)], fill=(220, 40, 50), outline=(255, 215, 0), width=4)

    save_card(img, "hall.png")

# 6. Diningroom (식당)
def make_diningroom():
    img, (fx, fy, fw, fh) = create_card_base("식당")
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    draw.rectangle([cx - 170, cy + 30, cx + 170, cy + 130], fill=(140, 95, 60), outline=(255, 215, 0), width=6)
    draw.chord([cx - 100, cy - 110, cx + 100, cy + 30], 180, 360, fill=(230, 230, 245), outline=(255, 215, 0), width=6)
    draw.ellipse([cx - 20, cy - 135, cx + 20, cy - 105], fill=(255, 215, 0))

    save_card(img, "diningroom.png")

# 7. Lounge (응접실)
def make_lounge():
    img, (fx, fy, fw, fh) = create_card_base("응접실")
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    draw.rectangle([cx - 150, cy - 160, cx + 150, cy + 170], fill=(180, 80, 50), outline=(255, 215, 0), width=6)
    draw.polygon([(cx - 50, cy + 170), (cx, cy + 30), (cx + 50, cy + 170)], fill=(255, 70, 0))

    save_card(img, "lounge.png")

# 8. Study (집무실)
def make_study():
    img, (fx, fy, fw, fh) = create_card_base("집무실")
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    draw.ellipse([cx - 130, cy - 160, cx + 20, cy - 10], fill=(50, 160, 255), outline=(255, 215, 0), width=6)
    draw.rectangle([cx - 170, cy + 40, cx + 170, cy + 180], fill=(130, 85, 50), outline=(255, 215, 0), width=6)

    save_card(img, "study.png")

# 9. Billiardroom (당구실)
def make_billiardroom():
    img, (fx, fy, fw, fh) = create_card_base("당구실")
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2

    draw.rectangle([cx - 180, cy - 90, cx + 180, cy + 170], fill=(130, 75, 30), outline=(255, 215, 0), width=10)
    draw.rectangle([cx - 150, cy - 60, cx + 150, cy + 140], fill=(16, 185, 129))
    draw.ellipse([cx - 20, cy + 30, cx + 20, cy + 70], fill=(30, 41, 59), outline=(20, 20, 30), width=3)

    save_card(img, "billiardroom.png")

# 10. Card Back (cardback.png)
def make_cardback():
    img = Image.new("RGBA", (W, H), (24, 18, 52, 255))
    draw = ImageDraw.Draw(img)

    draw.rectangle([0, 0, W, H], outline=(45, 30, 95, 255), width=16)
    draw.rectangle([8, 8, W - 8, H - 8], outline=(255, 215, 0, 255), width=5)
    draw.rectangle([14, 14, W - 14, H - 14], outline=(80, 50, 140, 255), width=3)

    for x in range(50, W - 40, 70):
        for y in range(50, H - 40, 70):
            draw.polygon([(x, y - 16), (x + 16, y), (x, y + 16), (x - 16, y)], fill=(32, 24, 65, 255), outline=(255, 215, 0, 90), width=2)

    cx, cy = W // 2, H // 2
    draw.ellipse([cx - 210, cy - 250, cx + 210, cy + 250], fill=(28, 22, 60, 245), outline=(255, 215, 0, 255), width=8)

    draw.ellipse([cx - 120, cy - 60, cx + 120, cy - 10], fill=(255, 215, 0))
    draw.rectangle([cx - 70, cy - 170, cx + 70, cy - 40], fill=(255, 215, 0))
    draw.ellipse([cx - 85, cy - 20, cx + 85, cy + 150], fill=(255, 255, 255, 240), outline=(255, 215, 0, 255), width=12)

    font_title = get_font(84)
    bbox = font_title.getbbox("?")
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((cx - tw // 2, cy + 65 - th // 2), "?", fill=(230, 30, 60, 255), font=font_title)

    back_title = "저택 추리"
    bbox = font_title.getbbox(back_title)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx, ty = (W - tw) // 2, cy - 340
    for dx in range(-6, 7):
        for dy in range(-6, 7):
            if dx*dx + dy*dy <= 36:
                draw.text((tx + dx, ty + dy), back_title, fill=(20, 15, 40, 255), font=font_title)
    draw.text((tx, ty), back_title, fill=(255, 215, 0, 255), font=font_title)

    font_sub = get_font(42)
    back_sub = "MANOR MYSTERY"
    bbox = font_sub.getbbox(back_sub)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((W - tw) // 2, cy + 280), back_sub, fill=(255, 215, 0, 255), font=font_sub)

    draw_star(draw, 40, 40, 20, 9, fill=(255, 225, 0, 255))
    draw_star(draw, W - 40, 40, 20, 9, fill=(255, 225, 0, 255))
    draw_star(draw, 40, H - 40, 20, 9, fill=(255, 225, 0, 255))
    draw_star(draw, W - 40, H - 40, 20, 9, fill=(255, 225, 0, 255))

    save_card(img, "cardback.png")

def main():
    print("Generating 10 cards with exact starry night purple theme...")
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
    print("All 10 cards generated successfully!")

if __name__ == "__main__":
    main()
