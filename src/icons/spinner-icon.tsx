import type { IToastIcon } from "@/typings/dummy-icons/Icons";
import React, { memo, useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

function SpinnerIconBase({ color, size = 16 }: IToastIcon) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1,
      false,
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));
  return (
    <Animated.View style={animatedStyle}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M21 12a9 9 0 1 1-6.219-8.56"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
        />
      </Svg>
    </Animated.View>
  );
}

SpinnerIconBase.displayName = "SpinnerIcon";

export const SpinnerIcon = memo<IToastIcon>(SpinnerIconBase);

SpinnerIcon.displayName = "SpinnerIcon";

export default SpinnerIcon;
