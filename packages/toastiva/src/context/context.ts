import { createContext } from "react";
import { DEFAULT_THEME } from "./const";
import { IResolvedToastTheme } from "./theme";

const ToastThemeContext = createContext<IResolvedToastTheme>(DEFAULT_THEME);

export { ToastThemeContext };
