import { useContext } from "react";
import { ToastThemeContext } from "./context";
import { IResolvedToastTheme } from "./theme";

function useToastTheme(): IResolvedToastTheme {
  return useContext(ToastThemeContext);
}

export { useToastTheme };
