import type { IGooeyToastData, TToastBodyLayout } from "@/typings";
import { ToastBodyLayout, ToastHorizontalAlign } from "@/typings";

function getBodyLayout(layout?: TToastBodyLayout) {
  return layout ?? ToastBodyLayout.Spread;
}

function getBodyTextAlign(layout: TToastBodyLayout) {
  if (layout === ToastBodyLayout.Center) return ToastHorizontalAlign.Center;
  if (layout === ToastBodyLayout.Right) return ToastHorizontalAlign.Right;
  return ToastHorizontalAlign.Left;
}

function getToastMeta(toast: IGooeyToastData, showTimestamp: boolean) {
  if (toast.meta) return toast.meta;
  if (!showTimestamp) return undefined;
  return new Date(toast.createdAt).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
}

export { getBodyLayout, getBodyTextAlign, getToastMeta };
