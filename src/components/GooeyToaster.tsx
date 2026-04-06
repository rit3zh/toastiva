import { styles } from "@/styles/toast.styles";
import type { IGooeyToasterConfig, IToastStackProps } from "@/typings";
import {
  ToastBodyLayout,
  ToastHorizontalAlign,
  ToastPosition,
  ToastVerticalPosition,
} from "@/typings";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  DEFAULT_DURATION,
  DEFAULT_GAP,
  DEFAULT_HORIZONTAL_INSET,
  DEFAULT_OFFSET,
  DEFAULT_SWIPE_THRESHOLD,
  DEFAULT_VISIBLE_TOASTS,
} from "../constants";
import { useToasterState } from "../hooks/use-toaster-state";
import { removeToast, updateHeight } from "../store";
import {
  filterToastsForVertical,
  getHorizontalPosition,
  resolveToastStackPosition,
} from "../utils/toast-position";
import {
  buildHeightMap,
  getCollapsedOffsets,
  getExpandedOffsets,
  getFrontHeight,
} from "../utils/toaster-stack";
import { GooeyToast } from "./GooeyToast";

function GooeyToaster({
  position = ToastPosition.TopCenter,
  duration = DEFAULT_DURATION,
  visibleToasts = DEFAULT_VISIBLE_TOASTS,
  gap = DEFAULT_GAP,
  expand = false,
  bodyLayout = ToastBodyLayout.Spread,
  expandedWidth,
  horizontalInset = DEFAULT_HORIZONTAL_INSET,
  offset: offsetProp = DEFAULT_OFFSET,
  showTimestamp = true,
  springConfig,
  swipeToDismiss = true,
  swipeThreshold = DEFAULT_SWIPE_THRESHOLD,
}: IGooeyToasterConfig) {
  const { bottom, top } = useSafeAreaInsets();
  const { heights, toasts } = useToasterState(duration);
  const heightMap = useMemo(() => buildHeightMap(heights), [heights]);
  const [expandedTop, setExpandedTop] = useState(expand);
  const [expandedBottom, setExpandedBottom] = useState(expand);
  const topToasts = useMemo(
    () => filterToastsForVertical(toasts, position, ToastVerticalPosition.Top),
    [position, toasts],
  );
  const bottomToasts = useMemo(
    () =>
      filterToastsForVertical(toasts, position, ToastVerticalPosition.Bottom),
    [position, toasts],
  );

  useEffect(() => setExpandedTop(expand), [expand]);
  useEffect(() => setExpandedBottom(expand), [expand]);
  useEffect(() => {
    if (topToasts.length <= 1) setExpandedTop(false);
  }, [topToasts.length]);
  useEffect(() => {
    if (bottomToasts.length <= 1) setExpandedBottom(false);
  }, [bottomToasts.length]);

  if (!toasts.length) return null;
  return (
    <>
      <ToastStack
        bottomInset={bottom}
        expand={expandedBottom}
        gap={gap}
        heightMap={heightMap}
        horizontalInset={horizontalInset}
        offset={offsetProp}
        onHeightChange={updateHeight}
        onRemove={removeToast}
        position={position}
        setExpanded={setExpandedBottom}
        showTimestamp={showTimestamp}
        swipeThreshold={swipeThreshold}
        swipeToDismiss={swipeToDismiss}
        toasts={bottomToasts}
        defaultBodyLayout={bodyLayout}
        defaultExpandedWidth={expandedWidth}
        defaultSpringConfig={springConfig}
        topInset={top}
        vertical="bottom"
        visibleToasts={visibleToasts}
      />
      <ToastStack
        bottomInset={bottom}
        expand={expandedTop}
        gap={gap}
        heightMap={heightMap}
        horizontalInset={horizontalInset}
        offset={offsetProp}
        onHeightChange={updateHeight}
        onRemove={removeToast}
        position={position}
        setExpanded={setExpandedTop}
        showTimestamp={showTimestamp}
        swipeThreshold={swipeThreshold}
        swipeToDismiss={swipeToDismiss}
        toasts={topToasts}
        defaultBodyLayout={bodyLayout}
        defaultExpandedWidth={expandedWidth}
        defaultSpringConfig={springConfig}
        topInset={top}
        vertical="top"
        visibleToasts={visibleToasts}
      />
    </>
  );
}

function ToastStack(props: IToastStackProps) {
  const { setExpanded, toasts } = props;
  const toastCount = toasts.length;

  const toggleExpanded = useCallback(() => {
    if (toastCount > 1) setExpanded((current) => !current);
  }, [setExpanded, toastCount]);

  if (!toastCount) return null;

  const resolvedPosition = resolveToastStackPosition(
    props.position ?? ToastPosition.TopCenter,
    props.vertical,
  );
  const horizontalPosition = getHorizontalPosition(resolvedPosition);
  const isCenter = horizontalPosition === ToastHorizontalAlign.Center;
  const isRight = horizontalPosition === ToastHorizontalAlign.Right;
  const edgeOffset =
    (props.vertical === ToastVerticalPosition.Top
      ? props.topInset
      : props.bottomInset) + props.offset;
  const expandedOffsets = getExpandedOffsets(
    props.toasts,
    props.heightMap,
    props.gap,
  );
  const collapsedOffsets = getCollapsedOffsets(
    props.toasts,
    props.visibleToasts,
    props.gap,
  );
  const frontHeight = getFrontHeight(props.toasts, props.heightMap);

  return (
    <Pressable
      onPress={toggleExpanded}
      style={[
        styles.toastOuter,
        styles.toasterContainer,
        props.vertical === ToastVerticalPosition.Top
          ? { top: edgeOffset }
          : { bottom: edgeOffset },
        isCenter
          ? styles.toasterCenter
          : isRight
            ? styles.toasterRight
            : styles.toasterLeft,
      ]}
      pointerEvents="box-none"
    >
      <View style={styles.toasterStack} pointerEvents="box-none">
        {props.toasts.map((toast, index) => (
          <GooeyToast
            key={toast.id}
            toast={toast}
            index={index}
            totalCount={props.toasts.length}
            visibleCount={props.visibleToasts}
            expanded={props.expand}
            expandedOffset={expandedOffsets.get(toast.id) ?? 0}
            collapsedOffset={collapsedOffsets.get(toast.id) ?? 0}
            frontHeight={frontHeight}
            position={resolvedPosition}
            gap={props.gap}
            swipeToDismiss={props.swipeToDismiss}
            swipeThreshold={props.swipeThreshold}
            defaultBodyLayout={
              props.defaultBodyLayout ?? ToastBodyLayout.Spread
            }
            defaultExpandedWidth={props.defaultExpandedWidth}
            defaultHorizontalInset={props.horizontalInset}
            defaultShowTimestamp={props.showTimestamp}
            defaultSpringConfig={props.defaultSpringConfig}
            onRemove={props.onRemove}
            onHeightChange={props.onHeightChange}
            onStackPress={toggleExpanded}
          />
        ))}
      </View>
    </Pressable>
  );
}

export { GooeyToaster };
