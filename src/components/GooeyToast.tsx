import React, { useCallback, useEffect, useState } from "react";
import type { IGooeyToastData, IGooeyToastProps } from "@/typings";
import { useToastCard } from "../hooks/use-toast-card";
import { subscribeToastUpdates } from "../store";
import { ToastCard } from "./ToastCard";

function GooeyToast(props: IGooeyToastProps) {
  const [liveToast, setLiveToast] = useState<IGooeyToastData>(props.toast);
  const { onStackPress, totalCount } = props;

  useEffect(() => {
    setLiveToast(props.toast);
  }, [props.toast]);

  useEffect(() => {
    return subscribeToastUpdates(props.toast.id, (options) => {
      setLiveToast((current) => ({
        ...current,
        ...options,
        id: current.id,
        createdAt: current.createdAt,
        title: options.title ?? current.title,
        type: options.type ?? current.type,
        duration: options.duration ?? current.duration,
        dismissible: options.dismissible ?? current.dismissible,
      }));
    });
  }, [props.toast.id]);

  const toast = useToastCard({ ...props, toast: liveToast });
  const handleDismiss = toast.dismiss.handleDismiss;
  const isVisible = toast.isVisible;

  const handlePress = useCallback(() => {
    if (totalCount > 1) return onStackPress?.();
    if (liveToast.dismissible) handleDismiss();
  }, [handleDismiss, liveToast.dismissible, onStackPress, totalCount]);

  if (!isVisible) return null;
  return (
    <ToastCard
      {...toast}
      expanded={props.expanded}
      onPress={handlePress}
      onAction={() => {
        liveToast.action?.onClick();
        toast.dismiss.handleDismiss();
      }}
      toast={liveToast}
    />
  );
}

export { GooeyToast };
