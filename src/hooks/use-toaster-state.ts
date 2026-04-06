import type { IHeightEntry, IUseToasterStateResult } from "@/typings";
import { useEffect, useState } from "react";
import {
  getHeights,
  getToasts,
  setDefaultDuration,
  subscribeHeights,
  subscribeToasts,
} from "../store";

function useToasterState(duration: number): IUseToasterStateResult {
  const [toasts, setToasts] = useState(getToasts);
  const [heights, setHeights] = useState<IHeightEntry[]>(getHeights);

  useEffect(() => setDefaultDuration(duration), [duration]);
  useEffect(() => {
    const unsubscribeToasts = subscribeToasts(setToasts);
    const unsubscribeHeights = subscribeHeights(setHeights);
    return () => {
      unsubscribeToasts();
      unsubscribeHeights();
    };
  }, []);
  return { heights, toasts };
}

export { useToasterState };
