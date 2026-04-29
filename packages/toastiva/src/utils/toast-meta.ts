import type { IToastivaData, TToastivaBodyLayout } from "../typings";
import { ToastivaBodyLayout, ToastivaHorizontalAlign } from "../typings";

function getBodyLayout(layout?: TToastivaBodyLayout) {
  return layout ?? ToastivaBodyLayout.Spread;
}

function getBodyTextAlign(layout: TToastivaBodyLayout) {
  if (layout === ToastivaBodyLayout.Center)
    return ToastivaHorizontalAlign.Center;
  if (layout === ToastivaBodyLayout.Right) return ToastivaHorizontalAlign.Right;
  return ToastivaHorizontalAlign.Left;
}

function getToastMeta<T extends IToastivaData, U extends boolean>(
  toast: T,
  showTimestamp: U,
) {
  if (toast.meta) return toast.meta;
  if (!showTimestamp) return undefined;
  return new Date(toast.createdAt).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
}

export { getBodyLayout, getBodyTextAlign, getToastMeta };
