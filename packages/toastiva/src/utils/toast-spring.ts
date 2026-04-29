import {
  BODY_REVEAL_SPRING,
  MORPH_SPRING,
  MOUNT_SPRING,
  PILL_RESIZE_SPRING,
  SQUISH_SPRING,
  STACK_SPRING,
} from "../constants";
import type {
  IResolvedToastSpringConfig,
  TToastivaSpringConfig,
} from "../typings";
import type { WithSpringConfig } from "react-native-reanimated";

function mergeSpringConfig<
  T extends WithSpringConfig,
  U extends TToastivaSpringConfig | undefined,
>(baseConfig: T, springConfig?: U) {
  return { ...baseConfig, ...(springConfig ?? {}) } as T;
}

function resolveToastSpringConfig(
  springConfig?: TToastivaSpringConfig,
): IResolvedToastSpringConfig {
  return {
    bodyReveal: mergeSpringConfig(BODY_REVEAL_SPRING, springConfig),
    morph: mergeSpringConfig(MORPH_SPRING, springConfig),
    mount: mergeSpringConfig(MOUNT_SPRING, springConfig),
    pillResize: mergeSpringConfig(PILL_RESIZE_SPRING, springConfig),
    squish: mergeSpringConfig(SQUISH_SPRING, springConfig),
    stack: mergeSpringConfig(STACK_SPRING, springConfig),
  };
}

export { mergeSpringConfig, resolveToastSpringConfig };
