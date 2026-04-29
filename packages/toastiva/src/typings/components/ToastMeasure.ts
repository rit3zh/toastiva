import type { ComponentType } from "react";
import type { IToastIcon } from "../dummy-icons/Icons";
import type {
  IToastivaData,
  TToastivaBodyLayout,
  TToastivaHorizontalAlign,
} from "../toast";
import type { TToastivaLayoutHandler } from "./common";

interface IToastMeasureBodyProps {
  bodyLayout: TToastivaBodyLayout;
  meta?: string;
  toast: IToastivaData;
}

interface IToastMeasureProps {
  bodyLayout: TToastivaBodyLayout;
  bodyWidth: number;
  color: string;
  headerAlign: TToastivaHorizontalAlign;
  Icon: ComponentType<IToastIcon>;
  meta?: string;
  measureBody: boolean;
  onMeasureCard: TToastivaLayoutHandler;
  onMeasureHeader: TToastivaLayoutHandler;
  toast: IToastivaData;
}

export type { IToastMeasureBodyProps, IToastMeasureProps };
