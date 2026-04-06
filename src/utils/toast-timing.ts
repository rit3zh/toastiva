import type {
  IGooeyPromiseData,
  IGooeyToastData,
  TToastTimingSource,
} from "@/typings";

const DEFAULT_COLLAPSE_DURATION = 900;
const DEFAULT_EXPAND_DURATION = 900;
const DEFAULT_SETTLED_DURATION = 5000;

function getExpandDuration(source: TToastTimingSource) {
  return source.timing?.expandDuration ?? DEFAULT_EXPAND_DURATION;
}

function getCollapseDuration(source: TToastTimingSource) {
  return source.timing?.collapseDuration ?? DEFAULT_COLLAPSE_DURATION;
}

function getCollapseSettleDuration(source: TToastTimingSource) {
  return Math.min(
    320,
    Math.max(180, Math.round(getCollapseDuration(source) * 0.3)),
  );
}

function getBodyFadeDelay(source: TToastTimingSource) {
  return Math.max(70, Math.round(getExpandDuration(source) * 0.22));
}

function getBodyRevealDelay(source: TToastTimingSource) {
  return Math.max(140, Math.round(getExpandDuration(source) * 0.78));
}

function getBodyFadeDuration(source: TToastTimingSource) {
  return Math.max(170, Math.round(getExpandDuration(source) * 0.42));
}

function getDisplayDuration(source: TToastTimingSource) {
  return (
    source.timing?.displayDuration ??
    source.duration ??
    DEFAULT_SETTLED_DURATION
  );
}

function getProgressDuration(
  toast: IGooeyToastData,
  hasBody: boolean,
  shouldAutoExpand: boolean,
) {
  const baseDuration = getDisplayDuration(toast);
  return baseDuration + (hasBody && shouldAutoExpand ? getExpandDuration(toast) : 0);
}

function getPromiseSettledDuration<TResult, TError = unknown>(
  data: IGooeyPromiseData<TResult, TError>,
) {
  return getDisplayDuration(data);
}

export {
  getBodyFadeDelay,
  getBodyFadeDuration,
  getBodyRevealDelay,
  getCollapseDuration,
  getCollapseSettleDuration,
  getDisplayDuration,
  getExpandDuration,
  getProgressDuration,
  getPromiseSettledDuration,
};
