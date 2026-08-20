import os
import math
from PIL import Image, ImageDraw, ImageFont

BRAIN_DIR = r"C:\Users\A\.gemini\antigravity\brain\4006ea5b-1079-4178-a78f-9312412ff3a0"
OUT_DIR = r"E:\webprojects\class\learning\games\clue\assets\images\cards"

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

def get_base_card(title_text):
    # Use real AI card frame template (from conservatory card) as base!
    template_path = os.path.join(BRAIN_DIR, "card_conservatory_cute_1787196466612.jpg")
    img = Image.open(template_path).convert("RGBA").resize((W, H), Image.Resampling.LANCZOS)
    draw = ImageDraw.Draw(img)

    # Clean center illustration window area with rich starry room background
    window_rect = [45, 140, W - 45, H - 55]
    draw.rounded_rectangle(window_rect, radius=24, fill=(28, 22, 60, 255), outline=(255, 215, 0, 255), width=4)

    # Title area background cover
    title_rect = [80, 40, W - 80, 140]
    draw.rectangle(title_rect, fill=(26, 20, 56, 255))

    # Render 3D Bubble Title Text
    font_size = int(W * 0.14) if len(title_text) <= 3 else int(W * 0.11)
    font = get_font(font_size)

    bbox = font.getbbox(title_text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (W - tw) // 2
    ty = 50

    for offset in range(1, 8):
        draw.text((tx + offset, ty + offset), title_text, fill=(15, 10, 30, 255), font=font)

    for dx in range(-9, 10):
        for dy in range(-9, 10):
            if dx*dx + dy*dy <= 81:
                draw.text((tx + dx, ty + dy), title_text, fill=(255, 255, 255, 255), font=font)

    for dx in range(-12, 13):
        for dy in range(-12, 13):
            if 81 < dx*dx + dy*dy <= 144:
                draw.text((tx + dx, ty + dy), title_text, fill=(25, 15, 45, 255), font=font)

    colors = [(60, 200, 255), (255, 220, 0), (255, 110, 180), (255, 150, 0)]
    curr_x = tx
    for i, char in enumerate(title_text):
        c_color = colors[i % len(colors)]
        draw.text((curr_x, ty), char, fill=c_color, font=font)
        c_bbox = font.getbbox(char)
        curr_x += (c_bbox[2] - c_bbox[0])

    draw_star(draw, tx - 26, ty + th // 2, 14, 6, fill=(255, 255, 255), outline=(20, 20, 30))
    draw_star(draw, tx + tw + 26, ty + th // 2, 14, 6, fill=(255, 255, 255), outline=(20, 20, 30))

    return img, (60, 150, W - 120, H - 220)

def save_card(img, filename):
    path = os.path.join(OUT_DIR, filename)
    img.save(path, "PNG")
    print(f"Clean room card saved: {filename}")

# 1. Kitchen (주방)
def make_kitchen():
    img, (fx, fy, fw, fh) = get_base_card("주방")
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2 + 10

    # Pot & Cake
    draw.rectangle([cx - 140, cy - 20, cx + 140, cy + 180], fill=(210, 225, 240), outline=(255, 215, 0), width=6)
    draw.ellipse([cx - 160, cy - 40, cx + 160, cy + 20], fill=(170, 185, 200), outline=(255, 215, 0), width=6)
    draw.arc([cx - 50, cy - 130, cx - 15, cy - 50], 90, 270, fill=(255, 255, 255), width=8)
    draw.arc([cx + 15, cy - 130, cx + 50, cy - 50], 270, 90, fill=(255, 255, 255), width=8)

    save_card(img, "kitchen.png")

# 2. Hall (현관홀)
def make_hall():
    img, (fx, fy, fw, fh) = get_base_card("현관홀")
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2 + 10

    draw.rectangle([cx - 120, cy - 90, cx + 120, cy + 200], fill=(120, 80, 50), outline=(255, 215, 0), width=6)
    draw.chord([cx - 120, cy - 210, cx + 120, cy + 30], 180, 360, fill=(120, 80, 50), outline=(255, 215, 0), width=6)
    draw.ellipse([cx + 50, cy + 30, cx + 80, cy + 60], fill=(255, 215, 0), outline=(20, 20, 30), width=4)
    draw.polygon([(cx - 70, cy + 200), (cx + 70, cy + 200), (cx + 150, cy + 260), (cx - 150, cy + 260)], fill=(220, 40, 50), outline=(255, 215, 0), width=4)

    save_card(img, "hall.png")

# 3. Diningroom (식당)
def make_diningroom():
    img, (fx, fy, fw, fh) = get_base_card("식당")
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2 + 10

    draw.rectangle([cx - 160, cy + 30, cx + 160, cy + 130], fill=(140, 95, 60), outline=(255, 215, 0), width=6)
    draw.chord([cx - 90, cy - 110, cx + 90, cy + 30], 180, 360, fill=(230, 230, 245), outline=(255, 215, 0), width=6)
    draw.ellipse([cx - 18, cy - 135, cx + 18, cy - 105], fill=(255, 215, 0))

    save_card(img, "diningroom.png")

# 4. Lounge (응접실)
def make_lounge():
    img, (fx, fy, fw, fh) = get_base_card("응접실")
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2 + 10

    draw.rectangle([cx - 140, cy - 150, cx + 140, cy + 180], fill=(180, 80, 50), outline=(255, 215, 0), width=6)
    draw.polygon([(cx - 45, cy + 180), (cx, cy + 40), (cx + 45, cy + 180)], fill=(255, 70, 0))

    save_card(img, "lounge.png")

# 5. Study (집무실)
def make_study():
    img, (fx, fy, fw, fh) = get_base_card("집무실")
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2 + 10

    draw.ellipse([cx - 120, cy - 150, cx + 20, cy - 10], fill=(50, 160, 255), outline=(255, 215, 0), width=6)
    draw.rectangle([cx - 160, cy + 40, cx + 160, cy + 180], fill=(130, 85, 50), outline=(255, 215, 0), width=6)

    save_card(img, "study.png")

# 6. Billiardroom (당구실)
def make_billiardroom():
    img, (fx, fy, fw, fh) = get_base_card("당구실")
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2 + 10

    draw.rectangle([cx - 170, cy - 90, cx + 170, cy + 170], fill=(130, 75, 30), outline=(255, 215, 0), width=10)
    draw.rectangle([cx - 140, cy - 60, cx + 140, cy + 140], fill=(16, 185, 129))
    draw.ellipse([cx - 20, cy + 30, cx + 20, cy + 70], fill=(30, 41, 59), outline=(20, 20, 30), width=3)

    save_card(img, "billiardroom.png")

# 7. Card Back (cardback.png)
def make_cardback():
    img = Image.new("RGBA", (W, H), (18, 15, 45, 255))
    draw = ImageDraw.Draw(img)

    draw.rectangle([0, 0, W, H], outline=(40, 25, 80, 255), width=16)
    draw.rectangle([8, 8, W - 8, H - 8], outline=(255, 215, 0, 255), width=5)
    draw.rectangle([14, 14, W - 14, H - 14], outline=(80, 50, 140, 255), width=3)

    for x in range(50, W - 40, 70):
        for y in range(50, H - 40, 70):
            draw.polygon([(x, y - 16), (x + 16, y), (x, y + 16), (x - 16, y)], fill=(28, 22, 60, 255), outline=(255, 215, 0, 100), width=2)

    cx, cy = W // 2, H // 2

    draw.ellipse([cx - 210, cy - 250, cx + 210, cy + 250], fill=(24, 20, 55, 240), outline=(255, 215, 0, 255), width=8)

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
    make_kitchen()
    make_hall()
    make_diningroom()
    make_lounge()
    make_study()
    make_billiardroom()
    make_cardback()
    print("All 7 remaining cards complete!")

if __name__ == "__main__":
    main()
