import type { ComponentType, Dispatch, SetStateAction } from "react";
import type { LayoutChangeEvent, ViewStyle } from "react-native";
import type { GestureType } from "react-native-gesture-handler";
import type { AnimatedStyle } from "react-native-reanimated";
import type {
  IGooeyToastData,
  IGooeyToasterConfig,
  TGooeyToastPosition,
  TToastBodyLayout,
  TToastHorizontalAlign,
  TToastVerticalPosition,
} from "../toast";
import type { IToastIcon } from "../dummy-icons/Icons";
import type { IToastAnimatedStylesResult } from "../styles/AnimatedStyles";

type TToastLayoutHandler = (event: LayoutChangeEvent) => void;
type TToastAnimatedViewStyle = AnimatedStyle<ViewStyle>;

interface IBlobPathProps {
  animatedProps: IToastAnimatedStylesResult["animatedPathProps"];
  fill: string;
  filter?: string;
  stroke?: string;
  strokeWidth?: number;
  transform?: string;
}

interface IGooeyToastProps {
  collapsedOffset: number;
  defaultBodyLayout: TToastBodyLayout;
  defaultExpandedWidth?: number;
  defaultHorizontalInset: number;
  defaultShowTimestamp: boolean;
  defaultSpringConfig?: IGooeyToasterConfig["springConfig"];
  expanded: boolean;
  expandedOffset: number;
  frontHeight: number;
  gap: number;
  index: number;
  onHeightChange: (id: string, height: number) => void;
  onRemove: (id: string) => void;
  onStackPress?: () => void;
  position: TGooeyToastPosition;
  swipeThreshold: number;
  swipeToDismiss: boolean;
  toast: IGooeyToastData;
  totalCount: number;
  visibleCount: number;
}

interface IToastBodyProps {
  actionStyle: TToastAnimatedViewStyle;
  bodyLayout: TToastBodyLayout;
  bodyStyle: TToastAnimatedViewStyle;
  canInteract: boolean;
  color: string;
  descriptionStyle: TToastAnimatedViewStyle;
  meta?: string;
  onAction: () => void;
  progressStyle: TToastAnimatedViewStyle;
  showBody: boolean;
  toast: IGooeyToastData;
}

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
  onMeasureCard: TToastLayoutHandler;
  onMeasureHeader: TToastLayoutHandler;
}

interface IToastCardProps {
  Icon: ComponentType<IToastIcon>;
  animated: IToastAnimatedStylesResult;
  bodyLayout: TToastBodyLayout;
  color: string;
  expanded: boolean;
  gesture: GestureType;
  headerAlign: TToastHorizontalAlign;
  heights: IToastCardHeights;
  isFront: boolean;
  isTop: boolean;
  measure: IToastCardMeasurements;
  meta?: string;
  morphAlign: TToastHorizontalAlign;
  onAction: () => void;
  onPress: () => void;
  showBody: boolean;
  stackAlign: TToastHorizontalAlign;
  toast: IGooeyToastData;
  widths: IToastCardWidths;
}

interface IToastCardWidths {
  bodyWidth: number;
  maxWidth: number;
  pillWidth: number;
}

interface IToastDescriptionProps {
  description: string;
  layout: TToastBodyLayout;
  meta?: string;
}

interface IToastHeaderProps {
  align: TToastHorizontalAlign;
  color: string;
  Icon: ComponentType<IToastIcon>;
  icon?: IGooeyToastData["icon"];
  measure?: boolean;
  onLayout?: TToastLayoutHandler;
  title: string;
}

interface IToastMeasureBodyProps {
  bodyLayout: TToastBodyLayout;
  meta?: string;
  toast: IGooeyToastData;
}

interface IToastMeasureProps {
  bodyLayout: TToastBodyLayout;
  bodyWidth: number;
  color: string;
  headerAlign: TToastHorizontalAlign;
  Icon: ComponentType<IToastIcon>;
  meta?: string;
  onMeasureCard: TToastLayoutHandler;
  onMeasureHeader: TToastLayoutHandler;
  toast: IGooeyToastData;
}

interface IToastProgressProps {
  backgroundColor: string;
  inline?: boolean;
  style: TToastAnimatedViewStyle;
}

interface IToastStackProps {
  bottomInset: number;
  defaultBodyLayout: IGooeyToasterConfig["bodyLayout"];
  defaultExpandedWidth: IGooeyToasterConfig["expandedWidth"];
  defaultSpringConfig: IGooeyToasterConfig["springConfig"];
  expand: boolean;
  gap: number;
  heightMap: Map<string, number>;
  horizontalInset: number;
  offset: number;
  onHeightChange: (id: string, height: number) => void;
  onRemove: (id: string) => void;
  position: IGooeyToasterConfig["position"];
  setExpanded: Dispatch<SetStateAction<boolean>>;
  showTimestamp: boolean;
  swipeThreshold: number;
  swipeToDismiss: boolean;
  toasts: IGooeyToastData[];
  topInset: number;
  vertical: TToastVerticalPosition;
  visibleToasts: number;
}

interface IToastSurfaceProps {
  Icon: ComponentType<IToastIcon>;
  actionStyle: TToastAnimatedViewStyle;
  animatedPathProps: IToastAnimatedStylesResult["animatedPathProps"];
  bodyLayout: TToastBodyLayout;
  bodyStyle: TToastAnimatedViewStyle;
  bodyWidth: number;
  canInteract: boolean;
  color: string;
  contentStyle: TToastAnimatedViewStyle;
  descriptionStyle: TToastAnimatedViewStyle;
  headerAlign: TToastHorizontalAlign;
  meta?: string;
  mirrored?: boolean;
  onAction: () => void;
  progressStyle: TToastAnimatedViewStyle;
  renderHeight: number;
  showBody: boolean;
  toast: IGooeyToastData;
}

export type {
  IBlobPathProps,
  IGooeyToastProps,
  IToastBodyProps,
  IToastCardHeights,
  IToastCardMeasurements,
  IToastCardProps,
  IToastCardWidths,
  IToastDescriptionProps,
  IToastHeaderProps,
  IToastMeasureBodyProps,
  IToastMeasureProps,
  IToastProgressProps,
  IToastStackProps,
  IToastSurfaceProps,
  TToastLayoutHandler,
};
