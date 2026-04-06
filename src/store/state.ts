import type {
  IToastStoreState,
  THeightsListener,
  TToastUpdateListener,
  TToastUpdateOptions,
  TToastsListener,
} from "@/typings";

const storeState: IToastStoreState = {
  defaultDuration: 5000,
  heights: [],
  idCounter: 0,
  toasts: [],
};
const heightsListeners = new Set<THeightsListener>();
const toastsListeners = new Set<TToastsListener>();
const toastUpdateListeners = new Map<string, Set<TToastUpdateListener>>();

function notifyHeights() {
  const snapshot = [...storeState.heights];
  heightsListeners.forEach((listener) => listener(snapshot));
}

function notifyToasts() {
  const snapshot = [...storeState.toasts];
  toastsListeners.forEach((listener) => listener(snapshot));
}

function notifyToastUpdate(id: string, options: TToastUpdateOptions) {
  toastUpdateListeners.get(id)?.forEach((listener) => listener(options));
}

export {
  heightsListeners,
  notifyHeights,
  notifyToastUpdate,
  notifyToasts,
  storeState,
  toastUpdateListeners,
  toastsListeners,
};
