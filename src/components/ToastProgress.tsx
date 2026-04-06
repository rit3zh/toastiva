import { styles } from "@/styles/toast.styles";
import type { IToastProgressProps } from "@/typings";
import { View } from "react-native";
import Animated from "react-native-reanimated";

function ToastProgress(props: IToastProgressProps) {
  const trackStyle = props.inline
    ? styles.inlineProgressTrack
    : styles.progressTrack;
  const fillStyle = props.inline
    ? styles.inlineProgressFill
    : styles.progressFill;
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
}

export { ToastProgress };
