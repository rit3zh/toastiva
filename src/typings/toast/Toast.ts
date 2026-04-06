import type { ReactNode } from "react";
import type { WithSpringConfig } from "react-native-reanimated";

enum ToastBodyLayout {
  Left = "left",
  Center = "center",
  Right = "right",
  Spread = "spread",
}

enum ToastHorizontalAlign {
  Left = "left",
  Center = "center",
  Right = "right",
}

enum ToastPosition {
  TopLeft = "top-left",
  TopCenter = "top-center",
  TopRight = "top-right",
  BottomLeft = "bottom-left",
  BottomCenter = "bottom-center",
  BottomRight = "bottom-right",
}

enum ToastType {
  Default = "default",
  Success = "success",
  Error = "error",
  Warning = "warning",
  Info = "info",
}

enum ToastVerticalPosition {
  Top = "top",
  Bottom = "bottom",
}

type TGooeyToastPosition = `${ToastPosition}`;
type TGooeyToastType = `${ToastType}`;
type TToastBodyLayout = `${ToastBodyLayout}`;
type TToastHorizontalAlign = `${ToastHorizontalAlign}`;
type TToastPromiseDescription<TData> =
  | string
  | ((value: TData) => string | undefined);
type TToastPromiseMessage<TData> = string | ((value: TData) => string);
type TToastSpringConfig = Partial<WithSpringConfig>;
type TToastVerticalPosition = `${ToastVerticalPosition}`;

interface IGooeyToastAction {
  label: string;
  onClick: () => void;
}

interface IGooeyToastTiming {
  displayDuration?: number;
  expandDuration?: number;
  collapseDuration?: number;
}

interface IGooeyToastOptions {
  action?: IGooeyToastAction;
  bodyLayout?: TToastBodyLayout;
  description?: string;
  dismissible?: boolean;
  duration?: number;
  expandedWidth?: number;
  horizontalInset?: number;
  icon?: ReactNode;
  meta?: string;
  onAutoClose?: () => void;
  onDismiss?: () => void;
  position?: TToastVerticalPosition;
  showTimestamp?: boolean;
  timing?: IGooeyToastTiming;
  title: string;
  type?: TGooeyToastType;
}

interface IGooeyToastData {
  action?: IGooeyToastAction;
  bodyLayout?: TToastBodyLayout;
  createdAt: number;
  description?: string;
  dismissible: boolean;
  duration: number;
  expandedWidth?: number;
  horizontalInset?: number;
  icon?: ReactNode;
  id: string;
  meta?: string;
  onAutoClose?: () => void;
  onDismiss?: () => void;
  position?: TToastVerticalPosition;
  showTimestamp?: boolean;
  timing?: IGooeyToastTiming;
  title: string;
  type: TGooeyToastType;
}

interface IGooeyPromiseAction {
  error?: IGooeyToastAction;
  success?: IGooeyToastAction;
}

interface IGooeyPromiseDescription<TResult, TError = unknown> {
  error?: TToastPromiseDescription<TError>;
  loading?: string;
  success?: TToastPromiseDescription<TResult>;
}

interface IGooeyPromiseIcon {
  error?: ReactNode;
  loading?: ReactNode;
  success?: ReactNode;
}

interface IGooeyPromiseData<TResult, TError = unknown> extends Omit<
  IGooeyToastOptions,
  "action" | "description" | "dismissible" | "icon" | "title" | "type"
> {
  action?: IGooeyPromiseAction;
  description?: IGooeyPromiseDescription<TResult, TError>;
  error: TToastPromiseMessage<TError>;
  icon?: IGooeyPromiseIcon;
  loading: string;
  success: TToastPromiseMessage<TResult>;
}

interface IGooeyToasterConfig {
  bodyLayout?: TToastBodyLayout;
  duration?: number;
  expand?: boolean;
  expandedWidth?: number;
  gap?: number;
  horizontalInset?: number;
  offset?: number;
  position?: TGooeyToastPosition;
  showTimestamp?: boolean;
  springConfig?: TToastSpringConfig;
  swipeThreshold?: number;
  swipeToDismiss?: boolean;
  visibleToasts?: number;
}

export {
  ToastBodyLayout,
  ToastHorizontalAlign,
  ToastPosition,
  ToastType,
  ToastVerticalPosition,
};
export type {
  IGooeyPromiseAction,
  IGooeyPromiseData,
  IGooeyPromiseDescription,
  IGooeyPromiseIcon,
  IGooeyToastAction,
  IGooeyToastData,
  IGooeyToastOptions,
  IGooeyToastTiming,
  IGooeyToasterConfig,
  TGooeyToastPosition,
  TGooeyToastType,
  TToastBodyLayout,
  TToastHorizontalAlign,
  TToastPromiseDescription,
  TToastPromiseMessage,
  TToastSpringConfig,
  TToastVerticalPosition,
};
