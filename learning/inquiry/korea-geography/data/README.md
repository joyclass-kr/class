# Major river geometry

`major-rivers.geojson` contains the displayed centerlines for 한강, 남한강,
낙동강, 금강, 영산강, 섬진강, 압록강, 두만강, 대동강, 청천강, 북한강, and 임진강.

- Source: OpenStreetMap contributors
- Retrieved through the Nominatim search and lookup APIs on 2026-09-01
- Supplemental river relations: 압록강 2899525, 두만강 6970997, 대동강 3858130, 청천강 5454222, 북한강 5486141, 임진강 5488146
- Each feature includes a `system` property; 한강·남한강·북한강·임진강 are grouped as 한강 수계.
- License/attribution: https://www.openstreetmap.org/copyright
- Purpose: local, stable rendering of major rivers in the Korean Geography study map

The file is a display layer, not a legal river-boundary dataset.


## Physical relief

`../assets/east-asia-physical-relief.webp` and `../assets/korea-physical-relief.webp` are self-hosted 2.5D relief overlays. The broad East Asia layer keeps the terrain tone continuous across China, the Korean Peninsula, the Russian Far East, and Japan. The detailed Korean Peninsula layer has a feathered outer edge and appears only from zoom 7 onward.

- Source: Mapzen Terrain Tiles in the AWS Registry of Open Data
- Accessed: 2026-09-02
- Processing: the RGB surface normals and alpha-channel quantized elevations from 696 zoom-7 regional tiles and 220 zoom-9 detail tiles were converted to hypsometric tint plus directional slope shading.
- Output: 4096×3390 regional WebP and 2048×3724 feathered detail WebP, both with transparent sea pixels.
- Runtime behavior: the site requests only these local relief assets; it does not request Esri world terrain or hillshade tiles.
- Rebuild script: `../tools/generate-relief.ps1`
- Source and attribution: https://registry.opendata.aws/terrain-tiles/