import type { IToastWidthParams } from "@/typings";
import {
  EXPANDED_TOAST_MAX_WIDTH,
  ICON_GAP,
  ICON_SIZE,
  PILL_PADDING_H,
  PH,
  TITLE_SIZE,
  TOAST_MAX_WIDTH,
} from "../constants";

function getToastWidths(params: IToastWidthParams) {
  const availableWidth = Math.max(
    PH,
    params.screenWidth - params.horizontalInset * 2,
  );
  const maxWidth = Math.min(availableWidth, TOAST_MAX_WIDTH);
  const textWidth = params.title.length * (TITLE_SIZE * 0.58);
  const estimated = Math.min(
    textWidth + PILL_PADDING_H * 2 + ICON_SIZE + ICON_GAP + 4,
    maxWidth,
  );
  const pillWidth =
    params.measuredPillWidth > 0
      ? Math.min(params.measuredPillWidth, maxWidth)
      : estimated;
  const expandedWidth = Math.min(
    params.expandedWidth ?? EXPANDED_TOAST_MAX_WIDTH,
    availableWidth,
  );

  return {
    bodyWidth: params.hasBody ? Math.max(pillWidth, expandedWidth) : pillWidth,
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
