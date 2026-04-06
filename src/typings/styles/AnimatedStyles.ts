import type { ViewStyle } from "react-native";
import type { AnimatedProps, AnimatedStyle } from "react-native-reanimated";
import type { PathProps } from "react-native-svg";
import type { IToastSharedValue } from "../shared/ToastSharedValue";
import type { TToastHorizontalAlign } from "../toast";

type TToastAnimatedPathProps = Partial<AnimatedProps<PathProps>>;
type TToastAnimatedViewStyle = AnimatedStyle<ViewStyle>;

interface IToastAnimatedStylesResult {
  actionStyle: TToastAnimatedViewStyle;
  animatedPathProps: TToastAnimatedPathProps;
  bodyStyle: TToastAnimatedViewStyle;
  cardStyle: TToastAnimatedViewStyle;
  contentStyle: TToastAnimatedViewStyle;
  descriptionStyle: TToastAnimatedViewStyle;
  progressStyle: TToastAnimatedViewStyle;
  shellStyle: TToastAnimatedViewStyle;
}

interface IUseToastAnimatedStylesParams {
  bodyWidth: number;
  collapsedHeight: number;
  expanded: boolean;
  expandedHeight: number;
  index: number;
  morphAlign: TToastHorizontalAlign;
  isFront: boolean;
  isTop: boolean;
  pillWidth: number;
  renderHeight: number;
  totalCount: number;
  values: IToastSharedValue;
}

export type {
  IToastAnimatedStylesResult,
  IUseToastAnimatedStylesParams,
  TToastAnimatedPathProps,
  TToastAnimatedViewStyle,
};
