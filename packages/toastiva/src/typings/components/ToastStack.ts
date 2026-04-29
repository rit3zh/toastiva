import type { Dispatch, SetStateAction } from "react";
import type {
  IToastivaConfig,
  IToastivaData,
  TToastivaVerticalPosition,
} from "../toast";

interface IToastStackProps {
  bottomInset: number;
  defaultBodyLayout: IToastivaConfig["bodyLayout"];
  defaultExpandedWidth: IToastivaConfig["expandedWidth"];
  defaultSpringConfig: IToastivaConfig["springConfig"];
  expand: boolean;
  gap: number;
  heightMap: Map<string, number>;
  horizontalInset: number;
  offset: number;
  onHeightChange: (id: string, height: number) => void;
  onRemove: (id: string) => void;
  position: IToastivaConfig["position"];
  setExpanded: Dispatch<SetStateAction<boolean>>;
  showProgress: boolean;
  showTimestamp: boolean;
  swipeThreshold: number;
  swipeToDismiss: boolean;
  toasts: IToastivaData[];
  topInset: number;
  vertical: TToastivaVerticalPosition;
  visibleToasts: number;
}

export type { IToastStackProps };
