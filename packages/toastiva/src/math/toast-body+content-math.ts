function getBodyRevealProgress<T extends number>(progress: T) {
  "worklet";
  return Math.max(0, Math.min(1, (progress - 0.08) / 0.92));
}

function getContentRevealProgress<T extends number>(progress: T) {
  "worklet";
  return Math.max(0, Math.min(1, (progress - 0.22) / 0.78));
}

export { getBodyRevealProgress, getContentRevealProgress };
