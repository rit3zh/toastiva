import { IUseToastAnimatedStylesParams } from "../typings";
import { useAnimatedStyle } from "react-native-reanimated";

export const useAnimatedProgressStyle = <
  T extends IUseToastAnimatedStylesParams,
>(
  params: T,
) => {
  const { values, expanded, isFront } = params;

  return useAnimatedStyle(() => {
    const progress = values.progress.value;

    const scaleX = progress < 1 ? 1 - progress : 0;

    return {
      opacity: expanded || isFront ? 1 : 0,
      transform: [{ scaleX: scaleX < 0 ? 0 : scaleX }],
    };
  }, []);
};
