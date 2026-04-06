import type {
  IGooeyToastData,
  TGooeyToastPosition,
  TToastHorizontalAlign,
  TToastVerticalPosition,
} from "@/typings";
import { ToastHorizontalAlign, ToastVerticalPosition } from "@/typings";

function getDefaultVertical(
  position: TGooeyToastPosition,
): TToastVerticalPosition {
  return position.startsWith(ToastVerticalPosition.Top)
    ? ToastVerticalPosition.Top
    : ToastVerticalPosition.Bottom;
}

function getHorizontalPosition(
  position: TGooeyToastPosition,
): TToastHorizontalAlign {
  if (position.endsWith(ToastHorizontalAlign.Right)) {
    return ToastHorizontalAlign.Right;
  }

  if (position.includes(ToastHorizontalAlign.Center)) {
    return ToastHorizontalAlign.Center;
  }

  return ToastHorizontalAlign.Left;
}

function resolveToastStackPosition(
  basePosition: TGooeyToastPosition,
  vertical?: TToastVerticalPosition,
): TGooeyToastPosition {
  const nextVertical = vertical ?? getDefaultVertical(basePosition);
  const horizontal = getHorizontalPosition(basePosition);
  return `${nextVertical}-${horizontal}` as TGooeyToastPosition;
}

function filterToastsForVertical(
  toasts: IGooeyToastData[],
  basePosition: TGooeyToastPosition,
  vertical: TToastVerticalPosition,
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
