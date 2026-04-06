import type { TGooeyToastPosition, TToastHorizontalAlign } from "@/typings";
import { ToastHorizontalAlign } from "@/typings";

function getStackAlign(position: TGooeyToastPosition): TToastHorizontalAlign {
  if (position.endsWith(ToastHorizontalAlign.Right)) {
    return ToastHorizontalAlign.Right;
  }

  if (position.includes(ToastHorizontalAlign.Center)) {
    return ToastHorizontalAlign.Center;
  }

  return ToastHorizontalAlign.Left;
}

export { getStackAlign };
