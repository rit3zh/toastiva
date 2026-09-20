import { IUseToastAnimatedStylesParams } from "../typings";
import { useAnimatedStyle } from "react-native-reanimated";

export const useAnimatedActionStyle = <T extends IUseToastAnimatedStylesParams>(
  params: T,
) => {
  const { values } = params;

  return useAnimatedStyle(() => {
    const opacityRaw = values.bodyOpacity.value * values.actionProgress.value;

    return {
      opacity: opacityRaw < 0 ? 0 : opacityRaw > 1 ? 1 : opacityRaw,
    };
  }, []);
};
