import { IUseToastAnimatedStylesParams } from "../typings";
import { useAnimatedStyle } from "react-native-reanimated";

export const useAnimatedHeaderMaxWidthStyle = <
  T extends IUseToastAnimatedStylesParams,
>(
  params: T,
) => {
  const { values } = params;

  return useAnimatedStyle(() => {
    const width = values.pillWidth.value;

    return {
      maxWidth: width,
      width,
    };
  }, []);
};
