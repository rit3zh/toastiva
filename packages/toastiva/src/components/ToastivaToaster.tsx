import type { IToastivaConfig, IToastivaData } from "../typings";
import {
  ToastivaBodyLayout,
  ToastivaMode,
  ToastivaPosition,
  ToastivaVerticalPosition,
} from "../typings";
import React, { memo, useEffect, useMemo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  DEFAULT_DURATION,
  DEFAULT_GAP,
  DEFAULT_HORIZONTAL_INSET,
  DEFAULT_OFFSET,
  DEFAULT_SWIPE_THRESHOLD,
  DEFAULT_VISIBLE_TOASTS,
} from "../constants";
import { ToastThemeProvider } from "../context/theme";
import { useToasterState } from "../hooks/use-toaster-state";
import { removeToast, updateHeight } from "../store";
import { filterToastsForVertical } from "../utils/toast-position";
import { buildHeightMap } from "../utils/toaster-stack";
import { ToastMorphSlot } from "./ToastMorphSlot";
import { ToastStack } from "./ToastStack";

const ToastivaToaster: React.MemoExoticComponent<React.FC<IToastivaConfig>> =
  memo(
    ({
      position = ToastivaPosition.TopCenter,
      duration = DEFAULT_DURATION,
      visibleToasts = DEFAULT_VISIBLE_TOASTS,
      gap = DEFAULT_GAP,
      expand = false,
      bodyLayout = ToastivaBodyLayout.Spread,
      expandedWidth,
      horizontalInset = DEFAULT_HORIZONTAL_INSET,
      mode = ToastivaMode.Stack,
      offset: offsetProp = DEFAULT_OFFSET,
      showProgress = true,
      showTimestamp = true,
      springConfig,
      swipeToDismiss = true,
      swipeThreshold = DEFAULT_SWIPE_THRESHOLD,
      theme,
    }: IToastivaConfig): React.JSX.Element | null => {
      const { bottom, top } = useSafeAreaInsets();
      const { heights, toasts } = useToasterState<number>(duration);
      const heightMap = useMemo(() => buildHeightMap(heights), [heights]);
      const [expandedTop, setExpandedTop] = useState<boolean>(expand);
      const [expandedBottom, setExpandedBottom] = useState<boolean>(expand);
      const topToasts = useMemo<IToastivaData[]>(
        () =>
          filterToastsForVertical(
            toasts,
            position,
            ToastivaVerticalPosition.Top,
          ),
        [position, toasts],
      );
      const bottomToasts = useMemo<IToastivaData[]>(
        () =>
          filterToastsForVertical(
            toasts,
            position,
            ToastivaVerticalPosition.Bottom,
          ),
        [position, toasts],
      );
      const isMorphMode = mode === ToastivaMode.Morph;

      useEffect(() => setExpandedTop(expand), [expand]);
      useEffect(() => setExpandedBottom(expand), [expand]);
      useEffect(() => {
        if (topToasts.length <= 1) setExpandedTop(false);
      }, [topToasts.length]);
      useEffect(() => {
        if (bottomToasts.length <= 1) setExpandedBottom(false);
      }, [bottomToasts.length]);
      useEffect(() => {
        if (!isMorphMode) return;
        topToasts.slice(1).forEach((toast) => removeToast(toast.id));
        bottomToasts.slice(1).forEach((toast) => removeToast(toast.id));
      }, [bottomToasts, isMorphMode, topToasts]);

      if (!toasts.length) return null;
      if (isMorphMode) {
        return (
          <ToastThemeProvider theme={theme}>
            <ToastMorphSlot
              bottomInset={bottom}
              heightMap={heightMap}
              horizontalInset={horizontalInset}
              offset={offsetProp}
              onHeightChange={updateHeight}
              onRemove={removeToast}
              position={position}
              showProgress={showProgress}
              showTimestamp={showTimestamp}
              swipeThreshold={swipeThreshold}
              swipeToDismiss={swipeToDismiss}
              toasts={bottomToasts}
              defaultBodyLayout={bodyLayout}
              defaultExpandedWidth={expandedWidth}
              defaultSpringConfig={springConfig}
              topInset={top}
              vertical="bottom"
            />
            <ToastMorphSlot
              bottomInset={bottom}
              heightMap={heightMap}
              horizontalInset={horizontalInset}
              offset={offsetProp}
              onHeightChange={updateHeight}
              onRemove={removeToast}
              position={position}
              swipeThreshold={swipeThreshold}
              showProgress={showProgress}
              showTimestamp={showTimestamp}
              swipeToDismiss={swipeToDismiss}
              toasts={topToasts}
              defaultBodyLayout={bodyLayout}
              defaultExpandedWidth={expandedWidth}
              defaultSpringConfig={springConfig}
              topInset={top}
              vertical="top"
            />
          </ToastThemeProvider>
        );
      }

      return (
        <ToastThemeProvider theme={theme}>
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
            showProgress={showProgress}
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
            showProgress={showProgress}
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
        </ToastThemeProvider>
      );
    },
  );

export { ToastivaToaster };
