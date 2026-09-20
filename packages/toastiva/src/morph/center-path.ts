import { PH } from "../constants";
import { getBodyWidthProgress } from "./body-emergence";
import { getBodyGeometry } from "./body-geometry";
import { smoothCorner } from "./smooth-corner";

function morphPathCenter(
  pw: number,
  bw: number,
  th: number,
  t: number,
  cw?: number,
  radius = 16,
  noHeader = false,
  smoothing = 0,
): string {
  "worklet";
  const pr = PH / 2;
  const s = smoothing < 0 ? 0 : smoothing > 1 ? 1 : smoothing;
  const grow = 1 + s;
  if (noHeader) {
    const h = Math.max(PH + (th - PH) * t, PH);
    const canvasW0 = cw ?? bw;
    const left = (canvasW0 - bw) / 2;
    const right = left + bw;
    const startR = PH / 2;
    const cr = startR + (Math.min(radius, bw / 2) - startR) * t;
    const safeR = Math.min(cr, bw / 2 / grow, h / 2 / grow);
    return [
      `M ${left + safeR * grow},0`,
      smoothCorner(right, 0, 1, 0, 0, 1, safeR, s),
      smoothCorner(right, h, 0, 1, -1, 0, safeR, s),
      smoothCorner(left, h, -1, 0, 0, -1, safeR, s),
      smoothCorner(left, 0, 0, -1, 1, 0, safeR, s),
      "Z",
    ].join(" ");
  }

  const canvasW = cw ?? bw;
  const pillW = pw;
  const pillOffset = (canvasW - pillW) / 2;
  const bodyH = PH + (th - PH) * t;

  if (t <= 0) {
    return [
      `M ${pillOffset},${pr}`,
      `A ${pr},${pr} 0 0 1 ${pillOffset + pr},0`,
      `H ${pillOffset + pillW - pr}`,
      `A ${pr},${pr} 0 0 1 ${pillOffset + pillW},${pr}`,
      `A ${pr},${pr} 0 0 1 ${pillOffset + pillW - pr},${PH}`,
      `H ${pillOffset + pr}`,
      `A ${pr},${pr} 0 0 1 ${pillOffset},${pr}`,
      "Z",
    ].join(" ");
  }

  const pillRight = pillOffset + pillW;

  const wt = getBodyWidthProgress<number>(t);
  const halfWidth = pillW / 2 + ((bw - pillW) / 2) * wt;
  const bodyLeft = bw / 2 - halfWidth;
  const bodyRight = bw / 2 + halfWidth;
  const overhang = halfWidth - pillW / 2;
  const {
    bodyTop,
    curve,
    grow: growEff,
    rBottom,
    rTopMax,
    sEff,
    yJunction,
  } = getBodyGeometry(bodyH, overhang, radius, s, t, halfWidth);

  const qLeftX = Math.max(bodyLeft + rTopMax, pillOffset - curve);
  const qRightX = Math.min(bodyRight - rTopMax, pillRight + curve);
  const gR = bodyRight - qRightX;
  const gL = qLeftX - bodyLeft;
  const vRun = Math.max(0, bodyH - rBottom * growEff - bodyTop);
  const rTR = Math.max(0, Math.min(rTopMax, gR / growEff, vRun / growEff));
  const rTL = Math.max(0, Math.min(rTopMax, gL / growEff, vRun / growEff));
  const rBR = Math.max(
    0,
    Math.min(rBottom, (bodyH - bodyTop - rTR * growEff) / growEff),
  );
  const rBL = Math.max(
    0,
    Math.min(rBottom, (bodyH - bodyTop - rTL * growEff) / growEff),
  );

  return [
    `M ${pillOffset},${pr}`,
    `A ${pr},${pr} 0 0 1 ${pillOffset + pr},0`,
    `H ${pillRight - pr}`,
    `A ${pr},${pr} 0 0 1 ${pillRight},${pr}`,
    `L ${pillRight},${yJunction}`,
    `Q ${pillRight},${bodyTop} ${qRightX},${bodyTop}`,
    smoothCorner(bodyRight, bodyTop, 1, 0, 0, 1, rTR, sEff),
    smoothCorner(bodyRight, bodyH, 0, 1, -1, 0, rBR, sEff),
    smoothCorner(bodyLeft, bodyH, -1, 0, 0, -1, rBL, sEff),
    smoothCorner(bodyLeft, bodyTop, 0, -1, 1, 0, rTL, sEff),
    `H ${qLeftX}`,
    `Q ${pillOffset},${bodyTop} ${pillOffset},${yJunction}`,
    "Z",
  ].join(" ");
}

export { morphPathCenter };
