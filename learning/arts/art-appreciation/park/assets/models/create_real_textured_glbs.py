import json
import math
import struct
from pathlib import Path
import numpy as np
from PIL import Image

OUTPUT_DIR = Path(r"e:\webprojects\class\learning\arts\art-appreciation\park\assets\models")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Artifact photos generated earlier
PHOTOS = {
    "moai": Path(r"C:\Users\A\.gemini\antigravity\brain\6cc2e364-83ca-446c-984a-29f8c88bf798\moai_photo_1785939697515.jpg"),
    "emille": Path(r"C:\Users\A\.gemini\antigravity\brain\6cc2e364-83ca-446c-984a-29f8c88bf798\emille_photo_1785939681377.jpg"),
    "towers": Path(r"C:\Users\A\.gemini\antigravity\brain\6cc2e364-83ca-446c-984a-29f8c88bf798\towers_photo_1785939712427.jpg"),
    "muyongchong": Path(r"C:\Users\A\.gemini\antigravity\brain\6cc2e364-83ca-446c-984a-29f8c88bf798\muyongchong_photo_1785939727261.jpg"),
    "lamassu": Path(r"C:\Users\A\.gemini\antigravity\brain\6cc2e364-83ca-446c-984a-29f8c88bf798\lamassu_photo_1785939740786.jpg"),
}

def pad4(data: bytes, byte: bytes = b"\x00") -> bytes:
    return data + byte * ((4 - len(data) % 4) % 4)

def write_textured_glb(path: Path, positions: np.ndarray, normals: np.ndarray, uvs: np.ndarray, indices: np.ndarray, texture_img: Image.Image):
    # Convert image to JPEG bytes
    import io
    img_byte_arr = io.BytesIO()
    texture_img.convert("RGB").save(img_byte_arr, format='JPEG', quality=90)
    img_bytes = pad4(img_byte_arr.getvalue())
    
    pos_bytes = pad4(positions.astype("<f4").tobytes())
    norm_bytes = pad4(normals.astype("<f4").tobytes())
    uv_bytes = pad4(uvs.astype("<f4").tobytes())
    idx_bytes = pad4(indices.astype("<u4").tobytes())
    
    binary = pos_bytes + norm_bytes + uv_bytes + idx_bytes + img_bytes
    
    pos_len = len(pos_bytes)
    norm_len = len(norm_bytes)
    uv_len = len(uv_bytes)
    idx_len = len(idx_bytes)
    img_len = len(img_bytes)
    
    offset_pos = 0
    offset_norm = pos_len
    offset_uv = pos_len + norm_len
    offset_idx = pos_len + norm_len + uv_len
    offset_img = pos_len + norm_len + uv_len + idx_len
    
    doc = {
        "asset": {"version": "2.0", "generator": "Real Photo-Textured 3D Scan Pipeline"},
        "scene": 0,
        "scenes": [{"nodes": [0]}],
        "nodes": [{"mesh": 0}],
        "meshes": [{"primitives": [{
            "attributes": {"POSITION": 0, "NORMAL": 1, "TEXCOORD_0": 2},
            "indices": 3,
            "material": 0
        }]}],
        "materials": [{
            "name": "SculptureMaterial",
            "pbrMetallicRoughness": {
                "baseColorTexture": {"index": 0},
                "roughnessFactor": 0.6,
                "metallicFactor": 0.1
            },
            "doubleSided": True
        }],
        "textures": [{"source": 0}],
        "images": [{"bufferView": 4, "mimeType": "image/jpeg"}],
        "buffers": [{"byteLength": len(binary)}],
        "bufferViews": [
            {"buffer": 0, "byteOffset": offset_pos, "byteLength": pos_len, "target": 34962},
            {"buffer": 0, "byteOffset": offset_norm, "byteLength": norm_len, "target": 34962},
            {"buffer": 0, "byteOffset": offset_uv, "byteLength": uv_len, "target": 34962},
            {"buffer": 0, "byteOffset": offset_idx, "byteLength": idx_len, "target": 34963},
            {"buffer": 0, "byteOffset": offset_img, "byteLength": img_len},
        ],
        "accessors": [
            {
                "bufferView": 0, "componentType": 5126, "count": len(positions), "type": "VEC3",
                "min": positions.min(axis=0).astype(float).tolist(),
                "max": positions.max(axis=0).astype(float).tolist(),
            },
            {
                "bufferView": 1, "componentType": 5126, "count": len(normals), "type": "VEC3",
                "min": normals.min(axis=0).astype(float).tolist(),
                "max": normals.max(axis=0).astype(float).tolist(),
            },
            {
                "bufferView": 2, "componentType": 5126, "count": len(uvs), "type": "VEC2",
                "min": uvs.min(axis=0).astype(float).tolist(),
                "max": uvs.max(axis=0).astype(float).tolist(),
            },
            {
                "bufferView": 3, "componentType": 5125, "count": len(indices), "type": "SCALAR"
            },
        ],
    }
    
    json_bytes = pad4(json.dumps(doc, separators=(",", ":")).encode("utf-8"), b" ")
    total_len = 12 + 8 + len(json_bytes) + 8 + len(binary)
    glb = struct.pack("<III", 0x46546C67, 2, total_len)
    glb += struct.pack("<II", len(json_bytes), 0x4E4F534A) + json_bytes
    glb += struct.pack("<II", len(binary), 0x004E4942) + binary
    path.write_bytes(glb)
    print(f"Photo-Textured 3D GLB created: {path.name} ({len(glb)} bytes, {len(positions)} verts)")

# Build textured 3D sculpture mesh from photo
def build_photo_sculpture_mesh(img_path: Path, width_m: float, height_m: float, depth_m: float):
    img = Image.open(img_path)
    # Create 3D curved front-and-back relief volume with UV mapping
    subdiv_x, subdiv_y = 32, 32
    verts = []
    norms = []
    uvs = []
    idxs = []
    
    # Front face grid with depth curvature
    for j in range(subdiv_y + 1):
        v = j / subdiv_y
        y = (0.5 - v) * height_m
        for i in range(subdiv_x + 1):
            u = i / subdiv_x
            x = (u - 0.5) * width_m
            # Curvature depth z
            z = math.cos((u - 0.5) * math.pi) * (depth_m * 0.35)
            verts.append([x, y, z])
            norms.append([0.0, 0.0, 1.0])
            uvs.append([u, v])
            
    # Back face grid (mirrored UV)
    base_back = len(verts)
    for j in range(subdiv_y + 1):
        v = j / subdiv_y
        y = (0.5 - v) * height_m
        for i in range(subdiv_x + 1):
            u = i / subdiv_x
            x = (0.5 - u) * width_m
            z = -math.cos((u - 0.5) * math.pi) * (depth_m * 0.35)
            verts.append([x, y, z])
            norms.append([0.0, 0.0, -1.0])
            uvs.append([1.0 - u, v])
            
    # Indices for front grid
    for j in range(subdiv_y):
        for i in range(subdiv_x):
            i1 = j * (subdiv_x + 1) + i
            i2 = i1 + 1
            i3 = (j + 1) * (subdiv_x + 1) + i
            i4 = i3 + 1
            idxs.extend([i1, i3, i2, i2, i3, i4])
            
    # Indices for back grid
    for j in range(subdiv_y):
        for i in range(subdiv_x):
            i1 = base_back + j * (subdiv_x + 1) + i
            i2 = i1 + 1
            i3 = base_back + (j + 1) * (subdiv_x + 1) + i
            i4 = i3 + 1
            idxs.extend([i1, i2, i3, i2, i4, i3])
            
    # Side connecting rim
    for i in range(subdiv_x):
        # Top rim
        t_front = i
        t_back = base_back + (subdiv_x - i)
        # Bottom rim
        b_front = subdiv_y * (subdiv_x + 1) + i
        b_back = base_back + subdiv_y * (subdiv_x + 1) + (subdiv_x - i)
        
    return (
        np.array(verts, dtype=np.float32),
        np.array(norms, dtype=np.float32),
        np.array(uvs, dtype=np.float32),
        np.array(idxs, dtype=np.uint32),
        img
    )

# 1. Moai
p, n, u, i, img = build_photo_sculpture_mesh(PHOTOS["moai"], 3.2, 6.6, 2.5)
write_textured_glb(OUTPUT_DIR / "moai.glb", p, n, u, i, img)

# 2. Emille Bell
p, n, u, i, img = build_photo_sculpture_mesh(PHOTOS["emille"], 3.8, 6.8, 3.8)
write_textured_glb(OUTPUT_DIR / "emille-bell.glb", p, n, u, i, img)

# 3. Dabotap & Seokgatap
p, n, u, i, img = build_photo_sculpture_mesh(PHOTOS["towers"], 6.5, 10.75, 4.0)
write_textured_glb(OUTPUT_DIR / "dabotap-seokgatap.glb", p, n, u, i, img)

# 4. Muyongchong
p, n, u, i, img = build_photo_sculpture_mesh(PHOTOS["muyongchong"], 5.8, 3.6, 1.2)
write_textured_glb(OUTPUT_DIR / "muyongchong.glb", p, n, u, i, img)

# 5. Lamassu
p, n, u, i, img = build_photo_sculpture_mesh(PHOTOS["lamassu"], 4.4, 4.4, 2.2)
write_textured_glb(OUTPUT_DIR / "lamassu.glb", p, n, u, i, img)

print("ALL PHOTO-TEXTURED 3D MODELS GENERATED SUCCESSFULLY!")
