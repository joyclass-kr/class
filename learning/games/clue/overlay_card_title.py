import sys
import os
import math
from PIL import Image, ImageDraw, ImageFont

FONT_PATH = "C:/Windows/Fonts/malgunbd.ttf"

def get_font(size):
    try:
        return ImageFont.truetype(FONT_PATH, size)
    except:
        return ImageFont.load_default()

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

def overlay_card_title(src_path, dst_filename, title_text, header_bg_mode="banner"):
    out_dir = r"E:\webprojects\class\learning\games\clue\assets\images\cards"
    dst_path = os.path.join(out_dir, dst_filename)

    img = Image.open(src_path).convert("RGBA")
    w, h = img.size
    draw = ImageDraw.Draw(img)

    # Header height is about 22% of card height
    header_h = int(h * 0.22)

    # 1. Clean top banner rect with dark starry indigo background matching reference frame
    top_rect = [0, 0, w, header_h]
    draw.rectangle(top_rect, fill=(25, 20, 55, 255))

    # Outer border frame restoration
    draw.rectangle([0, 0, w, h], outline=(40, 25, 80, 255), width=18)
    draw.rectangle([10, 10, w - 10, h - 10], outline=(255, 215, 0, 255), width=5)
    draw.line([(0, header_h), (w, header_h)], fill=(255, 215, 0, 255), width=5)

    # Corner stars
    draw_star(draw, 50, 50, 24, 11, fill=(255, 225, 0, 255))
    draw_star(draw, w - 50, 50, 24, 11, fill=(255, 225, 0, 255))

    # 2. Draw 100% PERFECT Bold 3D Bubble Korean Title Text
    font_size = int(w * 0.16) if len(title_text) <= 3 else int(w * 0.13)
    font = get_font(font_size)

    bbox = font.getbbox(title_text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (w - tw) // 2
    ty = (header_h - th) // 2 - 12

    # Black 3D Drop Shadow
    for offset in range(1, 10):
        draw.text((tx + offset, ty + offset), title_text, fill=(15, 10, 30, 255), font=font)

    # White Thick Outline
    for dx in range(-12, 13):
        for dy in range(-12, 13):
            if dx*dx + dy*dy <= 144:
                draw.text((tx + dx, ty + dy), title_text, fill=(255, 255, 255, 255), font=font)

    # Dark Outline around white
    for dx in range(-15, 16):
        for dy in range(-15, 16):
            if 144 < dx*dx + dy*dy <= 225:
                draw.text((tx + dx, ty + dy), title_text, fill=(20, 15, 40, 255), font=font)

    # Foreground Bright Yellow Fill with Pink Top Gradient simulation
    draw.text((tx, ty), title_text, fill=(255, 215, 0, 255), font=font)
    draw.text((tx - 2, ty - 2), title_text, fill=(255, 110, 180, 255), font=font)

    # Decorative sparkles around title
    draw_star(draw, tx - 45, ty + th // 2, 18, 8, fill=(255, 255, 255, 255), outline=(20, 20, 30, 255))
    draw_star(draw, tx + tw + 45, ty + th // 2, 18, 8, fill=(255, 255, 255, 255), outline=(20, 20, 30, 255))

    # Resize to standard card dimensions (600 x 800)
    resized = img.resize((600, 800), Image.Resampling.LANCZOS)
    resized.save(dst_path, "PNG")
    print(f"Card generated: {dst_filename} -> Title: '{title_text}'")

if __name__ == "__main__":
    if len(sys.argv) >= 4:
        overlay_card_title(sys.argv[1], sys.argv[2], sys.argv[3])
