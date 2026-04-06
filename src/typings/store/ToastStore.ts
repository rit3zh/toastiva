import type { IGooeyToastData, IGooeyToastOptions } from "../toast";

interface IHeightEntry {
  height: number;
  toastId: string;
}

interface IToastStoreState {
  defaultDuration: number;
  heights: IHeightEntry[];
  idCounter: number;
  toasts: IGooeyToastData[];
}

interface IPromiseToastUpdate {
  action?: IGooeyToastOptions["action"];
  description?: string;
  icon?: IGooeyToastOptions["icon"];
  title: string;
  type: "success" | "error";
}

type THeightsListener = (heights: IHeightEntry[]) => void;
type TToastUpdateListener = (options: TToastUpdateOptions) => void;
type TToastUpdateOptions = Partial<Omit<IGooeyToastOptions, "title">> & {
  title?: string;
};
type TToastsListener = (toasts: IGooeyToastData[]) => void;

export type {
  IHeightEntry,
  IPromiseToastUpdate,
  IToastStoreState,
  THeightsListener,
  TToastUpdateListener,
  TToastUpdateOptions,
  TToastsListener,
};
