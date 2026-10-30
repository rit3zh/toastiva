import {
  BODY_REVEAL_SPRING,
  MORPH_COLLAPSE_SPRING,
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

// Reanimated runs a spring by duration as soon as `duration` or
// `dampingRatio` is set and then ignores `damping` and `stiffness`, so an
// override in one mode drops the keys of the other.
type TLooseSpringConfig = {
  damping?: number;
  dampingRatio?: number;
  duration?: number;
  mass?: number;
  stiffness?: number;
};

function isDurationSpring(config: TLooseSpringConfig) {
  return config.duration !== undefined || config.dampingRatio !== undefined;
}

function isPhysicsSpring(config: TLooseSpringConfig) {
  return config.damping !== undefined || config.stiffness !== undefined;
}

function mergeSpringConfig<
  T extends WithSpringConfig,
  U extends TToastivaSpringConfig | undefined,
>(baseConfig: T, ...springConfigs: U[]) {
  return springConfigs.reduce<TLooseSpringConfig>((current, nextConfig) => {
    if (!nextConfig) return current;
    const next = nextConfig as TLooseSpringConfig;
    const base = { ...current };
    if (isPhysicsSpring(next)) {
      delete base.duration;
      delete base.dampingRatio;
    } else if (isDurationSpring(next)) {
      delete base.damping;
      delete base.stiffness;
      delete base.mass;
    }
    return { ...base, ...next };
  }, baseConfig as TLooseSpringConfig) as T;
}

function resolveToastSpringConfig(
  springConfig?: TToastivaSpringConfig,
): IResolvedToastSpringConfig {
  return {
    bodyReveal: mergeSpringConfig(BODY_REVEAL_SPRING, springConfig),
    morph: mergeSpringConfig(MORPH_SPRING, springConfig),
    morphCollapse: mergeSpringConfig(MORPH_COLLAPSE_SPRING, springConfig),
    mount: mergeSpringConfig(MOUNT_SPRING, springConfig),
    pillResize: mergeSpringConfig(PILL_RESIZE_SPRING, springConfig),
    squish: mergeSpringConfig(SQUISH_SPRING, springConfig),
    stack: mergeSpringConfig(STACK_SPRING, springConfig),
  };
}

export { mergeSpringConfig, resolveToastSpringConfig };
