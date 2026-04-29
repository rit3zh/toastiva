import type { IResolvedToastTheme } from "../typings/toast/Toast";
import { useMemo, type ReactNode } from "react";
import {
  typeActionColors,
  typeActionTextColors,
  typeBadgeBgColors,
  typeColors,
  typeSurfaceColors,
  typeSurfaceStrokeColors,
} from "../icons/theme";
import type { IToastivaTheme } from "../typings";
import { DEFAULT_THEME } from "./const";
import { ToastThemeContext } from "./context";

function ToastThemeProvider({
  children,
  theme,
}: {
  children: ReactNode;
  theme?: IToastivaTheme;
}) {
  const resolved = useMemo<IResolvedToastTheme>(() => {
    if (!theme) return DEFAULT_THEME;
    return {
      colors: { ...typeColors, ...theme.colors },
      surfaceColors: { ...typeSurfaceColors, ...theme.surfaceColors },
      surfaceStrokeColors: {
        ...typeSurfaceStrokeColors,
        ...theme.surfaceStrokeColors,
      },
      badgeBgColors: { ...typeBadgeBgColors, ...theme.badgeBgColors },
      actionColors: { ...typeActionColors, ...theme.actionColors },
      actionTextColors: { ...typeActionTextColors, ...theme.actionTextColors },
    };
  }, [theme]);

  return (
    <ToastThemeContext.Provider value={resolved}>
      {children}
    </ToastThemeContext.Provider>
  );
}

export { ToastThemeProvider };
export type { IResolvedToastTheme };
