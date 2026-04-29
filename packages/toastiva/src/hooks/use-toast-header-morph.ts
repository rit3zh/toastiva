import type { IUseToastHeaderMorphParams } from "../typings";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  cancelAnimation,
  Easing,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import {
  createHeaderLayer,
  HEADER_LAYER_CLEAR_MS,
  HEADER_TITLE_EXIT_MS,
  HEADER_TITLE_MORPH_MS,
} from "../utils/toast-header-animation";
import { useToastHeaderAnimatedStyles } from "./use-toast-header-animated-styles";

function useToastHeaderMorph(params: IUseToastHeaderMorphParams) {
  const { color, Icon, icon, measure, title, type } = params;
  const headerKey = `${type}:${title}`;
  const [headerLayer, setHeaderLayer] = useState(() => ({
    current: createHeaderLayer({ color, Icon, icon, title, type }),
    prev: null as ReturnType<typeof createHeaderLayer> | null,
  }));
  const prevHeaderKeyRef = useRef(headerKey);
  const prevClearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMorphingRef = useRef(false);
  const morphVersionRef = useRef(0);
  const currentTitleProgress = useSharedValue(1);
  const prevTitleProgress = useSharedValue(1);
  const animatedStyles = useToastHeaderAnimatedStyles(
    currentTitleProgress,
    prevTitleProgress,
  );

  const clearPrevLayer = useCallback((version?: number) => {
    if (version !== undefined && version !== morphVersionRef.current) return;
    if (prevClearTimerRef.current) {
      clearTimeout(prevClearTimerRef.current);
      prevClearTimerRef.current = null;
    }
    isMorphingRef.current = false;
    setHeaderLayer((state) => (state.prev ? { ...state, prev: null } : state));
  }, []);

  const scheduleClear = useCallback(
    (version: number) => {
      if (prevClearTimerRef.current) clearTimeout(prevClearTimerRef.current);
      prevClearTimerRef.current = setTimeout(() => {
        clearPrevLayer(version);
      }, HEADER_LAYER_CLEAR_MS);
    },
    [clearPrevLayer],
  );

  useLayoutEffect(() => {
    const nextHeaderLayer = createHeaderLayer({
      color,
      Icon,
      icon,
      title,
      type,
    });

    if (measure) {
      morphVersionRef.current += 1;
      prevHeaderKeyRef.current = headerKey;
      cancelAnimation(currentTitleProgress);
      cancelAnimation(prevTitleProgress);
      currentTitleProgress.value = 1;
      prevTitleProgress.value = 1;
      isMorphingRef.current = false;
      if (prevClearTimerRef.current) {
        clearTimeout(prevClearTimerRef.current);
        prevClearTimerRef.current = null;
      }
      setHeaderLayer({ current: nextHeaderLayer, prev: null });
      return;
    }

    if (prevHeaderKeyRef.current === headerKey) {
      setHeaderLayer((state) => ({ ...state, current: nextHeaderLayer }));
      return;
    }

    prevHeaderKeyRef.current = headerKey;
    cancelAnimation(currentTitleProgress);
    cancelAnimation(prevTitleProgress);
    const wasMorphing = isMorphingRef.current;
    const exitingStartProgress = wasMorphing ? currentTitleProgress.value : 0;
    const morphVersion = morphVersionRef.current + 1;
    morphVersionRef.current = morphVersion;
    isMorphingRef.current = true;
    setHeaderLayer((state) => ({
      current: nextHeaderLayer,
      prev: state.current,
    }));

    currentTitleProgress.value = 0;
    prevTitleProgress.value = exitingStartProgress;
    currentTitleProgress.value = withTiming(1, {
      duration: HEADER_TITLE_MORPH_MS,
      easing: Easing.out(Easing.cubic),
    });
    prevTitleProgress.value = withTiming(
      1,
      {
        duration: HEADER_TITLE_EXIT_MS,
        easing: Easing.out(Easing.cubic),
      },
      (finished) => {
        if (finished) scheduleOnRN(clearPrevLayer, morphVersion);
      },
    );
    scheduleClear(morphVersion);
  }, [
    headerKey,
    color,
    Icon,
    icon,
    measure,
    title,
    type,
    currentTitleProgress,
    prevTitleProgress,
    clearPrevLayer,
    scheduleClear,
  ]);

  useEffect(() => {
    return () => {
      if (prevClearTimerRef.current) clearTimeout(prevClearTimerRef.current);
    };
  }, []);

  return {
    ...animatedStyles,
    headerLayer,
  };
}

export { useToastHeaderMorph };
