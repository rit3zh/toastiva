import type { IUseToastAnimatedStylesParams } from "@/typings";
import { useAnimatedProps, useAnimatedStyle } from "react-native-reanimated";
import { BODY_PADDING_BOTTOM, BODY_PADDING_H, PH } from "../constants";
import { morphPath, morphPathCenter } from "../morph";

function getBodyRevealProgress(progress: number) {
  "worklet";
  return Math.max(0, Math.min(1, (progress - 0.08) / 0.92));
}

function getContentRevealProgress(progress: number) {
  "worklet";
  return Math.max(0, Math.min(1, (progress - 0.22) / 0.78));
}

function useToastAnimatedStyles(params: IUseToastAnimatedStylesParams) {
  const animatedPathProps = useAnimatedProps(() => {
    const t = Math.max(0, Math.min(1, params.values.morphProgress.value));
    return {
      d:
        params.morphAlign === "center"
          ? morphPathCenter(
              params.values.pillWidth.value,
              params.values.bodyWidth.value,
              params.values.expandedHeight.value,
              t,
            )
          : morphPath(
              params.values.pillWidth.value,
              params.values.bodyWidth.value,
              params.values.expandedHeight.value,
              t,
            ),
    };
  });

  const cardStyle = useAnimatedStyle(() => ({
    opacity: Math.max(
      0,
      params.values.mountProgress.value *
        (1 - params.values.removeProgress.value) *
        params.values.stackOpacity.value,
    ),
    zIndex: params.totalCount - params.index,
    transform: [
      {
        translateY:
          (1 - params.values.mountProgress.value) * (params.isTop ? -72 : 72) +
          params.values.removeProgress.value * (params.isTop ? -110 : 110) +
          params.values.stackY.value +
          params.values.swipeY.value,
      },
      { translateX: params.values.shakeX.value + params.values.swipeX.value },
      { scaleX: params.values.stackScale.value * params.values.squishX.value },
      { scaleY: params.values.stackScale.value * params.values.squishY.value },
    ],
  }));

  const shellStyle = useAnimatedStyle(() => {
    const t = Math.max(0, Math.min(1, params.values.morphProgress.value));
    return {
      width:
        params.values.pillWidth.value +
        (params.values.bodyWidth.value - params.values.pillWidth.value) * t,
      height:
        params.values.collapsedHeight.value +
        (params.values.expandedHeight.value -
          params.values.collapsedHeight.value) *
          t,
    };
  });

  return {
    animatedPathProps,
    bodyStyle: useAnimatedStyle(() => {
      const t = Math.max(0, Math.min(1, params.values.morphProgress.value));
      const revealT = getBodyRevealProgress(t);
      const expandedBodyHeight = Math.max(
        0,
        params.values.expandedHeight.value - PH,
      );
      return {
        opacity: params.values.bodyOpacity.value * revealT,
        height: expandedBodyHeight * revealT,
        overflow: "hidden" as const,
        paddingTop: 6 * revealT,
        paddingBottom: BODY_PADDING_BOTTOM * revealT,
        width: params.values.bodyWidth.value - BODY_PADDING_H * 2,
      };
    }),
    descriptionStyle: useAnimatedStyle(() => {
      const t = Math.max(0, Math.min(1, params.values.morphProgress.value));
      const revealT = getContentRevealProgress(t);
      const settle = params.values.descriptionProgress.value;
      const opacity = Math.max(
        0,
        Math.min(1, params.values.bodyOpacity.value * revealT * settle),
      );
      return {
        opacity,
        transform: [{ translateY: (1 - settle) * 8 }],
      };
    }),
    actionStyle: useAnimatedStyle(() => {
      const t = Math.max(0, Math.min(1, params.values.morphProgress.value));
      const revealT = getContentRevealProgress(t);
      const settle = params.values.actionProgress.value;
      const opacity = Math.max(
        0,
        Math.min(1, params.values.bodyOpacity.value * revealT * settle),
      );
      return {
        opacity,
        transform: [{ translateY: (1 - settle) * 10 }],
      };
    }),
    cardStyle,
    contentStyle: useAnimatedStyle(() => ({
      opacity: params.values.stackContentOpacity.value,
    })),
    shellStyle,
    progressStyle: useAnimatedStyle(() => ({
      opacity: params.expanded || params.isFront ? 1 : 0,
      transform: [{ scaleX: Math.max(0, 1 - params.values.progress.value) }],
    })),
  };
}

export { useToastAnimatedStyles };
