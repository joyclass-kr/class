import json
import math
import struct
from pathlib import Path
import numpy as np

OUTPUT_DIR = Path(r"e:\webprojects\class\learning\arts\art-appreciation\park\assets\models")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def pad4(data: bytes, byte: bytes = b"\x00") -> bytes:
    return data + byte * ((4 - len(data) % 4) % 4)

def write_glb_file(path: Path, positions: np.ndarray, normals: np.ndarray, indices: np.ndarray):
    """Writes a valid glTF 2.0 binary (.glb) file with POSITION, NORMAL, and INDICES."""
    pos_bytes = pad4(positions.astype("<f4").tobytes(), b"\x00")
    norm_bytes = pad4(normals.astype("<f4").tobytes(), b"\x00")
    idx_bytes = pad4(indices.astype("<u4").tobytes(), b"\x00")
    
    binary = pos_bytes + norm_bytes + idx_bytes
    pos_len = len(pos_bytes)
    norm_len = len(norm_bytes)
    idx_len = len(idx_bytes)
    
    doc = {
        "asset": {"version": "2.0", "generator": "Artscape GLB Generator"},
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
    print(f"Generated GLB: {path.name} ({len(glb)} bytes, {len(positions)} verts, {len(indices)//3} tris)")

class MeshBuilder:
    def __init__(self):
        self.vertices = []
        self.normals = []
        self.indices = []

    def add_triangle(self, p1, p2, p3, n1=None, n2=None, n3=None):
        if n1 is None:
            v1 = np.array(p1)
            v2 = np.array(p2)
            v3 = np.array(p3)
            normal = np.cross(v2 - v1, v3 - v1)
            norm_val = np.linalg.norm(normal)
            if norm_val > 1e-6:
                normal /= norm_val
            else:
                normal = np.array([0.0, 1.0, 0.0])
            n1 = n2 = n3 = normal.tolist()
        
        idx = len(self.vertices)
        self.vertices.extend([p1, p2, p3])
        self.normals.extend([n1, n2, n3])
        self.indices.extend([idx, idx + 1, idx + 2])

    def add_quad(self, p1, p2, p3, p4, n=None):
        self.add_triangle(p1, p2, p3, n, n, n)
        self.add_triangle(p1, p3, p4, n, n, n)

    def add_box(self, center, size, rot_y=0.0):
        cx, cy, cz = center
        sx, sy, sz = [s / 2.0 for s in size]
        
        raw_corners = [
            [-sx, -sy, -sz], [sx, -sy, -sz], [sx, sy, -sz], [-sx, sy, -sz],
            [-sx, -sy,  sz], [sx, -sy,  sz], [sx, sy,  sz], [-sx, sy,  sz]
        ]
        
        cos_y, sin_y = math.cos(rot_y), math.sin(rot_y)
        rotated = []
        for x, y, z in raw_corners:
            rx = x * cos_y + z * sin_y + cx
            ry = y + cy
            rz = -x * sin_y + z * cos_y + cz
            rotated.append([rx, ry, rz])
            
        c = rotated
        self.add_quad(c[4], c[5], c[6], c[7], [sin_y, 0, cos_y])
        self.add_quad(c[1], c[0], c[3], c[2], [-sin_y, 0, -cos_y])
        self.add_quad(c[7], c[6], c[2], c[3], [0, 1, 0])
        self.add_quad(c[0], c[1], c[5], c[4], [0, -1, 0])
        self.add_quad(c[0], c[4], c[7], c[3], [-cos_y, 0, sin_y])
        self.add_quad(c[5], c[1], c[2], c[6], [cos_y, 0, -sin_y])

    def add_cylinder(self, bottom_center, r_top, r_bottom, height, segments=16):
        bx, by, bz = bottom_center
        ty = by + height
        for i in range(segments):
            a1 = (i / segments) * 2 * math.pi
            a2 = ((i + 1) / segments) * 2 * math.pi
            
            x1_b, z1_b = bx + math.cos(a1) * r_bottom, bz + math.sin(a1) * r_bottom
            x2_b, z2_b = bx + math.cos(a2) * r_bottom, bz + math.sin(a2) * r_bottom
            
            x1_t, z1_t = bx + math.cos(a1) * r_top, bz + math.sin(a1) * r_top
            x2_t, z2_t = bx + math.cos(a2) * r_top, bz + math.sin(a2) * r_top
            
            self.add_quad([x1_b, by, z1_b], [x2_b, by, z2_b], [x2_t, ty, z2_t], [x1_t, ty, z1_t])
            self.add_triangle([bx, ty, bz], [x1_t, ty, z1_t], [x2_t, ty, z2_t], [0, 1, 0], [0, 1, 0], [0, 1, 0])
            self.add_triangle([bx, by, bz], [x2_b, by, z2_b], [x1_b, by, z1_b], [0, -1, 0], [0, -1, 0], [0, -1, 0])

    def build(self):
        return (
            np.array(self.vertices, dtype=np.float32),
            np.array(self.normals, dtype=np.float32),
            np.array(self.indices, dtype=np.uint32)
        )

# 1. Sphinx GLB
b_sphinx = MeshBuilder()
b_sphinx.add_box([0, 2.5, 0], [19, 5, 73.5])
b_sphinx.add_box([0, 7.5, 5], [17, 5, 50])
b_sphinx.add_box([0, 12, -15], [15, 6, 25])
b_sphinx.add_box([-6, 1.5, -30], [5, 3, 20])
b_sphinx.add_box([6, 1.5, -30], [5, 3, 20])
b_sphinx.add_box([0, 16.5, -18], [11, 7, 10])
b_sphinx.add_box([0, 16.5, -20], [8, 6, 6])
b_sphinx.add_box([-5, 14, -18], [3, 6, 8])
b_sphinx.add_box([5, 14, -18], [3, 6, 8])
b_sphinx.add_box([0, 14.5, -23], [2, 2, 2])
pos, norm, idx = b_sphinx.build()
write_glb_file(OUTPUT_DIR / "sphinx.glb", pos, norm, idx)

# 2. Emille Bell (Sacred Bell of Seongdeok) GLB
b_bell = MeshBuilder()
b_bell.add_box([0, 0.2, 0], [6.5, 0.4, 6.5])
for px in [-2.4, 2.4]:
    for pz in [-2.4, 2.4]:
        b_bell.add_cylinder([px, 0.4, pz], 0.22, 0.25, 4.2)
b_bell.add_box([0, 4.6, 0], [6.8, 0.5, 6.8])
b_bell.add_box([0, 5.2, 0], [8.0, 0.8, 8.0])
b_bell.add_box([0, 6.0, 0], [4.0, 1.0, 4.0])
b_bell.add_cylinder([0, 1.2, 0], 0.9, 1.15, 2.8, segments=24)
b_bell.add_cylinder([0, 4.0, 0], 0.25, 0.25, 0.6)
pos, norm, idx = b_bell.build()
write_glb_file(OUTPUT_DIR / "emille-bell.glb", pos, norm, idx)

# 3. Statue of Liberty GLB
b_liberty = MeshBuilder()
b_liberty.add_box([0, 2.5, 0], [23, 5, 23])
b_liberty.add_box([0, 8, 0], [19, 6, 19])
b_liberty.add_box([0, 20, 0], [15, 18, 15])
b_liberty.add_box([0, 31, 0], [17, 4, 17])
b_liberty.add_box([0, 40, 0], [13, 14, 13])
b_liberty.add_box([0, 47, 0], [15, 2, 15])
b_liberty.add_cylinder([0, 48, 0], 3.2, 4.8, 26, segments=20)
b_liberty.add_cylinder([0, 74, 0], 2.2, 2.8, 10)
b_liberty.add_cylinder([0, 84, 0], 1.6, 1.6, 3.5)
for i in range(7):
    ang = i * (math.pi * 2 / 7)
    b_liberty.add_box([math.cos(ang)*1.8, 88.5, math.sin(ang)*1.8], [0.3, 2.5, 0.3])
b_liberty.add_box([3.5, 82, 0], [1.2, 14, 1.2], rot_y=0.2)
b_liberty.add_box([4.5, 91, 0], [2.2, 3.5, 2.2])
pos, norm, idx = b_liberty.build()
write_glb_file(OUTPUT_DIR / "statue-of-liberty.glb", pos, norm, idx)

# 4. Moai Statue GLB
b_moai = MeshBuilder()
b_moai.add_box([0, 0.4, 0], [8.0, 0.8, 4.0])
b_moai.add_box([0, 2.2, 0], [2.4, 2.8, 1.8])
b_moai.add_box([0, 4.8, 0], [2.2, 2.4, 2.2])
b_moai.add_box([0, 4.3, 0.8], [1.8, 1.2, 0.8])
b_moai.add_box([0, 5.5, 0], [1.4, 0.6, 1.4])
b_moai.add_cylinder([0, 6.0, 0], 1.1, 1.1, 1.2)
pos, norm, idx = b_moai.build()
write_glb_file(OUTPUT_DIR / "moai.glb", pos, norm, idx)

# 5. Dabotap & Seokgatap GLB
b_towers = MeshBuilder()
b_towers.add_box([-4.5, 0.6, 0], [4.2, 1.2, 4.2])
b_towers.add_box([-4.5, 1.8, 0], [3.2, 1.2, 3.2])
b_towers.add_box([-4.5, 3.0, 0], [2.4, 1.2, 2.4])
b_towers.add_box([-4.5, 3.9, 0], [3.6, 0.6, 3.6])
b_towers.add_box([-4.5, 4.8, 0], [1.8, 1.0, 1.8])
b_towers.add_box([-4.5, 5.6, 0], [2.8, 0.5, 2.8])
b_towers.add_box([-4.5, 6.4, 0], [1.4, 0.9, 1.4])
b_towers.add_box([-4.5, 7.1, 0], [2.2, 0.5, 2.2])
b_towers.add_cylinder([-4.5, 7.4, 0], 0.1, 0.4, 3.3)

b_towers.add_box([4.5, 0.6, 0], [4.4, 1.2, 4.4])
for px in [3.2, 5.8]:
    for pz in [-1.3, 1.3]:
        b_towers.add_box([px, 1.8, pz], [0.5, 1.2, 0.5])
b_towers.add_box([4.5, 2.7, 0], [3.8, 0.6, 3.8])
b_towers.add_box([4.5, 3.6, 0], [2.6, 1.2, 2.6])
b_towers.add_box([4.5, 4.5, 0], [3.2, 0.6, 3.2])
b_towers.add_cylinder([4.5, 5.4, 0], 0.9, 1.2, 1.2, segments=8)
b_towers.add_cylinder([4.5, 6.6, 0], 0.15, 0.5, 3.7)
pos, norm, idx = b_towers.build()
write_glb_file(OUTPUT_DIR / "dabotap-seokgatap.glb", pos, norm, idx)

# 6. Muyongchong Hunting Scene GLB
b_mural = MeshBuilder()
b_mural.add_box([0, 1.6, 0], [6.2, 3.6, 1.0])
b_mural.add_box([0, 1.6, -0.1], [5.6, 3.0, 0.4])
b_mural.add_box([-1.5, 1.4, -0.35], [1.2, 1.0, 0.25], rot_y=-0.1)
b_mural.add_box([1.4, 1.8, -0.35], [1.1, 0.9, 0.25], rot_y=0.1)
b_mural.add_box([0, 2.4, -0.35], [2.2, 0.6, 0.2], rot_y=0.0)
pos, norm, idx = b_mural.build()
write_glb_file(OUTPUT_DIR / "muyongchong.glb", pos, norm, idx)

# 7. Lamassu Winged Bull GLB
b_lamassu = MeshBuilder()
b_lamassu.add_box([0, 0.25, 0], [1.8, 0.5, 4.6])
b_lamassu.add_box([0, 2.0, 0], [1.4, 2.8, 3.8])
b_lamassu.add_box([-0.5, 0.8, -1.4], [0.35, 1.1, 0.4])
b_lamassu.add_box([0.5, 0.8, -1.4], [0.35, 1.1, 0.4])
b_lamassu.add_box([-0.5, 0.8, 0.0], [0.35, 1.1, 0.4])
b_lamassu.add_box([-0.5, 0.8, 1.4], [0.35, 1.1, 0.4])
b_lamassu.add_box([0.5, 0.8, 1.4], [0.35, 1.1, 0.4])
b_lamassu.add_box([0, 3.8, -1.5], [1.1, 1.4, 1.0])
b_lamassu.add_box([0, 4.4, -1.5], [1.2, 0.5, 1.1])
b_lamassu.add_box([0, 3.2, -1.6], [0.8, 0.8, 0.4])
b_lamassu.add_box([-0.7, 3.4, 0.4], [0.2, 1.6, 2.6], rot_y=0.15)
b_lamassu.add_box([0.7, 3.4, 0.4], [0.2, 1.6, 2.6], rot_y=-0.15)
pos, norm, idx = b_lamassu.build()
write_glb_file(OUTPUT_DIR / "lamassu.glb", pos, norm, idx)

print("ALL 7 GLB MODELS GENERATED SUCCESSFULLY!")
