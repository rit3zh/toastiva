import {
  typeActionColors,
  typeActionTextColors,
  typeBadgeBgColors,
  typeColors,
  typeSurfaceColors,
  typeSurfaceStrokeColors,
} from "../icons/theme";
import type { IResolvedToastTheme } from "./theme";

const DEFAULT_THEME: IResolvedToastTheme = {
  colors: typeColors,
  surfaceColors: typeSurfaceColors,
  surfaceStrokeColors: typeSurfaceStrokeColors,
  badgeBgColors: typeBadgeBgColors,
  actionColors: typeActionColors,
  actionTextColors: typeActionTextColors,
};

export { DEFAULT_THEME };
