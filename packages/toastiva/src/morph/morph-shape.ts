import { PH } from "../constants";
import type { TToastivaHorizontalAlign } from "../typings";
import { smoothCorner, smoothCornerXY } from "./smooth-corner";

interface IMorphExtents {
  bodyBottom: number;
  bodyLeft: number;
  bodyRight: number;
  emergence: number;
  pillLeft: number;
  pillRight: number;
}

interface IMorphSide {
  bottomX: number;
  bottomY: number;
  filletX: number;
  filletY: number;
  junction: number;
  smoothing: number;
  topX: number;
  topY: number;
}

const FILLET_RADIUS = 12;
const EMERGE_START = 14;
const EMERGE_END = 46;
const EMERGE_END_RATIO = 0.8;
const SHOULDER_ASPECT = 1.6;
const WING_RAMP = 6;

function clamp01(value: number) {
  "worklet";
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

function smoothstep(value: number) {
  "worklet";
  const c = clamp01(value);
  return c * c * (3 - 2 * c);
}

function getMorphEmergence(bodyHeight: number, fullBodyHeight: number) {
  "worklet";
  const end = Math.min(EMERGE_END, fullBodyHeight * EMERGE_END_RATIO);
  const start = Math.min(EMERGE_START, end * 0.3);
  if (end <= start) return bodyHeight > 0 ? 1 : 0;
  return smoothstep((bodyHeight - start) / (end - start));
}

function getMorphExtents(
  canvasWidth: number,
  pillWidth: number,
  bodyWidth: number,
  bodyHeight: number,
  fullBodyHeight: number,
  align: TToastivaHorizontalAlign,
): IMorphExtents {
  "worklet";
  const pw = pillWidth > PH ? pillWidth : PH;
  const bw = bodyWidth > pw ? bodyWidth : pw;
  const h = bodyHeight > 0 ? bodyHeight : 0;

  let pillLeft: number;
  let fullLeft: number;
  if (align === "left") {
    pillLeft = 0;
    fullLeft = 0;
  } else if (align === "right") {
    pillLeft = canvasWidth - pw;
    fullLeft = canvasWidth - bw;
  } else {
    pillLeft = (canvasWidth - pw) / 2;
    fullLeft = (canvasWidth - bw) / 2;
  }
  const pillRight = pillLeft + pw;
  const fullRight = fullLeft + bw;
  const e = getMorphEmergence(h, fullBodyHeight);

  return {
    bodyBottom: PH + h,
    bodyLeft: pillLeft + (fullLeft - pillLeft) * e,
    bodyRight: pillRight + (fullRight - pillRight) * e,
    emergence: e,
    pillLeft,
    pillRight,
  };
}

function getMorphSide(
  overhang: number,
  bottom: number,
  emergence: number,
  radius: number,
  smoothing: number,
): IMorphSide {
  "worklet";
  const pr = PH / 2;
  const s = smoothing * emergence;
  const grow = 1 + s;
  const safeRadius = radius > 0 ? radius : 0;
  const o = overhang > 0 ? overhang : 0;

  let filletX = FILLET_RADIUS;
  let topX = safeRadius * grow;
  const shoulderWidth = filletX + topX;
  if (shoulderWidth > o) {
    const k = shoulderWidth > 0 ? o / shoulderWidth : 0;
    filletX *= k;
    topX *= k;
  }

  const wing = smoothstep(o / WING_RAMP);
  const blend = 1 - (1 - emergence) * (1 - wing);

  let topY = Math.min(safeRadius * grow, topX * SHOULDER_ASPECT);
  let bottomY = (pr + (safeRadius - pr) * blend) * grow;
  const below = bottom - PH + (1 - wing) * (PH - pr);
  const need = topY + bottomY;
  if (need > below) {
    const k = below > 0 ? below / need : 0;
    topY *= k;
    bottomY *= k;
  }
  const junction = Math.min(PH, bottom - bottomY - topY);
  const filletRoom = junction - pr > 0 ? junction - pr : 0;
  const filletY = Math.min(
    FILLET_RADIUS,
    filletX * SHOULDER_ASPECT,
    filletRoom,
  );

  return {
    bottomX: bottomY,
    bottomY,
    filletX,
    filletY,
    junction,
    smoothing: s,
    topX,
    topY,
  };
}

function morphShapePath(
  canvasWidth: number,
  pillWidth: number,
  bodyWidth: number,
  bodyHeight: number,
  fullBodyHeight: number,
  align: TToastivaHorizontalAlign,
  radius: number,
  smoothing: number,
): string {
  "worklet";
  const pr = PH / 2;
  const s = clamp01(smoothing);
  const x = getMorphExtents(
    canvasWidth,
    pillWidth,
    bodyWidth,
    bodyHeight,
    fullBodyHeight,
    align,
  );
  const bottom = x.bodyBottom;
  const r = getMorphSide(
    x.bodyRight - x.pillRight,
    bottom,
    x.emergence,
    radius,
    s,
  );
  const l = getMorphSide(
    x.pillLeft - x.bodyLeft,
    bottom,
    x.emergence,
    radius,
    s,
  );

  const bottomRun = x.bodyRight - x.bodyLeft;
  const bottomNeed = r.bottomX + l.bottomX;
  if (bottomNeed > bottomRun) {
    const k = bottomNeed > 0 ? bottomRun / bottomNeed : 0;
    r.bottomX *= k;
    l.bottomX *= k;
  }

  const pl = x.pillLeft;
  const pR = x.pillRight;
  const bl = x.bodyLeft;
  const br = x.bodyRight;

  return [
    `M ${pl + pr},0`,
    `H ${pR - pr}`,
    `A ${pr},${pr} 0 0 1 ${pR},${pr}`,
    smoothCornerXY(pR, r.junction, 0, 1, 1, 0, r.filletY, r.filletX, 0),
    smoothCornerXY(br, r.junction, 1, 0, 0, 1, r.topX, r.topY, r.smoothing),
    smoothCornerXY(
      br,
      bottom,
      0,
      1,
      -1,
      0,
      r.bottomY,
      r.bottomX,
      r.smoothing,
    ),
    smoothCornerXY(
      bl,
      bottom,
      -1,
      0,
      0,
      -1,
      l.bottomX,
      l.bottomY,
      l.smoothing,
    ),
    smoothCornerXY(bl, l.junction, 0, -1, 1, 0, l.topY, l.topX, l.smoothing),
    smoothCornerXY(pl, l.junction, 1, 0, 0, -1, l.filletX, l.filletY, 0),
    `L ${pl},${pr}`,
    `A ${pr},${pr} 0 0 1 ${pl + pr},0`,
    "Z",
  ].join(" ");
}

function morphPanelPath(
  canvasWidth: number,
  bodyWidth: number,
  height: number,
  t: number,
  align: TToastivaHorizontalAlign,
  radius: number,
  smoothing: number,
): string {
  "worklet";
  const s = clamp01(smoothing);
  const grow = 1 + s;
  const h = height > PH ? height : PH;
  const left =
    align === "left"
      ? 0
      : align === "right"
        ? canvasWidth - bodyWidth
        : (canvasWidth - bodyWidth) / 2;
  const right = left + bodyWidth;
  const startR = PH / 2;
  const targetR = Math.min(radius, bodyWidth / 2);
  const p = clamp01(t);
  const r = Math.min(
    startR + (targetR - startR) * p,
    bodyWidth / 2 / grow,
    h / 2 / grow,
  );
  return [
    `M ${left + r * grow},0`,
    smoothCorner(right, 0, 1, 0, 0, 1, r, s),
    smoothCorner(right, h, 0, 1, -1, 0, r, s),
    smoothCorner(left, h, -1, 0, 0, -1, r, s),
    smoothCorner(left, 0, 0, -1, 1, 0, r, s),
    "Z",
  ].join(" ");
}

export { getMorphEmergence, getMorphExtents, morphPanelPath, morphShapePath };
export type { IMorphExtents };
