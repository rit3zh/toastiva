import type { WithSpringConfig } from "react-native-reanimated";
import type {
  IToastivaCompactAnimationConfig,
  IToastivaMorphAnimationConfig,
  IToastivaMountAnimationConfig,
  IToastivaOptions,
  IToastivaStackAnimationConfig,
  TToastivaBodyLayout,
} from "../toast";

interface IToastHeightParams {
  actionLabel?: string;
  bodyLayout: TToastivaBodyLayout;
  bodyWidth: number;
  description?: string;
  expandedHeightOverride?: number;
  frontHeight: number;
  hasCustomContent: boolean;
  isFront: boolean;
  measuredHeight: number;
  meta?: string;
  showProgress: boolean;
}

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
  morphCollapse: WithSpringConfig;
  mount: WithSpringConfig;
  pillResize: WithSpringConfig;
  squish: WithSpringConfig;
  stack: WithSpringConfig;
}

interface IResolvedToastAnimationConfig {
  compact: Required<IToastivaCompactAnimationConfig>;
  morph: Required<
    Omit<
      IToastivaMorphAnimationConfig,
      "bodyFadeDelay" | "bodyFadeDuration" | "descriptionDelay" | "squishDelay"
    >
  > &
    Pick<
      IToastivaMorphAnimationConfig,
      "bodyFadeDelay" | "bodyFadeDuration" | "descriptionDelay" | "squishDelay"
    >;
  mount: Required<IToastivaMountAnimationConfig>;
  springs: IResolvedToastSpringConfig;
  stack: Required<IToastivaStackAnimationConfig>;
}

type TToastTimingSource = Pick<IToastivaOptions, "duration" | "timing">;

export type {
  IToastHeightParams,
  IResolvedToastAnimationConfig,
  IResolvedToastSpringConfig,
  IToastWidthParams,
  TToastTimingSource,
};
