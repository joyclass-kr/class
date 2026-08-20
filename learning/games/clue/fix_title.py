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

def fix_title(src_path, dst_filename, title_text):
    out_dir = r"E:\webprojects\class\learning\games\clue\assets\images\cards"
    dst_path = os.path.join(out_dir, dst_filename)

    img = Image.open(src_path).convert("RGBA")
    w, h = img.size
    draw = ImageDraw.Draw(img)

    # 1. Clean the top title text bubble area (top 8% to 22% of image)
    # The reference card has a dark purple starry sky at the top.
    # We cover the bad text area smoothly with dark purple starry night background.
    title_area_y1 = int(h * 0.08)
    title_area_y2 = int(h * 0.25)

    # Draw dark purple fill over old bad text bubble
    draw.rectangle([int(w * 0.12), title_area_y1, int(w * 0.88), title_area_y2], fill=(28, 20, 58, 255))

    # Add cute stars around the title area to blend seamlessly with background
    draw_star(draw, int(w * 0.16), int(h * 0.12), 16, 7, fill=(255, 225, 0, 255))
    draw_star(draw, int(w * 0.84), int(h * 0.12), 16, 7, fill=(255, 225, 0, 255))
    draw_star(draw, int(w * 0.20), int(h * 0.22), 12, 5, fill=(255, 255, 255, 230))
    draw_star(draw, int(w * 0.80), int(h * 0.22), 12, 5, fill=(255, 255, 255, 230))

    # 2. Render 100% PERFECT 3D Bubble Korean Title Text
    font_size = int(w * 0.15) if len(title_text) <= 3 else int(w * 0.12)
    font = get_font(font_size)

    bbox = font.getbbox(title_text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (w - tw) // 2
    ty = title_area_y1 + (title_area_y2 - title_area_y1 - th) // 2 - 5

    # Black 3D Drop Shadow
    for offset in range(1, 10):
        draw.text((tx + offset, ty + offset), title_text, fill=(15, 10, 30, 255), font=font)

    # Thick White Bubble Stroke
    for dx in range(-11, 12):
        for dy in range(-11, 12):
            if dx*dx + dy*dy <= 121:
                draw.text((tx + dx, ty + dy), title_text, fill=(255, 255, 255, 255), font=font)

    # Dark Outline around white border
    for dx in range(-14, 15):
        for dy in range(-14, 15):
            if 121 < dx*dx + dy*dy <= 196:
                draw.text((tx + dx, ty + dy), title_text, fill=(25, 20, 45, 255), font=font)

    # Foreground Vibrant Gradient simulation (Cyan -> Yellow -> Pink/Orange)
    # Character by character color pop!
    colors = [
        (60, 200, 255, 255),   # Cyan / Blue
        (255, 220, 0, 255),    # Golden Yellow
        (255, 100, 150, 255),  # Hot Pink
        (255, 140, 0, 255),    # Orange
    ]

    # Draw title text per character with vibrant pop colors!
    curr_x = tx
    for i, char in enumerate(title_text):
        c_color = colors[i % len(colors)]
        draw.text((curr_x, ty), char, fill=c_color, font=font)
        c_bbox = font.getbbox(char)
        curr_x += (c_bbox[2] - c_bbox[0])

    # Resize to standard card dimensions (600 x 800)
    resized = img.resize((600, 800), Image.Resampling.LANCZOS)
    resized.save(dst_path, "PNG")
    print(f"Fixed title card saved: {dst_filename} -> Title: '{title_text}'")

if __name__ == "__main__":
    if len(sys.argv) >= 4:
        fix_title(sys.argv[1], sys.argv[2], sys.argv[3])
