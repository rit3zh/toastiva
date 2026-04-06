import type { WithSpringConfig } from "react-native-reanimated";

const PH = 34;
const TOAST_MAX_WIDTH = 356;
const PILL_PADDING_H = 10;
const BODY_PADDING_H = 12;
const BODY_PADDING_BOTTOM = 14;
const ICON_SIZE = 16;
const ICON_GAP = 6;
const TITLE_SIZE = 13;
const DESC_SIZE = 13;
const ACTION_SIZE = 13;
const DEFAULT_VISIBLE_TOASTS = 3;
const DEFAULT_GAP = 14;
const DEFAULT_OFFSET = 8;
const DEFAULT_DURATION = 5000;
const DEFAULT_SWIPE_THRESHOLD = 45;
const DEFAULT_HORIZONTAL_INSET = 16;
const EXPANDED_TOAST_MAX_WIDTH = 720;
const SHOW_BODY_DELAY = 330;

const MOUNT_SPRING: WithSpringConfig = {
  damping: 16,
  stiffness: 200,
  mass: 0.7,
};
const STACK_SPRING: WithSpringConfig = {
  damping: 20,
  stiffness: 220,
  mass: 0.7,
};
const MORPH_SPRING: WithSpringConfig = {
  damping: 14,
  stiffness: 170,
  mass: 0.9,
};
const PILL_RESIZE_SPRING: WithSpringConfig = {
  damping: 18,
  stiffness: 235,
  mass: 0.78,
};
const SQUISH_SPRING: WithSpringConfig = {
  damping: 16,
  stiffness: 375,
  mass: 0.7,
};
const BODY_REVEAL_SPRING: WithSpringConfig = {
  damping: 14,
  stiffness: 200,
  mass: 0.7,
};

export {
  ACTION_SIZE,
  BODY_PADDING_BOTTOM,
  BODY_PADDING_H,
  BODY_REVEAL_SPRING,
  DEFAULT_DURATION,
  DEFAULT_GAP,
  DEFAULT_HORIZONTAL_INSET,
  DEFAULT_OFFSET,
  DEFAULT_SWIPE_THRESHOLD,
  DEFAULT_VISIBLE_TOASTS,
  DESC_SIZE,
  EXPANDED_TOAST_MAX_WIDTH,
  ICON_GAP,
  ICON_SIZE,
  MORPH_SPRING,
  MOUNT_SPRING,
  PH,
  PILL_RESIZE_SPRING,
  PILL_PADDING_H,
  SHOW_BODY_DELAY,
  SQUISH_SPRING,
  STACK_SPRING,
  TITLE_SIZE,
  TOAST_MAX_WIDTH,
};
