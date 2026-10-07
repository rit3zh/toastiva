const BEZIER_KAPPA = 0.5519150244935105;
const SQUIRCLE_KAPPA = 0.9091;

function smoothCornerXY(
  cx: number,
  cy: number,
  ix: number,
  iy: number,
  ox: number,
  oy: number,
  dIn: number,
  dOut: number,
  s: number,
): string {
  "worklet";
  const smoothing = s < 0 ? 0 : s > 1 ? 1 : s;
  const kappa = BEZIER_KAPPA + smoothing * (SQUIRCLE_KAPPA - BEZIER_KAPPA);
  const hIn = dIn * kappa;
  const hOut = dOut * kappa;

  const ax = cx - ix * dIn;
  const ay = cy - iy * dIn;
  const bx = cx + ox * dOut;
  const by = cy + oy * dOut;

  const c1x = ax + ix * hIn;
  const c1y = ay + iy * hIn;
  const c2x = bx - ox * hOut;
  const c2y = by - oy * hOut;

  return `L ${ax},${ay} C ${c1x},${c1y} ${c2x},${c2y} ${bx},${by}`;
}

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
  const d = r * (1 + smoothing);
  return smoothCornerXY(cx, cy, ix, iy, ox, oy, d, d, smoothing);
}

export { smoothCorner, smoothCornerXY };
