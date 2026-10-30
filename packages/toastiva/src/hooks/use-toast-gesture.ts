import type { IUseToastGestureParams } from "../typings";
import { useMemo } from "react";
import { Gesture } from "react-native-gesture-handler";
import { withSpring } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { FAST_SPRING } from "../constants";

const SWIPE_MAX = 20;
const SWIPE_VELOCITY = 800;

function softClamp(translation: number) {
  "worklet";
  return (
    Math.sign(translation) *
    SWIPE_MAX *
    Math.tanh(Math.abs(translation) / SWIPE_MAX)
  );
}

function useToastGesture(params: IUseToastGestureParams) {
  const { dismissible, onDismiss, swipeThreshold, swipeToDismiss, values } =
    params;
  return useMemo(() => {
    if (!swipeToDismiss || !dismissible) return Gesture.Pan().enabled(false);
    return Gesture.Pan()
      .activeOffsetX([-8, 8])
      .activeOffsetY([-8, 8])
      .onUpdate((event) => {
        values.swipeX.value = softClamp(event.translationX);
        values.swipeY.value = softClamp(event.translationY);
      })
      .onEnd((event) => {
        const distance = Math.max(
          Math.abs(event.translationX),
          Math.abs(event.translationY),
        );
        const velocity = Math.max(
          Math.abs(event.velocityX),
          Math.abs(event.velocityY),
        );
        if (distance >= swipeThreshold || velocity > SWIPE_VELOCITY) {
          scheduleOnRN(onDismiss);
        }
      })
      .onFinalize(() => {
        values.swipeX.value = withSpring(0, FAST_SPRING);
        values.swipeY.value = withSpring(0, FAST_SPRING);
      });
  }, [dismissible, onDismiss, swipeThreshold, swipeToDismiss, values]);
}

export { useToastGesture };
