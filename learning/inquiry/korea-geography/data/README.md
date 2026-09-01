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


## Korean Peninsula physical relief

`../assets/korea-physical-relief.webp` is a self-hosted 2.5D physical-relief overlay cropped to the Korean Peninsula study bounds (`123.85–131.35°E`, `32.95–43.15°N`). It combines hypsometric elevation tint with multidirectional slope shading derived from Mapzen Terrain Tiles on AWS Open Data.

- Source: Mapzen Terrain Tiles in the AWS Registry of Open Data
- Accessed: 2026-09-02
- Processing: 66 Terrarium DEM tiles at zoom 8 were decoded, cropped, hillshaded, and exported as a transparent 1366×2365 WebP.
- Runtime behavior: the site loads only this local regional image; it does not request Esri world terrain or hillshade tiles.
- Source and attribution: https://registry.opendata.aws/terrain-tiles/
