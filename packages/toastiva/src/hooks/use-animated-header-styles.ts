import { ViewStyle } from "react-native";
import { IUseToastAnimatedStylesParams } from "../typings";
import { useAnimatedStyle } from "react-native-reanimated";

const HEADER_OPEN_OFFSET = 3;
const HEADER_OPEN_SHRINK = 0.1;

export const useAnimatedHeaderStyle = <T extends IUseToastAnimatedStylesParams>(
  params: T,
) => {
  const { values } = params;

  return useAnimatedStyle<Pick<ViewStyle, "maxWidth" | "width">>(() => {
    const width = values.pillWidth.value;
    const open = values.morphProgress.value;

    return {
      maxWidth: width,
      width,
      transform: [
        { translateY: open * HEADER_OPEN_OFFSET },
        { scale: 1 - HEADER_OPEN_SHRINK * open },
      ],
    };
  }, []);
};
