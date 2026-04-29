import type { ComponentType, ReactNode } from "react";
import type { StyleProp, TextStyle } from "react-native";
import type { WithSpringConfig } from "react-native-reanimated";
import type { IToastIcon } from "../dummy-icons/Icons";
import type { IHeaderLayer } from "../shared/ToastHeader";
import type { TToastivaAnimatedViewStyle } from "../styles/AnimatedStyles";
import type {
  IToastivaData,
  TToastivaHorizontalAlign,
  TToastivaType,
} from "../toast";
import type { TToastivaLayoutHandler } from "./common";

interface IToastHeaderProps {
  align: TToastivaHorizontalAlign;
  color: string;
  /** Custom content that replaces the icon + title inside the pill. */
  headerContent?: ReactNode;
  Icon: ComponentType<IToastIcon>;
  icon?: IToastivaData["icon"];
  maxWidthStyle?: TToastivaAnimatedViewStyle;
  measure?: boolean;
  morphSpringConfig?: WithSpringConfig;
  onLayout?: TToastivaLayoutHandler;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  type: TToastivaType;
}

interface IToastHeaderContentProps {
  align: TToastivaHorizontalAlign;
  layer: IHeaderLayer;
  titleStyle?: StyleProp<TextStyle>;
}

export type { IToastHeaderContentProps, IToastHeaderProps };
