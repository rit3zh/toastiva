import type { IResolvedToastTheme } from "./theme";

function mergeDefaultThemeWithContext(
  defaultTheme: IResolvedToastTheme,
  contextTheme?: Partial<IResolvedToastTheme>,
): IResolvedToastTheme {
  return { ...defaultTheme, ...contextTheme };
}

export { mergeDefaultThemeWithContext };
