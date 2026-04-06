import type { IUseToastGestureParams } from "@/typings";
import { useMemo } from "react";
import { Gesture } from "react-native-gesture-handler";
import { runOnJS, withSpring, withTiming } from "react-native-reanimated";

function useToastGesture(params: IUseToastGestureParams) {
  const {
    dismissible,
    isTop,
    onDismiss,
    swipeThreshold,
    swipeToDismiss,
    values,
  } = params;
  return useMemo(() => {
    if (!swipeToDismiss || !dismissible) return Gesture.Pan().enabled(false);
    return Gesture.Pan()
      .activeOffsetX([-10, 10])
      .activeOffsetY([-10, 10])
      .onUpdate((event) => {
        const naturalDir = isTop ? -1 : 1;
        const dampening = 1 / (1.5 + Math.abs(event.translationY) / 20);
        values.swipeX.value = event.translationX;
        values.swipeY.value =
          event.translationY * naturalDir > 0
            ? event.translationY * dampening
            : event.translationY;
      })
      .onEnd((event) => {
        const absDx = Math.abs(event.translationX);
        const absDy = Math.abs(event.translationY);
        const velocity =
          Math.max(Math.abs(event.velocityX), Math.abs(event.velocityY)) / 1000;
        if (
          absDx >= swipeThreshold ||
          absDy >= swipeThreshold ||
          velocity > 0.5
        ) {
          values.swipeX.value = withTiming(
            absDx > absDy ? (event.translationX > 0 ? 420 : -420) : 0,
            { duration: 150 },
          );
          values.swipeY.value = withTiming(
            absDy >= absDx ? (isTop ? -320 : 320) : 0,
            { duration: 150 },
          );
          runOnJS(onDismiss)();
          return;
        }
        values.swipeX.value = withSpring(0, { damping: 20, stiffness: 320 });
        values.swipeY.value = withSpring(0, { damping: 20, stiffness: 320 });
      });
  }, [dismissible, isTop, onDismiss, swipeThreshold, swipeToDismiss, values]);
}

export { useToastGesture };
