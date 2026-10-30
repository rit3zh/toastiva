import type { ValueOf } from "../../global-ts/value-of";
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
  animatedPathProps: ValueOf<IToastAnimatedStylesResult, "animatedPathProps">;
  bodyLayout: TToastivaBodyLayout;
  bodyStyle: TToastivaAnimatedViewStyle;
  bodyWidth: number;
  canInteract: boolean;
  color: string;
  contentStyle: TToastivaAnimatedViewStyle;
  descriptionStyle: TToastivaAnimatedViewStyle;
  disableIOSBlur: boolean;
  headerAlign: TToastivaHorizontalAlign;
  headerMaxWidthStyle: TToastivaAnimatedViewStyle;
  headerStyle: TToastivaAnimatedViewStyle;
  iosBlurTint?: ValueOf<IToastivaData, "iosBlurTint">;
  meta?: string;
  mirrored?: boolean;
  noHeader?: boolean;
  morphSpringConfig?: WithSpringConfig;
  onAction: () => void;
  progressStyle: TToastivaAnimatedViewStyle;
  renderHeight: number;
  showBody: boolean;
  showProgress: boolean;
  stroke: string;
  styleOverrides?: ValueOf<IToastivaData, "styles">;
  surfaceFill: string;
  toast: IToastivaData;
}

export type { IToastSurfaceProps };
