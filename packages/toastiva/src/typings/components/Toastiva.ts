import type {
  IToastivaConfig,
  IToastivaData,
  TToastivaBodyLayout,
  TToastivaPosition,
} from "../toast";

interface IToastivaProps {
  collapsedOffset: number;
  defaultBodyLayout: TToastivaBodyLayout;
  defaultExpandedWidth?: number;
  defaultHorizontalInset: number;
  defaultShowProgress: boolean;
  defaultShowTimestamp: boolean;
  defaultSpringConfig?: IToastivaConfig["springConfig"];
  dismissPaused?: boolean;
  expanded: boolean;
  expandedOffset: number;
  forceCollapsed?: boolean;
  frontHeight: number;
  gap: number;
  index: number;
  morphMode?: boolean;
  onHeightChange: (id: string, height: number) => void;
  onRemove: (id: string) => void;
  onStackPress?: () => void;
  position: TToastivaPosition;
  swipeThreshold: number;
  swipeToDismiss: boolean;
  toast: IToastivaData;
  totalCount: number;
  visibleCount: number;
}

export type { IToastivaProps };
