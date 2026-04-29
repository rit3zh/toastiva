import type { TToastivaHorizontalAlign, TToastivaPosition } from "../typings";
import { ToastivaHorizontalAlign } from "../typings";

function getStackAlign(position: TToastivaPosition): TToastivaHorizontalAlign {
  if (position.endsWith(ToastivaHorizontalAlign.Right)) {
    return ToastivaHorizontalAlign.Right;
  }

  if (position.includes(ToastivaHorizontalAlign.Center)) {
    return ToastivaHorizontalAlign.Center;
  }

  return ToastivaHorizontalAlign.Left;
}

export { getStackAlign };
