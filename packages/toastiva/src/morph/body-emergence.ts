import { PH } from "../constants";

function getBodyWidthProgress<T extends number>(t: T) {
  "worklet";
  const c = t < 0 ? 0 : t > 1 ? 1 : t;
  return c * c * (3 - 2 * c);
}

function getShoulderStrength<T extends number>(overhang: T, bodyExtra: T) {
  "worklet";
  const byWidth = overhang / (PH / 2);
  const byHeight = bodyExtra / PH;
  const raw = byWidth > byHeight ? byWidth : byHeight;
  return raw < 0 ? 0 : raw > 1 ? 1 : raw;
}

export { getBodyWidthProgress, getShoulderStrength };
