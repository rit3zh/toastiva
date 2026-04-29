import type { IUseToastDismissParams } from "../typings";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Easing,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SHOW_BODY_DELAY } from "../constants";
import {
  getCollapseDuration,
  getCollapseSettleDuration,
  getDisplayDuration,
} from "../utils/toast-timing";

function useToastDismiss(params: IUseToastDismissParams) {
  const {
    expanded,
    hasBody,
    showBody,
    isExpandedCandidate,
    isFront,
    isVisible,
    onRemove,
    paused = false,
    shouldAutoExpand,
    springConfig,
    toast,
    values,
  } = params;
  const [isDismissing, setIsDismissing] = useState(false);
  const dismissedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remainingRef = useRef<number | null>(null);
  const timerStartRef = useRef(0);
  const expandedBodyVisibleRef = useRef(false);
  const collapseDuration = getCollapseDuration(toast);
  const collapseSettleDuration = getCollapseSettleDuration(toast);
  const displayDuration = getDisplayDuration(toast);

  useEffect(() => {
    dismissedRef.current = false;
    remainingRef.current = null;
    timerStartRef.current = 0;
    expandedBodyVisibleRef.current = false;
    setIsDismissing(false);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [toast.id]);

  useEffect(() => {
    expandedBodyVisibleRef.current =
      hasBody && showBody && !isDismissing && isExpandedCandidate;
  }, [hasBody, isDismissing, isExpandedCandidate, showBody]);

  const handleDismiss = useCallback(() => {
    if (paused) return;
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    const collapseBeforeExit = hasBody && expandedBodyVisibleRef.current;
    setIsDismissing(collapseBeforeExit);
    if (timerRef.current) clearTimeout(timerRef.current);

    values.morphProgress.value = collapseBeforeExit
      ? withSpring(0, springConfig.morph)
      : withTiming(0, { duration: 100 });
    values.bodyOpacity.value = withTiming(0, {
      duration: collapseBeforeExit ? collapseSettleDuration : 90,
    });
    values.descriptionProgress.value = withSpring(0, springConfig.bodyReveal);
    values.actionProgress.value = withSpring(0, springConfig.bodyReveal);
    values.squishY.value = withSequence(
      withTiming(0.88, { duration: 60 }),
      withSpring(1, springConfig.squish),
    );
    values.squishX.value = withSequence(
      withTiming(1.06, { duration: 60 }),
      withSpring(1, springConfig.squish),
    );

    const exitDelay = collapseBeforeExit ? collapseDuration + 24 : 40;
    values.removeProgress.value = withDelay(
      exitDelay,
      withTiming(1, { duration: 220, easing: Easing.in(Easing.quad) }),
    );
    toast.onDismiss?.();
    setTimeout(() => onRemove(toast.id), exitDelay + 280);
  }, [
    collapseDuration,
    collapseSettleDuration,
    hasBody,
    onRemove,
    paused,
    springConfig,
    toast,
    values,
  ]);

  useEffect(() => {
    if (paused) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    // Don't gate on isVisible — toasts beyond visibleCount still need to
    // age out. Otherwise spammed toasts pile up in the back of the stack
    // forever, only starting their timer once they slide into view.
    if (hasBody && shouldAutoExpand && !showBody) return;

    const autoDismissDelay = hasBody && shouldAutoExpand
      ? Math.max(0, displayDuration - SHOW_BODY_DELAY - collapseDuration)
      : displayDuration;

    const delay = remainingRef.current ?? autoDismissDelay;
    timerStartRef.current = Date.now();

    timerRef.current = setTimeout(() => {
      remainingRef.current = null;
      toast.onAutoClose?.();
      handleDismiss();
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      const elapsed = Date.now() - timerStartRef.current;
      const remaining = delay - elapsed;
      remainingRef.current = remaining > 0 ? remaining : null;
    };
  }, [
    collapseDuration,
    collapseSettleDuration,
    displayDuration,
    expanded,
    handleDismiss,
    hasBody,
    isFront,
    isVisible,
    paused,
    showBody,
    shouldAutoExpand,
    toast,
  ]);

  return { handleDismiss, isDismissing };
}

export { useToastDismiss };
