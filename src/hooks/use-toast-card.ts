import { useEffect, useMemo, useRef, useState } from "react";
import { ToastBodyLayout, ToastHorizontalAlign } from "@/typings";
import type { IGooeyToastProps, TToastHorizontalAlign } from "@/typings";
import { useWindowDimensions } from "react-native";
import { SHOW_BODY_DELAY } from "../constants";
import { iconMap, typeColors } from "../icons";
import { getStackAlign } from "../utils/toast-align";
import { getToastHeights, getToastWidths } from "../utils/toast-layout";
import { getBodyLayout, getToastMeta } from "../utils/toast-meta";
import { resolveToastSpringConfig } from "../utils/toast-spring";
import { useToastAnimatedStyles } from "./use-toast-animated-styles";
import { useToastDismiss } from "./use-toast-dismiss";
import { useToastEffects } from "./use-toast-effects";
import { useToastGesture } from "./use-toast-gesture";
import { useToastMeasurements } from "./use-toast-measurements";
import { useToastSharedValues } from "./use-toast-shared-values";

function getMorphAlign(
  bodyLayout: ReturnType<typeof getBodyLayout>,
  stackAlign: TToastHorizontalAlign,
) {
  if (bodyLayout === ToastBodyLayout.Left) return ToastHorizontalAlign.Left;
  if (bodyLayout === ToastBodyLayout.Center) return ToastHorizontalAlign.Center;
  if (bodyLayout === ToastBodyLayout.Right) return ToastHorizontalAlign.Right;
  return stackAlign;
}

function useToastCard(props: IGooeyToastProps) {
  const { width } = useWindowDimensions();
  const hasBody = Boolean(props.toast.description || props.toast.action);
  const bodyLayout = getBodyLayout(
    props.toast.bodyLayout ?? props.defaultBodyLayout,
  );
  const meta = getToastMeta(
    props.toast,
    props.toast.showTimestamp ?? props.defaultShowTimestamp,
  );
  const headerMeasureKey = `${props.toast.type}:${props.toast.title}`;
  const cardMeasureKey = [
    headerMeasureKey,
    props.toast.description ?? "",
    props.toast.action?.label ?? "",
    meta ?? "",
    bodyLayout,
    width,
    props.toast.expandedWidth ?? props.defaultExpandedWidth ?? 0,
    props.toast.horizontalInset ?? props.defaultHorizontalInset,
  ].join("|");
  const isFront = props.index === 0;
  const isVisible = props.index < props.visibleCount;
  const isTop = props.position.startsWith("top");
  const values = useToastSharedValues();
  const measure = useToastMeasurements(
    headerMeasureKey,
    cardMeasureKey,
    props.toast.id,
    props.onHeightChange,
  );
  const springConfig = useMemo(
    () => resolveToastSpringConfig(props.defaultSpringConfig),
    [props.defaultSpringConfig],
  );
  const allowFrontExpansionRef = useRef(isFront);
  const hasExpandedContent = hasBody;
  const isReadyToExpand = hasExpandedContent && measure.isCardHeightCurrent;
  const [showBody, setShowBody] = useState(false);
  const showBodyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isFront) allowFrontExpansionRef.current = false;
  }, [isFront]);

  const shouldAutoExpand = isFront && allowFrontExpansionRef.current;

  useEffect(() => {
    if (isReadyToExpand) {
      showBodyTimerRef.current = setTimeout(
        () => setShowBody(true),
        SHOW_BODY_DELAY,
      );
      return () => {
        if (showBodyTimerRef.current) clearTimeout(showBodyTimerRef.current);
      };
    }
    setShowBody(false);
  }, [isReadyToExpand]);
  const widths = getToastWidths({
    title: props.toast.title,
    hasBody,
    screenWidth: width,
    measuredPillWidth: measure.isPillWidthCurrent
      ? measure.measuredPillWidth
      : 0,
    expandedWidth: props.toast.expandedWidth ?? props.defaultExpandedWidth,
    horizontalInset:
      props.toast.horizontalInset ?? props.defaultHorizontalInset,
  });
  const heights = getToastHeights(
    measure.measuredHeight,
    props.frontHeight,
    isFront,
  );
  const dismiss = useToastDismiss({
    toast: props.toast,
    expanded: props.expanded,
    hasBody,
    showBody,
    isFront,
    isVisible,
    isExpandedCandidate: props.expanded || shouldAutoExpand,
    onRemove: props.onRemove,
    shouldAutoExpand,
    springConfig,
    values,
  });
  const showExpandedBody =
    showBody && !dismiss.isDismissing && (props.expanded || shouldAutoExpand);
  const stackAlign = getStackAlign(props.position);
  const morphAlign = getMorphAlign(bodyLayout, stackAlign);
  const headerAlign = morphAlign;
  const animated = useToastAnimatedStyles({
    bodyWidth: widths.bodyWidth,
    collapsedHeight: heights.collapsedCardHeight,
    expanded: props.expanded,
    expandedHeight: heights.expandedHeight,
    index: props.index,
    morphAlign,
    isFront,
    isTop,
    pillWidth: widths.pillWidth,
    renderHeight: heights.renderHeight,
    totalCount: props.totalCount,
    values,
  });

  useToastEffects({
    bodyWidth: widths.bodyWidth,
    toast: props.toast,
    expanded: props.expanded,
    expandedOffset: props.expandedOffset,
    collapsedOffset: props.collapsedOffset,
    expandedHeight: heights.expandedHeight,
    collapsedCardHeight: heights.collapsedCardHeight,
    hasBody,
    isFront,
    isTop,
    isDismissing: dismiss.isDismissing,
    pillWidth: widths.pillWidth,
    springConfig,
    shouldAutoExpand,
    shouldShowExpandedBody: showExpandedBody,
    stackDepth: Math.min(props.index, props.visibleCount - 1),
    values,
  });

  return {
    Icon: iconMap[props.toast.type],
    animated,
    bodyLayout,
    color: typeColors[props.toast.type],
    dismiss,
    gesture: useToastGesture({
      isTop,
      swipeToDismiss: props.swipeToDismiss,
      dismissible: props.toast.dismissible,
      swipeThreshold: props.swipeThreshold,
      onDismiss: dismiss.handleDismiss,
      values,
    }),
    hasBody,
    headerAlign,
    heights,
    isFront,
    morphAlign,
    isTop,
    isVisible,
    measure,
    meta,
    stackAlign,
    showBody,
    widths,
  };
}

export { useToastCard };
