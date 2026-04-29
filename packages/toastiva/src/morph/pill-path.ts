import { PH } from "../constants";

function morphPath(
  pw: number,
  bw: number,
  th: number,
  t: number,
  cw?: number,
): string {
  "worklet";
  const pr = PH / 2;
  const canvasW = cw ?? bw;
  // Do not clamp pillW to canvasW — the clipContainer's overflow:hidden handles
  // all visual clipping. Clamping here caused an instant snap to the new smaller
  // pill width when canvasW (static prop) updated before the spring settled.
  const pillW = pw;
  const bodyH = PH + (th - PH) * t;

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
  const cr = Math.min(16, (bodyH - PH) * 0.45);
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
