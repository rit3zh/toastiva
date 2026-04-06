import type { TGooeyToastType } from "@/typings";
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

const typeColors: Record<TGooeyToastType, string> = {
  default: "#475569",
  success: "#15803d",
  error: "#dc2626",
  warning: "#c2410c",
  info: "#2563eb",
};

const typeSurfaceColors: Record<TGooeyToastType, string> = {
  default: "#f8fafc",
  success: "#f0fdf4",
  error: "#fef2f2",
  warning: "#fff7ed",
  info: "#eff6ff",
};

const typeSurfaceStrokeColors: Record<TGooeyToastType, string> = {
  default: "rgba(148,163,184,0.26)",
  success: "rgba(34,197,94,0.18)",
  error: "rgba(239,68,68,0.2)",
  warning: "rgba(249,115,22,0.2)",
  info: "rgba(59,130,246,0.18)",
};

const typeActionColors: Record<TGooeyToastType, string> = {
  default: "#e2e8f0",
  success: "#dcfce7",
  error: "#fee2e2",
  warning: "#ffedd5",
  info: "#dbeafe",
};

const typeActionTextColors: Record<TGooeyToastType, string> = {
  default: "#334155",
  success: "#166534",
  error: "#991b1b",
  warning: "#9a3412",
  info: "#1e40af",
};

export {
  iconMap,
  typeActionColors,
  typeActionTextColors,
  typeColors,
  typeSurfaceColors,
  typeSurfaceStrokeColors,
};
