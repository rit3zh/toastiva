const BEZIER_KAPPA = 0.5519150244935105;
const SQUIRCLE_KAPPA = 0.9091;

function smoothCorner(
  cx: number,
  cy: number,
  ix: number,
  iy: number,
  ox: number,
  oy: number,
  r: number,
  s: number,
): string {
  "worklet";
  const smoothing = s < 0 ? 0 : s > 1 ? 1 : s;
  const shoulder = r * smoothing;
  const d = r + shoulder;
  const h = d * (BEZIER_KAPPA + smoothing * (SQUIRCLE_KAPPA - BEZIER_KAPPA));

  const ax = cx - ix * d;
  const ay = cy - iy * d;
  const bx = cx + ox * d;
  const by = cy + oy * d;

  const c1x = ax + ix * h;
  const c1y = ay + iy * h;
  const c2x = bx - ox * h;
  const c2y = by - oy * h;

  return `L ${ax},${ay} C ${c1x},${c1y} ${c2x},${c2y} ${bx},${by}`;
}

export { smoothCorner };
