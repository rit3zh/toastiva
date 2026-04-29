import type { IUseToastEffectsParams } from "../typings";
import { useEffect, useRef } from "react";
import {
  cancelAnimation,
  Easing,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  getBodyFadeDelay,
  getBodyFadeDuration,
  getCollapseDuration,
  getExpandDuration,
  getProgressDuration,
} from "../utils/toast-timing";

function useToastEffects(params: IUseToastEffectsParams) {
  const {
    bodyWidth,
    collapsedCardHeight,
    collapsedOffset,
    expanded,
    expandedHeight,
    expandedOffset,
    hasBody,
    isDismissing,
    isFront,
    isMeasured,
    isTop,
    morphMode = false,
    pillWidth,
    springConfig,
    shouldAutoExpand,
    shouldShowExpandedBody,
    stackDepth,
    toast,
    values,
  } = params;
  const collapseDuration = getCollapseDuration(toast);
  const expandDuration = getExpandDuration(toast);
  const bodyFadeDelay = getBodyFadeDelay(toast);
  const bodyFadeDuration = getBodyFadeDuration(toast);
  const descriptionSpringDelay = bodyFadeDelay;
  const actionSpringDelay = bodyFadeDelay + 80;
  const squishDelay = Math.max(24, Math.round(expandDuration * 0.08));
  const stackCollapseDelay = 220;
  const dimensionsReady = useRef(false);
  const firstRealMeasureApplied = useRef(false);
  const compactSignature = useRef<string | null>(null);
  const previousExpandedInStack = useRef(false);

  useEffect(() => {
    if (!dimensionsReady.current || !firstRealMeasureApplied.current) {
      values.pillWidth.value = pillWidth;
      values.bodyWidth.value = bodyWidth;
      values.collapsedHeight.value = collapsedCardHeight;
      values.expandedHeight.value = expandedHeight;
      dimensionsReady.current = true;
      if (isMeasured) {
        firstRealMeasureApplied.current = true;
      }
      return;
    }

    // Sileo holds the previous pill width while the new content is still
    // being measured (its `pillWidth` state stays at the last measured value
    // until the next ResizeObserver tick). Without this gate, a morph swap
    // animates pillWidth to the title-length *estimate* first, then springs
    // again to the real measurement. That's the "shrink to a square then
    // round out" pop the user sees right after a state change.
    if (!isMeasured) return;

    const shouldAnimateExpandedUpdate = hasBody && shouldShowExpandedBody;
    const shouldSpringDimensions = morphMode || shouldAnimateExpandedUpdate;
    // In morph mode, use the same spring config as morphProgress so all values
    // settle together (Sileo-style unified animation).
    const dimensionSpring =
      morphMode ? springConfig.morph : springConfig.pillResize;

    values.bodyWidth.value =
      shouldSpringDimensions ?
        withSpring(bodyWidth, dimensionSpring)
      : bodyWidth;
    values.expandedHeight.value =
      shouldSpringDimensions ?
        withSpring(expandedHeight, dimensionSpring)
      : expandedHeight;
    values.pillWidth.value = withSpring(pillWidth, dimensionSpring);
    values.collapsedHeight.value = withSpring(
      collapsedCardHeight,
      dimensionSpring,
    );
  }, [
    bodyWidth,
    collapsedCardHeight,
    expandDuration,
    expandedHeight,
    hasBody,
    isMeasured,
    morphMode,
    pillWidth,
    values.bodyWidth,
    values.collapsedHeight,
    values.expandedHeight,
    values.pillWidth,
    shouldShowExpandedBody,
    springConfig,
  ]);

  // Sileo's `ready` flag pattern: hold the mount animation at 0 (invisible +
  // off-screen, via cardStyle) until the first real measurement is applied.
  // Without this gate the toast renders one frame at the estimated/default
  // pill width before the measured width arrives. That frame is the
  // "square box that then rounds" flash the user sees on first show.
  const mountStartedRef = useRef(false);
  useEffect(() => {
    if (mountStartedRef.current) return;
    if (!isMeasured) return;
    mountStartedRef.current = true;
    values.mountProgress.value = withTiming(1, {
      duration: 420,
      easing: Easing.out(Easing.cubic),
    });
  }, [isMeasured, values]);

  useEffect(() => {
    if (toast.type !== "error") return;
    values.shakeX.value = withSequence(
      withTiming(3, { duration: 50 }),
      withTiming(-3, { duration: 50 }),
      withTiming(2, { duration: 50 }),
      withTiming(-2, { duration: 50 }),
      withTiming(1, { duration: 50 }),
      withTiming(0, { duration: 50 }),
    );
  }, [toast.type, values.shakeX]);

  useEffect(() => {
    if (!dimensionsReady.current || hasBody || morphMode) return;
    const nextSignature = `${toast.type}:${toast.title}:${pillWidth}`;
    if (compactSignature.current === null) {
      compactSignature.current = nextSignature;
      return;
    }
    if (compactSignature.current === nextSignature) return;
    compactSignature.current = nextSignature;
    cancelAnimation(values.squishY);
    cancelAnimation(values.squishX);
    values.squishY.value = withSequence(
      withTiming(0.95, { duration: 55 }),
      withSpring(1, springConfig.squish),
    );
    values.squishX.value = withSequence(
      withTiming(1.03, { duration: 55 }),
      withSpring(1, springConfig.squish),
    );
  }, [
    hasBody,
    morphMode,
    pillWidth,
    springConfig,
    toast.title,
    toast.type,
    values.squishX,
    values.squishY,
  ]);

  useEffect(() => {
    cancelAnimation(values.morphProgress);
    cancelAnimation(values.bodyOpacity);
    cancelAnimation(values.descriptionProgress);
    cancelAnimation(values.actionProgress);
    cancelAnimation(values.squishY);
    cancelAnimation(values.squishX);

    if (shouldShowExpandedBody) {
      values.morphProgress.value = withSpring(1, springConfig.morph);
      values.bodyOpacity.value = withDelay(
        bodyFadeDelay,
        withTiming(1, {
          duration: bodyFadeDuration,
          easing: Easing.out(Easing.cubic),
        }),
      );
      values.descriptionProgress.value = withDelay(
        descriptionSpringDelay,
        withSpring(1, springConfig.bodyReveal),
      );
      values.actionProgress.value = withDelay(
        actionSpringDelay,
        withSpring(1, springConfig.bodyReveal),
      );
      values.squishY.value = withDelay(
        squishDelay,
        withSequence(
          withTiming(0.88, { duration: 60 }),
          withSpring(1, springConfig.squish),
        ),
      );
      values.squishX.value = withDelay(
        squishDelay,
        withSequence(
          withTiming(1.06, { duration: 60 }),
          withSpring(1, springConfig.squish),
        ),
      );
      return;
    }
    // Synchronized fast collapse so the toast finishes shrinking before the
    // 420ms stack shuffle lands it in its new position. Without this, the
    // shell + body keep animating long after the stack has moved, which
    // reads as "push back, then close" instead of one coherent motion.
    values.bodyOpacity.value = withTiming(0, {
      duration: 160,
      easing: Easing.in(Easing.quad),
    });
    values.descriptionProgress.value = withTiming(0, {
      duration: 180,
      easing: Easing.in(Easing.cubic),
    });
    values.actionProgress.value = withTiming(0, {
      duration: 180,
      easing: Easing.in(Easing.cubic),
    });
    values.morphProgress.value = withTiming(0, {
      duration: 280,
      easing: Easing.in(Easing.cubic),
    });
  }, [
    bodyFadeDelay,
    bodyFadeDuration,
    collapseDuration,
    expandDuration,
    actionSpringDelay,
    descriptionSpringDelay,
    springConfig,
    values.actionProgress,
    values.bodyOpacity,
    values.descriptionProgress,
    values.morphProgress,
    values.squishX,
    values.squishY,
    shouldShowExpandedBody,
    squishDelay,
  ]);

  useEffect(() => {
    const expandedInStack =
      !isDismissing && (expanded || shouldShowExpandedBody);
    const shouldDelayCollapseShuffle =
      previousExpandedInStack.current && !expandedInStack && !isDismissing;
    previousExpandedInStack.current = expandedInStack;
    const nextHeight = expandedInStack ? expandedHeight : collapsedCardHeight;
    const nextTranslate =
      (expandedInStack ? expandedOffset : collapsedOffset) * (isTop ? 1 : -1);
    const nextScale =
      expandedInStack ? 1 : Math.max(0.9, 1 - stackDepth * 0.05);
    const nextOpacity =
      expandedInStack ? 1 : Math.max(0.68, 0.94 - stackDepth * 0.1);
    // Single timing curve across all four stack properties so the reshuffle
    // settles in one frame instead of three (Y/scale/height on a spring,
    // opacity on a 180ms timing). Matched to the 420ms mount duration so
    // a new toast lands as the existing stack finishes making room.
    const stackAnim = { duration: 420, easing: Easing.out(Easing.cubic) };
    const stackTiming = (toValue: number) =>
      shouldDelayCollapseShuffle ?
        withDelay(stackCollapseDelay, withTiming(toValue, stackAnim))
      : withTiming(toValue, stackAnim);

    values.stackY.value = stackTiming(nextTranslate);
    values.stackScale.value = stackTiming(nextScale);
    values.stackOpacity.value = stackTiming(nextOpacity);
    values.shellHeight.value = stackTiming(nextHeight);
  }, [
    collapsedCardHeight,
    collapsedOffset,
    expanded,
    expandedHeight,
    expandedOffset,
    isDismissing,
    isFront,
    isTop,
    springConfig,
    stackCollapseDelay,
    shouldShowExpandedBody,
    stackDepth,
    values,
  ]);

  useEffect(() => {
    values.progress.value = withTiming(1, {
      duration: getProgressDuration(toast, hasBody, shouldAutoExpand),
      easing: Easing.linear,
    });
  }, [hasBody, shouldAutoExpand, toast, values.progress]);
}

export { useToastEffects };
