import type { IGooeyToastData } from "../toast";
import type { IToastSharedValue } from "./ToastSharedValue";
import type { IResolvedToastSpringConfig } from "../utils";

interface IUseToastEffectsParams {
  bodyWidth: number;
  collapsedOffset: number;
  collapsedCardHeight: number;
  expanded: boolean;
  expandedOffset: number;
  expandedHeight: number;
  hasBody: boolean;
  isDismissing: boolean;
  isFront: boolean;
  isTop: boolean;
  pillWidth: number;
  springConfig: IResolvedToastSpringConfig;
  shouldAutoExpand: boolean;
  shouldShowExpandedBody: boolean;
  stackDepth: number;
  toast: IGooeyToastData;
  values: IToastSharedValue;
}

export type { IUseToastEffectsParams };
