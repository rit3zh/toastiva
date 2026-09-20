import { PH } from "../constants";
import { getShoulderStrength } from "./body-emergence";

interface IMorphBodyGeometry {
  bodyTop: number;
  curve: number;
  grow: number;
  rBottom: number;
  rTopMax: number;
  sEff: number;
  yJunction: number;
}

function getBodyGeometry(
  bodyH: number,
  overhang: number,
  radius: number,
  smoothing: number,
  t: number,
  halfBottomWidth: number,
): IMorphBodyGeometry {
  "worklet";
  const pr = PH / 2;
  const bodyExtra = bodyH - PH;
  const shoulder = getShoulderStrength<number>(overhang, bodyExtra);
  const sEff = smoothing * shoulder;
  const grow = 1 + sEff;
  const safeRadius = radius > 0 ? radius : 0;
  const targetR = pr + (safeRadius - pr) * shoulder;

  const wantCurve = 14 * t * shoulder;
  const wantTop = Math.max(0, Math.min(safeRadius, bodyExtra * 0.45, overhang));
  const wantBottom = Math.max(0, Math.min(targetR, halfBottomWidth / grow));

  const budget = bodyH - pr;
  const need = wantCurve + (wantTop + wantBottom) * grow;
  const k = need > budget && need > 0 ? budget / need : 1;

  const curve = wantCurve * k;
  const rTopMax = wantTop * k;
  const rBottom = wantBottom * k;
  const bodyTop = Math.min(PH, bodyH - (rTopMax + rBottom) * grow);
  const yJunction = Math.max(pr, bodyTop - curve);

  return { bodyTop, curve, grow, rBottom, rTopMax, sEff, yJunction };
}

export { getBodyGeometry };
export type { IMorphBodyGeometry };
