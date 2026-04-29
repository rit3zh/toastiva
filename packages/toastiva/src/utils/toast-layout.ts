import type { IToastWidthParams } from "../typings";
import {
  BADGE_SIZE,
  EXPANDED_TOAST_MAX_WIDTH,
  ICON_GAP,
  PH,
  PILL_PADDING_H,
  TITLE_SIZE,
  TOAST_MAX_WIDTH,
} from "../constants";

function getToastWidths<T extends IToastWidthParams>(params: T) {
  const availableWidth = Math.max(
    PH,
    params.screenWidth - params.horizontalInset * 2,
  );
  const maxWidth = Math.min(availableWidth, TOAST_MAX_WIDTH);
  const textWidth = params?.title?.length * (TITLE_SIZE * 0.72);
  const estimated = Math.min(
    textWidth + PILL_PADDING_H * 2 + BADGE_SIZE + ICON_GAP + 8,
    maxWidth,
  );
  const pillWidth =
    params.measuredPillWidth > 0 ?
      Math.min(params.measuredPillWidth, maxWidth)
    : estimated;
  const expandedWidth = Math.min(
    params.expandedWidth ?? EXPANDED_TOAST_MAX_WIDTH,
    availableWidth,
  );

  // Sileo keeps a constant SVG canvas WIDTH (350) and only animates the pill
  // rect inside it — the rounded ends are always inside the canvas, regardless
  // of the current pill width. We mirror that here by sizing bodyWidth to the
  // expanded width even for compact toasts. The animated `shellStyle.width`
  // (= pillWidth.value when collapsed) plus `clipContainer`'s overflow:hidden
  // do all the visual cropping. This eliminates the bug where bodyWidth would
  // snap to a smaller measured pill while pillWidth.value was still springing,
  // clipping the path's rounded right edge into a flat "square".
  const bodyWidth = Math.max(pillWidth, expandedWidth);

  return {
    bodyWidth,
    maxWidth: availableWidth,
    pillWidth,
  };
}

function getToastHeights(
  measuredHeight: number,
  frontHeight: number,
  isFront: boolean,
) {
  const expandedHeight = Math.max(measuredHeight, PH);
  const collapsedCardHeight = isFront ? PH : Math.max(frontHeight, PH);
  return {
    collapsedCardHeight,
    expandedHeight,
    renderHeight: Math.max(expandedHeight, frontHeight, PH),
  };
}

export { getToastHeights, getToastWidths };
