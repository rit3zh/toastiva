import { useAnimatedStyle } from "react-native-reanimated";
import { IUseToastAnimatedStylesParams } from "../typings";

export const useAnimatedDescriptionStyle = <
  T extends IUseToastAnimatedStylesParams,
>(
  params: T,
) => {
  const { values } = params;

  return useAnimatedStyle(() => {
    const opacityRaw =
      values.bodyOpacity.value * values.descriptionProgress.value;

    return {
      opacity: opacityRaw < 0 ? 0 : opacityRaw > 1 ? 1 : opacityRaw,
    };
  }, []);
};
