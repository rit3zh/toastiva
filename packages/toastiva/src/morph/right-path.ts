import { PH } from "../constants";

// Right-aligned morph path. The shape is the mirror of `morphPath` (left):
//
//   ┌──────────────[pill]──[bw]
//   │                       │       <- pill top
//   └─[pillLeft]────────────┤
//                           │       <- continuous right edge
//   ┌─[bodyLeft]────────────┤
//   │                       │       <- body
//   └───────────────────────┘
//
// The pill and body share the right edge at x=bw, and the inward "curve"
// belongs on the LEFT (where the pill ends at pillLeft and the body extends
// further left to bodyLeft). Earlier this file mirrored the left path
// naively — putting the curve on the right and starting M at pillLeft —
// which made Z close as a long diagonal from the body's bottom-right back to
// the pill's left-mid, producing the visible "X cut" through the toast.
//
// Now the path traces the perimeter clockwise starting at the pill's
// top-left corner and ends at that same corner via the pill's top-left arc
// — Z is a no-op close (or vertical line back to M, depending on rounding).
function morphPathRight(
  pw: number,
  bw: number,
  th: number,
  t: number,
  cw?: number,
): string {
  "worklet";
  const pr = PH / 2;
  const canvasW = cw ?? bw;
  const pillW = pw;
  const pillLeft = canvasW - pillW;
  const bodyH = PH + (th - PH) * t;

  if (t <= 0 || bodyH - PH < 8) {
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

  const curve = 14 * t;
  const cr = Math.min(16, (bodyH - PH) * 0.45);
  const bodyLeft = bw - (pillW + (bw - pillW) * t);
  const bodyTop = PH - curve;
  const qStartX = Math.max(bodyLeft + cr, pillLeft - curve);

  return [
    `M ${pillLeft + pr},0`, // pill top-left corner (start)
    `H ${bw - pr}`, // pill top edge (going right)
    `A ${pr},${pr} 0 0 1 ${bw},${pr}`, // pill top-right arc
    `L ${bw},${bodyH - cr}`, // continuous right edge (pill + body)
    `A ${cr},${cr} 0 0 1 ${bw - cr},${bodyH}`, // body bottom-right arc
    `H ${bodyLeft + cr}`, // body bottom (going left)
    `A ${cr},${cr} 0 0 1 ${bodyLeft},${bodyH - cr}`, // body bottom-left arc
    `L ${bodyLeft},${bodyTop + curve + cr}`, // body left edge (going up)
    `A ${cr},${cr} 0 0 1 ${bodyLeft + cr},${bodyTop + curve}`, // body top-left arc
    `H ${qStartX}`, // body top (going right toward pill)
    `Q ${pillLeft},${bodyTop + curve} ${pillLeft},${bodyTop}`, // inside corner curve up to pill
    `L ${pillLeft},${pr}`, // pill left edge (going up)
    `A ${pr},${pr} 0 0 1 ${pillLeft + pr},0`, // pill top-left arc (closes to M)
    "Z",
  ].join(" ");
}

export { morphPathRight };
