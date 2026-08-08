const TILE_W = 34;
const TILE_H = 17;
const CUBE_H = 30;
const MAP_GAP = 22;

type Cube = { r: number; c: number; z: number; isTop: boolean };

function cubeFaces(r: number, c: number, z: number) {
  const x = (c - r) * TILE_W;
  const y = (c + r) * TILE_H - (z + 1) * CUBE_H;
  const top = [
    `${x},${y - TILE_H}`,
    `${x + TILE_W},${y}`,
    `${x},${y + TILE_H}`,
    `${x - TILE_W},${y}`,
  ].join(" ");
  const left = [
    `${x - TILE_W},${y}`,
    `${x},${y + TILE_H}`,
    `${x},${y + TILE_H + CUBE_H}`,
    `${x - TILE_W},${y + CUBE_H}`,
  ].join(" ");
  const right = [
    `${x},${y + TILE_H}`,
    `${x + TILE_W},${y}`,
    `${x + TILE_W},${y + CUBE_H}`,
    `${x},${y + TILE_H + CUBE_H}`,
  ].join(" ");
  return { top, left, right };
}

function floorCellPoints(r: number, c: number, offsetY: number) {
  const x = (c - r) * TILE_W;
  const y = (c + r) * TILE_H + offsetY;
  return { x, y, points: `${x},${y - TILE_H} ${x + TILE_W},${y} ${x},${y + TILE_H} ${x - TILE_W},${y}` };
}

export default function StackedCubesDiagram({ heights, showMap = false, showCubes = true, className }: { heights: number[][]; showMap?: boolean; showCubes?: boolean; className?: string }) {
  const size = heights.length;
  const cubes: Cube[] = [];
  if (showCubes) {
    for (let r = 0; r < size; r += 1) {
      for (let c = 0; c < size; c += 1) {
        const height = heights[r][c];
        for (let z = 0; z < height; z += 1) cubes.push({ r, c, z, isTop: z === height - 1 });
      }
    }
    cubes.sort((a, b) => a.r + a.c - (b.r + b.c));
  }

  const maxHeight = showCubes ? heights.reduce((max, row) => Math.max(max, ...row), 0) : 0;
  const minX = -size * TILE_W - 20;
  const maxX = size * TILE_W;
  const minY = -maxHeight * CUBE_H - TILE_H;
  const cubesMaxY = 2 * (size - 1) * TILE_H + TILE_H + CUBE_H;
  const mapOffsetY = cubesMaxY + MAP_GAP;
  const maxY = (showMap ? mapOffsetY + 2 * (size - 1) * TILE_H + TILE_H : cubesMaxY) + 10;
  const width = maxX - minX;
  const height = maxY - minY;

  const arrowTailX = minX + 8;
  const arrowTailY = cubesMaxY - 6;
  const arrowTipX = arrowTailX + TILE_W * 0.85;
  const arrowTipY = arrowTailY - TILE_H * 0.85;

  return (
    <svg
      className={`stacked-cubes-diagram${className ? ` ${className}` : ""}`}
      viewBox={`${minX} ${minY} ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="쌓기나무 그림"
    >
      {cubes.map(({ r, c, z, isTop }) => {
        const { top, left, right } = cubeFaces(r, c, z);
        return (
          <g key={`${r}-${c}-${z}`}>
            <polygon className="stacked-cube-face stacked-cube-face-left" points={left} />
            <polygon className="stacked-cube-face stacked-cube-face-right" points={right} />
            {isTop && <polygon className="stacked-cube-face stacked-cube-face-top" points={top} />}
          </g>
        );
      })}
      <g className="stacked-cubes-direction">
        <line x1={arrowTailX} y1={arrowTailY} x2={arrowTipX} y2={arrowTipY} />
        <polygon points={`${arrowTipX},${arrowTipY} ${arrowTipX - 6},${arrowTipY + 2} ${arrowTipX - 2},${arrowTipY + 6}`} />
        <text x={arrowTailX - 2} y={arrowTailY + 12}>앞</text>
      </g>
      {showMap && heights.map((row, r) => row.map((cellHeight, c) => {
        if (cellHeight === 0) return null;
        const { x, y, points } = floorCellPoints(r, c, mapOffsetY);
        return (
          <g key={`map-${r}-${c}`}>
            <polygon className="stacked-cubes-map-cell" points={points} />
            <text className="stacked-cubes-map-number" x={x} y={y + 4}>{cellHeight}</text>
          </g>
        );
      }))}
    </svg>
  );
}
