import type {
  IGooeyPromiseData,
  IGooeyToastOptions,
  IPromiseToastUpdate,
  TToastUpdateOptions,
} from "@/typings";
import { SpinnerIcon } from "@/icons";
import { createElement } from "react";
import { getHeights, subscribeHeights, updateHeight } from "./heights";
import {
  addToast,
  dismissAll,
  getToasts,
  removeToast,
  setDefaultDuration,
  subscribeToastUpdates,
  subscribeToasts,
  updateToast,
} from "./toasts";
import { getPromiseSettledDuration } from "../utils/toast-timing";

const PROMISE_PENDING_DURATION = 60 * 60 * 1000;

function resolveMessage<T>(value: string | ((result: T) => string), input: T) {
  return typeof value === "function" ? value(input) : value;
}

function resolveDescription<T>(
  value: string | ((result: T) => string | undefined) | undefined,
  input: T,
) {
  if (!value) return undefined;
  return typeof value === "function" ? value(input) : value;
}

function createPromiseToast<TResult, TError = unknown>(
  promise: Promise<TResult>,
  data: IGooeyPromiseData<TResult, TError>,
) {
  const loadingTiming = data.timing
    ? {
        ...data.timing,
        displayDuration: undefined,
      }
    : undefined;
  const id = addToast({
    action: undefined,
    bodyLayout: data.bodyLayout,
    description: data.description?.loading,
    dismissible: false,
    duration: PROMISE_PENDING_DURATION,
    expandedWidth: data.expandedWidth,
    horizontalInset: data.horizontalInset,
    icon:
      data.icon?.loading ??
      createElement(SpinnerIcon, { color: "#3b82f6", size: 16 }),
    meta: data.meta,
    onAutoClose: data.onAutoClose,
    onDismiss: data.onDismiss,
    position: data.position,
    showTimestamp: data.showTimestamp,
    timing: loadingTiming,
    title: data.loading,
    type: "info",
  });

  void promise
    .then((result) => {
      settlePromiseToast(id, data, {
        action: data.action?.success,
        description: resolveDescription(data.description?.success, result),
        icon: data.icon?.success,
        title: resolveMessage(data.success, result),
        type: "success",
      });
    })
    .catch((error: TError) => {
      settlePromiseToast(id, data, {
        action: data.action?.error,
        description: resolveDescription(data.description?.error, error),
        icon: data.icon?.error,
        title: resolveMessage(data.error, error),
        type: "error",
      });
    });

  return id;
}

function settlePromiseToast<TResult, TError = unknown>(
  id: string,
  data: IGooeyPromiseData<TResult, TError>,
  next: IPromiseToastUpdate,
) {
  const settledDuration = getPromiseSettledDuration(data);
  updateToast(id, {
    action: next.action,
    description: next.description,
    dismissible: true,
    duration: settledDuration,
    icon: next.icon,
    timing: data.timing,
    title: next.title,
    type: next.type,
  });
}

const gooeyToast = Object.assign(
  (title: string, options?: Omit<IGooeyToastOptions, "title">) =>
    addToast({ title, ...options }),
  {
    success: (
      title: string,
      options?: Omit<IGooeyToastOptions, "title" | "type">,
    ) => addToast({ title, type: "success", ...options }),
    error: (
      title: string,
      options?: Omit<IGooeyToastOptions, "title" | "type">,
    ) => addToast({ title, type: "error", ...options }),
    warning: (
      title: string,
      options?: Omit<IGooeyToastOptions, "title" | "type">,
    ) => addToast({ title, type: "warning", ...options }),
    info: (
      title: string,
      options?: Omit<IGooeyToastOptions, "title" | "type">,
    ) => addToast({ title, type: "info", ...options }),
    update: (id: string, options: TToastUpdateOptions) =>
      updateToast(id, options),
    promise: <TResult, TError = unknown>(
      promise: Promise<TResult>,
      data: IGooeyPromiseData<TResult, TError>,
    ) => createPromiseToast(promise, data),
    dismiss: removeToast,
    dismissAll,
  },
);

export {
  dismissAll,
  getHeights,
  getToasts,
  removeToast,
  setDefaultDuration,
  subscribeHeights,
  subscribeToastUpdates,
  subscribeToasts,
  updateHeight,
  updateToast,
};
export { gooeyToast };
