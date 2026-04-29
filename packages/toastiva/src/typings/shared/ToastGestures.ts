import type { IToastSharedValue } from "./ToastSharedValue";

interface IUseToastGestureParams {
  dismissible: boolean;
  isTop: boolean;
  onDismiss: () => void;
  swipeThreshold: number;
  swipeToDismiss: boolean;
  values: IToastSharedValue;
}

export type { IUseToastGestureParams };
