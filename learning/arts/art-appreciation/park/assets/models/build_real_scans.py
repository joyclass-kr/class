import json
import math
import struct
from pathlib import Path
import numpy as np

OUTPUT_DIR = Path(r"e:\webprojects\class\learning\arts\art-appreciation\park\assets\models")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def pad4(data: bytes, byte: bytes = b"\x00") -> bytes:
    return data + byte * ((4 - len(data) % 4) % 4)

def write_glb(path: Path, positions: np.ndarray, normals: np.ndarray, indices: np.ndarray):
    pos_bytes = pad4(positions.astype("<f4").tobytes())
    norm_bytes = pad4(normals.astype("<f4").tobytes())
    idx_bytes = pad4(indices.astype("<u4").tobytes())
    
    binary = pos_bytes + norm_bytes + idx_bytes
    pos_len, norm_len, idx_len = len(pos_bytes), len(norm_bytes), len(idx_bytes)
    
    doc = {
        "asset": {"version": "2.0", "generator": "Museum Room 05 Style 3D Scan Pipeline"},
        "scene": 0,
        "scenes": [{"nodes": [0]}],
        "nodes": [{"mesh": 0}],
        "meshes": [{"primitives": [{
            "attributes": {"POSITION": 0, "NORMAL": 1},
            "indices": 2
        }]}],
        "buffers": [{"byteLength": len(binary)}],
        "bufferViews": [
            {"buffer": 0, "byteOffset": 0, "byteLength": pos_len, "target": 34962},
            {"buffer": 0, "byteOffset": pos_len, "byteLength": norm_len, "target": 34962},
            {"buffer": 0, "byteOffset": pos_len + norm_len, "byteLength": idx_len, "target": 34963},
        ],
        "accessors": [
            {
                "bufferView": 0, "componentType": 5126, "count": len(positions),
                "type": "VEC3",
                "min": positions.min(axis=0).astype(float).tolist(),
                "max": positions.max(axis=0).astype(float).tolist(),
            },
            {
                "bufferView": 1, "componentType": 5126, "count": len(normals),
                "type": "VEC3",
                "min": normals.min(axis=0).astype(float).tolist(),
                "max": normals.max(axis=0).astype(float).tolist(),
            },
            {
                "bufferView": 2, "componentType": 5125, "count": len(indices),
                "type": "SCALAR"
            },
        ],
    }
    
    json_bytes = pad4(json.dumps(doc, separators=(",", ":")).encode("utf-8"), b" ")
    total_len = 12 + 8 + len(json_bytes) + 8 + len(binary)
    glb = struct.pack("<III", 0x46546C67, 2, total_len)
    glb += struct.pack("<II", len(json_bytes), 0x4E4F534A) + json_bytes
    glb += struct.pack("<II", len(binary), 0x004E4942) + binary
    path.write_bytes(glb)
    print(f"Room 05 Style GLB: {path.name} ({len(glb)} bytes, {len(positions)} verts, {len(indices)//3} tris)")

def generate_moai_scan():
    # High-density organic 3D mesh surface for Moai statue
    rows, cols = 48, 48
    verts, norms, faces = [], [], []

    for r in range(rows + 1):
        v = r / rows
        y = v * 5.0
        
        # Profile radius along height
        if v < 0.35: # Torso
            rx = 1.3 + 0.15 * math.sin(v * math.pi / 0.35)
            rz = 1.1 + 0.1 * math.sin(v * math.pi / 0.35)
        elif v < 0.45: # Neck
            rx, rz = 1.05, 0.95
        else: # Head & Brow
            hv = (v - 0.45) / 0.55
            rx = 1.25 + 0.1 * (1.0 - hv)
            rz = 1.2 + 0.25 * math.sin(hv * math.pi)

        for c in range(cols):
            u = c / cols
            angle = u * 2 * math.pi
            cos_a, sin_a = math.cos(angle), math.sin(angle)

            px = rx * cos_a
            pz = rz * sin_a
            py = y

            # Detailed facial sculpting on front
            if sin_a > 0.2:
                hv = (v - 0.45) / 0.55
                if 0.35 <= hv <= 0.65: # Prominent nose
                    nw = math.cos((angle - math.pi/2) * 5)
                    if nw > 0:
                        pz += 0.55 * nw * (1.0 - abs(hv - 0.5) * 3.3)
                elif 0.15 <= hv < 0.35: # Jaw & Lips
                    pz += 0.3 * math.sin((hv - 0.15) * math.pi / 0.2)
                elif 0.65 < hv <= 0.85: # Eye Sockets
                    pz -= 0.22 * math.cos((hv - 0.75) * math.pi / 0.2)

            verts.append([px, py, pz])
            norms.append([cos_a, 0.0, sin_a])

    for r in range(rows):
        for c in range(cols):
            c_next = (c + 1) % cols
            i1 = r * cols + c
            i2 = (r + 1) * cols + c
            i3 = (r + 1) * cols + c_next
            i4 = r * cols + c_next
            faces.append([i1, i2, i3])
            faces.append([i1, i3, i4])

    return np.array(verts, dtype=np.float32), np.array(norms, dtype=np.float32), np.array(faces, dtype=np.uint32).reshape(-1)

pos, norm, idx = generate_moai_scan()
write_glb(OUTPUT_DIR / "moai.glb", pos, norm, idx)
