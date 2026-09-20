import { PH } from "../constants";
import { getBodyWidthProgress } from "./body-emergence";
import { getBodyGeometry } from "./body-geometry";
import { smoothCorner } from "./smooth-corner";

function morphPathRight(
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
    const right = canvasW0;
    const left = right - bw;
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
  const pillLeft = canvasW - pillW;
  const bodyH = PH + (th - PH) * t;

  if (t <= 0) {
    return [
      `M ${pillLeft},${pr}`,
      `A ${pr},${pr} 0 0 1 ${pillLeft + pr},0`,
      `H ${canvasW - pr}`,
      `A ${pr},${pr} 0 0 1 ${canvasW},${pr}`,
      `A ${pr},${pr} 0 0 1 ${canvasW - pr},${PH}`,
      `H ${pillLeft + pr}`,
      `A ${pr},${pr} 0 0 1 ${pillLeft},${pr}`,
      "Z",
    ].join(" ");
  }

  const bodyLeft =
    bw - (pillW + (bw - pillW) * getBodyWidthProgress<number>(t));
  const overhang = pillLeft - bodyLeft;
  const {
    bodyTop,
    curve,
    grow: growEff,
    rBottom,
    rTopMax,
    sEff,
    yJunction,
  } = getBodyGeometry(bodyH, overhang, radius, s, t, (bw - bodyLeft) / 2);

  const qStartX = Math.max(bodyLeft + rTopMax, pillLeft - curve);
  const gL = qStartX - bodyLeft;
  const vRun = Math.max(0, bodyH - rBottom * growEff - bodyTop);
  const rTL = Math.max(0, Math.min(rTopMax, gL / growEff, vRun / growEff));
  const rBR = Math.max(0, Math.min(rBottom, (bodyH - pr) / growEff));
  const rBL = Math.max(
    0,
    Math.min(rBottom, (bodyH - bodyTop - rTL * growEff) / growEff),
  );

  return [
    `M ${pillLeft + pr},0`,
    `H ${bw - pr}`,
    `A ${pr},${pr} 0 0 1 ${bw},${pr}`,
    smoothCorner(bw, bodyH, 0, 1, -1, 0, rBR, sEff),
    smoothCorner(bodyLeft, bodyH, -1, 0, 0, -1, rBL, sEff),
    smoothCorner(bodyLeft, bodyTop, 0, -1, 1, 0, rTL, sEff),
    `H ${qStartX}`,
    `Q ${pillLeft},${bodyTop} ${pillLeft},${yJunction}`,
    `L ${pillLeft},${pr}`,
    `A ${pr},${pr} 0 0 1 ${pillLeft + pr},0`,
    "Z",
  ].join(" ");
}

export { morphPathRight };
