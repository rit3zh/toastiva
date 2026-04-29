import type { IToastivaData, IToastivaProps } from "../typings";
import React, { memo, useCallback } from "react";
import { useToastCard } from "../hooks/use-toast-card";
import { ToastCard } from "./ToastCard";

const Toastiva: React.MemoExoticComponent<React.FC<IToastivaProps>> = memo(
  ({
    ...props
  }: IToastivaProps): (React.ReactNode & React.ReactElement) | null => {
    const liveToast: IToastivaData = props.toast;
    const { onStackPress, totalCount } = props;

    const toast = useToastCard(props);
    const handleDismiss = toast.dismiss.handleDismiss;
    const isVisible = toast.isVisible;

    const handlePress = useCallback(() => {
      if (props.dismissPaused) return;
      if (totalCount > 1) return onStackPress?.();
      if (liveToast.dismissible) handleDismiss();
    }, [
      handleDismiss,
      liveToast.dismissible,
      onStackPress,
      props.dismissPaused,
      totalCount,
    ]);

    if (!isVisible) return null;
    return (
      <ToastCard
        {...toast}
        expanded={props.expanded}
        onPress={handlePress}
        onAction={() => {
          liveToast.action?.onPress();
          toast.dismiss.handleDismiss();
        }}
        toast={liveToast}
      />
    );
  },
);

export { Toastiva };
