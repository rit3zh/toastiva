import type {
  IToastivaData,
  TToastivaHorizontalAlign,
  TToastivaPosition,
  TToastivaVerticalPosition,
} from "../typings";
import { ToastivaHorizontalAlign, ToastivaVerticalPosition } from "../typings";

function getDefaultVertical(
  position: TToastivaPosition,
): TToastivaVerticalPosition {
  return position.startsWith(ToastivaVerticalPosition.Top) ?
      ToastivaVerticalPosition.Top
    : ToastivaVerticalPosition.Bottom;
}

function getHorizontalPosition(
  position: TToastivaPosition,
): TToastivaHorizontalAlign {
  if (position.endsWith(ToastivaHorizontalAlign.Right)) {
    return ToastivaHorizontalAlign.Right;
  }

  if (position.includes(ToastivaHorizontalAlign.Center)) {
    return ToastivaHorizontalAlign.Center;
  }

  return ToastivaHorizontalAlign.Left;
}

function resolveToastStackPosition(
  basePosition: TToastivaPosition,
  vertical?: TToastivaVerticalPosition,
): TToastivaPosition {
  const nextVertical = vertical ?? getDefaultVertical(basePosition);
  const horizontal = getHorizontalPosition(basePosition);
  return `${nextVertical}-${horizontal}` as TToastivaPosition;
}

function filterToastsForVertical(
  toasts: IToastivaData[],
  basePosition: TToastivaPosition,
  vertical: TToastivaVerticalPosition,
) {
  return toasts.filter(
    (toast) =>
      getDefaultVertical(
        resolveToastStackPosition(basePosition, toast.position),
      ) === vertical,
  );
}

export {
  filterToastsForVertical,
  getDefaultVertical,
  getHorizontalPosition,
  resolveToastStackPosition,
};
