import type {
  IGooeyToastData,
  IGooeyToastOptions,
  TToastUpdateOptions,
  TToastsListener,
} from "@/typings";
import {
  notifyHeights,
  notifyToastUpdate,
  notifyToasts,
  storeState,
  toastUpdateListeners,
  toastsListeners,
} from "./state";

function addToast(options: IGooeyToastOptions) {
  const id = `gooey-${++storeState.idCounter}`;
  const toast: IGooeyToastData = {
    id,
    title: options.title,
    description: options.description,
    type: options.type ?? "default",
    position: options.position,
    action: options.action,
    bodyLayout: options.bodyLayout,
    expandedWidth: options.expandedWidth,
    horizontalInset: options.horizontalInset,
    icon: options.icon,
    meta: options.meta,
    duration: options.duration ?? storeState.defaultDuration,
    timing: options.timing,
    dismissible: options.dismissible ?? true,
    createdAt: Date.now(),
    onDismiss: options.onDismiss,
    onAutoClose: options.onAutoClose,
    showTimestamp: options.showTimestamp,
  };
  storeState.toasts = [toast, ...storeState.toasts];
  notifyToasts();
  return id;
}

function removeToast(id: string) {
  storeState.toasts = storeState.toasts.filter((toast) => toast.id !== id);
  storeState.heights = storeState.heights.filter(
    (entry) => entry.toastId !== id,
  );
  toastUpdateListeners.delete(id);
  notifyToasts();
  notifyHeights();
}

function updateToast(id: string, options: TToastUpdateOptions) {
  const index = storeState.toasts.findIndex((toast) => toast.id === id);
  if (index < 0) return false;

  const current = storeState.toasts[index];
  const nextToast: IGooeyToastData = {
    ...current,
    ...options,
    id: current.id,
    createdAt: current.createdAt,
    title: options.title ?? current.title,
    type: options.type ?? current.type,
    duration: options.duration ?? current.duration,
    timing: options.timing ?? current.timing,
    dismissible: options.dismissible ?? current.dismissible,
  };

  storeState.toasts = storeState.toasts.map((toast) =>
    toast.id === id ? nextToast : toast,
  );
  notifyToastUpdate(id, options);
  if (options.position) notifyToasts();
  return true;
}

function dismissAll() {
  storeState.toasts = [];
  storeState.heights = [];
  notifyToasts();
  notifyHeights();
}

function setDefaultDuration(duration: number) {
  storeState.defaultDuration = duration;
}

function subscribeToasts(listener: TToastsListener) {
  toastsListeners.add(listener);
  return () => toastsListeners.delete(listener);
}

function subscribeToastUpdates(
  id: string,
  listener: (options: TToastUpdateOptions) => void,
) {
  const listeners = toastUpdateListeners.get(id) ?? new Set();
  listeners.add(listener);
  toastUpdateListeners.set(id, listeners);
  return () => {
    const currentListeners = toastUpdateListeners.get(id);
    if (!currentListeners) return;
    currentListeners.delete(listener);
    if (!currentListeners.size) toastUpdateListeners.delete(id);
  };
}

function getToasts() {
  return storeState.toasts;
}

export {
  addToast,
  dismissAll,
  getToasts,
  removeToast,
  setDefaultDuration,
  subscribeToastUpdates,
  subscribeToasts,
  updateToast,
};
