import sys
import os
from PIL import Image

def convert_card(src_path, dst_filename):
    out_dir = r"E:\webprojects\class\learning\games\clue\assets\images\cards"
    dst_path = os.path.join(out_dir, dst_filename)
    img = Image.open(src_path)
    img = img.convert("RGBA")
    # Resize to standard card dimensions (600x900 or 600x800)
    resized = img.resize((600, 800), Image.Resampling.LANCZOS)
    resized.save(dst_path, "PNG")
    print(f"Successfully saved {dst_filename}")

if __name__ == "__main__":
    if len(sys.argv) >= 3:
        convert_card(sys.argv[1], sys.argv[2])
