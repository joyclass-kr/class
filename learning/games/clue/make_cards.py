import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

BRAIN_DIR = r"C:\Users\A\.gemini\antigravity\brain\4006ea5b-1079-4178-a78f-9312412ff3a0"
OUT_DIR = r"E:\webprojects\class\learning\games\clue\assets\images\cards"
os.makedirs(OUT_DIR, exist_ok=True)

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

def render_card_header(draw, title_text):
    # Erase top typo title box area with dark purple night sky color
    erase_box = [75, 45, W - 75, 155]
    draw.rectangle(erase_box, fill=(24, 18, 52, 255))

    # Add starry stars back into header
    draw_star(draw, 115, 75, 12, 5, fill=(255, 225, 0, 255))
    draw_star(draw, W - 115, 75, 12, 5, fill=(255, 225, 0, 255))
    draw_star(draw, 145, 135, 8, 3, fill=(255, 255, 255, 220))
    draw_star(draw, W - 145, 135, 8, 3, fill=(255, 255, 255, 220))

    # Render 3D Bubble Title Text
    font_size = int(W * 0.15) if len(title_text) <= 2 else int(W * 0.12)
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

    # Multi-color Pop Fill (Cyan -> Yellow -> Pink -> Orange)
    colors = [(60, 200, 255), (255, 220, 0), (255, 110, 180), (255, 150, 0)]
    curr_x = tx
    for i, char in enumerate(title_text):
        c_color = colors[i % len(colors)]
        draw.text((curr_x, ty), char, fill=c_color, font=font)
        c_bbox = font.getbbox(char)
        curr_x += (c_bbox[2] - c_bbox[0])

    draw_star(draw, tx - 28, ty + th // 2, 14, 6, fill=(255, 255, 255), outline=(20, 20, 30))
    draw_star(draw, tx + tw + 28, ty + th // 2, 14, 6, fill=(255, 255, 255), outline=(20, 20, 30))

def process_ai_card_with_title(src_filename, dst_filename, title_text):
    src_path = os.path.join(BRAIN_DIR, src_filename)
    dst_path = os.path.join(OUT_DIR, dst_filename)
    img = Image.open(src_path).convert("RGBA").resize((W, H), Image.Resampling.LANCZOS)
    draw = ImageDraw.Draw(img)
    render_card_header(draw, title_text)
    img.save(dst_path, "PNG")
    print(f"Processed AI card saved: {dst_filename} ('{title_text}')")

def create_base_room_card(title_text):
    template_path = os.path.join(BRAIN_DIR, "card_conservatory_cute_1787196466612.jpg")
    img = Image.open(template_path).convert("RGBA").resize((W, H), Image.Resampling.LANCZOS)
    draw = ImageDraw.Draw(img)

    # Illustration Window area inside frame
    win = [46, 142, W - 46, H - 56]
    
    # Clip/Fill window background with deep starry violet
    window_img = Image.new("RGBA", (win[2] - win[0], win[3] - win[1]), (26, 20, 56, 255))
    w_draw = ImageDraw.Draw(window_img)
    
    return img, draw, window_img, w_draw, win

def finalize_room_card(img, draw, window_img, win, dst_filename, title_text):
    # Mask window corners gracefully
    mask = Image.new("L", (win[2] - win[0], win[3] - win[1]), 0)
    m_draw = ImageDraw.Draw(mask)
    m_draw.rounded_rectangle([0, 0, win[2] - win[0], win[3] - win[1]], radius=20, fill=255)
    
    img.paste(window_img, (win[0], win[1]), mask)
    draw.rounded_rectangle(win, radius=20, outline=(255, 215, 0, 255), width=4)
    draw.rounded_rectangle([win[0]-3, win[1]-3, win[2]+3, win[3]+3], radius=23, outline=(45, 30, 95, 255), width=3)
    
    render_card_header(draw, title_text)
    
    dst_path = os.path.join(OUT_DIR, dst_filename)
    img.save(dst_path, "PNG")
    print(f"Room card saved: {dst_filename} ('{title_text}')")

# --- ROOM CARDS CREATION ---

def make_hall():
    img, draw, w_img, w_draw, win = create_base_room_card("현관홀")
    ww, wh = win[2] - win[0], win[3] - win[1]
    cx = ww // 2
    
    # Wall background
    for y in range(wh):
        r = int(35 + (y / wh) * 45)
        g = int(25 + (y / wh) * 35)
        b = int(75 + (y / wh) * 40)
        w_draw.line([(0, y), (ww, y)], fill=(r, g, b, 255))
        
    # Grand Arched Doorway
    door_w, door_h = 240, 360
    dx1, dy1 = cx - door_w // 2, wh - 180 - door_h
    w_draw.rectangle([dx1, dy1 + 100, dx1 + door_w, wh - 80], fill=(110, 65, 35), outline=(255, 215, 0), width=6)
    w_draw.chord([dx1, dy1, dx1 + door_w, dy1 + 200], 180, 360, fill=(110, 65, 35), outline=(255, 215, 0), width=6)
    
    # Inner Arch
    w_draw.rectangle([dx1 + 20, dy1 + 110, dx1 + door_w - 20, wh - 80], fill=(70, 38, 20), outline=(180, 120, 50), width=4)
    w_draw.chord([dx1 + 20, dy1 + 20, dx1 + door_w - 20, dy1 + 180], 180, 360, fill=(70, 38, 20), outline=(180, 120, 50), width=4)
    
    # Gold door handles
    w_draw.ellipse([cx - 25, dy1 + 220, cx - 5, dy1 + 240], fill=(255, 215, 0), outline=(20, 20, 30), width=3)
    w_draw.ellipse([cx + 5, dy1 + 220, cx + 25, dy1 + 240], fill=(255, 215, 0), outline=(20, 20, 30), width=3)

    # Red Carpet running down
    w_draw.polygon([(cx - 70, wh - 80), (cx + 70, wh - 80), (cx + 170, wh), (cx - 170, wh)], fill=(210, 35, 50), outline=(255, 215, 0), width=5)

    # Grandfather Clock on Left
    gx = cx - 180
    w_draw.rectangle([gx - 35, wh - 340, gx + 35, wh - 80], fill=(130, 80, 40), outline=(20, 20, 30), width=4)
    w_draw.ellipse([gx - 30, wh - 330, gx + 30, wh - 270], fill=(255, 250, 220), outline=(20, 20, 30), width=4)
    w_draw.ellipse([gx - 8, wh - 308, gx + 8, wh - 292], fill=(40, 30, 20)) # Clock face center
    w_draw.line([(gx, wh - 260), (gx, wh - 140)], fill=(255, 215, 0), width=4) # Pendulum
    w_draw.ellipse([gx - 18, wh - 150, gx + 18, wh - 114], fill=(255, 215, 0)) # Pendulum bob

    # Coat Rack & Top Hat on Right
    rx = cx + 180
    w_draw.line([(rx, wh - 320), (rx, wh - 80)], fill=(90, 50, 25), width=8)
    w_draw.rectangle([rx - 30, wh - 340, rx + 30, wh - 290], fill=(30, 30, 45), outline=(255, 215, 0), width=3) # Hat

    # Floating Sparkles
    draw_sparkle(w_draw, cx - 110, wh - 320, 22, fill=(255, 255, 200, 240))
    draw_sparkle(w_draw, cx + 110, wh - 300, 18, fill=(255, 255, 200, 240))

    finalize_room_card(img, draw, w_img, win, "hall.png", "현관홀")

def make_diningroom():
    img, draw, w_img, w_draw, win = create_base_room_card("식당")
    ww, wh = win[2] - win[0], win[3] - win[1]
    cx = ww // 2

    # Background wall
    for y in range(wh):
        r = int(60 + (y / wh) * 40)
        g = int(20 + (y / wh) * 20)
        b = int(35 + (y / wh) * 30)
        w_draw.line([(0, y), (ww, y)], fill=(r, g, b, 255))

    # Chandelier
    w_draw.line([(cx, 0), (cx, 90)], fill=(255, 215, 0), width=6)
    w_draw.arc([cx - 110, 40, cx + 110, 140], 0, 180, fill=(255, 215, 0), width=10)
    for x in [cx - 90, cx - 40, cx, cx + 40, cx + 90]:
        w_draw.rectangle([x - 8, 50, x + 8, 90], fill=(255, 250, 230), outline=(20, 20, 30), width=2)
        w_draw.ellipse([x - 12, 25, x + 12, 55], fill=(255, 200, 40))

    # Dining Table
    w_draw.rectangle([40, wh - 220, ww - 40, wh - 100], fill=(130, 80, 45), outline=(255, 215, 0), width=6)
    w_draw.rectangle([60, wh - 100, 100, wh - 10], fill=(90, 50, 30), outline=(20, 20, 30), width=4)
    w_draw.rectangle([ww - 100, wh - 100, ww - 60, wh - 10], fill=(90, 50, 30), outline=(20, 20, 30), width=4)

    # Silver Cloche Platter
    w_draw.ellipse([cx - 130, wh - 250, cx + 130, wh - 190], fill=(220, 225, 235), outline=(150, 160, 180), width=5)
    w_draw.chord([cx - 110, wh - 380, cx + 110, wh - 220], 180, 360, fill=(240, 245, 255), outline=(180, 190, 210), width=6)
    w_draw.ellipse([cx - 20, wh - 400, cx + 20, wh - 370], fill=(255, 215, 0), outline=(20, 20, 30), width=4)

    # Wine glasses
    w_draw.polygon([(cx - 180, wh - 270), (cx - 160, wh - 270), (cx - 170, wh - 220)], fill=(255, 80, 100, 200))
    w_draw.polygon([(cx + 160, wh - 270), (cx + 180, wh - 270), (cx + 170, wh - 220)], fill=(255, 80, 100, 200))

    draw_sparkle(w_draw, cx - 60, wh - 340, 20)
    draw_sparkle(w_draw, cx + 60, wh - 340, 20)

    finalize_room_card(img, draw, w_img, win, "diningroom.png", "식당")

def make_lounge():
    img, draw, w_img, w_draw, win = create_base_room_card("응접실")
    ww, wh = win[2] - win[0], win[3] - win[1]
    cx = ww // 2

    # Background wall
    for y in range(wh):
        r = int(55 + (y / wh) * 45)
        g = int(30 + (y / wh) * 30)
        b = int(20 + (y / wh) * 20)
        w_draw.line([(0, y), (ww, y)], fill=(r, g, b, 255))

    # Fireplace
    fw, fh = 260, 280
    fx1, fy1 = cx - fw // 2, wh - 80 - fh
    w_draw.rectangle([fx1, fy1, fx1 + fw, fy1 + fh], fill=(170, 75, 45), outline=(255, 215, 0), width=6)
    w_draw.rectangle([fx1 + 35, fy1 + 60, fx1 + fw - 35, fy1 + fh], fill=(30, 20, 20)) # Hearth opening

    # Fire Flames with cute spirit eyes
    w_draw.polygon([(cx - 70, fy1 + fh), (cx, fy1 + 90), (cx + 70, fy1 + fh)], fill=(255, 70, 20))
    w_draw.polygon([(cx - 40, fy1 + fh), (cx, fy1 + 130), (cx + 40, fy1 + fh)], fill=(255, 215, 0))
    w_draw.ellipse([cx - 20, fy1 + 150, cx - 8, fy1 + 166], fill=(20, 20, 30)) # Eye L
    w_draw.ellipse([cx + 8, fy1 + 150, cx + 20, fy1 + 166], fill=(20, 20, 30)) # Eye R

    # Plush Armchairs on sides
    w_draw.rounded_rectangle([20, wh - 220, 110, wh - 50], radius=16, fill=(180, 40, 60), outline=(20, 20, 30), width=4)
    w_draw.rounded_rectangle([ww - 110, wh - 220, ww - 20, wh - 50], radius=16, fill=(180, 40, 60), outline=(20, 20, 30), width=4)

    # Teacup on mantelpiece
    w_draw.rectangle([cx - 25, fy1 - 30, cx + 25, fy1], fill=(255, 255, 255), outline=(20, 20, 30), width=3)
    w_draw.arc([cx - 10, fy1 - 60, cx + 10, fy1 - 30], 90, 270, fill=(255, 255, 255), width=4) # Steam

    draw_sparkle(w_draw, cx - 110, fy1 + 40, 20, fill=(255, 220, 100, 240))
    draw_sparkle(w_draw, cx + 110, fy1 + 40, 20, fill=(255, 220, 100, 240))

    finalize_room_card(img, draw, w_img, win, "lounge.png", "응접실")

def make_study():
    img, draw, w_img, w_draw, win = create_base_room_card("집무실")
    ww, wh = win[2] - win[0], win[3] - win[1]
    cx = ww // 2

    # Background wall
    for y in range(wh):
        r = int(20 + (y / wh) * 20)
        g = int(35 + (y / wh) * 35)
        b = int(65 + (y / wh) * 45)
        w_draw.line([(0, y), (ww, y)], fill=(r, g, b, 255))

    # Bookshelf backdrop
    w_draw.rectangle([30, 40, ww - 30, wh - 220], fill=(100, 65, 40), outline=(160, 110, 70), width=6)
    for row_y in [120, 200, 280]:
        w_draw.line([(30, row_y), (ww - 30, row_y)], fill=(160, 110, 70), width=6)
        colors = [(210, 50, 60), (40, 150, 80), (30, 120, 210), (230, 170, 40), (160, 60, 180)]
        for i, c in enumerate(colors):
            bx = 50 + i * 40
            w_draw.rectangle([bx, row_y - 70, bx + 32, row_y - 4], fill=c, outline=(20, 20, 30), width=2)
            bx2 = ww - 230 + i * 40
            w_draw.rectangle([bx2, row_y - 70, bx2 + 32, row_y - 4], fill=c, outline=(20, 20, 30), width=2)

    # Executive Desk
    w_draw.rectangle([40, wh - 210, ww - 40, wh - 90], fill=(120, 75, 45), outline=(255, 215, 0), width=6)
    w_draw.rectangle([60, wh - 90, 110, wh - 10], fill=(80, 45, 25), outline=(20, 20, 30), width=4)
    w_draw.rectangle([ww - 110, wh - 90, ww - 60, wh - 10], fill=(80, 45, 25), outline=(20, 20, 30), width=4)

    # Globe on Stand
    gx, gy = cx - 110, wh - 290
    w_draw.ellipse([gx - 45, gy - 45, gx + 45, gy + 45], fill=(40, 140, 230), outline=(255, 215, 0), width=5)
    w_draw.arc([gx - 45, gy - 45, gx + 45, gy + 45], 30, 150, fill=(50, 180, 90), width=14)
    w_draw.line([(gx, gy + 45), (gx, gy + 80)], fill=(255, 215, 0), width=6)

    # Magnifying Glass & Feather Quill
    w_draw.ellipse([cx + 60, wh - 270, cx + 120, wh - 210], outline=(255, 215, 0), width=6)
    w_draw.line([(cx + 105, wh - 225), (cx + 140, wh - 190)], fill=(255, 215, 0), width=10)
    w_draw.line([(cx - 10, wh - 210), (cx + 30, wh - 300)], fill=(255, 255, 255), width=6) # Quill

    draw_sparkle(w_draw, cx + 90, wh - 240, 20)

    finalize_room_card(img, draw, w_img, win, "study.png", "집무실")

def make_billiardroom():
    img, draw, w_img, w_draw, win = create_base_room_card("당구실")
    ww, wh = win[2] - win[0], win[3] - win[1]
    cx = ww // 2

    # Background wall
    for y in range(wh):
        r = int(15 + (y / wh) * 20)
        g = int(45 + (y / wh) * 45)
        b = int(35 + (y / wh) * 35)
        w_draw.line([(0, y), (ww, y)], fill=(r, g, b, 255))

    # Overhead Lamp casting spotlight
    w_draw.polygon([(cx - 120, 0), (cx + 120, 0), (cx + 180, wh - 250), (cx - 180, wh - 250)], fill=(255, 255, 200, 30))
    w_draw.polygon([(cx - 90, 20), (cx + 90, 20), (cx + 120, 80), (cx - 120, 80)], fill=(30, 120, 70), outline=(255, 215, 0), width=4)

    # Billiard Table Frame & Felt
    w_draw.rectangle([40, wh - 260, ww - 40, wh - 60], fill=(120, 70, 35), outline=(255, 215, 0), width=8)
    w_draw.rectangle([60, wh - 240, ww - 60, wh - 80], fill=(16, 170, 110), outline=(10, 110, 70), width=4)

    # Corner pockets
    for px, py in [(60, wh - 240), (ww - 60, wh - 240), (60, wh - 80), (ww - 60, wh - 80)]:
        w_draw.ellipse([px - 14, py - 14, px + 14, py + 14], fill=(20, 20, 30))

    # Billiard Balls with cute eyes
    balls = [
        (cx - 40, wh - 170, (255, 215, 0)), # 1 Yellow
        (cx + 20, wh - 170, (230, 50, 60)), # 3 Red
        (cx - 10, wh - 120, (30, 40, 60)),  # 8 Black
    ]
    for bx, by, bcol in balls:
        w_draw.ellipse([bx - 22, by - 22, bx + 22, by + 22], fill=bcol, outline=(20, 20, 30), width=3)
        w_draw.ellipse([bx - 8, by - 12, bx - 2, by - 4], fill=(255, 255, 255)) # Shine

    # Crossed Cues behind table
    w_draw.line([(30, wh - 300), (ww - 30, wh - 20)], fill=(210, 140, 60), width=8)
    w_draw.line([(ww - 30, wh - 300), (30, wh - 20)], fill=(210, 140, 60), width=8)

    draw_sparkle(w_draw, cx - 80, wh - 160, 18)
    draw_sparkle(w_draw, cx + 80, wh - 160, 18)

    finalize_room_card(img, draw, w_img, win, "billiardroom.png", "당구실")

def make_cardback():
    img = Image.new("RGBA", (W, H), (18, 14, 42, 255))
    draw = ImageDraw.Draw(img)

    # Outer Frame
    draw.rectangle([0, 0, W, H], outline=(42, 28, 85, 255), width=16)
    draw.rectangle([8, 8, W - 8, H - 8], outline=(255, 215, 0, 255), width=5)
    draw.rectangle([14, 14, W - 14, H - 14], outline=(80, 50, 140, 255), width=3)

    # Diamond Pattern Background
    for x in range(40, W - 30, 60):
        for y in range(40, H - 30, 60):
            draw.polygon([(x, y - 15), (x + 15, y), (x, y + 15), (x - 15, y)], outline=(255, 215, 0, 45), width=2)

    cx, cy = W // 2, H // 2

    # Central Oval Crest
    draw.ellipse([cx - 210, cy - 250, cx + 210, cy + 250], fill=(26, 20, 56, 245), outline=(255, 215, 0, 255), width=8)
    draw.ellipse([cx - 190, cy - 230, cx + 190, cy + 230], outline=(255, 255, 255, 100), width=3)

    # Top Hat & Bow tie icon
    draw.ellipse([cx - 110, cy - 65, cx + 110, cy - 20], fill=(255, 215, 0))
    draw.rectangle([cx - 65, cy - 165, cx + 65, cy - 45], fill=(255, 215, 0))

    # Magnifying Glass with big Question Mark (?)
    draw.ellipse([cx - 85, cy - 20, cx + 85, cy + 150], fill=(255, 255, 255, 240), outline=(255, 215, 0, 255), width=12)
    draw.line([(cx + 60, cy + 120), (cx + 140, cy + 200)], fill=(255, 215, 0), width=18)

    font_title = get_font(84)
    bbox = font_title.getbbox("?")
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((cx - tw // 2, cy + 65 - th // 2), "?", fill=(230, 30, 60, 255), font=font_title)

    # Title "저택 추리"
    back_title = "저택 추리"
    bbox = font_title.getbbox(back_title)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx, ty = (W - tw) // 2, cy - 340
    for dx in range(-6, 7):
        for dy in range(-6, 7):
            if dx*dx + dy*dy <= 36:
                draw.text((tx + dx, ty + dy), back_title, fill=(20, 15, 40, 255), font=font_title)
    draw.text((tx, ty), back_title, fill=(255, 215, 0, 255), font=font_title)

    # Subtitle "MANOR MYSTERY"
    font_sub = get_font(42)
    back_sub = "MANOR MYSTERY"
    bbox = font_sub.getbbox(back_sub)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((W - tw) // 2, cy + 280), back_sub, fill=(255, 215, 0, 255), font=font_sub)

    # Corner stars
    draw_star(draw, 40, 40, 20, 9, fill=(255, 225, 0, 255))
    draw_star(draw, W - 40, 40, 20, 9, fill=(255, 225, 0, 255))
    draw_star(draw, 40, H - 40, 20, 9, fill=(255, 225, 0, 255))
    draw_star(draw, W - 40, H - 40, 20, 9, fill=(255, 225, 0, 255))

    dst_path = os.path.join(OUT_DIR, "cardback.png")
    img.save(dst_path, "PNG")
    print("Card back saved: cardback.png")

def main():
    print("Generating all 10 cards to match exact deck visual tone...")

    # 1. Process 4 AI Illustration cards with corrected clean Korean titles
    process_ai_card_with_title("card_dancer_cool_1787194669565.jpg", "dancer.png", "무희")
    process_ai_card_with_title("card_candlestick_cute_1787195524439.jpg", "candlestick.png", "촛대")
    process_ai_card_with_title("card_rope_clean_1787195950551.jpg", "rope.png", "밧줄")
    process_ai_card_with_title("card_kitchen_cute_1787196492771.jpg", "kitchen.png", "주방")

    # 2. Generate 5 Room cards with AI frame base & custom cute vector illustrations
    make_hall()
    make_diningroom()
    make_lounge()
    make_study()
    make_billiardroom()

    # 3. Generate Card Back
    make_cardback()

    print("All 10 requested cards generated successfully!")

if __name__ == "__main__":
    main()
