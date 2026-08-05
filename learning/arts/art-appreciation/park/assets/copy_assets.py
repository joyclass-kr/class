import shutil
from pathlib import Path

brain_dir = Path(r"C:\Users\A\.gemini\antigravity\brain\6cc2e364-83ca-446c-984a-29f8c88bf798")
target_dir = Path(r"e:\webprojects\class\learning\arts\art-appreciation\park\assets")

mapping = {
    "emille_photo_1785939681377.jpg": "emille.jpg",
    "moai_photo_1785939697515.jpg": "moai.jpg",
    "towers_photo_1785939712427.jpg": "towers.jpg",
    "muyongchong_photo_1785939727261.jpg": "muyongchong.jpg",
    "lamassu_photo_1785939740786.jpg": "lamassu.jpg"
}

for src_name, dst_name in mapping.items():
    src = brain_dir / src_name
    dst = target_dir / dst_name
    if src.exists():
        shutil.copy(src, dst)
        print(f"Copied {src_name} -> {dst_name}")

print("Asset copying complete!")
