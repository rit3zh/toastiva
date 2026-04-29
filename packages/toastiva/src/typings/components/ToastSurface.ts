import type { ComponentType } from "react";
import type { WithSpringConfig } from "react-native-reanimated";
import type { IToastIcon } from "../dummy-icons/Icons";
import type { IToastAnimatedStylesResult } from "../styles/AnimatedStyles";
import type {
  IToastivaData,
  TToastivaBodyLayout,
  TToastivaHorizontalAlign,
} from "../toast";
import type { TToastivaAnimatedViewStyle } from "./common";

interface IToastSurfaceProps {
  Icon: ComponentType<IToastIcon>;
  actionStyle: TToastivaAnimatedViewStyle;
  animatedPathProps: IToastAnimatedStylesResult["animatedPathProps"];
  bodyLayout: TToastivaBodyLayout;
  bodyStyle: TToastivaAnimatedViewStyle;
  bodyWidth: number;
  canInteract: boolean;
  color: string;
  contentStyle: TToastivaAnimatedViewStyle;
  descriptionStyle: TToastivaAnimatedViewStyle;
  headerAlign: TToastivaHorizontalAlign;
  headerMaxWidthStyle: TToastivaAnimatedViewStyle;
  meta?: string;
  mirrored?: boolean;
  morphSpringConfig?: WithSpringConfig;
  onAction: () => void;
  progressStyle: TToastivaAnimatedViewStyle;
  renderHeight: number;
  showBody: boolean;
  showProgress: boolean;
  toast: IToastivaData;
}

export type { IToastSurfaceProps };
