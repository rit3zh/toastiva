import {
  BODY_REVEAL_SPRING,
  MORPH_COLLAPSE_SPRING,
  MORPH_SPRING,
  MOUNT_SPRING,
  PILL_RESIZE_SPRING,
  SQUISH_SPRING,
  STACK_SPRING,
} from "../constants";
import {
  ToastivaAnimationPreset,
  type IToastivaAnimationConfig,
  type TToastivaAnimationPreset,
  type TToastivaSpringConfig,
} from "../typings/toast";
import type { IResolvedToastAnimationConfig } from "../typings/utils/ToastUtils";
import { mergeSpringConfig } from "./toast-spring";

const smoothAnimation: IToastivaAnimationConfig = {
  mount: { axis: "y", duration: 420, offset: 50 },
  morph: {
    actionDelay: 80,
    collapseDuration: 280,

    squishDuration: 90,
    squishScaleX: 1.015,
    squishScaleY: 0.975,
  },
  stack: {
    collapseDelay: 220,
    duration: 420,
    minOpacity: 0.68,
    minScale: 0.9,
    opacityStep: 0.1,
    scaleStep: 0.05,
  },
  compact: {
    squishDuration: 55,
    squishScaleX: 1.03,
    squishScaleY: 0.95,
  },
  springs: {
    morph: { damping: 21, stiffness: 235, mass: 1 },
  },
};

const toastivaAnimationPresets: Record<
  TToastivaAnimationPreset,
  IToastivaAnimationConfig
> = {
  [ToastivaAnimationPreset.Smooth]: smoothAnimation,
  [ToastivaAnimationPreset.Snappy]: {
    ...smoothAnimation,
    mount: { axis: "y", duration: 260, offset: 30 },
    morph: {
      ...smoothAnimation.morph,
      collapseDuration: 190,
      squishDuration: 44,
      squishScaleX: 1.04,
      squishScaleY: 0.92,
    },
    stack: {
      ...smoothAnimation.stack,
      collapseDelay: 120,
      duration: 280,
    },
    compact: {
      squishDuration: 40,
      squishScaleX: 1.02,
      squishScaleY: 0.97,
    },
    springs: {
      bodyReveal: { damping: 20, stiffness: 360, mass: 0.7 },
      morph: { damping: 20, stiffness: 360, mass: 0.8 },
      morphCollapse: { damping: 34, stiffness: 360, mass: 0.8 },
      pillResize: { damping: 20, stiffness: 360, mass: 0.8 },
      squish: { damping: 15, stiffness: 460, mass: 0.6 },
    },
  },
  [ToastivaAnimationPreset.Gentle]: {
    ...smoothAnimation,
    mount: { axis: "y", duration: 560, offset: 36 },
    morph: {
      ...smoothAnimation.morph,
      collapseDuration: 360,
      squishDuration: 80,
      squishScaleX: 1.035,
      squishScaleY: 0.94,
    },
    stack: {
      ...smoothAnimation.stack,
      collapseDelay: 260,
      duration: 560,
      opacityStep: 0.08,
      scaleStep: 0.04,
    },
    springs: {
      bodyReveal: { damping: 28, stiffness: 170, mass: 1.1 },
      morph: { damping: 30, stiffness: 170, mass: 1.1 },
      morphCollapse: { damping: 28, stiffness: 170, mass: 1.1 },
      pillResize: { damping: 30, stiffness: 170, mass: 1.1 },
      squish: { damping: 22, stiffness: 240, mass: 0.9 },
    },
  },
  [ToastivaAnimationPreset.Minimal]: {
    ...smoothAnimation,
    mount: { axis: "none", duration: 180, offset: 0 },
    morph: {
      ...smoothAnimation.morph,
      collapseDuration: 180,
      squishDuration: 1,
      squishScaleX: 1,
      squishScaleY: 1,
    },
    stack: {
      ...smoothAnimation.stack,
      collapseDelay: 80,
      duration: 220,
      minOpacity: 0.78,
      minScale: 0.96,
      opacityStep: 0.06,
      scaleStep: 0.02,
    },
    compact: {
      squishDuration: 1,
      squishScaleX: 1,
      squishScaleY: 1,
    },
    springs: {
      bodyReveal: { damping: 40, stiffness: 420, mass: 1 },
      morph: { damping: 40, stiffness: 420, mass: 1 },
      morphCollapse: { damping: 41, stiffness: 420, mass: 1 },
      pillResize: { damping: 40, stiffness: 420, mass: 1 },
      squish: { damping: 40, stiffness: 420, mass: 1 },
    },
  },
};

function mergeAnimationConfig(
  base: IToastivaAnimationConfig,
  override?: IToastivaAnimationConfig,
): IToastivaAnimationConfig {
  return {
    compact: { ...base.compact, ...override?.compact },
    morph: { ...base.morph, ...override?.morph },
    mount: { ...base.mount, ...override?.mount },
    preset: override?.preset ?? base.preset,
    springs: { ...base.springs, ...override?.springs },
    stack: { ...base.stack, ...override?.stack },
  };
}

function resolveToastAnimationConfig({
  animation,
  animationPreset,
  springConfig,
}: {
  animation?: IToastivaAnimationConfig;
  animationPreset?: TToastivaAnimationPreset;
  springConfig?: TToastivaSpringConfig;
}): IResolvedToastAnimationConfig {
  const preset =
    animation?.preset ?? animationPreset ?? ToastivaAnimationPreset.Smooth;
  const presetConfig =
    toastivaAnimationPresets[preset] ??
    toastivaAnimationPresets[ToastivaAnimationPreset.Smooth];
  const config = mergeAnimationConfig(presetConfig, animation);
  const springs = config.springs ?? {};

  return {
    compact: {
      squishDuration: config.compact?.squishDuration ?? 55,
      squishScaleX: config.compact?.squishScaleX ?? 1.03,
      squishScaleY: config.compact?.squishScaleY ?? 0.95,
    },
    morph: {
      actionDelay: config.morph?.actionDelay ?? 80,
      bodyFadeDelay: config.morph?.bodyFadeDelay,
      bodyFadeDuration: config.morph?.bodyFadeDuration,
      collapseDuration: config.morph?.collapseDuration ?? 280,
      descriptionDelay: config.morph?.descriptionDelay,
      squishDelay: config.morph?.squishDelay,
      squishDuration: config.morph?.squishDuration ?? 90,
      squishScaleX: config.morph?.squishScaleX ?? 1.015,
      squishScaleY: config.morph?.squishScaleY ?? 0.975,
    },
    mount: {
      axis: config.mount?.axis ?? "y",
      duration: config.mount?.duration ?? 420,
      offset: config.mount?.offset ?? 50,
    },
    springs: {
      bodyReveal: mergeSpringConfig(
        BODY_REVEAL_SPRING,
        springConfig,
        springs.bodyReveal,
      ),
      morph: mergeSpringConfig(MORPH_SPRING, springConfig, springs.morph),
      morphCollapse: mergeSpringConfig(
        MORPH_COLLAPSE_SPRING,
        springConfig,
        springs.morphCollapse,
      ),
      mount: mergeSpringConfig(MOUNT_SPRING, springConfig, springs.mount),
      pillResize: mergeSpringConfig(
        PILL_RESIZE_SPRING,
        springConfig,
        springs.pillResize,
      ),
      squish: mergeSpringConfig(SQUISH_SPRING, springConfig, springs.squish),
      stack: mergeSpringConfig(STACK_SPRING, springConfig, springs.stack),
    },
    stack: {
      collapseDelay: config.stack?.collapseDelay ?? 220,
      duration: config.stack?.duration ?? 420,
      minOpacity: config.stack?.minOpacity ?? 0.68,
      minScale: config.stack?.minScale ?? 0.9,
      opacityStep: config.stack?.opacityStep ?? 0.1,
      scaleStep: config.stack?.scaleStep ?? 0.05,
    },
  };
}

export {
  mergeAnimationConfig,
  resolveToastAnimationConfig,
  toastivaAnimationPresets,
};
