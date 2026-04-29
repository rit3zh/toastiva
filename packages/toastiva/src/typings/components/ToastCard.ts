import type { ComponentType } from "react";
import type { GestureType } from "react-native-gesture-handler";
import type { WithSpringConfig } from "react-native-reanimated";
import type { IToastIcon } from "../dummy-icons/Icons";
import type { IToastAnimatedStylesResult } from "../styles/AnimatedStyles";
import type {
  IToastivaData,
  TToastivaBodyLayout,
  TToastivaHorizontalAlign,
} from "../toast";
import type { TToastivaLayoutHandler } from "./common";

interface IToastCardHeights {
  collapsedCardHeight: number;
  expandedHeight: number;
  renderHeight: number;
}

interface IToastCardMeasurements {
  isCardHeightCurrent: boolean;
  isPillWidthCurrent: boolean;
  measuredHeight: number;
  measuredPillWidth: number;
  onMeasureCard: TToastivaLayoutHandler;
  onMeasureHeader: TToastivaLayoutHandler;
}

interface IToastCardProps {
  Icon: ComponentType<IToastIcon>;
  animated: IToastAnimatedStylesResult;
  morphSpringConfig?: WithSpringConfig;
  bodyLayout: TToastivaBodyLayout;
  color: string;
  expanded: boolean;
  gesture: GestureType;
  headerAlign: TToastivaHorizontalAlign;
  heights: IToastCardHeights;
  isFront: boolean;
  isTop: boolean;
  measureBody: boolean;
  measure: IToastCardMeasurements;
  meta?: string;
  morphAlign: TToastivaHorizontalAlign;
  onAction: () => void;
  onPress: () => void;
  showBody: boolean;
  showProgress: boolean;
  stackAlign: TToastivaHorizontalAlign;
  toast: IToastivaData;
  widths: IToastCardWidths;
}

interface IToastCardWidths {
  bodyWidth: number;
  maxWidth: number;
  pillWidth: number;
}

export type {
  IToastCardHeights,
  IToastCardMeasurements,
  IToastCardProps,
  IToastCardWidths,
};
