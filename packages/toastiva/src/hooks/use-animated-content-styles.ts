import { IUseToastAnimatedStylesParams } from "../typings";
import { useAnimatedStyle } from "react-native-reanimated";

export const useAnimatedContentStyle = <
  T extends IUseToastAnimatedStylesParams,
>(
  params: T,
) => {
  const { values } = params;

  return useAnimatedStyle(() => {
    return {
      opacity: values.stackContentOpacity.value,
    };
  }, []);
};
