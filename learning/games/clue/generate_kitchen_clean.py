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

def draw_bat_shape(draw, cx, cy, size=24, fill=(35, 25, 65, 255)):
    draw.ellipse([cx - size, cy - size//2, cx + size, cy + size//2], fill=fill)
    draw.polygon([(cx - size, cy), (cx - size*2, cy - size), (cx - size*1.2, cy + size//2)], fill=fill)
    draw.polygon([(cx + size, cy), (cx + size*2, cy - size), (cx + size*1.2, cy + size//2)], fill=fill)

def create_bat_card_base(title_text):
    img = Image.new("RGBA", (W, H), (20, 16, 45, 255))
    draw = ImageDraw.Draw(img)

    draw.rectangle([0, 0, W, H], outline=(45, 30, 95, 255), width=16)
    draw.rectangle([8, 8, W - 8, H - 8], outline=(255, 215, 0, 255), width=4)
    draw.rectangle([14, 14, W - 14, H - 14], outline=(80, 50, 140, 255), width=3)

    draw_star(draw, 40, 40, 20, 9, fill=(255, 225, 0, 255))
    draw_star(draw, W - 40, 40, 20, 9, fill=(255, 225, 0, 255))
    draw_star(draw, 40, H - 40, 20, 9, fill=(255, 225, 0, 255))
    draw_star(draw, W - 40, H - 40, 20, 9, fill=(255, 225, 0, 255))
    draw_bat_shape(draw, W - 50, 70, size=14)

    star_positions = [(100, 120), (500, 140), (80, 700), (520, 680), (150, 750), (450, 740), (70, 220), (530, 240)]
    for sx, sy in star_positions:
        draw_star(draw, sx, sy, 8, 4, fill=(255, 255, 255, 200), outline=None)

    font_size = int(W * 0.15) if len(title_text) <= 3 else int(W * 0.12)
    font = get_font(font_size)

    bbox = font.getbbox(title_text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (W - tw) // 2
    ty = 60

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

    return img, (60, 170, W - 120, H - 240)

def save_card(img, filename):
    path = os.path.join(OUTPUT_DIR, filename)
    img.save(path, "PNG")
    print(f"Clean card saved: {filename}")

# Kitchen (주방)
def make_kitchen():
    img, (fx, fy, fw, fh) = create_bat_card_base("주방")
    draw = ImageDraw.Draw(img)
    cx, cy = fx + fw // 2, fy + fh // 2 + 20

    # Pot & Cake
    draw.rectangle([cx - 150, cy - 20, cx + 150, cy + 180], fill=(210, 225, 240), outline=(255, 215, 0), width=6)
    draw.ellipse([cx - 170, cy - 40, cx + 170, cy + 20], fill=(170, 185, 200), outline=(255, 215, 0), width=6)
    # Steam
    draw.arc([cx - 60, cy - 140, cx - 20, cy - 50], 90, 270, fill=(255, 255, 255), width=10)
    draw.arc([cx + 20, cy - 140, cx + 60, cy - 50], 270, 90, fill=(255, 255, 255), width=10)
    save_card(img, "kitchen.png")

def main():
    make_kitchen()

if __name__ == "__main__":
    main()
