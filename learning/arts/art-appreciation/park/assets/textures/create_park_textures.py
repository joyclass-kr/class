import math
from pathlib import Path
import numpy as np
from PIL import Image

TARGET_DIR = Path(r"e:\webprojects\class\learning\arts\art-appreciation\park\assets\textures")
TARGET_DIR.mkdir(parents=True, exist_ok=True)

# Also copy generated grass image if exists
brain_grass = Path(r"C:\Users\A\.gemini\antigravity\brain\6cc2e364-83ca-446c-984a-29f8c88bf798\park_grass_albedo_1785940837435.jpg")
if brain_grass.exists():
    img = Image.open(brain_grass)
    img.save(TARGET_DIR / "grass-albedo.jpg", quality=92)
    # Generate bump map from grass
    gray = np.array(img.convert("L"), dtype=np.float32)
    gx, gy = np.gradient(gray)
    bump = np.clip(128 + (gx + gy) * 1.5, 0, 255).astype(np.uint8)
    Image.fromarray(bump).save(TARGET_DIR / "grass-bump.jpg", quality=90)
    print("Grass textures generated from AI image!")

# 2. Generate Stone Path Albedo & Bump Texture (1024x1024)
w, h = 1024, 1024
np.random.seed(42)

# Base warm stone gravel color #a89880 -> RGB (168, 152, 128)
base_path = np.zeros((h, w, 3), dtype=np.float32)
base_path[:, :] = [168, 152, 128]

# Add multi-scale perlin-like noise for natural stone grain
x_coords = np.linspace(0, 16 * math.pi, w)
y_coords = np.linspace(0, 16 * math.pi, h)
xx, yy = np.meshgrid(x_coords, y_coords)

stone_grain = (
    np.sin(xx * 2 + yy * 3) * 12 +
    np.cos(xx * 5 - yy * 4) * 8 +
    np.random.normal(0, 10, (h, w))
)

for c in range(3):
    base_path[:, :, c] = np.clip(base_path[:, :, c] + stone_grain, 0, 255)

path_img = Image.fromarray(base_path.astype(np.uint8))
path_img.save(TARGET_DIR / "stone-path-albedo.jpg", quality=92)

# Path bump map
gx, gy = np.gradient(stone_grain)
path_bump = np.clip(128 + (gx + gy) * 3.0, 0, 255).astype(np.uint8)
Image.fromarray(path_bump).save(TARGET_DIR / "stone-path-bump.jpg", quality=90)
print("Stone path textures generated!")

# 3. Generate Dark Charcoal Granite Pedestal Texture (1024x1024)
base_granite = np.zeros((h, w, 3), dtype=np.float32)
base_granite[:, :] = [45, 48, 47] # #2d302f

granite_grain = (
    np.sin(xx * 8 + yy * 6) * 6 +
    np.cos(xx * 12 - yy * 10) * 5 +
    np.random.normal(0, 8, (h, w))
)

for c in range(3):
    base_granite[:, :, c] = np.clip(base_granite[:, :, c] + granite_grain, 0, 255)

granite_img = Image.fromarray(base_granite.astype(np.uint8))
granite_img.save(TARGET_DIR / "granite-pedestal-albedo.jpg", quality=92)

# Granite bump map
gx, gy = np.gradient(granite_grain)
granite_bump = np.clip(128 + (gx + gy) * 2.5, 0, 255).astype(np.uint8)
Image.fromarray(granite_bump).save(TARGET_DIR / "granite-pedestal-bump.jpg", quality=90)
print("Granite pedestal textures generated!")

print("ALL REALISTIC TEXTURES GENERATED SUCCESSFULLY!")
