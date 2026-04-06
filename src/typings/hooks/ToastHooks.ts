import type { IGooeyToastData } from "../toast";
import type { IToastSharedValue } from "../shared/ToastSharedValue";
import type { IHeightEntry } from "../store/ToastStore";
import type { IResolvedToastSpringConfig } from "../utils";

interface IUseToastDismissParams {
  expanded: boolean;
  hasBody: boolean;
  isExpandedCandidate: boolean;
  isFront: boolean;
  isVisible: boolean;
  onRemove: (id: string) => void;
  shouldAutoExpand: boolean;
  springConfig: IResolvedToastSpringConfig;
  showBody: boolean;
  toast: IGooeyToastData;
  values: IToastSharedValue;
}

interface IUseToasterStateResult {
  heights: IHeightEntry[];
  toasts: IGooeyToastData[];
}

export type { IUseToastDismissParams, IUseToasterStateResult };
