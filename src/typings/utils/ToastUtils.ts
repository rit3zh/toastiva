import type { WithSpringConfig } from "react-native-reanimated";
import type { IGooeyToastOptions } from "../toast";

interface IToastWidthParams {
  expandedWidth?: number;
  hasBody: boolean;
  horizontalInset: number;
  measuredPillWidth: number;
  screenWidth: number;
  title: string;
}

interface IResolvedToastSpringConfig {
  bodyReveal: WithSpringConfig;
  morph: WithSpringConfig;
  mount: WithSpringConfig;
  pillResize: WithSpringConfig;
  squish: WithSpringConfig;
  stack: WithSpringConfig;
}

type TToastTimingSource = Pick<IGooeyToastOptions, "duration" | "timing">;

export type {
  IResolvedToastSpringConfig,
  IToastWidthParams,
  TToastTimingSource,
};
