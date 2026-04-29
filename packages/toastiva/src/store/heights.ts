import type { IHeightEntry, THeightsListener } from "../typings";
import { heightsListeners, notifyHeights, storeState } from "./state";

function updateHeight<T extends string, H extends number>(
  toastId: T,
  height: H,
) {
  const current = storeState.heights.find((entry) => entry.toastId === toastId);
  if (current && Math.abs(current.height - height) < 1) return;
  storeState.heights =
    current ?
      storeState.heights.map((entry) =>
        entry.toastId === toastId ? { ...entry, height } : entry,
      )
    : [{ toastId, height }, ...storeState.heights];
  void notifyHeights();
}

function subscribeHeights<T extends THeightsListener>(listener: T) {
  heightsListeners.add(listener);
  return () => heightsListeners.delete(listener);
}

function getHeights(): IHeightEntry[] {
  return storeState.heights satisfies IHeightEntry[];
}

export { getHeights, subscribeHeights, updateHeight };
