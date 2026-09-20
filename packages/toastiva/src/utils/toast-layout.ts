import type { IToastHeightParams, IToastWidthParams } from "../typings";
import {
  BADGE_SIZE,
  BODY_PADDING_BOTTOM,
  BODY_PADDING_H,
  DESC_SIZE,
  EXPANDED_TOAST_MAX_WIDTH,
  ICON_GAP,
  MORPH_OVERSHOOT,
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
    params.measuredPillWidth > 0
      ? Math.min(params.measuredPillWidth, maxWidth)
      : estimated;
  const expandedWidth = Math.min(
    params.expandedWidth ?? EXPANDED_TOAST_MAX_WIDTH,
    availableWidth,
  );

  const bodyWidth = Math.max(pillWidth, expandedWidth);

  return {
    bodyWidth,
    maxWidth: availableWidth,
    pillWidth,
  };
}

function getToastHeights(params: IToastHeightParams) {
  const calculatedHeight = getCalculatedExpandedHeight(params);
  const expandedHeight = Math.max(
    params.expandedHeightOverride ?? calculatedHeight ?? params.measuredHeight,
    PH,
  );
  const collapsedCardHeight = params.isFront
    ? PH
    : Math.max(params.frontHeight, PH);

  const overshootHeadroom = (expandedHeight - PH) * MORPH_OVERSHOOT;
  return {
    collapsedCardHeight,
    expandedHeight,
    renderHeight: Math.max(
      expandedHeight + overshootHeadroom,
      params.frontHeight,
      PH,
    ),
  };
}

function getCalculatedExpandedHeight(params: IToastHeightParams) {
  if (params.hasCustomContent) return undefined;
  if (!params.description && !params.actionLabel) return PH;

  const bodyWidth = Math.max(PH, params.bodyWidth - BODY_PADDING_H * 2);
  const descriptionHeight = params.description
    ? getDescriptionHeight({
        bodyLayout: params.bodyLayout,
        bodyWidth,
        description: params.description,
        hasMeta: Boolean(params.meta),
      })
    : 0;
  const actionHeight = params.actionLabel ? ACTION_BUTTON_MIN_HEIGHT : 0;
  const descriptionActionGap =
    params.description && params.actionLabel ? DESCRIPTION_ACTION_GAP : 0;
  const centerActionBottomGap =
    params.bodyLayout === "center" && params.actionLabel
      ? CENTER_ACTION_BOTTOM_GAP
      : 0;
  const progressHeight = params.showProgress ? INLINE_PROGRESS_GAP_HEIGHT : 0;
  const bodyHeight =
    BODY_PADDING_TOP +
    descriptionHeight +
    descriptionActionGap +
    actionHeight +
    centerActionBottomGap +
    progressHeight +
    BODY_PADDING_BOTTOM;

  return PH + bodyHeight;
}

function getDescriptionHeight({
  bodyLayout,
  bodyWidth,
  description,
  hasMeta,
}: Pick<IToastHeightParams, "bodyLayout"> & {
  bodyWidth: number;
  description: string;
  hasMeta: boolean;
}) {
  const textWidth =
    bodyLayout === "spread" || bodyLayout === "right"
      ? bodyWidth - (hasMeta ? DESCRIPTION_META_WIDTH + DESCRIPTION_ROW_GAP : 0)
      : bodyWidth;
  const availableTextWidth = Math.max(DESC_SIZE, textWidth);
  const lineHeight = DESC_SIZE * 1.55;
  const lineCount = description
    .split("\n")
    .reduce(
      (count, line) =>
        count +
        Math.max(
          1,
          Math.ceil(
            (line.length * DESCRIPTION_CHAR_WIDTH) / availableTextWidth,
          ),
        ),
      0,
    );

  return lineCount * lineHeight;
}

const BODY_PADDING_TOP = 6;
const ACTION_BUTTON_MIN_HEIGHT = 40;
const CENTER_ACTION_BOTTOM_GAP = 10;
const DESCRIPTION_ACTION_GAP = 10;
const DESCRIPTION_CHAR_WIDTH = DESC_SIZE * 0.52;
const DESCRIPTION_META_WIDTH = 82;
const DESCRIPTION_ROW_GAP = 14;
const INLINE_PROGRESS_GAP_HEIGHT = 15;

export { getToastHeights, getToastWidths };
