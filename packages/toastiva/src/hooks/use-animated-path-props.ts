import { IUseToastAnimatedStylesParams } from "../typings";
import { useAnimatedProps } from "react-native-reanimated";
import { morphPath, morphPathCenter, morphPathRight } from "../morph";

const useAnimatedPathProps = <T extends IUseToastAnimatedStylesParams>(
  params: T,
) => {
  const { values, morphAlign, bodyWidth } = params;

  return useAnimatedProps(() => {
    const progress = values.morphProgress.value;
    const t =
      progress < 0 ? 0
      : progress > 1 ? 1
      : progress;

    const pillWidth = values.pillWidth.value;
    const bodyW = values.bodyWidth.value;
    const expandedHeight = values.expandedHeight.value;

    if (morphAlign === "center") {
      return {
        d: morphPathCenter(pillWidth, bodyW, expandedHeight, t, bodyWidth),
      };
    }

    if (morphAlign === "right") {
      return {
        d: morphPathRight(pillWidth, bodyW, expandedHeight, t, bodyWidth),
      };
    }

    return {
      d: morphPath(pillWidth, bodyW, expandedHeight, t, bodyWidth),
    };
  }, []);
};

export { useAnimatedPathProps };
