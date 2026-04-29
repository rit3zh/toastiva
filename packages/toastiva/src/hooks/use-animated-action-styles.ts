import { getContentRevealProgress } from "../math/toast-body+content-math";
import { IUseToastAnimatedStylesParams } from "../typings";
import { useAnimatedStyle } from "react-native-reanimated";

export const useAnimatedActionStyle = <T extends IUseToastAnimatedStylesParams>(
  params: T,
) => {
  const { values } = params;

  return useAnimatedStyle(() => {
    const progress = values.morphProgress.value;
    const t =
      progress < 0 ? 0
      : progress > 1 ? 1
      : progress;

    const revealT = getContentRevealProgress<number>(t);
    const settle = values.actionProgress.value;
    const bodyOpacity = values.bodyOpacity.value;

    const opacityRaw = bodyOpacity * revealT * settle;
    const opacity =
      opacityRaw < 0 ? 0
      : opacityRaw > 1 ? 1
      : opacityRaw;

    return {
      opacity,
      transform: [{ translateY: (1 - settle) * 10 }],
    };
  }, []);
};
