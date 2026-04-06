import type { IHeightEntry, THeightsListener } from "@/typings";
import { heightsListeners, notifyHeights, storeState } from "./state";

function updateHeight(toastId: string, height: number) {
  const current = storeState.heights.find((entry) => entry.toastId === toastId);
  if (current && Math.abs(current.height - height) < 1) return;
  storeState.heights = current
    ? storeState.heights.map((entry) =>
        entry.toastId === toastId ? { ...entry, height } : entry,
      )
    : [{ toastId, height }, ...storeState.heights];
  notifyHeights();
}

function subscribeHeights(listener: THeightsListener) {
  heightsListeners.add(listener);
  return () => heightsListeners.delete(listener);
}

function getHeights(): IHeightEntry[] {
  return storeState.heights;
}

export { getHeights, subscribeHeights, updateHeight };
