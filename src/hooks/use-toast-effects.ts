import type { IUseToastEffectsParams } from "@/typings";
import { useEffect, useRef } from "react";
import {
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
    isTop,
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
  const pillUpdateDuration = Math.min(
    Math.max(220, Math.round(expandDuration * 0.55)),
    360,
  );
  const dimensionsReady = useRef(false);
  const compactSignature = useRef<string | null>(null);

  useEffect(() => {
    if (!dimensionsReady.current) {
      values.pillWidth.value = pillWidth;
      values.bodyWidth.value = bodyWidth;
      values.collapsedHeight.value = collapsedCardHeight;
      values.expandedHeight.value = expandedHeight;
      dimensionsReady.current = true;
      return;
    }

    const shouldAnimateExpandedUpdate = hasBody && shouldShowExpandedBody;

    values.bodyWidth.value = shouldAnimateExpandedUpdate
      ? withSpring(bodyWidth, springConfig.pillResize)
      : bodyWidth;
    values.expandedHeight.value = shouldAnimateExpandedUpdate
      ? withSpring(expandedHeight, springConfig.pillResize)
      : expandedHeight;
    values.pillWidth.value = shouldAnimateExpandedUpdate
      ? withSpring(pillWidth, springConfig.pillResize)
      : withTiming(pillWidth, {
          duration: pillUpdateDuration,
          easing: Easing.inOut(Easing.cubic),
        });
    values.collapsedHeight.value = shouldAnimateExpandedUpdate
      ? withSpring(collapsedCardHeight, springConfig.pillResize)
      : withTiming(collapsedCardHeight, {
          duration: pillUpdateDuration,
          easing: Easing.inOut(Easing.cubic),
        });
  }, [
    bodyWidth,
    collapsedCardHeight,
    expandDuration,
    expandedHeight,
    hasBody,
    pillUpdateDuration,
    pillWidth,
    values.bodyWidth,
    values.collapsedHeight,
    values.expandedHeight,
    values.pillWidth,
    shouldShowExpandedBody,
    springConfig,
  ]);

  useEffect(() => {
    values.mountProgress.value = withSpring(1, springConfig.mount);
    values.squishY.value = withSequence(
      withTiming(0.88, { duration: 80, easing: Easing.out(Easing.quad) }),
      withSpring(1, springConfig.squish),
    );
    values.squishX.value = withSequence(
      withTiming(1.06, { duration: 80, easing: Easing.out(Easing.quad) }),
      withSpring(1, springConfig.squish),
    );
  }, [springConfig, values]);

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
    if (!dimensionsReady.current || hasBody) return;
    const nextSignature = `${toast.type}:${toast.title}:${pillWidth}`;
    if (compactSignature.current === null) {
      compactSignature.current = nextSignature;
      return;
    }
    if (compactSignature.current === nextSignature) return;
    compactSignature.current = nextSignature;
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
    pillWidth,
    springConfig,
    toast.title,
    toast.type,
    values.squishX,
    values.squishY,
  ]);

  useEffect(() => {
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
    values.morphProgress.value = withSpring(0, springConfig.morph);
    values.bodyOpacity.value = withTiming(0, {
      duration: Math.max(110, collapseDuration - 50),
    });
    values.descriptionProgress.value = withSpring(0, springConfig.bodyReveal);
    values.actionProgress.value = withSpring(0, springConfig.bodyReveal);
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
    const expandedInStack = !isDismissing && (expanded || shouldShowExpandedBody);
    const nextHeight = expandedInStack ? expandedHeight : collapsedCardHeight;
    const nextTranslate =
      (expandedInStack ? expandedOffset : collapsedOffset) * (isTop ? 1 : -1);
    const nextScale = expandedInStack
      ? 1
      : Math.max(0.9, 1 - stackDepth * 0.05);
    const nextOpacity = expandedInStack
      ? 1
      : Math.max(0.68, 0.94 - stackDepth * 0.1);
    values.stackY.value = withSpring(nextTranslate, springConfig.stack);
    values.stackScale.value = withSpring(nextScale, springConfig.stack);
    values.stackOpacity.value = withTiming(nextOpacity, { duration: 180 });
    values.shellHeight.value = withSpring(nextHeight, springConfig.stack);
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
