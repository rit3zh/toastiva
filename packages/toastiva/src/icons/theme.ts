import type { TToastivaType } from "../typings";
import {
  DefaultIcon,
  ErrorIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
} from "./status-icons";

const iconMap = {
  default: DefaultIcon,
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,
};

const typeColors: Record<TToastivaType, string> = {
  default: "#a1a1aa",
  success: "#34d399",
  error: "#f87171",
  warning: "#fbbf24",
  info: "#60a5fa",
};

const DARK_FILL = "#1c1c1e";
const typeSurfaceColors: Record<TToastivaType, string> = {
  default: DARK_FILL,
  success: DARK_FILL,
  error: DARK_FILL,
  warning: DARK_FILL,
  info: DARK_FILL,
};

const typeSurfaceStrokeColors: Record<TToastivaType, string> = {
  default: "rgba(255,255,255,0.08)",
  success: "rgba(255,255,255,0.08)",
  error: "rgba(255,255,255,0.08)",
  warning: "rgba(255,255,255,0.08)",
  info: "rgba(255,255,255,0.08)",
};

const typeBadgeBgColors: Record<TToastivaType, string> = {
  default: "rgba(161,161,170,0.22)",
  success: "rgba(52,211,153,0.22)",
  error: "rgba(248,113,113,0.22)",
  warning: "rgba(251,191,36,0.22)",
  info: "rgba(96,165,250,0.22)",
};

const typeActionColors: Record<TToastivaType, string> = {
  default: "rgba(161,161,170,0.18)",
  success: "rgba(52,211,153,0.18)",
  error: "rgba(248,113,113,0.18)",
  warning: "rgba(251,191,36,0.18)",
  info: "rgba(96,165,250,0.18)",
};

const typeActionTextColors: Record<TToastivaType, string> = {
  default: "#e4e4e7",
  success: "#6ee7b7",
  error: "#fca5a5",
  warning: "#fcd34d",
  info: "#93c5fd",
};

export {
  iconMap,
  typeActionColors,
  typeActionTextColors,
  typeBadgeBgColors,
  typeColors,
  typeSurfaceColors,
  typeSurfaceStrokeColors,
};
