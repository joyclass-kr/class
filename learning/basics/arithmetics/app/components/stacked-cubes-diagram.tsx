const TILE_W = 34;
const TILE_H = 17;
const CUBE_H = 30;

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

export default function StackedCubesDiagram({ heights, className }: { heights: number[][]; className?: string }) {
  const size = heights.length;
  const cubes: Cube[] = [];
  for (let r = 0; r < size; r += 1) {
    for (let c = 0; c < size; c += 1) {
      const height = heights[r][c];
      for (let z = 0; z < height; z += 1) cubes.push({ r, c, z, isTop: z === height - 1 });
    }
  }
  cubes.sort((a, b) => a.r + a.c - (b.r + b.c));

  const maxHeight = heights.reduce((max, row) => Math.max(max, ...row), 0);
  const minX = -size * TILE_W;
  const maxX = size * TILE_W;
  const minY = -maxHeight * CUBE_H - TILE_H;
  const maxY = 2 * (size - 1) * TILE_H + TILE_H + CUBE_H;
  const width = maxX - minX;
  const height = maxY - minY;

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
    </svg>
  );
}
