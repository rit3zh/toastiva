function getBodyRevealProgress<T extends number>(progress: T) {
  "worklet";
  return progress < 0 ? 0 : progress > 1 ? 1 : progress;
}

function getContentRevealProgress<T extends number>(progress: T) {
  "worklet";
  return progress < 0 ? 0 : progress > 1 ? 1 : progress;
}

export { getBodyRevealProgress, getContentRevealProgress };
