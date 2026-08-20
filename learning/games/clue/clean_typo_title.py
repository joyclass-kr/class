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

def fix_card_typo(src_filename, dst_filename, title_text):
    src_path = os.path.join(BRAIN_DIR, src_filename)
    dst_path = os.path.join(OUT_DIR, dst_filename)

    img = Image.open(src_path).convert("RGBA").resize((W, H), Image.Resampling.LANCZOS)
    draw = ImageDraw.Draw(img)

    # Seamlessly erase ONLY the title text bubble at top (y=45 to y=150)
    # Using starry dark purple night sky color (24, 18, 52)
    erase_box = [80, 45, W - 80, 155]
    draw.rectangle(erase_box, fill=(24, 18, 52, 255))

    # Add starry glints back into erased area
    draw_star(draw, 120, 75, 12, 5, fill=(255, 225, 0, 255))
    draw_star(draw, W - 120, 75, 12, 5, fill=(255, 225, 0, 255))
    draw_star(draw, 150, 135, 8, 3, fill=(255, 255, 255, 220))
    draw_star(draw, W - 150, 135, 8, 3, fill=(255, 255, 255, 220))

    # Draw 100% PERFECT 3D Bubble Title Text ("촛대", "무희")
    font_size = int(W * 0.16) if len(title_text) <= 2 else int(W * 0.13)
    font = get_font(font_size)

    bbox = font.getbbox(title_text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (W - tw) // 2
    ty = 60

    # 3D Drop Shadow
    for offset in range(1, 8):
        draw.text((tx + offset, ty + offset), title_text, fill=(15, 10, 30, 255), font=font)

    # Thick White Bubble Outline
    for dx in range(-10, 11):
        for dy in range(-10, 11):
            if dx*dx + dy*dy <= 100:
                draw.text((tx + dx, ty + dy), title_text, fill=(255, 255, 255, 255), font=font)

    # Dark Outline around white
    for dx in range(-13, 14):
        for dy in range(-13, 14):
            if 100 < dx*dx + dy*dy <= 169:
                draw.text((tx + dx, ty + dy), title_text, fill=(25, 15, 45, 255), font=font)

    # Multi-color Pop Fill (Cyan -> Yellow -> Pink)
    colors = [(60, 200, 255), (255, 220, 0), (255, 110, 180), (255, 150, 0)]
    curr_x = tx
    for i, char in enumerate(title_text):
        c_color = colors[i % len(colors)]
        draw.text((curr_x, ty), char, fill=c_color, font=font)
        c_bbox = font.getbbox(char)
        curr_x += (c_bbox[2] - c_bbox[0])

    draw_star(draw, tx - 28, ty + th // 2, 14, 6, fill=(255, 255, 255), outline=(20, 20, 30))
    draw_star(draw, tx + tw + 28, ty + th // 2, 14, 6, fill=(255, 255, 255), outline=(20, 20, 30))

    img.save(dst_path, "PNG")
    print(f"Fixed card saved seamlessly: {dst_filename} -> '{title_text}'")

def main():
    # Fix candlestick -> "촛대"
    fix_card_typo("card_candlestick_cute_1787195524439.jpg", "candlestick.png", "촛대")
    # Fix dancer -> "무희"
    fix_card_typo("card_dancer_cool_1787194669565.jpg", "dancer.png", "무희")
    # Fix rope -> "밧줄"
    fix_card_typo("card_rope_clean_1787195950551.jpg", "rope.png", "밧줄")

if __name__ == "__main__":
    main()
