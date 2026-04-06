import { PH } from "../constants";

function morphPathRight(pw: number, bw: number, th: number, t: number): string {
  "worklet";
  const pr = PH / 2;
  const pillW = Math.min(pw, bw);
  const pillLeft = bw - pillW;
  const bodyH = PH + (th - PH) * t;

  if (t <= 0 || bodyH - PH < 8) {
    return [
      `M ${pillLeft},${pr}`,
      `A ${pr},${pr} 0 0 1 ${pillLeft + pr},0`,
      `H ${bw - pr}`,
      `A ${pr},${pr} 0 0 1 ${bw},${pr}`,
      `A ${pr},${pr} 0 0 1 ${bw - pr},${PH}`,
      `H ${pillLeft + pr}`,
      `A ${pr},${pr} 0 0 1 ${pillLeft},${pr}`,
      "Z",
    ].join(" ");
  }

  const curve = 14 * t;
  const cr = Math.min(16, (bodyH - PH) * 0.45);
  const bodyLeft = bw - (pillW + (bw - pillW) * t);
  const bodyTop = PH - curve;
  const qStartX = Math.max(bodyLeft + cr, pillLeft - curve);

  return [
    `M ${pillLeft},${pr}`,
    `A ${pr},${pr} 0 0 1 ${pillLeft + pr},0`,
    `H ${bw - pr}`,
    `A ${pr},${pr} 0 0 1 ${bw},${pr}`,
    `L ${bw},${bodyTop}`,
    `Q ${bw},${bodyTop + curve} ${qStartX},${bodyTop + curve}`,
    `H ${bodyLeft + cr}`,
    `A ${cr},${cr} 0 0 1 ${bodyLeft},${bodyTop + curve + cr}`,
    `L ${bodyLeft},${bodyH - cr}`,
    `A ${cr},${cr} 0 0 1 ${bodyLeft + cr},${bodyH}`,
    `H ${bw - cr}`,
    `A ${cr},${cr} 0 0 1 ${bw},${bodyH - cr}`,
    "Z",
  ].join(" ");
}

export { morphPathRight };
