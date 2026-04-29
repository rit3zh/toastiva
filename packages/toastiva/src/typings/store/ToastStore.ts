import type { ValueOf } from "../../global-ts/value-of";
import type { IToastivaData, IToastivaOptions } from "../toast";

interface IHeightEntry {
  height: number;
  toastId: string;
}

interface IToastStoreState {
  defaultDuration: number;
  heights: IHeightEntry[];
  idCounter: number;
  toasts: IToastivaData[];
}

interface IToastivaPromiseUpdate {
  action?: ValueOf<IToastivaOptions, "action">;
  description?: string;
  icon?: ValueOf<IToastivaOptions, "icon">;
  title: string;
  type: "success" | "error";
}

type THeightsListener = (heights: IHeightEntry[]) => void;
type TToastUpdateListener = (options: TToastUpdateOptions) => void;
type TToastUpdateOptions = Partial<Omit<IToastivaOptions, "title">> & {
  title?: string;
};
type TToastsListener = (toasts: IToastivaData[]) => void;

export type {
  IHeightEntry,
  IToastivaPromiseUpdate,
  IToastStoreState,
  THeightsListener,
  TToastsListener,
  TToastUpdateListener,
  TToastUpdateOptions,
};
