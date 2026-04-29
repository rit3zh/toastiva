import type { ViewStyle } from "react-native";
import type { AnimatedProps, AnimatedStyle } from "react-native-reanimated";
import type { PathProps } from "react-native-svg";
import type { IToastSharedValue } from "../shared/ToastSharedValue";
import type { TToastivaHorizontalAlign } from "../toast";

type TToastivaAnimatedPathProps = Partial<AnimatedProps<PathProps>>;
type TToastivaAnimatedViewStyle = AnimatedStyle<ViewStyle>;

interface IToastAnimatedStylesResult {
  actionStyle: TToastivaAnimatedViewStyle;
  animatedPathProps: TToastivaAnimatedPathProps;
  bodyStyle: TToastivaAnimatedViewStyle;
  cardStyle: TToastivaAnimatedViewStyle;
  contentStyle: TToastivaAnimatedViewStyle;
  descriptionStyle: TToastivaAnimatedViewStyle;
  headerMaxWidthStyle: TToastivaAnimatedViewStyle;
  progressStyle: TToastivaAnimatedViewStyle;
  shellStyle: TToastivaAnimatedViewStyle;
}

interface IUseToastAnimatedStylesParams {
  bodyWidth: number;
  collapsedHeight: number;
  expanded: boolean;
  expandedHeight: number;
  index: number;
  morphAlign: TToastivaHorizontalAlign;
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
  TToastivaAnimatedPathProps,
  TToastivaAnimatedViewStyle,
};
