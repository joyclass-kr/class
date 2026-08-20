import os
from PIL import Image

BRAIN_DIR = r"C:\Users\A\.gemini\antigravity\brain\4006ea5b-1079-4178-a78f-9312412ff3a0"
OUT_DIR = r"E:\webprojects\class\learning\games\clue\assets\images\cards"
os.makedirs(OUT_DIR, exist_ok=True)

# Original clean 12 AI illustration cards mapping
RESTORE_MAP = {
    "card_antiquarian_cool_1787194602001.jpg": "antiquarian.png",
    "card_ballroom_cute_1787196481770.jpg": "ballroom.png",
    "card_butler_cool_1787193951260.jpg": "butler.png",
    "card_conservatory_cute_1787196466612.jpg": "conservatory.png",
    "card_countess_cool_1787193936925.jpg": "countess.png",
    "card_flashlight_clean_1787195960339.jpg": "flashlight.png",
    "card_gardener_cool_1787194511319.jpg": "gardener.png",
    "card_glasscutter_clean_1787195982856.jpg": "glasscutter.png",
    "card_library_cute_1787196847361.jpg": "library.png",
    "card_masterkey_clean_1787195970866.jpg": "masterkey.png",
    "card_physician_cool_1787193191597.jpg": "physician.png",
    "card_wrench_cute_1787195547582.jpg": "wrench.png",
}

print("Restoring 12 original AI cards...")
for src_name, dst_name in RESTORE_MAP.items():
    src_path = os.path.join(BRAIN_DIR, src_name)
    dst_path = os.path.join(OUT_DIR, dst_name)
    if os.path.exists(src_path):
        img = Image.open(src_path).convert("RGBA").resize((600, 800), Image.Resampling.LANCZOS)
        img.save(dst_path, "PNG")
        print(f"Restored original: {dst_name}")

print("12 original cards perfectly restored!")
