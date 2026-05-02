import { PH } from "../constants";

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
  // Do not clamp pillW to canvasW — the clipContainer's overflow:hidden handles
  // all visual clipping. Clamping here caused an instant snap to the new smaller
  // pill width when canvasW (static prop) updated before the spring settled.
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

  if (t <= 0 || bodyH - PH < 8) {
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

  const curve = 14 * t;
  const cr = Math.min(Math.max(0, radius), (bodyH - PH) * 0.45);
  const bodyW = pillW + (bw - pillW) * t;
  const bodyTop = PH - curve;
  const qEndX = Math.min(pillW + curve, bodyW - cr);

  return [
    `M 0,${pr}`,
    `A ${pr},${pr} 0 0 1 ${pr},0`,
    `H ${pillW - pr}`,
    `A ${pr},${pr} 0 0 1 ${pillW},${pr}`,
    `L ${pillW},${bodyTop}`,
    `Q ${pillW},${bodyTop + curve} ${qEndX},${bodyTop + curve}`,
    `H ${bodyW - cr}`,
    `A ${cr},${cr} 0 0 1 ${bodyW},${bodyTop + curve + cr}`,
    `L ${bodyW},${bodyH - cr}`,
    `A ${cr},${cr} 0 0 1 ${bodyW - cr},${bodyH}`,
    `H ${cr}`,
    `A ${cr},${cr} 0 0 1 0,${bodyH - cr}`,
    "Z",
  ].join(" ");
}

export { morphPath };
