import { styles } from "../styles/toast.styles";
import type { IToastProgressProps } from "../typings";
import React, { memo } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

const ToastProgress: React.MemoExoticComponent<React.FC<IToastProgressProps>> =
  memo(
    ({
      ...props
    }: IToastProgressProps): (React.ReactNode & React.ReactElement) | null => {
      const trackStyle =
        props.inline ? styles.inlineProgressTrack : styles.progressTrack;
      const fillStyle =
        props.inline ? styles.inlineProgressFill : styles.progressFill;
      return (
        <View style={trackStyle}>
          <Animated.View
            style={[
              fillStyle,
              { backgroundColor: props.backgroundColor },
              props.style,
            ]}
          />
        </View>
      );
    },
  );

export { ToastProgress };
