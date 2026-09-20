import { PH } from "../constants";
import { getBodyWidthProgress } from "./body-emergence";
import { getBodyGeometry } from "./body-geometry";

function morphPath(
  pw: number,
  bw: number,
  th: number,
  t: number,
  cw?: number,
  radius = 16,
  noHeader = false,
): string {
  "worklet";
  const pr = PH / 2;

  const pillW = pw;
  const bodyH = PH + (th - PH) * t;

  if (noHeader) {
    const h = Math.max(PH + (th - PH) * t, PH);
    const startR = PH / 2;
    const cr = startR + (Math.min(radius, bw / 2) - startR) * t;
    const safeR = Math.min(cr, bw / 2, h / 2);
    return [
      `M ${safeR},0`,
      `H ${bw - safeR}`,
      `A ${safeR},${safeR} 0 0 1 ${bw},${safeR}`,
      `L ${bw},${h - safeR}`,
      `A ${safeR},${safeR} 0 0 1 ${bw - safeR},${h}`,
      `H ${safeR}`,
      `A ${safeR},${safeR} 0 0 1 0,${h - safeR}`,
      `L 0,${safeR}`,
      `A ${safeR},${safeR} 0 0 1 ${safeR},0`,
      "Z",
    ].join(" ");
  }

  if (t <= 0) {
    return [
      `M 0,${pr}`,
      `A ${pr},${pr} 0 0 1 ${pr},0`,
      `H ${pillW - pr}`,
      `A ${pr},${pr} 0 0 1 ${pillW},${pr}`,
      `A ${pr},${pr} 0 0 1 ${pillW - pr},${PH}`,
      `H ${pr}`,
      `A ${pr},${pr} 0 0 1 0,${pr}`,
      "Z",
    ].join(" ");
  }

  const bodyW = pillW + (bw - pillW) * getBodyWidthProgress<number>(t);
  const overhang = bodyW - pillW;

  const { bodyTop, curve, rBottom, rTopMax, yJunction } = getBodyGeometry(
    bodyH,
    overhang,
    radius,
    0,
    t,
    bodyW / 2,
  );

  const qEndX = Math.min(pillW + curve, bodyW - rTopMax);
  const rTop = Math.max(
    0,
    Math.min(rTopMax, bodyW - qEndX, bodyH - bodyTop - rBottom),
  );
  const rBR = Math.max(0, Math.min(rBottom, bodyH - bodyTop - rTop));
  const rBL = Math.max(0, Math.min(rBottom, bodyH - pr));

  return [
    `M 0,${pr}`,
    `A ${pr},${pr} 0 0 1 ${pr},0`,
    `H ${pillW - pr}`,
    `A ${pr},${pr} 0 0 1 ${pillW},${pr}`,
    `L ${pillW},${yJunction}`,
    `Q ${pillW},${bodyTop} ${qEndX},${bodyTop}`,
    `H ${bodyW - rTop}`,
    `A ${rTop},${rTop} 0 0 1 ${bodyW},${bodyTop + rTop}`,
    `L ${bodyW},${bodyH - rBR}`,
    `A ${rBR},${rBR} 0 0 1 ${bodyW - rBR},${bodyH}`,
    `H ${rBL}`,
    `A ${rBL},${rBL} 0 0 1 0,${bodyH - rBL}`,
    "Z",
  ].join(" ");
}

export { morphPath };
