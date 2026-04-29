import type { IToastivaProviderProps } from "../typings";
import React, { memo } from "react";
import { ToastivaToaster } from "./ToastivaToaster";

export const ToastivaProvider: React.MemoExoticComponent<
  React.FC<IToastivaProviderProps>
> = memo(
  ({ children, ...config }: IToastivaProviderProps): React.JSX.Element &
    React.ReactNode &
    React.ReactElement => {
    return (
      <>
        {children}
        <ToastivaToaster {...config} />
      </>
    );
  },
);

export default ToastivaProvider;
