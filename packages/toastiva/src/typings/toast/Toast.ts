import type { ReactNode } from "react";
import type { WithSpringConfig } from "react-native-reanimated";

enum ToastivaBodyLayout {
  Left = "left",
  Center = "center",
  Right = "right",
  Spread = "spread",
}

enum ToastivaHorizontalAlign {
  Left = "left",
  Center = "center",
  Right = "right",
}

enum ToastivaMode {
  Stack = "stack",
  Morph = "morph",
}

enum ToastivaPosition {
  TopLeft = "top-left",
  TopCenter = "top-center",
  TopRight = "top-right",
  BottomLeft = "bottom-left",
  BottomCenter = "bottom-center",
  BottomRight = "bottom-right",
}

enum ToastivaType {
  Default = "default",
  Success = "success",
  Error = "error",
  Warning = "warning",
  Info = "info",
}

enum ToastivaVerticalPosition {
  Top = "top",
  Bottom = "bottom",
}

type TToastivaPosition = `${ToastivaPosition}`;
type TToastivaType = `${ToastivaType}`;
type TToastivaMode = `${ToastivaMode}`;
type TToastivaBodyLayout = `${ToastivaBodyLayout}`;
type TToastivaHorizontalAlign = `${ToastivaHorizontalAlign}`;
type TToastivaPromiseDescription<TData> =
  | string
  | ((value: TData) => string | undefined);
type TToastivaPromiseMessage<TData> = string | ((value: TData) => string);
type TToastivaSpringConfig = Partial<WithSpringConfig>;
type TToastivaVerticalPosition = `${ToastivaVerticalPosition}`;

interface IToastivaAction {
  label: string;
  onPress: () => void;
}

interface IToastivaTheme {
  colors?: Partial<Record<TToastivaType, string>>;
  surfaceColors?: Partial<Record<TToastivaType, string>>;
  surfaceStrokeColors?: Partial<Record<TToastivaType, string>>;
  badgeBgColors?: Partial<Record<TToastivaType, string>>;
  actionColors?: Partial<Record<TToastivaType, string>>;
  actionTextColors?: Partial<Record<TToastivaType, string>>;
}

interface IToastivaTiming {
  displayDuration?: number;
  expandDuration?: number;
  collapseDuration?: number;
}

interface IToastivaOptions {
  action?: IToastivaAction;
  bodyLayout?: TToastivaBodyLayout;
  content?: ReactNode;
  description?: string;
  dismissible?: boolean;
  duration?: number;
  expandedWidth?: number;
  headerContent?: ReactNode;
  horizontalInset?: number;
  icon?: ReactNode;
  isLoading?: boolean;
  meta?: string;
  onAutoClose?: () => void;
  onDismiss?: () => void;
  position?: TToastivaVerticalPosition;
  showProgress?: boolean;
  showTimestamp?: boolean;
  timing?: IToastivaTiming;
  title: string;
  type?: TToastivaType;
}
interface IResolvedToastTheme {
  colors: Record<TToastivaType, string>;
  surfaceColors: Record<TToastivaType, string>;
  surfaceStrokeColors: Record<TToastivaType, string>;
  badgeBgColors: Record<TToastivaType, string>;
  actionColors: Record<TToastivaType, string>;
  actionTextColors: Record<TToastivaType, string>;
}

interface IToastivaData {
  action?: IToastivaAction;
  bodyLayout?: TToastivaBodyLayout;
  content?: ReactNode;
  createdAt: number;
  description?: string;
  dismissible: boolean;
  duration: number;
  expandedWidth?: number;
  headerContent?: ReactNode;
  horizontalInset?: number;
  icon?: ReactNode;
  isLoading?: boolean;
  id: string;
  meta?: string;
  onAutoClose?: () => void;
  onDismiss?: () => void;
  position?: TToastivaVerticalPosition;
  showProgress?: boolean;
  showTimestamp?: boolean;
  timing?: IToastivaTiming;
  title: string;
  type: TToastivaType;
}

interface IToastivaPromiseAction {
  error?: IToastivaAction;
  success?: IToastivaAction;
}

interface IToastivaPromiseDescription<TResult, TError = unknown> {
  error?: TToastivaPromiseDescription<TError>;
  loading?: string;
  success?: TToastivaPromiseDescription<TResult>;
}

interface IToastivaPromiseIcon {
  error?: ReactNode;
  loading?: ReactNode;
  success?: ReactNode;
}

interface IToastivaPromiseData<TResult, TError = unknown> extends Omit<
  IToastivaOptions,
  "action" | "description" | "dismissible" | "icon" | "title" | "type"
> {
  action?: IToastivaPromiseAction;
  description?: IToastivaPromiseDescription<TResult, TError>;
  error: TToastivaPromiseMessage<TError>;
  icon?: IToastivaPromiseIcon;
  loading: string;
  success: TToastivaPromiseMessage<TResult>;
}

interface IToastivaConfig {
  bodyLayout?: TToastivaBodyLayout;
  duration?: number;
  expand?: boolean;
  expandedWidth?: number;
  gap?: number;
  horizontalInset?: number;
  mode?: TToastivaMode;
  offset?: number;
  position?: TToastivaPosition;
  showProgress?: boolean;
  showTimestamp?: boolean;
  springConfig?: TToastivaSpringConfig;
  swipeThreshold?: number;
  swipeToDismiss?: boolean;
  theme?: IToastivaTheme;
  visibleToasts?: number;
}

interface IToastivaProviderProps extends IToastivaConfig {
  children: ReactNode;
}

export {
  ToastivaBodyLayout,
  ToastivaHorizontalAlign,
  ToastivaMode,
  ToastivaPosition,
  ToastivaType,
  ToastivaVerticalPosition,
};
export type {
  IResolvedToastTheme,
  IToastivaAction,
  IToastivaConfig,
  IToastivaData,
  IToastivaOptions,
  IToastivaPromiseAction,
  IToastivaPromiseData,
  IToastivaPromiseDescription,
  IToastivaPromiseIcon,
  IToastivaProviderProps,
  IToastivaTheme,
  IToastivaTiming,
  TToastivaBodyLayout,
  TToastivaHorizontalAlign,
  TToastivaMode,
  TToastivaPosition,
  TToastivaPromiseDescription,
  TToastivaPromiseMessage,
  TToastivaSpringConfig,
  TToastivaType,
  TToastivaVerticalPosition,
};
