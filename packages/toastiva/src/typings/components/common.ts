import type { LayoutChangeEvent, ViewStyle } from "react-native";
import type { AnimatedStyle } from "react-native-reanimated";

type TToastivaAnimatedViewStyle = AnimatedStyle<ViewStyle>;
type TToastivaLayoutHandler = (event: LayoutChangeEvent) => void;

export type { TToastivaAnimatedViewStyle, TToastivaLayoutHandler };
