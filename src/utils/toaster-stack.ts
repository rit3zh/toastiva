import type { IHeightEntry, IGooeyToastData } from "@/typings";
import { PH } from "../constants";

function buildHeightMap(heights: IHeightEntry[]) {
  return heights.reduce(
    (map, entry) => map.set(entry.toastId, entry.height),
    new Map<string, number>(),
  );
}

function getExpandedOffsets(
  toasts: IGooeyToastData[],
  heights: Map<string, number>,
  gap: number,
) {
  const offsets = new Map<string, number>();
  let running = 0;

  toasts.forEach((toast, index) => {
    offsets.set(toast.id, running);
    running +=
      (heights.get(toast.id) ?? PH) + (index < toasts.length - 1 ? gap : 0);
  });

  return offsets;
}

function getCollapsedOffsets(
  toasts: IGooeyToastData[],
  visibleToasts: number,
  gap: number,
) {
  return toasts.reduce(
    (map, toast, index) =>
      map.set(toast.id, Math.min(index, visibleToasts - 1) * gap),
    new Map<string, number>(),
  );
}

function getFrontHeight(
  toasts: IGooeyToastData[],
  heights: Map<string, number>,
) {
  const frontToast = toasts[0];
  return frontToast ? Math.max(heights.get(frontToast.id) ?? PH, PH) : PH;
}

export {
  buildHeightMap,
  getCollapsedOffsets,
  getExpandedOffsets,
  getFrontHeight,
};
