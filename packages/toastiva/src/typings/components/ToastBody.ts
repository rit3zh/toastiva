import type { IToastivaData, TToastivaBodyLayout } from "../toast";
import type { TToastivaAnimatedViewStyle } from "./common";

interface IToastBodyProps {
  actionStyle: TToastivaAnimatedViewStyle;
  bodyLayout: TToastivaBodyLayout;
  bodyStyle: TToastivaAnimatedViewStyle;
  canInteract: boolean;
  color: string;
  descriptionStyle: TToastivaAnimatedViewStyle;
  meta?: string;
  onAction: () => void;
  progressStyle: TToastivaAnimatedViewStyle;
  showBody: boolean;
  showProgress: boolean;
  toast: IToastivaData;
}

export type { IToastBodyProps };
