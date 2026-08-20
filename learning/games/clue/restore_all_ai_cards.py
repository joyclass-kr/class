import os
from PIL import Image

BRAIN_DIR = r"C:\Users\A\.gemini\antigravity\brain\4006ea5b-1079-4178-a78f-9312412ff3a0"
OUT_DIR = r"E:\webprojects\class\learning\games\clue\assets\images\cards"
os.makedirs(OUT_DIR, exist_ok=True)

MAPPING = {
    "countess.png": "card_countess_cool_1787193936925.jpg",
    "butler.png": "card_butler_cool_1787193951260.jpg",
    "gardener.png": "card_gardener_cool_1787194511319.jpg",
    "physician.png": "card_physician_cool_1787193191597.jpg",
    "antiquarian.png": "card_antiquarian_cool_1787194602001.jpg",
    "dancer.png": "card_dancer_cool_1787194669565.jpg",
    "candlestick.png": "card_candlestick_cute_1787195524439.jpg",
    "rope.png": "card_rope_clean_1787195950551.jpg",
    "wrench.png": "card_wrench_cute_1787195547582.jpg",
    "flashlight.png": "card_flashlight_clean_1787195960339.jpg",
    "masterkey.png": "card_masterkey_clean_1787195970866.jpg",
    "glasscutter.png": "card_glasscutter_clean_1787195982856.jpg",
    "conservatory.png": "card_conservatory_cute_1787196466612.jpg",
    "ballroom.png": "card_ballroom_cute_1787196481770.jpg",
    "library.png": "card_library_cute_1787196847361.jpg",
}

for dst_file, src_file in MAPPING.items():
    src_path = os.path.join(BRAIN_DIR, src_file)
    dst_path = os.path.join(OUT_DIR, dst_file)
    if os.path.exists(src_path):
        img = Image.open(src_path).convert("RGBA")
        resized = img.resize((600, 800), Image.Resampling.LANCZOS)
        resized.save(dst_path, "PNG")
        print(f"Restored AI card: {dst_file}")
