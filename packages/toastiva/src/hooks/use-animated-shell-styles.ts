import { IUseToastAnimatedStylesParams } from "../typings";
import { useAnimatedStyle } from "react-native-reanimated";

const useAnimatedShellStyle = <T extends IUseToastAnimatedStylesParams>(
  params: T,
) => {
  const { values } = params;

  const shellStyle = useAnimatedStyle(() => {
    const progress = values.morphProgress.value;

    const t =
      progress < 0 ? 0
      : progress > 1 ? 1
      : progress;

    const pillWidth = values.pillWidth.value;
    const bodyWidth = values.bodyWidth.value;
    const widthDiff = bodyWidth - pillWidth;

    const collapsedHeight = values.collapsedHeight.value;
    const expandedHeight = values.expandedHeight.value;
    const heightDiff = expandedHeight - collapsedHeight;

    return {
      width: pillWidth + widthDiff * t,
      height: collapsedHeight + heightDiff * t,
    };
  }, []);

  return shellStyle;
};

export { useAnimatedShellStyle };
