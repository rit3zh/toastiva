import type {
  IToastivaConfig,
  IToastivaData,
  TToastivaVerticalPosition,
} from "../toast";

interface IToastMorphSlotProps {
  bottomInset: number;
  defaultBodyLayout: IToastivaConfig["bodyLayout"];
  defaultExpandedWidth: IToastivaConfig["expandedWidth"];
  defaultSpringConfig: IToastivaConfig["springConfig"];
  heightMap: Map<string, number>;
  horizontalInset: number;
  offset: number;
  onHeightChange: (id: string, height: number) => void;
  onRemove: (id: string) => void;
  position: IToastivaConfig["position"];
  showProgress: boolean;
  showTimestamp: boolean;
  swipeThreshold: number;
  swipeToDismiss: boolean;
  toasts: IToastivaData[];
  topInset: number;
  vertical: TToastivaVerticalPosition;
}

export type { IToastMorphSlotProps };
